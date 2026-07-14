# Joule Work / Engagement Layer — Jobs 版块整理

> 本文档整理自 SAP 内部文档站点 `fx-engagement-layer` 的 `docs/jobs` 版块全部 Markdown 源文件。忠实于原文，专有名词/API/人名/产品名保留英文原文。截至日期：文档中的最新更新为 2026 年 7 月上旬。

---

## 1. 版块简介

### 1.1 Jobs 是什么

> **Jobs 的首要目的：让任何以用户名义发生的 agentic（智能体）工作变得可观测（observable）。**

Job 是一个"受治理的执行上下文"（governed execution context），用户与组织通过它把"业务成果"委托给 AI。Jobs 在 agentic 工作之上提供一份"持久的执行契约"（durable execution contract），让 AI 工作变得**可见（visible）**、**可验证（verifiable）**、**可治理（governable）**，而不需要重新实现 AI 本身。

- **可见（Visibility）**：用业务语言记录 agent 做了什么、发现了什么、改变了什么 —— 而不是一份 JSON trace。
- **可验证（Verification）**：每个结果都带来源归因（source attribution）—— 用了哪些文档、系统、规则。回答"我能信任这个结果吗？"
- **可治理（Governance）**：一份持久契约 —— 这是我要达成的成果、它的 owner、它的范围、它的调度计划、它的审计轨迹。

**定位：面向业务用户的产品，而非开发者工具。** 用户是 agent 的"客户"，不是它的"作者"。开发者工具回答"这个 agent 执行正确吗？"（优化诊断）；用户产品回答"我能信任这个结果吗？"（优化委托）。

### 1.2 联系人（Contact Persons）

- **Tech：** Thomas Buechler、Nils Christian Ditzel
- **UX：** Matthias Stegmueller、Shilpa Tripathi Jurinek
- **PM：** Benedikt Schoelch

### 1.3 团队（Jobs Workstream）

- **PM：** Benedikt Schoelch
- **Architecture：** Thomas Buechler、Nils Christian Ditzel、Ole Hellevik（Jobs ADR）
- **Frontend Dev：** Thomas Buechler、Duc Vo Ngoc、Luca Mueller、Fabian Peternek、Joshua Slaar
- **Backend Dev：** *待补充人员（To be staffed）*
- **Design：** Matthias Stegmueller、Shilpa Tripathi Jurinek、Natalya Franchi、Syashi Gupta

### 1.4 当前架构状态与生产目标

- 三个架构选项仍在评估中（Plan A / B / C，见第 2 章）。
- **2026 年 6 月方向信号**指向：以 **Joule 作为编排与执行层（orchestration and execution layer）**，Jobs 只拥有一个**用于持久化的 slim backend + 用于可观测性的 rich UI**。但**尚未做出正式决定**。
- 与 Build（Michael Gall）另有讨论，就跨 Build agents、n8n、Centurium 的**统一 runs 视图（unified runs view）**达成一致，作为较长期愿景。
- **生产目标日期（Production target）：2026 年 9 月 24 日。**
- **MVP 范围的唯一真源：** Jira Structure Board #31695；story 级拆分见 EL-1240。
- **POC 演示系统：** Engagement Layer (Dev) 环境（Jobs 体验运行于 Engagement Layer shell 内）。

### 1.5 设计（Design）

- **UI 唯一真源：** Figma "⭐️ Jobs Source of Truth"（job list、job detail、创建流程、监控、HITL 状态、通知）。
- 相关：Jobs Experience Framework（愿景 deck）、Jobs UX Flows MVP（价值主张、Job vs. Agent Monitoring 区分、用户研究发现）。

---

## 2. 架构（Architecture）

:::info 讨论中
本章反映的是截至 2026 年 6 月的架构选项与方向信号，**未做出正式最终决定**。生产目标：2026 年 9 月 24 日。
:::

**指导原则：** Jobs 是一个由用户或系统定义、用于达成目标的、结构化、可追踪的工作单元，确保 AI 工作长期**可追踪（Trackable）、受治理（Governed）、可见（Visible）**。

### 2.1 三个架构选项

| | Plan A: Build Integration | Plan B: Observability Service | Plan C: Conversation Threads |
|---|---|---|---|
| **模型** | Build 拥有完整 backend；EL 只是 UI 消费方 | Publishers 推送；EL 拥有可见性层 | Joule 原生；runs 就是 conversation threads |
| **主要优势** | 范围最薄，零 backend 工作 | 从第一天起独立 + 多平台 | 上线快，从 Joule 免费获得可观测性 |
| **主要风险** | 完全依赖 Build 时间线（基础设施尚不存在） | Publishers 必须集成 | 锁死在 Joule，扩展性有限 |
| **多 publisher** | 否（仅 Build） | 是（核心设计） | 部分（仅 Joule 会话） |
| **决策门（Decision gate）** | Build 承诺 + 时间线 | Publisher 采纳 + 配合 | System Trigger API 验证 |

**依赖分析（17 个 MVP 功能中的外部依赖数）：**
- Plan A：15-16 个被阻塞（Build 基础设施不存在）→ 2026 年 9 月不太可行。
- Plan B：2-6 个（publisher 采纳 + 配合）→ 紧张但无硬阻塞。
- Plan C：2-5 个（System Trigger API 是关键门）→ 若 API 验证通过则可行。

**决策取决于三个问题：** ① Build 是否愿意投入人力与时间线（决定 Plan A）；② 上线时是否必须多 publisher（利好 Plan B）；③ headless（无会话）Joule 调用是否已验证（决定 Plan C）。

**2026 年 6 月方向信号：** Build 未对 MVP 承诺；上线时 Joule-only 可接受；以 v10/SuperAgent 作为执行层 —— 指向 Plan B 与 Plan C 之间的**中间地带**：Joule 作为 MVP 的唯一 publisher，Jobs 拥有 slim backend（持久化 + relay），多 publisher 推迟到 v2+。

### 2.2 ADR：Jobs 执行架构（Execution Architecture，WIP，2026-06-24 起草）

来源：2026 年 6 月 23-25 日 Potsdam 跨团队架构会（Jobs、Joule platform、Scheduling 团队）。这是迄今最强的跨团队方向收敛，但仍是草案，非正式决定。

