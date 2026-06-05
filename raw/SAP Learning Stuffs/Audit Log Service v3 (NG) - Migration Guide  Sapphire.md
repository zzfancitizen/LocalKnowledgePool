---
title: "Audit Log Service v3 (NG) - Migration Guide | Sapphire"
source: "https://pages.github.tools.sap/application-foundation/agent-runtime-domains/auditlog-service-v3/"
author:
published:
created: 2026-05-13
description: "Audit Log Service v3 (NG)"
tags:
  - "clippings"
---
## Audit Log Service v3 (NG)

The next-generation **SAP Audit Log Service (ALS v3 / NG)** lets your agent emit structured, tenant-scoped audit events over an mTLS-secured OTLP/gRPC channel. It offers stronger schema validation, higher throughput, and per-tenant routing handled automatically by the platform.

### What changed vs ALS v2

With **ALS v2** the Cloud SDK consumed audit logs out-of-the-box: other SDK modules (e.g. Object Store) emitted ALS v2 events transparently using a single, agent-wide service binding — your code never had to know about it.

**ALS NG is different**: events are now **tenant-specific**, so the SDK can no longer be wired up automatically. Each tenant subscription delivers its own ALS deployment ID, namespace, tenant ID to your agent through a SPII formation. Your agent must persist those values and use them when emitting events for that tenant.

In Managed Runtime, the **infrastructure side of the ALS integration is already in place** — you only need to implement two things in your agent code: a SPII handler that accepts the ALS formation, and the SDK call to send events.

---

## What the Platform Already Takes Care Of

When your agent is onboarded to Managed Runtime, the following ALS pieces are provisioned and configured automatically:

| Item | What it does |
| --- | --- |
| **ALS integration setup** | Your agent is registered for ALS NG in all four environments (canary dev, test and live test, prod) — no infrastructure request needed. |
| **Automatic formation on tenant subscription** | When a tenant subscribes to your agent, the platform triggers the ALS formation and calls your SPII endpoint with the runtime details. |
| **mTLS client certificate** | The certificate used to authenticate against ALS NG is issued, rotated, and mounted into your pod automatically. |

