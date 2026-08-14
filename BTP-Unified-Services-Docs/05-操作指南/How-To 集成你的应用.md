---
title: How-To 集成你的应用
aliases:
  - Integrate Your App
  - 集成应用
  - Facilitators
tags:
  - how-to
  - sap/ucl
  - sap/integration
---

# How-To:集成你的应用 (Integrate Your App)

> [!abstract]
> 通过 [[Unified Customer Landscape (UCL)|UCL]] 让 app 参与自动集成。UCL **不参与 provisioning**,只在 tenant 被 provision 后做发现、集成、ORD 聚合。

## 注册到 UCL

**注册 = 建 [[Customer Landscape 资源 (MAP 等)|ManagedApplicationProvider (MAP)]]**。核心:`applicationType`/`productName`(= System Type)、`applicationNamespace`、`provider: SAP`、`scope`(`non-published`→验证后 `published`)、`tenantRegistry`(务必一开始选对)。

**SPII 配置**(`spec.spii.tenantMappings[]`):`accessStrategy: sap:cmp-mtls:v1`、`mode: SYNC|ASYNC_CALLBACK`、`url`、`version: application_tenant_mapping:v3`;`ASYNC_CALLBACK` 必须配 `trustConfiguration`(SAP Cloud Root CA)。用 `tenantSets`/`selector` 按 region 路由。

> **坑**:RTD 必须含 `FulfillmentData` 与 `TenantData` mixin;`ManagedService.providerResources` 引用 MAP 时授只读 role(`get`、`watch`)。

## 集成 SAP-Managed SaaS App(主流程)

1. 实现 [[SPII 服务提供方集成接口|SPII]](自建或 Static)
2. (可选)mock system 测 SPII
3. 建 global account scoped **Formation Type**(自助 UI)
4. (可选)PRE Level-0 隔离测试
5. 在 MAP 加 `spii` 段
6. (可选)用 `FormationType` + `BusinessIntegrationPublisher`(BIP)启用对 embedded tenant 的自动集成
7. 更新 `ManagedService`(把 MAP/FT/BIP 加为 providerResources)
8. 用 `BusinessIntegration` 做 **level-0** 集成测(`spec.edges` 含 sender/receiver)
9. 把 Formation Type 加进 [[BTP Blueprint 与解决方案|BTPBlueprint]]
10. 经 SAP for Me 做 **level-2** 测
11. 上线前请 UCL 把 Formation Type 设为 **global**

## 集成 Customer-Managed BTP PaaS / 第三方应用

- **BTP PaaS**:客户在 BTP Cockpit → System Landscape 组 formation,或在 booster 插入 UCL step。
- **第三方(非 SAP)**:BTP Cockpit → System Landscape → Systems 注册 System Type + Add System;跨 global account 加系统需 consent request。命名:客户注册用 `customer.*`,SAP-governed 用 `sap.<vendor>.<systemtype>`。**严禁**用此法建模生产 SAP 系统。

## Facilitators(SPII 辅助器)

| Facilitator | 作用 |
|-------------|------|
| **SCI** | 自动化 app↔SCI 的 SSO(formation type "Integration with SAP Cloud Identity Services",克隆 CMP-17362)+ App2App(consumer 请求 API 须是 provider 暴露 API 的**子集**) |
| **Service Manager** | 自动建 service instances(OSB broker),`credentials.inboundCommunication.<authType>.serviceInstances[]` |
| **Connectivity** | 配 SAP Cloud Connector 访问 on-prem(SAP-managed CC tenant-ful PRE mutate / Customer-managed CC tenant-less POST mutate) |
| **Destinations** | 自动建 destinations/certificates(仅 BTP Domain Model);**始终在 BTP app 侧同时请求 pre+post,Mode=mutate** |
| **S/4HANA Cloud** | 自动建 Communication User/System/Arrangement;`correlationIds` = Communication Scenario ID(如 `SAP_COM_0987`);对齐 Beyond Zones |

## 其他集成任务

- **发起 ORD 聚合**:见 [[ORD API 与发现#ORD 聚合 Aggregation]]。
- **Formation Type 自助 UI**:BTP Cockpit → System Landscape → Formations → Service Owner View。见 [[Formations 编排组#自助 UI Formation Type UI]]。
- **SCI 集成建模**:SSO(加入 CMP-17362 shared service FT)/ App2App(建三条集成)。
- **MAP v1 迁移**:提 Onboarding Migration Request(Jira id=28332271);apply MAP v1(必须 `scope: published`);`ManagedService` providerResource 改引用 `version: v1`;触发 tenant 迁移(annotation `migration/application-templates-ids`,完成后**必须删除**);CLD registry 从 SLIS 迁到 UMS。

## 配置 Embedded Tenants

- **私有**:`EmbeddedTenantsConfiguration` + `ManagedService.providerResources` **双声明**。见 [[嵌入式租户资源]]。
- **账户级共享**:需业务+技术资格审批(重开 provider folder 工单);选 Always/On-Demand 创建模式;建 `AccountTenantGroup` 验证;Consumer 侧建 BIP + `Integrations`(`mandatory: true`)。

## 相关

- [[Unified Customer Landscape (UCL)]]
- [[SPII 服务提供方集成接口]]
- [[Formations 编排组]]
- [[Embedded Tenants 嵌入式租户]]
