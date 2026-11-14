#!/usr/bin/env python3
"""Turns the 12 Encyclopedic Index booklets into website data for the Explore section.

Run from the repository root:   python3 -I tools/explore/build_explore.py
Reads:   tools/explore/source/<topic>/p*.md + config.json   (the same part files that build the printed booklet)
         tools/explore/media/<topic>.json                     (optional pictures and videos, see docs/16-explore.md)
Writes:  src/data/explore/<topic>.json and src/data/explore/index.json

Only the Python standard library is used. The part files follow the booklet rules:
  # PART n — TITLE            a Part
  ## XXX-nn Title             a Section (one web page each)
  ### ...                     a sub-heading (### ☐ XXX-nn.n ... is a tickable sub-heading)
  - ☐ **XXX-nn.n Name**: ...  a tickable entry
  > ...                       a "Before you start" box
  | a | b |                   a table (register)
"""
import html
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'tools' / 'explore' / 'source'
MEDIA = ROOT / 'tools' / 'explore' / 'media'
OUT = ROOT / 'src' / 'data' / 'explore'

# Order on the site, shelf, and the short name used in the menu. Change here to regroup topics.
TOPICS = [
    ('movies', 'stories', 'Movies'),
    ('books', 'stories', 'Books'),
    ('music', 'stories', 'Music'),
    ('musical-instruments', 'stories', 'Musical Instruments'),
    ('cooking', 'living', 'Cooking'),
    ('gardening', 'living', 'Gardening'),
    ('sports-and-games', 'living', 'Sports and Games'),
    ('technology', 'how', 'Technology'),
    ('crochet', 'needle', 'Crochet'),
    ('knitting', 'needle', 'Knitting'),
    ('embroidery', 'needle', 'Embroidery'),
    ('sewing', 'needle', 'Sewing'),
]

ID_RE = r'[A-Z]{3}-(?:\d{2}(?:\.\d{1,2})*|[SET])'


def slugify(s, n=60):
    s = re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
    if len(s) <= n:
        return s
    cut = s[:n + 1]
    return cut[:cut.rfind('-')] if '-' in cut else s[:n]


def id_slug(i):
    return i.lower().replace('.', '-')


def title_case(s):
    small = {'and', 'or', 'of', 'the', 'a', 'an', 'in', 'on', 'to', 'for', 'from', 'with', 'by', 'at', 'as'}
    words = s.lower().split()
    out = []
    for k, w in enumerate(words):
        if w.upper() in ('AI', 'ICC', 'FIFA', 'GI', 'UNESCO', 'IPL', 'II', 'III', 'IV', 'TV', 'OTT') or re.fullmatch(r'[a-z]{3}-\d.*', w):
            out.append(w.upper())
        elif k and w in small:
            out.append(w)
        else:
            out.append(w[:1].upper() + w[1:])
    return ' '.join(out)


class Linker:
    """Knows every Section and entry ID so that IDs in the text become links."""

    def __init__(self):
        self.sections = {}  # 'SEW-07' -> url
        self.entries = {}   # 'SEW-07.1' -> url#anchor

    def url_for(self, ident):
        if ident in self.sections:
            return self.sections[ident]
        if ident in self.entries:
            return self.entries[ident]
        # an entry ID whose own anchor is unknown: fall back to its Section
        m = re.match(r'([A-Z]{3}-\d{2})', ident)
        if m and m.group(1) in self.sections:
            return self.sections[m.group(1)]
        return None