**Job 的两种类型：**

| | User-Authored Job（用户创作） | Provisioned Job（配置下发） |
|---|---|---|
| 意图 owner | 业务用户 | Admin / 系统 |
| 配置控制 | 用户定义 prompt、选 agent、设 trigger | Admin 定义执行路径与参数 |
| 用户角色 | 作者 + 受益人 | 参与者（消费、HITL 应答） |
| 示例 | "每周监控我 top 5 供应商" | S/4 Accounts Receivable 对账（admin 下发，用户接收产出） |

两种类型都走同一执行架构（triggers → AGW → agent → Jobs Service），区别只在 job 定义的来源，不在运行时行为。

**指导原则（June 23 对齐）：**

1. **Job 不是运行时实体（runtime entity）**：Job 自己从不执行工作，它只是对子系统（agents、workflows、scheduled prompts）中真实工作的"surfacing + 可观测性"层。执行链在有无 Jobs 时都能运行。
2. **不修改 agent 即可观测**：LOB agents（S/4、SuccessFactors、Ariba）不能被改造成"知道 Jobs 存在"。可观测性必须在外部实现。
3. **Agent 输出必须被捕获与持久化**：agent 运行时不长期保存会话（"抓不到就没了"）。Jobs Service 不要求特定的可解释性格式；原始 agent 输出按原样存储，展示时（用户打开 job 详情时）再按需转换。
4. **标准 publisher 契约**：任何想在 Jobs 中呈现的可执行体都要按约定格式发数据；不合规则降级可见性（更少细节），而非拒绝。尽量复用既有标准（A2A response streaming；生命周期事件格式待定）。
5. **一次执行、多个 job（Option 2）**：一份被调度的工作可以呈现为**多个独立 job**，每个针对不同 persona，指向同一个 schedule。取代了早期"单个 job 内多 persona 视图"的概念。Job 嵌套仍被排除。
6. **Job 可见性是 opt-in**（June 24 细化）：不是每次调度执行都是 Job。"Job 是既需要被做、又需要被展示的一份工作。" Scheduler 接受可选的 job 配置；缺省则工作运行但无 job 可见性。
7. **Jobs 与 Tasks 是不同概念**：Job = 面向机器的工作单元（Jobs UI）；Task = 面向人的工作单元（Task Center）。一个 Job 可以派生 Tasks（HITL、审批、通知），但它们是独立实体。
8. **Jobs 制品与 scheduler 解耦**：Job 元数据（标题、状态、run 历史、view config）存在 Jobs service，不在 scheduler。Scheduler 只是 trigger 源。接口是最小契约（correlation ID + 可选 job config payload）。建议 scheduler 以通用 plugin/hook 能力实现 Jobs 集成，而非把 Jobs 逻辑写进 scheduler 核心。

**两个执行选项：**

- **Option A：Executor Wraps Execution（executor 在执行路径中）。** Scheduler 调用 Job Executor；executor 完成全部 setup（correlation ID、user context、A2A framing）后调用 Agent Gateway，streaming 响应回流到 executor，由它持久化并发 OTel spans。优点：单一组件拥有完整 run 生命周期、correlation ID 在自然边界生成、user context 集中且安全、可增强 agent prompt。缺点：处于执行热路径（可用性关键）、可能成为规模瓶颈、与 scheduler 耦合更紧。
- **Option B：Executor as Sidecar（POC 起点）。** Scheduler 直接调 Agent Gateway；Jobs Service 是一个 REST/CAP 服务，在执行完成后通过 scheduler 的 plugin/hook 接收 agent 输出，持久化 job 元数据与结果，**不在执行热路径**。优点：松耦合、executor 故障不阻断执行（降级可见性而非坏 job）、易构建、无 LLM 成本在热路径、可扩展到高吞吐。缺点：correlation ID 须在 Jobs Service 之外生成、user context 处理在别处、不能增强 agent 调用、响应捕获依赖 scheduler hook 可靠性、可解释性只能事后按需生成。

**建议：从 Option B 起步。** 是否/何时演进到 Option A，取决于尚未确认的需求：user context / refresh token 处理、执行期间的实时 streaming。

**Steel Thread（首个实现）：** 从 schedule 触发到 job 在 Jobs UI 中可见，端到端，使用一个**未被改造**的真实 LOB agent。v1 约束：无 user context / refresh token（选一个用 agent 身份运行的 agent）、无 design-time UI（用 API/Postman 配置）、初期不向 UI 实时 streaming（先存后展示）、agent 不改造、scheduler 里用 JSON payload 存执行参数。

**Front-Runner 场景：** **S/4 Accounts Receivable Agent**（POC 首选，生产就绪、有客户在用、Task Center 集成好）；备选 Ariba Category Management Agent、SuccessFactors Agents、Banking Relationship Agent。

**实现序列（June 24 POC 约定）：** ① 扩展现有 scheduling service，加可选 job 配置（title、description、assigned user、`showAsJob` flag）；② 扩展 jobs service，加接收 agent 结果的 endpoint、缓存输出、创建/更新 job 记录；③ Jobs UI 从新持久化源显示 runs；④ 按需可解释性（下一迭代）；⑤ OctoRoute correlation（发带 job correlation ID 的 spans，7 月 1 日与 Priyanka Porwal 对齐 telemetry）。

**关键 open questions：** OctoRoute 能否近实时（普遍认为不能，3-5 分钟）；refresh token 安全存储；能否用 SDK 而非改每个 agent 来丰富输出；job 定义长期存储归属；何时需要从 Option B 演进到 Option A；存储的 agent 输出 + OctoRoute traces 是否足以事后生成可解释性。

### 2.3 前端架构（Frontend Architecture，assistant-ui）

Jobs 前端是一个集成进 Engagement Layer shell 的 **React micro-frontend**，且是**架构方案无关（plan-agnostic）、production-ready** 的。

