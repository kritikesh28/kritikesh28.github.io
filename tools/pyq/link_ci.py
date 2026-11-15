"""Match Curriculum Index topics to PYQ flip cards by their key words.

Usage: python3 tools/pyq/link_ci.py      (run after build_pyq.py or after the Curriculum Index data changes)
Writes src/data/pyq/ci-match.json:
  topics: { CI id: [bank, [card keys "subslug:n", best first], [matched words], [whole decks (sub slugs) from SUB_MAP]] }
          (topics with at least MIN matched cards, or a hand-matched deck)
  rows:   { bank: { card key: CI id } }   (the best syllabus topic of each card, for "In the syllabus" links)
How: words that are rare across the cards (in under 3% of them) are the key words. A card matches a topic when it
shares a whole phrase of the topic's text, or at least two key words. Rajasthan cards (Hindi) are matched with the
Hindi text of the Rajasthan GK topics and of Indian-geography topics; NET cards (English) with the English text of
the Geography topics; a one-word title alone is not enough. SUB_MAP adds whole decks that are the same thing as a
syllabus topic (checked by hand), and DROP removes matches found to be off-topic. Guide: docs/19-pyq-practice.md
"""
import json, os, re, collections

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D = lambda *p: os.path.join(ROOT, 'src', 'data', *p)
MIN = 4
CAP = 40  # cards on one topic page (= SET_SIZE in src/pyq.ts)

def load(p):
    return json.load(open(p, encoding='utf-8'))

def rows_of(bank):
    data = load(D('pyq', f'{bank}.json'))
    out = []
    for g in data['groups']:
        for s in g['subs']:
            for r in s['rows']:
                k = len(r.get('x', [])) if r['k'].startswith('PYQ') or r['k'] == 'Rev' else 0
                out.append((f"{s['slug']}:{r['n']}", (r['q'] + ' ' + r['a']).lower(), k))
    return out

HI_STOP = set('राजस्थान राज्य भारत जिला जिले जिलों प्रमुख सबसे ज़्यादा ज्यादा कम किस किसे कौन कौनसा कौनसी कौन-सा कहाँ कितने कितनी कितना होता होती होते है हैं था थी थे और तथा एवं में से का की के को पर लिए सम्बन्ध संबंध प्रकार भाग क्षेत्र क्षेत्रफल प्रदेश स्थित पुस्तक अनुसार नाम वाला वाली वाले यह वह जो दूसरी दूसरे बड़ा बड़ी छोटा उत्तर दक्षिण पूर्व पश्चिम पूर्वी पश्चिमी उत्तरी दक्षिणी'.split())
# place names (districts, divisions, neighbours) say where, not what: they never make a match on their own
PLACES = set('अजमेर अलवर बाँसवाड़ा बांसवाड़ा बाड़मेर भरतपुर भीलवाड़ा बीकानेर बूँदी बूंदी चित्तौड़गढ़ चूरू दौसा धौलपुर डूँगरपुर डूंगरपुर गंगानगर श्रीगंगानगर हनुमानगढ़ जयपुर जैसलमेर जालौर जालोर झालावाड़ झुंझुनूँ झुंझुनू जोधपुर करौली कोटा नागौर पाली प्रतापगढ़ राजसमंद राजसमन्द सवाई माधोपुर सीकर सिरोही टोंक उदयपुर बारां ब्यावर केकड़ी शाहपुरा डीडवाना कुचामन दूदू कोटपूतली बहरोड़ खैरथल तिजारा अनूपगढ़ बालोतरा फलौदी सलूम्बर सांचौर गंगापुर डीग पाकिस्तान पंजाब हरियाणा गुजरात मध्य प्रदेश उत्तर संभाग संभागों'.split())
EN_STOP = set('after before difference based land central government group value good service east west north south eastern western economic social change relationship structure system natural physical feature place cultural landscape human people process pattern patterns development spatial distribution factor factors level levels form forms use area areas state states country countries model models population environment environmental political power new modern local global national international urban rural the of and in on for to a an by with from as at its is are was were be or which what who whom how why where when that this these those into than then also its their his her it not no geography geographical concept concepts theory theories type types study studies role nature meaning definition scope major main world india indian regional region regions basic general other approach approaches introduction'.split())

def toks(text, hi):
    text = text.lower()
    if hi:
        ws = re.findall(r'[ऀ-ॿa-z0-9]+', text)
        return [w for w in ws if len(w) >= 3 and w not in HI_STOP and w not in PLACES and not w.isdigit()]
    ws = re.findall(r'[a-z][a-z\-]+', text)
    out = []
    for w in ws:
        w = w.strip('-')
        if len(w) < 4 or w in EN_STOP: continue
        if w.endswith('ies'): w = w[:-3] + 'y'
        elif w.endswith('s') and not w.endswith('ss'): w = w[:-1]
        out.append(w)
    return out

