---
title: BTP Blueprint 与解决方案
aliases:
  - BTP Blueprint
  - BTPBlueprint
  - BTPSolution
tags:
  - reference
  - sap/blueprint
---

# BTP Blueprint 与解决方案

> API group:`usrv.resources.api.sap`。

| 资源 | apiVersion | 说明 |
|------|-----------|------|
| **`BTPBlueprint` V1** | `/v1` | 建模**客户管理**的 solution(`BTPSolution` mixin 宿主) |
| **`BTPBlueprint` V2** ⭐ | `/v2` | 建模 **SAP 管理**的 solution |
| **`BTPBlueprintData`** | `/v1` | V2 的**内部 mixin**(勿手改) |
| **`BTPSolution`** V1/V2 | `/v1`,`/v2` | **mixin**,持有供应与商业租户映射 |
| **`TelemetryConfiguration`** | `/v1alpha1` | provider resource,`spec: {}`;关联后向 octoroute 上报事件 |

## BTPBlueprint V1(客户管理)

`spec.solutionType`、`lifecycle.phase`(`Draft`/`Released`,Released 后 spec 不可改)、`tenants[*].{name, setupMode(Create/Select/CreateOrSelect), ownedBySolution, tenantIDSource(Internal/CRM), groupVersionType, specTemplate, mixins}`、`integrations.formationType`。

## BTPBlueprint V2(SAP 管理)⭐

额外:`singleton`、`globalConfiguration`、`businessType.{tenantBusinessType(ZHxxx), productSuite, sequence}`、`dcResolution.primarySystemRole`、`solutionPrevalidation.enabled`、`tenants[*].{createMode(Always/OnDemand…), tenantIDSource(ExternalEntitled…), businessType, orderSetEnrichmentEnabled, dcResolutionEnabled, capabilities}`、`integrations.formationTypes[]`、`categories`、`contentPackages`。

## BTPSolution(mixin)

`globalAccountID`/`Subdomain`、`initialUsers`、`subaccounts`、`accountIdentifier`(CRM)、`provisioningTenants`(引用 blueprint 中 tenant 名)、`existingTenants`、`orderParameters`、`commercializationEvent.{operationType, lastOrder}`。

## Lifecycle(Draft / Released)

> [!warning] 关键
> blueprint 默认 `Draft`;就绪后设 `Released`。
> - **未 Released 时任何改动立即影响所有客户、可能破坏其 landscape**。
> - 已 Released 且有 solution 实例后不能改(保护客户);要出新功能须**升级 blueprint**。
> - 例外:仅改 SKU 可用 `$values.skuSelector.productIDs`(Released 后也能改)。

**升级两法**:Provider Controlled(推荐,客户无感,分批 reconcile)/ Customer Controlled(需客户新输入,新建 Solution RTD version + 对应 blueprint,`preferredVersion` 指向新版)。

## 相关

- [[Unified Provisioning 供应]]
- [[供应资源 (SPFI-FulfillmentData-Solution)]]
- [[How-To 供应与迁移到 URM]]
- [[遥测与中央通信服务]]
