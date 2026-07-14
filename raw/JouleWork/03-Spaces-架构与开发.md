# Spaces 架构与开发（Joule Work / Engagement Layer）

> 本文整理自 SAP 内部文档站 fx-engagement-layer 的 **Spaces** 版块中架构、服务、组件、agent 开发相关的 markdown 源文件。忠实原文，专有名词/代码/API/schema/人名/产品名保留英文。

---

## 1. Spaces 简介与联系人

**Spaces 是什么**：Spaces 是用于简单和复杂问题求解的动态工作区（dynamic workspaces）。每个 space 在运行时按需组装——针对特定目标把正确的数据、工具和上下文汇聚到一起。用户在为其量身构建的环境中工作，而不是自己去导航查找。

### 联系人
- **Project**：Kirsten Elisabeth Ott (D059442)
- **Tech**：Eric Bratter (I809530)
- **UX**：Marisa Wollner (D063434) / Matthias Roos (I576720)
- **Content Sources 联系人**：Axel Schroeder (D056656)

### 关键仓库与组织
- **Org: Engagement Layer**（github.tools.sap/fx-engagement-layer）——Spaces backend 之家
- **Org: DAS/Joule**（github.tools.sap/DAS）——Spaces frontend 之家
- **spaces-ui**（DAS/spaces-ui）——前端
- **spaces-service**（fx-engagement-layer/spaces-service）——后端
- 相关：symphony-ds-frontend、symphony-server（SAPDesign）
- Jira 项目：EL（jira.tools.sap/projects/EL）

### Roadmap 要点（免责声明：非承诺，随时变动）
三个 horizon（GA readiness / Next iteration / Beyond Q1 2027），六条 lane：Stabilize EAC、Data and discovery、Action and write-back、System-generated and agentic、Collaboration/memory/templates、Platform。跨领域主题包括：Accuracy、Extended explainability、Performance、Coverage and value、Action space、Agent experience、Interoperability、Context and memory、Evaluation。
- Horizon 1（GA，至 10 月 1 日）关键项：KG 查询需在 15 秒 prod 限制内返回（EL-1241）、troubleshooting（日志/trace/错误可见性）、跨环境自动回归测试（Playwright in JRQ）、Space 内答案质量与 chat 一致（DAS-73655）、每张卡的 explainability、HITL 审批原语（EL-1158）、agent 创建 Space 的审阅/审批（EL-1157）等。
- 明确不做（deliberately not on list）：voice、Spaces 作为 Build 的嵌入表面、把现有 SAP UI 嵌入 Space、LoB 打包 Space 目录、服务端代码执行、直接 MCP federation。

---

## 2. 架构总览

Spaces 系统由**四个 backend 服务**协作，把自然语言 prompt 转换为生成的 dashboard 工作区：

| 服务 | 用途 | 仓库 |
|------|------|------|
| **Space Management Service (SMS)** | 持久化、OData + WebSocket API、实时事件 | space-management-service |
| **Spaces Agent Service (SAS)** | 自适应编排引擎（maestro loop） | spaces-agent-service |
| **Joule Orchestration Proxy (JOP)** | 通过 Redis pub/sub 把 Joule 变为同步代理 | spaces-jop |
| **Card Generation Service** | AI 驱动的 json-render card spec 生成 | card-generation-sevice |

此外，**Joule Capabilities**（el-capabilities）定义部署进 Joule 的 scenario/function YAML，把用户话语路由到 Spaces 及其他 EL 功能。

### 2.1 Space Management Service (SMS)
- 基于 **SAP CAP (Node.js)**，是 space/section/card 状态的唯一真源（single source of truth）。
- **数据模型**：Spaces（含 AI 生成 title/summary/icon）、Sections（有序分组）、Cards（存为 json-render spec，`type: JSON-RENDER | PREVIEW`）、SpacePermissions（owner/editor/viewer）、CardLayoutOverrides（客户端卡片尺寸持久化）。
- **API**：
  - **OData v4**（`/sap/odata/fx/spaces/v1`）——CRUD，以及 `createSpace`、`addCard`、`moveSection`、`moveCardToSection`、`getCardDbId` 等 action。
  - **WebSocket**（`ws://host/ws/space-ws/v1`）——自定义 V2 envelope 协议（`REQUEST`/`RESPONSE`/`EVENT`）。
- **WebSocket 事件**：Context-scoped（`CARD_ADDED`、`CARD_UPDATED`、`CARD_DELETED`、`SECTION_ADDED/UPDATED/DELETED`、`SPACE_UPDATED/DELETED`）；User-scoped（`SPACE_LIST_UPDATED`）；Identifier-targeted（`SPACE_CREATED`）。
- **关键能力**：AI 生成 space 元数据（via SAP AI Core / Claude Haiku）、多租户数据库隔离（CAP MTX，生产每租户一个 HANA HDI container）、per-space mutex 排序防并发竞态、UUID 归一化（iOS 大写 UUID 兼容）。

### 2.2 Spaces Agent Service (SAS) — Maestro Loop
自适应编排引擎，基于 **LangGraph Functional API**，六边形架构 + InversifyJS 依赖注入。每次迭代五个阶段：
1. **Planner**——结构化 LLM 调用（Claude Opus），把 prompt 拆成 `TaskEntry[]`（数据获取任务，含 description/dataType/serviceHint）和 `VizEntry[]`（可视化意图，带 task 依赖）。用 Zod schema 校验。
2. **Workers**——用 `DynamicRace`（自定义异步协调原语，按完成顺序 yield 结果，支持迭代中途加入新 promise）并行执行数据获取。生产环境通过 JOP MCP 的 `invoke_joule` 工具调用数据源。
3. **Evaluator**——对每个 worker 结果做一次结构化 LLM 调用，产出 `newTasks`、`newVizIntents`、`vizUpdates`。
4. **Safety Gate**——纯函数校验：generation depth 限制（默认 3）、总任务预算（默认 25）、per-eval spawn 上限（默认 3）、基于 description 去重、DFS 环检测。
5. **Compositor**——LangGraph ReAct agent（recursion limit 20），四个工具：`generate_card`（via Card Generation Service）、`create_section`、`delete_section`、`get_space_state`（via SMS OData）。卡片生成为 fire-and-forget。

**Safety Gate 参数**：`MAX_GENERATION_DEPTH=3`、`MAX_TOTAL_TASKS=25`、`MAX_SPAWN_PER_EVAL=3`、`MAX_ITERATIONS=20`、去重、环检测。

**Conversation Bridge**（`POST /api/conversation`）：抽取 `transient.input.text.raw` → utterance check 分类为 `spaces | general | clarify` → spaces 意图则创建 space、跑 maestro loop、汇总并经 Joule callback 回传；立即返回 `{ message: "Request received" }` 异步处理；用内存 `activeConversations` map 防重复请求。

