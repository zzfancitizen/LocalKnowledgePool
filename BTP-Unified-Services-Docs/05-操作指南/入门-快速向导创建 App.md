---
title: 入门-快速向导创建 App
aliases:
  - Quick-Start Wizard
  - Set Up Your App
  - 快速向导
tags:
  - how-to
  - getting-started
---

# 入门:用快速向导创建 App (Quick-Start Wizard)

> [!abstract] 目标
> 在 [[Workspace 与 CAD|Unified Services Workspace]] 里用 **Quick Start → Set Up App** 向导,根据用例生成你的 app 所需的全部资源 YAML,并自动建立它们之间(繁琐易错但必需)的关联。

## 前提

- 已有 [[入门-申请 Provider Folder|provider folder]]。
- 绑定 `services.serviceprovider` [[系统交付角色|角色]](否则看不到向导入口)。
- app **尚未**被 `ManagedService` 表示。

> [!warning] 已存在则复用
> 若 app 已有 `ManagedService`(如同区域别的团队为其他用例接入时建的),**必须复用**,不要重跑向导建新的(会造成不受支持的配置、重复、工单)。

## 选择 Capabilities(在单一 ManagedService 里声明)

| Capability | 生成资源 |
|-----------|---------|
| **Product Metadata**(默认必选) | `ServiceMetadata`(technical name、display name、CLD System Role 等) |
| **Provisioning** | `AutomationSolution`(UCA 脚本)、`CLDTenantSyncEnablement` |
| **Integration** | `ManagedApplicationProvider`(MAP)、`Integrations` |
| **Metering** | 计量 `Account`(需 Metering 运营团队审批后才 Ready) |

## 生成的核心资源

- **`ManagedService`** — app 模板/生命周期能力(见 [[Unified Service Manager 与 ManagedService]])
- **`ResourceTypeDefinition` (RTD)** — 定义 app 的租户类型,自动暴露 API `/api/resources/<group>/<version>/<plural>`;Group 默认为 folder 反转路径,Type 为 PascalCase 单数(如 `<App>Tenant`)
- **`ServicePublishConfiguration`** — 发布 tenant type 到 test 路径
- SAP BTP 场景:在 provider subaccount 建 `cis` 服务 `cloud-automation` plan 的 instance + binding

## 常见坑(Known Limitations)

- consumer test subaccount 生成的 `AutomationSolution` 脚本**不完整**(缺 service binding/destination/环境参数/labels),需用 [[Workspace 与 CAD|CAD]] 微调。
- CF space 名固定 `space` 且只取任意一个。
- IAS-based SaaS 须先在 subscription 前配好 subaccount↔IAS trust(用 CAD Subscription module)。
- custom OIDC/Opscurity IdP 登录时无法用 SAP BTP Details 段。
- **建议下载向导生成的 PDF**(关闭后无法重生)。

## 下一步

参考 [[How-To 集成你的应用]]、[[How-To 供应与迁移到 URM]] 完成对应用例的 onboarding。

## 相关

- [[Unified Service Manager 与 ManagedService]]
- [[ManagedService v2 参考]]
- [[入门-分阶段开发 (Staged Development)]]
