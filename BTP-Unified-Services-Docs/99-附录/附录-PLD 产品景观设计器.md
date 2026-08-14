---
title: 附录-PLD 产品景观设计器
aliases:
  - PLD
  - Product Landscape Designer
tags:
  - reference
  - tool
  - sap/provisioning
---

# 附录:PLD(Product Landscape Designer)

> [!abstract]
> **PLD** 是集中式工具,把 solution 的 bill-of-material 建模为架构 blueprint,是 onboarding 到 [[Unified Provisioning 供应|Unified Provisioning]] 的**前提**。

## 权限

- 默认所有 SAP 员工**只读**。
- 创建/编辑需 UI 申请角色:**Content creator**(CLT_USER/FIORI_USER)或 **Administrator**(CLT_ADMIN/FIORI_ADMIN)。推荐先申 Content Creator。
- 用 `accounts400.sap.com` 作 IAS 认证;仅存用户 I/D/C-number。

## 作用

- 用 **BoM resolution service** 决定供应顺序。
- SPC classic 与 UP 都用 PLD blueprint。
- SCI SSO 建模时,solution expert 在 PLD 建 blueprint 要求激活时选 `SCITenant`。

## 相关

- [[Unified Provisioning 供应]]
- [[BTP Blueprint 与解决方案]]
- [[How-To 供应与迁移到 URM]]
