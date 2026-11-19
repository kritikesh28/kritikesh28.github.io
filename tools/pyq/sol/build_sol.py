"""Build the MCQ solutions the real-question pages show: src/data/pyq/sol/<bank>.json = {mcq id: {lang: {w, o, t}}}.

Input: tools/pyq/sol/<bank>/NNN.tsv, one line per field:  id<TAB>lang<TAB>field<TAB>text
  w  why the keyed answer is right, with the background (a short paragraph)
  o  one high-yield note per option, in option order, separated by " ¦ "
  t  a one-line way to remember it (optional)
The ids are the ones the pages use (Rajasthan "RB2-5", NET "U5A-A1"). Written by hand, in our own words.
Run: python3 tools/pyq/sol/build_sol.py      Guide: docs/19-pyq-practice.md (Solutions)
"""
import glob, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', '..', 'src', 'data', 'pyq', 'sol')
os.makedirs(OUT, exist_ok=True)
for bank in ('raj', 'net'):
  d = {}
  for f in sorted(glob.glob(os.path.join(HERE, bank, '*.tsv'))):
    for n, line in enumerate(open(f, encoding='utf-8'), 1):
      line = line.rstrip('\n')
      if not line.strip(): continue
      i, lang, k, t = line.split('\t', 3)
      assert lang in ('en', 'hi') and k in ('w', 'o', 't'), f'{f}:{n}'
      e = d.setdefault(i, {}).setdefault(lang, {})
      e[k] = [x.strip() for x in t.split(' ¦ ')] if k == 'o' else t.strip()
  json.dump(d, open(os.path.join(OUT, bank + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'), sort_keys=True)
  print(bank, len(d))
