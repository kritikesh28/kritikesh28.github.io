// The Portfolio's shelves. Each project (src/content/projects/*.md) names one of these in `section:`.
// A shelf with no projects yet shows its "On the workbench" card, so a visitor sees what is coming, not an empty page.
// To add a shelf: add a line here (and its group). To fill one: write a project file with that section.
// Guide: docs/18-portfolio-and-menus.md

import type { Lang } from './i18n/config';

export type PfSection = {
  slug: string;
  group: 'projects' | 'research' | 'hands';
  icon: string;
  en: string; hi: string;
  blurbEn: string; blurbHi: string;
  /** What is being prepared, shown while the shelf is empty or alongside its projects */
  comingEn: string[]; comingHi: string[];
  /** Library shelves that go with this one */
  related?: { href: string; en: string; hi: string }[];
};

export const PF_GROUPS = [
  { id: 'projects', en: 'Projects', hi: 'प्रोजेक्ट' },
  { id: 'research', en: 'Research', hi: 'शोध' },
  { id: 'hands', en: 'Made by hand', hi: 'हाथ से बना' },
] as const;

export const PF_SECTIONS: PfSection[] = [
  {
    slug: 'ai-ml', group: 'projects', icon: '✦',
    en: 'AI and machine learning', hi: 'AI और मशीन लर्निंग',
    blurbEn: 'Retrieval, agents and models built during the IIIT Bangalore programme, each with code, a demo and an honest evaluation.',
    blurbHi: 'IIIT बैंगलोर कार्यक्रम के दौरान बने रिट्रीवल, एजेंट और मॉडल, हर एक के साथ कोड, डेमो और ईमानदार जाँच।',
    comingEn: ['A question-answering assistant over exam syllabi (RAG)', 'A small agent that plans a study week', 'Model cards that say what works and what does not'],
    comingHi: ['परीक्षा पाठ्यक्रम पर सवालों के जवाब देने वाला सहायक (RAG)', 'पढ़ाई का हफ़्ता प्लान करने वाला छोटा एजेंट', 'मॉडल कार्ड, जो साफ़ बताएँ कि क्या चलता है और क्या नहीं'],
  },
  {
    slug: 'data-python', group: 'projects', icon: '⌗',
    en: 'Data and Python', hi: 'डेटा और Python',
    blurbEn: 'Cleaning, exploring and explaining real data with Python, pandas and maps.',
    blurbHi: 'Python, pandas और नक्शों से असली डेटा को साफ़ करना, खोजना और समझाना।',
    comingEn: ['More exploratory analyses with public Indian data', 'SQL practice notebooks'],
    comingHi: ['भारत के सार्वजनिक डेटा पर और विश्लेषण', 'SQL अभ्यास की नोटबुक'],
  },
  {
    slug: 'maps-gis', group: 'projects', icon: '◎',
    en: 'Maps and GIS', hi: 'नक्शे और GIS',
    blurbEn: 'QGIS maps of India and Rajasthan, satellite data and terrain.',
    blurbHi: 'भारत और राजस्थान के QGIS नक्शे, उपग्रह डेटा और भू-भाग।',
    comingEn: ['A gallery of village-level maps of Rajasthan', 'Watershed, river and peak maps', 'NDVI from Landsat and Sentinel'],
    comingHi: ['राजस्थान के गाँव स्तर तक के नक्शों की गैलरी', 'जलग्रहण, नदी और चोटियों के नक्शे', 'Landsat और Sentinel से NDVI'],
    related: [{ href: '/exam-prep/curriculum-index/geography/', en: 'Geography in the Curriculum Index', hi: 'पाठ्यक्रम सूची में भूगोल' }],
  },
  {
    slug: 'web-code', group: 'projects', icon: '</>',
    en: 'Web and other languages', hi: 'वेब और दूसरी भाषाएँ',
    blurbEn: 'Websites and small tools in HTML, CSS, TypeScript and more. This site is the first.',
    blurbHi: 'HTML, CSS, TypeScript और दूसरी भाषाओं में वेबसाइट और छोटे टूल। यह साइट पहला है।',
    comingEn: ['Small interactive tools for learners', 'Notes on how this website is built'],
    comingHi: ['सीखने वालों के लिए छोटे इंटरैक्टिव टूल', 'यह वेबसाइट कैसे बनी, उसके नोट्स'],
  },
  {
    slug: 'research', group: 'research', icon: '❡',
    en: 'Research papers', hi: 'शोध पत्र',
    blurbEn: 'Fieldwork and papers in human geography, starting with poverty and water among the Bhil tribes of southern Rajasthan.',
    blurbHi: 'मानव भूगोल में फ़ील्डवर्क और शोध पत्र, शुरुआत दक्षिणी राजस्थान की भील जनजातियों में गरीबी और पानी से।',
    comingEn: ['The Water Poverty Index paper for Banswara, with GIS maps'],
    comingHi: ['बांसवाड़ा के जल-गरीबी सूचकांक का शोध पत्र, GIS नक्शों के साथ'],
  },
  {
    slug: 'sketches', group: 'hands', icon: '✎',
    en: 'Sketches and paintings', hi: 'स्केच और पेंटिंग',
    blurbEn: 'Pencil sketches and paintings, with a line on what each one taught me.',
    blurbHi: 'पेंसिल स्केच और पेंटिंग, हर एक के साथ एक पंक्ति कि उसने मुझे क्या सिखाया।',
    comingEn: ['A first gallery of pencil sketches', 'Paintings, old and new', 'Sketchbook pages from walks and travels'],
    comingHi: ['पेंसिल स्केच की पहली गैलरी', 'पुरानी और नई पेंटिंग', 'सैर और यात्राओं की स्केचबुक के पन्ने'],
    related: [{ href: '/library/map/arts-and-crafts/', en: 'Arts and crafts in the Library', hi: 'लाइब्रेरी में कला और शिल्प' }],
  },
  {
    slug: 'kitchen', group: 'hands', icon: '♨',
    en: 'From my kitchen', hi: 'मेरी रसोई से',
    blurbEn: 'What I cooked, how it went, and the small science behind it.',
    blurbHi: 'मैंने क्या पकाया, कैसा बना, और उसके पीछे का थोड़ा-सा विज्ञान।',
    comingEn: ['Dishes I cook at home, with photos', 'Rajasthani food, told in my own words', 'Kitchen experiments that worked, and some that did not'],
    comingHi: ['घर पर बने पकवान, तस्वीरों के साथ', 'राजस्थानी खाना, मेरे अपने शब्दों में', 'रसोई के प्रयोग, जो सफल हुए और कुछ जो नहीं'],
    related: [{ href: '/library/cooking/', en: 'The Cooking shelf in the Library', hi: 'लाइब्रेरी की रसोई वाली अलमारी' }],
  },
  {
    slug: 'garden', group: 'hands', icon: '❦',
    en: 'Garden and tree planting', hi: 'बगीचा और पेड़ लगाना',
    blurbEn: 'My garden through the seasons, and the trees I plant and look after.',
    blurbHi: 'मौसम-दर-मौसम मेरा बगीचा, और मेरे लगाए और सँभाले हुए पेड़।',
    comingEn: ['A season-by-season garden diary', 'Every tree I plant, with where and when', 'What grows well in a Rajasthan summer'],
    comingHi: ['मौसम-दर-मौसम बगीचे की डायरी', 'मेरा लगाया हर पेड़, कहाँ और कब', 'राजस्थान की गर्मी में क्या अच्छा उगता है'],
    related: [{ href: '/library/gardening/', en: 'The Gardening shelf in the Library', hi: 'लाइब्रेरी की बागवानी वाली अलमारी' }],
  },
];

export const pfSection = (slug?: string) => PF_SECTIONS.find((s) => s.slug === slug);
export const pfName = (s: PfSection, lang: Lang) => (lang === 'hi' ? s.hi : s.en);
export const pfUrl = (s: PfSection) => `/portfolio/${s.slug}/`;
