# Joule Work / Engagement Layer — Agent 开发者指南

> 本文整合了 SAP 内部两大面向 Agent 开发者的核心指南：
> - **System-Generated Spaces — Agent Developer Survival Guide**（生存指南，共 10 + 1 章）
> - **Agent-Generated Spaces — agent-dev-guidance**（capability / create-space-api / 生存指南 / user-vs-agent-generated）
>
> 目标读者：要把自己的 agent 接入 Joule Work Spaces（即 Engagement Layer，EL）的开发者。全文尽量保留 API 签名、schema、curl、YAML/JSON 代码片段与命令原文。

---

## 0. 关键联系人与入口（Contacts / POC）

| 角色 | 人员 |
|---|---|
| Onboarding | Priyanka Khaitan |
| PoC 协调、Office Hours（每天 1pm CET） | Verena Lommatzsch |
| Joule 侧 Agents 对接 | Himabindu Guttapalem |
| Joule Box / Provisioning / Trust | Prateek Bajaj |
| Cross Architecture | Christian Hengstler、Axel Schroeder |
| A2A 详细时序图 | Martin Steiner |

**核心工具/入口 URL：**

| 用途 | URL |
|---|---|
| Standalone webclient（测试 + 实时日志/payload） | `https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/webclient/standalone/da_kgs4pub_el_agents` |
| Content Validator（响应格式校验） | `https://pages.github.tools.sap/I053631/space-agent-content-validator/` |
| New EL Experience（端到端测试） | `https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/new/spaces/?botName=da_kgs4pub_el_agents` |
| 测试用 User IAS token | `https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/destinations/DYN_TEST_AGENT_1/test-token` |
| 参考 agent（geography PoC） | `https://github.tools.sap/fsm-codebasedagents/i821846-test-agent-1` |
| Capabilities collector | `https://github.tools.sap/ux-agents/agent-capabilties-collector` |
| Agent Gateway 文档 | `https://pages.github.tools.sap/AI/agent-gateway-documentation/` |
| AGW onboarding Jira | `https://jira.tools.sap/browse/CMP-15763` |
| ORD for AI Agents 规范 | `https://pages.github.tools.sap/CentralEngineering/open-resource-discovery-specification/spec-v1/concepts/ai-agents-and-protocols` |
| Feature Discovery 用户故事模板 | `https://jira.tools.sap/browse/EL-1192` |
| POC support channel | Teams：`System-Generated Spaces - POC Support` |

> 在 support channel 提问前，先按以下步骤自查：1）用 standalone webclient 调用 agent 看 payload/日志；2）把 payload 贴进 validator 排查；3）成功后再用 New EL Experience 测试 space 创建。仍失败才发帖，需附：所用 bot、space ID、user、prompt、期望 vs 实际行为、webclient 执行日志。

---

## 1. 概述：三种 Space 的区别

Joule Work 支持两大类 space：

- **Human Spaces（人工创建）**：用户在 Joule Work UI 中亲手创建，自己选内容、自己决定何时创建。永远是 user-triggered + user-generated，agent 完全不参与。
- **Agent Generated Spaces（agent 生成）**：由 agent 通过调用 Spaces API（带一个描述性的 utterance + 一组 refresh handles）以编程方式发起。Joule Work 接管后续：编排数据检索、生成布局、渲染 space。**Agent 只负责提供意图（intent）和数据（data），渲染由 Joule Work 负责。**

Agent Generated Spaces 又按「谁触发」分两种变体：

| 变体 | 谁触发 | 典型场景 |
|---|---|---|
| **User-triggered**（用户触发） | 用户在 Joule Work 发消息，agent 响应并创建 space | 用户提问，agent 把答案以结构化 space 呈现 |
| **System-triggered**（系统触发） | 无用户在场，由 schedule / event / 外部系统启动 agent | agent 后台跑完流程，主动为指定用户创建待审阅的 space |

> System-triggered 是最难的变体，也是「生存指南」的主要焦点，但两种变体的契约（contract）都适用。

### User-generated vs. Agent-generated（数据源谁来选）

| | User-generated | Agent-generated |
|---|---|---|
| Trigger | 用户在 Joule Work spaces UI 输入 prompt | Agent 调 Spaces API（经 Agent Gateway） |
| 谁选数据源 | Joule orchestrator 根据 prompt 选 scenario | Agent 直接提供 refresh handles |
| 每张卡持久化 | Refresh handle，scenario+function 由 Joule 选 | Refresh handle，scenario+function 由 agent 提供 |
| 响应模型 | 异步——card 经 websocket 推给前端 | 异步——space id 经 HTTP callback 送达 |
| 重开时 re-fetch | 重跑存储的 refresh handles | 重跑存储的 refresh handles |

两条路径产出的 space artifact 相同，重开、持久化、分享等下游行为一致；唯一区别是「谁决定 handle 里的 scenario 和 function」。Agent-generated 路径当前为 **experimental**。

- **User-generated 适合**开放式探索：用户不知道有哪些数据源/scenario，交给 Joule 判断。
- **Agent-generated 适合** agent 已有上下文（run id、ticket id、answer id）、想呈现一个特定的预定视图，让 Joule 重新发现 scenario 既浪费又不可靠。

**Agent-generated 异步流程（简）：**
1. Agent → Agent Gateway：发 `{ utterance, refresh_handles }`，并在 `x-callback-target` 头里给出自己拥有的回调 URL。
2. AGW → Agent connector → Spaces service：转发 utterance 与 refresh_handles。
3. Spaces service：按 utterance 创建 space，并对每个 refresh handle 调 agent connector 取数据。
4. Agent connector：返回各 handle 的数据。
5. Spaces service：为每个 handle 生成 card 并存为 refresh handle。
6. Spaces service → Agent（经 callback）：把 space id（或 error）送到 `x-callback-target`。

---

## 2. 核心概念（Know Your Terrain）

> 大多数集成失败不是代码写错，而是不清楚「哪一层负责什么」，出问题时就不知道是哪一层在骗你。

### 2.1 三种 space 对照

| | Human Spaces | User-Triggered Agent Spaces | System-Triggered Agent Spaces |
|---|---|---|---|
| 谁启动 | User | User | System（schedule / event） |
| 谁生成 space | User | Joule Work（用 agent 数据） | Joule Work（用 agent 数据） |
| agent 是否参与 | 否 | 是 | 是 |
| 创建时用户是否在场 | 是 | 是 | 否 |
| 可用 token | User token | User token | 仅 Service token（见 token 约束） |

### 2.2 组件链路图（Component Map）

每个请求都流经这条链，每层与下一层有严格契约。**一层出错通常不会在另一层报错——几乎都是静默失败。**

```
Your Agent
    │
    ▼
Agent Gateway (AGW)          ← routing, policy, HITL, A2A protocol
    │
    ▼
Joule / ATIL                 ← orchestration, scenario/function execution
    │                            (ATIL = Agent Task Invocation Layer：SAP 内部编排 API，
    │                             把 utterance 路由到 agent capability 并收集结果)
    │
    ▼
Joule Work Spaces            ← UI 渲染、数据刷新、用户通知
    │
    ▼
Your Joule Capability        ← 通过你的 function 检索数据；契约你自己拥有
    │
    ▼
Product Backend (SF, S4, …)
```

**各层职责：**

| 层 | 负责 | 不负责 |
|---|---|---|
| AGW | 路由、鉴权、策略、HITL | 你的 agent 返回什么 |
| Joule / ATIL | 编排、scenario 匹配、function 执行 | Spaces 如何渲染结果 |
| Spaces | UI 布局、数据刷新、通知 | 你的业务逻辑 |
| Your capability | 数据检索契约、结果形状 | 渲染决策 |

### 2.3 两个 surface，两套契约

Joule Work 有两个 surface，测试的东西不同、失败方式也不同。**在 Conversations 能跑的 agent，在 Spaces 里可能完全坏掉。**

| | Joule Work Conversations | Joule Work Spaces |
|---|---|---|
| Slot filling | 追加几轮问答后执行 | **无兜底，agent 根本不跑** |
| Disambiguation | 显示选择器后执行 | **无选择器，路由不可靠** |
| 响应格式错 | agent 回复用户可见 | **静默丢弃，什么都不渲染** |
| 适合测什么 | orchestrator 逻辑与 agent 执行 | 输出格式与布局 |

> **危险提示：如果你的 agent 只在 Conversations 能跑，就当它不能用。Spaces 才是暴露所有未修复问题的 surface。**

### 2.4 数据检索：本指南用 non-KG 路径