| 层 | 技术 |
|---|---|
| Framework | React 19 + TypeScript |
| State | Zustand（3 个 store：JobsStore、AGUIStore、ChatStore） |
| UI | FX Components（`@sap-ui/fx-components`）+ SAP Sapphire theme |
| Routing | react-router-dom |
| Real-time | WebSocket（job CRUD sync）+ SSE（AG-UI streaming） |
| Integration | 经 shell-lib 的 module federation（micro-frontend） |
| Rendering | AG-UI 风格 renderer —— 自研递归 ComponentRenderer，22 种组件类型，`$state`/`$template` 绑定 |

**部署模式：** Standalone（本地开发）、Module federation（导出 `AssistantList`、`AssistantContent`）、API（`createAPI(shell)` factory）。

**事件流（双通道递送 Dual Delivery）：** agent skill 向 stdout 发 `AGUI_EVENT:{json}` marker → SuperAgent agui-pipeline → ① Yield 到 SSE stream 到浏览器（活动会话、低延迟）；② POST `/api/agent/events` 到 assistant-srv（NestJS backend）→ 持久化到 SQLite + 经 WebSocket 广播给所有客户端。两条路都进同一个 `routeAGUIEvent()` dispatcher。

**事件类型：** `RUN_STARTED`、`STATE_SNAPSHOT`（完整组件 spec 树）、`STATE_DELTA`（增量 JSON Patch / RFC 6902）、`STEP_STARTED`、`STEP_FINISHED`、`JOB_UPDATED`（自定义扩展）、`SET_RUN_ID`（自定义扩展）、`RUN_FINISHED`、`RUN_ERROR`。

**组件目录：** Layout（Card / Row / Column）、Data（Text / Status / MetricGroup）、Domain（ProgressRing / CheckList / AlertList / WatchSignals / RecommendedActions / TaskProgress）。数据绑定：`$state`（JSON Pointer）、`$template`（字符串插值）。Stream 管理：引用计数、导航 5 秒宽限期、指数退避重试（最多 3 次）、LRU 缓存（50 specs）。

**关键开放关切（Open Concerns）：** 多客户端渲染（backend 要服务 web + 原生 mobile，mobile 需渲染策略）【High】；WebSocket vs. SSE 协调竞态【Medium】；`STATE_DELTA` 尚未实现、重复发大 snapshot【Medium】；组件目录版本化无向后兼容策略【High】；安全（SSE 鉴权、动态组件 XSS、CSRF）【High】；测试覆盖【Medium】；Legacy 共存【Low】。

### 2.4 AG-UI 协议采纳（AG-UI Protocol Adoption）

**AG-UI（Agent-User Interaction Protocol）** 是 CopilotKit 创建的开源、基于事件的协议（MIT license），标准化 AI agent 与用户界面应用的连接，被 LangGraph、CrewAI、Microsoft Agent Framework、Google ADK、Mastra、Pydantic AI 等支持。生态定位：MCP（agent-to-tools）、A2A（agent-to-agent，Google）、**AG-UI（agent-to-user，传输/事件层）**、A2UI（agent-to-user interface，Google 的声明式 UI spec）。

**AG-UI vs. A2UI：** 互补而非竞争。AG-UI 是"事件如何在 agent 与 app 间流动"（传输）；A2UI 是"渲染什么组件"（UI 规范）。当前实现映射到两者：AG-UI transport（事件类型 + 双通道 pipeline）+ A2UI-like spec（`ComponentSpec` 嵌套树、`$state`/`$template` 绑定、类型化组件目录）。

**当前状态：AG-UI-inspired 但手写（hand-rolled）。** 事件名与 snapshot/delta 语义对齐 AG-UI，但**未导入**官方 `@ag-ui/*` 包（`@ag-ui/client`、`@ag-ui/core`、`@ag-ui/encoder` v0.0.47 在 research 分支列出但从未 import）。无协议边界校验。

**与 Plan B 的契合：** 若采纳 AG-UI 作为 publisher 契约，任何发 AG-UI 事件的 agent 框架都能开箱即用作 publisher（校验用 `@ag-ui/core` 的 Zod schema）。AG-UI 只标准化输入契约（publisher 发什么），backend relay 负责持久化与分发，前端 renderer 负责渲染 —— 三者互补。

**采纳收益：** 互操作性、边界处 Zod 校验、Protobuf 二进制传输、middleware（过滤/转换/脱敏/限流）、社区势能、内建 HITL 双向模式、内建向后兼容 shim。**风险：** pre-1.0（v0.0.47）API 可能变、CopilotKit 中心化起源、需自定义扩展（`JOB_UPDATED`/`SET_RUN_ID` 用 `CUSTOM` 事件类型）、引入外部依赖、迁移开销。

**建议：** 第一步在 **backend ingest 边界**采纳 `@ag-ui/core` —— publisher API 契约定为"POST AG-UI events 到 `/api/agent/events`"，用 Zod 校验，`JOB_UPDATED` 映射到 `CUSTOM`，前端 renderer 与 store 暂不动。

**多客户端渲染（Multi-Client Rendering）：** backend 须服务两类客户端 —— Engagement Layer web client（assistant-ui micro-frontend）与 Joule Work mobile app（原 SAP Mobile Start，Sapphire 2026 更名）。22 种组件 spec 为 React web renderer 开发，mobile 是否有对等 JSON-to-UI 渲染层未知。可选方案：A 原始 spec + 每客户端 renderer；B backend 转换层（content negotiation）；C spec 级 fallback 注解；D 分层组件目录（core + extended）；E 从原始数据按需生成 spec。初步建议（待验证）：定义 core 组件集（Card/Text/Status/List）映射 mobile 原生，extended 组件要求 agent 提供 `textSummary` fallback，backend 对所有客户端发完整 spec，渲染决策放客户端。需与 mobile app 团队（Thomas Bruckner、Tobias Tresl）验证；spike 为 BE-34。

### 2.5 Publisher 集成模式（Publisher Integration Patterns，讨论文档）

Jobs 需摄取多种 publisher 的活动：LoB agent、Build agent、N8N workflow、Joule capability。当前直连方式（HTTP push 到 `/api/external-agent/`）可用但有局限：紧耦合、契约脆弱、无发现、无策略执行（绕过强制的 Agent Gateway）。

**设计选项对比：**

