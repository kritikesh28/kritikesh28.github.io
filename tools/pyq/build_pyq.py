"""Turn Kritikesh's PYQ Word files into the data behind /exam-prep/pyq/.

Usage (guide: docs/19-pyq-practice.md):
  python3 tools/pyq/build_pyq.py raj  <Topic-Wise Q&A .docx> <original MCQ .docx>
  python3 tools/pyq/build_pyq.py net  <Topic-Wise Q&A .docx> <original MCQ .docx>

Writes src/data/pyq/<bank>.json (and images to public/pyq/<bank>/). Never edit the JSON by hand:
fix the Word file, then run this again.

What it keeps: every Q&A row (question, answer, kind, exams, MCQ ids, flag) grouped by syllabus
group and sub-topic, and every original MCQ (stem, options, correct option, exam tag). It leaves
out the printed book's explanation boxes (that text belongs to the publisher).
"""
import json, re, sys, os, io
import docx
from docx.oxml.ns import qn
from docx.table import Table
from docx.text.paragraph import Paragraph

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def clean(s):
    s = s.replace(' ', ' ').replace('\t', ' ')
    return re.sub(r'[ ]{2,}', ' ', s).strip()

def body_items(d):
    """Paragraphs and tables in reading order."""
    for el in d.element.body.iterchildren():
        if el.tag == qn('w:p'):
            yield Paragraph(el, d)
        elif el.tag == qn('w:tbl'):
            yield Table(el, d)

def style(p):
    return p.style.name if p.style is not None else ''

def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

# ---------------------------------------------------------------- Q&A (topic-wise)
KINDS = ['PYQ-corrected', 'PYQ', 'Rev', 'Expl', 'Tab', 'Box', 'Option', 'Added']
FLAG = re.compile(r'\n?\(((?:पुस्तक|विवादित|book|disputed)[^)]*)\)\s*$')

def parse_tag(tag):
    parts = tag.rsplit(' · ', 1)
    head, ids = (parts[0], parts[1]) if len(parts) == 2 else (parts[0], '')
    kind = next((k for k in KINDS if head == k or head.startswith(k + ' ')), '')
    exams = head[len(kind):].strip() if kind else head.strip()
    ex = [clean(x) for x in exams.split(';') if clean(x)]
    return kind or 'Added', ex, [i.strip() for i in ids.split(',') if i.strip()]

def parse_qa(path, bank):
    d = docx.Document(path)
    groups, g, sub = [], None, None
    started = False
    for it in body_items(d):
        if isinstance(it, Paragraph):
            st, tx = style(it), clean(it.text)
            if not tx: continue
            if st == 'Heading 1':
                if re.match(r'^(परिशिष्ट|Appendix)', tx):
                    started = False; g = None; continue
                started = True
                m = re.match(r'^(G\d+):\s*(.*)$', tx)
                if m: gid, gt = m.group(1), m.group(2)
                else:
                    m = re.match(r'^Unit ([IVX]+)\s*—\s*(.*)$', tx)
                    gid, gt = ('U' + m.group(1), m.group(2)) if m else (slugify(tx), tx)
                g = {'id': gid, 't': gt, 'subs': []}; groups.append(g); sub = None
            elif st == 'Heading 2' and started and g is not None:
                m = re.match(r'^(G\d+(?:\.\d+)?)\s+(.*)$', tx)
                if m: sid, stt = m.group(1), m.group(2)
                else: sid, stt = f"{g['id']}.{len(g['subs']) + 1}", tx
                other = bool(re.search(r'— (अन्य|Other)$', stt))
                stt = re.sub(r'\s*— (अन्य|Other)$', '', stt)
                if other and bank == 'net': stt = re.sub(r'^Unit [IVX]+$', '', stt)
                # one "other" bucket per group (the Hindi file has both G3 and G3.0 "— अन्य")
                ex = next((s for s in g['subs'] if s.get('other') and other), None)
                if ex: sub = ex; continue
                sub = {'id': sid, 't': stt or ('अन्य' if bank == 'raj' else 'Other'), 'other': other, 'rows': []}
                g['subs'].append(sub)
        elif isinstance(it, Table) and started and sub is not None:
            rows = it.rows
            if len(rows) < 2 or len(it.columns) != 2: continue
            h = clean(rows[0].cells[0].text)
            if h not in ('प्रश्न', 'Question'): continue
            for r in rows[1:]:
                q, a = r.cells[0].text.strip(), r.cells[1].text.strip()
                m = re.match(r'^(\d+)\.\s*(.*?)\s*\[([^\[\]]*)\]\s*$', q, re.S)
                if not m:
                    m2 = re.match(r'^(\d+)\.\s*(.*)$', q, re.S)
                    n, qt, tag = (m2.group(1), m2.group(2), '') if m2 else ('0', q, '')
                else:
                    n, qt, tag = m.groups()
                kind, exams, ids = parse_tag(tag)
                flag = ''
                fm = FLAG.search(a)
                if fm: flag = fm.group(1); a = a[:fm.start()]
                row = {'n': int(n), 'q': clean(qt), 'a': clean(a), 'k': kind}
                if exams: row['x'] = exams
                if ids: row['i'] = ids
                if flag: row['f'] = clean(flag)
                sub['rows'].append(row)
    for g in groups:
        g['subs'] = [s for s in g['subs'] if s['rows']]
        for s in g['subs']:
            s['slug'] = slugify(s['id'] if not s['other'] or bank == 'raj' else s['id'])
    groups = [g for g in groups if g['subs']]
    # unique slugs
    seen = set()
    for g in groups:
        for s in g['subs']:
            base = slugify(s['id']); sl = base; k = 2
            while sl in seen: sl = f'{base}-{k}'; k += 1
            seen.add(sl); s['slug'] = sl
    return groups

# ---------------------------------------------------------------- original MCQs
def table_cells(t):
    out = []
    for r in t.rows:
        cells, last = [], None
        for c in r.cells:
            if c._tc is last: continue
            last = c._tc
            cells.append(clean(c.text))
        out.append(cells)
    return out

OPT_PARA = re.compile(r'^\(?([1-4]|[A-D])\)\s*(.+)$')
OPT_INLINE = re.compile(r'\(([1-4])\)\s*(.*?)(?=\s+\([1-4]\)\s|$)')

def try_options_from_table(cells):
    flat = [c for row in cells for c in row if c]
    opts = {}
    for c in flat:
        m = OPT_PARA.match(c)
        if not m: return None
        opts[m.group(1)] = clean(m.group(2))
    if len(opts) == 4: return [opts[k] for k in sorted(opts)]
    return None

class ImgSaver:
    def __init__(self, d, bank):
        self.d, self.bank, self.n = d, bank, 0
        self.dir = os.path.join(ROOT, 'public', 'pyq', bank)
        os.makedirs(self.dir, exist_ok=True)
    def save(self, el):
        out = []
        for fill in el.iter(qn('pic:blipFill')):
            blip = fill.find(qn('a:blip'))
            if blip is None: continue
            src = fill.find(qn('a:srcRect'))
            crop = [int(src.get(k, 0)) / 100000 for k in ('l', 't', 'r', 'b')] if src is not None else [0, 0, 0, 0]
            rid = blip.get(qn('r:embed'))
            part = self.d.part.related_parts.get(rid)
            if part is None: continue
            self.n += 1
            name = f'fig-{self.n:03d}.webp'
            try:
                from PIL import Image
                im = Image.open(io.BytesIO(part.blob)).convert('RGB')
                if any(crop):  # the part of the picture Word actually shows
                    w, h = im.size
                    l, t, r, bt = crop
                    im = im.crop((int(w * max(l, 0)), int(h * max(t, 0)), int(w * (1 - max(r, 0))), int(h * (1 - max(bt, 0)))))
                im.thumbnail((900, 900))
                im.save(os.path.join(self.dir, name), 'WEBP', quality=72)
            except Exception:
                name = f'fig-{self.n:03d}.png'
                open(os.path.join(self.dir, name), 'wb').write(part.blob)
            out.append(f'/pyq/{self.bank}/{name}')
        return out