本指南所有 agent space 都走 **non-KG 路径**：数据从产品后端经你的 Joule Capability function 流出。Joule orchestrator 调你的 function，你的 function 调后端并返回结果。**你定义数据契约、拥有响应形状、控制 space 展示什么。**

另有 KG（Business Knowledge Graph）路径经共享 SAP 数据层，但需额外的 landscape 配置与 onboarding，目前没有活跃 POC 用它，本指南不覆盖。

### 2.5 Token 约束（关键）

| Token 类型 | 谁持有 | 能做什么 |
|---|---|---|
| User IAS token | 从 Joule 对话调用的 agent | 为该用户创建 space |
| Service / technical token | 无头系统 agent（schedule/batch） | **今天无法创建 space** |

这是 system-triggered agent spaces 当前的已知限制，见 ATIL workaround。

### 2.6 ORD 与 Agent Card：你的 agent 必须可被发现

AGW 经 **Open Resource Discovery (ORD)** 发现你的 agent。没有有效 ORD 元数据，AGW 无法路由，本指南其余内容都无意义。你的 agent 必须暴露：

- [ ] system-version 路径的 ORD 文档（静态，描述 API surface）
- [ ] system-instance 路径的 ORD 文档（动态，tenant-aware）
- [ ] `.well-known/agent.json` 的极简未鉴权 Agent Card
- [ ] `/agent-card` 的 JWT 保护完整 Agent Card

参考 agent（`i821846-test-agent-1`）有全部四项的可用示例。

### 2.7 Minimum Viable Checklist（最小可行清单）

- [ ] 一个可接受 IAS app2app token 的运行中 agent
- [ ] 一个 `joule/a2a/` 文件夹，含 `capability.sapdas.yaml`、`scenarios/` 子文件夹、`functions/` 子文件夹
- [ ] 一个指向你 agent、注册为 `system_alias` 的 BTP Destination
- [ ] 有权访问 standalone webclient
- [ ] agent 已在 capabilities collector 的 `da_kgs4pub_el_agents` 下注册

---

## 3. 如何构建 agent / capability（Build It Right the First Time）

> Capability 契约极不宽容：wrapper 路径写错、返回扁平 object 而非 array、缺 refresh handle——都不会报错，只会静默。

### 3.1 Capability 目录结构

你的 Joule capability 位于 repo 的 `joule/a2a/`：

```
joule/a2a/
├── capability.sapdas.yaml   ← 根文件：metadata + system aliases
├── scenarios/               ← 扁平文件夹，每个 scenario 一个 YAML
│   └── retrieve_entity.yaml
└── functions/               ← 每个 function 一个 YAML
    └── get_entity_http.yaml
```

> **警告：`scenarios/` 里不要嵌套子文件夹。嵌套会导致 Joule 静默失败。保持扁平。**

### 3.2 capability.sapdas.yaml

```yaml
schema_version: 3.28.0

metadata:
  display_name: My Agent
  namespace: com.sap.myteam.myagent
  name: my_agent
  version: 1.0.0
  description: >-
    One focused paragraph. The Joule orchestrator reads this to decide
    whether to route to your agent. Generic descriptions cause disambiguation failures.

system_aliases:
  MY_AGENT:
    destination: MY_AGENT_DEST   # BTP Destination name
```

**Capability 文件检查项：**
- [ ] `schema_version` 与当前支持版本一致
- [ ] `namespace` 全局唯一（反向域名约定）
- [ ] `description` 点名 agent 操作的 entity，不能泛泛而谈
- [ ] `system_aliases` 引用的所有 BTP Destination 均已配置且可达

> `system_aliases` 是最重要的部分：定义一或多个 alias 映射到 BTP 上配置的 destination；function 里通过单数字段 `system_alias` 引用某个 alias。

### 3.3 Scenarios

Scenario 把「带抽取 slots 的 utterance」映射到一次 function 调用。暴露给 Joule orchestrator（Spaces 与 Conversations 共用），orchestrator 根据 description 和 slots 选最匹配的 scenario。一个 scenario 一个文件，放在扁平的 `scenarios/`，文件名 `<name>.yaml`。

```yaml
description: >
  ROUTE TO THIS SCENARIO when the user asks to retrieve [entity] by ID.
  Handles phrases like "show me", "get", "retrieve" for [specific entity name].

slots:
  - name: entity_id
    description: The ID of the entity to retrieve

target:
  type: function
  name: get_entity_http

response_context:
  - description: Result from My Agent
    value: $target_result.agent_result
```

**Scenario 检查项：**
- [ ] `description` 含 entity 名词，不只是泛动词
- [ ] 每个 `optional: false` 的 slot 都能从单句 utterance 现实地抽取
- [ ] `response_context.value` 为 `$target_result.agent_result`（不是 `$target_result` 或 `$target_result.data`）
- [ ] scenario 文件在扁平 `scenarios/` 里，无子文件夹

> 注意：本节（生存指南）示例用 `$target_result.agent_result`；而 agent-dev-guidance 的 capability.md 与旧版生存指南示例用 `$target_result`（见第 5、7 章的差异说明）。以你所用 orchestrator/schema 版本为准，务必用 Content Validator 校验。

### 3.4 Functions

Function 声明实际执行步骤，分 `parameters` / `action_groups` / `result` 三段。文件名须与 scenario 里 `target.name` 一致。

**REST 调用（api-request）——后端暴露 REST API 时用：**

```yaml
parameters:
  - name: entity_id
    optional: false

action_groups:
  - actions:
      - type: set-variables
        scripting_type: handlebars
        variables:
          - name: api_path
            value: "/entities/{{entity_id}}"

      - type: api-request
        method: GET
        path: <? api_path ?>
        timeout: 10
        system_alias: MY_AGENT
        headers:
          Accept: application/json
        result_variable: agent_response

      - type: set-variables
        variables:
          - name: refresh_handle
            value:
              jouleFunction: get_entity_http
              capabilityInfo:
                capability:
                  name: my_agent
                  namespace: com.sap.myteam.myagent
                versionId: <? $transient.digital_assistant_version_id ?>
              toolInput:
                entity_id: <? entity_id ?>
          - name: spaces_response
            value:
              status_code: 200
              raw_data:
                value:
                  - <? agent_response.body ?>   # ← 永远是数组
              refresh_handle: <? refresh_handle ?>

result:
  agent_result: <? spaces_response ?>
```

**A2A 调用（agent-request）——经 A2A 协议调另一个 agent 时用：**

```yaml
parameters:
  - name: agent_context_id
    optional: true

action_groups:
  - actions:
      - type: agent-request
        agent_type: remote
        system_alias: MY_AGENT
        result_variable: _agent_response
```

在 Joule 中，远程 agent 经 A2A（Agent-to-Agent）协议调用：配一个指向 agent endpoint 的 BTP Destination → 注册为 `system_alias` → 在 dialog function 里用 `type: agent-request` + `agent_type: remote` 调用。Joule 自动构造 A2A `message/send` JSON-RPC payload，并把原始响应交回给你在 function 里处理。

**Function 检查项：**
- [ ] `system_alias` 与 `capability.sapdas.yaml` 里声明的 key 一致
- [ ] 每个产出你会用到的 action 都设了 `result_variable`
- [ ] 构造并在 result 中包含 `refresh_handle`
- [ ] 最终结果按契约包装（见 3.5）

### 3.5 Result 契约（三/四条规则，每次都要满足）

**Rule 1 — Wrapper path：** Spaces composer **只读** `data.raw_data.value`，其他路径静默丢弃。

```yaml
# CORRECT — function result 携带 agent_result；spaces_response 内含 raw_data.value
result:
  agent_result: <? spaces_response ?>

# WRONG — 裸路径，composer 找不到 raw_data.value
result: <? spaces_response ?>
```

**Rule 2 — 永远是数组：** `value` 必须是 list，哪怕只有一条记录。裸 object 会让 OData renderer 失败。

```yaml
# CORRECT
value:
  - <? agent_response.body ?>

# WRONG — 裸 object，渲染失败
value: <? agent_response.body ?>
```

**Rule 3 — 只返回数据，禁止任何 UI artefact：** 响应里出现任何 UI 类型会**彻底阻断路由到 Spaces**。包括：Card（含 Integration Card）、Button、Quick Reply、Carousel、List、Media、Illustrated Message、Likert Scale 等。返回结构化记录即可，渲染由 Spaces 决定。

**Rule 4 — response_context 必须指向 `.agent_result`：**

