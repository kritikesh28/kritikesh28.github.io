---
title: "Which villages of Banswara are shortest of water?"
summary: "A water-deprivation score for every village in Banswara, built from free census and satellite data, then a test of whether the villages shortest of water are also the least developed. Told as questions and answers, while the work is still going on."
date: 2026-09-29
status: in-progress
tags: [research, geography, QGIS, Earth Engine, data, statistics]
section: research
order: 1
aiAssisted: true
qa: true
tracker:
  href: https://claude.ai/artifact/X1dNYVwAh81H2zQDkFappB
  title: "The tracker behind this paper"
  text: "I run this paper from a tracker I built for it. It is where I plan the work, log each session and decision, and check myself against the deadline."
  points:
    - "14 phases from setup to submission, 97 tasks, each phase with an exit test"
    - "A decision log: 15 decisions so far, each with the reason behind it"
    - "A data inventory of 20 indicators, with source, scale and status"
    - "5 hypotheses, each with its test and decision rule, written before any result"
    - "A risk watch of 11 risks, plus a literature finder and a journal finder"
  cta: "Open the tracker"
---

*Last updated 17 November 2026. I add to this page as the paper moves, so it shows the work while it happens, not only the finished result.*

## The question

### What is this paper about, in one line?

I am building a water-deprivation score for every village in Banswara district, in southern Rajasthan, using only free census and satellite data. Then I test whether the villages that are shortest of water are also the least developed, and look closely at the villages that break the pattern.

### Why Banswara?

My M.Sc. dissertation was on poverty among the Bhil tribes of southern Rajasthan, and Banswara, a mostly tribal district, sits at the heart of that region. It also receives more rain than most of Rajasthan. So the question that pulled me back is simple: does rain alone decide who has water? I want to check that with data rather than assume it.

### What does "water poverty" mean?

It is more than "no water". A village can have a well but no tap, a tap but unsafe water, or water in July and none in May. So I treat water poverty as several things at once: how much water nature gives, how easily people reach it, how clean it is, how it is used, and how the land holds it.

### Hasn't someone already done this?

Partly. The closest studies, including a 2025 water-poverty index for Rajasthan, work at district or state level. One number for a whole district hides the differences between its villages. Going down to every village, and checking the score against independent data, is where I think this paper can add something. I will only call it "first" if a careful search proves it.

## Designing the study

### What goes into the water score?

Eleven indicators: rainfall and how much it varies from year to year, how hard groundwater is being pumped, how deep the water sits, households with tap water, drinking water inside the home, fluoride and other quality problems, the share of farmland that is irrigated, vegetation, slope, and barren land. Each one comes from a named public source.

### Why keep development in a separate score?

This was the most important design choice so far. If I put literacy or income inside the water score and then "discover" that water-poor villages are poorer, I have only measured the same thing twice. So I built two separate scores: one for water, and one for development (literacy, female literacy, marginal workers, wealth, night-time lights and distance to a health centre).

### Why do you say "association" and never "impact"?

Because the data are a single snapshot in time. A snapshot can show that two things go together. It cannot prove that one causes the other. Using the honest word now saves me from defending a claim later that my data can never support.

### What exactly will you test?

Five things, each written down with its test before I see any result, plus a regression with controls:

