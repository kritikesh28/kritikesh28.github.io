"""Build the translation dictionaries the site reads: src/data/pyq/tr/<bank>-<lang>.json = {original: translation}.

Inputs (all in tools/pyq/tr/):
  raj-strings.json + raj-en/NNN.tsv          flip-card strings (index<TAB>English)
  raj-mcq-strings.json + raj-mcq-en/NNN.tsv  real-MCQ strings
  (later: net-strings.json + net-hi/, net-mcq-strings.json + net-mcq-hi/)
Run: python3 tools/pyq/tr/build_dict.py      Guide: docs/19-pyq-practice.md (Translations)
"""
import json, glob, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', '..', 'src', 'data', 'pyq', 'tr')
JOBS = {'raj-en': [('raj-strings.json', 'raj-en'), ('raj-mcq-strings.json', 'raj-mcq-en')],
        'net-hi': [('net-strings.json', 'net-hi'), ('net-mcq-strings.json', 'net-mcq-hi')]}
for name, parts in JOBS.items():
  d = {}
  for src, folder in parts:
    p = os.path.join(HERE, src)
    if not os.path.exists(p): continue
    strings = json.load(open(p, encoding='utf-8'))
    for f in sorted(glob.glob(os.path.join(HERE, folder, '*.tsv'))):
      for line in open(f, encoding='utf-8'):
        line = line.rstrip('\n')
        if not line: continue
        i, t = line.split('\t', 1)
        o = strings[int(i)]
        if o in d and d[o] != t: pass  # first wins (flip-card wording is the reviewed one)
        d.setdefault(o, t)
  if not d: continue
  os.makedirs(OUT, exist_ok=True)
  json.dump(d, open(os.path.join(OUT, name + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'), sort_keys=True)
  print(name, len(d))
