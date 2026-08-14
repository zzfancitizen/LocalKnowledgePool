---
title: 入门-申请 Provider Folder
aliases:
  - Request a Provider Folder
  - Provider Folder
tags:
  - how-to
  - getting-started
---

# 入门:申请 Provider Folder

> [!abstract] 目标
> 每个 app provider 必须有一个 **provider folder**(容器,存放该 app 全部 Unified Services 资源)。SAP 内部 app 位于 `sap` [[账户层级资源|organization]] 下代表 line of business 的 folder。

## 做法

> [!important] 每个 app 只能有**一个** provider folder
> 先在 Jira 查询是否已存在(搜 `SAPBTPCFSSR` 项目 "Request for Provider Folder");若已存在,联系工单里的联系人获取访问。

- 克隆 Jira 工单 **`SAPBTPCFSSR-1`**,填写所有信息。
- **SLA 5 个工作日**。
- 可重开工单在其他 landscape 追加 folder。

初始 folder 层级按 SAP portfolio management(Solution Area Hierarchy 报告)。

## 结果(自动创建的资源)

operator 处理后创建 folder,并生成:

**4 个 `Binding`**(subjects = 你指定的初始 admin):
- `accounts.admin`
- `accounts.viewer`
- `services.serviceprovider`
- `services.serviceprovider.viewer`

一个含 cost object 的 **`AccountMetadata`**。

> 详见 [[系统交付角色]] 与 [[账户层级资源]]。

## 下一步

- [[入门-管理用户授权]]
- [[入门-快速向导创建 App]]

## 相关

- [[Accounts 账户模型]]
- [[入门-应用运营模式]]
