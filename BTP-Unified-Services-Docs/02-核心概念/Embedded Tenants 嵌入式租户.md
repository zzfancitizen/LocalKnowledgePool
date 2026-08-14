---
title: Embedded Tenants 嵌入式租户
aliases:
  - Embedded Tenants
  - 嵌入式租户
tags:
  - concept/core
  - sap/embedded-tenants
---

# Embedded Tenants 嵌入式租户

> [!abstract] 核心
> **Embedded Tenant** 管理应用/服务对其他关键服务的依赖 —— 它是消费应用("parent")的**强制内部组件**。

## 两大模式

### Private Embedded Tenants("Application Level")
- parent **独占**,生命周期与 parent 强耦合(同生同灭)。
- 由 **Embedded Tenant Manager (ETM)** 处理。
- 提供内置模板引擎配置 spec(含 mixins),可决定 provisioning region。

### Shared Embedded Tenants(跨多 parent 共享)
首个 parent provision 时创建、最后一个 deprovision 时删除。分两层:

| 层级 | 说明 | 例子 |
|------|------|------|
| **Account Level** | 每客户账户/区域单例全局;用 **Account Tenant Group (ATG)** 经 URM Initial Content 配置 | Kernel Services 如 Audit Log v3 (ALSv3) |
| **Solution Level**("Business Context Level") | 每 solution 实例有自己的一组共享租户;用 **Solution RTD**(mixin `BTPSolution`)+ Blueprint(`BTPBlueprint`) | — |

Account Level 创建策略:**Always(Eager)** / **On-Demand(Lazy)**;自动集成经 `BusinessIntegrationPublisher (BIP)` + `Integrations`。

Solution Level 的 create mode:**Optional**(客户控制)/ **Always** / **OnDemand** —— 选 Always/OnDemand 即成 shared embedded。

## External Integrations vs Shared Embedded Tenants

| | External Integrations | Shared Embedded Tenants |
|--|----------------------|-------------------------|
| 客户可见 | ✅ 可见并主动选择 | 多为技术租户,可见/隐藏由 owner 定 |
| 例子 | S/4HANA Cloud、Ariba Sourcing、IAS、MDI | Audit Log 等 kernel service |
| 配置 | blueprint 的 Formation Type + `Integrations` | 与 context 关联 |

## Provisioning 与 Integration

- **Provisioning**:需 SAP-managed 模式;可由自定义 operator、[[Unified Cloud Automation (UCA)|UCA]] 或 **SPFI** provision。
- **Integration(由 UCL 编排)**:
  - Shared:在 blueprint `integrations.formationTypes` 定义。
  - Private:parent provision 时经 **BIP** 自动建 `BusinessIntegration` + Formation。

## 参考与指南

- 资源详情:[[嵌入式租户资源]]
- 配置操作:[[How-To 集成你的应用#配置 Embedded Tenants]]
- 层级背景:[[基本原理 (Fundamentals)#共享服务多层模型 Shared Services Multi-Layer Model]]

## 相关

- [[BTP Blueprint 与解决方案]]
- [[Formations 编排组]]
- [[Unified Provisioning 供应]]
