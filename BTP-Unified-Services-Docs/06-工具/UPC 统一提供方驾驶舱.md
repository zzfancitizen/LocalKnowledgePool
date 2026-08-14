---
title: UPC 统一提供方驾驶舱
aliases:
  - UPC
  - Unified Provider Cockpit
tags:
  - tool
  - sap/ops
---

# UPC 统一提供方驾驶舱 (Unified Provider Cockpit)

> [!abstract]
> **UPC** 是 SAP 内部运营管理 Web 工具,供 **SaaS solution operators** 在 app onboarding 后监控、排障、运营解决方案与 tenant(dev/staging/production)。当前为 **beta**(无 SLA)。

## 访问地址

- Canary:`https://unified-provider-cockpit.canary.resource.api.sap/`
- Live:`https://unified-provider-cockpit.global.resource.api.sap/`

用 SAP ID 或 custom OIDC 登录。

## 权限模型

在产品的 `ManagedService` 中配置。两级角色:solution-level(`get`/`watch`/`update`/`patch`)与 tenant-level(标 `external: true`)。推荐用 **CAM + 自有 OIDC** 按用户组授权。查看 commercial 资源需 `additionalPermissions: [ "upc.commercial.viewer" ]`。

## 主要页面

- **Provisioning** > Solutions / Tenants
- **Commercial** > Entitlement Tenants / Eligibilities
- **Events**(近 7 天事件)
- **Resource Explorer**

## 关键功能

- Basic/Advanced 视图切换(Advanced 才有 Mixins、References、Events、完整 YAML)
- saved views、导出 Excel(.xlsx)
- **手动 reconcile(touch)solution**(UCA 支持,SPC SPFI 不支持)
- **Bulk actions**(批量 reconcile / 升级到 staged blueprint)
- Solution blueprint 分阶段升级(Active/Staged)
- Provisioning Flow 分析(跳转 CAD 或 SPC)

## 相关

- [[附录-支持渠道与变更管理#Troubleshooting and Monitoring]]
- [[Unified Provisioning 供应]]
- [[Workspace 与 CAD]]