**Worker Modes**：`native`（默认，JOP MCP）、`mock`（开发）、`a2a-poc`、`super-agent`。
**外部集成**：SAP AI Core（Opus 用于 planner/evaluator/compositor，Sonnet 用于数据摘要，Haiku 用于响应摘要）、SMS OData、Card Generation Service、JOP MCP、Joule callback、Langfuse（可选可观测性）。

### 2.3 Joule Orchestration Proxy (JOP)
**无状态代理**，用 Redis pub/sub 把 Joule 的异步 callback 编排变为同步 request-response：
```
Caller → POST /api/invoke → JOP Pod A
  1. SUBSCRIBE Redis channel {tenant}/{spaceId}/{queryId}
  2. POST /api/orchestrate to Joule（callback URL 指回 JOP）
  3. 等待 Redis 消息（最多 60s）
Joule → POST /api/callback → JOP Pod B（任意 pod）
  4. 校验 → 5. PUBLISH 结果到 Redis channel
JOP Pod A 收到 → 6. HTTP 返回给 caller
```
任意 pod 可收 callback；subscribe-before-invoke 防竞态；失败时 self-publish error 立即解锁。也暴露 **MCP endpoint**（`POST /mcp`，stateless Streamable HTTP），单一工具 `invoke_joule`。部署：3 副本 + Redis sidecar，严格安全（runAsNonRoot、readOnlyRootFilesystem、drop all capabilities），健康探针 `/health/live`、`/health/ready`、`/health/startup`。

### 2.4 Card Generation Service
从自然语言任务描述生成 **json-render card spec**，基于 skill-based LangChain agent，含校验与重试：
1. **系统 prompt 组装**（base rules + generic skill + skill index + component reference，来自 `@engagement-layer/spaces-renderer-lib`）
2. **Skill 路由**（指定 cardType 时只含该 skill 组件）
3. **Agent 调用**（工具 `read_skill`、`submit_card_spec`，recursion limit 8）
4. **校验+重试**（component 类型、root、children 引用、binding 格式、Zod prop schema；最多 2 次重试）
5. **后处理**（icon 通过 token overlap 匹配 SAP UI5 图标集自动纠正、迭代组件自动注入 `data` prop）

**7 个 card type skill**：`kpi`、`table`、`chart`、`detail`、`form`、`list`、`text`。
**双传输**：REST（`POST /api/generate`、`GET /api/catalog`、`GET /api/skills`）+ MCP（`generate_card`、`get_catalog`、`list_skills`、`get_skill`）。

### 2.5 Joule Capabilities（el-capabilities，5 个）
| Capability | Namespace | 用途 |
|------------|-----------|------|
| **Spaces** | `com.sap.el.spaces` | 经 `JOULE_SYS_SPACES` destination 路由到 SAS `POST /api/conversation` |
| **Task Management** | `com.sap.tc` | Task 列表、AI 优先级（GPT-4o agent）、详情、response action（针对 SAP Task Center） |
| **Knowledge Graph PoC** | `com.sap.das.poc.kg` | NL→OData（NL2Q runtime 针对 S/4HANA） |
| **Engagement Layer Navigator** | `joule.engagement.guide` | Spaces/Jobs/Build 间静态导航指引 |
| **Switch to Build** | `joule.build.switch` | 捕获创建意图并跳转 Build Area，透传 prompt |

Spaces capability 成功时渲染一张 UI5 Integration Card（space title、card 数、"View Space" 链接）。

### 2.6 High-Level 生成时序（关键流程）
1. 用户经 Conversations UI 发 prompt → Joule 执行 Spaces capability → `POST /api/conversation` (SAS Bridge)。
2. Bridge utterance check：`spaces` → `POST /createSpace`（SMS 创建 Space+默认 Section，后台 AI 生成 title/summary/icon，WSS 推 `SPACE_CREATED`）。
3. Maestro invoke（prompt+spaceId）→ Planner → Workers（MCP `invoke_joule` → JOP → Joule `/api/orchestrate` → KG/Scenarios → callback → Redis）→ Evaluator → Safety gate → Compositor（`POST /api/generate` → SMS `addCard` → WSS `CARD_ADDED`）。
4. 循环直到无 pending → 汇总 → 经 Joule callback 回传摘要 → Conversations UI 显示。

### 2.7 Data Access（Data Proxy 概念）
Data Proxy 是前端与 agent 访问后端数据的**唯一表面**，负责 retrieval 路由、缓存、action 执行。Space 生成是滚动流水线（数据获取与卡片生成交错、渐进）。
- 每张卡打上 `_retrieval` 描述符指回产生其数据的 tool call；Composer 拿到 tool call 元数据（server/tool/params），但因 Composer 是 LLM 不能假设其确定正确（开放点：`_retrieval` 正确性校验工具）。
- **Card Data Route**：`GET /space/:spaceId/card/:cardId`；缓存 key `(spaceId, server, tool, params)`（tool-call 粒度，多卡共享）；命中返回子集，未命中则重放 tool call。
- **`_retrieval` 描述符**：`{ type:"tool", server, tool, params }`，refresh 时无 agent/LLM 确定性重放；数据变化时缓存更新，共享该缓存的卡片被标记 stale，经 WebSocket 通知前端拉取。
- **`_actions` 描述符**：`[{ id, label, type:"tool", server, tool, params }]`；用户输入参数的声明方式为开放点（likely 来自 OData action metadata）。
- **Cache**：Redis，值为完整 raw tool 输出，固定 TTL；失效两触发器：TTL 过期、用户 action（`POST /space/:spaceId/card/:cardId/action/:actionId` → 202 立即返回 → 后台失效并发 `card:stale` WebSocket 事件 → UI 自行重拉）。UI 从不被推数据，只被告知哪些卡 stale。
- **Data Transformation**：生成时数据被拦截载入临时 SQL 表（请求作用域 `r<request_hash>__<table_name>`，请求结束即 drop）；transformation agent 探索→分析→迭代查询→产出 CTE 结构 SQL；**存查询不存数据**——最终 SQL 存为 data proxy 持久 view，`_retrieval` 引用该 view，refresh 时确定性重放；跨系统 join、CTE explainability、统一数据模式（前端始终一种连接与数据模式）。

### 2.8 Content Sources（Joule 提供的内容源）
EL web/mobile 客户端都建在 Joule 之上，Joule 能提供的所有数据源对 EL 客户端可用。EAC（Sapphire 26）聚焦 Gen UI（即 Spaces）。
- **Joule Scenarios**（设计时 artefact，推给 Joule 团队进 artifactory，运行时经 UMS/Formations 解析）
- **Knowledge Graph (KG)**（原型/Sapphire 焦点；Product API、CDS view、OData、Fiori app；联系人 Pavithra G K、Michael Haas）
- **BDC**（Data Products，未测）、**AutoSQL**（非 API 内容，未测）、**UMS**（BTP Fabric 代码 agent，未测）、**MCPHub**（via Joule MCP Client，未测）、**UI Integration Cards**、**Navigation Targets**（IBN 注册进 Work Zone foundation services，见 INTG-01R2）、**Work Zone Content**。

