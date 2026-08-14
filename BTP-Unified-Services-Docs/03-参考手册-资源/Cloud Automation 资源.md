---
title: Cloud Automation 资源
aliases:
  - Cloud Automation Reference
  - AutomationSolution
  - AutomationRequest
tags:
  - reference
  - sap/uca
---

# Cloud Automation 资源

> API group:`cloud-automation.resource.api.sap/v1`。概念背景见 [[Unified Cloud Automation (UCA)]]。

| 资源 | 说明 |
|------|------|
| **`AutomationSolution`** | 在 SAP BTP Cloud Automation 注册的解决方案(凭据来自 **CIS** = SAP Cloud Management for SAP BTP) |
| **`AutomationRequest`** | 触发某 `AutomationSolution` 执行 |
| **Modules** | UCA 预置可复用模块(在 CAD 中使用) |

## AutomationSolution

`spec.solution` 含 Terraform `content`(main.tf 引用 UCA 模块),可选:
- `deprovisioningSolution`(`useDefault` / 自定义 / `useProvisioningSolution`)
- `suspensionSolution`
- `ssoSetupSolution`
- `patchByDeletionSolution`

## AutomationRequest

- `spec.automationSolutionUid`(必填)
- `cloudAutomationSecretName`(必填,CIS 凭据 secret)
- SPFI 流字段:`spfiNotificationId` / `spfiCallbackUrl` / `spfiNotificationDetails`(子资源)
- 布尔开关:`deprovision` / `suspension` / `ssoSetup` / `patchByDeletion`
- `parameters`

## Modules(模块)

UCA 预置可复用模块,按运营模式组织。例:
- **Subaccount 模块**:创建消费者 subaccount(输入 Customer Id / Parent Guid / Subaccount Admins)
- **IAS app-specific user group 模块**

## 相关

- [[Unified Cloud Automation (UCA)]]
- [[Workspace 与 CAD]]
- [[How-To 供应与迁移到 URM]]
