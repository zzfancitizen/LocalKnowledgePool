---
title: 系统资源 (TechnicalClient-Secret-RTD)
aliases:
  - System Resources
  - TechnicalClient
  - Secret
  - RTD
  - ResourceTypeDefinition
  - Alias
tags:
  - reference
  - sap/system-resources
---

# 系统资源 (TechnicalClient / Secret / RTD)

> API group:`system.resource.api.sap`。

| 资源 | 说明 | 关键字段 |
|------|------|---------|
| **`TechnicalClient` (v2)** | mTLS 认证/授权访问 URM API;创建后生成含 base64 `apiconfig.yaml` 的 `Secret` | 见下 |
| **`Secret`** | 存敏感信息 | `data`(base64) + `stringData`(明文,存储前 base64;键冲突时 stringData 覆盖 data) |
| **`Alias`** | 资源全路径别名,URL 中符号为波浪号 `~` | `metadata.path` 决定别名指向全路径 |
| **`ResourceTypeDefinition` (RTD)** | 定义新资源类型,URM 自动暴露 CRUD API | 见下 |

## TechnicalClient (v2)

两种模式:

- **Managed**:URM 管理证书签发/轮换/吊销,需 base64 CSR(`spec.certificateSigningRequest`,须匹配 `/info` 的 `csrSubjectPattern`),`spec.duration` 24h~720h(默认 720h)。
- **Self-Managed**(生产推荐):`spec.selfManaged: true`(不可变),自带 CA,需 `spec.subjectDN` + `spec.trustStore`(PEM,base64),支持 `additionalSubjectDNs`。

`spec.secretName` 必填(RFC1123,≤63,路径下唯一)。

> 常配合 [[其他工具与 SDK#Secret Provider|Secret Provider]] 把 apiconfig 挂到 controller pod。

## ResourceTypeDefinition (RTD)

- 定义新资源类型,URM 自动暴露 CRUD API。
- 在 **ResourceGroup** 声明 → 本地可用;在 **`ManagedService`** 声明 → **全局可用**(发布后提升到 root)。
- 同 RG 内实例化优先用本地 RTD。

> [!warning] Live 审批
> **Live 上线前需审批**(克隆 Jira `SAPBTPCFSSR-40`,SLA 5 工作日);Canary 仅告警。未批则 `ManagedService` 注册失败。RTD schema **不得含机密/个人数据**。Nested RTD 需自备 controller。

## 相关

- [[资源模型通用约定]]
- [[Unified Resource Manager (URM)]]
- [[ManagedService v2 参考]]
- [[uctl 命令行工具]]
