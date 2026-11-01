#!/usr/bin/env python3
"""Turn the two Google Sheets into the data behind /exam-prep/.

The sheets stay the source of truth. Download them, run this script, commit the result.

  1. Curriculum Index sheet  -> File > Download > Microsoft Excel (.xlsx)
  2. Exam Guide sheet        -> File > Download > Microsoft Excel (.xlsx)
  3. Exam Guide analysis     -> Exam_Guide/_build/export.json (made by the PYQ analysis scripts)

  python3 tools/exam-prep/build_data.py Curriculum_Index.xlsx Exam_Guide.xlsx export.json

Needs: pip install openpyxl. Writes src/data/exam-prep/ and public/exam-prep/.
Guide: docs/14-exam-prep.md
"""
import json
import re
import sys
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parents[2]
OUT_SRC = ROOT / 'src' / 'data' / 'exam-prep'
OUT_PUB = ROOT / 'public' / 'exam-prep'

# Sheet name in the workbook -> (prefix, web slug, name). Order = order on the site.
SUBJECTS = [
    ('🏛 History', 'HIS', 'history', 'History'),
    ('🌍 Geography', 'GEO', 'geography', 'Geography'),
    ('⚖ Polity', 'POL', 'polity', 'Polity'),
    ('💹 Economy', 'ECO', 'economy', 'Economy'),
    ('🎨 Art & Culture', 'ART', 'art-culture', 'Art & Culture'),
    ('🚀 Technology', 'SNT', 'technology', 'Science & Technology'),
    ('⚛ Physics', 'PHY', 'physics', 'Physics'),
    ('⚗ Chemistry', 'CHE', 'chemistry', 'Chemistry'),
    ('🧬 Biology', 'BIO', 'biology', 'Biology'),
    ('➗ Maths', 'MAT', 'maths', 'Maths'),
    ('🧩 Reasoning', 'REA', 'reasoning', 'Reasoning'),
    ('💻 Computer', 'COM', 'computer', 'Computer'),
    ('अ Hindi', 'HIN', 'hindi', 'Hindi'),
    ('🔤 English', 'ENG', 'english', 'English'),
    ('🏜 Rajasthan', 'RAJ', 'rajasthan', 'Rajasthan GK'),
]
# Names the Exam Guide uses for a subject -> our slug
GUIDE_SUBJECT = {'Technology': 'technology', 'Art & Culture': 'art-culture', 'Rajasthan': 'rajasthan'}
ID_RE = re.compile(r'\b([A-Z]{3})-(\d+(?:\.\d+)*)\b')


def clean(s):
    if s is None:
        return ''
    s = str(s).strip()
    s = re.sub(r'^[■▸•▪◦\-\s]+', '', s)
    return re.sub(r'\s+', ' ', s).strip()


def slug_id(tid):
    return tid.lower().replace('.', '-')


def l1_of(tid):
    m = re.match(r'([A-Z]{3}-\d+)', tid)
    return m.group(1) if m else tid


def read_subject(ws, prefix):
    """Rows of one subject sheet (header on row 5, data from row 6)."""
    rows = list(ws.iter_rows(values_only=True))
    blurb = clean(rows[1][2]) if len(rows) > 1 and len(rows[1]) > 2 else ''
    head = None
    for i, r in enumerate(rows[:10]):
        if r and r[0] == 'ID':
            head = i
            break
    if head is None:
        raise SystemExit(f'No header row in {ws.title}')
    cols = {name: j for j, name in enumerate(rows[head]) if name}
    def g(r, name):
        j = cols.get(name)
        return r[j] if j is not None and j < len(r) else None
    topics = []
    for r in rows[head + 1:]:
        tid = g(r, 'ID')
        if not tid or not isinstance(tid, str) or not tid.startswith(prefix + '-'):
            continue
        lvl = g(r, 'Lvl')
        try:
            lvl = int(lvl)
        except (TypeError, ValueError):
            lvl = tid.count('.') + 1
        topics.append({
            'id': tid.strip(),
            'lvl': lvl,
            't': clean(g(r, 'Topic')),
            'p': clean(g(r, 'Date / Period')),
            'd': clean(g(r, 'Details')),
            'rel': clean(g(r, 'Related topics in other subjects')),
            'part': clean(g(r, 'Part / Unit')),
        })
    return blurb, topics


