// The Curious Question card picks one of these at random.
// Rules (docs/VISION.md): every answer is complete on the card itself, true, and checked.
// `link` is optional and only points to a page that goes deeper. Never tease without answering.
// Guide: docs/13-add-to-the-library.md, "Add a curious question".

export interface CuriousQuestion {
  q: string;
  a: string;
  link?: string;
  topic: string;
}

export const CURIOUS_QUESTIONS: CuriousQuestion[] = [
  {
    q: 'Is space really empty?',
    a: 'No. Between galaxies there is roughly one atom in every few cubic metres, plus ancient light, neutrinos and dark matter. It is the thinnest stuff there is, not nothing.',
    link: '/library/the-universe/is-space-really-empty/',
    topic: 'Universe',
  },
  {
    q: 'Was the Big Bang an explosion?',
    a: 'No. It was space itself expanding from a hot, dense state, everywhere at once. There was no centre and no outside for anything to explode into.',
    link: '/library/the-universe/what-was-the-big-bang/',
    topic: 'Universe',
  },
  {
    q: 'When you look at the Sun, are you seeing it as it is now?',
    a: 'No. Its light takes about 8 minutes to reach Earth, so you always see the Sun as it was 8 minutes ago.',
    link: '/library/the-universe/how-far-can-we-see/',
    topic: 'Universe',
  },
  {
    q: 'Did atoms exist before stars?',
    a: 'Yes, for millions of years. The first atoms formed about 380,000 years after the Big Bang; the first stars probably switched on 100 to 200 million years after it.',
    link: '/library/the-universe/when-did-the-first-stars-shine/',
    topic: 'Universe',
  },
  {
    q: 'Did people once see the Big Bang on television?',
    a: 'In a way, yes. A small part of the static on old analogue TVs came from the cosmic microwave background, light left over from when the Universe was 380,000 years old.',
    link: '/library/the-universe/why-light-was-trapped/',
    topic: 'Universe',
  },
  {
    q: 'How much of the Universe can we actually see?',
    a: 'Only about 5% of its contents is ordinary matter like stars, gas and us. The rest is dark matter (about 27%) and dark energy (about 68%), which we detect only through their effects.',
    link: '/library/the-universe/what-is-dark-matter/',
    topic: 'Universe',
  },
  {
    q: 'Are the atoms in your body older than the Earth?',
    a: 'Yes. Most of your hydrogen was made minutes after the Big Bang, and your carbon, oxygen and iron were made inside stars that died before the Sun was born.',
    link: '/library/the-universe/where-did-your-atoms-come-from/',
    topic: 'Universe',
  },
  {
    q: 'Can galaxies move away from us faster than light?',
    a: 'Very distant ones do, and it breaks no law. Nothing travels through space faster than light; the space between us and them is stretching.',
    link: '/library/the-universe/why-are-galaxies-moving-away/',
    topic: 'Universe',
  },
  {
    q: 'Is the Earth at the centre of the expanding Universe?',
    a: 'No. Like dots on a balloon being blown up, every galaxy sees all the others moving away. There is no centre.',
    link: '/library/the-universe/why-are-galaxies-moving-away/',
    topic: 'Universe',
  },
  {
    q: 'Where did the gold in jewellery come from?',
    a: 'Most of it is thought to have been made when neutron stars collided, long before the Solar System formed. One such collision was observed in 2017.',
    link: '/library/the-universe/where-did-your-atoms-come-from/',
    topic: 'Universe',
  },
  {
    q: 'How much of the Solar System\'s mass is in the Sun?',
    a: 'About 99.8%. All the planets, moons, asteroids and comets together make up the tiny remainder.',
    topic: 'Universe',
  },
  {
    q: 'Why is the sky blue?',
    a: 'Air molecules scatter short blue wavelengths of sunlight much more than long red ones, so blue light reaches your eyes from every part of the sky.',
    topic: 'Earth',
  },
  {
    q: 'Why are sunsets red and orange?',
    a: 'Near sunset, light passes through much more air. Most of the blue is scattered away before it reaches you, leaving the reds and oranges.',
    topic: 'Earth',
  },
  {
    q: 'How old are the oldest rocks on Earth?',
    a: 'About 4 billion years for whole rocks (in Canada). Tiny zircon crystals from Western Australia are even older, about 4.4 billion years.',
    topic: 'Earth',
  },
  {
    q: 'Do continents move?',
    a: 'Yes, a few centimetres a year, about as fast as your fingernails grow. Over millions of years that is enough to open oceans and raise mountains.',
    topic: 'Earth',
  },
  {
    q: 'Why does the Himalaya keep getting taller?',
    a: 'The Indian plate is still pushing into Asia, by about 4 to 5 cm a year, squeezing the crust upward. Erosion wears it down at the same time, so the net change is small.',
    topic: 'Earth',
  },
  {
    q: 'Which is older, the Aravallis or the Himalaya?',
    a: 'The Aravallis, by far. They began forming well over a billion years ago and have been worn down since. The Himalaya started rising only about 50 million years ago.',
    topic: 'Earth',
  },
  {
    q: 'Does the Moon always show us the same face?',
    a: 'Yes. It spins exactly once for every orbit around Earth, an effect called tidal locking, so the same side always faces us.',
    topic: 'Universe',
  },
  {
    q: 'How much energy does your brain use?',
    a: 'About a fifth of your body\'s energy at rest, even though it is only about 2% of your body weight.',
    topic: 'Mind',
  },
  {
    q: 'Why does an unanswered question bother us so much?',
    a: 'Psychologists call it the information gap: when we notice a gap in what we know, we feel an itch to close it. Curiosity is that itch, and answering it feels rewarding.',
    topic: 'Mind',
  },
  {
    q: 'How does a neural network learn?',
    a: 'It makes a guess, measures how wrong it was, and nudges millions of internal numbers slightly in the direction that would have made the guess better. Repeat this millions of times.',
    topic: 'AI',
  },
  {
    q: 'Does an AI chatbot look up facts in a database?',
    a: 'Not by default. A language model predicts likely next words from patterns it learned in training. That is why good AI tools also search trusted sources and show where an answer came from.',
    topic: 'AI',
  },
  {
    q: 'Who wrote down the rules for calculating with zero?',
    a: 'The Indian mathematician Brahmagupta, in 628 CE, gave rules for adding, subtracting and multiplying with zero.',
    topic: 'Ideas',
  },
  {
    q: 'Why do sparrows take dust baths?',
    a: 'Rolling in fine dust helps them keep their feathers clean and in good condition, and may help control tiny parasites.',
    topic: 'Life',
  },
];