| 准则 | A: Event Hub | B: A2A/AGW | C: OTel | D: Skill | E: HTTP（现状） |
|---|---|---|---|---|---|
| 平台对齐 | 强 | 强 | 强 | 待定（修订中） | 弱（无 AGW） |
| Publisher 成本 | 低（SDK） | 中（onboarding） | 极小（span 属性） | 低（invoke） | 中（全协议） |
| 解耦 | 高 | 高 | 最高 | 中 | 低 |
| 富 AG-UI payload | 可能 | 好 | 不可能 | 好 | 完整 |
| 实时延迟 | 近实时 | 低 | 3-30 分钟 | 低 | 最低 |
| 策略执行 | 部分 | 完整 | N/A | 视情况 | 无 |
| 生产就绪度 | 中 | 中 | 研究 | 待平台 | 仅 POC |

**关键洞察（分层假设，非决定）：** 通用业务生命周期事件走 **Event Hub / CloudEvents**（真正解耦，Jobs 只是众多订阅者之一）；Jobs 专属的富 payload（AG-UI STATE_SNAPSHOT / STATE_DELTA / ComponentSpec）走**直连通道（HTTP/SSE）**（语义耦合已存在，走 event bus 只增延迟）。分层：Primary = Event Hub（生命周期事件）、Supplementary = 直连 HTTP（AG-UI streaming）、Passive = OTel 语义约定（baseline 可见性）、Registration = A2A via AGW、Future = Skills。

**为何 AG-UI streaming 不走 Event Hub：** 顺序（delta patch 是有序的，乱序会破坏 UI state；Kafka 只保证单 partition FIFO）、payload 大小（STATE_SNAPSHOT 可达 1MB）、延迟、无解耦收益。三个既有 SAP 系统（Spaces、Build/WebAgents、assistant-ui）都用直连 push 做实时 UI，无一走 message broker。

**OTel 作为 v1 持久化替代（"no own DB"）：** 用 CLS/OctoRoute 作为 Jobs v1 的持久化层，Jobs UI 成为纯 telemetry 视图 —— 零基础设施、零 publisher 集成、免费广度、继承合规。代价：延迟（3-30 分钟）、无富 UI、查询受限、无控制面、需平台级采纳 `sap.jobs.*` 约定。与 6 月 17 日决定"v1 = view layer, Job = run ID, 无独立 job entity, 无持久化"一致。

**未解决的 Open Question：可解释性是否需要 agent wrapper？** 原始 workflow 执行（N8N、BTP Workflow、scheduled prompt）不天然用业务语言叙述自己在做什么。是否需要一个"agent-as-narrator"薄层包装/观测 workflow 来实现 Job 能力？这影响 Skills 与 OTel 等选项对非 agent publisher 的可行性。

### 2.6 研究：Agent Gateway & Event Hub 集成（Research，2026-07-03）

来自 AGW / Event Hub 代码审阅，为与 Moritz Schramm 对齐会做准备。核心结论：**Jobs 是被动观测者（passive observer），不触发 agent 执行。**

**已存在（What exists）：** AGW 为每次调用持久化完整 correlation chain（HANA 中 `AgentRouterInvocations`：`clientInvocationId`、`correlationId`、`a2aTaskId`、`traceContext`、`targetAgentId`、`status` 等），并经 OTLP 导出 traces 到 SAP Cloud Logging（CLS）；scheduler（作为调用方）通过 callback 收到结果；AGW 发结构化审计事件（仅经 SIEM 可达）；**N8N workflow 已向 CLS 发 OpenTelemetry spans**（`n8n.workflow.execute`，Build/Joule Studio 已用此做 workflow 可观测性）。

**不存在（What does NOT exist）：** 无 event-triggered 执行路径（AGW 纯请求驱动；Event Hub 集成因缺 principal propagation 被阻塞）；无第三方订阅 live A2A stream（streaming 只发给 caller，Jobs 无法接入活动 run 的消息/进度）；无 agent progress 契约（无"step 3 of 7"的结构化标准）。

**Sidecar（Option B）可行性：** 对**已完成的 run** 有效（发生了什么、为何失败、产出什么）；对**活动 run 可见性**无效（实时进度、中间输出、agent 推理）。实现活动 run 可见性有多条路径（AGW 加 task observer 订阅、caller relay、AGW 实时发到 Event Hub、Option A、共享 telemetry 层），但**无单一方案覆盖所有执行类型**（agents + workflows）。

**Event Hub → AGW → Agent 为何今天被阻塞：** ① principal propagation 缺失（Event Hub 递送时 JWT 标识的是 Event Hub 自己而非业务用户）；② AGW 需要 user context 才能以正确授权执行 agent；③ Event Hub 对 agent 无感知；④ AGW 代码中零 Event Hub 引用。scheduling ADR 的"初始方案"（scheduler 直调 AGW）正是绕过这个缺口的 workaround。

**演进方向：面向业务的 telemetry 层（business-oriented telemetry layer）。** 三源模型：Executors（Scheduler/AGW）提供 run 生命周期 + correlation ID；Agents/Workflows 发业务级活动事件；CLS（OpenSearch）作为统一查询层。与 Dirk Richtsteiger 团队的 Business Transaction Monitoring 方向一致。关键风险：CLS 查询/摄取延迟（历史查询已被 Build 验证；近实时活动 run 视图受摄取延迟制约）。

### 2.7 研究：Scheduler 配置 & Jobs Schema（2026-07-02）

**关键决定（June 29）：HITL 不是 jobs 关切、也不是 scheduler 配置关切。** 它自包含在执行目标（agent/workflow）内，由平台服务（Task Center、AMS、Responsibility Management）路由。Jobs 不建模 HITL。

**Schema 方向（Option 2）：job 与 schedule 是独立制品、独立生命周期。**

- **Schedule definition（scheduler 拥有）：** triggers、executionTarget、priority、guardrails。
- **Job definition（Jobs service 拥有）：** id、name、description、author、`schedule`（引用 schedule ID）、`visibility.read` / `visibility.write`。