def inline(text, linker=None, current=None):
    """Escape, then apply **bold**, *italic*, [links](url) and ID links."""
    t = html.escape(text, quote=False)
    links = []

    def keep(m):
        label, url = m.group(1), m.group(2)
        if not re.match(r'^(https?://|/)', url):
            return m.group(0)
        links.append(f'<a href="{html.escape(url)}" rel="noopener">{label}</a>')
        return f'\u0000{len(links) - 1}\u0000'

    t = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', keep, t)
    t = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![\w*])\*(?!\s)([^*\n]+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', t)
    if linker:
        def link_id(m):
            ident = m.group(0)
            url = linker.url_for(ident)
            if not url or ident == current:
                return ident
            return f'<a class="xid" href="{url}">{ident}</a>'
        # do not link inside tags
        parts = re.split(r'(<[^>]+>)', t)
        t = ''.join(p if p.startswith('<') else re.sub(ID_RE, link_id, p) for p in parts)
    t = re.sub('\u0000(\\d+)\u0000', lambda m: links[int(m.group(1))], t)
    return t


def plain(text):
    t = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    return re.sub(r'[*_`>#|]', '', t).replace('☐', '').strip()


def parse_table(rows):
    cells = [[c.strip() for c in r.strip().strip('|').split('|')] for r in rows]
    cells = [r for r in cells if not all(re.fullmatch(r':?-{2,}:?', c) for c in r)]
    return cells[0], cells[1:]


def words_of(h):
    return len(re.findall(r'\w+', html.unescape(re.sub(r'<[^>]+>', ' ', h))))


def gist_of(text, n=150):
    """The first sentence of a plain-text explainer, for the summary box at the end of a page."""
    t = re.sub(r'\s+', ' ', text).strip().lstrip(':;,. ').strip()
    m = re.match(r'(.+?[.!?;])(\s|$)', t)
    t = m.group(1).rstrip(';') if m else t
    return t if len(t) <= n else t[:n].rsplit(' ', 1)[0] + '…'


def render_blocks(lines, topic, linker, current):
    """Markdown lines of one Section -> (atoms, entries, words).

    An atom is one piece of the page that may start a new web page: a paragraph, a heading, a box,
    one row of a table or one item of a list. Rows and items carry `wrap` so they can be put back
    inside their table or list (see join_atoms). Pages are cut from atoms by paginate()."""
    out, entries = [], []
    i, n = 0, len(lines)
    para = []
    uid = [0]

    def add(h, **kw):
        out.append({'html': h, 'words': words_of(h), **kw})

    def flush():
        if para:
            txt = ' '.join(s.strip() for s in para)
            cls = ''
            if txt.startswith('**Remember this:**'):
                cls = ' class="remember"'
            elif txt.startswith('**Short answer'):
                cls = ' class="short"'
            elif re.match(r'\*\*(Web address|Keywords)', txt):
                cls = ' class="meta"'
            elif txt.startswith('**Next'):
                cls = ' class="next-q"'
            add(f'<p{cls}>{inline(txt, linker, current)}</p>', kind='p', text=plain(txt))
            para.clear()

    while i < n:
        line = lines[i].rstrip('\n')
        s = line.strip()
        if not s:
            flush(); i += 1; continue
        if s.startswith('### '):
            flush()
            h = s[4:].strip()
            m = re.match(r'☐\s*(' + ID_RE + r')\s*(.*)', h)
            if m:
                eid, rest = m.group(1), m.group(2)
                entries.append({'id': eid, 'name': plain(rest)})
                add(f'<h3 class="tick-h" id="{id_slug(eid)}"><label><input type="checkbox" data-tick="{eid}"><span class="eid">{eid}</span> {inline(rest, linker, current)}</label></h3>', kind='h3', label=plain(rest))
            else:
                add(f'<h3 id="{slugify(plain(h), 40)}">{inline(h.replace("☐", "").strip(), linker, current)}</h3>', kind='h3', label=plain(h))
            i += 1; continue
        if s.startswith('>'):
            flush()
            box = []
            while i < n and lines[i].strip().startswith('>'):
                box.append(lines[i].strip()[1:].strip()); i += 1
            add(f'<aside class="note">{inline(" ".join(box), linker, current)}</aside>', kind='aside')
            continue
        if s.startswith('|'):
            flush()
            rows = []
            while i < n and lines[i].strip().startswith('|'):
                rows.append(lines[i]); i += 1
            head, body = parse_table(rows)
            th = ''.join(f'<th scope="col">{inline(h, linker, current)}</th>' for h in head)
            uid[0] += 1
            for r in body:
                tds = ''.join(
                    (f'<th scope="row" data-label="{html.escape(plain(head[k]) if k < len(head) else "")}">{inline(c, linker, current)}</th>' if k == 0 else
                     f'<td data-label="{html.escape(plain(head[k]) if k < len(head) else "")}">{inline(c, linker, current)}</td>')
                    for k, c in enumerate(r))
                add(f'<tr>{tds}</tr>', kind='row', wrap=['table', th, uid[0]], label=plain(r[0]) if r else '')
            continue
        if re.match(r'^-\s', s):
            flush()
            items = []
            while i < n and re.match(r'^\s*-\s', lines[i]):
                item = re.sub(r'^\s*-\s+', '', lines[i].rstrip()); i += 1
                # continuation lines (indented, not a new item)
                while i < n and lines[i].startswith('  ') and lines[i].strip() and not re.match(r'^\s*-\s', lines[i]):
                    item += ' ' + lines[i].strip(); i += 1
                m = re.match(r'☐\s*\*\*(' + ID_RE + r')\s*(.*?)\*\*(.*)', item)
                if m:
                    eid, name, rest = m.group(1), m.group(2).strip(), m.group(3)
                    entries.append({'id': eid, 'name': plain(name).rstrip(':')})
                    items.append((
                        f'<li class="entry" id="{id_slug(eid)}"><label class="tick"><input type="checkbox" data-tick="{eid}" aria-label="Mark {eid} as learned"></label>'
                        f'<div><span class="eid">{eid}</span> <strong class="ename">{inline(name)}</strong>{inline(rest, linker, current)}</div></li>',
                        plain(name).rstrip(':'), plain(rest)))
                elif item.startswith('☐'):
                    body = item[1:].strip()
                    key = f'{current}#{len(entries) + 1}'
                    entries.append({'id': key, 'name': plain(body)[:80]})
                    lm = re.match(r'\*\*([^*]{2,70})\*\*\s*:?\s*(.*)', body)
                    items.append((f'<li class="entry"><label class="tick"><input type="checkbox" data-tick="{key}" aria-label="Mark as learned"></label><div>{inline(body, linker, current)}</div></li>',
                                  plain(lm.group(1)).rstrip(':') if lm else '', plain(lm.group(2)) if lm else plain(body)))
                else:
                    # "**Silent era (1913–1931)**: ..." -> label "Silent era (1913–1931)"
                    lm = re.match(r'\*\*([^*]{2,70})\*\*\s*:?\s*(.*)', item)
                    items.append((f'<li>{inline(item, linker, current)}</li>', plain(lm.group(1)).rstrip(':') if lm else '', plain(lm.group(2)) if lm else plain(item)))
            cls = 'entries' if any('class="entry"' in x[0] for x in items) else 'bullets'
            uid[0] += 1
            for h, label, text in items:
                add(h, kind='li', wrap=['ul', cls, uid[0]], label=label, text=text)
            continue
        if re.match(r'^\d+\.\s', s):
            flush()
            items = []
            while i < n and re.match(r'^\s*\d+\.\s', lines[i]):
                items.append(re.sub(r'^\s*\d+\.\s+', '', lines[i].rstrip())); i += 1
                while i < n and lines[i].startswith('   ') and lines[i].strip() and not re.match(r'^\s*\d+\.\s', lines[i]):
                    items[-1] += ' ' + lines[i].strip(); i += 1
            olitems = []
            for x in items:
                lm = re.match(r'\*\*([^*]{2,70})\*\*\s*:?\s*(.*)', x)
                olitems.append([plain(lm.group(1)).rstrip(':'), plain(lm.group(2))] if lm else ['', plain(x)])
            add('<ol>' + ''.join(f'<li>{inline(x, linker, current)}</li>' for x in items) + '</ol>', kind='ol', items=olitems)
            continue
        para.append(s); i += 1
    flush()
    text = ' '.join(lines)
    words = len(re.findall(r'\w+', plain(text)))
    return out, entries, words


def join_atoms(atoms):
    """Atoms -> HTML, putting rows back in their table and items back in their list."""
    out, k = [], 0
    while k < len(atoms):
        a = atoms[k]
        w = a.get('wrap')
        if not w:
            out.append(a['html']); k += 1; continue
        group = []
        while k < len(atoms) and atoms[k].get('wrap') == w:
            group.append(atoms[k]['html']); k += 1
        if w[0] == 'table':
            out.append(f'<div class="reg"><table><thead><tr>{w[1]}</tr></thead><tbody>{"".join(group)}</tbody></table></div>')
        else:
            out.append(f'<ul class="{w[1]}">{"".join(group)}</ul>')
    return '\n'.join(out)


# A web page should take two to three minutes to read (about 200 words a minute).
PAGE_TARGET, PAGE_MAX, PAGE_MIN = 380, 480, 140


def paginate(atoms):
    """Cut a Section's atoms into short pages. Prefer cutting before a heading; cut inside
    a heading's block (between list items or table rows) only when that block alone is too long."""
    # words of the whole block that each heading starts
    block = [0] * len(atoms)
    k = 0
    while k < len(atoms):
        if atoms[k].get('kind') == 'h3':
            j = k + 1
            while j < len(atoms) and atoms[j].get('kind') != 'h3':
                j += 1
            block[k] = sum(a['words'] for a in atoms[k:j]); k = j
        else:
            k += 1
    pages, cur, cw = [], [], 0
    in_block = False
    for k, a in enumerate(atoms):
        if a.get('kind') == 'h3':
            in_block = True
            if cur and cw >= PAGE_MIN and cw + min(block[k], PAGE_TARGET) > PAGE_TARGET:
                pages.append(cur); cur, cw = [], 0
        elif cur and cw >= PAGE_MIN and a.get('kind') in ('li', 'row', 'p', 'ol', 'aside'):
            prev = cur[-1].get('kind')
            limit = PAGE_MAX if in_block else PAGE_TARGET
            if prev != 'h3' and cw + a['words'] > limit:
                pages.append(cur); cur, cw = [], 0
        cur.append(a); cw += a['words']
    if cur:
        # a very short last page joins the one before
        if pages and cw < PAGE_MIN * 0.75 and sum(x['words'] for x in pages[-1]) + cw <= PAGE_MAX + 80:
            pages[-1] += cur
        else:
            pages.append(cur)
    out, last = [], ''
    for pg in pages:
        cont = last if pg[0].get('kind') != 'h3' and last else ''
        for a in pg:
            if a.get('kind') == 'h3' and a.get('label'):
                last = a['label']
        heads = [a['label'] for a in pg if a.get('kind') == 'h3' and a.get('label')]
        named = [a for a in pg if a.get('kind') == 'li' and a.get('label') and a['wrap'][1] == 'entries']
        if not heads:
            heads = [a['label'] for a in named]
        # summary: each heading (or named entry) with the first sentence of what follows it
        summary = []
        for j, a in enumerate(pg):
            if a.get('kind') == 'h3' and a.get('label'):
                nxt = next((b for b in pg[j + 1:j + 3] if b.get('kind') in ('p', 'li') and b.get('text')), None)
                summary.append([a['label'], gist_of(nxt['text']) if nxt else ''])
        if len(summary) < 3:
            for a in pg:
                if a.get('kind') == 'li' and a.get('label') and len(summary) < 7:
                    summary.append([a['label'], gist_of(a.get('text', ''), 110)])
        if not summary:
            rows = [a['label'] for a in pg if a.get('kind') == 'row' and a.get('label')]
            if rows:
                summary.append(['Listed here', ', '.join(rows[:8]) + (f' and {len(rows) - 8} more' if len(rows) > 8 else '') + '.'])
            else:
                txt = [a['text'] for a in pg if a.get('kind') in ('p', 'li') and a.get('text')]
                summary += [['', gist_of(x, 160)] for x in txt[:3]]
            if not summary:
                summary += [[a, gist_of(b, 110)] for o in pg if o.get('kind') == 'ol' for a, b in o['items']][:6]
        out.append({'html': join_atoms(pg), 'words': sum(a['words'] for a in pg), 'heads': heads, 'summary': summary, 'cont': cont})
    return out


def split_topic(slug):
    """Part files -> parts[{num,title,intro,sections:[{id,title,lines}]}]"""
    files = sorted((SRC / slug).glob('p*.md'))
    lines = []
    for f in files:
        lines += f.read_text(encoding='utf-8').splitlines() + ['']
    parts = []
    cur_part = cur_sec = None
    for line in lines:
        m = re.match(r'^# PART (\d+)\s*[—-]\s*(.+)$', line)
        if m:
            cur_part = {'num': int(m.group(1)), 'title': m.group(2).strip(), 'intro': [], 'sections': []}
            parts.append(cur_part); cur_sec = None; continue
        m = re.match(r'^## (' + ID_RE + r')\s+(.+)$', line)
        if m:
            cur_sec = {'id': m.group(1), 'title': m.group(2).strip(), 'lines': []}
            cur_part['sections'].append(cur_sec); continue
        if cur_sec is not None:
            cur_sec['lines'].append(line)
        elif cur_part is not None:
            cur_part['intro'].append(line)
    return parts


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    linker = Linker()
    raw = {}
    for slug, shelf, short in TOPICS:
        parts = split_topic(slug)
        raw[slug] = parts
        for p in parts:
            for s in p['sections']:
                url = f'/library/{slug}/{id_slug(s["id"])}-{slugify(s["title"], 48)}/'
                s['url'] = url
                linker.sections[s['id']] = url
                for line in s['lines']:
                    for m in re.finditer(r'(?:^\s*-\s*☐\s*\*\*|^###\s*☐\s*)(' + ID_RE + ')', line):
                        linker.entries[m.group(1)] = f'{url}#{id_slug(m.group(1))}'
    index = []
    for order, (slug, shelf, short) in enumerate(TOPICS):
        cfg = json.loads((SRC / slug / 'config.json').read_text(encoding='utf-8'))
        media_file = MEDIA / f'{slug}.json'
        media = json.loads(media_file.read_text(encoding='utf-8')) if media_file.exists() else {}
        code = raw[slug][0]['sections'][0]['id'][:3]
        parts_out, total_entries, total_words, n_sections = [], 0, 0, 0
        for p in raw[slug]:
            intro_html = join_atoms(render_blocks(p['intro'], slug, linker, None)[0]) if any(x.strip() for x in p['intro']) else ''
            secs = []
            for s in p['sections']:
                atoms, entries, words = render_blocks(s['lines'], slug, linker, s['id'])
                # the short question pages of Part 0 stay whole; longer Sections are cut into 2-3 minute pages
                pages = paginate(atoms) if p['num'] else [{'html': join_atoms(atoms), 'words': words, 'heads': [], 'summary': []}]
                first = next((plain(x) for x in s['lines'] if x.strip() and not x.startswith(('#', '|', '>'))), '')
                first = re.sub(r'^(Short answer:|Web address:.*?Keywords:)\s*', '', first)
                secs.append({
                    'id': s['id'], 'title': s['title'], 'url': s['url'], 'pages': pages,
                    'entries': entries, 'words': words,
                    'summary': (first[:220] + '…') if len(first) > 220 else first,
                    'media': media.get('sections', {}).get(s['id'], []),
                })
                total_entries += len(entries); total_words += words; n_sections += 1
            parts_out.append({'num': p['num'], 'title': title_case(p['title']) if p['num'] else 'Start here: five short questions', 'intro': intro_html, 'sections': secs})
        gateway = parts_out[0]['sections'][0]
        gq = re.sub(r'^The Gateway:\s*', '', gateway['title'])
        topic = {
            'slug': slug, 'code': code, 'short': short, 'shelf': shelf, 'order': order,
            'title': title_case(cfg['title']), 'subtitle': cfg['subtitle'], 'tagline': cfg['tagline'],
            'edition': cfg['edition'].split(' · ')[0] + ' · ' + cfg['edition'].split(' · ')[1],
            'color1': '#' + cfg['color1'], 'color2': '#' + cfg['color2'], 'light': '#' + cfg['light'],
            'question': gq, 'entries': total_entries, 'words': total_words, 'sections': n_sections,
            'cover': media.get('cover'),
            'parts': parts_out,
        }
        (OUT / f'{slug}.json').write_text(json.dumps(topic, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        index.append({k: topic[k] for k in ('slug', 'code', 'short', 'shelf', 'order', 'title', 'subtitle', 'edition', 'color1', 'color2', 'light', 'question', 'entries', 'words', 'sections', 'cover')} |
                     {'url': f'/library/{slug}/', 'leaves': [{'id': s['id'], 'title': s['title'], 'url': s['url']} for s in parts_out[0]['sections'][1:]]})
        print(f'{slug:22} {code} parts={len(parts_out):2} sections={n_sections:3} entries={total_entries:4} words={total_words}')
    # one colour class per topic (the site's security rules do not allow inline style attributes)
    css = ['/* Made by tools/explore/build_explore.py from each booklet\'s cover colours. Do not edit by hand. */']
    for t in index:
        css.append(f".t-{t['slug']} {{ --c1: {t['color1']}; --c2: {t['color2']}; --c-light: {t['light']}; }}")
    (ROOT / 'src' / 'styles' / 'explore-topics.css').write_text('\n'.join(css) + '\n', encoding='utf-8')
    (OUT / 'index.json').write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding='utf-8')


if __name__ == '__main__':
    sys.exit(main())
