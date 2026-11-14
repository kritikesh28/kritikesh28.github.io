// The Library map: the whole of human knowledge as one tree, from "The Universal Index of Human Knowledge".
// Guide: docs/17-library-map.md
//
// Forest = the Library
//   Theme  = one of 8 groves that group the disciplines (only for finding your way)
//     Tree   = a discipline, one of the 46 principal fields of the Universal Index (for example ASC Astronomy)
//       Branch = its main areas (ASC.03 Cosmology)
//         Twig   = a topic told as a short series (The Universe, Crochet, Movies ...)
//           Leaf   = one short page
//
// The names, branches and topics come from src/data/library/taxonomy.json, made by
// tools/library-index/build_taxonomy.py from the book. Do not edit that JSON by hand.
// This file only adds: short names, Hindi names, the 8 themes, and WHERE each written topic sits.

import taxonomy from './data/library/taxonomy.json';
import { TOPICS } from './explore';
import type { Lang } from './i18n/config';

export interface Unit { code: string; name: string; more?: string[] }
export interface Topic { code: string; name: string; units: Unit[] }
export interface Branch { code: string; name: string; topics: Topic[] }
export interface Field { code: string; name: string; slug: string; scope: string; nodes: number; branches: Branch[] }

const RAW = taxonomy as unknown as { title: string; edition: string; nodes: number; fields: Field[]; links: { topic: string; fields: string }[] };
export const LINKS = RAW.links;
export const BOOK = { title: RAW.title, edition: RAW.edition, nodes: RAW.nodes, fields: RAW.fields.length };

// code: [short English name, web address, Hindi name]
const NAMES: Record<string, [string, string, string]> = {
  AFI: ['Finance & Accounting', 'finance', 'वित्त, लेखा और बीमा'],
  AFF: ['Agriculture & Forestry', 'agriculture', 'खेती, जंगल और मछली पालन'],
  AMS: ['Anatomy & Structure', 'anatomy', 'शरीर की बनावट'],
  ANT: ['Anthropology', 'anthropology', 'मानव विज्ञान'],
  ARC: ['Archaeology & Heritage', 'archaeology', 'पुरातत्व और विरासत'],
  ALB: ['Architecture & Built World', 'architecture', 'वास्तुकला और बसावट'],
  ACP: ['Arts & Crafts', 'arts-and-crafts', 'कला और शिल्प'],
  ASC: ['Astronomy & Cosmos', 'astronomy', 'खगोल और ब्रह्मांड'],
  BEH: ['Behavioural Sciences', 'behaviour', 'व्यवहार विज्ञान'],
  BIO: ['Biology', 'biology', 'जीव विज्ञान'],
  BME: ['Business & Management', 'business', 'व्यापार और प्रबंधन'],
  CHE: ['Chemistry', 'chemistry', 'रसायन विज्ञान'],
  CJM: ['Media & Journalism', 'media', 'मीडिया और पत्रकारिता'],
  CDA: ['Computing, Data & AI', 'computing-and-ai', 'कंप्यूटर, डेटा और AI'],
  CCJ: ['Criminology & Justice', 'criminology', 'अपराध और न्याय'],
  CEI: ['Cultures & Regions', 'cultures', 'संस्कृतियाँ और क्षेत्र'],
  ESG: ['Earth Sciences & Geology', 'earth-sciences', 'पृथ्वी विज्ञान'],
  EDS: ['Economics & Development', 'economics', 'अर्थशास्त्र और विकास'],
  ELS: ['Education & Learning', 'education', 'शिक्षा और सीखना'],
  EAT: ['Engineering', 'engineering', 'इंजीनियरिंग'],
  ESS: ['Environment & Sustainability', 'environment', 'पर्यावरण'],
  FNC: ['Food, Nutrition & Cooking', 'food-and-cooking', 'भोजन, पोषण और रसोई'],
  FMS: ['Mathematics & Statistics', 'mathematics', 'गणित और सांख्यिकी'],
  GGP: ['Geography & Planning', 'geography', 'भूगोल और नियोजन'],
  HSM: ['Health & Medicine', 'health', 'स्वास्थ्य और चिकित्सा'],
  HHS: ['History', 'history', 'इतिहास'],
  HLL: ['Languages & Literature', 'literature', 'भाषा और साहित्य'],
  ILK: ['Libraries & Knowledge', 'information', 'पुस्तकालय और ज्ञान'],
  IEI: ['New & Interdisciplinary Fields', 'interdisciplinary', 'नए और मिले-जुले क्षेत्र'],
  LLS: ['Law', 'law', 'क़ानून'],
  LAS: ['Linguistics', 'linguistics', 'भाषा विज्ञान'],
  MSP: ['Security, Peace & Strategy', 'security', 'सुरक्षा, शांति और रणनीति'],
  PEL: ['Philosophy, Ethics & Logic', 'philosophy', 'दर्शन, नीति और तर्क'],
  PPS: ['Physics', 'physics', 'भौतिकी'],
  PIR: ['Politics & World Affairs', 'politics', 'राजनीति और विश्व मामले'],
  PTV: ['Professions & Vocations', 'vocations', 'पेशे और हुनर'],
  PCS: ['Psychology & the Mind', 'psychology', 'मनोविज्ञान'],
  RTC: ['Religion & Traditions', 'religion', 'धर्म और परंपराएँ'],
  SSS: ['Sociology', 'sociology', 'समाजशास्त्र'],
  SWC: ['Social Work & Community', 'social-work', 'समाज सेवा'],
  SEM: ['Sports & Movement', 'sports', 'खेल और व्यायाम'],
  TMI: ['Technology & Industry', 'technology', 'तकनीक और उद्योग'],
  THL: ['Tourism & Leisure', 'tourism', 'पर्यटन और अवकाश'],
  TIK: ['Traditional Knowledge', 'traditional-knowledge', 'पारंपरिक ज्ञान'],
  TLS: ['Transport & Logistics', 'transport', 'परिवहन और लॉजिस्टिक्स'],
  VAH: ['Veterinary & Animal Health', 'veterinary', 'पशु चिकित्सा'],
};