The volume mount at `/etc/secrets/appfnd/octoroute/certificate` is injected **out-of-the-box** by the platform — every agent pod receives it automatically with no `app.yaml` change, secret request, or extra configuration on your side. When you initialize the [Cloud SDK ALS NG client](#step-2-send-audit-events-using-the-cloud-sdk-als-ng-client) you simply point `cert_file` and `key_file` at the `cert.pem` and `key.pem` files from that directory respectively.

> You do **not** need to file any infrastructure ticket, register your agent with the ALS team, or rotate any certificate — onboarding handles all of it.

---

## What You Need to Do

### Step 1: Implement the SPII endpoint to accept the ALS formation

ALS NG uses the standard SPII (Service Provider Integration Interface) handshake to deliver, at subscription time, the runtime details your agent needs to call the audit service:

| Field | What it is |
| --- | --- |
| **Deployment ID** (or region) | The ALS NG deployment / region your agent must send events to for this tenant |
| **Namespace** | The audit log namespace under which the tenant's events must be recorded (e.g. `sap.agta2a`) |
| **Tenant ID** | The unique identifier of the ALS tenant that represents the agent tenant that was just subscribed — must be attached to every event emitted on its behalf |

Your SPII handler must:

1. Accept the **ALS formation type** sent by URM during the subscription → tenant mapping flow.
2. Persist the received destination fields somewhere your agent code can read them later (e.g. as files mounted into the pod, or in the agent's secret store).

These values are then read by the [Cloud SDK ALS NG client](https://github.com/SAP/cloud-sdk-python/blob/main/src/sap_cloud_sdk/core/auditlog_ng/user-guide.md) at runtime when emitting events.

> 👉 **Use the dedicated Agent Skill — do not implement this from scratch.**
> 
> If you use our template repository, you will have access to the [`sap-als-spii-implementation` skill](https://github.tools.sap/application-foundation/agent-skills/blob/main/.claude/skills/sap-als-spii-implementation/SKILL.md). It will set up all the SPII handling code, including registering the new formation type, validating the payload and persisting the data that needs to be used in the SDK module of Audit Log v3.
> 
> Please note that this skill will persist the data to a subaccount Destination+Fragment combination. Check the [`Runtime Usage` section](https://github.tools.sap/application-foundation/agent-skills/blob/main/.claude/skills/sap-als-spii-implementation/SKILL.md#runtime-usage) of the skill to understand how you can access this data to use the SDK module.

---

### Step 2: Send audit events using the Cloud SDK ALS NG client

Once your SPII handler from Step 1 has persisted the destination fields delivered by the formation, your agent uses the Python Cloud SDK `auditlog_ng` client to emit audit events. The SDK wraps the OTLP/gRPC plumbing, mTLS, schema validation, and OpenTelemetry batching, so your code only deals with building events and sending them.

When initializing the client, supply:

- The **deployment ID**, **namespace**, and **tenant ID** received in the SPII payload (Step 1).
- The mTLS material from the platform-injected mount at `/etc/secrets/appfnd/octoroute/certificate` for `cert_file` / `key_file`.

For installation steps, the full parameter reference, event types, and end-to-end usage examples, follow the official guide:

👉 **[`SAP/cloud-sdk-python` — `auditlog_ng` user guide](https://github.com/SAP/cloud-sdk-python/blob/main/src/sap_cloud_sdk/core/auditlog_ng/user-guide.md)**

---

## How the Subscription Flow Works

End-to-end view of what happens the first time a tenant subscribes to your agent:

```markdown
Tenant subscription
    │
    ▼
URM creates BusinessIntegration / TenantMapping for the new tenant
    │
    ▼
URM calls your agent's SPII endpoint with the ALS formation
    │
    ▼
Your SPII handler persists the destination fields (skill from Step 1)
    │
    ▼
Your agent uses the Cloud SDK AuditLog NG client to send audit events for that tenant
```

The platform-side parts (the first three boxes) are fully automated. You own the last two.

---

## Availability

| Landscape | Status |
| --- | --- |
| Canary Dev | ✅ Available |
| Canary Test | ✅ Available |
| Live Test | ✅ Available |
| Live Prod | ✅ Available |

---

## Troubleshooting

| Symptom | Likely cause | Action |
| --- | --- | --- |
| Agent does not receive a formation on subscription | SPII handler does not accept the ALS formation type | Re-run the SPII skill from Step 1 to make sure the new formation type is wired in |
| Events rejected by ALS with a validation error | Required fields (e.g. tenant ID) missing or malformed in the event payload | See the validation rules in the [Cloud SDK `auditlog_ng` user guide](https://github.com/SAP/cloud-sdk-python/blob/main/src/sap_cloud_sdk/core/auditlog_ng/user-guide.md) |
| ALS resources show errors on URM after subscription | Platform-side issue (SPII handshake failed, allowlist not propagated, etc.) | Open a [support request](https://github.tools.sap/application-foundation/community-support/issues/new?assignees=&labels=sapphire-domain-agent&projects=&template=domain-agent-support.yml&title=%5BDOMAIN+AGENT%5D+%7Bdomain%7D+%E2%80%94+%7Bagent%7D) — the Managed Runtime team will investigate |

---

## References

| Resource | Link |
| --- | --- |
| ALS v3 official documentation | [https://pages.github.tools.sap/Audit-Log-Service/auditlog-docs/docs/getting-started/btp/saas/level3/](https://pages.github.tools.sap/Audit-Log-Service/auditlog-docs/docs/getting-started/btp/saas/level3/) |
| Cloud SDK `auditlog_ng` user guide | [https://github.com/SAP/cloud-sdk-python/blob/main/src/sap\_cloud\_sdk/core/auditlog\_ng/user-guide.md](https://github.com/SAP/cloud-sdk-python/blob/main/src/sap_cloud_sdk/core/auditlog_ng/user-guide.md) |
| Agent Skills repository | [https://github.tools.sap/application-foundation/agent-skills](https://github.tools.sap/application-foundation/agent-skills) |
| Example SPII implementation skill | [https://github.tools.sap/application-foundation/agent-skills/blob/main/.claude/skills/sap-als-spii-implementation/SKILL.md](https://github.tools.sap/application-foundation/agent-skills/blob/main/.claude/skills/sap-als-spii-implementation/SKILL.md) |
| Unified Services (ATOM) documentation | [https://pages.github.tools.sap/atom-cfs/atom-docs/docs/about-atom/](https://pages.github.tools.sap/atom-cfs/atom-docs/docs/about-atom/) |