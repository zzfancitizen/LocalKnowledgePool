---
title: 授权模型 (Role-Binding-PathBinding)
aliases:
  - Authorization
  - Role
  - Binding
  - PathBinding
  - RuleRestriction
  - 授权
tags:
  - security
  - sap/authorization
---

# 授权模型 (Role / Binding / PathBinding)

> **策略(policy)** 关联资源即定义访问控制。

## 两种 mode

- **`identity`**:附加到 **subject**(用户 或 service account/technical client)。
- **`hierarchy`**:附加到层级中的**路径**。

## 四类核心授权资源

| 资源 | mode | 作用 | apiVersion |
|------|------|------|-----------|
| **`Role`** | identity | 规则集合(actions + 资源) | `policies.resource.api.sap/v1`(hierarchy 版 `hierarchy.policies.resource.api.sap/v1`) |
| **`RuleRestriction`** | identity/hierarchy | **deny 策略**,按资源属性限制 | 同上 |
| **`Binding`** | — | 把 identity 策略授予 **subject(s)** | `policies-control.resource.api.sap/v1` |
| **`PathBinding`** | — | 把 hierarchy 策略(如 `Eligibility`)绑定到**路径** | `policies-control.resource.api.sap/v1` |

> 删除策略资源时,其所有对应 Binding 一并删除。

## 防提权规则(重要)

> [!warning] Privilege Escalation Prevention
> 1. 只有已拥有某 role **全部权限**才能创建/更新该 role。
> 2. 只有已拥有被引用 role **全部权限**才能创建/更新引用它的 binding。

## Role

- `spec.rules[*].parameters`:`actions`(`get`/`watch`/`list`/`update`/`patch`/`create`/`delete`/`*`;授 `*` 需自身已有 `*`)、`apiGroup`、`type`(可指定子资源,如 `Folder/status`)、`name`(默认 `*`)。
- `spec.rules[*].recursive`:默认 `true`。
- **子资源授权**:`status`/`labels`/`annotations`/`finalizers` 是 subresource,用 `type: Folder/status` 单独授权。
- **聚合角色**:`spec.aggregationRule.selectors[*].matchLabels` 匹配其他 role 的 label 合并其 `rules`。

## Binding 与派生授权 (Derived Authorizations)

- `spec.policyRef`(`name`/`path`/`type`/`custom`);`path` 须与 Binding 同级或上游。
- `spec.subjects[*]`:`name`(≤650;service 用 `<technical client 全路径>/<name>`)、`type`(`User`/`Group`/`Service`)。
- **`spec.pathAccess.enabled: true`** → 为 subject 授予从 Binding path 向上到 root 各层的**隐式 read**(便于层级遍历,如 Workspace 导航);**`recursive: true`** → 隐式 read 也向下游递归。默认均 `false`。

## Deny 与 RuleRestriction

- **`Deny`**(`hierarchy.policies.resource.api.sap/v1`):请求匹配即拒绝。
- **`RuleRestriction`**:`spec.rules[*].parameters.restrictions[*]` 属性级限制(1–10 项)。操作符:`equals`/`notEquals`/`in`/`notin`/`contains`/`greaterThan`/`lessThan`/`hasKey`/`notHasKey`/`containsObject`/`notContainsObject`。actions 限 `get`/`update`/`patch`/`delete`。

## ResourceTypeManagement

授予初始客户端管理其新类型的权限:对该类型 RTD、资源及子资源、`ValidatingWebhookConfiguration`、`AllowNested`+其 `PathBinding` 的 CRUD。策略须在 RTD 同层或更高层。

## Binding/Policy 状态

- `type: Ready` + `status: True` → 生效。
- `type: Broken` → 不生效。`reason: BindingMustBeBelowPolicy`(Binding 须在 policy 下游)→修正 `policyRef` 后自动移除。

## 相关

- [[系统交付角色]]
- [[入门-管理用户授权]](含完整 YAML 实例)
- [[账户层级资源]]
- [[商业化集成资源 (Eligibility 等)]]
