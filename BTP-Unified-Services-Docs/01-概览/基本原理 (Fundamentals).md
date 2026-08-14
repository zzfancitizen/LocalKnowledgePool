---
title: 基本原理 (Fundamentals)
aliases:
  - Fundamentals
tags:
  - concept/overview
  - sap/unified-services
---

# 基本原理 (Fundamentals)

> [!abstract] 交付模式的根本转变
> SAP 正从**孤立的、基于租户(tenant)的交付**,转向**完全集成、SAP 管理(SAP-managed)、套件优先(suite-first)**的解决方案交付。

## 转变的驱动力

市场节奏与竞争压力推动 SAP 提供:

- **自助、一键式(one-click)供应**体验。
- 客户获得**开箱即用的 SaaS 解决方案**(租户、共享服务、集成、内容)。
- 作为**单一集成单元**交付 —— 业务租户、共享服务、内容全部由 SAP 管理。
- 通过 **SAP for Me** 实现全透明(激活、监控、生命周期等)。

[[Unified Resource Manager (URM)|URM]] 是实现该愿景的**编排层**,而 **blueprints(蓝图)** 是履行物料清单(BOM)的关键构件。

## Entitlements 与技术解耦

- CRM/EMS 现在交付的是 **entitlement tenants(权利租户/solutions)**,而非技术租户(TBTs / ZH codes)。
- 这些被按 blueprint 配置分解为 **eligibilities**。
- 强制**商业权利(commercial entitlement)与技术设置(technical setup)分离** —— eligibilities 由 blueprint 驱动,获得规模化所需的敏捷性。
- 降低对 CRM 的租户交付依赖。
- Blueprint owner 完全掌控组成(租户、集成、内容),可动态增减组件与集成。

## 统一 SaaS 交付模型

历史上 SAP 交付孤立租户,客户需自行拼装解决方案。现在 SAP 交付真正的 SaaS:

- 不再有独立租户。
- 基于 entitlement 的解决方案。
- SAP 管理、完全集成的交付。
- 动态演进,可在合适时无需客户参与地持续更新。
- **业务租户与共享服务(如 IAS、CALM)不再分离** —— 作为单一集成单元交付,强依赖。
- 共享服务是产品不可分割的基础部分,与任何其他租户同等对待。

## 共享服务多层模型 (Shared Services Multi-Layer Model)

SAP 共享服务分为 **3 层**,各定义不同的共享与供应范围:

| 层级 | 范围 | 说明与例子 |
|------|------|-----------|
| **Account-Level** | 整个客户账户共享 | 3 类:**ATG**(自动供应,无客户交互)、**Core Components**(SAP 管理的单例,客户提供输入)、**Shared Identity**(每业务类型单例,如 SCI) |
| **Suite-Level** | 同一 suite 与 tier 内多个 solution 实例共享 | 例:MDI、BDO、CIG |
| **Solution-Level** | 单个 solution 实例专属 | 与该实例一起供应和生命周期管理,例:DPI、SAL、MDApp |

> 详见 [[Embedded Tenants 嵌入式租户]]。

## 相关

- [[什么是 Unified Services]]
- [[整体架构]]
- [[Unified Provisioning 供应]]
- [[Embedded Tenants 嵌入式租户]]
