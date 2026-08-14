---
title: Landscapes 环境
aliases:
  - Landscapes
  - Canary
  - Live
  - 环境
tags:
  - reference
  - sap/landscape
---

# Landscapes 环境

> 两大 landscape。What's New 表中的发布日期默认指 **Canary** 可用日期。

| Landscape | 用途 | URL | Workspace |
|-----------|------|-----|-----------|
| **Canary** | 稳定测试版 | `https://canary.resource.api.sap` | `workspace.canary.resource.api.sap` |
| **Live** | 稳定生产版 | `https://global.resource.api.sap` | `workspace.global.resource.api.sap` |

- Live landscape 于 **2022-04-28** 上线,早于此只有 Canary。

## 与分阶段开发的对应

| 阶段 | Landscape |
|------|-----------|
| Dev, Test | Canary |
| Pre-Production, Production | Live |

> 见 [[入门-分阶段开发 (Staged Development)]]。

## 主权云:NS2(AWS GovCloud)

- Canary:`https://api.rm.us50-canary.urm-canary.shoot.gardener.preprod.sapns2.us`(URM 运营)
- Live:TBD(NS2 运营)

> 见 [[How-To 其他任务#Consume BTP Services Onboard to NS2 Create Process Blueprints]]。

## SPII / UCL 相关端点(mTLS Host)

| Landscape | UCL Gateway SAP mTLS Host |
|-----------|---------------------------|
| Staging | `compass-gateway-sap-mtls.cmp-main.dev.kyma.cloud.sap` |
| Canary | `...mps.stage.kyma.cloud.sap` |
| Live | `...mps.kyma.cloud.sap` |

## 相关

- [[整体架构#外部系统集成]]
- [[入门-分阶段开发 (Staged Development)]]
- [[附录-What's New 更新历史]]
