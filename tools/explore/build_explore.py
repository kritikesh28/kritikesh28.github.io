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


def render_blocks(lines, topic, linker, current):
    """Markdown lines of one Section -> (html, entries, words)."""
    out, entries = [], []
    i, n = 0, len(lines)
    para = []

    def flush():
        if para:
            txt = ' '.join(s.strip() for s in para)
            cls = ''
            if txt.startswith('**Remember this:**'):
                cls = ' class="remember"'
            elif re.match(r'\*\*(Short answer|Web address|Keywords|Next)', txt):
                cls = ' class="meta"' if txt.startswith(('**Web address', '**Keywords')) else ''
            out.append(f'<p{cls}>{inline(txt, linker, current)}</p>')
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
                out.append(f'<h3 class="tick-h" id="{id_slug(eid)}"><label><input type="checkbox" data-tick="{eid}"><span class="eid">{eid}</span> {inline(rest, linker, current)}</label></h3>')
            else:
                out.append(f'<h3 id="{slugify(plain(h), 40)}">{inline(h.replace("☐", "").strip(), linker, current)}</h3>')
            i += 1; continue
        if s.startswith('>'):
            flush()
            box = []
            while i < n and lines[i].strip().startswith('>'):
                box.append(lines[i].strip()[1:].strip()); i += 1
            out.append(f'<aside class="note">{inline(" ".join(box), linker, current)}</aside>')
            continue
        if s.startswith('|'):
            flush()
            rows = []
            while i < n and lines[i].strip().startswith('|'):
                rows.append(lines[i]); i += 1
            head, body = parse_table(rows)
            th = ''.join(f'<th scope="col">{inline(h, linker, current)}</th>' for h in head)
            trs = []
            for r in body:
                tds = ''.join(
                    (f'<th scope="row" data-label="{html.escape(plain(head[k]) if k < len(head) else "")}">{inline(c, linker, current)}</th>' if k == 0 else
                     f'<td data-label="{html.escape(plain(head[k]) if k < len(head) else "")}">{inline(c, linker, current)}</td>')
                    for k, c in enumerate(r))
                trs.append(f'<tr>{tds}</tr>')
            out.append(f'<div class="reg"><table><thead><tr>{th}</tr></thead><tbody>{"".join(trs)}</tbody></table></div>')
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
                    items.append(
                        f'<li class="entry" id="{id_slug(eid)}"><label class="tick"><input type="checkbox" data-tick="{eid}" aria-label="Mark {eid} as learned"></label>'
                        f'<div><span class="eid">{eid}</span> <strong class="ename">{inline(name)}</strong>{inline(rest, linker, current)}</div></li>')
                elif item.startswith('☐'):
                    body = item[1:].strip()
                    key = f'{current}#{len(entries) + 1}'
                    entries.append({'id': key, 'name': plain(body)[:80]})
                    items.append(f'<li class="entry"><label class="tick"><input type="checkbox" data-tick="{key}" aria-label="Mark as learned"></label><div>{inline(body, linker, current)}</div></li>')
                else:
                    items.append(f'<li>{inline(item, linker, current)}</li>')
            cls = 'entries' if any('class="entry"' in x for x in items) else 'bullets'
            out.append(f'<ul class="{cls}">{"".join(items)}</ul>')
            continue
        if re.match(r'^\d+\.\s', s):
            flush()
            items = []
            while i < n and re.match(r'^\s*\d+\.\s', lines[i]):
                items.append(re.sub(r'^\s*\d+\.\s+', '', lines[i].rstrip())); i += 1
                while i < n and lines[i].startswith('   ') and lines[i].strip() and not re.match(r'^\s*\d+\.\s', lines[i]):
                    items[-1] += ' ' + lines[i].strip(); i += 1
            out.append('<ol>' + ''.join(f'<li>{inline(x, linker, current)}</li>' for x in items) + '</ol>')
            continue
        para.append(s); i += 1
    flush()
    text = ' '.join(lines)
    words = len(re.findall(r'\w+', plain(text)))
    return '\n'.join(out), entries, words


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
                url = f'/explore/{slug}/{id_slug(s["id"])}-{slugify(s["title"], 48)}/'
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
            intro_html = render_blocks(p['intro'], slug, linker, None)[0] if any(x.strip() for x in p['intro']) else ''
            secs = []
            for s in p['sections']:
                body, entries, words = render_blocks(s['lines'], slug, linker, s['id'])
                first = next((plain(x) for x in s['lines'] if x.strip() and not x.startswith(('#', '|', '>'))), '')
                first = re.sub(r'^(Short answer:|Web address:.*?Keywords:)\s*', '', first)
                secs.append({
                    'id': s['id'], 'title': s['title'], 'url': s['url'], 'html': body,
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
            'pdf': f'/explore/pdf/{slug}-encyclopedic-index.pdf',
            'pdfMB': round(pdf.stat().st_size / 1e6, 1) if (pdf := ROOT / 'public' / 'explore' / 'pdf' / f'{slug}-encyclopedic-index.pdf').exists() else None,
            'cover': media.get('cover'),
            'parts': parts_out,
        }
        (OUT / f'{slug}.json').write_text(json.dumps(topic, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
        index.append({k: topic[k] for k in ('slug', 'code', 'short', 'shelf', 'order', 'title', 'subtitle', 'edition', 'color1', 'color2', 'light', 'question', 'entries', 'words', 'sections', 'cover')} |
                     {'url': f'/explore/{slug}/', 'leaves': [{'id': s['id'], 'title': s['title'], 'url': s['url']} for s in parts_out[0]['sections'][1:]]})
        print(f'{slug:22} {code} parts={len(parts_out):2} sections={n_sections:3} entries={total_entries:4} words={total_words}')
    # one colour class per topic (the site's security rules do not allow inline style attributes)
    css = ['/* Made by tools/explore/build_explore.py from each booklet\'s cover colours. Do not edit by hand. */']
    for t in index:
        css.append(f".t-{t['slug']} {{ --c1: {t['color1']}; --c2: {t['color2']}; --c-light: {t['light']}; }}")
    (ROOT / 'src' / 'styles' / 'explore-topics.css').write_text('\n'.join(css) + '\n', encoding='utf-8')
    (OUT / 'index.json').write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding='utf-8')


if __name__ == '__main__':
    sys.exit(main())