def phrases(text):
    text = re.sub(r'["“”‘’]', '', text)
    parts = re.split(r'[,;()/:]|\s+और\s+|\s+and\s+|\s+—\s+|\s+-\s+', text)
    return [p.strip().lower() for p in parts if len(p.strip()) >= 5 and not re.fullmatch(r'[\d\s.,%°\'-]+', p.strip())]

# Rajasthan: which Q&A groups a Rajasthan GK topic may match by key words (a whole phrase may match any group)
RAJ_GROUPS = {31: ('g1-1', 'g1-2', 'g1-3'), 32: ('g1-0', 'g1-4', 'g1-5', 'g1-6', 'g1-7', 'g1-8'), 33: ('g2',), 34: ('g1-9', 'g1-4', 'g1-6', 'g1-7', 'g1-8'),
              35: ('g3', 'g4'), 36: ('g3',), 37: ('g5',), 38: ('g6', 'g1-9'), 39: ('g7', 'g1-5'), 40: ('g9',), 41: ('g8',), 42: ('g1-1', 'g1-2', 'g1-3')}
# NET cards are matched only inside the Geography majors that the NET syllabus covers
NET_MAJORS = {1, 3, 4, 5, 10, 11, 12, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 30, 31, 37} | set(range(41, 72)) | set(range(132, 137))

# Whole PYQ sub-topics that are the same thing as a syllabus topic (checked by hand). These link straight to the deck.
SUB_MAP = {
    'raj': {
        'RAJ-31.1': ['g1-1'], 'RAJ-31.2': ['g1-2'], 'RAJ-31.3': ['g1-3'], 'RAJ-32': ['g1-0', 'g1-4'], 'RAJ-32.1': ['g1-7'], 'RAJ-32.2': ['g1-5'],
        'RAJ-32.3': ['g1-8'], 'RAJ-32.4': ['g1-6'], 'RAJ-33.1': ['g2-1'], 'RAJ-33.2': ['g2-3'], 'RAJ-33.3': ['g2-5'], 'RAJ-34': ['g1-9'],
        'RAJ-35.1': ['g4'], 'RAJ-35.2': ['g3'], 'RAJ-36': ['g3'], 'RAJ-37': ['g5'], 'RAJ-38': ['g6'], 'RAJ-39': ['g7'], 'RAJ-40': ['g9-0'], 'RAJ-41': ['g8'],
    },
    'net': {
        'GEO-25.6.4': ['uvii-4'], 'GEO-25.6.5': ['uvii-4'], 'GEO-30.1.2': ['uvii-4'], 'GEO-123.3': ['uvii-4'], 'GEO-123.4': ['uvii-4'], 'GEO-25.8.2': ['uvii-4', 'uvii-7'],
        'GEO-25.6.7': ['uvii-5'], 'GEO-29.7.4': ['uvii-5'], 'GEO-25.6': ['uvii-6', 'uvii-9', 'uvii-13'], 'GEO-25.8': ['uvii-7'],
        'GEO-25.7': ['uvii-10'], 'GEO-25.7.1': ['uvii-10'], 'GEO-123.7': ['uvii-10'], 'GEO-25.9': ['uvii-11', 'uvii-12'],
        'GEO-18.1': ['uvii-1'], 'GEO-42.1.1': ['uvii-1'], 'GEO-23.5': ['uvii-2'], 'GEO-62.2.4': ['uvii-2'], 'GEO-133.3': ['uvii-3'], 'GEO-133.5': ['uvii-3'],
        'GEO-01.6': ['uviii-1', 'uviii-2', 'uviii-3', 'uviii-6'], 'GEO-01.3': ['uviii-4'], 'GEO-01.7': ['uviii-5'], 'GEO-37.1': ['uviii-5'],
        'GEO-31.1': ['uix-1'], 'GEO-20.2': ['uvi-1'], 'GEO-56': ['uvi-1'], 'GEO-28.1': ['uvi-5'], 'GEO-28.5': ['uvi-6', 'uvi-8'], 'GEO-20.6': ['uvi-6'],
        'GEO-26.9': ['uiv-1'], 'GEO-65.1': ['uv-4'], 'GEO-24.1': ['uv-1', 'uv-2', 'uv-3', 'uv-4'],
    },
}

# Topics whose word matches were checked by hand and found off-topic
DROP = {'GEO-13', 'GEO-13.1', 'GEO-17.4', 'GEO-56.1.5'}

def main():
    banks = {'raj': rows_of('raj'), 'net': rows_of('net')}
    df = {}
    for b, rows in banks.items():
        c = collections.Counter()
        for _, t, _ in rows: c.update(set(toks(t, b == 'raj')))
        df[b] = (c, len(rows))
    rowtok = {b: [(k, t, h, set(toks(t, b == 'raj'))) for k, t, h in rows] for b, rows in banks.items()}

    def rare(b, w):
        c, n = df[b]
        return 0 < c[w] <= max(3, n * 0.03)

    topics = {}
    for slug in ('rajasthan', 'geography'):
        T = load(D('exam-prep', 'topics', f'{slug}.json'))
        H = load(D('exam-prep', 'hi', 'topics', f'{slug}.json'))
        byid = {t['id']: t for t in T}
        for t in T:
            h = H.get(t['id'], {}); h = h if isinstance(h, dict) else {'t': h}
            parts = t['id'].split('.')
            anc = ' , '.join(byid[x]['t'] + ', ' + (byid[x].get('d') or '') for x in ('.'.join(parts[:i]) for i in range(1, len(parts))) if x in byid)
            jobs = []
            n = int(t['l1'].split('-')[1])
            if slug == 'rajasthan':
                if not 31 <= n <= 42: continue
                jobs.append(('raj', (h.get('t', '') + ', ' + h.get('d', '')), RAJ_GROUPS[n], False))
            else:
                if n in NET_MAJORS: jobs.append(('net', t['t'] + ', ' + (t.get('d') or ''), None, False))
                if 123 <= n <= 153: jobs.append(('raj', (h.get('t', '') + ', ' + h.get('d', '')), (), True))
            for b, text, allow, phrase_only in jobs:
                hi = b == 'raj'
                kw = {w for w in toks(text, hi) if rare(b, w)}
                # a short English title ("Boundary", "Frontier", "Heartland theory") is itself the concept
                title_kw = set(toks(t['t'], False)) if not hi else set()
                short = not hi and 0 < len(title_kw) <= 2 and all(rare(b, w) for w in title_kw)
                # ...but only on cards that also name the parent topic ("Origin" under Settlements needs "settlement" too)
                ctx = {w for w in toks(anc, False) if rare(b, w)} - title_kw if short else set()
                # one Hindi word is enough inside Rajasthan GK, but an Indian-geography topic needs a two-word phrase
                ph = [p for p in phrases(text) if len(toks(p, hi)) >= (2 if phrase_only or not hi else 1)]
                hits = []
                for k, rt, heat, rset in rowtok[b]:
                    words = kw & rset
                    phr = [p for p in ph if p in rt]
                    in_group = allow is None or k.split(':')[0].startswith(allow)
                    if not in_group or phrase_only: words = set()
                    score = 3 * len(phr) + len(words)
                    very_rare = any(df[b][0][w] <= max(2, df[b][1] * 0.01) for w in words)
                    short_hit = False  # one-word English titles ("Pacific", "Antecedent") matched the wrong cards too often; NET relies on SUB_MAP
                    if short_hit and not phrase_only: words = words | title_kw; score = 3 * len(phr) + len(words) + 2
                    if phr or short_hit or (len(words) >= 2 and very_rare) or (b == 'raj' and in_group and allow and len(words) >= 1 and very_rare):
                        hits.append((score, heat, k, sorted(words)[:3] + phr[:2]))
                if len(hits) >= MIN:
                    hits.sort(key=lambda x: (-x[0], -x[1]))
                    hits = hits[:CAP]
                    words = collections.Counter(w for h_ in hits for w in h_[3])
                    prev = topics.get(t['id'])
                    if not prev or len(hits) > len(prev[1]):
                        topics[t['id']] = [b, [x[2] for x in hits], [w for w, _ in words.most_common(6)], [x[0] for x in hits]]
    for tid in DROP: topics.pop(tid, None)
    for b, m in SUB_MAP.items():
        subs_rows = collections.defaultdict(list)
        for k, _, _ in banks[b]: subs_rows[k.split(':')[0]].append(k)
        for tid, slugs in m.items():
            for sl in slugs: assert sl in subs_rows, (b, sl)
            prev = topics.get(tid)
            if prev and prev[0] != b: prev = None
            keys = (prev[1] if prev else [])
            topics[tid] = [b, keys, prev[2] if prev else [], prev[3] if prev else [], slugs]
    # the best topic for each card: the deepest topic with the highest score for it
    best = {'raj': {}, 'net': {}}
    for tid, (b, keys, _, scores, *_) in topics.items():
        depth = tid.count('.')
        for k, s in zip(keys, scores):
            cur = best[b].get(k)
            if not cur or (s, depth) > (cur[1], cur[2]): best[b][k] = (tid, s, depth)
    out = {'topics': {k: v[:3] + [v[4] if len(v) > 4 else []] for k, v in topics.items()}, 'rows': {b: {k: v[0] for k, v in m.items()} for b, m in best.items()}}
    json.dump(out, open(D('pyq', 'ci-match.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    by = collections.Counter(v[0] for v in topics.values())
    print(f"{len(topics)} topics with {MIN}+ cards ({dict(by)}); cards with a syllabus topic: raj {len(best['raj'])}/{len(banks['raj'])}, net {len(best['net'])}/{len(banks['net'])}")

if __name__ == '__main__':
    main()