### 2.9 Driving Requirements（驱动架构的产品需求）
1. Spaces Mode 可在会话中任意开关。
2. Conversations 与 Spaces 可按需连接/断开。
3. 即使 Spaces Mode 关闭也可用自然语言请求 Spaces（反之亦然）。
4. 会话须能渲染卡片，卡片之后可送入 space。
5. 状态更新发给会话。

**Consequences**：Spaces-Agent 需**无状态**并与 conversation/space 解耦（查询时共享 history、发送当前打开的 space）；状态更新发给 Joule 显示在会话；需要机制为业务对象获取 action 并触发、流式传数据给卡、重读/更新先前数据；会话与 space 的卡片须兼容（Card-Generation-as-a-Service 共享？渲染？）；认证；inner source 作为潜在解法。

---

## 3. 关键架构决策 ADR

### ADR-001：Joule Orchestrator Integration PoC（数据获取引擎）
- **状态**：Draft。**问题**：无共享数据获取方式会导致 Joule 与 Spaces 结果不一致；Spaces 的 query decomposition 需求不同于 Orchestrator。
- **决定/方向**：EL Spaces 自建 Pipeline（Decomposition、Planning、Validation、Card Generation），从 worker agent 用清晰拆分的数据获取任务调用 Joule Orchestrator。若 Orchestrator 满足要求则采用目标架构，否则与 Joule 团队讨论调整。
- **理由**：从零建数据获取引擎成本高；复用 Orchestrator 成熟能力、保证 Joule 与 Spaces 用户一致；KG 等改进同时惠及 Spaces；未来 write-back 可复用 Joule scenario。需要 Orchestrator 提供更丰富的 endpoint/tool 元数据以支持 refetch，并讨论「每次获取 20 条」的限制。

### ADR-002：Frontend Technology for the Engagement Layer
- **状态**：Draft。**决定**：EL 前端从 **SAP UI5** 转向 **React**（CTO 强制）。
- **架构原则**：React UI Shell 作为集成容器；各 workstream 交付独立 React app/view；用 module federation / import maps / slot-based rendering 集成。
- **Spaces 应用技术栈**：Server state 用 **TanStack Query**；client state 用 **Zustand**；UI 层用 **UI5 Web Components + CSS**。
- **理由**：与 AI 工具生态（React-first）、生成式 UI 模式对齐；更好的模块化集成模型（取代 iframe 嵌入）；人才与市场趋势。**代价**：迁移成本、学习曲线、需明确集成契约与前端治理。

### ADR-003：Protocol for Generative UI Data Exchange
- **状态**：Draft。**决定**：采用 **AG-UI**（ag-ui.com）作为 backend↔client 的标准化数据传输协议。Payload 格式另见 ADR-004。
- **理由**：标准化 agent event model（定义事件类型、生命周期事件、流式更新、确定性 UI 状态转换）；关注点分离（Agent Runtime / AG-UI Protocol / AG-UI Payload / Frontend）；实时流式；长期互操作性。Sapphire 后复审。

### ADR-004：Payload Schema for Generative UI
- **状态**：Draft（All in on AI days, Walldorf, 2026-02-17/18）。**决定**：采用 **JSON Render**（Vercel 风格、基于 catalog）作为 Spaces 初始 payload schema。
- **选项**：A) JSON Render（轻量、SAP 自定义组件目录、可映射多技术栈、支持 schema 分解避免 LLM 上下文过载、**无通信协议**）；B) A2UI（Google，太固化）；C) AG-UI/A2A（是通信协议非 payload schema，互补）。
- **理由**：灵活性与所有权、技术无关、LLM 兼容、可扩展、时间线契合 Sapphire、未来可映射 A2UI。**代价**：无内置通信协议、mobile renderer/校验/复杂交互需额外工作。

### ADR-005：Backend Spaces Endpoint
- **状态**：Draft。**决定**：backend 为单一 Node.js 应用，用 **SAP CAP** 框架提供 Spaces 实体 CRUD。
- **理由**：声明式数据建模（CDS）、内置用户上下文与授权（`@requires`、`@restrict`，XSUAA/IAS、RBAC）、自动 API 特性（`$orderby`/`$filter`/`$search`/`$top`/`$skip`/`$count`/`$select`，OData 标准；REST 模式经 `@protocol:'rest'`）、减少自定义代码、企业级日志、Change Tracking、Input Validation、Event Mesh 消息、Draft 支持、Express.js 基础。**代价**：CAP/CDS 学习曲线、轻微抽象开销。（事件驱动通信另见 ADR-003。）

### ADR-006：Spaces Client-Server Protocol（Events and Actions Catalog）
- **命名约定**：Actions（Client→API）`{ACTION}_{ENTITY}`（如 `MOVE_CARD`）；Events（API→Client）`{ENTITY}_{PAST_ACTION}`（如 `CARD_MOVED`）。
- **Actions（HTTP）**：`UPDATE_CARD`/`MOVE_CARD`（PATCH `/spaces/{spaceId}/cards/{cardId}`）、`DELETE_CARD`（DELETE）、`UPDATE_SECTION`/`DELETE_SECTION`、`UPDATE_SPACE`/`DELETE_SPACE`。卡片/section/space 由后端响应 `SEND_MESSAGE` 创建，非直接 CREATE。卡片在 `/spaces/{spaceId}` 下扁平（因 MOVE_CARD 可换 section）。
- **Events**：
  - User-level（`WS /events`）：`SPACE_CREATED`（Full Payload）、`SPACE_DELETED`（JSON Patch）。
  - Space-level（`WS /spaces/{spaceId}/events`）：`CARD_CREATED`（Full）、`CARD_UPDATED/DELETED`（Patch）、`SECTION_*`、`SPACE_UPDATED/DELETED`。
  - Card Data Lifecycle：`CARD_DATA_STALE`、`CARD_DATA_REFRESHING`、`CARD_DATA_READY`（→ `GET /cards/{cardId}/data` 只重渲 data 层）、`CARD_DATA_ERROR`。客户端**从不轮询**，等信号再拉。
  - Card Action Lifecycle：`CARD_ACTION_STARTED`、`CARD_ACTION_COMPLETED`（常接 `CARD_DATA_STALE`）、`CARD_ACTION_FAILED`。
  - AG-UI 编排事件（不改持久状态，接收方 TBD）：`RUN_STARTED/FINISHED/ERROR`、`STEP_STARTED/FINISHED`、`ACTIVITY_SNAPSHOT`。
  - Joule 文本流：`TEXT_MESSAGE_CONTENT`/`TEXT_MESSAGE_CHUNK`（Joule 直传 Conversations WebClient）。
