---
title: 其他工具与 SDK
aliases:
  - URM SDK
  - rm-api
  - Helm Plugin
  - Secret Provider
  - SaaS Cockpit
  - UPC 工具其他
tags:
  - tool
  - sap/sdk
---

# 其他工具与 SDK

## URM SDKs

简化与 URM server 交互的开发套件:
- **API SDK**(Go,核心数据结构与 API 接口)
- **Client SDK**(Go,客户端配置)
- **Java Client SDK**
- **Controller-utils SDK**(Go,构建/测试 controller)

## rm-api(REST APIs)

[[Unified Resource Manager (URM)|URM]] 的 HTTP RESTful 接口,对已注册资源类型支持完整 **CRUD**,可订阅资源状态变更。**认证基于 mTLS**。
端点结构:`/api/resources/<group>/<version>/<plural-type>/<path>/.../<resource>`。文档提供 Insomnia 使用指南(用 `TechnicalClient` 生成的 `.crt` + 私钥配 Client Certificate)。

## Helm Plugin(URM Helm plugin)

自动化部署流程,将原生 Helm 特性与 URM 集成。支持部署顺序编排、等待条件、超时、原子操作与回滚。可与 Argo CD 集成,或安装为执行 URM Helm plugin 的 Kubernetes Job。命令:`helm urm install/upgrade/uninstall`。

## Secret Provider(Secrets Provider)

URM Secrets Provider 是 **Secrets Store CSI driver** 的 add-on,把 URM secret 内容作为可挂载 volume 提供给 Kubernetes Pod 文件系统,支持**自动轮换 secret 且无需重启 pod**。最常见用例:把 `TechnicalClient` Secret(含 API config)挂载到 Controller 的 pod。

## SaaS Cockpit(BTP SaaS App Admin UI)

SAP BTP cockpit 的白标版,供 SAP-managed BTP SaaS 应用的消费者做有限管理(用户管理、landscape 配置)。用 UCA 自动化时**开箱即得**。
> [!warning] 即将停用
> 由 **INTG-04R1** 产品标准取代,最终退役推迟到 **2027-02-01 (2702)**。迁移:`AutomationSolution` 中 `is_saas_cockpit` 设 `false`;用户分配改用 IAS User Group。

## CAD

见 [[Workspace 与 CAD#二CADCloud Automation Designer]]。

## 相关

- [[uctl 命令行工具]]
- [[Ubuilder 脚手架]]
- [[URM Studio (VS Code 扩展)]]
- [[系统资源 (TechnicalClient-Secret-RTD)]]