export type ThemeId = 'cosmos' | 'life' | 'earth' | 'mind' | 'society' | 'past' | 'arts' | 'making';
// The 8 themes: groves of related disciplines. Every one of the 46 codes appears exactly once.
export const THEMES: { id: ThemeId; en: string; hi: string; blurbEn: string; blurbHi: string; color: string; fields: string[] }[] = [
  { id: 'cosmos', en: 'Cosmos & Matter', hi: 'ब्रह्मांड और पदार्थ', blurbEn: 'Numbers, forces, atoms and stars.', blurbHi: 'अंक, बल, परमाणु और तारे।', color: '#6f5fd6', fields: ['ASC', 'PPS', 'CHE', 'FMS'] },
  { id: 'life', en: 'Life & Health', hi: 'जीवन और स्वास्थ्य', blurbEn: 'Living things, our bodies, food and movement.', blurbHi: 'जीव, हमारा शरीर, भोजन और व्यायाम।', color: '#c2514a', fields: ['BIO', 'AMS', 'HSM', 'VAH', 'FNC', 'SEM'] },
  { id: 'earth', en: 'Earth & Environment', hi: 'धरती और पर्यावरण', blurbEn: 'Rocks, maps, climate, farms and cities.', blurbHi: 'चट्टानें, नक्शे, जलवायु, खेत और शहर।', color: '#2f8a62', fields: ['ESG', 'GGP', 'ESS', 'AFF', 'ALB'] },
  { id: 'mind', en: 'Mind & Meaning', hi: 'मन और अर्थ', blurbEn: 'How we think, learn, believe and choose.', blurbHi: 'हम कैसे सोचते, सीखते, मानते और चुनते हैं।', color: '#b0699f', fields: ['PCS', 'BEH', 'PEL', 'RTC', 'ELS'] },
  { id: 'society', en: 'Society & Power', hi: 'समाज और शासन', blurbEn: 'People together: money, law, power and care.', blurbHi: 'लोग साथ में: पैसा, क़ानून, सत्ता और सेवा।', color: '#c98a2b', fields: ['SSS', 'ANT', 'PIR', 'LLS', 'CCJ', 'MSP', 'SWC', 'EDS'] },
  { id: 'past', en: 'Past & Peoples', hi: 'अतीत और लोग', blurbEn: 'History, heritage and the knowledge of every culture.', blurbHi: 'इतिहास, विरासत और हर संस्कृति का ज्ञान।', color: '#8a6a3b', fields: ['HHS', 'ARC', 'CEI', 'TIK'] },
  { id: 'arts', en: 'Words, Arts & Media', hi: 'शब्द, कला और मीडिया', blurbEn: 'Stories, languages, music, crafts and film.', blurbHi: 'कहानियाँ, भाषाएँ, संगीत, शिल्प और फ़िल्में।', color: '#d0613c', fields: ['HLL', 'LAS', 'ACP', 'CJM', 'ILK'] },
  { id: 'making', en: 'Technology & Work', hi: 'तकनीक और काम', blurbEn: 'Machines, code, business and the work of the world.', blurbHi: 'मशीनें, कोड, व्यापार और दुनिया के काम।', color: '#3f7fc4', fields: ['CDA', 'EAT', 'TMI', 'BME', 'AFI', 'PTV', 'TLS', 'THL', 'IEI'] },
];