- **Card Manifest 四层**（每层可独立 patch）：`ui`（组件树，button 声明 action intent，值经 `$state` 绑定）、`data`（字段值快照）、`retrieval`（refetch 配方：endpoint/view id、TTL、last-fetched、refreshable）、`actions`（可调用业务操作，keyed by button action intent，含 API endpoint + input schema；源系统永不被客户端直接调用）。`data` 是结果，`retrieval` 是配方，Data Proxy 拥有 retrieval 执行并写入 data。
- **Payload 类型**：Full Payload（`*_CREATED`）、JSON Patch（RFC 6902，`*_UPDATED/DELETED`）、Event Data（AG-UI）。
- **传输**：HTTP + WebSocket 混合；Echo-back（发起客户端经 WS 收到自己 action 的事件，单一代码路径）；First Hydration（先 `GET /spaces/{spaceId}` 全量渲染，再开 WS 增量）。
- **开放问题**：谁产生 data/retrieval/actions 层（likely Data Proxy）；`CARD_DATA_READY` 后数据拉取路径（经 SMS 还是直连 Data Proxy）；AG-UI 事件接收方；TTL scheduler 位置。

### ADR-007（card-gen-schema）：Card Generation Schema
- **状态**：Accepted，2026-03-08。**决定**：card 生成输出 **json-render spec**——扁平、自包含 JSON，单一 payload 描述布局、数据绑定与状态。LLM 生成结构与绑定，系统事后注入数据。
- **MCP 工具**：`generate_card`（入参 `query`、`dataDescription`；出参 JSON-RPC 2.0，`text` 内含 `{ spec, header }`）、`get_catalog`。
- **`JsonRenderSpec`**：`root`（root 元素 id，必须 Card）、`elements`（id→SpecElement 扁平 map，含 `type`/`props`/`children`）、`state`（`{ data: object|array }`，系统注入非 LLM 生成）。
- **数据绑定**：模板绑定 `$state`（直接字段引用）/`$template`（仅简单 `${/data/field}` 插值，无表达式）；chart 用 bare field-name 字符串。
- **约束**：root 必须 Card；元素 id 唯一 kebab-case；数据值必须 `$state`/`$template`，props 无硬编码数据；`state.data` 系统注入。

### ADR-007（data-binding，Sapphire scope）：Data Binding Specification
> 基于 spaces-renderer-lib PR #40，已获 web/backend/mobile(iOS)/Android 批准用于 Sapphire scope。
- **三种绑定机制**：`StateBinding`（`{ "$state": "/path" }`，JSON Pointer 根于 state）、`TemplateBinding`（`{ "$template": "${/p1} ${/p2}" }`）、隐式 field ref（Table/List 列/字段定义中的裸字符串）。
- **State 对象**：扁平 JSON，按数据集/聚合命名，**无必需 `data` key**；数组是 Table/List 数据源；标量直接绑 `$state`；生成时 AI 预算聚合放为标量，真实数组置 `[]` 支持 **rehydration**（卡片先渲空占位，平台注入真实数据触发重渲）。
- **Table**：`data`（StateBinding→数组）+ `columns`（`{ header, field, options? }[]`，`field` 是裸字段名 lookup key，`header` 是 AI 选的人读标签、绝不来自数据）。**List**：`data` + `fields`（`{ field, label?, options? }[]`）。
- **FieldOptions**：可扩展，如 `linkHrefField`（渲染为链接：文本=field 值，href=linkHrefField 值）；不支持的客户端优雅忽略渲染纯文本。
- **Charts**（Bar/Line/Pie）：`data`（StateBinding→数组）必需；`label`/`value` 为裸字段名。
- 任何标量 prop 可绑 `$state`/`$template`。

### ADR（PoC）：Joule Data Requirements（Spaces 与 Joule 数据集成需求）
- **核心矛盾**：Conversation（收窄到单一答案）vs Space（获取 board 级多实体数据用于可视化、秒级渲染、可 refetch/rehydrate）。
- **硬需求**（无法完全委托给 Joule decomposition）：不确定查询的 clarification 须在 Spaces 端做；非 Spaces 查询须早期拦截路由。→ 需要一种**不含 decomposition** 的数据访问方式。
- **软需求**（若 decomposition 留在 Joule）：暴露拆分任务列表以渲进度、per-subtask 触发卡片生成、rehydrate/update 任务、动态处理失败、实时反馈问题给用户、space context 影响 decomposition、流式中间结果、实时反馈拒绝/错误。
- **需要工具访问而非仅数据**：需 raw tool call 以控制执行、跨步骤复用、explainability（Card X 用了哪些源）、喂入 transformation pipeline 做 SQL join/聚合；需要开放的 tool 层、直接 tool 调用 endpoint、可处理的 JSON 结果。
- **数据量/API**：20 条限制不可行、需大量记录 + 分页 + 即时聚合与图表、更细粒度 KG discovery API、防源 API 过载。
- **性能**：用户不能盯 2 分钟空屏；不能每请求多次 decomposition/orchestration LLM 调用；完整 Joule pipeline 2+ 分钟不可接受。
- **三个集成选项**：Option 1（增强 Joule Orchestrator，2 周时间线）、Option 2（开放公共 tool 层）、Option 3（Spaces 像 Deep Research 一样自建 KG 连接，鉴于时间线最现实）。API Spec 定义了 PoC 三端点：`/joule-trigger`（Prerouter→Spaces Planning）、`/invoke`（Spaces Worker→Prerouter）、`/joule-callback`（Dialog Result Processor→Spaces Worker）；PoC 中 Spaces 端点无需认证，但须回传 `X-Auth-IAS-Token`。

### ADR：Joule and Spaces Integration（Sapphire Beta scope）
- PoC 成功证明 Spaces 可借 Joule Orchestrator + KG virtual scenarios 取数。
- **Sapphire Beta 数据访问需求**：以当前用户权限取数（权限变更须尊重）、大数据量（分页/聚合/转换）、"dig deeper"（相关业务实体）、触发业务实体 action、explainability（哪个系统的数据）、卡片并行快速加载。
- **Experience 需求**：Spaces Mode 任意开关（整段 history 参与处理，卡片进 space、答案/HITL 留会话）等（同 Driving Requirements）。
- **开发影响**：低延迟 UI（并行数据请求）、可重复的大数据检索（用 id/handle 直达数据，理想可直接流给前端，避免缓存与权限问题）、数据须带元数据（explainability/相关对象/可用 action）、可靠执行 action（须向用户展示将执行的 action 与参数并保证执行一致）、Spaces-Agent 无状态解耦、状态更新回传会话、会话与 space 卡片兼容/可转换、认证、结构化错误消息传播、数据质量评估。
- **Joule write 限制**：无 capability discovery、无 deeplink 验证、action 覆盖不足（如 returns 流程 Joule 只提供 fetch return orders，缺 "Release" 等关键 action，无法端到端）。

