// "Between the Chapters" (Hindi: "पन्नों के बीच"; renamed from "मन की सच्ची बातें" on 19 Nov 2026 at his wish) (/aspirants/): Kritikesh talking with aspirants, as at a chai tapri, about the problems every
// aspirant has and few say out loud, from the smallest (counting the months) to the biggest (should I quit?).
// Written 18 Nov 2026 from his brief. His rules for this page:
// - Never advice. He is one of them, sharing what he felt, how long it lasted, who helped (seniors, parents, teachers,
//   books) and what those books said. First person, masculine in Hindi ("मैंने", "मैं गया").
// - Each answer is a 3 to 5 minute read. Start from the smallest, silliest problems; nothing is too small.
// - Every answer ends by inviting the reader to share their own problem (the form on the page is anonymous if they like).
// - Humble tone, no comparing (see project memory story-tone-humble). Dates about him come from his Life History sheet.
// - The small personal stories (what a senior, his mother or father said) were drafted for him to check; when he
//   corrects one, change both `en` and `hi`.
// To edit: change the text in talks-1.ts / talks-2.ts. To add a question: add an item with a new unique `id`
// (it becomes the link #id) to a topic, and list the books it leans on (keys from books.ts).
// To add a topic: add { id, icon, title, qs } to either file. Guide: docs/20-aspirants-and-credits.md
import { TALKS_1 } from './talks-1';
import { TALKS_2 } from './talks-2';

export type Bi = { en: string; hi: string };
export type Talk = { id: string; q: Bi; a: { en: string[]; hi: string[] }; books?: string[] };
export type Topic = { id: string; icon: string; title: Bi; qs: Talk[] };

export const TALKS: Topic[] = [...TALKS_1, ...TALKS_2];

