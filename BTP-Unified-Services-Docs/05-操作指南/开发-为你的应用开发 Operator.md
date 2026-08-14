---
title: 开发-为你的应用开发 Operator
aliases:
  - Develop an Operator
  - Operator 开发
tags:
  - how-to
  - sap/dev
---

# 开发:为你的应用开发 Operator

> [!abstract]
> **URM Operator** = 用 controller 管理资源生命周期的扩展。目标:自动化生命周期、自愈、领域逻辑。

## 核心特性

- reconciler loop(协调循环)
- leader election(主节点选举)
- label 组织
- 自定义业务逻辑
- event-driven(事件驱动)
- webhook(mutating / validating)

## 工具

用 [[Ubuilder 脚手架|Ubuilder]] 脚手架 operator/controller 代码:
- `ubuilder create api`:脚手架 URM API 资源定义/controller
- `ubuilder create webhook`:生成 webhook

配合 [[其他工具与 SDK#URM SDKs|Controller-utils SDK]] 构建/测试。用 [[其他工具与 SDK#Secret Provider|Secret Provider]] 把 `TechnicalClient` 凭据挂到 controller pod。

> 详细实现参见 URM help-docs 的 "Implementing a Controller"。

## 相关

- [[Unified Resource Manager (URM)]]
- [[Ubuilder 脚手架]]
- [[Unified Provisioning 供应]]
