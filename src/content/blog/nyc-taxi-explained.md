---
title: "What 1.8 million taxi rides taught me about checking my own work"
description: "A simple walk through my New York taxi analysis, and the sampling bug that changed its main answer."
date: 2026-10-23
category: ai-ml
tags: [python, pandas, eda, data cleaning, maps]
draft: true
aiAssisted: true
---

<!-- DRAFT for Kritikesh to check and put in your own words. Set draft: false when ready. -->

## The question

If you ran a taxi company in New York, when and where should your cabs wait?

## The data

The city publishes every yellow-taxi trip. I took 5% of each date and hour across 2023, which still gave me about 1.8 million trips after cleaning.

## The surprise

My first answer said the busiest hour was 23:00. It was wrong. A bug in my sampling loop kept re-adding the last hour of a day, so 146,450 rows were copies, almost all at 23:00. After the fix, the real peak is 18:00, the evening rush.

## What I learned

1. Check for duplicates before trusting any count.
2. A surprising result deserves suspicion before celebration.
3. Maps tell the story faster than tables: see the [zone map](/portfolio/nyc-taxi-2023-eda/).