一个 schedule 可无 job 定义（运行但不呈现）；多个 job 定义可指向同一 schedule（一次执行 → 多个 persona 各自的 job 视图，取代"单 job 内多 persona"概念）。**每个 viewer 看到什么内容**是运行时关切（AMS + 执行目标决定），job 定义只控制"谁在自己列表里看到这条 job"（扁平 ACL）。

**MVP 相关决定：** 一个 job 映射一次执行（无 multi-execution/composite job）；v1 不需要 versioning（Jobs 是 consumer 不是 producer）；按需/惰性解释（用户真正查看某个 run 时才解释，多数 job 从不被查看）；`write` 可能改名为 `authority`/`owner`；steel thread 的关联锚点 = scheduler 发含 schedule ID + correlation ID 的"job started"事件，Jobs 只过滤匹配自己 job 定义的 schedule ID；**TechEd 前须证明两种集成模式：(a) scheduler-triggered 和 (b) event-triggered（经 Agent Gateway）**。

---

## 3. 开发者工作项 / Developer 需要开发的内容

> 本章从 architecture、platform-dependencies、frontend-architecture、publisher-integration、research 等文档中提炼出 developer 实际需要实现/开发的具体技术工作项。标注了当前状态与依赖。**注意：Backend Dev 岗位当前"待补充人员"，Joule Work 计划补 +3 backend developers。**

### 3.1 后端：Slim Backend / Jobs Service（持久化 + relay）

- **构建 Jobs Service（Sidecar，Option B 起点）**：一个 REST/CAP 服务，通过 scheduler 的 hook/plugin 在执行完成后接收 agent 输出，**不在执行热路径**。
  - 复用 Mariyan 团队现有 scheduling service（已覆盖大部分 Option B），需新增：`showAsJob` flag、接收 scheduler 转发 agent 结果的 REST endpoint、job 元数据字段（title、description、assigned user）。
- **Jobs 持久化层（Jobs Persistence）**：存 job 元数据、run references、缓存的 agent 输出、view configs。
  - Open：是否需要 Job Service 短期存储缓存 agent 输出；长期存储用 CLS（Carsten Ziegler 确认为可行起点，需进一步探索）。
- **按需可解释性（On-demand explainability，惰性处理）**：用户打开 job 详情时，才对存储的输出 + traces 触发基于 agent 的解释生成 —— 不预处理、不预存。第一版甚至可以是"即时生成的下载"。
- **Job definition schema（Option 2）实现**：id / name / description / author / `schedule` 引用 / `visibility.read` / `visibility.write`；与 scheduler 解耦（仅 `schedule: <id>` 引用为耦合点）。
- **correlation ID join**：若 scheduler 调 AGW 时带 correlation ID，Jobs 据此把 schedule 定义关联到执行记录（`AgentRouterInvocations` 已持久化完整链）。
- **后端技术栈决策**（研究 spike F-8）：NestJS 维持 vs. CAP 迁移 vs. 拆分 —— 影响 auth 接线工作量（EL-1162 spike）。当前 assistant-srv 为 NestJS。
- **鉴权集成**：JWT 校验（user + technical token）、system-triggered 执行的权限提升（`x-global-user-id`）、scheduled job context 的 refresh token 签发与生命周期。授权在 AGW 层执行，Jobs Service 经 pipeline 继承。

### 3.2 前端：UI 可观测性（assistant-ui）

- **Unified Job View（统一 job 列表，EL-1243）**：用户在一个列表看到自己拥有的所有 job，可按状态过滤。
- **Inspect a Job / Job Detail（EL-1244）**：打开 job 看范围、实时进度、run 历史、当前状态可用动作。
- **Job Status 四状态生命周期（EL-1246）**：Running / Completed / Failed / Needs Attention，用业务用户语言在列表与详情呈现。
- **实时状态渲染**：从新持久化源显示 runs；接入 SSE（活动会话）+ WebSocket（多客户端同步）双通道，进 `routeAGUIEvent()` dispatcher。
- **实现 `STATE_DELTA`（RFC 6902 JSON Patch）**：当前尚未实现，重复发大 snapshot —— 待补。
- **组件目录版本化策略**：为跨客户端的 agent 渲染 UI spec 建立向后兼容策略（当前无，标记 High）。
- **多客户端渲染策略**：为 Joule Work mobile app 定义 core 组件集 + extended 组件的 `textSummary` fallback（spike BE-34）。
- **前端安全**：SSE endpoint 鉴权、动态组件 XSS、CSRF（标记 High）。
- **扩充测试覆盖**：当前约 40 个 store 测试（17 jobs + 23 agui），component 测试待扩充。

### 3.3 AG-UI 协议适配（Publisher 契约）

- **在 backend ingest 边界采纳 `@ag-ui/core`（第一步建议）**：把 publisher API 契约定为"POST AG-UI events 到 `/api/agent/events`"，用 Zod schema 校验入站事件（当前协议边界无校验）。
- **定义自定义事件扩展**：把 `JOB_UPDATED`、`SET_RUN_ID` 映射到 AG-UI `CUSTOM` 事件类型并定义 payload schema。
- **（可选/较低优先级）前端采纳 `@ag-ui/client`**：stream parsing、state tracking、middleware —— 单独评估。
- **A2UI 收敛评估（spike BE-32）**：`ComponentSpec` 是否向 A2UI 声明式 JSONL 收敛以支持跨框架渲染。

### 3.4 Scheduler / HITL 配置集成

- **Scheduler 集成实现为通用 plugin/hook**（而非把 Jobs 逻辑写进 scheduler 核心）：scheduler 触发 pre-/post-execution hook 到已注册 endpoint，Jobs Service 注册为其中一个 plugin。
- **扩展现有 scheduling service**：加可选 job 配置（title、description、assigned user、`showAsJob`）；scheduler 触发 AGW，收到响应后经 hook 转发结果给 Jobs Service。
- **steel thread 关联锚点**：消费 scheduler 发出的"job started"事件（含 schedule ID + correlation ID），Jobs 只过滤匹配自身 job 定义的 schedule ID。
- **两种集成模式（TechEd 前须证明）**：(a) scheduler-triggered；(b) event-triggered（经 Agent Gateway）。event-triggered 的订阅归属与生命周期错配问题需与 Moritz Schramm（AGW）单独讨论。
- **注意：HITL 不在 Jobs/scheduler schema 建模** —— blocking HITL（PE / MANDATORY_APPROVAL / REQUEST_FOR_INPUT）由 AGW/Task Center 处理；non-blocking HITL 由 agent 用 Task Center MCP tools 建 task。Jobs 侧只需在 UI 呈现 Needs Attention 状态 + 提供 typed decision surface（approve / modify / escalate / reject + rationale），并把决定经 callback 回传 agent。

