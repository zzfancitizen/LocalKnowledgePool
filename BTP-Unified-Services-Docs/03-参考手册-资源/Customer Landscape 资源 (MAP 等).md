---
title: Customer Landscape 资源 (MAP 等)
aliases:
  - Customer Landscape Reference
  - ManagedApplicationProvider
  - MAP
  - BusinessIntegration
  - TenantData
tags:
  - reference
  - sap/ucl
---

# Customer Landscape 资源 (MAP 等)

> API group:`customer-landscape.resource.api.sap`。概念背景见 [[Unified Customer Landscape (UCL)]]。

## ManagedApplicationProvider (MAP) ⭐ v1alpha1/v1

应用接入 [[Unified Customer Landscape (UCL)|UCL]] 的核心资源。关键 `spec`:
- `productName`(= UCL 里的 System Type)
- `applicationNamespace` / `namespace`(唯一,需在 namespace-registry 申领)
- `provider: SAP`、`scope`(初始 `non-published`,验证后 `published`)
- `tenantRegistry`(可用 URM / CLD / SaaS Registry / BTP System Landscape / SAP4Me,支持 **dual registry**)
- `spii`、`openResourceDiscovery`(ORD)、`trustConfiguration`、`providerContext`、`tenantSets`

> [!warning] 硬约束
> 一个 `ManagedService` 只能引用**一个** MAP。旧 v1alpha1/Application Template 用户须走 [[How-To 集成你的应用#MAP v1 迁移|Migrate to MAP v1]]。

## 其他资源

| 资源 | 说明 |
|------|------|
| **`FormationType`** (v1alpha1) | provider resource,建模到私有 embedded tenant 的集成自动化;目前在 URM 外创建管理 |
| **`Integrations`** | 出站集成;**大部分用途已弃用**(改用 `FormationType`),仍用于 OnDemand Embedded Shared Tenants |
| **`BusinessIntegration`** | 需集成的一组 participant;两类(Formation Type Unaware 将弃用 / Formation Type Aware);每条 `edge` 有 `sender`/`receiver`(可选 `middleware` 如 IAS/MDI);处理后每 edge 生成 `TenantMapping` |
| **`TenantMapping` / `TenantMappingChannel`** | 集成期望状态 / 通信通道 |
| **`TenantData`** ⭐ (mixin) | 扩展服务资源租户信息(`localTenantId`、`displayName`、`entryPoints.baseUrl`、`externalId`);由 `MarkerTenantConfig` 触发按需创建;删除会使引用它的 BusinessIntegration 进入 error |
| **`MarkerTenantConfig`** | provider opt-in 的 marker tenant 配置 |
| **`TenantDiscoveryRequest`** | 按 GVT+CRM Tenant Id/gtid 定位 `TenantData`/marker tenant |
| **`TenantDiscoverySync`** | 从 UCL/UMS/CLD 向 URM 同步租户;缺 `AccountMetadata` 的 CRM Customer ID 会触发建 `OrderSet`→建 `Organization` |
| **`BusinessIntegrationPublisher` (BIP)** | 发布 business integration |

## Tenant Registry 选择(务必一开始选对,改来源非自动)

| 场景 | tenantRegistry |
|------|----------------|
| Customer-Managed BTP XSUAA | `saasRegistry` |
| IAS/SMS | `unifiedResourceManager` |
| SAP-Managed BTP(UCA)/非 BTP(SPFI/Operator) | `unifiedResourceManager` |
| SPC/CLD | `cloudLandscapeDirectory` |
| 双模式 | 双 registry |

## 相关

- [[Unified Customer Landscape (UCL)]]
- [[SPII 服务提供方集成接口]]
- [[Formations 编排组]]
- [[How-To 集成你的应用]]
