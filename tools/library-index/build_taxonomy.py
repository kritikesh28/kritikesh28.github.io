#!/usr/bin/env python3
"""Turn The Universal Index of Human Knowledge into site data.

Source: tools/library-index/source/universal-index.md (the Word book saved as text/Markdown).
Output: src/data/library/taxonomy.json  (46 principal fields > branches > topics > study units)
Run:    python3 -I tools/library-index/build_taxonomy.py
Guide:  docs/17-library-map.md
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'tools/library-index/source/universal-index.md'
OUT = ROOT / 'src/data/library/taxonomy.json'

def slugify(s):
    s = s.lower().replace('&', 'and')
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s

lines = SRC.read_text(encoding='utf-8').splitlines()
start = next(i for i, l in enumerate(lines) if l.startswith('# MASTER ALPHABETICAL DISCIPLINE CATALOGUE'))
end = next(i for i, l in enumerate(lines) if l.startswith('# CROSS-DISCIPLINARY RELATIONSHIP MAP'))

fields, f, b, t, u = [], None, None, None, None
R1 = re.compile(r'^# ([A-Z]{3}) (.+)$')
R2 = re.compile(r'^## ([A-Z]{3}\.\d+) (.+)$')
R3 = re.compile(r'^– ([A-Z]{3}(?:\.\d+){2}) (.+)$')
R4 = re.compile(r'^· ([A-Z]{3}(?:\.\d+){3}) (.+)$')
R5 = re.compile(r'^› ([A-Z]{3}(?:\.\d+){4,}) (.+)$')
for raw in lines[start + 1:end]:
    l = raw.strip()
    if not l:
        continue
    if m := R1.match(l):
        f = {'code': m[1], 'name': m[2].strip(), 'slug': slugify(m[2]), 'scope': '', 'nodes': 0, 'branches': []}
        fields.append(f); b = t = u = None; continue
    if f is None:
        continue
    if l.startswith('Field code:'):
        if m := re.search(r'Entries in branch: ([\d,]+)', l):
            f['nodes'] = int(m[1].replace(',', ''))
        continue
    if m := R2.match(l):
        b = {'code': m[1], 'name': m[2].strip(), 'topics': []}; f['branches'].append(b); t = u = None; continue
    if m := R3.match(l):
        t = {'code': m[1], 'name': m[2].strip(), 'units': []}; b['topics'].append(t); u = None; continue
    if m := R4.match(l):
        u = {'code': m[1], 'name': m[2].strip(), 'more': []}; t['units'].append(u); continue
    if m := R5.match(l):
        (u['more'] if u else t['units']).append(m[2].strip() if u else {'code': m[1], 'name': m[2].strip(), 'more': []}); continue
    if not f['branches'] and not f['scope'] and not l.startswith('#'):
        f['scope'] = l

# drop empty "more" lists to keep the file small
for f in fields:
    for b in f['branches']:
        for t in b['topics']:
            for u in t['units']:
                if not u['more']:
                    del u['more']

# the cross-disciplinary relationship map: | topic | connected fields |
links = []
cm = next(i for i, l in enumerate(lines) if l.startswith('# CROSS-DISCIPLINARY RELATIONSHIP MAP'))
for l in lines[cm + 1:]:
    if l.startswith('# '):
        break
    cells = [c.strip() for c in l.strip().strip('|').split('|')]
    if len(cells) == 2 and cells[0] and not set(cells[0]) <= set(':- ') and cells[0] != 'Integrative topic':
        links.append({'topic': cells[0], 'fields': cells[1].rstrip('.')})

assert len(fields) == 46, f'expected 46 principal fields, found {len(fields)}'
count = sum(1 + sum(1 + sum(1 + len(t['units']) + sum(len(u.get('more', [])) for u in t['units']) for t in b['topics']) for b in f['branches']) for f in fields)
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps({'title': 'The Universal Index of Human Knowledge', 'edition': 'Expanded First Edition 1.0', 'nodes': count, 'fields': fields, 'links': links}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'{len(fields)} fields, {count} nodes -> {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)')
