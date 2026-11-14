// Every major government (and entrance) exam in India, grouped by who conducts it, from the lowest post to the highest.
// Shown on /exam-prep/all-exams/, in the Exam Prep menu, on the Exam Prep page and in site search.
// `live` marks groups that already have topic rankings from past papers (Rajasthan today). The rest are named first;
// their detailed pages come later. Order inside a group: roughly from the highest post down to entry level.
// Guide: docs/14-exam-prep.md, "All exams of India".

export type CatExam = { en: string; hi: string; noteEn: string; noteHi: string; href?: string };
export type CatGroup = { id: string; en: string; hi: string; bodyEn: string; bodyHi: string; live?: boolean; exams: CatExam[] };

export const EXAM_CATALOGUE: CatGroup[] = [
  {
    id: 'upsc', en: 'UPSC', hi: 'UPSC',
    bodyEn: 'Union Public Service Commission: the top civil, defence and technical services of the Government of India',
    bodyHi: 'संघ लोक सेवा आयोग: भारत सरकार की सबसे ऊँची प्रशासनिक, रक्षा और तकनीकी सेवाएँ',
    exams: [
      { en: 'Civil Services Examination (CSE)', hi: 'सिविल सेवा परीक्षा (CSE)', noteEn: 'IAS, IPS, IFS, IRS and other Group A and B services; Prelims, Mains, Interview', noteHi: 'IAS, IPS, IFS, IRS और दूसरी ग्रुप A व B सेवाएँ; प्रारंभिक, मुख्य परीक्षा और इंटरव्यू' },
      { en: 'Indian Forest Service (IFoS)', hi: 'भारतीय वन सेवा (IFoS)', noteEn: 'Shares the CSE Prelims, then its own Mains', noteHi: 'प्रारंभिक परीक्षा CSE वाली, फिर अपनी अलग मुख्य परीक्षा' },
      { en: 'Engineering Services (ESE / IES)', hi: 'इंजीनियरिंग सेवा परीक्षा (ESE / IES)', noteEn: 'Civil, mechanical, electrical and electronics engineers for central services', noteHi: 'केंद्रीय सेवाओं के लिए सिविल, मैकेनिकल, इलेक्ट्रिकल और इलेक्ट्रॉनिक्स इंजीनियर' },
      { en: 'Indian Economic Service / Indian Statistical Service (IES / ISS)', hi: 'भारतीय आर्थिक सेवा / भारतीय सांख्यिकी सेवा (IES / ISS)', noteEn: 'For postgraduates in economics and statistics', noteHi: 'अर्थशास्त्र और सांख्यिकी के स्नातकोत्तरों के लिए' },
      { en: 'Combined Geo-Scientist Examination', hi: 'संयुक्त भू-वैज्ञानिक परीक्षा', noteEn: 'Geologists, geophysicists, chemists and hydrogeologists (GSI, CGWB)', noteHi: 'भूवैज्ञानिक, भूभौतिकीविद्, रसायनज्ञ और जल-भूवैज्ञानिक (GSI, CGWB)' },
      { en: 'Combined Medical Services (CMS)', hi: 'संयुक्त चिकित्सा सेवा (CMS)', noteEn: 'Medical officers for railways, ordnance factories and central health services', noteHi: 'रेलवे, आयुध कारख़ानों और केंद्रीय स्वास्थ्य सेवाओं के चिकित्सा अधिकारी' },
      { en: 'CAPF Assistant Commandants', hi: 'CAPF सहायक कमांडेंट', noteEn: 'Officers of BSF, CRPF, CISF, ITBP and SSB', noteHi: 'BSF, CRPF, CISF, ITBP और SSB के अधिकारी' },
      { en: 'Combined Defence Services (CDS)', hi: 'संयुक्त रक्षा सेवा (CDS)', noteEn: 'Officer entry to IMA, INA, AFA and OTA for graduates', noteHi: 'स्नातकों के लिए IMA, INA, AFA और OTA में अधिकारी के रूप में प्रवेश' },
      { en: 'National Defence Academy and Naval Academy (NDA & NA)', hi: 'राष्ट्रीय रक्षा अकादमी और नौसेना अकादमी (NDA & NA)', noteEn: 'Officer training for the three services, after Class 12', noteHi: 'बारहवीं के बाद तीनों सेनाओं के अधिकारी बनने का रास्ता' },
      { en: 'EPFO Enforcement Officer / APFC', hi: 'EPFO प्रवर्तन अधिकारी / APFC', noteEn: 'Recruitment tests for the Employees’ Provident Fund Organisation', noteHi: 'कर्मचारी भविष्य निधि संगठन की भर्ती परीक्षाएँ' },
    ],
  },
  {
    id: 'ssc', en: 'SSC', hi: 'SSC',
    bodyEn: 'Staff Selection Commission: Group B and C posts in central ministries, departments and forces',
    bodyHi: 'कर्मचारी चयन आयोग: केंद्र सरकार के मंत्रालयों, विभागों और बलों में ग्रुप B और C के पद',
    exams: [
      { en: 'Combined Graduate Level (CGL)', hi: 'संयुक्त स्नातक स्तर (CGL)', noteEn: 'Inspectors, assistants, auditors and other graduate-level posts', noteHi: 'इंस्पेक्टर, असिस्टेंट, ऑडिटर जैसे स्नातक स्तर के पद' },
      { en: 'Junior Engineer (JE)', hi: 'जूनियर इंजीनियर (JE)', noteEn: 'Civil, mechanical and electrical engineering posts', noteHi: 'सिविल, मैकेनिकल और इलेक्ट्रिकल इंजीनियरिंग के पद' },
      { en: 'Central Police Organisation (CPO)', hi: 'केंद्रीय पुलिस संगठन (CPO)', noteEn: 'Sub-Inspectors in Delhi Police and the CAPFs', noteHi: 'दिल्ली पुलिस और CAPF में सब-इंस्पेक्टर' },
      { en: 'Combined Hindi Translators (JHT)', hi: 'संयुक्त हिंदी अनुवादक (JHT)', noteEn: 'Junior and senior Hindi translators', noteHi: 'कनिष्ठ और वरिष्ठ हिंदी अनुवादक' },
      { en: 'Stenographer Grade C and D', hi: 'स्टेनोग्राफ़र ग्रेड C और D', noteEn: 'Shorthand posts in ministries and offices', noteHi: 'मंत्रालयों और दफ़्तरों में आशुलिपि (शॉर्टहैंड) के पद' },
      { en: 'Combined Higher Secondary Level (CHSL)', hi: 'संयुक्त उच्चतर माध्यमिक स्तर (CHSL)', noteEn: 'Lower Division Clerk, Junior Secretariat Assistant, Data Entry Operator, after Class 12', noteHi: 'बारहवीं के बाद LDC, JSA और डेटा एंट्री ऑपरेटर' },
      { en: 'Selection Posts', hi: 'सिलेक्शन पोस्ट', noteEn: 'Many small posts at Class 10, 12 and graduate level, in phases', noteHi: 'दसवीं, बारहवीं और स्नातक स्तर के कई छोटे पद, चरणों में' },
      { en: 'Delhi Police Head Constable and Constable', hi: 'दिल्ली पुलिस हेड कांस्टेबल और कांस्टेबल', noteEn: 'Executive, driver and ministerial posts', noteHi: 'एग्ज़ीक्यूटिव, ड्राइवर और मिनिस्टीरियल पद' },
      { en: 'GD Constable', hi: 'GD कांस्टेबल', noteEn: 'Constables in BSF, CISF, CRPF, ITBP, SSB, SSF and Riflemen in Assam Rifles, after Class 10', noteHi: 'दसवीं के बाद BSF, CISF, CRPF, ITBP, SSB, SSF में कांस्टेबल और असम राइफल्स में राइफलमैन' },
      { en: 'Multi-Tasking Staff and Havaldar (MTS)', hi: 'मल्टी-टास्किंग स्टाफ़ और हवलदार (MTS)', noteEn: 'Entry-level posts, after Class 10', noteHi: 'दसवीं के बाद शुरुआती स्तर के पद' },
    ],
  },
  {
    id: 'banking', en: 'Banking and insurance', hi: 'बैंक और बीमा',
    bodyEn: 'IBPS, SBI, RBI, NABARD, SEBI and the insurance companies',
    bodyHi: 'IBPS, SBI, RBI, NABARD, SEBI और बीमा कंपनियाँ',
    exams: [
      { en: 'RBI Grade B Officer', hi: 'RBI ग्रेड B अधिकारी', noteEn: 'Officers of the Reserve Bank of India', noteHi: 'भारतीय रिज़र्व बैंक के अधिकारी' },
      { en: 'SEBI Grade A', hi: 'SEBI ग्रेड A', noteEn: 'Officers of the Securities and Exchange Board of India', noteHi: 'भारतीय प्रतिभूति और विनिमय बोर्ड के अधिकारी' },
      { en: 'NABARD Grade A and B', hi: 'NABARD ग्रेड A और B', noteEn: 'Officers for rural and agricultural development banking', noteHi: 'ग्रामीण और कृषि विकास बैंकिंग के अधिकारी' },
      { en: 'SIDBI Grade A', hi: 'SIDBI ग्रेड A', noteEn: 'Officers of the Small Industries Development Bank', noteHi: 'लघु उद्योग विकास बैंक के अधिकारी' },
      { en: 'SBI PO and SBI SO', hi: 'SBI PO और SBI SO', noteEn: 'Probationary and specialist officers of the State Bank of India', noteHi: 'भारतीय स्टेट बैंक के प्रोबेशनरी और विशेषज्ञ अधिकारी' },
      { en: 'IBPS PO and IBPS SO', hi: 'IBPS PO और IBPS SO', noteEn: 'Officers of the public sector banks', noteHi: 'सरकारी बैंकों के अधिकारी' },
      { en: 'IBPS RRB Officer Scale I, II and III', hi: 'IBPS RRB ऑफ़िसर स्केल I, II और III', noteEn: 'Officers of the regional rural banks', noteHi: 'क्षेत्रीय ग्रामीण बैंकों के अधिकारी' },
      { en: 'LIC AAO and ADO; NIACL AO', hi: 'LIC AAO और ADO; NIACL AO', noteEn: 'Officers of the public insurance companies', noteHi: 'सरकारी बीमा कंपनियों के अधिकारी' },
      { en: 'RBI Assistant', hi: 'RBI असिस्टेंट', noteEn: 'Assistants of the Reserve Bank', noteHi: 'रिज़र्व बैंक के असिस्टेंट' },
      { en: 'SBI Clerk (Junior Associate) and IBPS Clerk', hi: 'SBI क्लर्क (जूनियर एसोसिएट) और IBPS क्लर्क', noteEn: 'Clerical posts in public sector banks', noteHi: 'सरकारी बैंकों में क्लर्क के पद' },
      { en: 'IBPS RRB Office Assistant', hi: 'IBPS RRB ऑफ़िस असिस्टेंट', noteEn: 'Multipurpose clerks of the regional rural banks', noteHi: 'क्षेत्रीय ग्रामीण बैंकों के बहुउद्देशीय क्लर्क' },
      { en: 'NABARD Development Assistant; RBI Office Attendant', hi: 'NABARD डेवलपमेंट असिस्टेंट; RBI ऑफ़िस अटेंडेंट', noteEn: 'Entry-level posts', noteHi: 'शुरुआती स्तर के पद' },
    ],
  },
  {
    id: 'railways', en: 'Railways', hi: 'रेलवे',
    bodyEn: 'Railway Recruitment Boards (RRB) and Railway Recruitment Cells (RRC)',
    bodyHi: 'रेलवे भर्ती बोर्ड (RRB) और रेलवे भर्ती प्रकोष्ठ (RRC)',
    exams: [
      { en: 'RRB Junior Engineer (JE, DMS, CMA)', hi: 'RRB जूनियर इंजीनियर (JE, DMS, CMA)', noteEn: 'Engineering and depot posts', noteHi: 'इंजीनियरिंग और डिपो के पद' },
      { en: 'RRB NTPC Graduate Level', hi: 'RRB NTPC स्नातक स्तर', noteEn: 'Station master, goods train manager, senior clerk and similar posts', noteHi: 'स्टेशन मास्टर, गुड्स ट्रेन मैनेजर, सीनियर क्लर्क जैसे पद' },
      { en: 'RRB NTPC Undergraduate Level', hi: 'RRB NTPC अंडर-ग्रेजुएट स्तर', noteEn: 'Clerks and ticket clerks, after Class 12', noteHi: 'बारहवीं के बाद क्लर्क और टिकट क्लर्क' },
      { en: 'RPF Sub-Inspector and Constable', hi: 'RPF सब-इंस्पेक्टर और कांस्टेबल', noteEn: 'Railway Protection Force', noteHi: 'रेलवे सुरक्षा बल' },
      { en: 'RRB Assistant Loco Pilot (ALP) and Technician', hi: 'RRB सहायक लोको पायलट (ALP) और टेक्नीशियन', noteEn: 'Running staff and technical posts, after ITI or diploma', noteHi: 'ITI या डिप्लोमा के बाद चालक दल और तकनीकी पद' },
      { en: 'RRB Paramedical and Ministerial posts', hi: 'RRB पैरामेडिकल और मिनिस्टीरियल पद', noteEn: 'Nurses, pharmacists, teachers, translators and others', noteHi: 'नर्स, फ़ार्मासिस्ट, शिक्षक, अनुवादक और दूसरे पद' },
      { en: 'RRB Group D (Level 1)', hi: 'RRB ग्रुप D (लेवल 1)', noteEn: 'Track maintainers, helpers, porters and other entry posts, after Class 10 or ITI', noteHi: 'दसवीं या ITI के बाद ट्रैक मेंटेनर, हेल्पर, पोर्टर जैसे शुरुआती पद' },
    ],
  },
  {
    id: 'nta', en: 'NTA: NET and entrance tests', hi: 'NTA: NET और प्रवेश परीक्षाएँ',
    bodyEn: 'National Testing Agency: eligibility for lecturers and researchers, and entry to colleges',
    bodyHi: 'राष्ट्रीय परीक्षा एजेंसी: प्राध्यापक और शोधार्थी बनने की पात्रता, और कॉलेजों में प्रवेश',
    exams: [
      { en: 'UGC-NET', hi: 'UGC-NET', noteEn: 'Assistant Professor, Junior Research Fellowship and PhD admission, in 80+ subjects', noteHi: '80 से ज़्यादा विषयों में सहायक प्रोफ़ेसर, JRF और PhD प्रवेश' },
      { en: 'CSIR-UGC NET', hi: 'CSIR-UGC NET', noteEn: 'The same for the sciences', noteHi: 'विज्ञान विषयों के लिए यही परीक्षा' },
      { en: 'NEET-UG', hi: 'NEET-UG', noteEn: 'Entry to MBBS, BDS and AYUSH courses', noteHi: 'MBBS, BDS और आयुष पाठ्यक्रमों में प्रवेश' },
      { en: 'JEE Main', hi: 'JEE Main', noteEn: 'Entry to NITs, IIITs and the first step to JEE Advanced (IITs)', noteHi: 'NIT, IIIT में प्रवेश और IIT वाली JEE Advanced का पहला कदम' },
      { en: 'CUET-UG and CUET-PG', hi: 'CUET-UG और CUET-PG', noteEn: 'Entry to central and many other universities', noteHi: 'केंद्रीय और कई दूसरे विश्वविद्यालयों में प्रवेश' },
      { en: 'NCET', hi: 'NCET', noteEn: 'Entry to the four-year Integrated Teacher Education Programme', noteHi: 'चार साल के एकीकृत शिक्षक शिक्षा कार्यक्रम (ITEP) में प्रवेश' },
    ],
  },
  {
    id: 'mba', en: 'CAT, MBA and postgraduate entrances', hi: 'CAT, MBA और स्नातकोत्तर प्रवेश',
    bodyEn: 'Run by the IIMs, IITs, XLRI and NTA',
    bodyHi: 'IIM, IIT, XLRI और NTA द्वारा',
    exams: [
      { en: 'CAT', hi: 'CAT', noteEn: 'Common Admission Test for the IIMs and other business schools', noteHi: 'IIM और दूसरे बिज़नेस स्कूलों की साझा प्रवेश परीक्षा' },
      { en: 'GATE', hi: 'GATE', noteEn: 'MTech and PhD entry, and PSU jobs, run by the IITs and IISc', noteHi: 'MTech, PhD प्रवेश और सरकारी उपक्रमों (PSU) की नौकरियाँ; IIT और IISc आयोजित करते हैं' },
      { en: 'XAT', hi: 'XAT', noteEn: 'XLRI and other business schools', noteHi: 'XLRI और दूसरे बिज़नेस स्कूल' },
      { en: 'CMAT', hi: 'CMAT', noteEn: 'Management entrance run by NTA', noteHi: 'NTA की प्रबंधन प्रवेश परीक्षा' },
      { en: 'IIT JAM', hi: 'IIT JAM', noteEn: 'MSc entry to the IITs and IISc', noteHi: 'IIT और IISc में MSc प्रवेश' },
    ],
  },
  {
    id: 'defence', en: 'Defence', hi: 'रक्षा सेवाएँ',
    bodyEn: 'Exams run by the forces themselves (UPSC’s NDA, CDS and CAPF are listed above)',
    bodyHi: 'सेनाओं की अपनी परीक्षाएँ (UPSC की NDA, CDS और CAPF ऊपर हैं)',
    exams: [
      { en: 'AFCAT', hi: 'AFCAT', noteEn: 'Officer entry to the Indian Air Force', noteHi: 'भारतीय वायुसेना में अधिकारी के रूप में प्रवेश' },
      { en: 'Territorial Army Officer', hi: 'टेरिटोरियल आर्मी अधिकारी', noteEn: 'Part-time officers alongside a civilian job', noteHi: 'नौकरी के साथ-साथ अंशकालिक अधिकारी' },
      { en: 'Indian Coast Guard (Assistant Commandant, Navik, Yantrik)', hi: 'भारतीय तटरक्षक (सहायक कमांडेंट, नाविक, यांत्रिक)', noteEn: 'Officer and enrolled entries', noteHi: 'अधिकारी और नाविक स्तर के प्रवेश' },
      { en: 'Agniveer (Army, Navy, Air Force)', hi: 'अग्निवीर (थल सेना, नौसेना, वायुसेना)', noteEn: 'Four-year service under the Agnipath scheme', noteHi: 'अग्निपथ योजना में चार साल की सेवा' },
    ],
  },
  {
    id: 'teaching', en: 'Teaching', hi: 'शिक्षक भर्ती',
    bodyEn: 'Eligibility tests and recruitment for school teachers',
    bodyHi: 'स्कूल शिक्षकों की पात्रता परीक्षाएँ और भर्ती',
    exams: [
      { en: 'KVS and NVS recruitment', hi: 'KVS और NVS भर्ती', noteEn: 'Teachers for Kendriya and Navodaya Vidyalayas', noteHi: 'केंद्रीय और नवोदय विद्यालयों के शिक्षक' },
      { en: 'DSSSB', hi: 'DSSSB', noteEn: 'Teachers and staff for the Delhi government', noteHi: 'दिल्ली सरकार के शिक्षक और कर्मचारी' },
      { en: 'CTET', hi: 'CTET', noteEn: 'Central Teacher Eligibility Test, run by CBSE', noteHi: 'केंद्रीय शिक्षक पात्रता परीक्षा, CBSE द्वारा' },
      { en: 'State TETs (REET in Rajasthan)', hi: 'राज्यों की TET (राजस्थान में REET)', noteEn: 'Each state’s teacher eligibility test', noteHi: 'हर राज्य की शिक्षक पात्रता परीक्षा' },
    ],
  },
  {
    id: 'rajasthan', en: 'Rajasthan (RPSC and RSSB)', hi: 'राजस्थान (RPSC और RSSB)', live: true,
    bodyEn: 'Ready today: topic rankings from past papers for every exam below',
    bodyHi: 'आज से तैयार: नीचे की हर परीक्षा के लिए पिछले पेपरों से टॉपिक-रैंकिंग',
    exams: [
      { en: 'RPSC: RAS/RTS, School Lecturer, Senior Teacher, ACF and more', hi: 'RPSC: RAS/RTS, स्कूल व्याख्याता, वरिष्ठ अध्यापक, ACF और बाक़ी', noteEn: 'Rajasthan Public Service Commission', noteHi: 'राजस्थान लोक सेवा आयोग', href: '/exam-prep/exams/#rpsc' },
      { en: 'RSSB: CET, Patwari, VDO, Jail Prahari and more', hi: 'RSSB: CET, पटवारी, VDO, जेल प्रहरी और बाक़ी', noteEn: 'Rajasthan Staff Selection Board', noteHi: 'राजस्थान कर्मचारी चयन बोर्ड', href: '/exam-prep/exams/#rssb' },
    ],
  },
  {
    id: 'states', en: 'Other state commissions', hi: 'दूसरे राज्यों के आयोग',
    bodyEn: 'Every state has its own Public Service Commission and staff selection board',
    bodyHi: 'हर राज्य का अपना लोक सेवा आयोग और कर्मचारी चयन बोर्ड है',
    exams: [
      { en: 'State civil services (UPPSC, BPSC, MPPSC, HPSC and others)', hi: 'राज्य सिविल सेवाएँ (UPPSC, BPSC, MPPSC, HPSC और बाक़ी)', noteEn: 'SDM, DSP and other state Group A and B posts', noteHi: 'SDM, DSP और राज्यों के दूसरे ग्रुप A व B पद' },
      { en: 'State staff selection boards (UPSSSC, HSSC and others)', hi: 'राज्य कर्मचारी चयन बोर्ड (UPSSSC, HSSC और बाक़ी)', noteEn: 'Clerks, patwaris, constables and other state posts', noteHi: 'क्लर्क, पटवारी, कांस्टेबल और राज्यों के दूसरे पद' },
    ],
  },
];

export const catalogueCount = EXAM_CATALOGUE.reduce((a, g) => a + g.exams.length, 0);