---

## 4. 生成式 UI 协议

### 4.1 AG-UI Protocol（Agentic UI）
标准化通信协议，在 backend 与 frontend 间**实时流式**编排事件（LangGraph 编排）。
- **传输**：Server-Sent Events (SSE)，单向 server→client，over HTTP，自动重连，浏览器原生支持。
- **编排上下文**：Thread ID + Run ID，注入 LangGraph state 并流经所有 node，使任意 node 都能发相关联事件。
- **事件生命周期**：`RUN_STARTED` → 各 node（clarifying_question、decomposition、planner、orchestrator、validation）发 `STEP_STARTED`/`STEP_FINISHED` → `ACTIVITY_SNAPSHOT`（任务协调/执行进度/结果）→ 文本流 `TEXT_MESSAGE_START/CONTENT/END` → `RUN_FINISHED` 或 `RUN_ERROR`。
- **事件类别**（来自 `@ag-ui/core`）：Run 事件、Step 事件、Message 事件、Activity 事件。
- **后端集成**：连接管理层（中间件包裹编排、管理 SSE 生命周期、发 run 级事件）、事件发射层（各 node 经 event emitter 发 step 级事件）、上下文传播、编排图。
- **协议特性**：Stateless、Ordered、Typed、Timestamped、Identifiable、Encoded（`@ag-ui/encoder` 符合 SSE 格式）。
- **未来**：新事件类型、activity snapshot 元数据、并行执行/子图、可观测性集成。

### 4.2 Payload 协议/schema（JSON Render）
见 ADR-004（决定采用 JSON Render）与 ADR-003（决定采用 AG-UI 作为传输协议）。二者关系：**AG-UI 定义 agent↔UI 通信流；JSON Render 定义组件/payload schema**——互补，不互替。JSON Render 支持技术无关 UI 生成、SAP 自定义组件目录、schema 分解避免 LLM 上下文过载、可映射 UI5/Web Components/React/React Native/SwiftUI/Kotlin。

---

## 5. Card 组件

### 5.1 组件目录（22 个组件，5 类）
| 类别 | 数量 | 组件 |
|------|------|------|
| **Layout** | 2 | Card, Stack |
| **Data Display** | 11 | Text, Metric, Tag, Link, Icon, List, Table, BarChart, LineChart, PieChart, Progress |
| **Input** | 7 | Input, TextArea, Select, RadioGroup, DatePicker, Checkbox, Switch |
| **Feedback** | 1 | Message |
| **Action** | 1 | Button |

**关键组件 props 要点**：
- **Card**：`title`(必)、`subtitle`、`icon`（SAP icon 名，无 `sap-icon://` 前缀）、`iconSemanticType`(success/warning/error/info)。
- **Stack**：`direction`(horizontal/vertical，默认 vertical)、`gap`(none/sm/md/lg)、`align`、`justify`。
- **Metric**：`value`(Bindable,必)、`label`、`unit`、`trend`(up/down/stable)、`semanticType`(positive/warning/negative/neutral)。
- **Tag**：`value`(必)、`semanticType`。**Text**：`value`(必)、`label`、`variant`(primary/secondary/tertiary)、`fontWeight`。
- **List**：`data`($state,必)、`title`、`fields`(`{ label?, field, options? }[]`,必)。
- **Table**：`data`($state,必)、`columns`(`{ header, field, options? }[]`,必)。
- **BarChart/LineChart**：`data`($state,必)、`categoryField`(必)、`valueField`(必)。**PieChart** 额外 `variant`(pie/donut,必)。
- **Input**：`label`、`placeholder`、`type`(text/email/password/number)、`value`(Bindable)、`readonly`。**Select/RadioGroup**：`options`(`{ label, value }[]`)。**DatePicker**：`value`(ISO)、`min`、`max`。**Checkbox/Switch**：`label`(必)、`checked`。
- **Message**：`label`(必)、`semanticType`；可接 Button 子元素。
- **Button**：`label`(必)、`variant`(primary/secondary/tertiary,必)、`semanticType`(positive/negative/neutral,必)、`action`(navigate/submit/reject/edit/delete/export)、`target`。

### 5.2 组件对齐决策（2026-03-11，CompDS vs Spaces）
- **Card**：仅 `title` 必需（Spaces 版保留）。**Table**：Spaces 用数据绑定列定义（非 raw string/rows）。**Metric**：Spaces 去掉 `variant`。**Checkbox/Switch(Toggle)**：Spaces 去掉 `name`。
- **Icon**：从固定 10 图标 allowlist 放开，UI 用 similarity match 兜底（后续再深入讨论）。
- **重命名决策**：Status/Badge → **Tag**（用 Badge 的 semanticType 属性 positive/warning/negative/neutral）；Alert → **Message**（用 Alert 的 variant info/warning/error/success）；BarGraph→**BarChart**、LineGraph→**LineChart**、PieDonutChart→**PieChart**（用 field-name 绑定，无 inline data）；TextField→**Input**；Dropdown→**Select**（保留 `{label,value}` options）；Radio→**RadioGroup**；Date→**DatePicker**。多数「保持 Spaces 现状」。
- **Text 吸收 Heading**（`variant: heading|body`），Heading 组件被折叠。**Button** 用 CompDS 属性 + Spaces 的 `action`/`target`（write 操作待议）。
- **UI 层自行处理**（未入 schema）：Divider/Separator、Collapsible、Skeleton、Spinner、Popover。
- **Sapphire 范围外**：Grid、Avatar、Image（drop）、Tooltip。
- **已对齐**：Stack（Rows/Columns→Stack）、List。
- **跨组件主题（挑战）**：处处缺少 data size 感知；组合规则依赖数据但数据形状未知；Rule 与 Component 的布局/样式归属仍模糊。
- **Mobile 备注**：Table 在 Sapphire 不支持（映射到 List）；Metric 需数值而非 string（要 compact notation 如 1.2M）；trend 与 semantic 需分离。

---

## 6. Service 层

