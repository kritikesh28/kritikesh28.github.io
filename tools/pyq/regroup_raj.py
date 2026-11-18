"""Sort the Rajasthan real exam questions into the official syllabus topics (G1.1 … G2.6), not the
source book's chapters. Writes src/data/pyq/raj-topics.json: {"RB3-170": "G1.5", ...}.

Usage: python3 tools/pyq/regroup_raj.py        (run again after build_pyq.py raj)
How a question gets its topic, in order:
  1. HAND: a short hand-checked list below;
  2. the Q&A rows made from it: the sub-topic most of them sit in;
  3. climate questions (no Q&A rows yet): keywords in the stem, then in the options;
  4. otherwise the broad physical-features topic G1.4.
src/pyq.ts builds the topic pages from this file. Guide: docs/19-pyq-practice.md
"""
import json, os, re, collections

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D = json.load(open(os.path.join(ROOT, 'src/data/pyq/raj.json'), encoding='utf-8'))

HAND = {'RB3-3': 'G1.4', 'RB3-24': 'G1.7', 'RB5-1': 'G2.1', 'RB5-98': 'G2.1', 'RB5-76': 'G2.1', 'RB5-80': 'G2.1',
        'RB5-31': 'G2.5', 'RB5-83': 'G2.5', 'RB5-88': 'G2.5'}
# small leftovers go to the nearest big topic so no page has one or two questions
FOLD = {'G1.0': 'G1.4', 'G3': 'G1.4', 'G7': 'G1.4'}
CLIMATE = [  # first match wins
    ('G2.5', r"कोपेन|थॉर्नथ्वेट|थार्नथ्वेट|थॉर्नवेट|ट्रिवार्था|जलवायु (प्रदेश|क्षेत्र|प्रदेशों|क्षेत्रों|खण्ड|प्रकार)|जलवायु (है|पाई|पायी|वाला)|(आर्द्र|शुष्क|स्टेपी)\s*(जलवायु|जिला)|BWhw|BShw|\bAw\b|Cwg|A'w|A'd|B'w|शुष्क प्रदेश|आर्द्र प्रदेश|शुष्कतम"),
    ('G2.6', r'सूखा|सूखे|अकाल|बाढ़|मरुस्थलीकरण|मरुस्थल का प्रसार'),
    ('G2.3', r'वर्षा|मानसून|मावठ|मावट|समवर्षा|बादल|आर्द्रता|विक्षोभ|ओलावृष्टि|बौछार'),
    ('G2.4', r'पवन|हवा|आँधी|आंधी|आँधि|आंधि|वायुदाब|समदाब|लू\b|लू |चक्रवात|भभूल्या|धूल|पुरवा|पुरवै'),
    ('G2.2', r'तापमान|तापान्तर|तापांतर|ताप|गर्म|ठंड|ठण्ड|पाला|सेल्सियस|°'),
]

links = collections.defaultdict(collections.Counter)
for g in D['groups']:
    for s in g['subs']:
        for r in s['rows']:
            for i in r.get('i', []):
                if re.fullmatch(r'RB\d-\d+', i): links[i][s['id']] += 1

out, how = {}, collections.Counter()
for p in D['papers']:
    for m in p['m']:
        rid = f"RB{p['no']}-{m['n']}"
        stem = ' '.join(x.get('p', '') for x in m['s'])
        opts = ' '.join(m.get('o', []))
        if rid in HAND:
            t, h = HAND[rid], 'hand'
        elif links[rid]:
            t, h = links[rid].most_common(1)[0][0], 'rows'
        elif p['no'] == 5:
            t = next((k for k, rx in CLIMATE if re.search(rx, stem)), None) or next((k for k, rx in CLIMATE if re.search(rx, opts)), 'G2.1')
            h = 'climate keywords'
        else:
            t, h = 'G1.4', 'default'
        t = FOLD.get(t, t)
        if t.startswith('G2') and p['no'] != 5 and h == 'rows':
            pass  # a physical-features question whose facts sit under climate: keep it with climate
        out[rid] = t
        how[h] += 1

json.dump(out, open(os.path.join(ROOT, 'src/data/pyq/raj-topics.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0, sort_keys=False)
print('how:', dict(how))
print('per topic:', dict(sorted(collections.Counter(out.values()).items())))