def main(ci_path, eg_path, export_path):
    ci = openpyxl.load_workbook(ci_path, read_only=True)
    eg = openpyxl.load_workbook(eg_path, read_only=True)
    guide = json.loads(Path(export_path).read_text(encoding='utf-8'))

    # PYQ counts per unit, across every paper analysed
    hits_all = {u[0]: guide['hits_all'][i] for i, u in enumerate(guide['units'])}
    last_all = {}
    for k in ('RPSC-ALL', 'RSSB-ALL'):
        for i, u in enumerate(guide['units']):
            y = guide['last'][k][i]
            if y:
                last_all[u[0]] = max(last_all.get(u[0], 0), int(y))

    prefix_slug = {p: s for _, p, s, _ in SUBJECTS}
    subjects, search = [], []
    (OUT_SRC / 'topics').mkdir(parents=True, exist_ok=True)
    OUT_PUB.mkdir(parents=True, exist_ok=True)
    l1_known = set()
    titles = {}

    all_topics = {}
    for sheet, prefix, slug, name in SUBJECTS:
        book = eg if prefix == 'RAJ' else ci
        title = '_RajMaster' if prefix == 'RAJ' else sheet
        blurb, topics = read_subject(book[title], prefix)
        all_topics[slug] = (sheet, prefix, name, blurb, topics)
        for t in topics:
            titles[t['id']] = t['t']
            if t['lvl'] == 1:
                l1_known.add(t['id'])

    for si, (sheet, prefix, slug, name) in enumerate(SUBJECTS):
        _, _, name, blurb, topics = all_topics[slug]
        majors, cur = [], None
        for t in topics:
            t['l1'] = l1_of(t['id'])
            h = hits_all.get(t['id'], 0)
            if h:
                t['q'] = h
                if t['id'] in last_all:
                    t['y'] = last_all[t['id']]
            # cross-links: keep only ids that have a page
            links = []
            for m in ID_RE.finditer(t['rel']):
                rid = f'{m.group(1)}-{m.group(2)}'
                if l1_of(rid) in l1_known and m.group(1) in prefix_slug:
                    links.append([rid, titles.get(rid) or titles.get(l1_of(rid), rid)])
            t['rel'] = links
            if t['lvl'] == 1:
                cur = {'id': t['id'], 'slug': slug_id(t['id']), 't': t['t'], 'part': t['part'], 'n': 0, 'q': 0}
                majors.append(cur)
            elif cur and t['l1'] == cur['id']:
                cur['n'] += 1
            if cur and t['l1'] == cur['id']:
                cur['q'] += t.get('q', 0) if t['lvl'] <= 2 else 0
            search.append([t['id'], t['t'], si, t['lvl']] + ([t['q']] if t.get('q') else []))
        levels = {}
        for t in topics:
            levels[t['lvl']] = levels.get(t['lvl'], 0) + 1
        subjects.append({'slug': slug, 'prefix': prefix, 'name': name, 'blurb': blurb, 'total': len(topics),
                         'levels': levels, 'majors': majors})
        for t in topics:
            if t['lvl'] != 1:
                t['part'] = ''
            for k in ('p', 'd', 'part'):
                if not t[k]:
                    del t[k]
            if not t['rel']:
                del t['rel']
        (OUT_SRC / 'topics' / f'{slug}.json').write_text(json.dumps(topics, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

    (OUT_SRC / 'subjects.json').write_text(json.dumps(subjects, ensure_ascii=False, indent=1), encoding='utf-8')
    meta = {'subjects': [[s['slug'], s['name'], s['prefix']] for s in subjects]}
    (OUT_PUB / 'search.json').write_text(json.dumps({'s': meta['subjects'], 'r': search}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')

    # Exam Guide: rankings per exam. Drive links are left out on purpose (they point into a private Drive).
    sub_index = {s['name']: i for i, s in enumerate(subjects)}
    for gname, slug in GUIDE_SUBJECT.items():
        sub_index[gname] = [i for i, s in enumerate(subjects) if s['slug'] == slug][0]
    units = [[u[0], sub_index[u[1]], u[2], u[3], u[4]] for u in guide['units']]
    def r5(x):
        return float(f'{x:.4g}') if x else 0
    scores = {k: [r5(v) for v in guide['score'][k]] for k in guide['keys']}
    hits = {k: {i: h for i, h in enumerate(guide['hits'][k]) if h} for k in guide['keys']}
    last = {k: {i: int(y) for i, y in enumerate(guide['last'][k]) if y} for k in guide['keys']}
    exams = [{'gov': e[0], 'agency': e[1], 'bank': e[2], 'name': e[3], 'key': e[4], 'alias': e[5], 'papers': e[6],
              'years': e[7], 'questions': e[8], 'syllabus': e[9] == 'Yes', 'qpp': e[10]} for e in guide['exams']]
    papers = [[p[0], p[1], p[2], p[3], p[4], p[6]] for p in guide['papers']]
    missing = [[m[0], m[2], m[3], m[4]] for m in guide['missing']]
    out = {'subjects': meta['subjects'], 'exams': exams, 'units': units, 'score': scores, 'hits': hits, 'last': last,
           'hits_all': guide['hits_all'], 'papers': papers, 'missing': missing, 'questions': guide['nq_total']}
    (OUT_PUB / 'guide.json').write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    (OUT_SRC / 'papers.json').write_text(json.dumps({'papers': papers, 'missing': missing, 'exams': exams}, ensure_ascii=False, indent=1), encoding='utf-8')
    stats = {'topics': sum(s['total'] for s in subjects), 'majors': sum(len(s['majors']) for s in subjects),
             'subjects': len(subjects), 'papers': sum(1 for p in papers if p[4] == 'pyq'),
             'syllabi': sum(1 for p in papers if p[4] != 'pyq'), 'questions': guide['nq_total'],
             'exams': len([e for e in exams if e['gov'] == 'Rajasthan Govt' and not e['key'].endswith('-ALL')])}
    (OUT_SRC / 'stats.json').write_text(json.dumps(stats, indent=1), encoding='utf-8')
    print(stats)


if __name__ == '__main__':
    if len(sys.argv) != 4:
        raise SystemExit(__doc__)
    main(*sys.argv[1:])