### 6.1 Ad-Hoc Data Transformation（数据转换引擎）
GenUI 的基础能力：为每个请求动态转换数据以最有意义的方式可视化，不受源系统 API 结构限制。
- **为何关键**：①API 独立（拥有完整 SQL 能力，不受 OData/REST 限制）；②跨系统 join（S/4HANA + 外部 CRM + CSV/Excel 上传 + 多 API，只要关系型且有 join key）；③动态聚合/计算/window function；④上下文窗口效率（数据拦截存入临时 SQL 库，agent 只查所需，减少 token）；⑤高效服务间通信（传表引用而非大数据集，需共享数据库）。
- **工作方式**：数据获取时拦截结果存入临时 SQL 库（原型用 **DuckDB**）；结果须为标准 JSON 关系型数组（对象数组，key=列名）；自动 schema 检测建表并把元数据（表名/列名/样本值）给 agent；transformation agent 在 card 生成流水线早期触发，步骤：探索表→分析需求→探索性查询→formulate 最终 query→执行；请求结束自动 drop 所有临时表（请求作用域命名 `r<request_hash>__<table_name>`）。
- **In-Memory 选择理由**：数据极短寿（分钟级以下）、内存占用小（KB~低 MB）、无持久化需求、高频 create/drop、零运维开销。选 DuckDB 因其分析查询性能（聚合/join/window）优于 SQLite。持久库（PostgreSQL/HANA）架构可行但引入 I/O 延迟、高 churn 成本、运维复杂度。
- 自动处理 SAP 日期格式、ISO 时间戳、数值表示、嵌套 JSON。

### 6.2 Data Proxy（数据代理）
是 Ad-Hoc Data Transformation 的概念演进，面向持久 space 与共享 dashboard 的生产级方案。**核心原则：存查询，不存数据（Store the query, not the data）**。
- GenUI backend 生成卡片时在 data proxy 建**持久 SQL view**（含源系统表/API 引用 + 完整 SQL 转换逻辑 + 结构化 CTE 记录每步转换）；card manifest 引用 view ID 而非嵌数据。
- **优势**：存逻辑不存数据（避免数据即时过期/共享重复/刷新重跑）；高效 refetch（打开/刷新时 view 针对当前源数据执行，无需重跑 AI 流水线）；无权限复杂度共享（User A 分享给 User B，B 打开时用 B 的凭证查 view，权限检查落在源系统；B 无权则卡片显示不可访问消息）；统一数据模式（UI 始终一种连接与数据模式）；explainability（CTE 结构可视化源→卡片路径）；未来 transformation reuse（compositor 复用/改编先前 view）。
- **工作流**：建 view（用户请求→backend 编排取数与转换→transformation agent 建 SQL→建 view→manifest 引用 view ID）；取数（UI 查 view→proxy 执行 SQL→渲染）；刷新（UI 重查所有关联 view）。
- data proxy 成为 UI 层与所有数据源（S/4HANA、外部系统、用户上传持久存储等）的**单一接触点**。
- 与 transformation engine 互补：engine 用于生成期（内存、请求作用域临时表、请求结束 drop）；data proxy 用于生产取数（存持久 SQL view，view 存活于 space 生命周期）。
- **未来增强**：智能 view 选择（可搜索索引 + 复用建议）、materialized view + 缓存、view 优化（加索引/重写）。

### 6.3 User Composer Mode（用户手动组合模式）
允许用户手动定义想看哪些卡片，并用自然语言 prompt 描述每张卡片应显示什么内容。

---

## 7. Enrichment（UI Enrichment Service / Proxy v2）

### 7.1 要解决的问题
1. **KG 展开导航属性时不考虑 UI 注解**（不含 `$expand`/`$select`，如 Sales Order 有 `customerID` 但无 customer name）。
2. **S/4HANA Public Cloud 响应缺渲染提示**（纯数据，如 `totalPrice`/`currency` 无关联为货币金额的信息）。
3. **KG 不提供 write/update action 的 URL/参数**（只支持 read，无法从读转为通用写）。

### 7.2 方案（UI Enrichment Proxy）
在 Joule Provider account 部署一个 proxy，位于 Joule orchestrator 与下游系统（S/4HANA）之间；初期只需把 **S/4HANA Public Cloud** destination 指向 proxy 的 execute 端点。
- **Request（读）**：proxy 读目标实体的 UI 注解，用 `$select`/`$expand` 增强 KG 请求（如为 customer ID 带回 customer name），再转发 S/4HANA。
- **Response**：proxy 收到 raw S/4 OData 响应，增强 UI 渲染提示（如把 `totalPrice`+`currency` 组为货币金额、标注 label/display format）+ 返回对象的可用 action 列表（url、payload 格式），转发给 Spaces backend。
- **边界**：proxy 不替代/拦截 KG 请求、不处理 S/4 认证（依赖现有 destination 配置 + JWT 转发）、不做 AI/LLM 推理（全部基于 UI 注解元数据确定性 enrich）。
- **决策门**：3/27 决定调整 scope 做 tracer bullet；4/4 决定是否 SAPPHIRE 相关（go/no-go）。

### 7.3 后端连接方式（Backend Connectivity）
**决定**：SAPPHire scope 用 **Option 0**（Enrichment Service 直连 S/4，与 Joule 团队 Martin Steiner 商定），同时 Joule 在做新 Option 3。
- Option 0：直连 S/4（当前实现，PoC 硬编码 destination `S4HANA_PUB_SSO`，能否动态获取待定）。
- Option 1：委托 DFR 用 `api-request`（需增 Kafka 上限，`$metadata` 常超限；最慢）。
- Option 2：从 Enrichment Service 调 Business Connector。
- Option 3：用 Object Storage Service（Business Connector 存大 payload，Enrichment Service 拿 link 加载）。

### 7.4 Enrichment 响应规范（Enrichment Response Specification）
> WIP，作者 Anton Niadzelka (D058071)。目的：把 enriched data + metadata 从 Proxy 传回 Spaces（初次 General READ 后），并可转译为 `spaces-renderer-lib` board spec。

Proxy 从 S/4HANA OData `$metadata` + CDS/Fiori 注解派生：列/字段定义（来自 `@UI.LineItem`/`@UI.FieldGroup`）、display hints（`semanticType`: code/currency-amount/date/unit-amount；`textArrangement`: DescriptionValue/DescriptionOnly/ValueDescription/ValueOnly；descriptionProperty；unitProperty）、增强的 `$select`/`$expand`、key fields、可用 actions（完整解析的 OData action URL + method + payload schema + 参数）、refreshQuery、nextPageQuery、filter 定义（来自 `@UI.SelectionFields`）、entity count。Proxy **不产 board spec**，产 data-level enrichment envelope。

**URL 路由**：所有 OData URL 用 **destination-name 前缀路径**（`<destination-name>:<odata-path>`，如 `S4HANA_PROD:/sap/...`）。Spaces 不能直连，须经：
```
Spaces → Agent Connector → Joule cURL Function → Business Connector → S/4HANA
                                          (Business Connector 解析 destination-name 到真实 S/4 URL)
```
`agentConnector` 块（`functionId`、`endpoint`、`authScheme`）在会话/系统级恒定，置于响应顶层。

**Top-Level Envelope** 关键字段：`agentConnector`、`entitySet`、`destinationName`、`servicePath`、`keyFields`、`refreshQuery`、`nextPageQuery`、`displayHints`、`actions`、`filters`、`count`、`data`。

