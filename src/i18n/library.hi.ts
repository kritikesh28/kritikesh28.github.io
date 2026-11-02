// Hindi names for the library's subjects, branches and short courses, keyed by their slug.
// Anything missing here shows in English. Style guide: docs/15-languages-and-hindi.md

export const CATEGORIES_HI: Record<string, { label: string; short: string; blurb: string }> = {
  'ai-ml': { label: 'AI और मशीन लर्निंग', short: 'AI', blurb: 'AI (कृत्रिम बुद्धि: कंप्यूटर का सोचने जैसा काम करना) और डेटा पर प्रोजेक्ट, नोट्स और प्रयोग।' },
  'geography-earth': { label: 'भूगोल और पृथ्वी', short: 'पृथ्वी', blurb: 'पहाड़-मैदान, नक्शे, GIS (कंप्यूटर पर नक्शे बनाने का तरीका), नदियाँ, लोग और जगहें।' },
  'exam-prep': { label: 'परीक्षा तैयारी', short: 'परीक्षा', blurb: 'UPSC, RAS और UGC-NET के नोट्स, बिल्कुल शुरुआत से समझाए हुए।' },
  'mind-ideas': { label: 'दर्शन और मनोविज्ञान', short: 'मन', blurb: 'जीवन के बड़े सवाल (दर्शन) और मन कैसे काम करता है (मनोविज्ञान), विज्ञान से जोड़कर।' },
  'stories-films': { label: 'कहानियाँ और फ़िल्में', short: 'कहानी', blurb: 'कहानी लिखना, फ़िल्मों पर बातें और Curious Sparoows की कहानियाँ।' },
  'life-skills': { label: 'जीवन और हुनर', short: 'जीवन', blurb: 'बागवानी, खाना बनाना, चित्र बनाना और नई चीज़ें सीखना।' },
};

export const BRANCHES_HI: Record<string, string> = {
  'earth-and-universe': 'पृथ्वी और ब्रह्मांड',
  'ai-basics': 'AI की बुनियादी बातें',
  'rajasthan-geography': 'राजस्थान का भूगोल',
  'how-we-learn': 'हम कैसे सीखते हैं',
  'sparrow-stories': 'गौरैया की कहानियाँ',
  'grow-and-make': 'उगाना और बनाना',
};

export const TWIGS_HI: Record<string, { title: string; question: string }> = {
  'the-universe': { title: 'ब्रह्मांड', question: 'सब कुछ कहाँ से आया?' },
  'how-earth-formed': { title: 'पृथ्वी कैसे बनी', question: 'धूल का एक बादल हमारा ग्रह कैसे बन गया?' },
  'inside-the-earth': { title: 'पृथ्वी के अंदर', question: 'हमारे पैरों के नीचे, बिल्कुल अंदर तक, क्या है?' },
  'how-machines-learn': { title: 'मशीनें कैसे सीखती हैं', question: 'सिर्फ़ अंक (नंबर) बिल्ली को पहचानना कैसे सीख लेते हैं?' },
  'rajasthan-landforms': { title: 'राजस्थान की भू-आकृतियाँ (ज़मीन के रूप)', question: 'एक ही राज्य में रेगिस्तान भी और भारत के सबसे पुराने पहाड़ भी, ऐसा क्यों?' },
  'why-curiosity': { title: 'हम जिज्ञासु (जानने को उत्सुक) क्यों होते हैं', question: 'जिस सवाल का जवाब न पता हो, वह हमें इतना परेशान क्यों करता है?' },
  'curious-sparrows-stories': { title: 'The Curious Sparrows', question: 'क्या होता है जब दो गौरैया हर बात पर “क्यों?” पूछती हैं?' },
  'gardening-from-zero': { title: 'बागवानी, शून्य से', question: 'बीज को कैसे पता चलता है कि ऊपर किधर है?' },
};

// The five levels of the library, in the same order as LEVELS in src/library.config.ts
export const LEVELS_HI = [
  { label: 'जंगल', means: 'पूरी लाइब्रेरी', like: 'पूरा विश्वविद्यालय', example: 'Curious Sparoows लाइब्रेरी' },
  { label: 'पेड़', means: 'एक बड़ा विषय', like: 'एक कोर्स', example: 'भूगोल और पृथ्वी' },
  { label: 'डाल', means: 'उस विषय का एक हिस्सा', like: 'एक मॉड्यूल (कोर्स का बड़ा भाग)', example: 'पृथ्वी और ब्रह्मांड' },
  { label: 'टहनी', means: 'एक टॉपिक, छोटे-छोटे पन्नों की एक कड़ी में', like: 'एक अध्याय', example: 'ब्रह्मांड' },
  { label: 'पत्ता', means: 'एक पन्ना, एक सवाल, लगभग 2 मिनट', like: 'एक पाठ', example: 'क्या अंतरिक्ष सच में खाली है?' },
];

// Same order as BUILD_STATUS in src/library.config.ts
export const BUILD_STATUS_HI = [
  { name: 'ब्रह्मांड (12 पत्ते)', note: 'लाइब्रेरी की पहली पूरी टहनी।' },
  { name: 'ऐसी खोज जो कभी ख़ाली हाथ न लौटाए', note: 'ठीक-ठीक जवाब न मिले, तब भी सबसे मिलते-जुलते पन्ने दिखाती है।' },
  { name: 'पढ़ाई की प्रगति', note: 'जो पत्ते आप पूरे पढ़ लेते हैं, उन पर निशान लगाती है। यह सिर्फ़ आपके ब्राउज़र में सेव होता है।' },
  { name: 'लिखते-लिखते खोज के सुझाव', note: 'आपके लिखते समय असली पन्नों के नाम सुझाती है, और स्पेलिंग गलत हो तो सही शब्द भी सुझाती है।' },
  { name: 'पृथ्वी कैसे बनी', note: 'अगली टहनी, जो अभी लिखी जा रही है।' },
  { name: 'Sparrow, AI पढ़ाई-सहायक', note: 'सिर्फ़ इसी लाइब्रेरी से आपके सवालों के जवाब देगा, और हर बार वह पन्ना भी बताएगा जिससे जवाब लिया। अभी बना नहीं है।' },
];