// WHERE each written topic (a Twig with pages) sits in the tree. Add a line here when a new topic goes live.
// field: the discipline code; node: the branch or topic code it belongs to; branchName: a short label for the home tree.
export interface Shelf { slug: string; title: string; titleHi: string; url: string; field: string; node?: string; nodeLabel: string; pages: number; kind: 'course' | 'index'; question: string }
const PLACE: Record<string, { field: string; node?: string; nodeLabel: string; titleHi: string }> = {
  'the-universe': { field: 'ASC', node: 'ASC.03', nodeLabel: 'Cosmology', titleHi: 'ब्रह्मांड' },
  movies: { field: 'CJM', node: 'CJM.04.02', nodeLabel: 'Film', titleHi: 'फ़िल्में' },
  books: { field: 'HLL', node: 'HLL.02.04', nodeLabel: 'Literature', titleHi: 'किताबें' },
  music: { field: 'ACP', node: 'ACP.05', nodeLabel: 'Music', titleHi: 'संगीत' },
  'musical-instruments': { field: 'ACP', node: 'ACP.05.03', nodeLabel: 'Music', titleHi: 'वाद्य यंत्र' },
  cooking: { field: 'FNC', node: 'FNC.01', nodeLabel: 'Culinary arts', titleHi: 'खाना पकाना' },
  gardening: { field: 'AFF', node: 'AFF.08', nodeLabel: 'Horticulture', titleHi: 'बागवानी' },
  'sports-and-games': { field: 'SEM', node: 'SEM.05.04', nodeLabel: 'Sport and culture', titleHi: 'खेल और गेम' },
  technology: { field: 'TMI', nodeLabel: 'Technology', titleHi: 'तकनीक' },
  crochet: { field: 'ACP', node: 'ACP.02.02', nodeLabel: 'Fibre arts', titleHi: 'क्रोशिया' },
  knitting: { field: 'ACP', node: 'ACP.02.02', nodeLabel: 'Fibre arts', titleHi: 'बुनाई' },
  embroidery: { field: 'ACP', node: 'ACP.02.02', nodeLabel: 'Fibre arts', titleHi: 'कढ़ाई' },
  sewing: { field: 'ACP', node: 'ACP.02.02', nodeLabel: 'Fibre arts', titleHi: 'सिलाई' },
};

