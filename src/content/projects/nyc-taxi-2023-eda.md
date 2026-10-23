---
title: "NYC Yellow Taxi 2023: where and when demand happens"
summary: "Exploratory analysis of about 1.8 million New York taxi trips: demand by hour and zone, fares, tips and slow routes, with a zone map and a live demo."
date: 2026-10-19
status: live
tags: [Python, pandas, GeoPandas, EDA, maps]
image: /images/nyc-taxi-choropleth.webp
imageAlt: "Map of New York City taxi zones shaded by number of pickups in 2023; airports and Manhattan are darkest."
links:
  - label: Code on GitHub
    href: https://github.com/kritikesh28/nyc-taxi-2023-eda
  - label: Live demand map
    href: https://huggingface.co/spaces/kritikesh28/nyc-taxi-demand-explorer
order: 1
demo: true
aiAssisted: true
---

## The question

A new taxi operator in New York wants to know when and where to place cabs, which routes waste time, and how fares and tips behave.

## What I did

- Took a 5% sample of every date and hour from the 12 monthly 2023 trip files of the NYC Taxi & Limousine Commission: 1,896,378 trips, or 1,799,283 after cleaning.
- Cleaned it with stated rules (impossible passenger counts, negative amounts, extreme fares, distances and durations) and counted what each rule removed.
- Analysed demand by hour, weekday and month; revenue and fare per mile; tips; and pickups by zone on a GeoPandas map.

## What I found

| Question | Finding |
| --- | --- |
| Busiest hours | 18:00; the top five hours all fall between 15:00 and 19:00 |
| Weekends | After midnight, weekend demand is 2.5 times the weekday level |
| Night (11 PM to 5 AM) | 12.1% of revenue |
| What sets the fare | Distance (r = 0.945) and duration (r = 0.846), not passenger count |
| Airports | JFK has 4.6 times more pickups than drop-offs |

![Bar chart of taxi pickups by hour of day, peaking at 18:00](/images/nyc-taxi-hours.webp)

## The bug I fixed

My first version had a sampling bug that duplicated 146,450 rows, almost all at 23:00. It made 23:00 look like the busiest hour. After fixing the sampling and rerunning everything, the real peak is 18:00. Checking your own data pipeline matters more than any chart.
