---
title: 供应资源 (SPFI-FulfillmentData-Solution)
aliases:
  - Provisioning Reference
  - SPFIApplication
  - FulfillmentData
  - Solution
tags:
  - reference
  - sap/provisioning
---

# 供应资源 (SPFI / FulfillmentData / Solution)

> API group:`provisioning.api.sap`。概念背景见 [[Unified Provisioning 供应]]。

| 资源 | apiVersion | 说明 |
|------|-----------|------|
| **`SPFIApplication`** | `/v2` | 代表 SAP 托管 SaaS 应用 |
| **`SPFITenant`** | | USM 在应用有 embedded dependency 时生成,spec 空,由 SPFI Tenant operator(leased operator)监听 |
| **`FulfillmentData`** ⭐ | `/v2` | **必需 mixin**,持有供应参数 |
| **`CLDTenantIdsDraftRequest`** | `/v1alpha1` | 供应前向 **CLD** 预留租户 ID |
| **`Solution`** | `/v1beta1` | 代表某 TPT 的 landscape,连接 PLD Blueprint 编排 tenant 与 integration 供应 |

## SPFIApplication (v2)

`spec`:`endpoint`/`endpoints[*].{region,trustDetails,url}`、`lifeCycleStates`(`active`/`blocked`)、`features`(`sso_saml`/`embedded_sso_saml`/`embedded_sso_oidc`)、`spfiVersion`(v1/v2)、`retryPolicy`、`systemRoles[*]`、`trustDetails.{clientId,issuerName}`(IAS)、`ias.groups`、`noApplicationURL`。

## FulfillmentData(mixin,必需)

- 持有:`contract`、`customer`、`initialUsers`、`leadingInformation`、`parameters.{businessType(ZHxxx), dc.{spc,btp,regulations,externalName}, entitlementSet, skus, spc}`、`tenantId`、`systemRole`、`provisioningState`(active/blocked/inactive)、`solution.gsid`(GSID)。
- `metadata.mixedInto` 指向宿主应用实例。
- `tenantId`(CLD 生成 `$<id>`)、`customer.id` **自动维护,勿在 specTemplate 定义**;创建后不更新。

## CLDTenantIdsDraftRequest (v1alpha1)

供应前向 CLD 预留租户 ID。`spec.tenantidsrequested[*].{executionPlanItem.id, requestedTenantIdType(crm/internal/partner), leadingTenant, id.{crm/cldInternal/partner/sapGlobal}}`;结果在 `status.tenantidsfilled`。`internal` 用于测试/客户不可见。

## Solution (v1beta1)

`spec.customer`、`provisioning.blueprint.{guid,skus,features}`、`unifiedOrchestration.existing.tenants`、`provisioning.tenants[*].{businessType, desiredState(active/block), initialUsers, userLocation, hyperscalerPreference(N/A/B/C/D), region.crm}`。

## 相关

- [[Unified Provisioning 供应]]
- [[BTP Blueprint 与解决方案]]
- [[How-To 供应与迁移到 URM]]
- [[入门-分阶段开发 (Staged Development)]]
