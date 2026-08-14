---
title: 什么是 Unified Services
aliases:
  - What is Unified Services
  - USRV
  - Atom
tags:
  - concept/overview
  - sap/unified-services
---

# 什么是 Unified Services

> [!abstract] 一句话
> Unified Services（内部代号 **Atom**，缩写 **USRV**）是一项 **SAP 全域(SAP-wide)** 的工程,目标是把 SAP 及合作伙伴的商业解决方案与流程整合进**单一产品套件**,为解决方案提供方(SAP/Partner)和消费方(SAP 客户)提供套件式、跨 SAP 的统一体验 —— 即 **ONE SAP experience**。

## 定位

Unified Services 是 SAP **Intelligent Enterprise Suite (IES)** 战略的关键使能层。它:

- 覆盖一套 SAP 共享的**服务、流程、工具**,把散落的 SAP 组件粘合成一张连贯的图景。
- 是一个**可扩展、可适配的框架**,能对任何"resource(资源)"和"business process(业务流程)"建模,连接企业系统、业务解决方案、技术 landscape 与商业实体。
- 让 **provider** 用一个接口管理全部技术与商业要素(预集成了 SAP 企业系统与主流程)。
- 让 **customer** 管理来自 SAP 及其伙伴的全部合规商业与技术资产,控制每个实体的生命周期、用户分配、成本等。
- 支撑面向客户的智能企业业务场景,如 **Industry Cloud、RISE with SAP、Marketplace**。

它充当一个**统一的业务与数据平面(unified business and data plane)**,基于共享的商业与技术数据(客户信息、合同、产品、配额等),连接内容提供方、客户与 SAP 后台系统。

## Unified Services 覆盖的领域(Domains)

- **Commercialization** 商业化 — 提供商业模型、发布解决方案
- **Service portfolio** 服务组合 — 技术与业务服务清单
- **Solution provisioning** 解决方案供应 — 定义、编排、执行供应流程
- **Customer onboarding** 客户接入 — 建立并启用客户上下文
- **Lifecycle management and deployment** 生命周期管理与部署

## 核心组件

Unified Services 的核心组件都实现为 [[Unified Resource Manager (URM)]] 之上的 **operator**:

| 组件 | 缩写 | 说明 | 笔记 |
|------|------|------|------|
| Unified Resource Manager | URM | 声明式资源中枢,整个套件的入口 | [[Unified Resource Manager (URM)]] |
| Unified Commercial Integration | UCI | 管理客户使用产品的资格(eligibility)生命周期 | [[Unified Commercial Integration (UCI)]] |
| Unified Account | UA | SAP 全域层级化上下文,承载各类资产 | [[Accounts 账户模型]] |
| Unified Service Manager | USM | 服务注册、发布、供应 | [[Unified Service Manager 与 ManagedService]] |
| Unified Cloud Automation | UCA | 基于 Terraform 的 BTP 资源自动化 | [[Unified Cloud Automation (UCA)]] |
| Unified Provisioning | UP | desired-state 驱动的应用供应 | [[Unified Provisioning 供应]] |
| Unified Customer Landscape | UCL | 聚合客户 IT landscape 成统一图模型 | [[Unified Customer Landscape (UCL)]] |
| Unified Metering | UM | 记录使用量,用于计费/报表/合规 | [[Unified Metering 计量]] |
| Unified Metadata Service | UMS | 可插拔元数据聚合(UCL 的底座) | [[Unified Customer Landscape (UCL)]] |

## 相关

- [[动机与背景 (IES 战略)]]
- [[基本原理 (Fundamentals)]]
- [[整体架构]]
- [[核心概念关系总览]]
