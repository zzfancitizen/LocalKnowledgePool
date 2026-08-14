---
title: Workspace 与 CAD
aliases:
  - Workspace
  - Unified Services Workspace
  - CAD
  - Cloud Automation Designer
tags:
  - tool
  - sap/ui
---

# Workspace 与 CAD

## 一、Unified Services Workspace

> [!abstract]
> 现代化 GUI 工具,供 service provider/developer 管理 Unified Services 资源。用 **SAP ID** 认证(也支持 Opscurity/custom OIDC)。

- 地址:Canary `https://workspace.canary.resource.api.sap`;Live `https://workspace.global.resource.api.sap`
- **能做**:访问 organization/provider folder;导航管理 folder/resource group;查看资源详情(Overview/YAML);用 YAML 编辑器或 schema-based 表单创建/编辑资源;创建/编辑 service instance;向其他组织发布服务;访问 CAD;查看 References(Resource Visualizer/URV)与 Resource Event Viewer。
- 功能超范围时改用 [[uctl 命令行工具|uctl]]。
- 前置:须被分配到 provider folder。
- 入口:**Quick Start → Set Up App**(见 [[入门-快速向导创建 App]])。

### Schema-Based UI Forms
Workspace 用 RTD 的 JSON schema 渲染表单化 UI,底层用 Angular 的 **Formly** 库。关键 JSON 属性:`name`、`title`、`description`、`maxlength`、`enum`、`pattern`、`required`。

## 二、CAD(Cloud Automation Designer)

> [!abstract]
> 可视化创建 **Cloud Automation solution**(基于 **Terraform**)的工具,位于 Workspace 内。相比手写 Terraform 减少约 **70%** 代码。方案保存为 `AutomationSolution` 资源,注册在 [[Unified Cloud Automation (UCA)|UCA]]。

- **两种运营模式**:SAP-Managed / Customer-Managed。
- **凭据**:创建 Cloud Management(`cis`)服务 `cloud-automation` plan 的实例+binding,取 `clientid`/`clientsecret`/`url` 存入 `Secret`。
- **模板**:Subscription Setup、Service Instance Setup、Environment Setup、Full Subaccount Setup、API Request Setup(non-BTP)。以 **modules** 为构建块。**CAD 不自动保存**。
- **Solution Outputs**(SAP-Managed BTP):`subaccountId`、`endpoints`(Application URLs)、`subscriptionId`/`serviceInstanceId`、`spcSystemId`、`applicationName`、`gtid`(Global Tenant ID,按 TG04.R5 **强制提供**)。
- SAP-Managed 附加能力:**Suspension**、**Deprovisioning**、**SSO Setup**。
- 内建**设计时校验**;**Automation Analysis** 实时追踪请求进度。

## 相关

- [[Unified Cloud Automation (UCA)]]
- [[Cloud Automation 资源]]
- [[uctl 命令行工具]]
- [[入门-快速向导创建 App]]
