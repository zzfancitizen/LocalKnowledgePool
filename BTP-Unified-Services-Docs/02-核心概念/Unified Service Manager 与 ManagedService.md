---
title: Unified Service Manager 与 ManagedService
aliases:
  - USM
  - Unified Service Manager
  - ManagedService
  - Managed Service
tags:
  - concept/core
  - sap/usm
---

# Unified Service Manager 与 ManagedService

> [!abstract] 核心
> **Unified Service Manager (USM)** 提供中心化资源类型 **`ManagedService`** —— 它是应用在 Unified Services 生态中的**"护照(passport)"**,标准化描述服务及其全生命周期。无论底层技术平台是什么,`ManagedService` 让 provider 用统一方式描述其 offering 及消费方式。

## 五大 Capabilities(能力,模块化可选用)

在单一 `ManagedService` 资源里声明并启用:

| Capability | 说明 | 生成资源 |
|-----------|------|---------|
| **Commercialization** | ordering/listing/pricing、SLM catalog 注册、SAP for Me/BTP cockpit 上架、consumption-based 商务模型(ICEA、C2C、One Fund) | [[商业化集成资源 (Eligibility 等)#ServiceMetadata\|ServiceMetadata]] |
| **Provisioning** | Blueprint 建模、跨 SAP 供应编排、BTP 自动化 | `AutomationSolution`、`CLDTenantSyncEnablement` |
| **Integration** | 管理 App Provider、[[SPII 服务提供方集成接口\|SPII]]、依赖管理 | [[Customer Landscape 资源 (MAP 等)\|ManagedApplicationProvider]]、`Integrations` |
| **Metering** | billing metering + functional metering | 计量 [[计量资源\|Account]] |
| **Security** | 与 IAS/身份提供方集成做认证授权 | 见 [[SCI 身份与安全]] |

> **Product Metadata** 默认必选(接入 Unified Services 的强制步骤)。

## 技术能力

### 发布 Service API
通过 `spec.resources[].rtdRef` + `type` 指定 nested RTD,USM 把它"promote"到根级即"published(已发布)"。

### 授权管理
- **Control Time Authorization**:`spec.authorization.principals` / `roles`。
- **Channel Authorization**:通过 channels 安全传输凭据,默认用 URM `Secret` 类型,`spec.resources[].channels`。
- **Delegated Authorization**:`spec.providerResources[].grantedRoles`,接收方需 `receiveGrantedRoles=true`。

### 生命周期/依赖管理
- **Provider-Side Resources**:`spec.providerResources`,如 OIDC 应用定义、kernel services。
- **Business & Technical Integration**:通过 external channels 交换技术细节;`spec.resources[].trustedChannelDelegators` 指定 `TenantMapping` 作为 trusted channel delegator。

## 参考

详细字段(`spec.group`、`authorization.roles/principals`、`resources[]`、`providerResources[]`、`triggerWith`、Phased Upgrade、CEL conditions 等)见 [[ManagedService v2 参考]]。

> [!warning] 版本
> `ManagedService` **v1 已于 2023-10-11 停止新建**,必须用 **v2**。

## 相关

- [[Unified Resource Manager (URM)]]
- [[ManagedService v2 参考]]
- [[入门-快速向导创建 App]]
- [[核心概念关系总览]]