def finish(q):
    """Pull options out of the stem blocks when they were printed as option lines or a 2×2 table."""
    if q is None: return None
    blocks, opts, keep = q.pop('_b'), {}, []
    for b in blocks:
        if 'p' in b:
            t = b['p']
            inl = OPT_INLINE.findall(t) if t.startswith('(1)') and '(2)' in t else []
            if len(inl) >= 2:
                for k, v in inl: opts[k] = clean(v)
                continue
            m = OPT_PARA.match(t)
            if m and m.group(1) in '1234' and len(t) < 400:
                opts[m.group(1)] = clean(m.group(2)); continue
            if m and m.group(1) in 'ABCD' and (q.get('_abcd') or t.startswith('(')):
                opts[str('ABCD'.index(m.group(1)) + 1)] = clean(m.group(2)); continue
            keep.append(b)
        elif 'tb' in b and not opts:
            o = try_options_from_table(b['tb'])
            if o: opts = {str(i + 1): v for i, v in enumerate(o)}; continue
            keep.append(b)
        else:
            keep.append(b)
    q.pop('_abcd', None)
    if not opts:
        # last resort: options printed as "1. x" / "A. x" lines or cells, the last four items of the stem
        LOOSE = re.compile(r'^\(?([1-4]|[A-Da-d])[.)]?\s+(.+)$')
        items = []
        for idx, b in enumerate(keep):
            if 'p' in b: items.append((idx, None, b['p']))
            elif 'tb' in b:
                for c in [c for row in b['tb'] for c in row if c]: items.append((idx, 'tb', c))
        tail = items[-4:]
        ms = [LOOSE.match(t) for _, _, t in tail]
        if len(tail) == 4 and all(ms) and len({m.group(1).upper() for m in ms}) == 4 and tail[0][0] > 0:
            keys = [m.group(1).upper() for m in ms]
            if keys in (['1', '2', '3', '4'], ['A', 'B', 'C', 'D']):
                drop = {i for i, _, _ in tail}
                keep = [b for i, b in enumerate(keep) if i not in drop]
                opts = {str(n + 1): clean(m.group(2)) for n, m in enumerate(ms)}
    if sorted(opts) == ['1', '2', '3', '4']:
        q['o'] = [opts[k] for k in '1234']
    else:
        # options could not be read cleanly: keep them in the stem so nothing is lost
        for k in sorted(opts): keep.append({'p': f'({k}) {opts[k]}'})
    q['s'] = keep
    return q

def parse_raj_mcq(path):
    d = docx.Document(path)
    chapters, ch, q, mode = [], None, None, 'stem'
    pending_no = None
    for it in body_items(d):
        if isinstance(it, Paragraph):
            st, tx = style(it), clean(it.text)
            if not tx: continue
            if st == 'Heading 1':
                m = re.match(r'^अध्याय (\d+)$', tx)
                if m: pending_no = int(m.group(1)); continue
                if pending_no:
                    if ch and q: ch['m'].append(finish(q)); q = None
                    ch = {'id': f'ch{pending_no}', 'no': pending_no, 't': tx, 'm': []}; chapters.append(ch); pending_no = None
                continue
            if st.startswith('Heading') or ch is None: continue
            for line in it.text.split('\n'):
                q, mode = raj_line(ch, q, mode, clean(line))
        elif isinstance(it, Table) and q is not None and mode == 'stem':
            q['_b'].append({'tb': table_cells(it)})
    if ch and q: ch['m'].append(finish(q))
    return chapters

def raj_line(ch, q, mode, tx):
            if not tx: return q, mode
            m = re.match(r'^प्रश्न\s*(\d+)\.\s*(.*)$', tx)
            if m:
                if q: ch['m'].append(finish(q))
                stem = m.group(2)
                tags = re.findall(r'[\[(]([^\[\]()]*(?:\d{4}|\d{2}\.\d{2}|-\d{2})[^\[\]()]*)[\])]\s*', stem)
                tag = '; '.join(clean(t) for t in tags)
                stem = re.sub(r'\s*(\[[^\[\]]*\]\s*)+[-–]?\s*$', '', stem)
                stem = re.sub(r'\s*\((PTET|[^()]*\d{4}[^()]*)\)\s*$', '', stem)
                q = {'n': int(m.group(1)), 'x': tag, '_b': [{'p': clean(stem.rstrip(' -–'))}]}
                return q, 'stem'
            if q is None: return q, mode
            m = re.match(r'^उत्तर\s*[:：]?\s*\(?(\d)\)?\s*(\*)?', tx)
            if m and mode == 'stem':
                q['a'] = int(m.group(1))
                if m.group(2): q['star'] = 1
                return q, 'expl'
            if mode == 'stem': q['_b'].append({'p': tx})
            return q, mode

