---
title: "Predictive maintenance: catching machine failures, and knowing when the model goes stale"
summary: "A complete MLOps loop on machine sensor data: check each batch, train and track models, tune the best one, watch for drift, and explain every failure type with SHAP."
date: 2026-11-17
status: live
tags: [Python, MLOps, XGBoost, MLflow, Optuna, Evidently, SHAP]
image: /images/predmaint-shap-per-class.webp
imageAlt: "Four bar charts, one per failure type. Tool wear leads tool-wear failure, temperature gap leads heat failure, mechanical power leads power failure, and torque leads overstrain failure."
section: ai-ml
order: 1
aiAssisted: true
---

## The problem

A factory runs thousands of machines. Each one sends six readings: machine type, air temperature, process temperature, rotational speed, torque and tool wear. When a machine breaks down without warning, the line stops, and downtime is costly.

The goal: from one reading, tell whether a machine is healthy or heading towards one of four failures.

| Code | Failure type | Share of the 6,993 training rows |
| --- | --- | --- |
| 0 | No failure | 96.70% |
| 1 | TWF: tool wear failure | 0.43% (only 30 rows) |
| 2 | HDF: heat dissipation failure | 1.09% |
| 3 | PWF: power failure | 0.80% |
| 4 | OSF: overstrain failure | 0.99% |

Two things make this hard. First, failures are rare: a model that always says "healthy" is 96.7% accurate and catches nothing. Second, the factory changes after the model goes live, and a model can quietly get worse.

## The approach

The project follows the whole life of a model, not just training:

1. **Check the data (Pandera).** A data contract checks every column against physical limits, such as torque between 3 and 80 Nm and tool wear between 0 and 253 minutes. All three batches passed.
2. **Add features from physics.** Mechanical power, `Power_W = Torque × 2π × rpm / 60`, and the temperature gap, `Temp_diff = process temperature − air temperature`.
3. **Handle the imbalance.** A stratified 80/20 split, then SMOTE (which makes synthetic examples of rare classes) on the training part only, so the validation set keeps the real mix.
4. **Compare and track models (MLflow).** Logistic Regression, Random Forest, XGBoost and LightGBM, each run logged with macro F1, weighted F1, accuracy and F1 for every class.
5. **Tune and register (Optuna + MLflow Registry).** 30 trials tuning XGBoost for macro F1. The best model is registered as `PredMaint_XGBoost` with a `production` alias.
6. **Watch for drift (Evidently).** Two new batches, a stable one and a heavy-load one, are compared with the training data.
7. **Explain (SHAP).** Feature importance read separately for each failure type, not as one global ranking.

![Training data at a glance: class counts on a log scale, torque and tool wear by failure type, and machine types](/images/predmaint-eda.webp)

## Results

### Accuracy hides the problem

| Model | Macro F1 | Accuracy | TWF F1 | OSF F1 |
| --- | --- | --- | --- | --- |
| XGBoost | **0.748** | 0.984 | 0.133 | 0.769 |
| Random Forest | 0.736 | **0.985** | 0.000 | 0.800 |
| LightGBM | 0.730 | 0.984 | 0.000 | 0.857 |
| Logistic Regression | 0.531 | 0.904 | 0.145 | 0.650 |
| **XGBoost tuned with Optuna** | **0.767** | 0.977 | 0.069 | **0.897** |

Random Forest had the highest accuracy but missed every tool-wear failure. Macro F1 gives each failure type equal weight, so it picked XGBoost. Tuning raised macro F1 by 0.019 (+2.6%), mostly through overstrain (OSF F1 from 0.77 to 0.90).

![Bar chart: accuracy is about 0.98 for all three tree models, while macro F1 separates them, with XGBoost highest at 0.748](/images/predmaint-leaderboard.webp)

### Valid data is not the same as familiar data

The heavy-load batch passed every Pandera check, yet Evidently found drift in 3 of 5 features. The stable batch showed none.

| Feature (heavy-load batch) | Drift score (Wasserstein) | Training mean | Batch mean | Change |
| --- | --- | --- | --- | --- |
| Tool wear | 0.646 | 107.7 min | 148.9 min | +38.3% |
| Torque | 0.474 | 40.0 Nm | 44.7 Nm | +11.8% |
| Rotational speed | 0.235 | 1,539 rpm | 1,497 rpm | −2.7% |
| Process temperature | 0.038 | 310.0 K | 310.0 K | 0.0% |
| Air temperature | 0.034 | 300.0 K | 300.1 K | 0.0% |

| Batch | Drifted features | Macro F1 | Accuracy | OSF F1 | OSF share |
| --- | --- | --- | --- | --- | --- |
| Stable | 0 of 5 | 0.742 | 0.966 | 0.813 | 1.00% |
| Heavy load | 3 of 5 | 0.532 | 0.883 | 0.626 | 3.87% |

![Drift score for each feature: the heavy-load batch crosses the 0.1 line for tool wear, torque and rotational speed; the stable batch stays below it](/images/predmaint-drift.webp)

### Each failure has its own physics

| Failure type | Top driver (mean SHAP) | What it means on the shop floor |
| --- | --- | --- |
| TWF | Tool wear (3.13) | The tool reaches the end of its life. |
| HDF | Temperature gap (2.70), then rotational speed (1.97) | A small temperature gap and a slow spindle: heat cannot escape. |
| PWF | Mechanical power (3.24) | Power goes outside a safe band, too low (stall) or too high (overload). |
| OSF | Torque (1.90), then tool wear (1.87) | A worn tool under high load goes past its strain limit. |

Both engineered features came out on top: mechanical power for power failure (about 8 times raw torque), and the temperature gap for heat failure.

## The decision

The two most drifted features, torque and tool wear, are the two top drivers of overstrain. Under heavy load, overstrain cases rose about 4 times (0.99% to 3.87%) and the model's OSF F1 fell from 0.90 to 0.63. So the model should be **retrained** on data that includes heavy-load periods, and the new version promoted only if it beats the current one on a heavy-load test slice.

A simple rule also came out of the evidence: **alert when tool wear × torque goes above about 10,000 min·Nm.** Every overstrain failure in training sits above 11,000, and 11.4% of heavy-load readings cross 11,000, against 1.3% in normal running.

## What did not work

Tool-wear failure stayed weak (F1 0.07 after tuning). There are only 30 real examples, and SMOTE can only mix those few points, not invent real variety. The honest fix is more data: log every tool change with its wear, and add vibration or sound sensors. Until then, a fixed tool-life limit is safer than the model for this failure.

Other limits: the data is a public synthetic benchmark (AI4I 2020, UCI Machine Learning Repository), so thresholds would need re-checking on real machines, and the rare classes have only 6 to 15 validation rows each.

## How it was made

This is the capstone project of the Applied AI and Agentic AI programme at IIIT Bangalore (with upGrad), run in Google Colab with Python, scikit-learn, imbalanced-learn, XGBoost, LightGBM, MLflow, Optuna, Evidently, SHAP and Pandera. The cleaned-up repository version, with tests, CI and a small demo, was designed with Claude.