**`ODataQuery`** 是完整 HTTP 请求描述（`url`、`method`、`headers`、`queryOptions`/`body`）；模板占位符 `{{paramName}}`（由 Spaces 在发送前解析：key field 来自行数据，参数来自用户输入）。

**`Action`**：`name`、`label`、`scope`(row/collection)、`query`(ODataQuery 模板)、`parameters`（用户输入字段）、`requiresConfirmation`。

**`FilterField`**：`property`、`label`、`type`、`operator`(eq/range)。应用过滤时 Spaces 构造 `$filter` 追加到 refreshQuery。

### 7.5 Enriched Response → board spec 转译（初步）
> 初步想法，需与 Spaces Backend/Frontend 团队确认。
- **三条路径**：Path 1 初次读（Proxy 参与，Spaces 确定性 translation layer 转 board spec）；Path 2 刷新/分页/action 后（不经 Proxy，Spaces 用存储的 enrichment 元数据 + raw OData 数据，同 translation layer）；Path 3 无 Proxy（LLM 直接产 board spec）。renderer 不与 Proxy 耦合。
- **列转译规则**（按 textArrangement）：`DescriptionValue`→`$template: "${desc} (${prop})"`；`DescriptionOnly`→`$state: descriptionProperty`；`ValueDescription`→`"${prop} (${desc})"`；`ValueOnly`→`$state: property`；currency-amount→`$template: "${amount} ${unit}"`；date→直接 `$state`（renderer 处理格式）。
- **Actions**：每 action 映射到 Button，`target` 用 `action:` 前缀；点击时查 `_enrichment.actions`、有参数则渲输入表单、解析 `{{}}` 占位、经 Agent Connector 发送、成功后触发 refresh。
- **enrichment 元数据存于 card `state._enrichment`**（agentConnector、refreshQuery、nextPageQuery、actions、filters、keyFields）供生命周期复用。

### 7.6 Enrichment 时序（V2，无状态 Proxy，直连 S/4 执行）
**关键属性**：Proxy 返回真实 OData 查询（refresh/分页/action）；后续请求绕过 Proxy（Spaces→Orchestrator→cURL Function→S/4HANA）。
**所需变更**：①Joule cURL Function（执行任意 OData 请求）；②Orchestrator 确定性 dispatch 模式（转发已成形 OData 请求，不涉 LLM/KG）；③KG execute flag（标明属性是用户显式请求还是 LLM 选的，Proxy 据此决定是否增强 `$select`/`$expand`）；④（Nice to have）KG execute 返回 app manifest。
**READ 场景 5 种**：General READ（唯一涉 Proxy 的初次读）、Refresh、Specific READ（尊重用户显式 `$select`）、Pagination（Proxy 返回真实 `@odata.nextLink`，未完全设计）、Specific Property Request with Existing UI Context（Option A 全量重取 / Option B 只取新属性再合并，未完全设计）。
**Action 执行**：按钮携带真实 OData action query；Spaces→Orchestrator→cURL Function→S/4HANA；无参数（可选确认对话框）或有用户输入（渲染表单收集后合并进 payload）；**无 LLM/无 Proxy 参与**，全确定性；成功后用 refreshQuery 触发刷新。
**Pagination 开放问题**：page size 由谁控制、`$count` 如何交互、Orchestrator 开销是否可接受、Spaces 能否可靠对后续原始页应用 enrichment、`@odata.nextLink` 是否 session-specific。

### 7.7 Refresh Flow — cURL Dialog Function（初步）
Spaces UI 点刷新 → Approuter 给 user token → Spaces Backend 解析 handle → refresh query path + system alias → Agent Connector 调 cURL function → Business Connector → Destination Service 解析转发 → 响应经 callbackURL + callbackId 回传 → 刷新卡片数据。

---

## 8. 开发者工作项（重点章节）

从上述架构文档提炼出 developer 实际需要实现/维护的技术工作清单：

### 8.1 前端（spaces-ui，DAS org）
- [ ] 用 **React** 构建 Spaces app：UI Shell 集成容器 + 独立 React app/view（module federation / import maps / slot-based rendering）。
- [ ] 技术栈落地：**TanStack Query**（server state/缓存/后台 refetch/乐观更新）、**Zustand**（client state）、**UI5 Web Components + CSS**（UI 层）。
- [ ] 实现 22 个 card 组件的 renderer（Layout/Data Display/Input/Feedback/Action），支持 `$state`/`$template`/隐式 field ref 三种数据绑定（JSON Pointer 根于 state）。
- [ ] 实现 **rehydration 模式**：数组初始 `[]` 渲空占位，平台注入真实数据触发只重渲 data 层（卡片不闪烁）。
- [ ] 实现 WebSocket 客户端：First Hydration（先 `GET /spaces/{spaceId}` 全量、再开 WS 增量），处理 User WS（`WS /events`）与 Space WS（`WS /spaces/{spaceId}/events`）事件与 JSON Patch (RFC 6902) 应用；实现 echo-back 单一状态更新代码路径。
- [ ] 客户端**不轮询**：响应 `CARD_DATA_STALE/REFRESHING/READY/ERROR` 生命周期，READY 时 `GET /cards/{cardId}/data` 只换 data 层。
- [ ] Action 交互：Button 携带 action intent → `POST /cards/{cardId}/actions/{actionId}`；表单输入收集（如 reject reason）；确认对话框（requiresConfirmation）；处理 `CARD_ACTION_STARTED/COMPLETED/FAILED`。
- [ ] 消费 enrichment 格式：table/filter bar/pagination（Load more）/action 按钮；把 displayHints 转译为组件、`{{}}` 占位解析、构造 `$filter`、经 Agent Connector 发送。
- [ ] Icon similarity match 兜底渲染；加载/错误 UX；每卡 explainability（来源 Fiori app + deep link + filter）。
- [ ] Composer Mode（用户手动定义卡片 + 自然语言描述）。

### 8.2 Spaces Backend Endpoint（SMS，CAP/Node.js）
- [ ] 用 **SAP CAP** 定义 CDS 数据模型（Spaces/Sections/Cards/SpacePermissions/CardLayoutOverrides），用 `@requires`/`@restrict` 做用户隔离与 RBAC（XSUAA/IAS）。
- [ ] 暴露 OData v4（CRUD + `createSpace`/`addCard`/`moveSection`/`moveCardToSection`/`getCardDbId`）与 WebSocket V2 envelope 协议（REQUEST/RESPONSE/EVENT）。
- [ ] 多租户隔离（CAP MTX，每租户 HANA HDI container）；per-space mutex 排序防并发竞态；UUID 归一化（iOS 大写兼容）。
- [ ] AI 生成 space title/summary/icon（SAP AI Core / Claude Haiku）。
- [ ] 实现 Client-Server 协议事件目录（`{ACTION}_{ENTITY}` / `{ENTITY}_{PAST_ACTION}`），广播 CARD/SECTION/SPACE 事件；管理 card manifest 四层（ui/data/retrieval/actions）与 TTL data-freshness clock。
- [ ] 作为 action proxy：接收 `POST /cards/{cardId}/actions/{actionId}` → 代理到源系统（源系统永不被客户端直接调）。

