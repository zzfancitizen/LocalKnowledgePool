---
title: 入门-分阶段开发 (Staged Development)
aliases:
  - Staged Development
  - 分阶段开发
tags:
  - how-to
  - getting-started
---

# 入门:应用分阶段开发 (Staged Development)

> [!abstract] 目标
> 应用在到达生产前经过多个环境,每阶段作为质量门。**仅适用于 applications**;solutions/blueprints 用 [[BTP Blueprint 与解决方案#Lifecycle Draft Released|Draft/Released]] 版本机制。

## 四个阶段

| 阶段 | Landscape |
|------|-----------|
| **Dev** | Canary |
| **Test** | Canary |
| **Pre-Production** | Live |
| **Production** | Live |

## URM 层面

- 每阶段单独一套 `ManagedService` + `RTD` + provider 资源。
- **命名约定**:Test/Production 用纯 app 名(事实生产部署);Dev/Pre-Prod 加后缀 `dev`/`preprod`(如 `my-app-dev-ms`、`MyAppDevTenant`)。
- commercial mapping **仅在生产版**(Test、Production)配置。
- 每 landscape 一个 provisioning 脚本(`AutomationSolution`)。

## UCL 层面

- 每阶段单独 System Type (MAP) + Formation Type。
- **内部 stage 不可被其他 app 依赖**;只能依赖生产 stage(Canary=Test,Live=Production)。

## BTP 层面

- Canary/Live 各一个专用 BTP global account;各含 subaccount + `cis`(`cloud-automation`)实例 + binding(UCA 凭证,编码进 `Secret`)。
- 每个环境注册为独立 BTP app(SaaS Registry / SMS)。
- 多区域:用**单一** URM 注册 + MAP tenant sets 解析区域端点,而非增注册。

## 测试

- 每 stage 部署后做 **level-0**(`Tenant` + `FulfillmentData` → Ready;`BusinessIntegration` 验集成)。
- Canary 上影响 SAP for Me UI 的改动做 **level-2**。

> [!warning] Live 无法端到端测试
> CRM/iBase、CLD、SPC、SAP for Me 在 **Live 不可测**,只能 level-0。

### level-0 自动化
先用 `ServicePublishConfiguration` 把 tenant type 发布到 test 路径(自动建 `Eligibility` + `PathBinding`)。步骤:apply `Tenant` → apply `FulfillmentData`(dummy 数据)→ 删 `Tenant`(`FulfillmentData` 随之自动删)。用 **[[其他工具与 SDK#Helm Plugin|URM Helm Plugin]]**(`helm urm install/uninstall`,`--wait`),资源名加 pipeline run id/时间戳。

## 测试等级对照

| 等级 | 层面 | 说明 |
|------|------|------|
| **level-0** | 应用级 | Tenant + FulfillmentData → Ready;BusinessIntegration 验集成 |
| **level-1** | UI 级 | 经 SAP for Me 的 path configuration 验证 provisioning wizard |
| **level-2** | 商务级 | 真实 CRM order 端到端(Live onboarding 前提) |

## 相关

- [[How-To 其他任务#CI-CD Your Environment]]
- [[How-To 供应与迁移到 URM]]
- [[Landscapes 环境]]
