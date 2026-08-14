---
title: ManagedService v2 参考
aliases:
  - ManagedService v2
  - ManagedService Reference
tags:
  - reference
  - sap/usm
---

# ManagedService v2 参考

> API group:`services.resource.api.sap/v2`。概念背景见 [[Unified Service Manager 与 ManagedService]]。
> 服务提供方注册服务、暴露 RTD、配置授权与依赖的中心资源。

## 顶层字段

- **`spec.group`**:所有资源统一 API group(必填)。

## spec.authorization

- **`roles[*]`**:`name`、`allowedTypes[*]`(`type` + `actions` ∈ {`get`,`watch`,`update`,`patch`};留空=默认四动作)、`external`(由 leased operator 管理,USM 仅创建)。
- **`principals[*]`**:operate 服务的 technical client(`subject.type` ∈ {`User`,`Group`,`Service`} + `name` + `origin`)、`roles[]`、`receiveGrantedRoles`(默认 false,可接收其他 MS 授予的角色)、`additionalPermissions`(root 级,如 `upc.commercial.viewer`)。
- **Events 权限**:role 中加 `<Type>/events`。

## spec.resources[*](RTD,最多 12 个)

- `type`、`rtdRef`(name+path,nested RTD)、`validatingWebhooks`(目前仅 1 个)、`channels`、`externalChannels`、`trustedChannelDelegators`、`dependencies`(父类型创建时自动创建、共享生命周期)、`usedFor` ∈ {`channels`,`trigger`}、`triggerWith`、`embeddedTenants`(**已弃用**)。
- **Channels**:实例创建所需通道(默认类型 `Secret`;`writer:true` 给全 CRUD;`multipleAllowed`;`relatedVersions`)。
- **External Channels / Trusted Channel Delegators**:跨 app/service 交换技术细节,`delegatedTo`(`writer` 写权限 + `readers` 读权限)。

## spec.providerResources[*]

MS 创建前已存在的**实际 service instance**。
- 标 `receiveGrantedRoles` 的 principal 获对这些资源 get + `grantedRoles` 权限。
- `receivedRoles`(由 leased operator 管理,须 `external=true`;例 BTPBlueprint 填充对 app 租户 get 权限)。
- `associatedWith`(关联类型 + `relatedVersions` + CEL `condition`)。
- `updateCriteria`(**Phased Upgrade** 分阶段升级)。

## triggerWith

当另一 MS 把某类型声明为带 `associatedWith` 的 provider resource 时,自动创建 `triggerWith` 类型作为依赖(带 `owned-by`/`refer-to` 引用及 `services.resource.api.sap/leased-operator-configuration` label)。

## ProviderResourceSelector(分阶段升级选择器)

`byLabels` / `byCreationTime.createdAfter` / `selectAll`(OR 逻辑;技术 label `<group>.<type>/update-criteria: "true"`)。进度追踪 `status.providerResourcesRolloutStatus.providerResourceStatuses[*].{totalInstances, updateCriteriaTargetInstances, updateCriteriaHandledInstances}`。

## CEL condition

变量 `spec` / `path` / `labels`,自定义函数 `hasSubresource()` / `fromSubresource()`。

## 其他

- **强制协调**:注解 `services.resource.api.sap/force-reconcile: "true"`(保存后自动删除)。
- **status**:`type: Ready` 及每资源 `type: <ResourceType>Ready`。

## 相关

- [[Unified Service Manager 与 ManagedService]]
- [[系统资源 (TechnicalClient-Secret-RTD)]]
- [[商业化集成资源 (Eligibility 等)]]
- [[入门-快速向导创建 App]]