### 8.3 Orchestration Agent（SAS，LangGraph）
- [ ] 实现 **maestro loop** 五阶段（Planner/Workers/Evaluator/Safety Gate/Compositor），基于 LangGraph Functional API + 六边形架构 + InversifyJS。
- [ ] Planner 用结构化 LLM（Claude Opus）+ Zod 校验产出 `TaskEntry[]`/`VizEntry[]`。
- [ ] Workers 用 `DynamicRace`（按完成顺序 yield、中途加 promise）；per-worker timeout（默认 30s）；`RunDataStore` 存结果。
- [ ] Safety Gate 纯函数限制（`MAX_GENERATION_DEPTH=3`、`MAX_TOTAL_TASKS=25`、`MAX_SPAWN_PER_EVAL=3`、`MAX_ITERATIONS=20`、去重、DFS 环检测）。
- [ ] Compositor（ReAct agent，recursion limit 20）四工具 `generate_card`/`create_section`/`delete_section`/`get_space_state`，fire-and-forget 卡片生成。
- [ ] Conversation Bridge（`POST /api/conversation`）：utterance check 分类 `spaces|general|clarify`、异步处理、Joule callback 回传摘要与状态、防重复（`activeConversations` map）；发 AG-UI/status 更新。
- [ ] 保证 Spaces-Agent **无状态且与 conversation/space 解耦**（查询时携带 history + 当前 space）。

### 8.4 Card Generation（Card Generation Service）
- [ ] skill-based LangChain agent（工具 `read_skill`/`submit_card_spec`，recursion limit 8）生成 json-render spec。
- [ ] 7 个 card type skill（kpi/table/chart/detail/form/list/text）+ skill 路由（filtered reference）。
- [ ] spec 校验（QUAL-01~05：component 类型、root=Card、children 引用、binding 格式、Zod prop schema）+ 最多 2 次重试自纠。
- [ ] 后处理：icon token-overlap 自动纠正、迭代组件自动注入 data prop。
- [ ] 双传输：REST（`/api/generate`、`/api/catalog`、`/api/skills`）+ MCP（`generate_card`/`get_catalog`/`list_skills`/`get_skill`）。

### 8.5 数据获取与绑定（JOP + Data Proxy + Transformation）
- [ ] **JOP**：无状态代理，Redis pub/sub 把 Joule 异步 callback 变同步（subscribe-before-invoke、任意 pod 收 callback、60s timeout、self-publish error）；暴露 MCP `invoke_joule`；K8s 3 副本 + Redis sidecar + 严格安全 + 健康探针。
- [ ] **Data binding**（Sapphire scope，已获 web/backend/iOS/Android 批准）：实现 StateBinding/TemplateBinding/隐式 field ref；Table/List/Chart 显式 `data` 绑定 + field 映射；FieldOptions（`linkHrefField`）优雅降级。
- [ ] **Data Transformation engine**：拦截 tool 结果载入临时 SQL（DuckDB）、自动 schema 检测、transformation agent 迭代产 CTE SQL、请求作用域 `r<hash>__<table>` + 自动 drop。
- [ ] **Data Proxy**（生产）：存持久 SQL view（存查询不存数据）、`_retrieval`/`_actions` 描述符、Redis 缓存（key `(spaceId,server,tool,params)`，tool-call 粒度共享）、TTL + action 双失效触发、`card:stale` WebSocket 通知；`GET /space/:spaceId/card/:cardId`、`POST .../action/:actionId`。
- [ ] 开放点待定：`_retrieval` 正确性校验、per-card 数据子集定义、user-input action 参数声明、data/retrieval/actions 层产出方、TTL scheduler 位置。

### 8.6 Enrichment 后端集成
- [ ] 构建 **UI Enrichment Proxy**（Joule Provider account），读 UI 注解确定性增强 `$select`/`$expand` 与响应渲染提示 + 可用 action（无 LLM）；S/4 destination 指向 proxy execute 端点。
- [ ] 后端连接用 **Option 0**（直连 S/4，SAPPHire scope；解决硬编码 destination `S4HANA_PUB_SSO` 动态化）。
- [ ] 实现 **Joule cURL Function**（执行任意 OData 请求）+ Orchestrator 确定性 dispatch 模式 + KG execute user-specified-properties flag。
- [ ] 实现 enriched response envelope + ODataQuery 模板 + `{{}}` 占位解析；destination-name 前缀经 Agent Connector → cURL Function → Business Connector → S/4 路由。
- [ ] Refresh Flow（cURL Dialog Function + handle 解析 + callbackURL/callbackId）。

### 8.7 Feature Flags（平台级，Spaces 团队不控制部署）
- **Spaces-owned**：`ff_x_el_spaces_integration`（主发布开关，prod=EAC only，DAS-55424/55423）、`ff_el_shell_spaces`（shell 渲染 Spaces 面板）、`rt_x_spaces_card_refresh`（card 刷新，DAS-58958）、`rt_x_spaces_onb`（onboarding，DAS-58359）、`ff_el_spaces_card_gen_v2`（v2 card 生成，v1 已弃用）。
- **依赖他团队**：`ff_x_el`（Shell 团队，主 EL 开关）、`ff_spr_kg_spaces_only`（Julian Seibel，SPR 过滤为 KG-only VSP，防选到 AutoSQL/BDC）。
- `ff_*`=标准 flag（需重部署），`rt_*`=运行时 flag（可热切）；真源为 Joule Ops Feature Toggle Matrix。

### 8.8 可观测性与开发者工具
- [ ] 集成 Langfuse（可选 LLM 追踪）；correlation ID 结构化日志（CAP + SAP Cloud Logging）。
- 现有工具：Argo Pod Log Viewer、LLM Request/Response Viewer、Kafka Event Tracer、JRQ Trend Dashboard、SAP Cloud Logging（Dev/Staging/Int-Prod 的 Spaces/KG/Enrichment/Business Connector dashboard）、Argo、Kyma dashboard、JWT Decoder。
- CAM Profiles：AI DAS Cloud Logging User、AI DAS Kyma Canary/Intproduction Developers、AI DAS Developer。

### 8.9 Joule 集成待解决的 gap（依赖 Joule 团队）
- Joule Orchestrator 需提供更丰富 tool/endpoint 元数据以支持 refetch/explainability。
- 突破「20 条记录」限制、支持分页与聚合。
- 结构化错误消息传播；capability discovery + deeplink 验证；扩大 write action 覆盖（如 returns 的 "Release"）。
- 无缝 chat↔Space 切换（Joule Orchestration 深度集成）；per-用户权限取数与权限变更尊重。