### 3.5 Telemetry 集成（可观测性）

- **消费 CLS（Cloud Logging Service）作为存储后端**：Jobs 在其上构建自己的 UI 层，向 CLS 发查询获取某个 job run 的相关事件。
- **两阶段 telemetry 策略**：Phase 1（steel thread）取现有 telemetry（技术 traces + 偶有业务数据）在前端呈现；Phase 2（front-runner）推动业务级事件标准，agent 发结构化业务事件后 Jobs 自动获得更好数据、无需改代码。
- **业务级事件消费**：采用 CIG 风格的结构化 OTEL log（业务上下文 + trace ID/span ID 技术关联），支持"跨层跳转"（看业务状态、按需下钻技术细节）。**agent/workflow 责任**：想要 Jobs 可见性的可执行体须自行发结构化业务级事件（Jobs 不从技术 telemetry 推导）。
- **按需 trace 处理**：不急切处理/存储所有技术 traces；用户请求可解释性/下钻时才从 CLS 取并处理相关 traces。
- **OctoRoute correlation**：发带 job correlation ID 的 spans 供历史视图（属性名待定，与 OctoRoute 约定对齐）；延迟目标"业务实时"（几秒）。
- **定义 `sap.jobs.*` OTel 语义约定（草案）**：与 CLS/OctoRoute 团队对齐（`sap.jobs.id`、`sap.jobs.run.id`、`sap.jobs.target_user`、`sap.jobs.status`、`sap.jobs.outcome.summary`、`sap.jobs.area`）。

### 3.6 关键跨团队依赖（会阻塞 developer 的外部项）

| 依赖 | Owner | Jobs 需要什么 | 状态 |
|---|---|---|---|
| SAP Build Scheduler | Kristiyan Marinov | 执行 recurring/scheduled Jobs | ADR Proposed；POC 集成已约定 |
| System Trigger API | AI Integration Layer / Joule | 无用户会话的系统触发执行 + A2A callback | 设计完成，实现阶段 |
| Agent Gateway | Nico Haller / Moritz Schramm / Henning Heitkoetter | agent 执行统一入口；**agent 须能在目标 user context 运行** | 进行中 |
| UMS（Unified Metadata Service） | Simon Heimler | 创建 job 时 agent 发现；须与 Joule Orchestrator 集成（经 AGW，非直连） | 洽谈中 |
| Joule Orchestration | Martin Steiner | 非会话 agent 调用 API + 结果 callback（A2A） | 方向 v10/SuperAgent；契约待定 |
| OctoRoute | 待定 | user-specific telemetry | 待定 |
| XSUAA / IAS | Alexander Zubev | 多租户鉴权、身份传播、refresh token | 可用 |
| Unified Outbound Gateway | Nir Kol / Tamir Menahem | 强制出站流量路由（无 opt-out） | 强制 |
| Event Hub | 待定 | 事件驱动 Jobs | v2+ |
| Task Center（HITL） | One Inbox team | 用户不在会话时路由 HITL | v2+ |

---

## 4. 产品模型与场景（Product Model / Scenarios / Use Cases）

### 4.1 Job Model（Job 模型，愿景级）

**什么构成一个 Job —— Outcome Test（成果测试）：** 并非每个对 Joule 的请求都是 Job；满足以下任一即合格：① 之后需要看状态/结果；② 需要可解释性；③ 需要问责（accountability）；④ 执行会超出当前交互（outlives interaction）；⑤ 需要 HITL。都不满足则保持普通会话轮次。

**Job Proposal Flow（提案流程）：** 请求合格时，Joule **不立即执行**，先呈现 Job Proposal（① Scope 范围；② Success criteria 成功标准；③ Autonomy level 自主级别；④ Capabilities 将用的 agent/tool）供用户审阅。**这是审批门（approval gate），不是通知。** 用户批准 → 创建 Job；拒绝 → 回到会话。

**Job 生命周期：** 四个运行时状态 —— **Running / Completed / Failed / Needs Attention**（EL-1246）。**Requested**（提案待定 / confirm-before-activation 门，EL-1249）位于生命周期**之前**，不是运行时状态。

**状态归一化（Status Normalization）：** Jobs 在技术执行信号之上加一层面向业务用户的归一化层。例：agent 工具调用 →"Step 3 of 8: Checking supplier records"；HITL checkpoint →"Attention needed: Invoice #X exceeds threshold"。区分：Explainability（开发者/高级用户级细粒度）vs. Job live status（业务用户简化视图）。

**Job 类型：** One-off（会话触发）、Repeatable（一次性变为可重触发，参数可配）、Standing/Monitoring（持续监控，阈值内自动解决）、Event-triggered（外部事件激活）、Pre-built（SAP 预定义，无需会话配置）。

**自主级别：** Autonomous（全自动，仅异常升级）、Conditional（阈值处审批 checkpoint，暂停/恢复）、Supervised（逐步审批）。

**分层（Layering）：** Skill = 能力（*how*，由执行体调用的最小单元）；Agent / Workflow = 可执行体（*does the work*，peer 关系，Agent 非确定、Workflow 声明式步骤图如 n8n）；Job = 可执行体的"可问责运行"（*observable + accountable* 包装：状态、ownership、HITL 门、审计轨迹，本身从不执行工作）。可执行体可以从不成为 Job；当运行需要可见/被调度/被拥有时才成为 Job。

**用户研究（Potsdam 用户测试，2026-06-05）：** 测了两个 job 监控视图 —— Version A（Clean Card View，**推荐为默认**）、Version B（Technical Log View，作为高级用户可展开细节）。关键发现：业务用户要**成果导向而非执行 trace**；**渐进披露**（技术细节按需下钻）；偏好归一化状态；期待可分享；通过可见性建立信心。