- **Validation:** does water poverty rise with development deprivation? (Spearman correlation)
- **Hotspots:** do water-poor villages cluster together on the map? (Moran's I and LISA)
- **Robustness:** do the rankings hold if I weight the indicators differently? (equal, PCA and entropy weights)
- **Tribal gap:** are villages with a larger tribal population more water-poor? (Mann–Whitney U with an effect size)
- **Village types:** do villages fall into clear groups, such as "short of water and poor" or "short of water but doing fine"? (k-means clustering)

## The data

### Where does the data come from?

Village boundaries and Census 2011 village tables come from SHRUG, an open dataset that links Indian villages across sources. Groundwater will come from the Central Ground Water Board and India-WRIS, tap connections from the Jal Jeevan Mission, and wealth estimates from Meta's Relative Wealth Index. Everything is free and public, and I note each file's source, year and licence.

### And the satellite part?

I registered a Google Earth Engine project for this paper. Earth Engine does the heavy satellite work on Google's servers: rainfall from CHIRPS, slope from SRTM, vegetation (NDVI), and land cover from ESA WorldCover. QGIS then joins everything to the village map, and GeoDa runs the spatial statistics.

### What did working with such big files teach you?

Respect for the raw file. Some tables are bigger than 700 MB and the night-lights file is 1.7 GB, so Excel is out of the question. Every download came as a ZIP that had to be extracted into its own folder. Raw files are never edited: cleaned copies go into a separate folder, and a data log records every file.

### Any trap you nearly fell into?

Yes: two numbering systems. Census 2011 codes and the government's newer LGD codes both identify villages, but they are different numbers. The tap-water data uses LGD codes and the census uses census codes. Mixing them is the commonest join mistake, so I match them through a separate key table, never by eye.

## The hardest moment so far

### What went wrong?

I tried to cut the all-India village map down to Banswara with a QGIS filter. I expected about 1,382 villages. The test count came back near 595,000, almost the whole of India. The filter looked right, yet the map disagreed.

### How are you working it out?

Step by step, like a detective. First, the total count with no filter. Then each half of the condition tested on its own. Then a control test that must return zero, to prove QGIS reads my text the way I think. Then ten real sample IDs, compared with the pattern I typed. One small test at a time, until the mismatch has nowhere to hide.

### What did it teach you?

That a number is not a fact until two sources agree. The 1,382 came from a keys file, never from the map layer itself. Even the claim "district code 125 means Banswara" has to be proved, from the village names and from an official census code list. I now write down which numbers I have checked and which I have not.

## How I work

### Do you use AI for this?

Yes, but as a strict tutor, not as a ghost-writer. I asked my AI assistant (Claude) to explain ideas, set me tasks, ask me check questions and act as my toughest critic, ending every plan with GO, GO WITH CHANGES, PARK or DROP. It does not do the GIS or the data work for me. I want to understand every step well enough to defend it.

### Has the AI ever been wrong?

Once, in a way I value. Early on it said "125 is Banswara" as if it were a fact, without proving it from the data. We caught it. Since then the rule for both of us is simple: never state what has not been checked, and say plainly what was checked and what was not.

### What tools does the work use?

QGIS for maps and joins, Google Earth Engine for satellite layers, GeoDa for spatial statistics, Python in Colab for the larger tables when I reach them, and Zotero for papers. A tracker and a small dashboard hold the plan, the decisions, the data list and the literature. All of it is free.

### Did you reuse your dissertation?

No. I decided to write this paper fresh, without a single line reused. A new paper deserves new thinking, and it keeps the work honest.

### Is it all done from a desk?

Not all. Early on I talked with two people, using a questionnaire, about how their water had changed over the years. It was a small start, and those answers do not go into the numbers, but they keep me asking whether the numbers match real life.

## Where it stands

### What is done?

- The research question, the gap and the two-score design are fixed.
- All eleven water indicators and the development indicators are listed, each with its source and the test it feeds.
- Seven SHRUG files are downloaded and extracted: village boundaries, Census 2011 tables, keys and night-time lights.
- Earth Engine is registered, QGIS is set up, and the project folders and data log are in place.

### What comes next?

Get the true village count for Banswara and reconcile it with the keys file. Export a clean Banswara village map. Join the census tables, and check that the key data is complete enough (the wealth data must cover at least 80 per cent of villages, or I fall back to block level). Then the satellite layers, the groundwater and tap data, and the analysis.

### What did you leave out on purpose?

Change over time, machine learning and a second district (Barmer, in the Thar, my home region). Each is interesting, and each would have doubled the work. One clear contribution per paper. Those ideas are saved for a larger study later.

### When can we read the paper?

The aim is to submit it to a peer-reviewed journal by December 2026. Review takes months after that. I will add the maps and results here as they come, and the link once the paper is published.

### If you could tell your September self one thing?

Fix the question before touching the data. Deciding what not to measure, such as a second district, machine learning and change over time, made the paper smaller, clearer and possible to finish.
