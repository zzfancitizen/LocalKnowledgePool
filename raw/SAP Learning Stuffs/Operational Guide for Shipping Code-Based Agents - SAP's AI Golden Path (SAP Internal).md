---
title: "Operational Guide for Shipping Code-Based Agents - SAP's AI Golden Path (SAP Internal)"
source: "https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/ship/"
author:
published:
created: 2026-05-18
description:
tags:
  - "clippings"
---
## Operational Guide for Shipping Code-Based Agents

> [!warning] Work in Progress
> This page is under active development and updated on a regular basis. Requirements and statuses may change as platform capabilities evolve.

Shipping production-ready agents on the new stack by Sapphire 2026 is a shared effort across teams — from product management and program coordination to platform engineering and quality assurance. This guide brings together the end-to-end process in one place: what needs to happen, who to talk to, and where to dive deeper. It covers program management, technical readiness, and the formal release process through QMS/Sirius.

Some parts of the process — both technical components and organizational workflows — are still being finalized. This page will be kept up to date and serves as the single entry point for everything required to get your agent to production.

![Overall Process](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/diagrams/20260402_Process.png)

## AHA

Aha acts as the birth certificate of an Agent, including name, description, status and links to Jira as well as connect to Jarvis record. Sync between Aha and Jarvis under investigation and to be expected soon. In general, Agents beyond ideation to be expected in Jarvis. More details on the ideation along and the governance in AHA can be found on the [Aha enablement page](https://sap.sharepoint.com/sites/213489/SitePages/Aha!-Enablement.aspx).

## Jarvis

Jarvis (including AI Onboarding) ensures all PM relevant tasks of a new Agent delivery are fulfilled. Jarvis acts as central data hub, ensuring data is pushed towards downstream systems (e.g. SLM & CBC), SAP Business AI Catalog, AI Unit Estimator and AI Features Guide Price List. Link: https://launcher.value-experience-hub.for.sap/experiences/jarvis/pages/main

> [!warning] Reporting
> Jarvis serves as the primary reporting source for SVB, the Board, and other key stakeholders. In addition, given its role as a foundational data source for downstream systems, it is essential to maintain the highest standards of data quality.

Note: We will invest into automation and integration, e.g. data gets synced between AHA and Jarvis, also, tool integration between Jarvis and SLM ensuring obsoleting existing steps soon.

### Checklist

Tasks to be fulfilled via Jarvis and AI Onboarding (more to apply):

- [**PM1**: Jarvis Record created](#pm1)
- [**PM2**: Value Assessment](#pm2)
- [**PM3**: Commercialization](#pm3)
- [**PM4**: Feature Catalog](#pm4)
- [**PM5**: Implement Agent Metering](#pm5)
- [**PM6**: Sizing Calculator](#pm6)
- [**PM7**: SLM](#pm7)
- [**PM8**: E2E Validation](#pm8)

---

#### PM1: Create Jarvis record and complete Jarvis basic Information

By switching the "Jarvis relevancy" toggle to Yes, the AHA–MXP integration automatically creates a Jarvis record and retrieves a corresponding Jarvis ID. This ID is then written back to the AHA Agent record. Next, please complete the Jarvis record by adding the required basic information, and proceed by creating an AI Onboarding in the following step. Note, please set the GA/RTC date accordingly. ![Delivery Dates](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/diagrams/20260408_DelDates.png)

> [!note] Ensure IFR maintenance
> Ultimate goal is to have all Agents externally visible on the Roadmap Explorer (https://roadmaps.sap.com/board?range=FIRST-LAST&FT=AI). For that, the Innovation and Feature Repository (IFR) has to be maintained. We kindly make you aware to ensure IFR maintenance. Please also check the respective documentation here: [IFR Maintenance](https://ifp.bss.net.sap/sap/bc/webdynpro/sap/z45_infopage_prview_standalone?sap-language=EN&WDTHEMEROOT=sap_corbu&IV_GUID=11B16179D5801EDE81927E99B09110FD&IV_TASK_GUID=55D9B7EFD0171EEFBCD306BACAB9369A&IV_ORIGINAL_PMT_GUID=6CAE8B26E4CB1EE5BCB47123004BB298#)

#### PM2: Complete Value Assessment

> [!note] WIP
> This section is work in progress and will be filled soon.

#### PM3: Basic Details & Commercialization Info

Here for this guide we are assuming code-based agents. For details on BAF agents the guidance in the AI Onboarding documentation still is valid.

Detailed guidance on the commercialization (Agent Actions, agent tiers etc.) can be found [here](#commercials).

General steps you have to undergo for every agent are:

- Being onboarded to Unified Services (covered in the [Implementation](#implementation) and [Tech. Req. 13](#tr13))
- Until full automation is available, the standard tasks have to be fulfilled (=Manual request of Feature ID, integration with metering)
- Agent owners need to complete a sizing estimate on the expected number of agent runs per month and an adoption rate for a typical customer
- Agents must complete the Floor Pricing approval process, i.e. determine their fulfillment cost per Agent Action. Please note that there is a special mass-approval process in place for Sapphire Agents to avoid additional manual work. Template & contacts here

#### PM4: Provide Marketing & GTM Information for Feature Catalog

Please complete task AI104 of the AI Onboarding. Your input will be used to build the page on the [AI Catalog in SAP Discovery Center](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/[url]\(https://discovery-center.cloud.sap/index.html#/ai-catalog/\)) externally for customers and publish it. This task is mandatory for all GA and EAC releases, and optional for BETA releases.

#### PM5: Implement Agent Metering

> [!note] Remember
> Code is the single canonical event for Agents. While there are some legacy BAF Agents that may finish commercialization, a long term migration plan must be considered.

Depending on which agent is under development, different metering routes should be followed.

**1\. Code-based agents**

- Feature ID has to be issued by pricing team (Jarvis AI Onboarding)
- Familiarize yourself with the concept of Agent Actions (see [Commercial Guidance](#commercials)) and work yourself through the commercialization tasks in Jarvis
- Review your agent code to identify where and how many Agent Actions should be emitted
- Begin the metering implementation in your codebase — the implementation guidance is available in the [Unified Metering documentation](https://github.tools.sap/metering/metering-knowledge-base/blob/main/designs/2026/design-METERING-1629-metering-of-appfnd-ai-agents/pocs-and-research/code-snippets-for-agent-developers.md)
- Agent / feature ID needs to be [registered in Unified Metrics Repository (UMR)](https://wiki.one.int.sap/wiki/spaces/CUP/pages/4401295734/HAUM+Metering+for+AI+Features)
- End-to-end testing with metering is currently not yet available. On the implementation side, however, all building blocks are in place. Improved SDK integration is in progress, but the documentation already describes how to implement metering without SDK convenience functions.

**2\. Content-based agents (BAF)**

- Feature ID has to be issued by pricing team (Jarvis AI Onboarding)
- Feature ID has to be [added to respective agent configuration in BAF](https://help.sap.com/docs/joule/joule-development-guide/agent-integration?state=DRAFT&version=DEV#agent-metering)
- BAF is automatically counting the Agent Actions and reporting to Unified Metering
- Agent / feature ID needs to be [registered in Unified Metrics Repository (UMR)](https://wiki.one.int.sap/wiki/spaces/CUP/pages/4401295734/HAUM+Metering+for+AI+Features)
- E2E validation can be done (Agent should be visible in [VLAB metering dashboard](https://spc-vlab.ondemand.com/sap/crp/cdo?type=CRP_UMET&list=10&period_type=dp&start-date=20260101&end-date=20261231&chart_display=on&chart_measure=_all_&chart_type=disabled&group_by=service_type%2Cmeasure_id&%28CP%29measure_id=*-STEP-*&expert_filter_attr=measure_id))

#### PM6: Provide a sizing calculator to your customer Note

> [!note] WIP
> We're internally in discussion on how to handle this onboarding task given the T-Shirt Sizing exercise LoB's are completing. Please stay tuned for an update on this topic but it won't be a blocker for a successful commercialization of Agents.

Please complete task AI106 of the AI Onboarding. Your input will be used as a sizing advisor in the AI Estimator in SAP Discovery Center to help customers getting an estimate of the potential number of the quantity of the Business Metric that will be used within the AI Feature. This task is mandatory for all GA releases, and optional for BETA releases.

#### PM7: Register Agent in SLM Note: This ensures representation in SAP Business AI Catalog, AI Unit Estimator and AI Features Guide Price List.

To publish an agent in AI Catalog, you need to complete [AI Onboarding](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/[url]\(https://wiki.one.int.sap/wiki/spaces/bizai/pages/4535963343/AI+Automation+Onboarding+Process\)).

#### PM8: Conduct E2E Validation & Officially Release

Please complete task AI112 of the AI Onboarding once all the other tasks above are completed. Instructions maintained in the task itself. This task is mandatory for GA and EAC releases, and not required for BETA releases.

### Commercial Guidance

> [!warning] Commercial Model Transition
> The board has decided to move towards a **consumption-based model by default** (all agents monetized through AI Units via a single SKU) with a **single agent category** across all agents. Therefore, PUPM packaging will be phased out with a planned deprecation in August. The only exception is J4C which will remain a PUPM package.

Please note, that there are no **Base Agents**. All agents are monetized as **Premium AI** through **AI Units**. Customers purchase AI Units via a single SAP SKU (8019164) — they do not buy or license individual agents. Charging is based on Agent Actions, which convert into AI Units and are deducted on a monthly basis from the customer's purchased quota.

**Key principles:**

- **Packaging:** All agents within a specific domain (e.g. autonomous procurement) are available to all customers who have purchased AI Units. Customers who have not purchased AI Units do not have access to Premium AI. In SAP for Me, customers will be able to provision their Agents/Assistants.
- **Technical implication:** Engineering teams should build agents so that they can be individually metered, provisioned, configured, and deployed — to accommodate future changes in packaging and commercial models. Product and engineering teams do not need to manage billing logic as long as they implement metering based on Agent Actions and use GenAI Hub for LLM token consumption calculation.
- **Agent naming:** Subject to a separate process with SAP branding. Names should be submitted as a single bulk request.

> [!note] Assistants
> Assistants as a marketing concept are not commercialized. Orchestrator Agents are the manifestation of Assistants (=doing their work). They emitt Agent Actions and should be treated as code based agent. Therefore, they need to complete a full AI Onboarding. Our team is still in alignment on the representation of Assistants in the customer facing discovery center.

#### Commercialization Models

The **target model** is consumption-based billing for all agents by default.

| Model | Metric | Billing unit | Status |
| --- | --- | --- | --- |
| **Consumptive** (target default) | Agent Actions charged directly in AI Units | AI Units | Target model — all new agents should plan for this |
| **Outcome-based** | Custom metric tied to ROI (still in AI Units) | AI Units | ~5 % of agents where an Agent Action-based metric does not capture value accurately |

The outcome based metric is not fully defined yet and to be considered as a North Star. When in doubt, align with your Business Model & Pricing expert.

Independent of the commercial channel, all agents need to complete the Jarvis process, which includes a key commercial action item — the **Floor Pricing calculation**.

#### Agent Action Metering

The goal of Agent Action metering is twofold:

1. **Cover fulfillment costs** — LLM inference, tool calls, infrastructure.
2. **Capture the value** the agent creates for the customer.

Agent Actions serve as an **abstraction layer** that shields the end user from the technical cost breakdown behind an agent run while allowing SAP to capture both cost and value proportionally. The number of Agent Actions should be **proportional to both cost and value**: a harder task that requires more iterations produces more Agent Actions, incurs higher cost, and typically delivers more value — justifying the higher charge.

**The core principle:** One iteration of the agentic loop = one Agent Action. One Agent Action roughly covers the cost of one LLM call plus one simple tool invocation (e.g. a single API call).

**When to meter — and when not to:** Agent Actions must be metered irrespective of whether the agent creates a successful business outcome — business-outcome success also depends on variables in the hands of the customer. However, if the agent runs into a **technical error** (infrastructure failure, unhandled exception, timeout), the respective Actions **should not be metered**. See also the [Action Cost Reference](#Action-cost-reference) below for a detailed breakdown of what counts as 0, 1, or more Agent Actions.

For implementation details on how to emit metering payloads, see [TR13: Agent Metering](#tr13) and the [Agent Metering guide](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/metering/).

##### Static and Dynamic Parts

To determine the right number of Agent Actions for your agent, decompose each agent run into **static parts** (fixed Action count) and **dynamic parts** (variable Action count that scales with complexity). The diagram below illustrates three hypothetical agent architectures of increasing complexity — from a plain ReAct loop (A) to a multi-loop agent with intermediate processing (C):

![Agent Action Metering — Hypothetical architectures A, B, and C](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/diagrams/agent-steps-scenarios.png)

- **A) Basic ReAct Agent** — A single agentic loop with no additional static Actions. The entire run is dynamic.
- **B) Extended ReAct Agent** — A planning Action (static), one agentic loop (dynamic), and response formatting (static). This is the most common pattern.
- **C) Multiple Chained Loops** — Planning (static), a first agentic loop (dynamic), intermediate processing (static), a second agentic loop (dynamic), and response formatting (static). Used for complex multi-phase agents.

The exact sequence of parts depends on the specific scenario — all combinations are possible. This breakdown is meant to help decompose complex scenarios, and it is usually helpful to implement metering invocations aligned with these parts. An agent run can chain any number of static and dynamic parts — the same counting rules apply to each segment.

| Phase | Type | Agent Action counting rule | Examples |
| --- | --- | --- | --- |
| **Agentic Loop** | Dynamic | **1 Action per iteration** of the loop. Additional Actions for high-value or high-cost tool calls (see below) | ReAct reason-act cycles, multi-Action tool chains |
| **Pre-Processing** | Static | Fixed number of Actions (x₁) — always the same regardless of input complexity | Plan creation, query rewriting, grounding retrieval |
| **Post-Processing** | Static | Fixed number of Actions (x₂) — always the same regardless of output | Response formatting, reflection, summary generation |
| **Intermediate Processing** | Static | Fixed number of Actions — often to bridge between two agentic loops (architecture C) | Result aggregation, context enrichment, re-planning |

So the total costs for scenario *C* could look like this:

**Total Agent Actions** = x₁ (pre-processing) + *n₁* (loop 1 iterations + extra tool Actions) + x\_mid (intermediate, if any) + *n₂* (loop 2 iterations + extra tool Actions, if any) + x₂ (post-processing)

##### Extra Actions for Tools

**Usually no extra Agent Actions are needed for tool calls**. Extra Actions are justified when:

- The tool is **expensive** (e.g. document processing, large data retrieval)
- The tool encapsulates **significant business logic or domain expertise and generates exceptionally high value** (e.g. a compliance check, a financial calculation engine)

Usually it is sufficient to assign a fixed number of additional Actions per invocation of a high-cost or high-value tool. In some cases — especially for high-cost tools — the cost depends on the input, e.g. the cost of a document processing tool depends on the number of pages in a document.

##### Examples

The following examples are hypothetical and intended to illustrate how to apply the static/dynamic decomposition to the architectures shown in the diagram above. Your actual Agent Action counts will depend on your agent's design and value proposition.

> [!example] Example 1: FAQ Lookup Agent — Architecture A
> A minimal agent that answers frequently asked questions using a single ReAct loop (see **architecture A**). There are no static pre- or post-processing Actions — the entire run is dynamic.
> 
> - **Dynamic part:** 1 Action per loop iteration
> 
> | User query | Loop iterations | Total Actions | Explanation |
> | --- | --- | --- | --- |
> | Direct answer from knowledge base | 1 | **1** | Single tool call suffices |
> | Follow-up clarification needed | 3 | **3** | 3 iterations of the loop |
> | Multi-part question requiring several lookups | 6 | **6** | 6 iterations |
> 
> This is the simplest possible Action model. It is suitable for lightweight agents where a fixed overhead would not be justified.

> [!example] Example 2: Dispute Case Agent — Architecture B
> A Dispute Case Resolution agent helps accounts-receivable clerks resolve open disputes. It follows **architecture B** from the diagram: a planning Action (static), a ReAct loop calling SAP S/4HANA APIs (dynamic), and response formatting (static).
> 
> **Static parts:**
> 
> - Planning (plan creation + grounding retrieval): **2 Actions**
> - Response formatting (reflection + formatted summary): **1 Action**
> 
> **Dynamic part (agentic loop):**
> 
> - 1 Action per loop iteration (standard tool calls: read dispute, fetch line items, check payment history)
> - *No exceptional-value or high-cost tools*
> 
> | Scenario | Loop iters | Total | Why |
> | --- | --- | --- | --- |
> | Invalid dispute ID — agent detects quickly | 1 | **4** | 2 + 1 + 1 — minimal cost, minimal value |
> | Standard dispute — read, verify, propose resolution | 4 | **7** | 2 + 4 + 1 |
> | Complex dispute — multiple line items, posts a credit memo | 6 | **9** | 2 + 6 + 1 |
> | Edge case — inconsistencies require extra iterations | 9 | **12** | 2 + 9 + 1 |
> 
> This demonstrates the key advantage: Actions are **proportional to effort and value**. A quick "not found" costs the customer very little, while a complex resolution with actual financial postings justifies more Actions.

> [!example] Example 3: Procurement Sourcing Agent — Architecture C
> A Sourcing Agent assists procurement managers by analyzing supplier quotes, running market comparisons, and recommending award decisions. It follows **architecture C** from the diagram: planning (static), a first agentic loop for data gathering (dynamic), intermediate processing for result consolidation (static), a second agentic loop for evaluation and recommendation (dynamic), and response formatting (static).
> 
> **Static parts:**
> 
> - Planning (intent classification + data retrieval from Ariba): **2 Actions**
> - Intermediate processing (consolidate supplier data, normalize criteria): **1 Action**
> - Response formatting (award recommendation summary): **1 Action**
> 
> **Dynamic parts (two agentic loops):**
> 
> - Loop 1 — data gathering: 1 Action per iteration (fetch quotes, check compliance)
> - Loop 2 — evaluation: 1 Action per iteration (compare, score, rank)
> - +2 extra Action per invocation of the *Market Price Benchmark* tool (expensive: calls external data provider with per-call cost)
> 
> | Scenario | Loop 1 iters | Loop 2 iters | Extra tool Action | Total | Why |
> | --- | --- | --- | --- | --- | --- |
> | Single supplier, straightforward | 1 | 1 | 0 | **6** | 2 + 1 + 1 + 1 + 1 |
> | Three suppliers, standard evaluation | 3 | 2 | 0 | **9** | 2 + 3 + 1 + 2 + 1 |
> | Five suppliers + market benchmark | 4 | 3 | 2 | **13** | 2 + 4 + 1 + 3 + 2 + 1 |
> | Complex RFQ, multiple benchmarks, negotiation | 6 | 6 | 4 | **20** | 2 + 6 + 1 + 6 + 4 + 1 |

##### Agent Action Cost Reference

The table below provides a quick reference for how common operations map to Agent Actions. Use it as a starting point when designing your agent's Action model.

> [!note] Rule of thumb
> If an operation involves an LLM call and a standard tool, it is **1 Action**. If no LLM is involved or it is a retry/error, it is **0 Actions**. Only add extra Actions for tools that are genuinely expensive or create exceptional value — do not inflate Action counts to increase revenue.

| Operation | \# of Actions | Rationale |
| --- | --- | --- |
| LLM call + query a database | 1 | Standard reasoning + simple data retrieval |
| LLM call + call an OData endpoint (read or write) | 1 | Standard reasoning + API interaction |
| LLM call + fetch a file | 1 | Standard reasoning + simple I/O |
| LLM call + send an email or notification | 1 | Standard reasoning + simple action |
| LLM call + review data and provide a conclusion | 1 | Reasoning with synthesis |
| LLM call + analyze multiple data points into conclusions | 1 | Reasoning with aggregation |
| LLM call + generate a report or summary from gathered facts | 1 | Reasoning with content generation |
| LLM call to format a response | 1 | Standalone reasoning Action |
| LLM call for planning (e.g. create an execution plan) | 1 | Standalone reasoning Action |
| Deterministic logic that calls an OData API (no LLM involved) | 0 | No reasoning cost — pure application logic |
| Logging or audit service calls | 0 | Infrastructure overhead, not value-generating |
| Retrieval from Memory Service | 0 | Low-cost internal lookup, no LLM reasoning |
| Retry of a tool call due to API timeout or transient failure | 0 | Technical error recovery — not customer-caused effort |
| Any Action where the agent encounters a technical error | 0 | Infrastructure failure should not be charged |
| Document grounding / processing (e.g. PDF extraction, OCR) | 1..n | High infrastructure cost, often per-page pricing |
| Web search via external provider (e.g. Perplexity) | 1 | Per-call cost from external provider |
| Processing multi-modal input (e.g. vision + language pipeline) | 1..n | Multiple model inference calls in a single tool invocation |
| Market price benchmark (external data) | 1..2 | External data provider with per-call cost (hypothetical) |
| Complex compliance or regulatory check | 1 | Significant domain expertise and business logic (hypothetical) |

##### Agent Tiers

> [!warning] Single-tier direction
> The board is aiming for a **single agent tier** across all agents to simplify commercialization.The three-category model (Basic, Stadard, Advanced) is no longer applicable.

> [!warning] Pricing
> The Tier- and AI Unit Value might be subject to change contingent on the result of the T-Shirt Sizing exercise. Please keep below internal only.

The **price per Agent Action** is currently planned to be the same for every agent.

| Tier | Action Upper Bound | AI Unit Value |
| --- | --- | --- |
| **1** | 250k | 0,020 |
| **2** | 750k | 0,014 |
| **3** | + | 0,007 |

The tiering applies at an aggregate Agent Action level. In essence, Agent Actions are accumulated over the whole billing period and each Agent Action is priced according to the final consumption tier.

Example:

- Customer consumes 500k Agent Actions across all Agents -> Every Agent Action is priced at 0,02 AI Units
- Customer consumes 800k Agent Actions across all Agents -> Every Agent Action is priced at 0,014 AI Units

#### Floor Pricing

Every LoB-built agent must complete the Floor Pricing approval process. The Floor Price is the minimum price below which SAP would prefer to decline a contract. It must reflect all costs related to closing a contract plus a minimum margin.

The cost components for an agent are:

| Component | How to determine |
| --- | --- |
| **LLM Cost** | Run the agent >10 times, determine average token consumption per Action, calculate cost using the AI Core LLM calculator. Enter cost *per Action*. Example: 10 Actions/run at 0.15 EUR total token cost → 0.015 EUR/Action. |
| **Infrastructure & App Mgmt** | For agents on unified runtime: a central cost figure will be provided. For agents outside: provide your own estimates. |
| **Tool Cost** | If your agent uses paid tools or services, attribute cost per Action. Example: a BTP service costs 10 EUR/month, with 20 runs/month at 10 Actions/run → 0.05 EUR/Action. |
| **Other Cost** | Royalties, additional services, etc. |

The infrastructure cost that is centrally provided includes the Kyma Cluster-, The amortized Agent Gateway-, and (tbc) AI Agent Hub Cost. This represents the minimal set-up for operating Agents. If your Agent additionally uses **HANA Memory**, it is an additional cost component to be considered.

**Template & contacts:** [Floor Pricing WorkZone](https://workzone.one.int.sap/site#workzonehome&/groups/Sc4zvF8KXJ1g8COncHIBw7/workpage_tabs/Ctb7uYwPjgBndFflNfwHad) — SPOC: Annika Stang

**Sapphire Scope Template** [Sizing and Approval](https://sap-my.sharepoint.com/:x:/r/personal/dario_ferrera_sap_com/Documents/Attachments/Sapphire_Agent_Commercials_Combined.xlsx?d=w67b0be5b1118422bb8c3300558f16a85&csf=1&web=1&e=hG1spT)

> [!info] Exceptional pricing
> An exceptional approval by the office of the CFO exists, stipulating that individual agents may be priced below Floor Price where an existing business case demonstrates the overall profitability of the AI Unit. Subject to regular review.

#### Estimating Consumption

Every agent owner needs to participate in the T-Shirt Sizing exercise led by the CRO and Business Model Pricing teams. The goal is to create Blueprints on an Assistant and Domain level to equip our sales colleagues in customer conversations. It **might** serve as the baseline for auto attaching a certain number of AI Units in Harmony.

**Steps:**

1. Create an exhaustive list of assistants and agents in your domain (should be driven by domain lead). The basis can be extracted from AHA.
2. Select the frequency of your agent, i.e., determine whether it runs daily, monthly, quarterly, yearly.
3. Estimate the number of triggers per frequency and which percentage thereof is triggered by system events.
4. Determine the average number of Agent Actions per run start with the use the [static/dynamic decomposition](#static-dynamic) for a first estimate. Better run your agent for a test/evaluation dataset and track the Agent Actions emitted.
5. Estimate adoption rate — not every user in the target group will use the agent

> [!example] Worked example — Finance domain
> **Agent:** Standard-tier agent (10 AI Units per Action), runs once/day per active user, average 5 Action to completion.
> 
> - AI Units per active user per month = 20 working days x 1 trigger/day x 5 Actions x 10 AI Units = **1,000 AI Units**
> 
> **Adoption context:** Customer has 100 accountants in the target persona. Estimated adoption: 1/3 → 30 active users.
> 
> - Monthly consumption from this agent: 30 x 1,000 = **30,000 AI Units**
> - Normalized per user in target group: **300 AI Units per user per month**
> 
> With these estimates, Controlling can initiate the approval stage and Floor Pricing sign-off is complete.

> [!info] Customisation
> The central template that is provided acts as a basline for your estimations. There are LoB specifics in a great range that cannot be accounted for in a default set up. We encourage you to make any adjustments needed to arrive at a realistic AI Unit consumption per Agent/Assistant. If you are scared to break any formulas have your domain lead reach out to Dario Ferrera

#### Frequently Asked Questions

**Q: What is an Agent Action?** An Agent Action is any reasoning action or tool invocation during task execution. This includes planning, tool calls, and reasoning cycles as the agent processes a user request.

**Q: Why are Actions used as the metric for agent commercialization?** Actions scale with both cost and value, are transparent to customers, and work for both custom and prebuilt agents — making them the fairest and most understandable metric.

**Q: How are agents categorized and priced?** Agents are assigned to a tier (basic, standard, advanced) based on complexity, value generated, and tokens consumed. Each Action is priced according to the agent's tier, not the complexity of the individual user prompt.

**Q: How to actually implement metering?** Details on how to implement metering: see [TR13](#tr13).

**Q: Will SAP share the underlying LLM model used for each agent with customers?** No. SAP will not share the specific LLM model, as agents may use multiple models and SAP reserves the right to change models based on performance.

**Q: Can I deviate from the standard Action-counting guidance?** Yes. The Action definition is purposely generalized. If your use case requires a different breakdown, you may deviate — but always keep cost coverage and value capture in balance, and align with your BMP contact.

**Q: Why not price per Agent Run instead of per Agent Action?** This was considered early on but rejected. Defining the exact boundaries of a "run" — when it starts, when it ends, whether a follow-up question counts as a new run — turns out to be very hard, especially for conversational agents that handle multiple tasks or ask clarifying questions within a single interaction. Edge cases (failures, multi-task runs, user follow-ups) make a clean per-run definition impractical. Additionally, a per-run price would require maintaining a price list per agent or even per task within an agent, which does not scale. Incremental Agent Actions avoid all of these problems by metering proportionally to effort without needing to define run boundaries.

**Q: Why not use pure outcome-based metering for all agents?** Outcome-based metering is being explored for a small subset of agents (~5 %) where it fits naturally. For the majority of agents, however, it faces the same boundary problem as per-run pricing: how do you classify a successful outcome when an agent performs multiple tasks in one interaction? How do you handle partial success? Defining and verifying "outcome achieved" across diverse use cases is complex and error-prone. Agent Actions provide a consistent, use-case-agnostic metric that correlates with both cost and value — without requiring outcome classification logic.

**Q: My agent currently does not contain / contains a low number of agentic loops today, but it will include more in the future. How should I commercialize it now?** You should categorize your agent based on its future agentic capabilities from the start. This approach avoids the need for constant commercialization adjustments when the scope is expanded later. It is crucial to carefully select your Agent Action definition and incorporate your value proposition into this decision. As your agent evolves, Agent Action counts must be reviewed and adjusted in both the documentation and metering.

## Programs

Please go to the [Sirius Enablement page](https://sap.sharepoint.com/sites/213489/SitePages/Sirius-Enablement.aspx). It contains details on the Sirius programs per Autonomous Domain.

If you have to deliver a code-based agent for the **fronrunner FINANCE Autonomous Domain**, please use this link for Agent- Onboarding: [\[FINSPENDCODEBASEDAGENTSINIT-1\] \[DRAFT\] TEMPLATE for code based agents - SAPJIRA](https://jira.tools.sap/browse/FINSPENDCODEBASEDAGENTSINIT-1). Contacts: alissa.ryzhova@sap.com, anushrutha.harogolige.jayaprakash@sap.com and andreas.huppert@sap.com.

For other Autonomous Domains and more details, please check the [Sirius Enablement page](https://sap.sharepoint.com/sites/213489/SitePages/Sirius-Enablement.aspx).

## Quality Management System/Sirius

![Definition of Done Overview](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/diagrams/definition-of-done-agents-overview.svg)

> [!note] WIP
> This section is work in progress and will be filled soon.

### Setup

> [!note] WIP
> This section is work in progress and will be filled soon.

### Release Decision

> [!note] WIP
> This section is work in progress and will be filled soon.

## Implementation

This section assumes you are building code-based agents on the Application Foundation (AppFnd) stack. The recommended starting points are the [AppFnd Cookbook](https://pages.github.tools.sap/application-foundation/agent-documentation/?location=walldorf#runtime) and the accompanying [Training](https://pages.github.tools.sap/application-foundation/agent-documentation/?location=walldorf#training).

For design guidance, architecture patterns, and deep dives into individual topics, the AI Golden Path covers the full lifecycle:

| Topic | Guide |
| --- | --- |
| Agent architecture, build, deploy, run | [Code-based Agents](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/code-based/) |
| Framework selection (LangGraph, Pydantic AI,...) | [Agent Frameworks](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/frameworks/) |
| Exposing and consuming tools via MCP | [Agent Tools](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/tools/) |
| RAG and document grounding | [Document Grounding](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/grounding/) |
| Agentic workflows and process orchestration | [Agentic Workflows](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/agentic-workflows/) |
| Observability and tracing with OpenTelemetry | [Agent Observability](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/tracing/) |
| Metering and Agent Action counting | [Agent Metering](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/metering/) |
| Testing, evaluation, and quality | [Agent Evals](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/evaluate/) |
| Extensibility for customers and partners | [Agent Extensibility](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/agents/extend/) |
| Developer tooling and IDE setup | [Developer Tooling](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/dev-tools/) |
| GenAI application fundamentals (CAP, AI Core) | [GenAI Applications](https://pages.github.tools.sap/SAP-Business-AI-Architecture/ai-golden-path/build/llm/) |

> [!note] Overlap with other Golden Path sections
> Some of the topics above are also covered in other sections of the Golden Path. Where this guide addresses the same topic, the guidance here is typically more specific to the shipping process and kept more up to date. If you encounter contradicting guidance, please reach out to the respective section owners (linked at the bottom of each page) so we can align.

Beyond getting your agent to run, production readiness requires meeting additional technical requirements — authentication, service onboarding, metering, and more. The [Technical Checklist](#checklist) below tracks each requirement with its current status, background, and links to the relevant decisions and documentation.

### Technical Checklist

- [**TR1**: Agent is exposed as an A2A Server](#tr1) Available
- [**TR2**: Agent runs on AppFnd or you've got an exception](#tr2) Available
- [**TR3**: Agent must accept IAS app2app tokens](#tr3) Available
- [**TR4**: Agent is onboarded to Unified Services to be provisioned fully SAP-managed](#tr4) Prepare Today
- [**TR5**: Agent is onboarded to UCL to enable SAP-managed integrations](#tr5) Prepare Today
- [**TR6**: Agent deployment exposes an ORD endpoint and uses the metadata model for agents](#tr6) Prepare Today
- [**TR7**: Agent implements SPII for Agent Gateway following bi-directional IAS app2app trust wave contract](#tr7) Prepare Today
- [**TR8**: BTP Test Blueprint for Agent is available](#tr8) Prepare Today
- [**TR9**: Define/setup end-to-end test for DWC](#tr9) To be Clarified
- [**TR10**: Agent uses the Agent Gateway for its tool/agent calls](#tr10) Available
- [**TR11**: Agent uses MCP servers for its tool calls](#tr11) Prepare Today
- [**TR12**: Agent is instrumented to use OpenTelemetry and uses the semantic conventions](#tr12) Available
- [**TR13**: Agent emits the metering payloads via OpenTelemetry](#tr13) Prepare Today
- [**TR14**: Agent has support for extensibility](#tr14) Prepare Today

> **Legend:** Available Documentation and tooling are ready — adopt now. Prepare Today Start preparation now; full support is landing soon. Blocked Dependency not yet available; stay tuned for updates. To be Clarified Details pending from the team.

---

#### TR1: Agent is exposed as an A2A Server Available

Your agent must be accessible as an A2A (Agent-to-Agent) server.

**Links**: [Documentation](https://pages.github.tools.sap/application-foundation/agent-documentation/?location=walldorf#mcp-setup), [Tutorial Video](https://share.synthesia.io/0ac83bbf-19b4-4ce5-ac75-1e8ec8f2f842)

#### TR2: Agent runs on AppFnd or you've got an exception Available

The agent must run on the Application Foundation runtime. If not, a formal exception must be granted.

**Links**: [Decision 1](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/agent-runtime.md), [Decision 2](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/guidance-on-agent-dev.md)

#### TR3: Agent must accept IAS app2app tokens Available

The agent must authenticate incoming requests using IAS application-to-application tokens.

**Links**: [Documentation](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/docs/BTP/dev_journey/)

#### TR4: Agent is onboarded to Unified Services Prepare Today

The agent must be onboarded to Unified Services to be provisioned fully SAP-managed. This is covered during the AI Onboarding process as an agent-specific process.

**Links**: [Decision](https://pages.github.tools.sap/application-foundation/agent-documentation/?location=walldorf#unified-services-registration), [Documentation](https://pages.github.tools.sap/application-foundation/agent-runtime-domains/)

#### TR5: Agent is onboarded to UCL Prepare Today

The agent must be onboarded to UCL to enable SAP-managed integrations. This is automated during the agent-specific Unified Services onboarding process.

**Links**: [Documentation](https://github.wdf.sap.corp/pages/CPSecurity/sci-dev-guide/docs/BTP/dev_journey/)

#### TR6: Agent deployment exposes an ORD endpoint Prepare Today

The agent deployment must expose an ORD endpoint and use the metadata model for agents. As part of Unified Service Onboarding, UMS/UCL are preconfigured.

**Call for action today:** Implement the ORD endpoints for your agent deployment

**Links**: [Documentation](https://pages.github.tools.sap/CentralEngineering/open-resource-discovery-specification/spec-v1/concepts/ai-agents-and-protocols/)

#### TR7: Agent implements SPII for Agent Gateway Prepare Today

The agent must implement SPII for Agent Gateway following the bi-directional IAS app2app trust wave contract.

**Call for action today:** Implement SPII endpoints for your agent deployment

**Links**: [Documentation](https://pages.github.tools.sap/atom-cfs/atom-docs/docs/how-to-guides/integrate-your-app/use-sci-facilitator/#bi-directional-sci-app2app-dependency-setup)

#### TR8: BTP Test Blueprint for Agent is available Prepare Today

A BTP Test Blueprint for the agent must be available.

**Links**: [Documentation](https://pages.github.tools.sap/atom-cfs/atom-docs/docs/how-to-guides/provision-your-app/provision-your-saas-app-urm/#21-set-up-product-blueprint-resources)

#### TR9: Define/setup end-to-end test for DWC To be Clarified

End-to-end testing for DWC must be defined and set up.

**Links**: [Decision](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/usage-of-dwc-for-code-based-agents.md)

#### TR10: Agent uses the Agent Gateway for its tool/agent calls Available

The agent must route its outgoing tool and agent calls through the Agent Gateway.

Agent Gateway is available on Canary, some features are still WIP.

**Links**: [Decision](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/agent-gateway.md), [Documentation](https://pages.github.tools.sap/AI/agent-gateway-documentation/)

#### TR11: Agent uses MCP servers for its tool calls Prepare Today

The agent must use MCP servers for its tool calls.

MCP servers configured in the MCP Hub UI can be added to agents using temporary credentials. The pipeline for publishing those servers productively is in development and will be released ASAP. An adoption guide for the Gateway including a migration guide for MCP Hub integrated with Agent Gateway will be provided.

**Links**: [Decision](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/agent-gateway.md), [Documentation](https://pages.github.tools.sap/application-foundation/agent-documentation/?location=walldorf#mcp-hub)

#### TR12: Agent is instrumented with OpenTelemetry Available

The agent must be instrumented to use OpenTelemetry and follow the semantic conventions for agent tracing.

**Links**: [Decision 1](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/observability.md), [Decision 2](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/observability-filtering-and-routing.md), [Decision 3](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/local-agent-observability.md), [Documentation](https://pages.github.tools.sap/application-foundation/agent-documentation/?location=walldorf#telemetry)

#### TR13: Agent emits metering payloads via OpenTelemetry Prepare Today

The agent must emit the metering payloads via OpenTelemetry.

To do agent metering, take the following steps:

1. Familiarize yourself with the concept of Agent Actions (see [Commercial Guidance](#commercials)) and work yourself through the [commercialization task in Jarvis](#pm3)
2. Review your agent code to identify where and how many Agent Actions should be emitted
3. Request an AI feature ID which is used as metering ID (issued by pricing team as part of the [AI Onboarding process](https://wiki.one.int.sap/wiki/spaces/bizai/pages/4535963343/AI+Automation+Onboarding+Process))
4. Begin the metering implementation in your codebase — the implementation guidance is available in the [documentation](https://github.tools.sap/metering/metering-knowledge-base/blob/main/designs/2026/design-METERING-1629-metering-of-appfnd-ai-agents/pocs-and-research/code-snippets-for-agent-developers.md)
5. Test your metering implementation by making sure that metering data is reaching [Unified Metering VLAB](https://spc-vlab.ondemand.com/sap/crp/cdo?type=CRP_UMET&list=10) correctly
	- `Measure ID`: column should show your AI feature ID (sap.metering.entity.id)
		- `Consumer ID`: column should show the GTID (sap.tenancy.tenant\_id) extracted from the sap\_gtid claim of the IAS JWT in the Authorization request header
		- `System Role`: column should show your system role (sap.cld.system\_role)
		- `Sum Value`: column should show the correct number of actions that were metered
		- Note: You are not required to check that Billing is successful (deduction of AI-Units from customer balance), and/or appearance in SAP4Me.
6. If everything is correct, mark the AI Onboarding task "Integrate AI Scenario to Metering" as resolved.

**Links**: [Decision](https://github.tools.sap/CPA/landing-page-content/blob/main/40_Results/all-in-on-ai-decisions/agent-commercial-metering.md), [Documentation](https://github.tools.sap/metering/metering-knowledge-base/blob/main/designs/2026/design-METERING-1629-metering-of-appfnd-ai-agents/pocs-and-research/code-snippets-for-agent-developers.md), [Unified Metering Dashboard in VLAB](https://spc-vlab.ondemand.com/sap/crp/cdo?type=CRP_UMET&list=10)

#### TR14: Agent has support for extensibility Prepare Today

The agent must support extensibility for customers and partners.

- Learn about supported Agent Extensibility patterns
- Decide whether you want customers/partners to extend your agent
- Follow instructions to make your agent extensible

**Links**: [Documentation](https://pages.github.tools.sap/customforms/agent-extensibility-documentation/concepts/baseagentdev.html)

> [!info] References
> **Most Important Links:**
> 
> - [**Autonomous Domains**](https://sap.sharepoint.com/:u:/r/sites/213489/SitePages/Autonomous-Domains.aspx?csf=1&web=1&e=LLWWkp)
> - **Jarvis** ([**MXP**](https://launcher.value-experience-hub.for.sap/experiences/jarvis/pages/main), [**Wiki**](https://wiki.one.int.sap/wiki/spaces/bizai/pages/5585326876/JARVIS))
> - [**AI Onboarding Wiki (AI Unit Automation)**](https://wiki.one.int.sap/wiki/spaces/bizai/pages/4535963343/AI+Automation+Onboarding+Process)
> 
> **Contacts for Support & Feedback:**
> 
> - **AHA**: [Francois Vigneron](https://people.wdf.sap.corp/profiles/D057728)
> - **Jarvis**: [Feyza Nur Sariguel](https://people.wdf.sap.corp/profiles/D065321)
> - **Programs**:
> - **QMS/Sirius**:
> - **AppFoundation**:
> - **Technical Requirements**: