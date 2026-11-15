// "My story" (/about/my-story/): Kritikesh's life story as questions and answers, grouped under milestones.
// He told it in his own words on 15 Nov 2026. Every date comes from his "My Life History" Google Sheet on Drive
// (Life Log tab): it is the reference for dates. If a date here and the sheet differ, the sheet wins; check it before changing one.
// Tone (his wish): one person talking warmly to another (students, parents, teachers, recruiters), honest and human,
// still clear and professional. Keep each answer short (about 40 to 60 words): many small questions, each one a feeling or a moment, rather than long answers.
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
        id: 'what-did-it-cost',
        q: { en: 'Did that change cost you anything?', hi: 'क्या उस बदलाव की कोई क़ीमत भी चुकानी पड़ी?' },
        a: {
          en: ["It did. The loud boy went quiet. I had fewer friends, I spoke less, and for years I believed I was not very intelligent, just someone who had to work harder than everyone else. So every small rise in my marks felt like proof that I could, and every word of praise from a teacher felt like oxygen."],
          hi: ["हाँ। शोर मचाने वाला लड़का चुप हो गया। दोस्त कम हो गए, मैं कम बोलने लगा, और बरसों तक मानता रहा कि मैं ज़्यादा होशियार नहीं, बस ऐसा कोई हूँ जिसे सबसे ज़्यादा मेहनत करनी है। इसलिए नंबरों में हर छोटी बढ़त सबूत लगती थी कि मैं कर सकता हूँ, और टीचर की हर तारीफ़ साँस जैसी।"],
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
          en: ["I cut my life into chunks, like a project plan. Target one: 10/10 CGPA in Class 10, achieved on 28 May 2016. Target two: above 95% in Class 12, to reach Delhi University, because I was sure a seat at DU would make me an IAS officer, no exam needed. A 15-year-old’s logic, but it kept me focused."],
          hi: ["मैंने अपनी ज़िंदगी को एक प्रोजेक्ट की तरह टुकड़ों में बाँटा। पहला लक्ष्य: दसवीं में 10/10 CGPA, जो 28 मई 2016 को मिला। दूसरा: बारहवीं में 95% से ऊपर, ताकि दिल्ली विश्वविद्यालय पहुँचूँ, क्योंकि मुझे पक्का यक़ीन था कि DU में दाख़िला मिलते ही IAS बन जाऊँगा, कोई परीक्षा नहीं। पंद्रह साल के बच्चे का तर्क था, पर उसने मुझे भटकने नहीं दिया।"],
        },
      },
      {
        id: 'staying-back',
        q: { en: 'How did it feel when your friends left for Kota?', hi: 'जब दोस्त कोटा चले गए, तब कैसा लगा?' },
        a: {
          en: ["Lonely, and a little scary. Kota was so close, and almost everyone I knew went there for JEE or NEET. Some days I wondered if I was the one making the mistake. But my mother was clear, and so was I. I let go of almost everything else and gave those two years to one goal."],
          hi: ["अकेलापन, और थोड़ा डर भी। कोटा इतना पास था, और लगभग हर जानने वाला JEE या NEET के लिए वहीं चला गया। कुछ दिन लगता था कि कहीं ग़लती मैं ही तो नहीं कर रहा। पर माँ साफ़ थीं, और मैं भी। मैंने लगभग बाक़ी सब छोड़ दिया और वे दो साल एक ही लक्ष्य को दिए।"],
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
          en: ["Strategy first, love later. With 89%, humanities cut-offs of 98 to 99% were out of reach, so I chose the college over the course: in August 2018 I joined B.Sc. (Hons) Geology at Hansraj College, which opened at exactly my 95%, and it sits close to geography, a big part of UPSC. And slowly I fell in love with rocks, rivers and the deep history of the Earth, and from 21 June 2019 weekend coaching at Beacon polished my knowledge and my personality."],
          hi: ["पहले रणनीति, प्यार बाद में। 89% पर मानविकी के 98 से 99% वाले कट-ऑफ़ पहुँच से बाहर थे, तो मैंने कोर्स से पहले कॉलेज चुना: अगस्त 2018 में मैंने हंसराज कॉलेज में B.Sc. (ऑनर्स) भूविज्ञान में दाख़िला लिया, जो ठीक मेरे 95% पर खुला, और यह भूगोल के क़रीब है, जो UPSC का बड़ा हिस्सा है। और धीरे-धीरे मुझे चट्टानों, नदियों और धरती के गहरे इतिहास से प्यार हो गया, और 21 जून 2019 से Beacon की वीकेंड कोचिंग ने मेरे ज्ञान और व्यक्तित्व को निखारा।"],
        },
      },
      {
        id: 'first-day',
        q: { en: 'What was your first day in Delhi like?', hi: 'दिल्ली में आपका पहला दिन कैसा था?' },
        a: {
          en: ["On 4 August 2018 I walked into Hansraj College, a small-town boy in a huge city, and honestly, I was so scared. I even skipped the unofficial freshers’ party. It got easier slowly, and a field trip to Dehradun and Mussoorie in February 2019, among rocks and new friends, helped me find my feet."],
          hi: ["4 अगस्त 2018 को मैं हंसराज कॉलेज पहुँचा, बड़े शहर में एक छोटे शहर का लड़का, और सच कहूँ, बहुत डरा हुआ था। अनौपचारिक फ़्रेशर्स पार्टी में भी नहीं गया। धीरे-धीरे सब आसान हुआ, और फ़रवरी 2019 में देहरादून और मसूरी की फ़ील्ड ट्रिप ने, चट्टानों और नए दोस्तों के बीच, मुझे पैरों पर खड़ा किया।"],
        },
      },
      {
        id: 'no-shortcut',
        q: { en: 'When did you find out there was no shortcut to IAS?', hi: 'कब पता चला कि IAS का कोई शॉर्टकट नहीं है?' },
        a: {
          en: ["Soon after I reached DU. I learnt the real path: graduation first, then Prelims, Mains and an interview, often over many years. I was shocked, and deeply disappointed. My dream of IAS at 21 quietly broke that day. But I did not stop. I picked up the books again, a little older inside."],
          hi: ["DU पहुँचने के कुछ ही समय बाद। असली रास्ता समझ आया: पहले ग्रेजुएशन, फिर प्रीलिम्स, मेन्स और इंटरव्यू, अक्सर कई सालों में। मैं हैरान रह गया, और बहुत निराश भी। 21 साल में IAS का सपना उस दिन चुपचाप टूट गया। पर मैं रुका नहीं। मैंने फिर से किताबें उठाईं, अंदर से थोड़ा बड़ा होकर।"],
        },
      },
      {
        id: 'covid',
        q: { en: 'What happened when COVID sent everyone home?', hi: 'जब कोविड ने सबको घर भेज दिया, तब क्या हुआ?' },
        a: {
          en: ["In April 2020 I was back in Rawatbhata, studying online. I joined Utkarsh’s Hindi-medium UPSC course, about ₹15,000 to 20,000, chosen almost at random. It turned out to be a gift: S. Shahi sir, Rajesh Mishra sir and Narendra sir built most of my foundation. My B.Sc. final result came on 9 July 2021, with a 9 CGPA in the final year."],
          hi: ["अप्रैल 2020 में मैं रावतभाटा लौटा और पढ़ाई ऑनलाइन चली। मैंने Utkarsh का हिंदी माध्यम वाला UPSC कोर्स लिया, क़रीब ₹15,000 से 20,000 का, लगभग यूँ ही चुना हुआ। वह तोहफ़ा निकला: एस. शाही सर, राजेश मिश्रा सर और नरेंद्र सर ने मेरी नींव का बड़ा हिस्सा बनाया। 9 जुलाई 2021 को मेरी B.Sc. का अंतिम परिणाम आया, आख़िरी साल में 9 CGPA के साथ।"],
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
          en: ["My first Prelims, on 10 October 2021, did not go through. The second came just months later, on 5 June 2022: I cleared CSAT, but General Studies stayed just out of reach. My third attempt, on 24 May 2026, did not clear either. I also wrote RAS Prelims in October 2021, October 2023 and February 2025, and many other exams. I am still trying, and if I get the chance, I will serve with complete honesty and integrity."],
          hi: ["10 अक्टूबर 2021 का मेरा पहला प्रीलिम्स नहीं निकला। दूसरा कुछ ही महीनों बाद, 5 जून 2022 को आया: CSAT पार हुआ, पर सामान्य अध्ययन (GS) ज़रा-सा दूर रह गया। 24 मई 2026 का तीसरा प्रयास भी नहीं निकला। मैंने अक्टूबर 2021, अक्टूबर 2023 और फ़रवरी 2025 में RAS प्रीलिम्स भी दिया, और कई दूसरी परीक्षाएँ भी। मैं अब भी कोशिश कर रहा हूँ, और मौक़ा मिला तो पूरी ईमानदारी और निष्ठा से सेवा करूँगा।"],
        },
      },
      {
        id: 'after-prelims',
        q: { en: 'What goes on in your head after a Prelims result?', hi: 'प्रीलिम्स के नतीजे के बाद दिमाग़ में क्या चलता है?' },
        a: {
          en: ["Doubt, about everything. An aspirant’s mind looks for a reason: maybe the books, maybe the medium, maybe it is because I never joined a big Delhi coaching. You replay every choice late at night. That doubt is exactly what took me to Delhi."],
          hi: ["हर चीज़ पर शक। एक अभ्यर्थी का मन कोई वजह ढूँढता है: शायद किताबें, शायद माध्यम, शायद इसलिए कि मैंने कभी दिल्ली की कोई बड़ी कोचिंग नहीं की। देर रात तक हर फ़ैसला दिमाग़ में दोहराया जाता है। वही शक मुझे दिल्ली ले गया।"],
        },
      },
      {
        id: 'delhi-coaching',
        q: { en: 'So did a big Delhi coaching help?', hi: 'तो क्या दिल्ली की बड़ी कोचिंग से फ़ायदा हुआ?' },
        a: {
          en: ["In July 2022 I moved to Delhi for Vajiram and Ravi. I woke at 5 a.m. every day to reach the 7:30 a.m. batch on time. Writing down every word my teachers said taught me to capture spoken ideas fast and accurately. I also collected their passing advice, the do’s and don’ts, into a 100-page booklet. I will share it here soon, to spare others the mistakes that cost me time."],
          hi: ["जुलाई 2022 में मैं वाजीराम एंड रवि के लिए दिल्ली गया। सुबह 7:30 के बैच में समय पर पहुँचने के लिए रोज़ सुबह 5 बजे उठता था। टीचरों का हर शब्द लिखते-लिखते मैंने बोली हुई बात को तेज़ी और सटीकता से पकड़ना सीखा। उनकी बीच-बीच की सलाहें, क्या करें और क्या न करें, मैंने 100 पन्नों की पुस्तिका में जोड़ीं। जल्द ही उसे यहाँ बाँटूँगा, ताकि दूसरों का वह समय बचे जो मेरी ग़लतियों में गया।"],
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
        id: 'one-percent',
        q: { en: 'How did it feel to miss DU by 1%?', hi: 'DU से 1% से चूकना कैसा लगा?' },
        a: {
          en: ["It hurt. I scored 79%, and the M.Sc. cut-off sat just above it, one small step away. Moving from Delhi University to an open university felt like a step down at first. Then I swallowed my pride, and IGNOU gave me exactly what I needed: time to study, prepare and research together."],
          hi: ["दुख हुआ। मेरे 79% आए, और M.Sc. का कट-ऑफ़ ठीक उसके ऊपर था, बस एक छोटा-सा क़दम दूर। दिल्ली विश्वविद्यालय से ओपन यूनिवर्सिटी जाना पहले नीचे उतरने जैसा लगा। फिर मैंने अपना अहं छोड़ा, और IGNOU ने वही दिया जिसकी मुझे ज़रूरत थी: पढ़ाई, तैयारी और रिसर्च, तीनों के लिए समय।"],
        },
      },
      {
        id: 'after-graduation',
        q: { en: 'What did the M.Sc. years look like?', hi: 'M.Sc. के साल कैसे रहे?' },
        a: {
          en: ["In September 2023 I joined an M.Sc. in Geography at IGNOU: after the inside of the Earth, its outside. I wrote CUET PG in March 2024, and in June 2024 the Central University of Punjab offered me a seat, but I stayed on my path. I presented my dissertation on tribal poverty among the Bhil of southern Rajasthan on 9 September 2025, and it is becoming a research paper. My M.Sc. result came on 7 May 2026, and I qualified UGC-NET Geography."],
          hi: ["सितंबर 2023 में मैंने IGNOU से भूगोल में M.Sc. में दाख़िला लिया: धरती के अंदर के बाद, अब उसका बाहर। मार्च 2024 में CUET PG दिया, और जून 2024 में सेंट्रल यूनिवर्सिटी ऑफ़ पंजाब ने सीट दी, पर मैं अपने रास्ते पर टिका रहा। दक्षिणी राजस्थान के भीलों की ग़रीबी पर अपना शोध-प्रबंध मैंने 9 सितंबर 2025 को प्रस्तुत किया, और अब वह रिसर्च पेपर बन रहा है। 7 मई 2026 को M.Sc. का परिणाम आया, और मैंने UGC-NET भूगोल पास किया।"],
        },
      },
      {
        id: 'hard-days',
        q: { en: 'Were there days you wanted to give up?', hi: 'क्या ऐसे दिन भी आए जब हार मानने का मन हुआ?' },
        a: {
          en: ["Many. Some years I felt hopeless and low: what if I never clear it, and I have no other skill? Those nights were heavy, and I did not always have an answer for myself. What kept me going was small: one more chapter, one more test, one more day."],
          hi: ["बहुत। कुछ साल ऐसे थे जब निराशा और उदासी घेर लेती थी: अगर कभी नहीं निकला, और कोई दूसरा हुनर भी नहीं? वे रातें भारी थीं, और कई बार ख़ुद को भी जवाब नहीं दे पाता था। जो चलाता रहा, वह छोटा-सा था: एक और अध्याय, एक और टेस्ट, एक और दिन।"],
        },
      },
      {
        id: 'what-changed-inside',
        q: { en: 'What changed inside you over those years?', hi: 'उन सालों में आपके अंदर क्या बदला?' },
        a: {
          en: ["My reason. Studying ethics, society, history and polity opened my mind. I had wanted the IAS to prove I was special; I see now that was ego, born of knowing too little. I went from narrow-minded to welfare-minded. Administration is one way, among many, to serve people, and knowledge itself is a skill."],
          hi: ["मेरी वजह। नीतिशास्त्र, समाज, इतिहास और राजव्यवस्था पढ़ते-पढ़ते मन खुला। मैं IAS इसलिए चाहता था कि दिखा सकूँ कि मैं ख़ास हूँ; अब समझता हूँ कि वह कम जानकारी से उपजा अहंकार था। सोच संकीर्ण से लोक-कल्याण वाली बनी। प्रशासन सेवा के कई रास्तों में से एक है, और ज्ञान अपने आप में हुनर।"],
        },
      },
      {
        id: 'would-you-change-anything',
        q: { en: 'If you could go back, would you change anything?', hi: 'अगर पीछे जा सकें, तो क्या कुछ बदलेंगे?' },
        a: {
          en: [
            "No. I would walk the same road again, and here is why. For a while I was not proud of myself; I felt I had nothing to show for all those years. Today I am proud of every one of them, because each gave me something I use every day:",
            "The wrong college target taught me to check my sources. The failed attempts taught me to stay calm after a “no” and start again. The years of study gave me a deep understanding of society, land and government that no shortcut could. And the struggle turned a wish to prove myself into a wish to serve.",
            "The exam was one way to serve, never the only one. Without those years I would not be the person, or the professional, I am today.",
          ],
          hi: [
            "नहीं। मैं वही रास्ता फिर से चलूँगा, और वजह यह है। कुछ समय तक मुझे ख़ुद पर गर्व नहीं था; लगता था इतने सालों के बदले दिखाने को कुछ नहीं। आज मुझे उनमें से हर साल पर गर्व है, क्योंकि हर साल ने मुझे कुछ ऐसा दिया जो मैं रोज़ काम में लेता हूँ:",
            "ग़लत कॉलेज वाले लक्ष्य ने जानकारी जाँचना सिखाया। असफल प्रयासों ने हर “ना” के बाद शांत रहकर फिर शुरू करना सिखाया। सालों की पढ़ाई ने समाज, धरती और शासन की ऐसी गहरी समझ दी जो कोई शॉर्टकट नहीं दे सकता। और संघर्ष ने ख़ुद को साबित करने की चाह को सेवा की चाह में बदल दिया।",
            "परीक्षा सेवा का एक रास्ता थी, इकलौता कभी नहीं। उन सालों के बिना मैं आज जैसा इंसान, और जैसा पेशेवर हूँ, वैसा नहीं होता।",
          ],
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
        q: { en: 'Why AI now, after so many years of preparation?', hi: 'इतने साल की तैयारी के बाद अब AI क्यों?' },
        a: {
          en: [
            "Because of the problems I kept seeing. Geography taught me how much of daily life depends on land, water, weather and where people live: a farmer guessing when the rain will come, a village far from the nearest hospital, the tribal villages of southern Rajasthan I studied for my dissertation.",
            "Each time I could picture a way to help, but I had no tools to build it. AI can read satellite images, find patterns in data and answer people in their own language. Joined with what I learnt about land, society and government, I feel it could help with problems like these, a little better each time. So in June 2026 I joined the Executive PG Programme in Applied AI and Agentic AI at IIIT Bangalore.",
            "I am a beginner here. Many people understand both fields far better than I do, and I learn from them every day. Even after all these years of study, I feel I know very little, and that is exactly why I keep learning.",
          ],
          hi: [
            "उन समस्याओं की वजह से जो मुझे बार-बार दिखती रहीं। भूगोल ने सिखाया कि रोज़ की ज़िंदगी कितनी ज़मीन, पानी, मौसम और लोगों के रहने की जगह पर टिकी है: बारिश कब आएगी, इसका अंदाज़ा लगाता किसान, सबसे पास के अस्पताल से दूर बसा गाँव, दक्षिणी राजस्थान के वे आदिवासी गाँव जिन पर मैंने अपना शोध-प्रबंध लिखा।",
            "हर बार मुझे मदद का कोई रास्ता दिखता, पर उसे बनाने के औज़ार नहीं थे। AI उपग्रह की तस्वीरें पढ़ सकता है, डेटा में पैटर्न ढूँढ सकता है और लोगों को उनकी अपनी भाषा में जवाब दे सकता है। ज़मीन, समाज और शासन के बारे में जो सीखा, उसके साथ जुड़कर मुझे लगता है कि यह ऐसी समस्याओं में, हर बार थोड़ा बेहतर, मदद कर सकता है। इसलिए जून 2026 में मैंने IIIT बेंगलुरु के अप्लाइड AI और एजेंटिक AI के एग्ज़िक्यूटिव PG प्रोग्राम में दाख़िला लिया।",
            "यहाँ मैं अभी शुरुआत कर रहा हूँ। बहुत से लोग दोनों क्षेत्रों को मुझसे कहीं बेहतर समझते हैं, और मैं रोज़ उनसे सीखता हूँ। इतने सालों की पढ़ाई के बाद भी मुझे लगता है कि मैं बहुत कम जानता हूँ, और इसीलिए सीखता रहता हूँ।",
          ],
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
          en: ["As an aspirant I often wished for someone to guide me closely and honestly, like a personal mentor. This site and its YouTube channel are my attempt to be that for others: what I have learnt, shared freely, from the basics up, without tricks or pressure. Knowledge comes from nature and belongs to everyone, and a skill passed on can change a life. It is my hobby, not my job: I build it in my own time because helping people is simply who I am. Whatever work I take up will always come first."],
          hi: ["तैयारी के दिनों में मैं अक्सर चाहता था कि कोई निजी मार्गदर्शक की तरह मुझे पास से और ईमानदारी से राह दिखाए। यह साइट और इसका YouTube चैनल दूसरों के लिए वही बनने की कोशिश है: जो सीखा, बुनियाद से, बिना किसी चाल या दबाव के, मुफ़्त में बाँटना। ज्ञान प्रकृति से आता है और सबका है, और सौंपा गया एक हुनर किसी की ज़िंदगी बदल सकता है। यह मेरा शौक़ है, मेरी नौकरी नहीं: मैं इसे अपने ख़ाली समय में बनाता हूँ, क्योंकि लोगों की मदद करना मेरा स्वभाव है। जो भी काम मैं हाथ में लूँगा, वह हमेशा पहले रहेगा।"],
        },
      },
      {
        id: 'what-i-bring',
        q: { en: 'What did those years leave you with?', hi: 'उन सालों ने आपको क्या दिया?' },
        a: {
          en: ["Years of disciplined, self-driven study across almost every subject; the habit of turning a big goal into a plan and seeing it through; and resilience after setbacks. I love learning new tools and joining the dots between Earth science, society, data and AI. Values I never bargain on: integrity, objectivity, empathy and accountability. And the humility to know how much I still have to learn. Whatever I work on gets my whole heart."],
          hi: ["लगभग हर विषय में सालों की अनुशासित, ख़ुद से चलाई पढ़ाई; बड़े लक्ष्य को योजना में बदलकर पूरा करने की आदत; और ठोकरों के बाद भी चलते रहने का धैर्य। मुझे नए टूल सीखना और पृथ्वी विज्ञान, समाज, डेटा और AI के बीच कड़ियाँ जोड़ना अच्छा लगता है। कुछ मूल्य जिन पर कभी समझौता नहीं: सत्यनिष्ठा, निष्पक्षता, सहानुभूति और जवाबदेही। और यह विनम्रता कि अभी कितना कुछ सीखना बाक़ी है। जिस काम में लगता हूँ, उसमें पूरा मन लगाता हूँ।"],
        },
      },
      {
        id: 'to-younger-me',
        q: { en: 'What would you tell your 15-year-old self?', hi: 'पंद्रह साल के अपने आप से क्या कहेंगे?' },
        a: {
          en: ["Check your sources, twice. There is no shortcut, so learn to love the long road. You are not less intelligent; you are still learning. Ask people who have walked the path. And chase the work, not the title: serve, don’t prove."],
          hi: ["हर जानकारी दो बार जाँचो। कोई शॉर्टकट नहीं है, तो लंबे रास्ते से प्यार करना सीखो। तुम कम होशियार नहीं हो; तुम अभी सीख रहे हो। उनसे पूछो जो यह रास्ता चल चुके हैं। और पद के पीछे नहीं, काम के पीछे भागो: साबित मत करो, सेवा करो।"],
        },
      },
      {
        id: 'to-be-continued',
        q: { en: 'Is that the whole story?', hi: 'क्या कहानी बस इतनी ही है?' },
        a: {
          en: ["Not even close. Every answer here hides ten smaller stories: the mistakes, the wrong turns, the people who helped me up. They are coming, one by one, right here."],
          hi: ["बिल्कुल नहीं। यहाँ के हर जवाब के पीछे दस छोटी कहानियाँ छिपी हैं: ग़लतियाँ, ग़लत मोड़, और वे लोग जिन्होंने मुझे उठाया। वे सब आएँगी, एक-एक करके, यहीं।"],
        },
      },
    ],
  },
];