```yaml
# CORRECT
response_context:
  - value: $target_result.agent_result

# WRONG
response_context:
  - value: $target_result              # 返回整个 envelope，不是数据
  - value: $target_result.data         # 不存在 .data wrapper
```

### 3.6 渲染不是你的活（Rendering Is Not Your Job）

你的 agent 返回数据。**Joule Compositional Design System** 与 **Spaces rendering engine** 决定屏幕上长什么样——你不控制字体、布局、卡片形状、列顺序、视觉层级。这是刻意设计：Spaces 用统一设计语言保证所有 agent 生成 surface 的一致性。

返回干净的结构化 object，不要预格式化字符串：

```json
// CORRECT — 干净结构化记录；Spaces 决定布局
{
  "invoiceId": "INV-20240312-001",
  "vendor": "Acme Corp",
  "amount": 12500.00,
  "currency": "EUR",
  "status": "PENDING_APPROVAL",
  "dueDate": "2024-04-01"
}

// WRONG — 为特定视觉预格式化；Spaces 无法使用
{
  "title": "Invoice INV-20240312-001",
  "subtitle": "Acme Corp | EUR 12,500.00",
  "badge": "Pending",
  "footer": "Due 1 Apr 2024"
}
```

> **UI hints 尚在 roadmap，当前不可用。** 未来 Spaces 会支持 agent 通过结构化元数据影响特定字段渲染（如标记 status badge、货币、优先级），但**现在别加**，任何契约外的额外元数据要么被静默忽略，要么让 Content Validator 校验失败。

### 3.7 Refresh Handle（刷新句柄）

Spaces **不持久化业务数据**。用户重开 space 时，Joule 调你的 refresh handle 重新加载。缺失/错误的 refresh handle 会导致第二次访问时 space 静默损坏。

```yaml
- name: refresh_handle
  value:
    jouleFunction: get_entity_http           # 刷新时调用的 function
    capabilityInfo:
      capability:
        name: my_agent
        namespace: com.sap.myteam.myagent
      versionId: <? $transient.digital_assistant_version_id ?>
    toolInput:
      entity_id: <? entity_id ?>             # 重跑 function 所需的全部输入
```

**Refresh handle 检查项：**
- [ ] `jouleFunction` 指向正确 function
- [ ] `capabilityInfo.capability.name` 与 `namespace` 与 `capability.sapdas.yaml` 完全一致
- [ ] `toolInput` 含重现结果所需的每个参数
- [ ] `versionId` 用 `$transient.digital_assistant_version_id`

### 3.8 跨轮次携带上下文

```yaml
# scenario 中：
target:
  parameters:
    - name: agent_context_id
      value: $capability_context.agent_context_id

capability_context:
  - name: agent_context_id
    value: $target_result.agent_context_id
```

### 3.9 Build Checklist

- [ ] `capability.sapdas.yaml` 有效：唯一 namespace、具体 description、所有 destination 就绪
- [ ] `scenarios/` 扁平无子文件夹
- [ ] 每个 scenario 有含 entity 名词的具体 description，且必需 slot 最少
- [ ] 每个 scenario 的 `response_context.value: $target_result.agent_result`
- [ ] 每个 function 用正确 `system_alias` 且结果为数组包装
- [ ] 每个 function 有正确的 refresh handle
- [ ] 结果形状用 `data.raw_data.value` wrapper（数组），无任何 UI artefact

---

## 4. Create Space API（Space Creation API — 接口细节）

> Agent Gateway 将提供一个 API 以编程方式与 space 通信。Tracking ticket：`https://jira.tools.sap/browse/AIIL-2746`。

### 4.1 状态

该功能为 **experimental**，由 feature flag 门控：
- 目前仅对 landscape `eu12.sapdas-dev.cloud.sap` 下的 tenant `engagement-layer` 与 `sapdasintegdev` 启用。
- 该 API 经旧 codeline 通过 **Joule ATIL** 触达，直接指向其 URL、以 messages 方式调用（见 `https://pages.github.tools.sap/AI/agent-gateway-documentation/api/joule-scenario`）。

### 4.2 Quickstart（最小 curl）

在 `sapdasintegdev` landscape 为 assistant `da_kgs4pub_el_agents` 创建 space（替换占位符）：

```bash
curl -X POST \
  "https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/api/agent/v1/capabilities/com.sap.el.spaces/spaces_capability/scenarios/agent_ask_spaces/v1/message:send?assistant=da_kgs4pub_el_agents" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: en-US" \
  -H "x-callback-target: https://your-agent.example.com/a2a" \
  -H "Authorization: Bearer <USER_IAS_TOKEN>" \
  -d @body.json
```

Space id 经 callback 异步送达（见 4.6）。

### 4.3 URL（由四部分组成）

```
https://sapdasintegdev.eu12.sapdas-dev.cloud.sap   ← tenant + landscape
/api/agent                                          ← ATIL path
/v1/capabilities/com.sap.el.spaces/spaces_capability/scenarios/agent_ask_spaces/v1/message:send   ← Joule function path
?assistant=da_kgs4pub_el_agents                     ← Joule assistant
```

Tenant base URL 示例：`https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/api/agent/`。

### 4.4 Headers

| Header | 必填 | 说明 |
|---|---|---|
| `Content-Type` | 是 | `application/json` |
| `Accept-Language` | 是 | 如 `en-US` |
| `x-callback-target` | 是 | 你 agent 里监听 A2A callback 的 URL，space id（或 error）送到这里 |
| `Authorization` | 是 | Bearer token——必须是 **user-specific IAS token**，不能是 service token |

任何缺失的必填 header 都会导致请求失败。测试用 user IAS token 获取地址：`https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/destinations/DYN_TEST_AGENT_1/test-token`。

### 4.5 Body（A2A message）

Body 是一个 A2A message。**ATIL 只处理第一个 part**，其余 parts 被忽略。第一个 part 必须是 `kind: "data"`，其 `data` 对象含：

- **`utterance`** *(string)* — 描述要创建什么样的 space 的 prompt。
- **`refresh_handles`** *(`map<string, RefreshHandle>`)* — 一或多个 refresh handle，space 用它们取数据。

**`RefreshHandle` 结构：**

| Field | Type | 说明 |
|---|---|---|
| `jouleFunction` | string | 刷新时调用的 Joule function 名 |
| `capabilityInfo.capability.name` | string | 在 agent gateway 注册的 capability 名 |
| `capabilityInfo.capability.namespace` | string | Capability namespace |
| `toolInput` | object | 传给 Joule function 的输入值，key 取决于 function |

**Body 示例**（`{{answerId}}` 替换为 answer id，`{{$guid}}` 替换为生成的 UUID——`{{$guid}}` 是 Bruno 语法，非 Bruno 调用时替换成真实 UUID）：

```json
{
  "message": {
    "role": "agent",
    "parts": [
      {
        "kind": "data",
        "data": {
          "utterance": "Create a space and show the answer of the SAP geography question with ID {{answerId}}",
          "refresh_handles": {
            "geo_answer": {
              "jouleFunction": "get_answer_http",
              "capabilityInfo": {
                "capability": {
                  "name": "i821846_test_agent_1",
                  "namespace": "com.sap.fsm.codebasedagents.i821846.test.agent.1"
                }
              },
              "toolInput": {
                "question_id": "{{answerId}}"
              }
            }
          }
        }
      }
    ],
    "messageId": "{{$guid}}",
    "kind": "message"
  }
}
```

### 4.6 同步响应与 Callback

- **Synchronous response：** ATIL 立即返回成功或错误消息（仅确认已接收）。
- **Callback：** 必须通过 `x-callback-target` 提供 callback URL，否则调用失败。Callback 是**唯一**能拿到 space id 的机制（后续更新已有 space 时可能需要）。若不需要 space id，可忽略该消息，但**建议记录以便调试**。

### 4.7 试验建议

