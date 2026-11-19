"""Build the MCQ solutions the real-question pages show: src/data/pyq/sol/<bank>.json = {mcq id: {lang: {w, o, t}}}.

Input: tools/pyq/sol/<bank>/NNN.tsv, one line per field:  id<TAB>lang<TAB>field<TAB>text
  w  why the keyed answer is right, with the background (a short paragraph)
  o  one high-yield note per option, in option order, separated by " ¦ "
  t  a one-line way to remember it (optional)
  b  the background for a first-time reader, as short questions and answers: "Q ‖ A ¦ Q ‖ A" (optional)
Background lines may also sit in tools/pyq/sol/bg/<bank>/NNN.tsv (same format), written after the first pass.
The ids are the ones the pages use (Rajasthan "RB2-5", NET "U5A-A1"). Written by hand, in our own words.
Run: python3 tools/pyq/sol/build_sol.py      Guide: docs/19-pyq-practice.md (Solutions)
"""
import glob, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', '..', 'src', 'data', 'pyq', 'sol')
os.makedirs(OUT, exist_ok=True)
for bank in ('raj', 'net'):
  d = {}
  for f in sorted(glob.glob(os.path.join(HERE, bank, '*.tsv'))) + sorted(glob.glob(os.path.join(HERE, 'bg', bank, '*.tsv'))):
    for n, line in enumerate(open(f, encoding='utf-8'), 1):
      line = line.rstrip('\n')
      if not line.strip(): continue
      i, lang, k, t = line.split('\t', 3)
      assert lang in ('en', 'hi') and k in ('w', 'o', 't', 'b'), f'{f}:{n}'
      e = d.setdefault(i, {}).setdefault(lang, {})
      if k == 'b':
        e[k] = [[y.strip() for y in x.split(' ‖ ')] for x in t.split(' ¦ ')]
        assert all(len(x) == 2 for x in e[k]), f'{f}:{n}'
      else:
        e[k] = [x.strip() for x in t.split(' ¦ ')] if k == 'o' else t.strip()
  json.dump(d, open(os.path.join(OUT, bank + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'), sort_keys=True)
  print(bank, len(d))