// Topics that are planned (named in the library, not written yet), placed in the tree too.
export const PLANNED: { title: string; titleHi: string; field: string; node?: string; status: 'next' | 'planned' }[] = [
  { title: 'How the Earth formed', titleHi: 'पृथ्वी कैसे बनी', field: 'ESG', status: 'next' },
  { title: 'Inside the Earth', titleHi: 'पृथ्वी के अंदर', field: 'ESG', status: 'planned' },
  { title: 'How machines learn', titleHi: 'मशीनें कैसे सीखती हैं', field: 'CDA', node: 'CDA.07', status: 'planned' },
  { title: 'Landforms of Rajasthan', titleHi: 'राजस्थान के भू-आकार', field: 'GGP', node: 'GGP.05', status: 'planned' },
  { title: 'Why we are curious', titleHi: 'हम जिज्ञासु क्यों हैं', field: 'PCS', status: 'planned' },
  { title: 'The Curious Sparrows stories', titleHi: 'जिज्ञासु गौरैयों की कहानियाँ', field: 'HLL', status: 'planned' },
];

const UNIVERSE: Shelf = {
  slug: 'the-universe', title: 'The Universe', titleHi: 'ब्रह्मांड', url: '/library/the-universe/', field: 'ASC', node: 'ASC.03', nodeLabel: 'Cosmology', pages: 12, kind: 'course',
  question: 'Where did everything come from?',
};
export const SHELVES: Shelf[] = [
  UNIVERSE,
  ...TOPICS.map((t) => ({ slug: t.slug, title: t.short, url: t.url, pages: t.sections, kind: 'index' as const, question: t.subtitle, ...PLACE[t.slug] })),
];

export const fieldName = (code: string, lang: Lang = 'en') => (lang === 'hi' ? NAMES[code]?.[2] : NAMES[code]?.[0]) ?? code;
export const fieldSlug = (code: string) => NAMES[code][1];
export const fieldUrl = (code: string) => `/library/map/${NAMES[code][1]}/`;
export const shelfTitle = (s: Shelf, lang: Lang = 'en') => (lang === 'hi' ? s.titleHi : s.title);
export const themeName = (id: ThemeId, lang: Lang = 'en') => { const t = THEMES.find((x) => x.id === id)!; return lang === 'hi' ? t.hi : t.en; };

export const FIELDS = RAW.fields;
export const getField = (code: string) => FIELDS.find((f) => f.code === code)!;
export const fieldBySlug = (slug: string) => FIELDS.find((f) => NAMES[f.code][1] === slug);
export const themeOf = (code: string) => THEMES.find((t) => t.fields.includes(code))!;
export const shelvesIn = (code: string) => SHELVES.filter((s) => s.field === code);
export const plannedIn = (code: string) => PLANNED.filter((p) => p.field === code);
/** the branch or topic of a field that a code like "ACP.02.02" points to */
export const nodeName = (code?: string) => {
  if (!code) return undefined;
  const f = getField(code.slice(0, 3));
  for (const b of f.branches) {
    if (b.code === code) return b.name;
    for (const t of b.topics) if (t.code === code) return t.name;
  }
  return undefined;
};
export const branchOf = (code?: string) => (code ? code.split('.').slice(0, 2).join('.') : undefined);
export const topicCount = (f: Field) => f.branches.reduce((a, b) => a + b.topics.length, 0);

// Self-check at build time: all 46 codes are named and sit in exactly one theme.
const inThemes = THEMES.flatMap((t) => t.fields);
if (inThemes.length !== FIELDS.length || FIELDS.some((f) => !NAMES[f.code] || !inThemes.includes(f.code)))
  throw new Error('library-map: every discipline needs a name in NAMES and exactly one theme in THEMES');
for (const s of SHELVES) if (!s.field) throw new Error(`library-map: say where "${s.slug}" sits in PLACE`);