def parse_net_mcq(path):
    d = docx.Document(path)
    saver = ImgSaver(d, 'net')
    units, u, part, q = [], None, '', None
    for it in body_items(d):
        if isinstance(it, Paragraph):
            st, raw = style(it), it.text
            tx = clean(raw)
            imgs = saver.save(it._p) if q is not None or True else []
            if st == 'Heading 1':
                if u and q: u['m'].append(finish(q)); q = None
                m = re.match(r'^Unit[- ]*\s*(\d+)\s*([A-Z])\s*(.*)$', clean(raw.replace('\n', ' ')))
                code = f'U{m.group(1)}{m.group(2)}' if m else slugify(tx)
                title = m.group(3).title().replace('Settelement', 'Settlement').replace('Economical', 'Economic').replace('&', 'and') if m else tx
                u = {'id': code.lower(), 'code': code, 't': title, 'm': []}; units.append(u); continue
            if st == 'Heading 2':
                if q: u['m'].append(finish(q)); q = None
                part = 'N' if 'NTA' in tx else 'A'; continue
            if u is None: continue
            for li, line in enumerate(raw.split('\n')):
                q = net_line(u, q, part, line, imgs if li == 0 else [])
        elif isinstance(it, Table) and q is not None and 'a' not in q:
            q['_b'].append({'tb': table_cells(it)})
            for im in saver.save(it._tbl): q['_b'].append({'img': im})
    if u and q: u['m'].append(finish(q))
    for un in units: un['m'] = [x for x in un['m'] if x and x.get('a')]
    return units

def net_line(u, q, part, raw, imgs):
            tx = clean(raw)
            if re.match(r'^\[p\. \d+\]$', tx): return q
            m = re.match(r'^(\d+)\.\s+(.*)$', raw.strip().replace('\t', ' ', 1)) if re.match(r'^\d+\.\t', raw.strip()) or re.match(r'^\d+\.\s{1,}\S', raw.strip()) else None
            if m and (q is None or 'a' in q):
                if q: u['m'].append(finish(q))
                q = {'n': int(m.group(1)), 'p': part, '_b': [{'p': clean(m.group(2))}]}
                for im in imgs: q['_b'].append({'img': im})
                return q
            m = re.match(r'^Ans\w*\s*[.:：]?\s*\(?\s*([1-4A-D*]?)\s*\)?\s*(.*)$', tx)
            if m and q is not None:
                if 'a' in q: return q
                v = m.group(1)
                q['a'] = int(v) if v.isdigit() else ('ABCD'.index(v) + 1 if v and v in 'ABCD' else 0)
                tag = re.sub(r'^\[|\]$', '', clean(m.group(2))).strip()
                if tag: q['x'] = clean(tag)
                return q
            if q is not None and 'a' not in q:
                if tx: q['_b'].append({'p': tx})
                for im in imgs: q['_b'].append({'img': im})
                if re.search(r'Assertion|labelled as', tx): q['_abcd'] = True
            return q

def main():
    bank, qa, mcq = sys.argv[1], sys.argv[2], sys.argv[3]
    groups = parse_qa(qa, bank)
    papers = parse_raj_mcq(mcq) if bank == 'raj' else parse_net_mcq(mcq)
    out = {'bank': bank, 'groups': groups, 'papers': papers}
    os.makedirs(os.path.join(ROOT, 'src', 'data', 'pyq'), exist_ok=True)
    p = os.path.join(ROOT, 'src', 'data', 'pyq', f'{bank}.json')
    json.dump(out, open(p, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    nrows = sum(len(s['rows']) for g in groups for s in g['subs'])
    nm = sum(len(c['m']) for c in papers)
    noopt = sum(1 for c in papers for m in c['m'] if 'o' not in m)
    print(f'{bank}: {len(groups)} groups, {sum(len(g["subs"]) for g in groups)} sub-topics, {nrows} Q&A rows; {len(papers)} chapters, {nm} MCQs ({noopt} without clickable options) -> {p}')

if __name__ == '__main__':
    main()
