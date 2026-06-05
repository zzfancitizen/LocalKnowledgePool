---
title: "Sapphire - Onboarding Agents"
source: "https://pages.github.tools.sap/application-foundation/agent-runtime-domains/#workspaces"
author:
published:
created: 2026-05-25
description: "Managed Runtime for Agents — Developer Guide"
tags:
  - "clippings"
---
## Managed Runtime for Agents — Developer Guide

> **Audience**: LoB developers building agents on SAP BTP for Sapphire  
> **Classification**: SAP Internal

---

## What Is the Managed Runtime?

The App Foundation managed runtime service takes care of the infrastructure, deployment pipelines, and commercialization integrations needed to ship an agent on SAP BTP — so you can focus on writing your agent's business logic.

*Note: Managed runtime is only available for All-in on AI Agents that will be part of Sapphire within the pre-defined Domains.*

**What it handles for you:**

- BTP subaccounts, Kyma runtimes, and environment setup
- Deploy with Confidence (DwC) project and promotion flow
- URM and Unified Gateway registration for commercialization
- IAS trust and identity configuration
- CI/CD workflows, secrets, and environment variables in your GitHub org

### Overall process

```markdown
Onboard the Agent into its Domain
    │
    ▼
Develop using SDK and provided tools
    │
    ▼
Use GitHub Action to Build + validate app.yaml
    │
    ▼
Go to DwC for pipeline promotion: Canary Dev → Canary Test → Live Test → Live Prod
    │
    ▼
Commercialize your app in SAP4Me going through the AI Onboarding process
```

### What you need to know before getting started

#### Onboarding process overview

Onboarding happens in two phases:

```markdown
Phase 1 - Onboarding Request: Submit a gitHub Form → AppFND, Unified Services and Domain Leads review and approve → infrastructure is provisioned
Phase 2 - GitHub App Installation: Install the GitHub App → your agent org is configured automatically
```

#### Workspaces

A **workspace** is a logical isolation boundary within a domain that allows multiple agents to share the same BTP subaccount and Kyma cluster. Using a shared workspace is optional — by default each agent receives its own dedicated infrastructure.

**Why use a shared workspace?**  
Shared workspaces reduce infrastructure costs when multiple agents in the same domain agree to share resources. Each agent remains a fully independent SaaS application; sharing only happens at the subaccount and cluster level. Plan a strategy to share workspaces (i.e. based on cost center and team, LoB or nature of the agent) and name the workspace accordingly. Avoid very specific workspace name based in the agent itself. Consider to use an existing workspace if possible.

**How to set one up:**  
Workspace sharing must be agreed upon by all involved teams **before onboarding**. Declare it in your onboarding PR during Phase 1. The Managed Runtime team provisions the shared workspace — no manual infrastructure work is needed. **Max 3 agents per workspace.**

**Limitations to be aware of:**

- Access granted at the subaccount level applies to **all agents** in the workspace — there is no per-agent role segregation.
- Teams must explicitly opt in by providing an existing workspace name in the onobarding request form. This must be **aligned prior to form submission.** The Managed Runtime team will not assign agents to a shared workspace without explicit indication.
- Agents **cannot be moved** into a shared workspace **after onboarding**.
- All agents under the same workspace will be **billed at the SAP cost center indicated in the workspace**. If agents belong to different cost centers, it is the agents's owners reponsibility to re-distribute cost.

---

### What You Get Out of the Box

After onboarding, your agent has the following provisioned and configured automatically:

| Category | What's included |
| --- | --- |
| **Environments** | 4 landscapes across Canary and Live |
| **BTP** | Subaccount, Kyma runtime, entitlements |
| **Observability** | Dynatrace (APM), Cloud Logging (CLS) — no setup needed |
| **Identity** | IAS trust configuration per landscape |
| **Routing** | Octoroute with mTLS; endpoints exposed via Jupiter (not directly) |
| **Audit** | Audit Log service instance bound to all apps by default |
| **Deployment** | DwC project with stage promotion and rollback |
| **Commercialization** | URM + Unified Gateway registration |
| **Security** | Shared responsibility model; access via `app-fnd` GitHub team; Vault secrets; Audit Log auto-provisioned — see the [Security Guide](https://pages.github.tools.sap/application-foundation/agent-runtime-domains/security/) |

> Your agent endpoints are **never exposed directly**. All external access goes through **Jupiter**, which handles routing and authentication.

---

[Get started and request to onboard ->](https://pages.github.tools.sap/application-foundation/agent-runtime-domains/onboarding-request/)