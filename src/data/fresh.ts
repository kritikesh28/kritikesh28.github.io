// "Just hatched": the sliding panel of new uploads on the home page. 6 slides × 5 lines.
// To announce something new: put a line at the TOP of the first slide and move the last line of each slide down,
// so the newest is always first. Keep each line short (one breath), true, and linked to the real page.
// `to` is a web address, or [shelf, n] for question n (counting from 0) of a shelf's first five questions.
// Guide: docs/17-library-map.md, "Announce a new upload".

import { TOPICS } from '../explore';

type Line = { en: string; hi: string; to: string | [string, number] };
export const FRESH: { en: string; hi: string; lines: Line[] }[] = [
  {
    en: 'The whole tree, planted', hi: 'पूरा पेड़ लग गया',
    lines: [
      { en: 'All of human knowledge on one tree: 46 disciplines, 3,126 topics', hi: 'इंसान का सारा ज्ञान एक पेड़ पर: 46 विषय, 3,126 टॉपिक', to: '/library/map/' },
      { en: 'Twelve encyclopedic shelves just opened in the Library', hi: 'लाइब्रेरी में बारह नई विश्वकोश अलमारियाँ खुलीं', to: '/library/#shelves' },
      { en: 'From Accounting to Veterinary science: find your branch', hi: 'हिसाब-किताब से पशु चिकित्सा तक: अपनी शाखा ढूँढिए', to: '/library/#disciplines' },
      { en: 'Astronomy: follow the Universe from its first second, in 12 steps', hi: 'खगोल: ब्रह्मांड को उसके पहले पल से, 12 कदमों में', to: '/library/the-universe/' },
      { en: 'Where AI, climate and consciousness meet across subjects', hi: 'जहाँ AI, जलवायु और चेतना कई विषयों में मिलते हैं', to: '/library/map/#links' },
    ],
  },
  {
    en: 'Stories and sound', hi: 'कहानियाँ और सुर',
    lines: [
      { en: 'Did audiences really run from a train on screen?', hi: 'क्या लोग सच में पर्दे की ट्रेन से डरकर भागे थे?', to: ['movies', 1] },
      { en: 'Why did India write its books on palm leaves?', hi: 'भारत ने अपनी किताबें ताड़ के पत्तों पर क्यों लिखीं?', to: ['books', 2] },
      { en: 'Why does a raga change with the time of day?', hi: 'राग दिन के समय के साथ क्यों बदलता है?', to: ['music', 2] },
      { en: 'Why does a sitar buzz, and why do we love it?', hi: 'सितार भनभनाता क्यों है, और हमें अच्छा क्यों लगता है?', to: ['musical-instruments', 4] },
      { en: 'Why were silent films never silent?', hi: 'मूक फ़िल्में कभी मूक क्यों नहीं थीं?', to: ['movies', 4] },
    ],
  },
  {
    en: 'Living well', hi: 'अच्छा जीना',
    lines: [
      { en: 'How did the chilli reach India from America?', hi: 'मिर्च अमेरिका से भारत कैसे पहुँची?', to: ['cooking', 2] },
      { en: 'How does a seed know which way is up?', hi: 'बीज को कैसे पता चलता है कि ऊपर किधर है?', to: ['gardening', 1] },
      { en: 'How did chess travel from India to the whole world?', hi: 'शतरंज भारत से पूरी दुनिया में कैसे पहुँचा?', to: ['sports-and-games', 2] },
      { en: "Why does grandma's food taste better? Science has an answer", hi: 'दादी के हाथ का खाना ज़्यादा स्वादिष्ट क्यों लगता है?', to: ['cooking', 5] },
      { en: 'Can you grow real food on a balcony?', hi: 'क्या बालकनी में असली खाना उगाया जा सकता है?', to: ['gardening', 4] },
    ],
  },
  {
    en: 'One thread, four crafts', hi: 'एक धागा, चार कलाएँ',
    lines: [
      { en: "Why can't a machine crochet the way it knits?", hi: 'मशीन क्रोशिया वैसे क्यों नहीं कर पाती जैसे बुनाई करती है?', to: ['crochet', 1] },
      { en: 'Is knitting a kind of computer code?', hi: 'क्या बुनाई भी एक तरह का कंप्यूटर कोड है?', to: ['knitting', 4] },
      { en: 'How is chikankari, the shadow-work of Lucknow, made?', hi: 'लखनऊ की चिकनकारी कैसे बनती है?', to: ['embroidery', 2] },
      { en: 'Why was the sewing machine called a freedom machine?', hi: 'सिलाई मशीन को आज़ादी की मशीन क्यों कहा गया?', to: ['sewing', 3] },
      { en: 'Why does every phulkari tell a family story?', hi: 'हर फुलकारी एक परिवार की कहानी क्यों कहती है?', to: ['embroidery', 3] },
    ],
  },
  {
    en: 'How things work', hi: 'चीज़ें कैसे काम करती हैं',
    lines: [
      { en: 'Why did the wheel take so long to invent?', hi: 'पहिए का आविष्कार इतनी देर से क्यों हुआ?', to: ['technology', 1] },
      { en: 'How does a fridge make cold out of electricity?', hi: 'फ्रिज बिजली से ठंडक कैसे बनाता है?', to: ['technology', 4] },
      { en: 'How does the internet reach the phone in your hand?', hi: 'इंटरनेट आपके हाथ के फ़ोन तक कैसे पहुँचता है?', to: ['technology', 5] },
      { en: 'Is space really empty? Not quite', hi: 'क्या अंतरिक्ष सच में ख़ाली है? पूरी तरह नहीं', to: '/library/the-universe/is-space-really-empty/' },
      { en: 'Where did the atoms in your body come from?', hi: 'आपके शरीर के परमाणु कहाँ से आए?', to: '/library/the-universe/where-did-your-atoms-come-from/' },
    ],
  },
  {
    en: 'Big questions, small pages', hi: 'बड़े सवाल, छोटे पन्ने',
    lines: [
      { en: 'Why do we cry for people who do not exist?', hi: 'हम उन लोगों के लिए क्यों रोते हैं जो असल में हैं ही नहीं?', to: ['movies', 6] },
      { en: 'What happens in your brain when you read?', hi: 'पढ़ते समय आपके दिमाग़ में क्या होता है?', to: ['books', 7] },
      { en: 'Why does a song get stuck in your head?', hi: 'कोई गाना दिमाग़ में अटक क्यों जाता है?', to: ['music', 5] },
      { en: 'Why do fans feel a win in their own body?', hi: 'जीत की ख़ुशी दर्शक अपने शरीर में क्यों महसूस करते हैं?', to: ['sports-and-games', 5] },
      { en: 'Why does gardening make people calmer?', hi: 'बागवानी से लोग शांत क्यों हो जाते हैं?', to: ['gardening', 5] },
    ],
  },
];

/** The slides with every line's real web address */
export const getFresh = () =>
  FRESH.map((s) => ({
    ...s,
    lines: s.lines.map((l) => {
      if (typeof l.to === 'string') return { ...l, href: l.to };
      const [slug, n] = l.to;
      const leaf = TOPICS.find((t) => t.slug === slug)?.leaves[n];
      if (!leaf) throw new Error(`fresh.ts: no question ${n} on the shelf "${slug}"`);
      return { ...l, href: leaf.url };
    }),
  }));
