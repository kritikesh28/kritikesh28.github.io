// Mere Man Ki Baat…, part 3: in the exam hall (time, tough questions, calm, the gut) and "what is all this knowledge for?".
// Written 19 Nov 2026 from his long voice note about time pressure, the steeplechase, the ocean of the mind and the use of
// knowledge. His thoughts are the spine; the books add what they said. As in parts 1 and 2, the small personal stories
// (what a senior, a teacher, his father said) were drafted for him to check. Format: see talks.ts.
import type { Topic } from './talks';

export const TALKS_3: Topic[] = [
  {
    id: 'exam-hall',
    icon: '⏱️',
    title: { en: 'In the exam hall', hi: 'परीक्षा-हॉल में' },
    qs: [
      {
        id: 'stuck-on-one',
        q: { en: 'I got stuck on one tough question, and it ruined the whole paper.', hi: 'मैं एक कठिन सवाल पर अटक गया, और पूरा पेपर बिगड़ गया।' },
        books: ['beilock', 'stoics', 'neff'],
        a: {
          en: [
            "This one I know from the inside. It always started the same way. A question would look half familiar. I had read it somewhere, I was sure. “Give me ten seconds, it'll come.” Ten seconds became a minute, then two. By then it wasn't about the question any more. It had become ego: “I will get this one.”",
            "Then I would look at the clock, and something would drop in my stomach. I had wasted four minutes. The next question I read with half my mind, because the other half was still counting the lost minutes. That one went badly too. And the one after that. One question had pulled the whole paper down with it, like a loose thread.",
            "A senior who had cleared RAS once explained it to me with a race I had never watched carefully: the steeplechase. Runners jump hurdles all through the track. Falling at a hurdle costs a few seconds. What really loses the race, he said, is lying on the track afterwards, thinking “now I can't win”. The runners who finish well are not the ones who never fall. They are the ones who stand up at once.",
            "Sian Beilock, who studies why people “choke” under pressure, found that worry takes up the same working memory we need to solve problems. So the worry about the lost minutes is not just a feeling; it literally takes space in the head that the next question needs. The Stoics would add something simpler: the minutes already gone are not in your control. The next question is.",
            "So in the hall I started saying one line to myself when I caught myself stuck: “Fine, I lost time here. I'll be careful on the next one.” Then I'd mark the question to come back to, and move. Strangely, that bad moment started to help me, because it made me sharper on the next ten.",
            "That is why the quizzes on this site have an exam mode with a clock that beats after 30 seconds. Not to scare you, but so the fall and the getting up happen here first, many times, at home. If one question has ever eaten your whole paper, tell me about it. I've been there more than once.",
          ],
          hi: [
            "यह मैं अंदर से जानता हूँ। हर बार शुरुआत एक जैसी होती थी। कोई सवाल आधा-जाना-पहचाना लगता। कहीं पढ़ा था, मुझे पक्का यक़ीन होता। “दस सेकंड दो, याद आ जाएगा।” दस सेकंड एक मिनट बन जाते, फिर दो। तब तक बात सवाल की नहीं रहती थी। ज़िद बन जाती थी: “यह तो करके ही रहूँगा।”",
            "फिर घड़ी पर नज़र पड़ती, और पेट में कुछ धँस जाता। चार मिनट गए। अगला सवाल मैं आधे मन से पढ़ता, क्योंकि बाक़ी आधा मन अब भी गए हुए मिनट गिन रहा होता। वह भी बिगड़ता। और उसके बाद वाला भी। एक सवाल पूरे पेपर को ढीले धागे की तरह खींचकर ले जाता।",
            "एक सीनियर, जिन्होंने RAS निकाला था, ने मुझे एक दौड़ से समझाया जिसे मैंने कभी ध्यान से नहीं देखा था: स्टीपलचेज़। धावक पूरे ट्रैक पर बाधाएँ कूदते हैं। किसी बाधा पर गिरने से कुछ सेकंड जाते हैं। असली हार, उन्होंने कहा, उसके बाद ट्रैक पर पड़े रहकर यह सोचने में है कि “अब तो नहीं जीत सकता”। अच्छा ख़त्म करने वाले वे नहीं जो कभी गिरते नहीं। वे हैं जो तुरंत उठ जाते हैं।",
            "सियान बेलॉक, जो यह पढ़ती हैं कि दबाव में लोग “चोक” क्यों करते हैं, ने पाया कि चिंता वही वर्किंग मेमोरी घेर लेती है जिसकी हमें सवाल हल करने के लिए ज़रूरत होती है। तो गए मिनटों की चिंता सिर्फ़ एक एहसास नहीं; वह सचमुच दिमाग़ में वह जगह घेरती है जो अगले सवाल को चाहिए। स्टोइक दार्शनिक इसमें एक सीधी बात जोड़ते: जो मिनट जा चुके, वे आपके बस में नहीं। अगला सवाल है।",
            "तो हॉल में, जब ख़ुद को अटका पाता, मैं मन में एक पंक्ति कहने लगा: “ठीक है, यहाँ समय गया। अगले पर ध्यान रखूँगा।” फिर सवाल पर निशान लगाता कि बाद में लौटूँगा, और आगे बढ़ जाता। अजीब बात है, वह बुरा पल मेरी मदद करने लगा, क्योंकि उसने अगले दस सवालों पर मुझे और चौकन्ना कर दिया।",
            "इसीलिए इस साइट की क्विज़ में एक परीक्षा मोड है, जिसकी घड़ी 30 सेकंड के बाद धड़कने लगती है। डराने के लिए नहीं, बल्कि इसलिए कि गिरना और उठना पहले यहीं, घर पर, कई बार हो जाए। अगर कभी एक सवाल ने आपका पूरा पेपर खा लिया हो, तो मुझे बताइए। मैं वहाँ एक से ज़्यादा बार रहा हूँ।",
          ],
        },
      },
      {
        id: 'strange-questions',
        q: { en: 'Why do they ask such strange questions, from outside every book?', hi: 'वे ऐसे अजीब सवाल क्यों पूछते हैं, जो किसी किताब में नहीं?' },
        books: ['stoics', 'courage'],
        a: {
          en: [
            "After every paper, our group at the tea stall would have the same argument. “Who asks this? Which book has this? What is the point?” I said it louder than anyone. I felt the paper was unfair, almost as if it was laughing at us.",
            "It took me years to see it differently. A paper is not only a test of what you know. It is also a test of how you behave when something unexpected lands in front of you. In service, an officer will face situations no book prepared him for. The commission wants to see who panics, who argues with the paper, and who calmly says “I don't know this one” and moves on.",
            "There is a plain reason too. If every question were from the standard books, thousands of well-prepared students would score nearly the same, and the cut-off would shoot up. A few very tough questions keep the cut-off where it can separate people. They are meant to be left by most of us. That's not a failure. That's the design.",
            "A teacher whose lectures I used to listen to on long bus rides said something I wrote on the first page of my notebook: “Har sawaal tumhara nahi hota.” Not every question is yours. He said the toppers aren't the ones who solve the strange questions; they are the ones who don't lose time on them.",
            "The Stoics split the world into what is in our control and what isn't. The strange question is not in my control. Whether I spend six minutes on it is. The Courage to Be Disliked says something similar about life: separate your tasks from other people's tasks. Setting the paper is the examiner's task. Choosing which questions to attempt is mine.",
            "Once I saw this, the strange questions stopped making me angry. I'd read one, smile a little (“ah, a hurdle”), and jump. If you still feel the paper is unfair, I understand; I felt it for years. Tell me which question made you angriest. I'll probably have a similar one.",
          ],
          hi: [
            "हर पेपर के बाद चाय की दुकान पर हमारे ग्रुप में एक ही बहस होती। “यह कौन पूछता है? यह किस किताब में है? इसका मतलब क्या है?” सबसे ज़ोर से मैं ही बोलता। मुझे लगता था पेपर नाइंसाफ़ी कर रहा है, जैसे हम पर हँस रहा हो।",
            "इसे अलग तरह से देखने में मुझे सालों लगे। पेपर सिर्फ़ इसकी परीक्षा नहीं कि आप क्या जानते हैं। वह इसकी भी परीक्षा है कि जब कुछ अचानक सामने आ गिरे, तो आप कैसा बर्ताव करते हैं। सेवा में एक अफ़सर ऐसे हालात से गुज़रेगा जिनके लिए किसी किताब ने उसे तैयार नहीं किया। आयोग देखना चाहता है कि कौन घबराता है, कौन पेपर से बहस करता है, और कौन शांति से कहता है “यह मुझे नहीं आता” और आगे बढ़ जाता है।",
            "एक सीधी वजह भी है। अगर हर सवाल मानक किताबों से हो, तो हज़ारों अच्छी तैयारी वाले विद्यार्थियों के अंक लगभग बराबर आएँगे, और कट-ऑफ़ आसमान छू लेगी। कुछ बहुत कठिन सवाल कट-ऑफ़ को वहाँ रखते हैं जहाँ वह लोगों को अलग कर सके। हम में से ज़्यादातर के लिए वे छोड़ने के लिए ही हैं। यह हार नहीं। यही बनावट है।",
            "एक शिक्षक, जिनके लेक्चर मैं लंबी बस-यात्राओं में सुनता था, ने एक बात कही जो मैंने अपनी कॉपी के पहले पन्ने पर लिख ली: “हर सवाल तुम्हारा नहीं होता।” उन्होंने कहा कि टॉपर वे नहीं जो अजीब सवाल हल कर लेते हैं; वे हैं जो उन पर समय नहीं गँवाते।",
            "स्टोइक दार्शनिक दुनिया को दो हिस्सों में बाँटते हैं: जो हमारे बस में है और जो नहीं। अजीब सवाल मेरे बस में नहीं। उस पर छह मिनट लगाऊँ या नहीं, यह मेरे बस में है। The Courage to Be Disliked ज़िंदगी के बारे में मिलती-जुलती बात कहती है: अपने काम और दूसरों के काम अलग कीजिए। पेपर बनाना परीक्षक का काम है। कौन-से सवाल करने हैं, यह चुनना मेरा।",
            "जब यह दिख गया, तो अजीब सवाल मुझे ग़ुस्सा दिलाना बंद कर गए। मैं एक पढ़ता, थोड़ा मुस्कुराता (“अच्छा, एक बाधा”), और कूद जाता। अगर आपको अब भी पेपर नाइंसाफ़ लगता है, तो मैं समझता हूँ; मुझे भी सालों लगा। बताइए किस सवाल पर सबसे ज़्यादा ग़ुस्सा आया। मेरे पास भी शायद वैसा ही एक होगा।",
          ],
        },
      },
      {
        id: 'read-again-again',
        q: { en: 'I read the same question three or four times and still don’t get it.', hi: 'मैं एक ही सवाल तीन-चार बार पढ़ता हूँ, फिर भी समझ नहीं आता।' },
        books: ['peak', 'makeitstick'],
        a: {
          en: [
            "This was where most of my time in the hall actually went, and for a long time I didn't even notice. I'd read a question, reach the end, and realise I hadn't taken it in. Back to the start. Again. Three readings for one question, on a paper with a hundred of them.",
            "Re-reading to check a detail, a “not” or an “incorrect”, is fine. Everyone does that. The problem is re-reading because the words passed through the eyes without stopping in the mind. A friend from my coaching days timed himself once and found he was spending close to a minute on each question just to understand it, before even thinking about the answer.",
            "Here's a little arithmetic that changed how I practised. If you train yourself to read a question once, understand it while reading, and decide “I know this” or “I'll leave this” in about 30 seconds, a 100-question paper gives you back nearly an hour. An hour of spare time in an exam is not just time. It's calm.",
            "Anders Ericsson, who spent his life studying how experts get good, called the right kind of practice “deliberate”: short, focused, a little harder than comfortable, with quick feedback. That's what I tried. Ten questions, a timer, read once, decide fast, then check. Make It Stick adds that testing yourself like this builds memory far better than re-reading notes.",
            "My father has his own version. He reads the newspaper every morning slowly, once, and properly. When I told him about my problem, he just said, “Ek baar padho, poora padho.” Read once, read it fully.",
            "So the 40-second clock in the quiz, red after 30, is really for this. Not for speed alone, but to train the eye and mind to read together. It feels hard for the first few days. Then one day you notice you're reading differently. If you're a re-reader too, tell me. There are more of us than you think.",
          ],
          hi: [
            "हॉल में मेरा ज़्यादातर समय असल में यहीं जाता था, और लंबे समय तक मुझे पता भी नहीं चला। मैं सवाल पढ़ता, आख़िर तक पहुँचता, और एहसास होता कि कुछ अंदर गया ही नहीं। फिर शुरू से। फिर से। एक सवाल के लिए तीन बार पढ़ना, उस पेपर में जिसमें ऐसे सौ सवाल हों।",
            "किसी बारीकी को जाँचने के लिए दोबारा पढ़ना, कोई “नहीं” या “असत्य”, ठीक है। सब करते हैं। दिक़्क़त तब है जब दोबारा इसलिए पढ़ें कि शब्द आँखों से गुज़र गए पर मन में रुके नहीं। कोचिंग के दिनों के एक दोस्त ने एक बार ख़ुद का समय नापा, तो पाया कि वह हर सवाल को सिर्फ़ समझने में लगभग एक मिनट लगा रहा था, उत्तर के बारे में सोचने से भी पहले।",
            "एक छोटा-सा हिसाब, जिसने मेरे अभ्यास का तरीक़ा बदल दिया। अगर आप ख़ुद को सवाल एक बार पढ़ने, पढ़ते-पढ़ते समझने, और लगभग 30 सेकंड में तय करने का अभ्यास करा दें कि “यह आता है” या “इसे छोड़ूँगा”, तो 100 सवालों का पेपर लगभग एक घंटा लौटा देता है। परीक्षा में बचा हुआ एक घंटा सिर्फ़ समय नहीं। वह शांति है।",
            "एंडर्स एरिक्सन, जिन्होंने पूरी ज़िंदगी यह पढ़ा कि माहिर लोग माहिर कैसे बनते हैं, सही तरह के अभ्यास को “डेलिबरेट” कहते थे: छोटा, केंद्रित, आराम से थोड़ा कठिन, और तुरंत पता चले कि सही हुआ या नहीं। मैंने यही आज़माया। दस सवाल, एक टाइमर, एक बार पढ़ो, जल्दी तय करो, फिर जाँचो। Make It Stick जोड़ती है कि इस तरह ख़ुद को परखना नोट्स दोबारा पढ़ने से कहीं बेहतर याद बनाता है।",
            "पापा का अपना तरीक़ा है। वे हर सुबह अख़बार धीरे-धीरे, एक बार, और ठीक से पढ़ते हैं। जब मैंने उन्हें अपनी दिक़्क़त बताई, तो उन्होंने बस इतना कहा, “एक बार पढ़ो, पूरा पढ़ो।”",
            "तो क्विज़ की 40 सेकंड वाली घड़ी, जो 30 के बाद लाल हो जाती है, असल में इसी के लिए है। सिर्फ़ रफ़्तार के लिए नहीं, बल्कि आँख और मन को साथ पढ़ना सिखाने के लिए। पहले कुछ दिन कठिन लगता है। फिर एक दिन आप ग़ौर करते हैं कि आप अलग तरह से पढ़ रहे हैं। अगर आप भी बार-बार पढ़ने वाले हैं, तो बताइए। हम जितना सोचते हैं, उससे ज़्यादा हैं।",
          ],
        },
      },
      {
        id: 'first-instinct',
        q: { en: 'My first answer was right, then I changed it. Should I trust my gut?', hi: 'मेरा पहला उत्तर सही था, फिर मैंने उसे बदल दिया। क्या अपने मन की आवाज़ पर भरोसा करूँ?' },
        books: ['firstinstinct', 'kahneman'],
        a: {
          en: [
            "Everyone has this story. You mark an answer almost without thinking. Then doubt creeps in, you change it, and the answer key shows your first choice was right. I had at least two of these in every paper, and they hurt more than the ones I simply didn't know.",
            "Here's a picture I use for the mind. It isn't a science lesson, just an image that helped me. Think of the ocean. The surface is what we use every day: our name, our phone number, the things that come to our lips without effort. Below it is the sunlit layer, the first two hundred metres or so, where light still reaches: things we know but don't use often. Further down is the deep, dark ocean, kilometres of it, where things we read or heard once, years ago, have quietly settled.",
            "Under exam pressure, the mind sometimes lets down a rope into that deep water and pulls up something from class 6 or 7 that you didn't know you still had. That quick first answer is often that rope coming up. It isn't magic. It's memory, arriving before your conscious mind has finished arguing.",
            "But I have to be honest about what research says too, because I looked it up. Justin Kruger and his colleagues studied thousands of answer changes and found that, on average, changes went from wrong to right more often than right to wrong. We just remember the painful ones better. They called it the “first instinct fallacy”. Daniel Kahneman would say both systems matter: the fast one that answers first, and the slow one that checks.",
            "So the rule I settled on is this: trust the first answer, unless you find a real reason to change it, like a word you misread, or a fact that suddenly comes back clearly. Don't change it just because you're nervous, or because it “feels too easy”. Nerves are not a reason. A reason is a reason.",
            "And whatever happens, don't punish yourself for the changed answers. Have you lost marks to a changed answer? Tell me your story; I'll trade you mine.",
          ],
          hi: [
            "यह कहानी सबके पास है। आप लगभग बिना सोचे एक उत्तर लगा देते हैं। फिर शक घुसता है, आप उसे बदल देते हैं, और उत्तर-कुंजी बताती है कि पहला वाला सही था। मेरे हर पेपर में ऐसे कम से कम दो होते, और वे उन सवालों से ज़्यादा चुभते जो मुझे आते ही नहीं थे।",
            "मन के लिए मैं एक तस्वीर इस्तेमाल करता हूँ। यह विज्ञान का पाठ नहीं, बस एक छवि है जिसने मेरी मदद की। समुद्र को सोचिए। सतह वह है जो हम रोज़ इस्तेमाल करते हैं: अपना नाम, अपना फ़ोन नंबर, वे बातें जो बिना कोशिश ज़ुबान पर आ जाती हैं। उसके नीचे धूप वाली परत है, लगभग पहले दो सौ मीटर, जहाँ रोशनी अब भी पहुँचती है: वे बातें जो हम जानते हैं पर कम इस्तेमाल करते हैं। और नीचे गहरा, अँधेरा समुद्र है, किलोमीटरों तक, जहाँ बरसों पहले एक बार पढ़ी या सुनी बातें चुपचाप बैठ गई हैं।",
            "परीक्षा के दबाव में मन कभी-कभी उस गहरे पानी में एक रस्सी डालता है और छठी-सातवीं कक्षा की कोई बात निकाल लाता है, जो आपको पता भी नहीं था कि अब भी आपके पास है। वह तेज़ पहला उत्तर अक्सर वही रस्सी ऊपर आ रही होती है। यह जादू नहीं। यह याद है, जो आपके सचेत मन की बहस ख़त्म होने से पहले आ पहुँचती है।",
            "पर शोध क्या कहता है, इस बारे में भी मुझे ईमानदार रहना होगा, क्योंकि मैंने इसे खोजा। जस्टिन क्रूगर और उनके साथियों ने हज़ारों बदले गए उत्तरों का अध्ययन किया और पाया कि औसतन बदलाव ग़लत से सही की ओर ज़्यादा हुए, सही से ग़लत की ओर कम। बस दर्द वाले हमें ज़्यादा याद रहते हैं। उन्होंने इसे “फ़र्स्ट इंस्टिंक्ट फ़ैलेसी” कहा। डैनियल काह्नमैन कहते कि दोनों प्रणालियाँ ज़रूरी हैं: तेज़ वाली जो पहले उत्तर देती है, और धीमी वाली जो जाँचती है।",
            "तो मैंने यह नियम बनाया: पहले उत्तर पर भरोसा कीजिए, जब तक बदलने की कोई असली वजह न मिले, जैसे कोई शब्द ग़लत पढ़ लिया हो, या कोई तथ्य अचानक साफ़-साफ़ याद आ जाए। सिर्फ़ घबराहट की वजह से, या “यह तो बहुत आसान लग रहा है” सोचकर मत बदलिए। घबराहट वजह नहीं। वजह, वजह होती है।",
            "और जो भी हो, बदले हुए उत्तरों के लिए ख़ुद को सज़ा मत दीजिए। क्या कभी बदले उत्तर की वजह से नंबर गए हैं? अपनी कहानी बताइए; बदले में मैं अपनी सुनाऊँगा।",
          ],
        },
      },
      {
        id: 'mind-goes-blank',
        q: { en: 'When the clock runs low, my mind goes blank. Can calm really be learnt?', hi: 'जब घड़ी में समय कम बचता है, मेरा दिमाग़ ख़ाली हो जाता है। क्या शांति सच में सीखी जा सकती है?' },
        books: ['stress', 'beilock', 'pomodoro'],
        a: {
          en: [
            "For a long time I thought calm was something you're born with. Some people are cool in the hall; I wasn't. In the last fifteen minutes my hands would sweat, I'd read options without seeing them, and facts I knew perfectly the night before would simply refuse to come.",
            "What changed my mind was noticing that the friends who stayed calm weren't calmer people at home. They had just been in that situation more often. They had sat timed mocks every week for a year. The hall wasn't new to them. For me, every exam was the first time I felt that particular pressure.",
            "Kelly McGonigal, in The Upside of Stress, says that a racing heart before a test is the body getting ready to perform, not a sign you're about to fail. People who were taught to see it that way actually did better. I tried saying it to myself: “Good, my body is getting ready.” It sounds silly. It helped more than I expected.",
            "Sian Beilock's research adds the other half: practise under a little pressure, so real pressure doesn't feel like a stranger. That's why the exam mode here has a clock that turns red and beats like a heart after 30 seconds. Small doses, often. Ten questions. Seven minutes. You can give seven minutes on even a bad day.",
            "One more thing helped me: knowing that a calm mind is a sharper mind. When I'm not panicking, I remember things I didn't know I knew. When I panic, I forget my own roll number. So staying calm isn't about being brave. It's about letting your preparation actually reach the paper.",
            "Yes, calm can be learnt, slowly, like anything else. If your mind goes blank too, you're not weak; you just haven't met the pressure often enough yet. Tell me what happens to you in those last fifteen minutes.",
          ],
          hi: [
            "लंबे समय तक मैं सोचता था कि शांति जन्म से मिलती है। कुछ लोग हॉल में ठंडे रहते हैं; मैं नहीं था। आख़िरी पंद्रह मिनट में हाथों में पसीना आता, विकल्प पढ़ता पर दिखते नहीं, और रात तक अच्छी तरह याद तथ्य आने से साफ़ मना कर देते।",
            "मेरी सोच तब बदली जब मैंने ग़ौर किया कि जो दोस्त शांत रहते थे, वे घर पर ज़्यादा शांत लोग नहीं थे। वे बस उस हालत में ज़्यादा बार रह चुके थे। उन्होंने साल भर हर हफ़्ते समय बाँधकर मॉक दिए थे। हॉल उनके लिए नया नहीं था। मेरे लिए हर परीक्षा पहली बार थी जब मैं वह ख़ास दबाव महसूस करता।",
            "केली मैकगोनिगल अपनी किताब The Upside of Stress में कहती हैं कि परीक्षा से पहले तेज़ धड़कन शरीर का प्रदर्शन के लिए तैयार होना है, फ़ेल होने का संकेत नहीं। जिन लोगों को इसे इस तरह देखना सिखाया गया, उन्होंने सचमुच बेहतर किया। मैंने ख़ुद से कहकर देखा: “अच्छा है, शरीर तैयार हो रहा है।” सुनने में अजीब लगता है। उम्मीद से ज़्यादा काम आया।",
            "सियान बेलॉक का शोध दूसरा हिस्सा जोड़ता है: थोड़े दबाव में अभ्यास कीजिए, ताकि असली दबाव अजनबी न लगे। इसीलिए यहाँ परीक्षा मोड में एक घड़ी है जो 30 सेकंड के बाद लाल होकर दिल की तरह धड़कती है। छोटी ख़ुराक, बार-बार। दस सवाल। सात मिनट। सात मिनट तो बुरे दिन भी दिए जा सकते हैं।",
            "एक और बात ने मदद की: यह जानना कि शांत मन ज़्यादा तेज़ मन होता है। जब मैं घबराया नहीं होता, तो वे बातें याद आती हैं जो मुझे पता भी नहीं था कि याद हैं। जब घबराता हूँ, तो अपना रोल नंबर भूल जाता हूँ। तो शांत रहना बहादुरी की बात नहीं। यह अपनी तैयारी को सचमुच पेपर तक पहुँचने देने की बात है।",
            "हाँ, शांति सीखी जा सकती है, धीरे-धीरे, किसी भी और चीज़ की तरह। अगर आपका दिमाग़ भी ख़ाली हो जाता है, तो आप कमज़ोर नहीं; बस अभी दबाव से उतनी बार मुलाक़ात नहीं हुई। बताइए उन आख़िरी पंद्रह मिनटों में आपके साथ क्या होता है।",
          ],
        },
      },
      {
        id: 'full-mock-lazy',
        q: { en: 'Just looking at a full 100-question mock makes me lazy.', hi: 'पूरा 100 सवालों का मॉक देखकर ही मुझे आलस आ जाता है।' },
        books: ['atomic', 'pomodoro', 'steel'],
        a: {
          en: [
            "Me too. I'd download a full mock paper, look at the 100 questions and the two-hour clock, and feel tired before I'd read the first one. “I'll do it tomorrow morning, fresh.” Tomorrow morning I'd find a reason again. Weeks would pass without a single full mock.",
            "For a while I thought I was simply lazy. Then I read Piers Steel's work on procrastination. He says we put things off when the task feels big, the reward feels far away, and the success feels uncertain. A full mock is all three at once. It isn't laziness. It's a very normal reaction to a very big-looking task.",
            "James Clear in Atomic Habits says to make the start so small it's almost silly. The Pomodoro Technique says work in short, timed bursts. Put together, that meant: don't sit a 100-question paper. Sit ten questions for seven minutes. Anyone can give seven minutes.",
            "A senior in my hostel did exactly this. He'd do one set of ten after breakfast, one after lunch, one before sleep. He never called it a mock. By the end of the week he'd done more timed questions than I had in a month of “planning” to sit full papers.",
            "The skill that matters, handling the clock and the pressure, is the same in ten questions as in a hundred. That's why the quizzes on this site are small on purpose. Of course, closer to the exam, a few full papers help with stamina. But the habit is built in small pieces.",
            "If big papers scare you off too, start with one set of ten today. Just one. Then tell me how it went.",
          ],
          hi: [
            "मुझे भी। मैं पूरा मॉक पेपर डाउनलोड करता, 100 सवाल और दो घंटे की घड़ी देखता, और पहला सवाल पढ़ने से पहले ही थक जाता। “कल सुबह करूँगा, ताज़ा दिमाग़ से।” कल सुबह फिर कोई बहाना मिल जाता। हफ़्ते निकल जाते, एक भी पूरा मॉक नहीं।",
            "कुछ समय मुझे लगा कि मैं बस आलसी हूँ। फिर मैंने टालमटोल पर पियर्स स्टील का काम पढ़ा। वे कहते हैं कि हम काम तब टालते हैं जब काम बड़ा लगे, इनाम दूर लगे, और सफलता अनिश्चित लगे। पूरा मॉक तीनों एक साथ है। यह आलस नहीं। बहुत बड़े दिखने वाले काम पर यह बिलकुल सामान्य प्रतिक्रिया है।",
            "जेम्स क्लियर Atomic Habits में कहते हैं कि शुरुआत इतनी छोटी रखिए कि लगभग हास्यास्पद लगे। पोमोडोरो तकनीक कहती है कि छोटे, समय-बँधे टुकड़ों में काम कीजिए। दोनों को मिलाकर इसका मतलब निकला: 100 सवालों का पेपर मत बैठिए। सात मिनट के लिए दस सवाल बैठिए। सात मिनट तो कोई भी दे सकता है।",
            "मेरे हॉस्टल के एक सीनियर ठीक यही करते थे। नाश्ते के बाद दस का एक सेट, दोपहर के खाने के बाद एक, सोने से पहले एक। वे इसे कभी मॉक नहीं कहते थे। हफ़्ते के आख़िर तक उन्होंने जितने समय-बँधे सवाल कर लिए होते, उतने मैंने पूरे पेपर बैठने की महीने भर की “योजना” में नहीं किए थे।",
            "जो हुनर मायने रखता है, घड़ी और दबाव को सँभालना, वह दस सवालों में भी वही है जो सौ में। इसीलिए इस साइट की क्विज़ जान-बूझकर छोटी हैं। बेशक, परीक्षा के क़रीब कुछ पूरे पेपर दम-ख़म के लिए काम आते हैं। पर आदत छोटे टुकड़ों में बनती है।",
            "अगर बड़े पेपर आपको भी डराकर भगा देते हैं, तो आज दस का एक सेट कीजिए। बस एक। फिर बताइए कैसा रहा।",
          ],
        },
      },
    ],
  },
  {
    id: 'why-study-all-this',
    icon: '🧭',
    title: { en: 'What is all this for?', hi: 'यह सब किसलिए?' },
    qs: [
      {
        id: 'what-use-knowledge',
        q: { en: 'What use is all this history and geography, when the job will be completely different?', hi: 'इतना इतिहास और भूगोल किस काम का, जब नौकरी का काम बिलकुल अलग होगा?' },
        books: ['range', 'makeitstick'],
        a: {
          en: [
            "I asked this out loud more than once, usually around 2 a.m. with a book on the Mughal revenue system open in front of me. “Which file in which office will ever ask me about this?” A friend of mine put it more bluntly: “Collector banke Akbar ka mansabdari padhayenge kya?”",
            "He's right in one way. Most of what we read won't be used directly. But I've slowly come to see an indirect link, and it's a real one. An officer's job is with people. And you can't understand people in a district without knowing their past: why this village fights over water, why that community is wary of the government, why the land records look the way they do. History isn't for answering a file. It's for understanding the people behind it, so that today's decision is a good one for tomorrow.",
            "Geography is the same. Where the rain falls, where the soil is poor, where the river floods: that's not trivia when you're deciding where a road or a canal or a school goes.",
            "There's a broader thing too. David Epstein's Range argues that people who learn across many fields often solve problems better, because they can borrow ideas from one area for another. All this reading, across history, polity, science and economy, builds a mind that has more to connect. Whatever we study keeps growing new links in the mind. I can't measure it, but I can feel it: I think more clearly now than I did in 2018.",
            "My father, who never sat these exams, put it in his own way when I complained: “Padha hua kabhi bekaar nahi jaata. Kahin na kahin kaam aata hai.” What you've read is never wasted; it comes in handy somewhere. He's been right about that more often than I've liked to admit.",
            "So when the syllabus feels pointless, I try to ask a different question: not “will this be asked?” but “what does this help me understand?” If you have a subject that feels completely useless to you, tell me which one. Let's see if we can find its use together.",
          ],
          hi: [
            "यह सवाल मैंने एक से ज़्यादा बार ज़ोर से पूछा, अक्सर रात दो बजे, सामने मुग़ल राजस्व व्यवस्था की किताब खुली हुई। “किस दफ़्तर की कौन-सी फ़ाइल मुझसे यह पूछेगी?” मेरे एक दोस्त ने और सीधा कहा: “कलेक्टर बनके अकबर का मनसबदारी पढ़ाएँगे क्या?”",
            "एक तरह से वह सही है। जो हम पढ़ते हैं, उसका ज़्यादातर हिस्सा सीधे काम नहीं आएगा। पर धीरे-धीरे मुझे एक अप्रत्यक्ष रिश्ता दिखने लगा, और वह असली है। अफ़सर का काम लोगों से है। और किसी ज़िले के लोगों को उनका अतीत जाने बिना नहीं समझा जा सकता: यह गाँव पानी पर क्यों लड़ता है, वह समुदाय सरकार से क्यों सतर्क है, ज़मीन के रिकॉर्ड ऐसे क्यों दिखते हैं। इतिहास फ़ाइल का जवाब देने के लिए नहीं। उसके पीछे के लोगों को समझने के लिए है, ताकि आज का फ़ैसला कल के लिए अच्छा हो।",
            "भूगोल भी वैसा ही है। बारिश कहाँ गिरती है, मिट्टी कहाँ कमज़ोर है, नदी कहाँ बाढ़ लाती है: जब आप तय कर रहे हों कि सड़क, नहर या स्कूल कहाँ बने, तब यह बेकार जानकारी नहीं।",
            "एक बड़ी बात भी है। डेविड एप्सटीन की Range कहती है कि जो लोग कई क्षेत्रों में सीखते हैं, वे अक्सर समस्याएँ बेहतर सुलझाते हैं, क्योंकि वे एक क्षेत्र का विचार दूसरे में उधार ले सकते हैं। इतिहास, राजव्यवस्था, विज्ञान और अर्थव्यवस्था में फैली यह सारी पढ़ाई एक ऐसा मन बनाती है जिसके पास जोड़ने को ज़्यादा है। जो भी हम पढ़ते हैं, वह मन में नए जोड़ बनाता रहता है। मैं इसे नाप नहीं सकता, पर महसूस कर सकता हूँ: आज मैं 2018 से ज़्यादा साफ़ सोचता हूँ।",
            "पापा, जिन्होंने ये परीक्षाएँ कभी नहीं दीं, मेरी शिकायत पर अपने ढंग से बोले: “पढ़ा हुआ कभी बेकार नहीं जाता। कहीं न कहीं काम आता है।” इस बारे में वे जितनी बार सही निकले, उतना मानना मुझे अच्छा नहीं लगता।",
            "तो जब पाठ्यक्रम बेमतलब लगता है, मैं एक अलग सवाल पूछने की कोशिश करता हूँ: “क्या यह पूछा जाएगा?” नहीं, बल्कि “यह मुझे क्या समझने में मदद करता है?” अगर कोई विषय आपको बिलकुल बेकार लगता है, तो बताइए कौन-सा। साथ मिलकर उसका काम ढूँढते हैं।",
          ],
        },
      },
      {
        id: 'years-wasted',
        q: { en: 'If I never clear, were all these years of study wasted?', hi: 'अगर मैं कभी नहीं निकाल पाया, तो क्या पढ़ाई के ये सारे साल बेकार गए?' },
        books: ['frankl', 'range', 'mindset'],
        a: {
          en: [
            "This is the question that sits underneath all the others, and I won't pretend I've never asked it. After my third attempt, I sat on the terrace one evening and did the arithmetic: years, money, birthdays missed, friends who had moved on. It added up to something that felt very heavy.",
            "What I couldn't see that evening, and can see a little better now, is that I wasn't the same person who started in 2018. I read differently. I think more carefully. I can sit with a hard problem for hours. I know the history of my own state, the rivers, the laws, the economy, in a way I never did before. That didn't disappear because a result didn't come.",
            "For some time after a result, disappointment is natural. It's allowed. But slowly, almost by itself, you start to notice that the knowledge is still there, and it starts finding uses. For me it went into research on the Bhil tribe, into teaching, and now into learning AI and building this site. None of that was the plan. All of it grew out of those years.",
            "Viktor Frankl, who survived the camps, wrote that what we have lived through, no power in the world can take away. Carol Dweck's Mindset says abilities grow with effort and good strategy, so the effort is never just a ticket to a result; it changes the person who made it. And Range is full of people who found their real work late, using everything they had picked up along the way.",
            "A teacher I respect once told a hall full of us: “Selection ek din ka result hai. Tayaari ek insaan banati hai.” Selection is one day's result; preparation makes a person. I didn't fully understand it then. I'm starting to.",
            "So no, I don't think those years are wasted, mine or yours. That doesn't mean the result doesn't matter; it does, and I'm still working for it. It means the result isn't the only thing you'll walk away with. If you're doing that heavy arithmetic tonight, write to me. Let's look at the other column too, the one that doesn't fit in numbers.",
          ],
          hi: [
            "यह वह सवाल है जो बाक़ी सब सवालों के नीचे बैठा है, और मैं यह नहीं दिखाऊँगा कि मैंने इसे कभी नहीं पूछा। तीसरे प्रयास के बाद एक शाम मैं छत पर बैठा और हिसाब लगाया: साल, पैसे, छूटे हुए जन्मदिन, आगे बढ़ चुके दोस्त। जोड़ कुछ ऐसा निकला जो बहुत भारी लगा।",
            "जो मैं उस शाम नहीं देख पाया, और अब थोड़ा बेहतर देख पाता हूँ, वह यह कि मैं वही इंसान नहीं था जिसने 2018 में शुरू किया था। मैं अलग तरह से पढ़ता हूँ। ज़्यादा ध्यान से सोचता हूँ। किसी कठिन समस्या के साथ घंटों बैठ सकता हूँ। अपने राज्य का इतिहास, नदियाँ, क़ानून, अर्थव्यवस्था, ऐसे जानता हूँ जैसे पहले कभी नहीं जानता था। रिज़ल्ट न आने से यह ग़ायब नहीं हुआ।",
            "रिज़ल्ट के बाद कुछ समय निराशा स्वाभाविक है। इसकी इजाज़त है। पर धीरे-धीरे, लगभग अपने-आप, आप ग़ौर करने लगते हैं कि ज्ञान अब भी वहीं है, और वह काम ढूँढने लगता है। मेरे लिए वह भील जनजाति पर शोध में गया, पढ़ाने में गया, और अब AI सीखने और यह साइट बनाने में। इनमें से कुछ भी योजना में नहीं था। सब कुछ उन्हीं सालों से उगा।",
            "विक्टर फ़्रैंकल, जो यातना-शिविरों से बचकर निकले, ने लिखा कि जो हमने जिया है, उसे दुनिया की कोई ताक़त छीन नहीं सकती। कैरल ड्वेक की Mindset कहती है कि क्षमताएँ मेहनत और अच्छी रणनीति से बढ़ती हैं, तो मेहनत कभी सिर्फ़ रिज़ल्ट का टिकट नहीं; वह मेहनत करने वाले को बदल देती है। और Range ऐसे लोगों से भरी है जिन्हें अपना असली काम देर से मिला, रास्ते में जो कुछ सीखा उस सबके सहारे।",
            "एक शिक्षक, जिनका मैं सम्मान करता हूँ, ने एक बार हम सबसे भरे हॉल में कहा: “सिलेक्शन एक दिन का रिज़ल्ट है। तैयारी एक इंसान बनाती है।” तब मैं पूरी तरह नहीं समझा। अब समझने लगा हूँ।",
            "तो नहीं, मुझे नहीं लगता कि वे साल बेकार गए, न मेरे, न आपके। इसका मतलब यह नहीं कि रिज़ल्ट मायने नहीं रखता; रखता है, और मैं अब भी उसके लिए मेहनत कर रहा हूँ। मतलब यह कि रिज़ल्ट अकेली चीज़ नहीं जो आप साथ लेकर निकलेंगे। अगर आज रात आप वह भारी हिसाब लगा रहे हैं, तो मुझे लिखिए। दूसरा कॉलम भी देखते हैं, वह जो अंकों में नहीं समाता।",
          ],
        },
      },
    ],
  },
];