### 4.2 端到端场景（Scenarios —— 循环的"形状"）

三个 walkthrough 演练同一 Jobs 表面的不同组合（如何启动 / 谁运行 / 是否中途拉人）。**每个场景共享的原语：** 一张 Job card（单一可问责单元）、四状态生命周期、plain-language outcome + verifiable sources（EL-1247/EL-1248）、origin provenance、实时进度流到列表。

| # | 场景 | Trigger | 谁运行 agent | HITL |
|---|---|---|---|---|
| 1 | **Custom Agent in Joule Studio** | Joule 中终端用户会话 | 一个 Studio 构建的 agent | 仅 confirm-before-activation |
| 2 | **System-Triggered LoB Agent + Conditional HITL Gate** | Admin 配置的事件或调度 | 一个既有 LoB agent | 条件式中途门（策略驱动） |
| 3 | **Multi-Agent Job with HITL** | 以上任一 | 链式协作的多个 agent | 0/1/多个中途门，可能不同决策者 |

- **场景 1（Custom Agent）：** Developer 在 Joule Studio 创建（purpose、skills/tools、instructions、input schema、**output shape**）→ Deploy（注册进 registry，经 ORD/UMS 可发现，接好 callback 路径）→ 终端用户 Chat（意图匹配到 agent，长任务分流成 Job，EL-1245）→ 有副作用则 confirm-before-activation（EL-1249）→ Job（经 System Trigger API 调用，agent 经 A2A callback 发生命周期事件，Jobs Service 持久化并流式状态）→ Outcome（plain-language outcome + verifiable sources + scope + run history + origin conversation link EL-1254）。**关键洞察：developer 最重的活集中在 Step 1 的 output shape**，它决定 outcome 视图是否可信；Steps 2-5 一旦契约稳定即平台提供。
- **场景 2（System-Triggered + Conditional HITL）：** Admin 把既有 LoB agent 绑到 system trigger（trigger type/params、**policy pack** 阈值、assignee routing、通知渠道）→ 系统触发（assignee 列表出现未主动创建的 Running Job，origin 是 trigger binding 而非会话）→ agent 运行并在决策边界发 decision candidate → **Gate?**（Jobs Service 按 policy pack 评估：auto-continue 或暂停进 Needs Attention）→ Outcome（加 Origin trigger、Gate transcript 或 Auto-continue log 审计）。新增平台重活集中在 Step 1（admin 表面 + policy pack 模型）与 Step 4（阈值评估 + pause/resume 原语）。
- **场景 3（Multi-Agent + HITL）：** 多个 agent 链式产出**一个** Job outcome。人物：Requestor / **Job supervisor**（单一可问责 owner，全程在场但通常不做中途决定）/ **Specialist decider**（各门被拉入的专家，每门可能不同人）/ Collaborators。Supervisor 看到的像单 agent job（一张 card、一个 outcome），链是实现细节；详情用业务语言子步骤（"Order intake → Availability check → Re-allocation proposed"），不暴露 agent 内部。**多决策者原语**：一个 Job 生命周期内多个 decider，各按门被路由。Outcome 含整链 plain-language 叙述 + 全部来源 + 全部决定轨迹 + role-based lenses（同一 Job 记录、不同视图）。

### 4.3 Use Cases（用例 —— 场景的领域实例）

**证据分层：** PoC（有名客户在建）> Candidate（有名 SAP 团队路由来的集成请求，未开建）> Illustrative（合成模式，无干系人）。**当前：Häfele 是唯一 PoC；Ariba（Catman + Supplier Risk）、Banking、SuccessFactors 是 candidate；Plan-to-Fulfill 是匿名工程（candidate 强度）；三个 Finance 页（Margin Review、Accrual Integrity、Late Vendor Invoice）是 illustrative。**

- **Fulfillment Assurance（Häfele）—— Multi-agent + HITL【唯一 PoC】：** Häfele Werk Berlin，S/4HANA Public Cloud。邮件事件（采购订单 PDF 到达）触发 → Sales Operations Agent 抽取 PDF + 建销售订单 → **HITL 门**（若更高优先级客户需更快交付，agent 须决定是否重排/重分配现有低优先级订单）→ 人在决策点被拉入 → 全链持久化。验证：多 agent 链呈现为一个 Job、中途 HITL、多用户在同一 Job 协作、role-based views、**human-executed Jobs 与 agent Jobs 在同一层**（客户明确不要单独的 task 管理工具）。首个客户 workshop：2026-06-30 当周。
- **Ariba Category Management —— Scheduled【candidate】：** Category Manager 在 Joule 内配置 recurring report（报告生成 5-10 分钟，超过 Joule 会话 ~10 分钟超时）。验证：**异步、会话解耦执行是硬需求**；跨 run 完整上下文持久化；Joule 内可配调度（无独立 admin UI）；output-as-link + run 历史；生命周期管理（可停/可编辑，否则无限运行）。
- **Ariba Supplier Risk Monitoring —— Event-Triggered【candidate】：** 供应商风险分越阈 → 评估业务暴露、识别须告警的干系人、生成组织特定缓解建议、可链到其他 agent 行动。事件驱动优于定时（挂 Ariba 既有 recalculation 事件；事件集成未就绪则退回 ~每小时调度）。验证：**autonomy 作为 per-Job/per-customer 配置**（review-then-act vs. autonomous）、agent-to-agent chaining。
- **Banking Strategy —— 三种调度模式【candidate】：** 代码型 agent（BTP Fabric、ORD/URM 注册、AGW 集成）。① 基于先前讨论的会话引导式调度；② 直接调度 recurring 请求；③ 触发式监控告警（市场新闻、费率到期、偏差 >20%、缺关键数据）。外部验证 Job 类型 taxonomy 覆盖真实需求。
- **SuccessFactors User Task Agent —— Scheduled/多渠道【candidate】：** BTP agent，自然语言捕获调度意图，跨 Joule / SFSF Teams app / mobile / email 执行。引入 **manager-for-employee 调度**（第三方 scope：经理为团队安排、员工为自己安排）。集成为 agent-to-agent（经 AGW / MCP-like tooling，不允许直接 API 调用）。Jobs 须建模 ownership + delivery 分离；支持 list/update/cancel。
- **Plan-to-Fulfill（制造，匿名工程，candidate 强度）：** 制造企业在 S/4HANA Cloud Public Edition 跨订单到履约流程部署 LOB agents（Design-to-Operate：Plan-to-Fulfill + Lead-to-Cash）。产品结构从 70/30 标准/定制转向 40/60，人工不可扩展。验证 5-7 个 agent 的多 agent 编排在生产供应链中被 Jobs 呈现、监控、治理。
- **Margin Deviation Review —— Scheduled【illustrative】：** 每周一晨跑；欧洲 BU 毛利偏差 >5% 才打扰用户。验证 scheduled recurring 类型。
- **Accrual Integrity Guard —— Standing/Monitoring【illustrative】：** 分配一次后持续监视 S/4 新过账 accruals/reversals（异常金额、缺反转、重复风险等），异常时才浮现工作。验证 standing/monitoring 类型。
- **Late Vendor Invoice —— Event-Triggered【illustrative】：** 财务关账截止后过账的供应商发票触发 → 判定影响期、量化影响、按会计政策/重要性阈值评估、分类根因、**决策执行**（调整前期/计入当期并披露/升级）→ 生成系统支撑建议。验证 event-triggered 类型。