// "Why this format?" (/aspirants/why-this-format/): why the same book content is shown in a new way.
// His thoughts (18 Nov 2026) are the base; the research notes are from the books in books.ts. Shorter answers (1 to 2 min).
export const WHY: Topic[] = [
  {
    id: 'why-idea',
    icon: '💡',
    title: { en: 'The idea', hi: 'विचार' },
    qs: [
      {
        id: 'same-content',
        q: { en: 'The books already have all this. Why make it again?', hi: 'किताबों में यह सब पहले से है। फिर दोबारा क्यों बनाया?' },
        a: {
          en: [
            "Honestly, I didn't make anything new. The facts on this site have been in books, notes and the minds of good teachers for years, and the authors and publishers who collected them did years of hard work. I'm deeply grateful to them. Those books gave me my foundation.",
            "What I'm trying is only one small thing: to change how the same content reaches you. I studied from those books for years, and the books had great content. But after a few years, my mind started to slide over the pages. Not because the content was bad. Because my mind had seen the same kind of page so many times that it stopped paying attention.",
          ],
          hi: [
            "सच कहूँ तो मैंने कुछ भी नया नहीं बनाया। इस साइट पर जो तथ्य हैं, वे सालों से किताबों, नोट्स और अच्छे शिक्षकों के मन में हैं, और उन्हें जुटाने वाले लेखकों और प्रकाशकों ने सालों मेहनत की है। मैं उनका दिल से आभारी हूँ। उन्हीं किताबों ने मेरी नींव बनाई।",
            "मैं बस एक छोटी-सी कोशिश कर रहा हूँ: वही सामग्री आप तक किस ढंग से पहुँचे, उसे बदलना। मैंने उन किताबों से सालों पढ़ाई की, और उनमें बहुत अच्छी सामग्री थी। पर कुछ सालों बाद मेरा मन पन्नों पर से फिसलने लगा। सामग्री ख़राब होने की वजह से नहीं। इसलिए कि दिमाग़ ने एक ही तरह का पन्ना इतनी बार देखा था कि उस पर ध्यान देना बंद कर दिया।",
          ],
        },
      },
      {
        id: 'mind-patterns',
        q: { en: 'What do you mean, the mind “stops paying attention”?', hi: '“दिमाग़ ध्यान देना बंद कर देता है”, इसका क्या मतलब?' },
        books: ['makeitstick'],
        a: {
          en: [
            "When you study for years, your brain learns a pattern: heading, paragraph, bold line, table, next heading. Once it knows the pattern, it starts to run on autopilot. Your eyes read, but the mind is already somewhere else. Psychologists call the related idea habituation: we stop noticing what repeats without change. That's why the hundredth page of the same kind feels like nothing went in.",
            "Make It Stick adds the second half: rereading feels like learning because the page looks familiar, but recalling, guessing and being tested is what actually builds memory. So I thought, what if the same facts came as a question to flip, a quick quiz, a small story, a puzzle? The mind has to wake up for each one.",
          ],
          hi: [
            "जब आप सालों पढ़ते हैं, तो दिमाग़ एक पैटर्न सीख लेता है: हेडिंग, पैराग्राफ़, बोल्ड लाइन, तालिका, अगली हेडिंग। पैटर्न पता चलते ही वह ऑटो-पायलट पर चलने लगता है। आँखें पढ़ती हैं, पर मन कहीं और होता है। मनोवैज्ञानिक इससे जुड़े विचार को “हैबिचुएशन” कहते हैं: जो बिना बदलाव के दोहराया जाए, उसे हम नोटिस करना बंद कर देते हैं। इसीलिए एक ही तरह का सौवाँ पन्ना ऐसा लगता है जैसे कुछ अंदर नहीं गया।",
            "Make It Stick दूसरा हिस्सा जोड़ती है: दोबारा पढ़ना सीखने जैसा लगता है क्योंकि पन्ना जाना-पहचाना दिखता है, पर याद करना, अंदाज़ा लगाना और परखा जाना ही असल में याददाश्त बनाता है। तो मैंने सोचा, अगर वही तथ्य पलटने वाले सवाल, छोटी क्विज़, छोटी कहानी, या पहेली बनकर आएँ तो? हर एक के लिए दिमाग़ को जागना पड़ेगा।",
          ],
        },
      },
      {
        id: 'edutainment',
        q: { en: 'Isn’t “fun” the opposite of serious preparation?', hi: 'क्या “मज़ा” गंभीर तैयारी का उल्टा नहीं है?' },
        a: {
          en: [
            "I used to think so. I believed real study had to be hard and a little painful. But a bored mind doesn't work harder; it just drifts. Edutainment, education with a bit of entertainment, isn't about making things silly. It's about holding attention long enough for the facts to stay.",
            "A flip card that you get wrong, then right, is more serious work than a page you read three times without noticing. The goal stays exactly the same: the exam. Only the walk to it gets a little less tiring.",
          ],
          hi: [
            "मैं भी यही सोचता था। मानता था कि असली पढ़ाई कठिन और थोड़ी तकलीफ़देह होनी चाहिए। पर ऊबा हुआ दिमाग़ ज़्यादा मेहनत नहीं करता; बस भटक जाता है। एजुटेनमेंट, यानी थोड़े मनोरंजन के साथ शिक्षा, चीज़ों को बचकाना बनाने के लिए नहीं है। यह ध्यान को इतनी देर पकड़े रखने के लिए है कि तथ्य टिक जाएँ।",
            "एक फ़्लिप कार्ड जो पहले ग़लत और फिर सही हो, उस पन्ने से कहीं ज़्यादा गंभीर काम है जिसे आप बिना ध्यान दिए तीन बार पढ़ लें। लक्ष्य बिल्कुल वही रहता है: परीक्षा। बस वहाँ तक का रास्ता थोड़ा कम थकाने वाला हो जाता है।",
          ],
        },
      },
    ],
  },
  {
    id: 'why-how',
    icon: '🧩',
    title: { en: 'How it is made', hi: 'यह कैसे बनता है' },
    qs: [
      {
        id: 'small-pieces',
        q: { en: 'Why cut everything into such small pieces?', hi: 'सब कुछ इतने छोटे टुकड़ों में क्यों काटा?' },
        books: ['atomic', 'pomodoro'],
        a: {
          en: [
            "Because a thousand-question book feels like a wall, and a wall makes you want to turn around. Eight cards feel like a step. You can take a step even on a bad day. Atomic Habits calls it making the habit easy; the Pomodoro Technique uses short rounds for the same reason.",
            "So every page here aims at about five minutes. Finish one, and you've done something real. Finish ten, and you've done an hour without noticing.",
          ],
          hi: [
            "क्योंकि हज़ार सवालों वाली किताब दीवार जैसी लगती है, और दीवार देखकर लौट जाने का मन करता है। आठ कार्ड एक क़दम जैसे लगते हैं। क़दम तो बुरे दिन भी उठ जाता है। Atomic Habits इसे आदत को आसान बनाना कहती है; पोमोडोरो तकनीक इसी वजह से छोटे दौर इस्तेमाल करती है।",
            "इसलिए यहाँ हर पन्ना लगभग पाँच मिनट का है। एक पूरा कीजिए, और आपने कुछ असली किया। दस पूरे कीजिए, और बिना पता चले एक घंटा हो गया।",
          ],
        },
      },
      {
        id: 'own-words',
        q: { en: 'Is anything here copied from the books?', hi: 'क्या यहाँ कुछ किताबों से कॉपी किया गया है?' },
        a: {
          en: [
            "I try hard to make sure it isn't. The past questions were set by the commissions (RPSC, RSSB, NTA), and I first studied them in exam-prep books, which I name with thanks on the Credits page. Facts themselves belong to everyone. But the books' own explanations, wording and layout belong to their authors and publishers, so I don't copy them. The explanations here are written fresh, from facts checked in more than one place.",
            "If an author or publisher feels anything here is too close to their work, I'll fix it or remove it as soon as they tell me. I would much rather lose a page than hurt someone whose hard work helped me.",
          ],
          hi: [
            "मैं पूरी कोशिश करता हूँ कि ऐसा न हो। पिछले सवाल आयोगों (RPSC, RSSB, NTA) ने बनाए थे, और मैंने उन्हें पहली बार परीक्षा-तैयारी की किताबों में पढ़ा, जिनका नाम मैं आभार के साथ Credits पन्ने पर लेता हूँ। तथ्य सबके होते हैं। पर किताबों की अपनी व्याख्याएँ, शब्द और बनावट उनके लेखकों और प्रकाशकों की है, इसलिए मैं उन्हें कॉपी नहीं करता। यहाँ की व्याख्याएँ नए सिरे से लिखी गई हैं, एक से ज़्यादा जगह जाँचे गए तथ्यों से।",
            "अगर किसी लेखक या प्रकाशक को लगे कि यहाँ कुछ उनके काम के बहुत क़रीब है, तो उनके बताते ही मैं उसे ठीक कर दूँगा या हटा दूँगा। किसी ऐसे को दुख पहुँचाने से, जिसकी मेहनत ने मेरी मदद की, मैं एक पन्ना खो देना कहीं बेहतर समझता हूँ।",
          ],
        },
      },
      {
        id: 'ai-help',
        q: { en: 'Do you use AI to make these pages?', hi: 'क्या ये पन्ने बनाने में आप AI का इस्तेमाल करते हैं?' },
        a: {
          en: [
            "Yes, and I'd rather say so openly. I use AI (Claude, by Anthropic) to help arrange, translate, build the pages and draft text, the way you might use a very fast assistant. The ideas, the choices about what to show and how, and the checking are mine. AI can make mistakes, so I check facts against books and official sources, and if you spot an error, please tell me.",
          ],
          hi: [
            "हाँ, और यह खुलकर कहना बेहतर समझता हूँ। मैं AI (Anthropic का Claude) से सजाने, अनुवाद करने, पन्ने बनाने और पाठ का मसौदा तैयार करने में मदद लेता हूँ, जैसे कोई बहुत तेज़ सहायक हो। विचार, क्या और कैसे दिखाना है इसके फ़ैसले, और जाँच मेरी है। AI ग़लती कर सकता है, इसलिए मैं तथ्य किताबों और आधिकारिक स्रोतों से मिलाता हूँ, और अगर आपको कोई ग़लती दिखे, तो कृपया बताइए।",
          ],
        },
      },
    ],
  },
  {
    id: 'why-free',
    icon: '🌍',
    title: { en: 'Free, and for everyone', hi: 'मुफ़्त, और सबके लिए' },
    qs: [
      {
        id: 'why-free',
        q: { en: 'Why is it all free?', hi: 'यह सब मुफ़्त क्यों है?' },
        a: {
          en: [
            "Because I believe knowledge comes from nature, and nature is every tiny living thing and how they all work together over time. Every author, teacher and student is part of that too. So knowledge should go back to everyone without a price, as far as I can manage it.",
            "I won't pretend I'll never need to earn; I'm also someone who has to meet basic needs. If this site ever earns money, I've written on the Credits page how I hope to share it fairly with the people whose work it stands on. But the learning itself, I want to keep free.",
          ],
          hi: [
            "क्योंकि मेरा मानना है कि ज्ञान प्रकृति से आता है, और प्रकृति है हर छोटा-सा जीव और समय के साथ उनका आपस में मिलकर काम करना। हर लेखक, शिक्षक और विद्यार्थी भी उसी का हिस्सा है। इसलिए ज्ञान, जहाँ तक मुझसे हो सके, बिना क़ीमत सबके पास लौटना चाहिए।",
            "यह नाटक नहीं करूँगा कि मुझे कभी कमाने की ज़रूरत नहीं होगी; मुझे भी बुनियादी ज़रूरतें पूरी करनी हैं। अगर यह साइट कभी कमाई करे, तो मैंने Credits पन्ने पर लिखा है कि मैं उसे उन लोगों के साथ कैसे ईमानदारी से बाँटना चाहूँगा जिनके काम पर यह खड़ी है। पर सीखना, मैं मुफ़्त ही रखना चाहता हूँ।",
          ],
        },
      },
      {
        id: 'how-to-help',
        q: { en: 'How can I help?', hi: 'मैं कैसे मदद कर सकता हूँ?' },
        a: {
          en: [
            "Tell me what's hard for you, in study or in life, anonymously or with your name. Tell me where I got something wrong. Tell me which format helps you most. And if a page helped you, share it with one friend who's also preparing. That's all, and it means a lot.",
          ],
          hi: [
            "मुझे बताइए कि आपके लिए क्या कठिन है, पढ़ाई में या ज़िंदगी में, बिना नाम के या नाम के साथ। बताइए कि मुझसे कहाँ ग़लती हुई। बताइए कि कौन-सा ढंग आपकी सबसे ज़्यादा मदद करता है। और अगर किसी पन्ने से मदद मिली, तो उसे किसी एक तैयारी कर रहे दोस्त को भेज दीजिए। बस इतना, और इसका बहुत मतलब है।",
          ],
        },
      },
    ],
  },
];

export const allTalks = (topics: Topic[]) => topics.flatMap((t) => t.qs.map((q) => ({ ...q, topic: t })));
