---
title: How-To 其他任务
aliases:
  - How-To Others
  - 配置 Commercial Mapping
  - Meter Your App
  - Secure Your App
  - CI-CD
  - CAM 集成
tags:
  - how-to
---

# How-To:其他任务

> 汇总 How-To Guides 中的其余任务。

## 配置 Commercial Mapping

把 LOB 的 local tenant 映射到客户 SAP CRM tenant,enrich 后出现在 Cloud Reporting/HAUM(用于 billing + reporting)。**必须已有 URM provisioning**,仅报计量不够。
在 `ServiceMetadata.spec.commercialMappingConfigurations` 配:`localTenantType`(**全局唯一**,须与计量 payload 的 `originServiceInstance.type` 及计量 `Account` 一致)、`cldSystemRole`(**全局唯一**)、`applicableTo.billing/reporting`、`commercialMappingStartDate`、`localTenantIdPattern`。
> 坑:内部租户(`$` 开头)不从 CLD 拉取。见 [[Unified Metering 计量]]。

## Meter Your App(计量你的应用)

面向**非 BTP SAP-managed SaaS app**。步骤:(1) provision 计量 [[计量资源|Account]](Ready 后生成含 URL/证书的 `Secret`,证书 3 个月有效)→ (2) 配 commercial mapping → (3) 报用量(证书转 x509 后 POST,payload 含 `id`/`timestamp`/`consumer.originServiceInstance`/`measure`)。**dimension 不得含个人数据**。

## Secure Your App(保护你的应用)

用 [[SCI 身份与安全|SCI(IAS)]] 自动化 app 与客户 SCI tenant 的 SSO/租户映射。Provider 流程:建 `SCIApplication`(`identity.resource.api.sap/v2alpha1`)→ 建 `Integrations`(定义对 `SCITenant` outbound 集成;**设计上不会 Ready**)→ `ManagedService.providerResources` 引用 → SCI operator reconcile 生成 binding secret(K8s 用 Secret Provider 挂载自动轮转)。

## CI/CD Your Environment

用 **Helm + [[其他工具与 SDK#Helm Plugin|URM Helm Plugin]]**(`helm urm install/upgrade/uninstall`)管资源生命周期。推荐用 [[URM Studio (VS Code 扩展)|URM Studio]] 生成 chart。Staged development:单一 provider chart + 每 stage 一个 `values-<stage>.yaml`。`uctl login --server-url <url> --sso`;导入现有资源用 `--take-ownership`。**勿提交敏感信息(如 UCA 凭证)**。

## CAM 集成

用 CAM profile 管 URM 权限。链路:IAS(app+group)← CAM(access level↔IAS group) → URM(`OIDCProvider`+`Role`+`Binding`)。步骤:建 CAM profile → 提工单建 IAS app+group+CAM access level → 挂 access level 到 profile → apply `OIDCProvider` → 建 `Role` + `Binding`(`subjects.type: Group`,`origin` = OIDCProvider 路径+名)。

## Determine Customer Eligibility(资格检查)

app 代码内查客户是否有权用某 type/SKU。API:按 GVT `GET .../eligibilities/eligibilitycheck/v1?customerId=&group=&type=` → `{eligible:true}`;按 SKU `GET .../entitlementlist/entitlementcheck/v1?customerId=&materialNumber=<SKU>` → `{entitled:true}`。

## Enable Marker Tenant Creation

面向 provisioning 在 US 之外的 SaaS app,为参与 URM 流程创建 **Marker Tenant**。建 `MarkerTenantConfig`(spec 空)→ 在 `ManagedService.providerResources` 引用(`associatedWith` 指定 tenant type)。默认 lazy 策略。

## Consume BTP Services / Onboard to NS2 / Create Process Blueprints

- **Consume BTP Services**:非 BTP SaaS 消费 BTP 服务,用 Embedded Private Tenants,BTP 服务方须转 SAP-managed。
- **Onboard to NS2**(主权云/AWS GovCloud):特定应用,重开现有工单请求建 folder;SAP for Me 不可用,手动经 Helm/API/`uctl` 建/升 solution。
- **Create Process Blueprints**:跨 suite 编排器(如 Hire-to-Retire、Lead-to-Cash)。

## 相关

- [[Unified Metering 计量]]
- [[SCI 身份与安全]]
- [[入门-管理用户授权]]
- [[入门-分阶段开发 (Staged Development)]]