**共同需求信号（MVP 交集）：** Joule 内用户可配 recurring 调度、跨 run 完整参数持久化、异步执行、与 XSUAA 角色对齐的多租户隔离、list/update/cancel —— 这是五个独立请求的交集。Häfele 另验证 multi-agent + HITL；Ariba Supplier Risk 加事件/阈值触发与 autonomy-as-configuration。

---

## 5. Roadmap 与时间线

:::warning 免责声明
Roadmap 是 Jobs 团队当前想法的时间点快照，未经产品团队验证或承诺，不应作为承诺内部分享，也非面向客户。每一项都可能变动。
:::

**四个里程碑（按序）：**

1. **Milestone 1 —— Munich workshop，2026 年 7 月底** 🟡中等信心。首次端到端实现：用户在会话中触发 Job → 经 Jobs backend 对真实 LoB agent 执行 → Job 出现在列表并显示实时状态。覆盖 MVP Tier 1 的一个切片。Steel thread：Unified Job View（EL-1243）、Inspect a Job（EL-1244）、Job Status 四状态（EL-1246）；拉伸项 Create a Job（EL-1245）。**非协商约束**：真实 LoB agent（S/4 或 SuccessFactors 候选，非 stub）、真实 backend 路径（Joule 触发 System Trigger API，结果经 A2A callback 回来，Jobs Service 持久化并流式状态，EL-1414）。本里程碑明确不含 EL-1247/1248/1249。

2. **Milestone 2 —— TechEd，2026 年 10 月底** 🟡中等信心。面向广泛 SAP 受众的策展外部演示，一个可信场景端到端（非完整 MVP）。候选场景：Custom agent 端到端（Joule Studio，命中双 persona，领先候选）/ System-triggered LoB agent（真实 backend + 条件 HITL 门）/ Multi-agent + HITL（最高野心与风险）。无论哪个：Munich 核心循环在真实 backend 路径可靠；plain-language outcomes（EL-1247）与 verifiable sources（EL-1248）可演示；有副作用者具备 confirm-before-activation（EL-1249）。不含 Tier 2。

3. **Milestone 3 —— MVP-ready（首个客户发布）** 🟡中等信心。发布载体（JW EAC / 独立 beta / 其他 GTM）未定。
   - **Tier 1 —— 核心循环：** Create a Job（EL-1245）、Unified Job View（EL-1243）、Inspect a Job（EL-1244）、Job Status（EL-1246）、Plain-language outcomes（EL-1247）、Verifiable sources（EL-1248）、Confirm before activation（EL-1249）。
   - **Tier 2 —— 信任与控制：** Schedule a Job（EL-1250）、One-click repeat（EL-1251）、Affected objects（EL-1252）、Job Change Log（EL-1487）、Edit a Job（EL-1486）、Copy a Job（EL-1253）、Origin conversation link（EL-1254）、Result notifications（EL-1255）、Remove a Job（EL-1269）。

4. **Milestone 4 —— Post-MVP** ⚪低信心，依赖门控。
   - **Tier 3 —— Power Features：** Stop a Running Job（EL-1256，依赖 System Trigger API 的 cancel 机制）、Dry run（EL-1258，需 agent 侧 sandbox 约定）、Per-run overrides（EL-1259，需结构化参数模型）。
   - **Beyond Tier 3：** 多 publisher 摄取 + 更广 LoB 覆盖（AG-UI 协议采纳）、跨 runtime 统一 runs 视图、Agent-trace 下钻、规模化治理。
   - **与更广 Joule Work 概念对齐（非 Jobs 专属）：** JW-wide HITL、多用户 job 共享与共同拥有（EL-1257，预计建在与 Spaces 相同的 user-sharing 基础上）、JW-wide notification 概念。

**关键日期汇总：** 2026-06-08 Scheduling ADR 发布（Proposed）；06-10~15 S/4 与 SFSF LOB 调度需求确认；06-18 backend kickoff；06-23 Potsdam 架构会（executor 组件、domain model、两数据通道）；06-24 POC 规划（选定 S/4 AR Agent、Option B 起点、Mariyan 麾下虚拟团队）；07-01 与 Priyanka Porwal 谈 telemetry；**2026-09-24 生产目标**。

---

## 6. 读取状态说明

本次通过已认证 gh CLI 读取了 Jobs 版块指定的全部 37 个 Markdown 源文件，**全部读取成功，无 404 或读取失败**。归档（archive）文件（architecture-decision、architecture-summary、backend-reuse-analysis、joule-integration、001/002/003 ADR）多为 Superseded/Historical 状态，其核心历史脉络（Plan A/B/C 起源、Spaces 复用先例、Smart Helper Service 评估、Joule SOR 编排缺口）已并入上文相应章节，不再单列。
