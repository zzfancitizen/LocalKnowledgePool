---
title: ORD API 与发现
aliases:
  - ORD
  - Open Resource Discovery
  - ORD API
tags:
  - concept/core
  - sap/ord
  - sap/ucl
---

# ORD API 与发现

> [!abstract] 核心
> **ORD (Open Resource Discovery)** 是标准化协议,让应用**自描述**其 **APIs、Events、Business Objects、Capabilities**(这些实体随后被当作带机器可读元数据的 resource)。它实现单一入口 **Service Provider Interface**,供中央 aggregator([[Unified Customer Landscape (UCL)|UCL]])爬取。ORD 不替代 OpenAPI 等,而是**发现**并将它们纳入更大上下文。

## 两种视角

| 视角 | 时机 | 说明 |
|------|------|------|
| **Static(design time)** | 设计时 | 产品完整资源参考清单 |
| **Dynamic(run time)** | 运行时 | 特定 tenant 上激活的子集 + 客户自定义扩展 |

## 合规

- 属于 **TG03.r3** 和 **Suite Qualities 2023**。
- 有 SAP API Metadata Validator。

## ORD 聚合(Aggregation)

- **自动**:initial(dynamic 已有租户每小时/新租户几乎立即;static 立即)。
- **Periodic**:每 **7 天**。
- **On-demand(异步)**:GraphQL mutation `scheduleOpenResourceDiscoveryAggregation`(端点 `.../director/graphql`,mTLS),返回 `operationId`;查状态用 `operation(id:...)`,status = `SCHEDULED/IN_PROGRESS/COMPLETED/FAILED`。

> [!warning] 常见错误
> - **runtime error**:连接/认证/HTTP/持久化。
> - **validation error**:deprecated 字段(如 `policyLevel`→`policyLevels`),可能 `ORD_AGGREGATION_PARTIAL`。

## 相关

- [[Unified Customer Landscape (UCL)]]
- [[How-To 集成你的应用#发起 ORD 聚合]]
- [[Customer Landscape 资源 (MAP 等)]]
