// "My story" (/about/my-story/): Kritikesh's life story as questions and answers, grouped under milestones.
// He told it in his own words on 15 Nov 2026; dates come from his "My Life History" sheet on Drive.
// Tone (his wish): one person talking warmly to another (students, parents, teachers, recruiters), honest and human,
// still clear and professional. Keep each answer short: the whole page is meant to be a 2 to 3 minute read.
// To edit: change the text here (English `en`, Hindi `hi`; the Hindi keeps the meaning, not word for word,
// and the narrator is masculine: "मैं गया", "मैंने सीखा"). Paragraphs are separate strings. To add a question,
// add an item with a new, unique `id` (it becomes the link #id). Guide: docs/17-library-map.md, section 5, "My story".

export type Q = { id: string; q: { en: string; hi: string }; a: { en: string[]; hi: string[] } };
export type Milestone = { id: string; when: { en: string; hi: string }; title: { en: string; hi: string }; qs: Q[] };

export const STORY: Milestone[] = [
  {
    id: 'rawatbhata',
    when: { en: 'Before 2016', hi: '2016 से पहले' },
    title: { en: 'Rawatbhata, the naughty years', hi: 'रावतभाटा, शरारतों के साल' },
    qs: [
      {
        id: 'who-were-you',
        q: { en: 'Who were you before all this began?', hi: 'यह सब शुरू होने से पहले आप कैसे थे?' },
        a: {
          en: ["Honestly? The naughtiest boy in class. Until Class 8 I was known for my mischief, not my marks. I grew up in Rawatbhata, a small town about 50 km from Kota, and nobody would have bet on me becoming a serious student."],
          hi: ["सच कहूँ? क्लास का सबसे शरारती लड़का। आठवीं तक लोग मुझे नंबरों से नहीं, शरारतों से जानते थे। मैं रावतभाटा में बड़ा हुआ, कोटा से क़रीब 50 किलोमीटर दूर एक छोटा-सा शहर, और कोई नहीं सोचता था कि मैं कभी पढ़ाई को लेकर गंभीर बनूँगा।"],
        },
      },
      {
        id: 'what-changed-you',
        q: { en: 'So what changed you?', hi: 'तो फिर आपको किसने बदला?' },
        a: {
          en: ["Two people. In Class 8 I became friends with a boy who read novels and newspapers and followed world affairs, yet stayed humble. I changed my company, and slowly his nature became mine. A maths tutor then showed me that I could actually learn. My marks rose, and every “you can do it” kept me going. The company we keep quietly shapes our character."],
          hi: ["दो लोगों ने। आठवीं में मेरी दोस्ती एक ऐसे लड़के से हुई जो उपन्यास और अख़बार पढ़ता था, दुनिया की ख़बरें रखता था, फिर भी बहुत विनम्र था। मैंने अपनी संगत बदली, और धीरे-धीरे उसका स्वभाव मेरा बन गया। फिर गणित के एक ट्यूटर ने दिखाया कि मैं सच में सीख सकता हूँ। नंबर बढ़े, और हर “तुम कर सकते हो” मुझे आगे बढ़ाता रहा। हमारी संगत चुपचाप हमारा चरित्र गढ़ती है।"],
        },
      },
      {
        id: 'why-ias',
        q: { en: 'Where did the dream of becoming an IAS officer come from?', hi: 'IAS बनने का सपना कहाँ से आया?' },
        a: {
          en: ["From my mother. In Class 9 she planted the idea of the civil services. In 2016, when Tina Dabi topped the UPSC exam and was on every front page, I set my target: IAS at 21. With no internet or phone at home, my parents were my window to the world, and that one thought ran through my head day and night."],
          hi: ["मेरी माँ से। नौवीं में उन्होंने सिविल सेवा का बीज बोया। 2016 में जब टीना डाबी UPSC में टॉप करके हर अख़बार के पहले पन्ने पर थीं, मैंने लक्ष्य तय किया: 21 साल में IAS। घर में न इंटरनेट था, न फ़ोन; माता-पिता ही दुनिया की खिड़की थे, और वह एक बात दिन-रात मेरे दिमाग़ में घूमती थी।"],
        },
      },
    ],
  },
  {
    id: 'school-plan',
    when: { en: '2016 to 2018', hi: '2016 से 2018' },
    title: { en: '10/10 CGPA, and a plan in chunks', hi: '10/10 CGPA, और टुकड़ों में बँटी योजना' },
    qs: [
      {
        id: 'how-did-you-plan',
        q: { en: 'How does a 15-year-old plan for something that big?', hi: 'पंद्रह साल का बच्चा इतने बड़े सपने की योजना कैसे बनाता है?' },
        a: {
          en: ["I cut my life into chunks, like a project plan. Target one: 10/10 CGPA in Class 10, achieved on 28 May 2016. Target two: above 95% in Class 12, to reach Delhi University. While my classmates left for Kota to prepare for JEE or NEET, I stayed home on purpose, sure that a seat at DU would make me an IAS officer, no exam needed. A 15-year-old’s logic, but it kept me focused."],
          hi: ["मैंने अपनी ज़िंदगी को एक प्रोजेक्ट की तरह टुकड़ों में बाँटा। पहला लक्ष्य: दसवीं में 10/10 CGPA, जो 28 मई 2016 को मिला। दूसरा: बारहवीं में 95% से ऊपर, ताकि दिल्ली विश्वविद्यालय पहुँचूँ। साथी JEE या NEET के लिए कोटा गए, मैं जान-बूझकर घर रुका, यह मानकर कि DU में दाख़िला मिलते ही IAS बन जाऊँगा, कोई परीक्षा नहीं। पंद्रह साल के बच्चे का तर्क था, पर उसने मुझे भटकने नहीं दिया।"],
        },
      },
      {
        id: 'miranda-house',
        q: { en: 'Is the Miranda House story true?', hi: 'मिरांडा हाउस वाला क़िस्सा सच है?' },
        a: {
          en: ["Every word. For two years I studied to get into Miranda House, which I had heard was India’s best college. I scored 89.4% overall and 95% in science in May 2018. Then my father and I reached its gates and found out it is a women’s college. We laughed all the way back. Even a wrong target made me work hard, and since then I check my sources twice."],
          hi: ["एक-एक शब्द। दो साल मैं मिरांडा हाउस के लिए पढ़ता रहा, क्योंकि सुना था कि वह देश का सबसे अच्छा कॉलेज है। मई 2018 में कुल 89.4% और साइंस में 95% आए। फिर मैं और पापा उसके गेट पर पहुँचे और पता चला कि वह लड़कियों का कॉलेज है। लौटते हुए हम बहुत हँसे। ग़लत लक्ष्य ने भी मुझसे मेहनत करवाई, और तब से मैं हर जानकारी दो बार जाँचता हूँ।"],
        },
      },
    ],
  },
  {
    id: 'delhi',
    when: { en: '2018 to 2021', hi: '2018 से 2021' },
    title: { en: 'B.Sc. Geology, Hansraj College, DU', hi: 'B.Sc. भूविज्ञान, हंसराज कॉलेज, DU' },
    qs: [
      {
        id: 'why-geology',
        q: { en: 'Why geology, of all subjects?', hi: 'इतने विषयों में भूविज्ञान ही क्यों?' },
        a: {
          en: ["Strategy first, love later. With 89%, humanities cut-offs of 98 to 99% were out of reach, so I chose the college over the course: Geology at Hansraj College opened at exactly my 95%, and it sits close to geography, a big part of UPSC. I also learnt there is no shortcut, only graduation, then Prelims, Mains and an interview. But I fell in love with rocks, rivers and the deep history of the Earth, and from June 2019 weekend coaching at Beacon polished my knowledge and my personality."],
          hi: ["पहले रणनीति, प्यार बाद में। 89% पर मानविकी के 98 से 99% वाले कट-ऑफ़ पहुँच से बाहर थे, तो मैंने कोर्स से पहले कॉलेज चुना: हंसराज कॉलेज में भूविज्ञान ठीक मेरे 95% पर खुला, और यह भूगोल के क़रीब है, जो UPSC का बड़ा हिस्सा है। यह भी पता चला कि कोई शॉर्टकट नहीं, पहले ग्रेजुएशन, फिर प्रीलिम्स, मेन्स और इंटरव्यू। पर मुझे चट्टानों, नदियों और धरती के गहरे इतिहास से प्यार हो गया, और जून 2019 से Beacon की वीकेंड कोचिंग ने मेरे ज्ञान और व्यक्तित्व को निखारा।"],
        },
      },
      {
        id: 'covid',
        q: { en: 'What happened when COVID sent everyone home?', hi: 'जब कोविड ने सबको घर भेज दिया, तब क्या हुआ?' },
        a: {
          en: ["In April 2020 I was back in Rawatbhata, studying online. I joined Utkarsh’s Hindi-medium UPSC course, about ₹15,000 to 20,000, chosen almost at random. It turned out to be a gift: S. Shahi sir, Rajesh Mishra sir and Narendra sir built most of my foundation. I finished my B.Sc. on 9 July 2021, with a 9 CGPA in the final year."],
          hi: ["अप्रैल 2020 में मैं रावतभाटा लौटा और पढ़ाई ऑनलाइन चली। मैंने Utkarsh का हिंदी माध्यम वाला UPSC कोर्स लिया, क़रीब ₹15,000 से 20,000 का, लगभग यूँ ही चुना हुआ। वह तोहफ़ा निकला: एस. शाही सर, राजेश मिश्रा सर और नरेंद्र सर ने मेरी नींव का बड़ा हिस्सा बनाया। 9 जुलाई 2021 को मेरी B.Sc. पूरी हुई, आख़िरी साल में 9 CGPA के साथ।"],
        },
      },
    ],
  },
  {
    id: 'upsc',
    when: { en: '2021 to 2022', hi: '2021 से 2022' },
    title: { en: 'UPSC attempts, and Delhi again', hi: 'UPSC के प्रयास, और फिर दिल्ली' },
    qs: [
      {
        id: 'upsc-attempts',
        q: { en: 'How did your UPSC attempts go?', hi: 'UPSC के प्रयास कैसे रहे?' },
        a: {
          en: ["My first Prelims, on 10 October 2021, did not go through. The second came just months later, on 5 June 2022: I cleared CSAT, but General Studies stayed just out of reach. I also wrote RAS Prelims in 2021, 2023 and 2025, and many other exams. I am still trying, and if I get the chance, I will serve with complete honesty and integrity."],
          hi: ["10 अक्टूबर 2021 का मेरा पहला प्रीलिम्स नहीं निकला। दूसरा कुछ ही महीनों बाद, 5 जून 2022 को आया: CSAT पार हुआ, पर सामान्य अध्ययन (GS) ज़रा-सा दूर रह गया। मैंने 2021, 2023 और 2025 में RAS प्रीलिम्स भी दिया, और कई दूसरी परीक्षाएँ भी। मैं अब भी कोशिश कर रहा हूँ, और मौक़ा मिला तो पूरी ईमानदारी और निष्ठा से सेवा करूँगा।"],
        },
      },
      {
        id: 'delhi-coaching',
        q: { en: 'Did moving to Delhi for coaching help?', hi: 'कोचिंग के लिए दिल्ली जाने से फ़ायदा हुआ?' },
        a: {
          en: ["In July 2022 I moved to Delhi for Vajiram and Ravi and joined the 5 a.m. batch. Writing down every word my teachers said taught me to capture spoken ideas fast and accurately. I also collected their passing advice, the do’s and don’ts, into a 100-page booklet. I will share it here soon, to spare others the mistakes that cost me time."],
          hi: ["जुलाई 2022 में मैं वाजीराम एंड रवि के लिए दिल्ली गया और सुबह 5 बजे वाले बैच में जुड़ा। टीचरों का हर शब्द लिखते-लिखते मैंने बोली हुई बात को तेज़ी और सटीकता से पकड़ना सीखा। उनकी बीच-बीच की सलाहें, क्या करें और क्या न करें, मैंने 100 पन्नों की पुस्तिका में जोड़ीं। जल्द ही उसे यहाँ बाँटूँगा, ताकि दूसरों का वह समय बचे जो मेरी ग़लतियों में गया।"],
        },
      },
    ],
  },
  {
    id: 'msc',
    when: { en: '2023 to 2026', hi: '2023 से 2026' },
    title: { en: 'M.Sc. Geography, NET and research', hi: 'M.Sc. भूगोल, NET और रिसर्च' },
    qs: [
      {
        id: 'after-graduation',
        q: { en: 'What came after graduation?', hi: 'ग्रेजुएशन के बाद क्या हुआ?' },
        a: {
          en: ["I missed the M.Sc. at DU by about 1%, so in 2023 I began an M.Sc. in Geography at IGNOU: after the inside of the Earth, its outside. In 2024 I cleared CUET PG and was offered a seat at the Central University of Punjab, but stayed on my path. My dissertation on tribal poverty among the Bhil of southern Rajasthan is becoming a research paper. I completed the M.Sc. in May 2026 and qualified UGC-NET Geography."],
          hi: ["DU में M.Sc. का दाख़िला मैं क़रीब 1% से चूका, तो 2023 में IGNOU से भूगोल में M.Sc. शुरू की: धरती के अंदर के बाद, अब उसका बाहर। 2024 में CUET PG पास किया और सेंट्रल यूनिवर्सिटी ऑफ़ पंजाब में सीट मिली, पर मैं अपने रास्ते पर टिका रहा। दक्षिणी राजस्थान के भीलों की ग़रीबी पर मेरा शोध-प्रबंध अब रिसर्च पेपर बन रहा है। मई 2026 में M.Sc. पूरी हुई और मैंने UGC-NET भूगोल पास किया।"],
        },
      },
      {
        id: 'hard-days',
        q: { en: 'Were there days you wanted to give up?', hi: 'क्या ऐसे दिन भी आए जब हार मानने का मन हुआ?' },
        a: {
          en: ["Many. Some years I felt hopeless: what if I never clear it, and have no other skill? What changed was understanding. Studying ethics, society, history and polity opened my mind. I had wanted the IAS to prove I was special; I see now that was ego born of knowing too little. Administration is one way, among many, to serve people, and knowledge itself is a skill. I would not change a single day, even the worst ones: they made me who I am."],
          hi: ["बहुत। कुछ साल ऐसे थे जब निराशा घेर लेती थी: अगर कभी नहीं निकला, और कोई दूसरा हुनर भी नहीं? जो बदला, वह समझ थी। नीतिशास्त्र, समाज, इतिहास और राजव्यवस्था पढ़ते-पढ़ते मन खुला। मैं IAS इसलिए चाहता था कि दिखा सकूँ कि मैं ख़ास हूँ; अब समझता हूँ कि वह कम जानकारी से उपजा अहंकार था। प्रशासन सेवा के कई रास्तों में से एक है, और ज्ञान अपने आप में हुनर। मैं एक भी दिन नहीं बदलूँगा, सबसे बुरे दिन भी नहीं: उन्हीं ने मुझे आज का इंसान बनाया।"],
        },
      },
    ],
  },
  {
    id: 'ai',
    when: { en: '2026', hi: '2026' },
    title: { en: 'Applied AI, IIIT Bangalore', hi: 'अप्लाइड AI, IIIT बेंगलुरु' },
    qs: [
      {
        id: 'why-ai',
        q: { en: 'Why AI, after so many years of humanities?', hi: 'इतने साल मानविकी पढ़ने के बाद AI क्यों?' },
        a: {
          en: ["Because I kept seeing everyday problems around me, and solutions in my head, but had no tools to build them: small, local problems no product solves. So in 2026 I joined the Executive PG Programme in Applied AI and Agentic AI at IIIT Bangalore. My aim: combine a deep understanding of society, geography and governance with AI, and build solutions that actually work for people."],
          hi: ["क्योंकि मुझे आस-पास रोज़ की परेशानियाँ दिखती थीं, और दिमाग़ में उनके हल भी, पर उन्हें बनाने के औज़ार नहीं थे: छोटी, स्थानीय समस्याएँ, जिनका कोई हल बाज़ार में नहीं। इसलिए 2026 में मैंने IIIT बेंगलुरु के अप्लाइड AI और एजेंटिक AI के एग्ज़िक्यूटिव PG प्रोग्राम में दाख़िला लिया। मेरा लक्ष्य: समाज, भूगोल और शासन की गहरी समझ को AI से जोड़कर ऐसे हल बनाना जो सच में लोगों के काम आएँ।"],
        },
      },
    ],
  },
  {
    id: 'now',
    when: { en: 'Now', hi: 'अब' },
    title: { en: 'Curious Sparoows, and what I offer', hi: 'Curious Sparoows, और मैं क्या दे सकता हूँ' },
    qs: [
      {
        id: 'why-curious-sparoows',
        q: { en: 'Why did you build Curious Sparoows?', hi: 'आपने Curious Sparoows क्यों बनाया?' },
        a: {
          en: ["As an aspirant I often wished for someone to guide me closely and honestly, like a personal mentor. This site and its YouTube channel are my attempt to be that for others: what I have learnt, shared freely, from the basics up, without tricks or pressure. Knowledge comes from nature and belongs to everyone, and a skill passed on can change a life."],
          hi: ["तैयारी के दिनों में मैं अक्सर चाहता था कि कोई निजी मार्गदर्शक की तरह मुझे पास से और ईमानदारी से राह दिखाए। यह साइट और इसका YouTube चैनल दूसरों के लिए वही बनने की कोशिश है: जो सीखा, बुनियाद से, बिना किसी चाल या दबाव के, मुफ़्त में बाँटना। ज्ञान प्रकृति से आता है और सबका है, और सौंपा गया एक हुनर किसी की ज़िंदगी बदल सकता है।"],
        },
      },
      {
        id: 'what-i-bring',
        q: { en: 'What would you bring to a team?', hi: 'आप किसी टीम को क्या दे सकते हैं?' },
        a: {
          en: ["Years of disciplined, self-driven study across almost every subject; the habit of turning a big goal into a plan and seeing it through; and resilience after setbacks. I learn new tools quickly, write clearly, and connect fields that rarely meet: Earth science, society, data and AI. And values I never bargain on: integrity, objectivity, empathy and accountability. Whatever I work on gets my whole heart."],
          hi: ["लगभग हर विषय में सालों की अनुशासित, ख़ुद से चलाई पढ़ाई; बड़े लक्ष्य को योजना में बदलकर पूरा करने की आदत; और ठोकरों के बाद भी चलते रहने का धैर्य। मैं नए टूल जल्दी सीखता हूँ, साफ़ लिखता हूँ, और उन क्षेत्रों को जोड़ता हूँ जो कम ही मिलते हैं: पृथ्वी विज्ञान, समाज, डेटा और AI। और कुछ मूल्य जिन पर कभी समझौता नहीं: सत्यनिष्ठा, निष्पक्षता, सहानुभूति और जवाबदेही। जिस काम में लगता हूँ, उसमें पूरा मन लगाता हूँ।"],
        },
      },
    ],
  },
];