正式接入 agent 逻辑前，建议先用 HTTP 客户端（`curl` 或 [Bruno](https://www.usebruno.com)）测试。可用的 Bruno 示例：`https://github.tools.sap/fsm-codebasedagents/i821846-test-agent-1/blob/main/test/agw/agw/agent-create-space.bru`。

---

## 5. Joule Capability 定义（agent-dev-guidance / capability.md）

> 以「SAP Geography Research Agent」为例：该 agent 被 Joule Work 之外的「系统」以一个问题触发，先只返回研究任务的 UUID 并开始研究，完成后自动在 Joule Work 创建一个可视化研究结果的 space。

### 5.1 Capability 根文件

若用 AppFoundation agent template bootstrap 项目，`joule/a2a/capability.sapdas.yaml` 会自动生成。最重要的是 `system_aliases`（映射到 BTP destination，function 里用单数 `system_alias` 引用）。

```yaml
schema_version: 3.27.0

metadata:
  display_name: SAP Geography Research Agent
  namespace: com.sap.fsm.codebasedagents.geo.agent
  name: sap_geo_agent
  version: 1.0.0
  description: >-
    A geography Q&A agent built with LangChain and Application Foundation for SAP Joule Work.
    It answers geography questions, stores each answer with a unique ID and creates a space, and can retrieve answers by ID.
    Users can also provide feedback on answers (e.g. confirming correctness), which is stored alongside the original question and answer.

system_aliases:
  GEO_AGENT:
    destination: GEO_AGENT_DEST
```

### 5.2 Scenario 示例（按 ID 检索答案）

```yaml
description: >
  ROUTE TO THIS SCENARIO when the user asks for an answer by ID for an SAP geography questions.
  This agent retrieves a previously stored answer when given a specific ID.

# orchestrator 从 utterance 抽取 ID 并映射到 function 参数 question_id
slots:
  - name: question_id
    description: The ID of the question to retrieve the answer for

target:
  type: function
  name: get_answer_http

# function 结果到 scenario 响应的映射
response_context:
  - description: Answer to the question identified by the question id.
    value: $target_result
```

> **Warning：不要在 `scenarios` 里建嵌套文件夹，会在 Joule 里出问题。**

### 5.3 Function：A2A 通信示例

```yaml
parameters:
  - name: agent_context_id
    optional: true
  - name: question_id
    optional: false

action_groups:
  - actions:
    # Call the SAP Geography agent using A2A
    - type: agent-request
      agent_type: remote
      body: >
          {
            "questionId": "<? question_id ?>",
            "contextId": "<? agent_context_id ?>"
          }
      system_alias: TEST_AGENT_1
      result_variable: agent_response
```

> **IMPORTANT：** 要让使用 agent request 的 Joule function 也支持数据刷新（refresh），scenario 需额外加一个「携带完整 input prompt」的参数。参考 commit：`https://github.tools.sap/fin-trm-dunning-insights-agent/dunning-insights-agent/commit/f5ab3843f9cea58ea9651df05a214db3b81d6600`。

### 5.4 Function：API 调用示例（GET）

```yaml
parameters:
  - name: question_id
    optional: false

action_groups:
  - actions:
      # Build the API path dynamically using handlebars templating
      - type: set-variables
        scripting_type: handlebars
        variables:
          - name: api_path
            value: "/answer/{{question_id}}"

      # Call the backend API using the system alias defined in the capability file
      - type: api-request
        method: GET
        path: <? api_path ?>
        timeout: 10
        system_alias: TEST_AGENT_1
        headers:
            Accept: application/json
        result_variable: agent_response
```

### 5.5 Result：数据结构 + Refresh Handle 完整示例

Spaces 要求所有 Joule capability 返回**统一（harmonized）数据结构**：一个 status code（http code）+ 一个嵌套的 `raw_data.value`（数据对象数组）。**即使只有一个对象也必须返回数组。**

Refresh handle：Spaces 不持久化业务数据，只存 UI 结构和 UI→业务数据的映射。用户重开 space 时按 refresh handle 重新加载。handle 需描述 Joule function 及重新取数所需输入参数（通常是同一个 function 同样参数，但也可指向任意其他 function）。

```yaml
parameters:
  - name: question_id
    optional: false

action_groups:
  - actions:
      # ... 前置：API 或 A2A 调用已创建变量 agent_response
      - type: set-variables
        variables:
          # refresh handles 用于用户打开已创建 space 时再次取数
          - name: refresh_handle
            value:
              jouleFunction: get_answer
              capabilityInfo:
                capability:
                  name: sap_geo_agent
                  namespace: com.sap.fsm.codebasedagents.geo.agent
                versionId: <? $transient.digital_assistant_version_id ?>
              toolInput:
                question_id: <? question_id ?>
          # 创建 spaces 期望的数据结构
          - name: spaces_response
            value:
              status_code: 200
              raw_data:
                value:
                  - <? agent_response.body ?>
              refresh_handle: <? refresh_handle ?>
result:
  agent_result: <? spaces_response ?>
```

用 [Content Validator](https://pages.github.tools.sap/I053631/space-agent-content-validator/) 校验响应格式是否正确。

---

## 6. Agent Capability 与调用 surface 检测（Detecting the Calling Surface）

> 同一个 capability 可能被 Conversation 和 Space 调用，两者响应契约不兼容。**Conversations 正在迁移到 V10 orchestrator，会引入更多不兼容**，不按 surface 分支的 agent 风险更高。

### 6.1 信号（唯一判定条件）

```yaml
$transient.app_context.has('spaceId')
```

- **`true`** — 来自 Work Space。应用 Spaces 契约：`data.raw_data.value` 包成数组、无 UI artefact、无 follow-up 轮次。
- **`false` / key 不存在** — 来自 Work Conversation 或其他非 Space surface，可用富响应和 follow-up。

### 6.2 为什么重要

| | Work Conversation | Work Space |
|---|---|---|
| UI artefact | 可以（Card、Button 等） | 彻底阻断路由 |
| Follow-up 轮次 | 支持 | 无处落地，run 失败 |
| 响应形状 | 灵活 | 必须 `data.raw_data.value` |
| 静默失败 | 否——用户看到原始回复 | 是——错误形状被丢弃 |

### 6.3 把 surface 信号传给下游 agent

当 capability 调下游 agent 时，在 metadata body 里传 `isSpaceRequest`，让 agent 自己应用同样逻辑，无需直接看 `$transient`：

```yaml
actions:
  - type: agent-request
    agent_type: remote
    system_alias: your_agent_alias
    result_variable: _agent_response
    body:
      contextId: <? agent_context_id ?>
      metadata:
        userEmail: "<? $initial_context.user_email != null ? $initial_context.user_email : $transient.user.email ?>"
        userUuid: "<? $initial_context.user_id != null ? $initial_context.user_id : $transient.user.uuid ?>"
        clientInfoTimeZone: "<? $transient.client.timezone != null ? $transient.client.timezone : null ?>"
        isSpaceRequest: "<? $transient.app_context.has('spaceId') ?>"
```

`isSpaceRequest` 运行时求值为字符串 `"true"` 或 `"false"`。下游 agent 从 `metadata` 读取并决定响应形状。

**Joule / Spaces 发送的字段**（每个 A2A 请求 body 都含 `metadata` 对象，在 `agent_executor.py` 里读）：

```python
metadata = (context.message.metadata or {}) if context.message else {}
```

| Field | Value | 说明 |
|---|---|---|
| `contextId` | `<uuid>` | A2A context / conversation ID |
| `isSpaceRequest` | `"true"` / `"false"` | 请求是否来自 Joule Space |

**Session Lifetime：** `isSpaceRequest` 决定 `contextId` 存活多久：

```python
is_space_request = metadata.get("isSpaceRequest") == "true"
```

- **`"true"`** — `contextId` 绑定到持久 Space session。若你按 `context_id` 存对话历史，跨轮次自动保留。
- **`"false"` 或缺失** — 视为无状态/短生命 session，别指望历史延续。

用 `userEmail` / `userUuid` 做个性化、审计日志或数据访问范围控制，但**不要在未校验 Joule 调用你 A2A endpoint 所用 token 的情况下信任这些值**。

### 6.4 如何分支

用 action group 上的 `condition:` 路由到正确响应形状：

```yaml
action_groups:
  - condition: $transient.app_context.has('spaceId')
    actions:
      # Spaces path — data only, correctly wrapped
      - type: set-variables
        variables:
          - name: final_result
            value:
              data:
                raw_data:
                  value:
                    - <? agent_response.body ?>

  - condition: "!$transient.app_context.has('spaceId')"
    actions:
      # Conversation path — rich UI is fine here
      - type: message
        message:
          type: card
          # ... your card definition
```

> `has('spaceId')` 告诉你请求**来自哪里**，不是用户**问了什么**。别用它路由不同用户意图（那是 disambiguation 问题，靠 capability description/trigger 解决）。

### 6.5 常见失败模式

| 症状 | 可能原因 | 修复 |
|---|---|---|
| metadata 里没有 `isSpaceRequest` | 旧版 Joule 或非 Space 入口 | 用 `.get("isSpaceRequest", "false")` 兜底 |
| 轮次间历史丢失 | `context_id` 没用作 session key | 用 `context_id` 作为 history dict 的 key，Space session 会自动跨轮保留 |

---

## 7. 三大隐形杀手（The Three Silent Killers）

> 三种 orchestrator 行为会在 Spaces 里搞坏你的 agent，**都不报错**。两个在 agent 运行前触发，一个在运行后。
> Slot filling 与 disambiguation **只影响 user-triggered agent spaces**；system-triggered 的触发绕过 orchestrator 的输入收集，不会遇到这两个。Response format 杀手对两者都适用。

| | Slot Filling | Disambiguation | Response Format |
|---|---|---|---|
| 触发时机 | agent 运行前 | agent 运行前 | agent 运行后 |
| Conversations 里 | 追加问答后执行 | 显示选择器后执行 | agent 回复可见 |
| Spaces 里 | **无兜底，agent 不跑** | **无选择器，路由不可靠** | **静默丢弃，什么都不渲染** |
| 可见失败？ | 是 | 是 | **否** |
| 修复位置 | capability inputs/defaults | capability description/triggers | `response_context`、结果包装、无 UI artefact |

### 7.1 Killer #1：Slot Filling

**是什么：** orchestrator 在调你 agent 前向用户索要缺失的必需输入。**触发：** 某 slot 声明 `optional: false` 且传入 utterance 未满足它。**为什么在 Spaces 致命：** 追问无处落地，agent 永不运行，无错误。

**如何消除：**
- [ ] **最小化必需 slot。** 有合理服务端默认值的都标 optional。
- [ ] **服务端填默认值。** 今天日期、当前用户、主组织单元等在后端解析，别问。
- [ ] **从上下文推断。** 已鉴权用户和后端配置本身携带大量信息。
- [ ] **写完整示例 prompt。** demo/测试 utterance 必须在单句里含全部必需 slot。
- [ ] **拆分 capability。** 先发零参数变体，证明后再加带参变体。
- [ ] **零上下文测试。** 在 standalone webclient 用你预期的最小 utterance 调用，若追问就是有 slot-filling 问题。

> 经验法则：若 orchestrator 不问用户要值就无法启动你的 agent，你就有 slot-filling 问题。
> System-triggered 里触发（schedule/event/直接 ATIL 调用）显式传全部输入，无 slot filling。若你的 system-triggered agent 不运行，查 trigger payload 和 ATIL 调用，别查 slot 定义。先在 user-triggered 里把 slot filling 搞对，再放心移植到 system-triggered。

### 7.2 Killer #2：Disambiguation

**是什么：** 多个 capability 匹配同一 utterance，orchestrator 让用户选。**两种：** agent-level（多个 agent 相似，问「你指哪个 agent？」）、capability-level（agent 内多个 scenario 重叠，orchestrator 无法决定）。**为什么在 Spaces 致命：** 无选择器兜底，可能选错或选不出。

**如何消除：**
- [ ] **点名 entity，而非只有动作。** 用 `create_purchase_order` 而非 `create_order`，名词承担路由工作。
- [ ] **一个 capability 一个意图一个 entity。** 抵制万能 capability。
- [ ] **发布前审计。** 在 standalone webclient 跑，若见 disambiguation picker，说明某个 description 太宽。
- [ ] **跨团队协调命名。** `orders`、`items`、`requests` 等通用名会跨域碰撞。
- [ ] **先消除内部重叠。** 自己两个 scenario 能匹配同一 utterance 时，orchestrator 会不可预测地选。

> 经验法则：若 orchestrator 不问用户就无法决定调哪个 agent/capability，你就有 disambiguation 问题。同样先在 user-triggered 里修好。

### 7.3 Killer #3：Response Format（最危险）

**是什么：** 形状错误的响应被 Spaces composer 静默丢弃；UI 包装的响应根本不路由到 Spaces。**最危险**因为 agent 成功运行、function 返回结果、space 里什么都没有、到处无错误。

**第一道防线：Content Validator。** 在 Spaces 测试前，把响应 payload 贴进 [Content Validator](https://pages.github.tools.sap/I053631/space-agent-content-validator/)。它检查：wrapper 路径（`data.raw_data.value` 存在且正确嵌套）、数组要求、UI artefact 检测、`response_context` 路径正确性。

> **危险：每次测试前都先用 Content Validator。** 它几秒内抓出格式问题；在真实 space 里查同样问题要几小时。

**四条规则（每次都要）：**

**Rule 1 — Wrapper path：** composer 只读 `data.raw_data.value`。

```yaml
# CORRECT
result:
  data:
    raw_data:
      value:
        - <? agent_response.body ?>

# WRONG — 静默丢弃
result:
  agent_result: <? spaces_response ?>
```

**Rule 2 — 永远数组：**

```yaml
# CORRECT
value:
  - <? agent_response.body ?>
# WRONG — 裸 object
value: <? agent_response.body ?>
```

**Rule 3 — 无 UI artefact：** 任何 UI 类型都会彻底阻断路由——Card（含 Integration Card）、Button、Quick Reply、Carousel、List、Media、Illustrated Message、Likert Scale 等。

**Rule 4 — response_context 指向 `.agent_result`：**

```yaml
# CORRECT
response_context:
  - value: $target_result.agent_result
# WRONG
response_context:
  - value: $target_result       # 整个 envelope
  - value: $target_result.data  # 无 .data wrapper
```

> 经验法则：若 agent 运行但 space 里什么都没渲染，就是 response-format 问题（错 wrapper 路径 / 非数组 value / UI artefact 阻断路由）。也检查 agent 是否在已激活的 DA 上。

> **注意 wrapper 路径的两种写法差异：** 生存指南 03a/03 章的最终 result 用 `data.raw_data.value`（配 `response_context.value: $target_result.agent_result`）；02 章 function 内部先构造 `spaces_response`（内含 `raw_data.value`）再 `result: agent_result: <? spaces_response ?>`。而 07 章 Ship Checklist 和旧版生存指南写 `data.odata_result.value` + `response_context.value: $target_result`。这些反映了不同 schema/orchestrator 版本。**务必以 Content Validator 的校验结果为准。**

---

## 8. Onboarding：通过关卡（Get Through the Gate）

> 连接 agent 到 AGW 不是一步，而是一串前置条件、信任配置和平台注册。每个缺失步骤都产生同一症状：agent 不被调用且你不知道为什么。**按顺序做，每项打勾前不要往下。**

### Stage 1：前置条件

- [ ] Agent 接受 **IAS app2app tokens**（不只是 API key 或 basic auth）
- [ ] Agent 已 onboard 到 **Unified Services (UMS)** 做 SAP 托管 provisioning
- [ ] Agent 已 onboard 到 **UCL** 以启用 SAP 托管集成
- [ ] Agent 暴露 **ORD 元数据**：system-version 文档、system-instance 文档、两个 Agent Card endpoint
- [ ] Agent 为 `sap.agw` namespace 实现 **SPII**（见 Stage 3）
- [ ] Agent 的 **Test-Blueprint** 可用

### Stage 2：加入 AGW Formation Type（手动，尽早提起）

- [ ] 重开 Jira ticket **[CMP-15763](https://jira.tools.sap/browse/CMP-15763)**
- [ ] 用此模板评论：

```
Please apply the following changes for onboarding our agent to the Agent Gateway formation type:

Application type: <your-application-type>

Required changes:
- Add the application type listed above as Initiator to the formation type
- Enable SAP Cloud Identity Services (SCI) as Facilitator on both sides
```

- [ ] 等确认后再进 Stage 3

### Stage 3：实现 SPII（Wave 0 → Wave 2）

为 `sap.agw` namespace 实现双向 IAS app2app trust wave 契约。

**Wave 0：向 UCL 报告 CONFIG_PENDING**（替换所有 `<placeholder>`）：

```json
{
  "state": "CONFIG_PENDING",
  "configuration": {
    "credentials": {
      "outboundCommunication": {
        "oauth2ResourceIndicator": {
          "url": "<agent-application-url>",
          "tokenServiceUrl": "<receiverTenant.configuration.facilitatorUrl>",
          "clientId": "<agent-ias-client-id>",
          "protectedResources": ["<agent-provided-api>"]
        }
      },
      "inboundCommunication": {
        "oauth2ResourceIndicator": {
          "clientId": "<agent-ias-client-id>",
          "protectedResources": ["sap-internal"]
        }
      }
    },
    "additionalAttributes": {
      "sciApiDependencyProperties": [
        {
          "name": "apiDependencyName",
          "value": "agent-gateway",
          "correlationIds": ["sap-internal"]
        }
      ]
    }
  }
}
```

> **警告：** `outboundCommunication` 里的 `protectedResources` 必须恰好**一个**值，且不能是 `principal-propagation`。

**Wave 2：Wave 0 确认后，向 UCL 报告 READY：**

```json
{ "state": "READY" }
```

### Stage 4：更新 Testing Blueprint

- [ ] 在 `spec.integrations.formationTypes` 下加 AGW 集成 formation type：

```yaml
integrations:
  formationTypes:
    - Integration with Agent Gateway
```

- [ ] 在 `spec.tenants` 下加 **AgentGatewayTenant** 条目（完整模板见 AGW onboarding guide）
- [ ] 按 Product Blueprint Onboarding Steps 在 canary 上跑 **Level-1 test**

### Stage 5：注册你的 Capability

Capability 经 **[agent-capabilities-collector](https://github.tools.sap/ux-agents/agent-capabilties-collector)** 部署到共享 Digital Assistant。

- [ ] fork/clone collector，在 `capabilities/config.json` 加条目：

```json
{
  "name": "my-agent",
  "git": "https://github.tools.sap/my-team/my-agent-repo",
  "branch": "main",
  "path": "joule/a2a"
}
```

| Field | 必填 | 默认 | 说明 |
|---|---|---|---|
| `name` | 是 | | `capabilities/` 下的文件夹名，须唯一 |
| `git` | 是 | | 源 repo URL |
| `branch` | 否 | `main` | 要 clone 的分支 |
| `path` | 否 | `joule/a2a` | 含 capability 文件的子文件夹 |
| `bot_name` | 否 | 根 `bot_name` | 覆盖该 capability 的 DA |

**部署命令：**
- [ ] `npm run update` — 拉取 capability 文件并打版本（`X.Y.YYYYMMDDHHMMSS`）
- [ ] `npm run validate` — 校验所有 function 的 `result.data.odata_result.value` 为数组
- [ ] `npm run deploy -- --add` — 首次在 DA 注册 capability
- [ ] `npm run deploy` — 后续更新只推变更的 capability

### 用哪个 DA（Which DA）

Agent 必须部署在**已激活的 Direct Assistant (DA)** 下，Spaces 才能调用。用错 DA 与响应被静默丢弃无法区分。

| DA | 状态 |
|---|---|
| `da_kgs4pub_el_agents` | **Should work.** 最成熟，首选。 |
| `cx_sales_cloud_deal_qualification_assistant` | Should work. |
| `da_agents_s4priv_std` | Should work. |
| `da_agents_s4pub_std` | Should work. |
| `da_kgs4priv_2023_el_agents` | Should work. |

「Should work」表示激活已完成但集成未被自动化验证覆盖。若遇路由问题，先确认 DA 在激活列表上并查 POC support channel。（旧版生存指南记录：截至 2026-05-07，仅 `da_kgs4pub_el_agents` 已 active，其余四个 activation in progress。）

### Onboarding 完成清单

- [ ] Stage 1 前置全部满足
- [ ] CMP-15763 提交且 formation type 确认
- [ ] SPII Wave 0（CONFIG_PENDING）提交并确认
- [ ] SPII Wave 2（READY）提交并确认
- [ ] Blueprint 更新（AGW formation type + AgentGatewayTenant）
- [ ] canary 上 Level-1 test 通过
- [ ] Capability 在 collector 里注册到 active DA
- [ ] `npm run validate` 无错误

---

## 9. 测试（Prove It Works）

> 唯一算数的证明：在 New EL Experience 里 space 正确渲染，且重开时数据能重新加载。**按顺序做，别跳。** 越早的步骤越快抓到更多失败。

### Step 1：Standalone Webclient

**URL：** `https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/webclient/standalone/da_kgs4pub_el_agents`

实时显示完整执行 payload 和日志。用来诊断 agent 是否被调用、是否发生 slot filling / disambiguation、agent 实际返回了什么。

- [ ] agent 被调用且无追问（无 slot filling）
- [ ] 触发正确的 capability 和 function（无 disambiguation）
- [ ] agent 返回响应在日志可见
- [ ] 执行日志无错误

### Step 2：Content Validator

**URL：** `https://pages.github.tools.sap/I053631/space-agent-content-validator/`

从 webclient 日志复制响应 payload 贴进去。检查 wrapper 路径、数组结构、无 UI artefact。

- [ ] validator 报告无错误
- [ ] wrapper 路径 `data.odata_result.value` 确认存在
- [ ] `value` 确认为数组
- [ ] 无 UI artefact

### Step 3：New EL Experience（端到端）

**URL：** `https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/new/spaces/?botName=da_kgs4pub_el_agents`

一次流程内检验 orchestrator 路由、响应格式、布局、数据刷新。

- [ ] space 创建并以正确数据渲染
- [ ] 离开 space 再返回，数据正确重新加载（确认 refresh handle 工作）
- [ ] 布局连贯，无缺失区块、无空卡
- [ ] 浏览器 console / network 无错误

### Step 4：Direct ATIL API（仅 system-triggered workaround 需要）

用 `curl` 或 [Bruno](https://www.usebruno.com) 直接调 ATIL endpoint，先隔离验证 system-triggered 路径：

```bash
curl -X POST \
  "https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/api/agent/v1/capabilities/com.sap.el.spaces/spaces_capability/scenarios/agent_ask_spaces/v1/message:send?assistant=da_kgs4pub_el_agents" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: en-US" \
  -H "x-callback-target: https://your-agent.example.com/a2a" \
  -H "Authorization: Bearer <USER_IAS_TOKEN>" \
  -d @body.json
```

- [ ] ATIL 调用同步返回 2xx
- [ ] Space ID 到达 callback URL（可能几秒）
- [ ] 用收到的 space ID 打开 space 正确渲染
- [ ] callback payload 已记录

### Field Diagnosis（现场诊断表）

| 你观察到 | 最可能原因 | 去哪查 |
|---|---|---|
| Agent 从不被调用 | DA 错或 AGW formation 缺失 | webclient 日志；查 config.json 的 `bot_name`；确认 AGW onboarding 完成 |
| orchestrator 追问 | Slot filling | 减少必需 slot；查 scenario `slots` |
| 出现「哪个 agent/capability」选择器 | Disambiguation | 收紧 capability `description`，加 entity 名词 |
| agent 运行但 Spaces 无渲染 | 响应格式：错路径/非数组/UI artefact | Content Validator；查 wrapper 路径和数组 |
| space 渲染一次但重开为空 | Refresh handle 配错 | 查 refresh handle 的 `jouleFunction`、`capabilityInfo`、`toolInput` |
| 数据渲染但错误 | Function 逻辑或后端问题 | 查 function YAML、destination 配置、后端 API 响应 |
| ATIL 返回 4xx | 缺必需 header 或 token 类型错 | 确保有 `x-callback-target`；用 user IAS token 而非 service token |
| callback 从不到达 | callback URL 从 EL landscape 不可达 | 确认 callback endpoint 公网可达 |
| IAS token 被拒 | agent 与 Joule 间 trust 未建立 | 重查 SPII Wave 0/2 和 AGW formation type |
| space/对话含看似合理但编造的内容 | Joule 误路由 prompt，用自己的 LLM 生成而非调你的 agent | 见下方 Hallucinated Content，**立即上报** |

### Hallucinated Content（幻觉内容——立即上报）

此失败模式与其他都不同：你的 agent 未被调用，capability 无问题。Joule 收到本应路由到你 agent 的 prompt，误解后用自己的语言模型生成响应。结果是 space/对话被填入看似合理但从未由你后端产出的**编造内容**。

**如何识别：** 内容像你 agent 会返回的但值是错的/虚构的；standalone webclient 显示你的 agent 无调用；无 callback（system-triggered）；重发同一 prompt 有时产出不同内容。

**为什么重要：** 企业 agent 应返回权威业务数据。Joule 编造 invoice 号、合同条款、财务数字等是**正确性失败**，不只是 UX 问题，用户据此行动会造成真实业务损害。

**怎么做：** 确认 webclient 无 agent 调用；记录确切 prompt、所用 DA、space ID（如有）、编造内容；**不要**通过改 capability description 绕过；**立即在 POC support channel 上报**。

> **危险：这是平台问题，不是 capability 问题。** 幻觉内容是 orchestrator 层的误路由，不应发生，别当正常行为接受，每次都必须上报。

### 发帖求助前的清单

- [ ] 已在 standalone webclient 测试并查看执行日志
- [ ] 响应 payload 已在 Content Validator 校验无问题
- [ ] 已在 New EL Experience 端到端测试
- 发帖需附：所用 DA/bot 名、space ID（如有）、所用 user 身份、确切 prompt、期望 vs 实际、webclient 执行日志

---

## 10. System-Triggered Spaces（走向自主 / Going Autonomous）

> 最难的变体：agent 无用户在键盘前，按 schedule 运行、处理业务事件、为毫不知情的人创建 space。平台尚未完全就绪，但有前进路径。

### 10.1 User-Triggered vs. System-Triggered

- **User-triggered：** 用户在 Joule Work 发消息，agent 响应创建 space，全程有 user IAS token。
- **System-triggered：** 无用户在场，schedule/event/外部系统启动 agent，agent 跑完后台流程并为指定用户创建待审 space。**无 user session 也无 user IAS token。**

### 10.2 Northstar（完整自主的样子）

- [ ] Agent 经 **Agent Gateway** 由 schedule/event/其他系统触发
- [ ] Agent 处理业务数据并把结果持久化到产品后端
- [ ] Agent 调 AGW 为指定用户创建 **Task Center** 通知（HITL gate）
- [ ] Agent 调 AGW 触发 Joule Spaces 里的 **Agent Generated Space 创建**，提供描述性 utterance 和 refresh handles
- [ ] Spaces 派生 sub-prompt 发给 Joule Orchestrator
- [ ] Orchestrator 经 **Business Knowledge Graph** 或直接经你的 Joule Capability 检索数据
- [ ] Spaces 生成布局并向用户发通知
- [ ] 用户打开 space、审阅 agent 输出、采取行动

此流程**今天尚不完全可用**。

### 10.3 阻碍因素

- **Token 约束：** Spaces API 需 **user-scoped IAS token** 判定为哪个用户创建 space。System-triggered agent 无头运行、只有 service token、无法独立获取 user token。受影响场景：为触发者以外的用户创建 space；无用户触发（scheduled/batch）时创建 space。
- **AGW 可用性：** AGW-native 的 system-triggered 创建尚未对所有 DA 可用，目前仅 `da_kgs4pub_el_agents` 激活。

### 10.4 ATIL Workaround（当前所有活跃 POC 采用）

**ATIL = Agent Task Invocation Layer**，位于 Joule Work 与你的 agent capability 之间的 SAP 内部编排 API。它暴露一个直接 HTTP endpoint，允许 agent（或任何持有效 token 的调用方）无 user session 触发 space 创建，绕过尚不可用的 AGW-native 流程。

**前置清单：**
- [ ] 已为目标用户拿到 user IAS token（见 token 约束）
- [ ] Capability 部署在 `da_kgs4pub_el_agents` 下
- [ ] Agent 暴露公网可达的 callback endpoint 接收 space ID
- [ ] Joule function 返回正确结果形状

**调用**（四个 header 全部必需，缺 `x-callback-target` 失败）：

```bash
curl -X POST \
  "https://sapdasintegdev.eu12.sapdas-dev.cloud.sap/api/agent/v1/capabilities/com.sap.el.spaces/spaces_capability/scenarios/agent_ask_spaces/v1/message:send?assistant=da_kgs4pub_el_agents" \
  -H "Content-Type: application/json" \
  -H "Accept-Language: en-US" \
  -H "x-callback-target: https://your-agent.example.com/a2a" \
  -H "Authorization: Bearer <USER_IAS_TOKEN>" \
  -d @body.json
```

**Request body**（只处理第一个 `parts` 条目）：

```json
{
  "message": {
    "role": "agent",
    "parts": [
      {
        "kind": "data",
        "data": {
          "utterance": "Create a space showing the result for entity with ID <entity-id>",
          "refresh_handles": {
            "my_handle_key": {
              "jouleFunction": "get_entity_http",
              "capabilityInfo": {
                "capability": {
                  "name": "my_agent",
                  "namespace": "com.sap.myteam.myagent"
                }
              },
              "toolInput": {
                "entity_id": "<entity-id>"
              }
            }
          }
        }
      }
    ],
    "messageId": "<uuid>",
    "kind": "message"
  }
}
```

**Callback：** 你的 endpoint 异步收到 space ID（同步响应只确认接收）；记录完整 callback payload（后续更新 space 可能要用 space ID）。

### 10.5 让 Spaces 内的数据刷新生效

用户在打开的 space 内触发刷新时，orchestrator 会再次调你的 scenario。为此 scenario 必须接受完整 input prompt 作为额外参数：

```yaml
slots:
  - name: entity_id
    optional: false
  - name: input_prompt          # required for refresh from Spaces
    optional: true
    description: Full input prompt passed during space refresh
```

参考 commit：`https://github.tools.sap/fin-trm-dunning-insights-agent/dunning-insights-agent/commit/f5ab3843f9cea58ea9651df05a214db3b81d6600`。

### 10.6 System-Triggered 就绪清单

- [ ] User IAS token 获取策略已定义并实现
- [ ] Callback endpoint 已实现且公网可达
- [ ] Request body 已按 ATIL body 格式校验
- [ ] 每次调用四个必需 header 齐全
- [ ] Callback payload 收到即记录
- [ ] 相关 scenario 加了 refresh 用的 `input_prompt` slot
- [ ] 已按 ATIL 测试流程端到端测试
- [ ] Callback 收到 space ID 且确认正确渲染

---

## 11. Human-in-the-Loop（HITL：agent 不独自决定什么）

> 多数 AI 平台把 HITL 当成每个动作的检查点。企业 agent 不能这样——若每次调用前都停下请求许可，那不是 agent，是很慢的手工流程。SAP 企业 agent 设计为自主，HITL 只保留给真正需要人类决策的时刻。

### 11.1 SAP 企业 HITL 模型

Agent 应无中断地完成整个 work package：检索数据、评估业务情形、采取或准备行动、呈现结果。它只在一个时刻请人介入：**即将开始下一个主要 work package**、需人类决定是否继续/改向/停止时。

| | Claude Code 风格 | SAP 企业 Agent 风格 |
|---|---|---|
| 每个动作前询问 | 是 | 否 |
| 主要 work package 前询问 | N/A | 是 |
| 报告发生了什么 | 有时 | 总是 |
| 支持 rollback | 否 | 是（域支持时） |
| 优化目标 | 开发者信任与控制 | 企业自主 + 可问责 |

### 11.2 两种 HITL Space

- **Reporting Space（报告型）：** 告诉用户 agent 本次 run 做了什么，从决策角度只读。用户可审阅、检查、（域支持时）回滚单个动作。但 run 已完成，无待输入。用于：agent 完成 work package 需呈现结果；用户可审阅并可选撤销；无需人类决策即可继续。例：过夜处理 50 张 invoice 后呈现带明细的摘要。
- **Direction Space（方向型）：** 告诉用户一个 work package 已就绪、问是否继续。呈现足够上下文让用户决策：agent 发现了什么、下一步打算做什么、利害如何。用户批准/拒绝/修改方向，agent 再行动。用于：agent 完成分析/准备、需 go/no-go；业务后果重大需明确签核；agent 能清楚说明批准后要做什么。例：分析完供应商合同、准备触发重新谈判外联。

### 11.3 Spaces 不是为什么设计的

**Spaces 不是交互式审批工作流、不是聊天界面、不是多步表单。** 用户打开 space、读输出、要么采取行动（rollback/approve/reject）要么关闭。具体：
- [ ] 不支持 space 内来回对话
- [ ] 不支持基于 space 内用户响应的条件分支
- [ ] 不支持渲染前轮询/等待用户输入
- [ ] 不能替代需逐步审批链的 Task Center workflow item

若 HITL 流程要用户先回答三个澄清问题 agent 才继续，Spaces 是错的 surface——用 Joule Conversation 做交互，Spaces 只在方向明确后呈现结果。

> **警告：** 常见错误是设计一个期望用户先填参数才能行动的 Direction Space。**space 已渲染，agent 不在监听。** 把 Direction Space 的用户动作设计成二元：继续 / 不继续。

### 11.4 Rollback

域支持时，Reporting Space 应在动作级暴露 rollback。**Rollback 是域责任，不是 Spaces 平台特性**——Spaces UI 可呈现 rollback 动作，但你的 agent 后端必须实现实际反转。在数据模型层就要提前规划。
- [ ] 识别域内哪些 agent 动作可逆
- [ ] 接 Space 前先在 agent 后端实现 rollback endpoint
- [ ] 设计布局让 rollback 动作在合适粒度可见（per action / per batch / per run）
- [ ] rollback 路径与正向路径同等严格测试

### 11.5 HITL 设计清单

- [ ] 这是 Reporting 还是 Direction Space？选一个，别混
- [ ] Reporting：space 创建前 run 是否已完成？必须是
- [ ] Direction：用户选择是否二元（继续/不继续）？否则重设计
- [ ] 是否要求用户先答问题才渲染？是则改用 Conversation
- [ ] 是否已识别可回滚动作并实现后端？
- [ ] 是否需 Task Center 通知用户 space 存在？（Direction Space 几乎总要）
- [ ] 是经 AGW 正确 HITL gate 还是 ATIL workaround 创建 space？

---

## 12. Feature Discovery（塑造平台）

> Sapphire 后从事件驱动发现转向可持续项目，需要各团队提交结构化、有理有据的 feature 输入。

**流程：**
1. **找模板：** 用户故事模板在 **[EL-1192](https://jira.tools.sap/browse/EL-1192)**（EL 项目 Jira）。读它，但**不要在 EL-1192 里建故事**。
2. **在自己团队 Jira 建故事：** 用 EL-1192 模板结构，保持所有权在有上下文的团队。
   - [ ] 故事建在你团队自己的 Jira 项目，不在 EL-1192
   - [ ] 遵循 EL-1192 模板结构
   - [ ] 打标签 `Agents_IN_JW`（精确、大小写敏感）
3. **写平台团队能执行的故事**，每个必须含：Who（persona 及其在 agent 工作流中的角色）、What（具体能力/行为）、Why（依赖它的业务成果）、Background（你试了什么、什么坏了、当前 workaround）、Acceptance criteria（如何算完成）。

> **警告：不要跳过 background。** 无背景的请求会被退回补充信息。

**标签：** 每个故事必须打 `Agents_IN_JW`，否则对流程不可见。

**这个流程不管什么：Bug 去 support channel，不走此流程。**

| 这是 bug | 这是 feature request |
|---|---|
| 曾经能用的现在不能了 | 从未存在过的东西 |
| 平台行为与文档契约矛盾 | 超出当前契约的新能力 |
| space 里出现幻觉内容 | 新渲染选项或 UI hint |
| 文档化 API 返回意外错误 | 新 API endpoint |

---

## 13. Field Reference（参考）

### Space 类型一览

| | Human | User-Triggered Agent | System-Triggered Agent |
|---|---|---|---|
| 谁启动 | User | User | System |
| 谁生成 space | User | Joule Work | Joule Work |
| agent 参与 | 否 | 是 | 是 |
| 创建时用户在场 | 是 | 是 | 否 |
| 可用 token | User token | User token | 仅 Service token |
| 本指南覆盖 | 否 | 部分 | 是（主焦点） |

### Error Taxonomy（错误分类，含旧版 `data.odata_result.value` 表述）

| 观察到 | 根因 | 修复 |
|---|---|---|
| agent 从不被调用，space 未创建 | agent 不在激活 DA 上 | 查 collector `config.json` 的 `bot_name` |
| agent 从不被调用，DA 正确 | AGW formation 未建 | 重查 CMP-15763 和 Blueprint 步骤 |
| orchestrator 索要值 | Slot filling | 减少必需 slot，加服务端默认 |
| 显示「Did you mean…」选择器 | Disambiguation | 收紧 `description`，trigger 加 entity 名词 |
| agent 运行但 Spaces 无渲染 | 错 wrapper 路径/非数组/UI artefact | 跑 Content Validator，修 `data.odata_result.value` 路径与数组 |
| 渲染一次重开为空 | Refresh handle 缺失/错误 | 查 `jouleFunction`/`capabilityInfo`/`toolInput` |
| 渲染数据错误 | Function 逻辑或后端 | 查 function YAML、destination、后端响应 |
| ATIL 返回 4xx | 缺 header 或 token 类型错 | 确保 `x-callback-target`，用 user IAS token |
| callback 从不收到 space ID | callback 不可达 | 确认 endpoint 公网可达 |
| IAS token 被 Joule 拒 | trust 未建立 | 重查 SPII Wave 0/2 和 AGW formation type |

### Ship Checklist（发布前完整清单）

**概念与设置**
- [ ] 懂 Human vs Agent Generated Spaces 区别
- [ ] 知道自己是 user-triggered 还是 system-triggered
- [ ] 懂组件链路各层职责
- [ ] 懂 Conversations 和 Spaces 测不同东西
- [ ] agent 暴露有效 ORD 元数据和 Agent Card
- [ ] token 获取策略已定义

**Capability 与 functions**
- [ ] `capability.sapdas.yaml` 有效（唯一 namespace、具体 description、destination 就绪）
- [ ] `scenarios/` 扁平无嵌套
- [ ] 每个 scenario 有 entity 特定 description，无重叠
- [ ] 必需 slot 最少且可从单句 utterance 填
- [ ] `response_context.value` 为 `$target_result.data`（旧版表述；新版用 `$target_result.agent_result`——以 Validator 为准）
- [ ] 每个 function 结果包装为 `data.odata_result.value` 数组
- [ ] 每个 function 有有效 refresh handle
- [ ] 任何响应无 UI artefact

**Onboarding / Testing / System-triggered** — 见第 8、9、10 章清单。

---

## 14. 开发者行动清单（Developer Checklist：照着做）

按实际开发顺序汇总（打勾推进）：

1. **确定 space 类型。** 判断你做的是 user-triggered 还是 system-triggered agent space；懂 Human/User/System 三者与组件链路（Agent → AGW → Joule/ATIL → Spaces → 你的 Capability → 后端）。
2. **让 agent 可被发现。** 实现 ORD（system-version + system-instance）+ 两个 Agent Card（`.well-known/agent.json` 未鉴权、`/agent-card` JWT 保护）；agent 接受 IAS app2app token。
3. **搭建 capability 骨架。** `joule/a2a/capability.sapdas.yaml`（唯一 namespace + 具体 description + `system_aliases` → BTP Destination）；`scenarios/` 与 `functions/` **扁平不嵌套**。
4. **写 scenario。** description 含 entity 名词、必需 slot 最少（可从单句填）、`target` 指向 function、`response_context` 指向正确路径。
5. **写 function（api-request 或 agent-request）。** `system_alias` 与 capability 一致；构造 **refresh_handle**（`jouleFunction`/`capabilityInfo`/`versionId`/`toolInput`）；结果按契约包装：`raw_data.value` **永远数组**、**无任何 UI artefact**、`data`-only。
6. **按 surface 分支。** 用 `condition: $transient.app_context.has('spaceId')` 区分 Space（data-only 包装）与 Conversation（可 UI）；向下游 agent 传 `isSpaceRequest`；用 `.get("isSpaceRequest","false")` 兜底。
7. **消灭三大隐形杀手。** Slot filling（服务端填默认、零上下文测试）、Disambiguation（entity 命名、一 capability 一意图、跨团队协调）、Response format（**每次测试前跑 Content Validator**）。
8. **过 onboarding 关卡。** Stage 1 前置（UMS/UCL/ORD/SPII/Blueprint）→ CMP-15763 加入 AGW formation type → SPII Wave 0（CONFIG_PENDING）+ Wave 2（READY）→ Blueprint 加 AGW formation + AgentGatewayTenant + canary Level-1 → 在 capabilities collector 注册到 **active DA**（首选 `da_kgs4pub_el_agents`），跑 `npm run update / validate / deploy -- --add`。
9. **按顺序测试。** Standalone Webclient（无 slot filling/disambiguation、日志干净）→ Content Validator（无错误）→ New EL Experience（渲染 + 重开数据刷新）→（system-triggered）Direct ATIL API。
10. **system-triggered 专项。** 定义 user IAS token 获取策略；实现公网可达 callback endpoint；按 ATIL body 格式发请求（四 header 齐全）；scenario 加 `input_prompt` slot 支持刷新；记录 callback 里的 space ID。
11. **设计 HITL space。** 明确 Reporting vs Direction（Direction 用户动作二元）；不要在 space 内做多轮交互（用 Conversation）；域支持时在后端实现 rollback 并在 UI 合适粒度暴露；Direction Space 一般需 Task Center 通知。
12. **持续参与。** 遇平台 bug（含幻觉内容）→ POC support channel 立即上报；要新能力 → 在自己团队 Jira 按 EL-1192 模板写故事并打 `Agents_IN_JW`。

> **贯穿全程的黄金法则：** 每次测试前先跑 Content Validator；只在 Conversations 能跑就当它不能用——Spaces 才是暴露一切的 surface。
