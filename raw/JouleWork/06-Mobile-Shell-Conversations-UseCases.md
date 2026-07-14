# Joule Work / Engagement Layer 文档整理：Mobile、Shell、Conversations、Use Cases、Spaces（项目管理与研究）

> 本文档整理自 SAP 内部 GitHub Enterprise 上 fx-engagement-layer 文档站点的对应版块 markdown 源文件，忠实原文。产品名、人名、技术名保留英文原文。

---

# 一、Mobile 版块

## 1.1 概述（Engagement Layer Mobile）

Engagement Layer Mobile 工作流把 Engagement Layer 带到 iOS 与 Android，覆盖 **Conversations**、**Spaces**、**Voice** 以及 **Foundational**（基础）能力，如应用 onboarding、设计系统、shell 级别的关注点（AI notice、settings 等）。

**目标：**
- 让 Web 上可访问 Engagement Layer 的所有用户，在 Mobile 上也能用到（GA / Early Adopter Care）。
- 提供原生移动体验，让企业终端用户能够随时随地办公。

**子工作流（Sub-Workstreams）：** Product（产品策略、竞品、关键决策）、Architecture（技术架构文档，托管在外部仓库）、Conversations、Spaces、Foundational（共享平台能力：app onboarding、设计系统、auth、推送通知、provisioning）、Voice（对 Joule 说话并听到回应，限于 Conversations）、Telemetry（HEART 框架遥测策略，为 Sapphire 定义 P0/P1 指标）、Field Enablement、Release Notes。

**联系人：** Engineering — Tobias Tresl（E2E Application）；Product — Sandeep Tetali（Mobile EL + Multi Modal）、Thilo Berndt（Voice）；Architect — Thomas Bruckner（Mobile Architecture）。

## 1.2 Cross-Architecture（跨架构）

Engagement Layer 移动应用通过在 **Joule Provider BTP 账户**中直接 provision 的一个专用 **SAP Mobile Services** 实例连接到 Engagement Layer。由于 Engagement Layer 随 Joule 一起发布，该 Mobile Services 实例被作为 Joule 的 SaaS 订阅依赖添加——所有 Joule SaaS 订阅者自动获得，客户或 SAP 运维无需额外订阅步骤。

这与现有的 SAP Mobile Start 场景不同：后者依赖 SAP Build Work Zone 提供的 Mobile Services 实例。Engagement Layer 不需要 Work Zone，SAP-Managed Joule 部署在无 Work Zone 的情况下运行——改用 **Business Content Service (BCS)**（Work Zone 的最小裁剪版，部署到 ATG 层，每个 CRM ID 一次），BCS 只提供 CDM 内容数据库和导航服务。

### 连接与 App ID 区分

Joule Provider 账户中的 Mobile Services 实例可通过 `<tenant>.mobile.<datacenter>.<joule-base-domain>` 访问。配置了专用 app ID **`com.sap.mobile.joule`**。应用 bootstrap 时用 app ID 决定激活哪个后端上下文：

| App ID | 连接 | Work Zone 内容 | Engagement Layer 功能（如 Spaces） |
|---|---|---|---|
| `com.sap.mobile.joule` | Joule / Engagement Layer 直连 | 不可用 | 可用 |
| `com.sap.mobile.start` | Work Zone（现有 SAP Mobile Start） | 可用 | 不可用 |

这在认证时提供了稳定明确的判别依据，无需对后端 API 进行启发式探测，能力协商在应用 UI 初始化前完成。

### 单一应用策略（Single App Strategy）

管理层决定在现有 SAP Mobile Start 应用内交付 Engagement Layer 体验，为 Sapphire 重新品牌化（名称待定，候选 "Joule" 或 "Joule <something>"）。应用在启动时用 app ID 检测连接到 Work Zone 还是 Joule/EL 后端并适配体验。两种连接模式在同一二进制中共存，但每次安装互斥：Joule/EL 连接下不提供 Work Zone 内容（Work Zone 需要 "Site" 概念，而 Joule 在 tenant 级不认识它）。

### Foundational — API 连接

**HTTP 流量：** 移动应用的所有 HTTP 流量都经由 Joule Provider 账户中的 Mobile Services 实例路由。Mobile Services 负责认证（签发并校验移动认证 token）、提供移动平台特性（推送、feature flags、settings），并作为到 Joule Approuter 的 HTTP 代理。代理暴露为专用路由路径 `/joule`（与 Work Zone Mobile Services 集成保持一致的路径命名）。区别：Work Zone 场景依赖 App2App SSO 信任和 token 交换；这里因 Mobile Services 实例在同一 Joule Provider BTP 账户内并共享 Joule 的 identity-service token 实例，无需 token 交换——移动认证 token 已面向与 Joule 服务相同的 audience 签发，可直接作为有效 Joule token 转发给 Joule Approuter。

重要配置：Joule Approuter 已配置为 service2approuter 流程不要求 XSRF token（正是这里所用流程），**此配置不得更改**。它仅作用于 service2approuter 流量，浏览器面向的流程不受影响。

**WebSocket 流量：** 非 HTTP 流量（WebSocket 连接）不经 Mobile Services 路由。因为把持久 WebSocket 连接通过 HTTP 代理会增加延迟并限制可扩展性，Conversations（Joule chat streaming 通道）和 Spaces 都直接经专用服务端点向 Joule Approuter 建立 WebSocket 连接。认证在 WebSocket 握手时用 Mobile Services 签发的同一 token 完成。

### Conversations 与 Spaces（服务侧）

- **Conversations：** Joule chat 功能。服务侧由 **Joule Client Connector** 处理；原来只经 HTTP 端点暴露，现在实际聊天对话已基于 **WebSocket**，支持服务端流式响应，在延迟和连接效率上优于 long-polling。客户端实现见 Joule Mobile Client (JMC) SDK。
- **Spaces：** 新增专用 **Spaces Service** 作为骨干，与 Joule Orchestrator 集成，负责 Space 对象的完整生命周期，并用高度动态的 UI 协议 **GenUI** 生成卡片内容。移动客户端经 Joule Approuter 通信：部分操作走 HTTP（如初始 Space 创建、状态检索），但接收实时内容更新的主要通道是 **WebSocket**（服务端推送增量更新）。

## 1.3 Client Architecture（客户端架构）

iOS/Android 的平台专属与客户端 SDK 架构细节。

**Conversations — JMC Modularization for Engagement Layer：** 模块化 iOS 架构，让 EL 在复用 JMC 会话组件的同时构建自定义线程管理。主架构文档提出 `JouleEngagementLayerAPI` facade 与 6 阶段实施计划；`ViewModel` 缓存重构计划通过 `ConversationViewModelManager` 单例做跨会话 ViewModel 缓存；另有 iOS 与 Android JMC 架构的横向对比分析。

**Voice — Client Connector 变更：** 使 Joule Mobile 支持语音对话的 Client Connector 变更。有对应 ADR（PR #1414，open）与 Epic DAS-53657（覆盖 Kafka 订阅、utterance 转换、历史持久化）。

## 1.4 Conversations / Spaces on Mobile（占位）

- **Conversations on Mobile：** 原生聊天 UI、消息渲染、Joule 交互模式（Apple 平台与 Android）。当前为 stub，待扩展。
- **Spaces on Mobile：** GenUI 与动态工作区如何在移动端渲染与交互。当前为 stub，待扩展。

## 1.5 Charts（图表）

**问题：** 移动端图表当前非交互、慢、资源重，且不符合平台无障碍标准。

**决策：** 在 AioAI workshop 上，BDC 团队同意构建新 SDK 原生渲染 Joule Work 图表内容（见 PDR-F3）。集成架构尚未定义。

**当前状态（Joule Work v3.0.0）：** Conversations 中图表用 Integration Cards 里的 **SVG**（非交互、无触控）；Spaces 中用移动团队自建的**自定义原生图表**。下一步：确定 MVP 并在 Q3 前集成 BDC SDK 为两者供能。

**Chart 类型（Spaces 已支持）：** BarChart、LineChart、PieChart（`variant`: `"pie"` / `"donut"`）。Spaces 通过 `JSON-RENDER` 卡片发送图表数据，参考 spaces-renderer-lib 的组件目录。所有图表共享 prop 结构：`data`（state 绑定 `{"$state":"/path"}`）、`categoryField`、`valueField`、`variant`（仅 PieChart）。

## 1.6 Telemetry（遥测）

基于 [HEART framework](https://www.heartframework.com/)。工具：**Alchemer**（应用内调查，仅移动，PSAT/CSAT、微反馈；定性/态度）、**OpenTelemetry**（分布式 trace、自定义 metrics、spans、logs；定量/行为）、**WalkMe Mobile**（应用内引导、onboarding 流程、事件与漏斗流失分析，仅移动；GA 预计 Spring 2026）。

**Core Metrics：** PSAT、Average Usefulness Rating、Average Ease of Use Rating（以上 Alchemer）；Stickiness (DAU/MAU)、Rate of Return (D1/D7/D30)、Churn rate、MAU、Customers（唯一 tenant）、mobile vs. web 创建的 Conversations/Spaces、App 冷启动时间、Answer Load Time / 交互延迟、Crash rate、Error rate (4xx/5xx)（以上 OpenTelemetry）。

**Extended Metrics：** 正向应用内反馈数、mobile 占 web 使用比、卡片/Space/会话交互、Voice 使用次数、chat vs. voice 端到端耗时、语音会话完成数、每用户使用功能数、Voice 采用率、Onboarding 完成率（数值目标在上线后基线数据收集后设定）。

**Open Questions（摘要）：** Web 当前 OTel 数据发往何处（Mobile 需接入同一 collector）；是否复用现有 Joule dashboard（加 `platform=mobile` 过滤）；如何接入现有 Joule 反馈系统；如何用差异化属性（如 `source=el_mobile`）区分 EL 会话与 Joule web 会话；Alchemer 触发逻辑；WalkMe Insights dashboard 选择及与 OTel 关联；App Store 评分、SAP Community、社媒、支持工单等生态反馈需要独立工具与 owner。

## 1.7 Voice（语音）

语音模式让用户在移动端对 Joule 说话并听到语音回应，限于 Conversations 体验。早期版本在 TechEd 2024 展示。最初探索设备端 STT/TTS，经分析后决定改用**云托管模型**。目标是从首个 release 起在 EL 的 Conversations tab 提供。**高风险：** 需要跨移动客户端、Joule 后端与新云服务的变更，且依赖第三方商用产品。

### 1.7.1 Voice Metering & Billing（计量与计费）

语音引入文本交互没有的基础设施成本：实时音频流（LiveKit）、实时 token 处理、会话编排。区分两个概念：**Metering（计量）**——度量什么（不论是否收费）；**Billing（计费）**——如何把指标转为客户成本。

**概念层级：** Thread（已存在）→ Session（一次连续语音交互，尚不存在）→ Messages（一输入 + 一输出为一条消息，应打 `type: voice` 标签）→ AI Units（部分能力收费）/ Tokens（每条消息都消耗，代表真实算力成本）。

**计量指标：** 语音消息数（`type: voice`）、语音会话数（按用户/线程）、实时模型 tokens、每会话时长。时长拆分为：用户说话时间、系统说话时间、处理时间；处理时间再拆为等待实时模型、等待 Joule 编排。理由：LiveKit 按时长计费（直接成本输入）；消息打标签让现有消息级分析自动适用于语音；接入编排层已有的 time-split，不另建埋点。

**计费成本驱动：** 实时 tokens、LiveKit 基础设施、Joule 编排（+ margin → 客户成本）。选项：Free for all（规模化太贵）、Paid only（阻碍采用）、Freemium（公平使用策略，平衡成本与采用）。计费指标候选：按语音消息、按总时长、其他（tokens/混合/AI-unit 乘数）。

**最新提案（2026-06-22 对齐）：** Joule 编排层升级到 **v10**，引入 **agent actions** 作为新的计费原语。计费流程按输入模式（Text/Voice）与 skill 类型（Base skill 免额外费 / v10 Joule agent action 按次计费）：
- **Premium：** 按 agent action 计费 × voice factor，无上限。
- **Base：** 每个语音 agent action 以更高速率消耗容量（如 factor × 1.05）；容量耗尽后语音完全禁用，回退到文本直到下个计费周期。
- **EAC 期间：** 语音作为 **$0 SKU** 提供给有限 EAC 客户；不施加 factor 乘数；EAC 结束后对两个 tier 施加 voice factor。
- Open questions：cap 在用户级还是客户级；容量单位；确切 factor 值；是否需要独立 SKU；base skills 的 circuit breaker（取决于 v10 迁移时间表，若所有 skill 计划 2027 底迁移完毕则短期可吸收成本）。

### 1.7.2 Voice-Native Output（语音原生输出，需调研）

**问题：** 今天 Joule 把响应作为 JSON 发给外部语音模型（gpt-realtime，经 LiveKit），该模型必须解读 UI 结构（cards、buttons、lists、links）并自行决定说什么。它从未理解原始问题、无推理上下文、必须从技术元数据即兴发挥。随 **v10 编排**与自动发现 skills，编排 agent 将拥有完整上下文，但今天这些上下文被丢弃。

**提案：** voice 团队与 harness/runtime 团队协作，让**上下文感知的 agent 产出 voice-native 输出**（`voice_text`），语音模型只负责让它听起来自然。语音模型仍处理音频流、实时对话、barge-in、语气、节奏——移除的是**解读负担**，不是语音交付。

**先例：** Spaces A2A 集成（PR #1621）已这样做——当 `client_type=spaces` 时 Message Generator 产出双输出（纯文本摘要 + 供 Spaces 渲染的原始 JSON）。

**v10 机会：** v10 可被告知 voice 模式激活（今天 `isVoice` header 停在 Client Connector，未传播到编排层，待 runtime 团队确认）。若 v10 知道在服务语音用户，可以简洁化多步执行、在同一生成 pass 中产出 `voice_text`（边际 token 成本）。

**不提议：** 移除语音模型（LiveKit/gpt-realtime）、移除 FastBrain（填充语）、让 Joule 处理 TTS/音频、重写语音架构。设计上支持优雅降级：语音模型检测到 `voice_text` 则自然交付，否则回退到今天的解读方式。

## 1.8 Field Enablement（现场使能）

**变化：** SAP Mobile Start 已更名并重新品牌化为 **Joule Work**。Joule Work 支持：SAP Build Work Zone（standard/advanced edition）+ 新的 **Joule Work Experience**（EAC Scope（Sapphire 26）推出）。

**原因：** Joule 是 SAP Autonomous Enterprise 的 engagement layer，需要原生移动存在。曾考虑新建独立应用，但高管方向明确：将 SAP Mobile Start 转变为 Joule Work（新建应用会割裂用户基础，转变则保留它）。

**对现有客户影响：** 除应用名与 logo 外，其他都不变（应用内与合同上均不变）。有 Joule 的客户：Joule 成为底部栏的**永久 tab**，无需再点按钮弹出模态。通过应用内通知告知用户改名。

**Joule Work Experience：** 当前处于 **EAC**，计划年内 GA。是新的 AI-native engagement surface（Conversations、Spaces、Voice，由 Joule 供能）。投资方向：Conversations、Spaces、Voice 增强，以及 Jobs 等新功能。

## 1.9 Release Notes — EAC Scope (Sapphire 26)

草稿、高速交付。EAC Scope（Sapphire 26）发布 **Joule Work 3.0.0**，由 **JMC 26.4**（可复用的 Joule Mobile Client SDK）驱动，交付原生 Conversations、Spaces、Voice 与 Foundational 能力（Apple 平台与 Android）。

- **Conversations（部分）：** 输入框重设计、编辑上一条 prompt、type-ahead 建议、@-mention AI 助手、模式选择器、Dictation、附件粘性 pill、复制/重新生成响应、重设计 AI Notice、搜索会话、活跃线程上限从 10 提到 50、Markdown 支持、会话预加载、E2E 性能优化；Android 特有：List/Details 自适应布局、Contained List 样式。
- **Spaces：** 在 Space 内 Ask Joule、从会话创建 Space、从会话导航到 Space（deeplink）、Space 创建时渲染卡片、固定卡片操作、删除卡片、**原生分析图表**（Swift Charts / Android）、错误模式。
- **Voice：** 语音入口、语音控制条、实时转录、静音状态、会话生命周期、EarCons 与音频反馈、麦克风权限、语音会话历史、多语言支持。
- **Foundational：** 设置与偏好（Profile、语言选择、AI notice、站点切换、about/legal、支持、登出）、增强欢迎屏、**Liquid Glass 适配**（iOS 26，Apple 平台）。

## 1.10 Product — 竞品与决策

### 1.10.1 Competitive Landscape（竞争格局）

Engagement Layer 是用户以 AI-native 方式办公的地方——不是 AI 助手，而是工作发生的 **surface 本身**。若 SAP 不拥有这个 surface，它会沦为不可见的基础设施（类比 "Intel Inside")。EL 不必是独立 SAP 产品，只要用户知道在和 SAP 对话即可。

**谁在构建企业用户办公的 surface（engagement surfaces，非 AI 助手）：**
- AI-Native Labs：OpenAI（Frontier、Operator）、Anthropic（CoWork、Enterprise Agents）、Perplexity（Comet 浏览器、Computer）。
- Enterprise Powerhouses：Microsoft（Copilot Tasks）、Google（Gemini 交互式工作区）、Notion（AI 生成 dashboard）、Workday（Sana，$1.1B 收购，明确称 "the front door"）、Salesforce（Slack + Agentforce）。
- Nascent Infrastructure（非竞品，但可能遮蔽 SAP 层）：MCP（开放协议）、OpenClaw（把现有聊天 app 变成入口）。

**新兴模式：** "Front Door" 之争、Agent Delegation（agent 先做第一遍，人复核）、Computer-Use Agents（经 VM 操作现有 UI，当前脆弱，长期威胁）。

**SAP 的护城河（企业智能层）：** Spaces（Generative UI，围绕任务自组装的动态工作区，结构上比聊天界面更难复制）、联邦身份与 principal propagation、agent 授权、无缝 onboarding、agent 可观测性。

**对 Mobile 的意义：** agent 像初级员工准备初稿；出现"从手机远程管理 agent"模式（Claude Remote Control/Channels、OpenClaw）。当 agent 处理第一遍，人剩两项工作：**描述要做什么**和**做决策**——移动端（相机、语音、位置、通知）在这两点上独具优势。

### 1.10.2 Work Tracking Proposal（工作跟踪提案）

**问题：** (1) Mobile 相对 Web 的角色未定义（Web 月度发布、Mobile 季度发布，功能常 Web 优先，Mobile 期望不清）；(2) 没有单一问题真相源（各团队各自 Jira 项目，无跨端视图，Web story 关闭时同一问题在 Mobile 可能仍未解决）。

**核心决策请求：Mobile 是同等客户端（Path A）还是专门化跟随者（Path B）？**
- **Co-Equal Client：** 用户在 Mobile 能做 Web 上的一切（按平台优化），Mobile 参与问题定义，功能从一开始为所有端规划。
- **Specialized Follower：** Mobile 提供专门化子集，能力总在 Web 之后（Web 先发，Mobile 挑选适配子集）。

**建议结构：** 用 **P2S（Problem to Solve）epic** 作跨端真相源。Co-Equal 下单个 P2S 含所有端 AC（scoping 时必填 Mobile AC）；Specialized 下 Web 与 Mobile 各自 P2S（Web informs Mobile）。P2S 持有产品级 AC，Eng/Design 在各自条目补充实现级 AC。示例：Human Oversight of Agent Actions（跨端，Mobile 需可操作推送、单手 review 卡片、离线队列审批）、Voice Session Timeout（Mobile 特有：30s 静默超时、30min 上限、后台立即计时、静音不暂停计时器）。

### 1.10.3 Product Decisions（产品决策记录 PDR）

- **PDR-F1（Decided，2026-03-20）单一应用策略：** SAP Mobile Start 转变为 Engagement Layer 应用，为 Sapphire 重新品牌化。决策者 Frederic Berg、Michael Ameling、Philipp Herzig，**违背团队的两应用建议**。动机：保留现有 1300+ 客户采用、不割裂用户基础。缺点：品牌不匹配、无受控 rollout、Web 与 Mobile 差异、iOS Widgets/App Intents 在某些场景存在于二进制但不可用。未解决：EL 是否仅面向 SAP-Managed 净新客户，还是也面向现有 customer-managed；需要 Mobile Services in Joule（SaaS 模式）、Feature Flag API（判断某 Joule 实例是否可用 EL）、移动客户端支持两种连接变体。
- **PDR-F2（Decided，2026-03-11）Sapphire 支持平台：** 优先 phones，扩展支持 tablets 与 foldables；smartwatches、Vision Pro、widgets 为 north-star 但不在范围。
- **PDR-F3（Under Discussion）经 BDC SDK 原生图表：** 复用 BDC 的原生图表 SDK（Apple 平台用 Swift Charts）而非渲染 SAC 的 SVG，以支持触控、缩放、选择、无障碍。Sapphire 范围支持 Numeric Point/Line/Bar，不支持的回退到 Integration Card；集成架构未定义。
- **PDR-S1（Under Discussion）Spaces rollout：** feature-flag beta vs. EAC 全量，待定。
- **PDR-V1（Decided，2026-02-19）Voice 限于 Conversations：** 不在 Spaces（Spaces 后端仍实验性）。Voice 先内建到 JMC，再带到 EL 的 Conversations tab。
- **PDR-V2（Decided，2026-03-19）特殊输入模式下禁用 Voice：** 激活文件附件、@mention、deep research、space mode 或系统消歧时不提供语音（运行时不支持 intent 到 option 的智能映射）。

---

# 二、Shell 版块

## 2.1 什么是 Shell

UI Shell 是 engagement layer 的基础——shell 逻辑、pane 管理、通知与消息、信息架构——它使能并连接各 Core Experiences，把一切框成一个连贯环境，给用户方向感、连续性和信心。UI Shell 通过安静地把体验维系在一起，让 intent-driven 的工作感觉无缝、扎实。

**联系人：** Tech — Andreas Kunz；UX — Janin Stoess / Wendy Fox；PM — Benedikt Schoelch。前端开发：Petar Skelin、Vladislav Tasev、Sebastian Ried、Nils Christian Ditzel、Christoph Kraemer。支持：Christian Grail（Joule Dev）、Stefan Kirchfeld（Joule Architect）、Peter Muessig、Martin Schaus（Architect）、Stefan Beck（PM）。

## 2.2 Shell UI（Application）

- 代码仓库：GitHub `DAS/shell-ui`。
- 技术概览：tbd（待补）。

## 2.3 Shell Architecture（架构）

- 主 Shell 架构文档（也覆盖 spaces、conversations、assistants/jobs 等 "apps" 的集成方面）：`DAS/architecture` 的 `ADRs/2026/DT-Shell-UI.md`。
- 新增 "app" 的具体信息：`DAS/shell-ui` 的 `docs/adding-a-new-app.md`。
- **注意：** Engagement Layer 只嵌入少数定义良好的 apps（如 spaces、conversations、assistants/jobs）。它**不是**一个新的 FLP，不允许把各种 apps 和页面都集成进来参与其中。

## 2.4 UX Design

- Source of Truth（Figma）：UI Shell 2.3 —— 任务跟踪、幻灯片、对齐空间与研究协作。
- 详细组件：Pane Management（Left/Focus/Right Pane 行为，已实现）、Main Navigation（左侧导航、通知、设置，已实现）、Pane Bar（Left/Focus/Right Pane 操作的 header bar，设计定稿中）。
- 对齐推进：Onboarding（各 Core Experience 团队的 onboarding 探索、推荐与设计原则，归属不明）、Notifications（对齐进行中）、Settings（对齐进行中）。

## 2.5 Visual Design

- **FX UI Kit：** Engagement Layer 专属组件与主题化。Owners：Siyana Dicheva / Jens Maurer。
- **Theming：** 即将推出。

---

# 三、Conversations 版块

## 3.1 什么是 Conversations

Conversations 是 Engagement Layer 中人性化的对话 surface，用户在此表达意图、探索想达成什么。它提供连续的对话，跨 SAP landscape 连接理解、引导与结果。作为核心交互空间，Conversations 塑造用户如何思考、提问和行动——把工作变成持续的交流而非孤立的步骤。

**联系人：** UX — Michael Krenkler、Ciera Raines；Tech — Stefan Kirchfeld。PM — Paula Spietenborg、Aaron Pinkwasser（Joule PO）。后端开发：Christian Grail。支持含 Jean-Yves Guyomarc'h（Joule Engineering Lead）、Martin Steiner、Eyal Liebermann（Joule Architect）、Andreas Kunz、Peter Muessig 等。

## 3.2 Conversations Architecture（架构）

主架构文档覆盖 webclient 集成进 EL shell、panel 布局、组件目录、webclient bridge、构建与部署等：`DAS/architecture` 的 `ADRs/2026/DT-EL-Conversations-UI.md`（EL Conversations Frontend Architecture）。

## 3.3 场景：Consumer Grade EL Conversation Demo（5 分钟演示）

一个业务用户在 Engagement Layer 中与 AI 助手协作——提问、补充上下文、通过来源验证答案，并把对话转化为有组织、可信赖的知识库。端到端旅程：

1. **开始对话：** 打开 EL，落在 Focus Pane（干净、无干扰）。输入并发送 prompt。**关键信息：** 零配置即刻获得价值。（起始 prompt 示例："Research the most interesting AI trends for SAP customers on the web"）
2. **验证来源：** 点响应中的 #1 在新 tab 打开外部页面；返回后打开 Sources panel 展示所有引用来源。**关键信息：** 透明与信任，用户可随时核验信息来源。
3. **编辑 prompt：** 把 "SAP Customers" 改为 "BASF Customers" 并重新生成。**关键信息：** 迭代快速无摩擦。
4. **管理会话：** Pin 新会话；把标题从 "AI trends for SAP Customers" 重命名为 "AI trends for BASF customers"。**关键信息：** 会话成为可轻松组织的长期知识资产。
5. **搜索会话：** 搜索 "AI trends"，展示跨历史快速定位。
6. **显示排序选项：** 在 Manage 区域展示排序选项。
7. **打开全屏 Joule 与新会话：** 从主 pane 菜单新建会话；关闭 Manage 区，打开全屏 Joule。
8. **拖放添加附件：** 把 Finance Scenario PDF 拖入会话补充上下文。**关键信息：** 助手能处理你自己的内容。
9. **分析文档：** 发送 "What are the top 3 risks in the deal"，等待分析附件并给出响应。
10. **复制响应：** 复制关于 top 3 风险的响应。**关键信息：** 答案可立即行动。
11. **~~交互式业务查询~~：** （"Show me my Sales Orders" 等多轮上下文查询——dry run 中不稳定，暂跳过。）
12. **显示输入框菜单：** 展示帮助构建和增强 prompt 的可用选项。
13. **切换到 Space Mode：** 演示对话如何演进为结构化、协作式工作区。**关键信息：** 会话只是开始，Spaces 更进一步。

---

# 四、Use Cases（用例）

## 4.1 Returns Clerk（退货处理员，S/4HANA Cloud Public Edition）

**Persona：** Carol，退货与退款处理员。主应用 Manage Customer Returns v2（F4832）；相关应用 Customer 360（F2187A）、Customer Return - Return Rate（F4092）、Display Product Availability（F7884）。典型退货 1-5 项（可达 100+）。

**当前工作流（As-Is）痛点：** Edit 模式在错误层级（对象页 header 而非 item 级）；Apply 与 Save and Release 分两步；强制字段无视觉标记（follow-up activity 强制却无星号，只能靠报错发现）；"Determine Refund" 难找；检查库存需切换到 Availability Overview 应用再返回（无内联库存可见性）；审批流程不清；旧版无批量操作；return reason 无业务强制（分析价值高但常被跳过）。关键决策点：处理员对退货单的决定决定整个下游流程（credit memo vs. replacement、物流、仓库路由）。

**Space 设计（To-Be）：**
- **入口——两步会话→Space：** Carol 在会话中提示 "Show me open returns for customer Inlands" → 系统在会话中返回列表 → "I want to process the first one" → 系统 "I have prepared a space for it, do you want to proceed?" → 确认后 Space 打开。轻量发现在会话中，深度处理在 space 中。
- **Space 结构：** Section 1 Overview（Card 1 Customer 360、Card 2 Items Summary 表/carousel、Card 3 Return Order Header）；Section 2 Return Items（每 item 一张 carousel 卡片，refund/replacement 翻转，AI 推荐选项为默认视图）；Section 3 More Information（Card 9 Process Flow、Card 10 Linked Documents，外部导航打开 SO/Invoice/Delivery）。
- **动态布局规则（Items Summary）：** 1 项单张富卡片；2-5 项带微图表的表或卡片列表；5+ 项显示 top N 可展开；15+ 项先聚类再下钻。
- **关键设计决策：** 推荐优先、按需解释（Info 按钮触发 LLM 基于库存/退货原因趋势/历史模式解释）；每 item carousel 带默认推荐；header 与 item 分离；表看全局、卡片做决策；客户信息是上下文而非动作；完成态给 "Well done" 确认。
- **Spaces 消除：** 4+ 应用间切换、edit-mode 困惑、库存查询绕路、不清晰的审批流、靠报错发现强制字段、手动判断退款策略。

**所需数据：** 退货单（ID/状态/日期、客户 ID、退款进度、参考/后续文档）；item 级（产品、数量、退货原因、退款类型/百分比、follow-up activity、不完整状态）；Customer 360（名称、ABC 分类/VIP）；库存（Availability Overview）；计算/聚合（每产品退货率趋势、退货原因分布、AI 推荐动作）。

**演示范围（In Scope）：** 单客户、单退货单、5 项；两步会话入口；AI 推荐 + Info 解释；carousel + select-and-prompt 批量 + 会话精化；完成确认。**Out of Scope：** credit memo 审批流、多客户一 space、drop-ship 退货、大批量（100+）。

## 4.2 E2E Example HR — Anika（HR Manager，SuccessFactors）

**场景：** 周一早上，30 分钟后开 ops 会，Anika 说 "Show me everything I need to act on this week for my team - hiring, onboarding, and any pending approvals."

系统捕获意图与上下文（会话、用户 profile 权限/组织范围、SuccessFactors 数据、近期活动），生成 Space "My HR Actions This Week"，含三 section（Critical Hiring Actions、Onboarding This Week、Pending Approvals），7 张卡片（Text/Table/KPI/Detail），带紧急指示（⚠️ 阻塞、↑ 负向趋势）。

**交互演示：** 下钻 Abby 的 IT 阻塞（生成 Detail 卡片，Trigger Manual Sync）；刷新 offer 状态（拉取 SuccessFactors 最新数据，状态变 Approved，出现 Start Onboarding）；用 prompt 加卡片 "Am I over budget on compensation approvals?"（生成预算 KPI 卡片）；给卡片点赞反馈（AI 学习纳入未来 space）；删除卡片（reflow 布局）。**自动保存：** 检测 30 秒无操作 + 导航离开后自动保存 space 状态。**重访流（下周一）：** 打开 space，检测数据陈旧（7 天），刷新所有卡片（反映本周动作）。

## 4.3 E2E Example S4 — Maria（AP Accountant，S/4HANA Public Cloud）

**场景：** 周三 2PM，4PM 有自动付款运行，Maria 说 "Get me ready for today's payment run - show me any blocked invoices and supplier issues I need to fix before 4 PM."

生成 Space "Payment Run Readiness"，含三 section（Blocked Invoices、Supplier Master Data Issues、Payment Run Overview），带倒计时与优先级标记。**交互演示：** 一键 Release Payment Block（调 S/4HANA 移除付款块，更新多张卡片，省去导航到 F0712 的 5 步）；下钻更新供应商主数据（嵌入表单填银行信息 Save 到 S/4HANA）；prompt 查供应商付款历史（生成表格卡片）；Rerun Payment Proposal（触发 S/4HANA 删旧建新，更新汇总卡片）；删除趋势卡片。自动保存并记录节省约 25 分钟。**重访流：** 检测本周有新付款运行，提供"查看上周结果"或"为今天新建 space"。

## 4.4 EAC use cases（客户高频应用与 utterances）

- **Bosch top 应用：** Manage Supplier Invoices (F0859)、Supplier Invoices List v2 (F1060A)、Manage Supplier Line Items (F0712)、Manage Journal Entries - New (F0717A) 等。
- **Schneider Electric top 应用：** Kanban Board (F4630)、Find Maintenance Order (F2175)、Manage Maintenance Notifications and Orders (F4604)、Display Journal Entries (F7697) 等。
- **对应 OData 服务清单：** 记录了每个应用对应的 OData 服务（如 F0717A → UI_JOURNALENTRY_MANAGE、F0712 → FAP_VENDOR_LINE_ITEMS_SRV、F2343 → QM_INSPLOTMNG_SRV 等）。
- **Utterances（基于 2 个 OData）：** 大量针对 Journal Entries（UI_JOURNALENTRY_MANAGE，用于 F0717A/F7697）与 Inspection Lots（QM_INSPLOTMNG_SRV，用于 F2343/F4630）的自然语言查询示例，并附结果数与专家评论。关键洞见：需明确 Journal Entry 视图 vs. line item 视图（line item 属性如 CostCenter 应用 F2217 展示）；金额务必带货币（CoCode 1010 为 EUR）；避免用无人认识的技术编号（如 CB998... 用户名）；无限制条件的查询可能返回海量结果（如 "created by SAP_SYSTEM in 2026" 返回 1,220,738）。

## 4.5 Research（研究）

### 4.5.1 Product Experience (PX)
PX 反馈是持续改进数字产品的输入，遵循 Product Standard **CDE 17**，作为 SAP 产品收集反馈的标准方式。范围：EL 内触点（Conversations、Spaces、Jobs）；机制：应用内调查、评分（产品满意度）、自由文本；事件驱动与可选用户发起；集成下游分析系统。**Out of scope：** 支持案例管理、EL 外反馈、客户自管场景。技术基础设施：PX Clients（嵌入式 widget/SDK）、PX API、Processing & Storage、Consumption & Integration。数据保护：数据最小化、始终匿名化/假名化、透明、安全处理（need-to-know）、按 SAP 全球保留策略保留删除（符合 GDPR）。团队：Nils Reger（Dev Mgr）、Martin Dauer/Ingo Rues（PM）、Niels Hebling/Katharina Seiz（Tech Lead）、Charlotte Schmalzbauer（UX）。

### 4.5.2 UX Research & Measurement（验证研究）
含 AI Measurement Pyramid 与 MVP Metrics 框架。验证用例：S/4HANA Returns Clerk（原型完成，含 As-Is Figma、To-Be 原型、vibe-coded 原型、live demo）；SFSF Learning & Development（Employee，文档完成）、Compensation Planning（Manager，文档完成）；Assistant/Jobs 工作流自动化（demo 可用）。团队：David Takacs（Tech Lead）、Sophia Levelns/Emil Voutta（UX）、Ellie Kemery/Eric Mahlstedt/Leonie Dietterle（User Research）。

### 4.5.3 Exploration — Work on open return orders（前端原型规格）
一份给 UI/UX Designer + 前端开发的 prompt 规格：为 S/4HANA Cloud（Public Edition）创建"Return Order Detail Page"高保真交互原型。技术栈：单 HTML 文件 + Tailwind CSS (CDN) + Vanilla JavaScript。布局：Header（订单 #60002341，Save Draft/Confirm All）、Unified Customer Context Card（客户档案 + 关键指标含 mini bar-chart/gauge）、Session Progress Card（暗色，环形进度 donut，估算退款总额）、5 张交互式 Item Card。Item Card 含数量输入、退货原因下拉、Refund/Replacement 分段切换；View A（Refund 滑块 0-100% 动态算金额）、View B（Replacement 库存检查 + Trigger Replacement）。5 个具体场景数据（标准、数量拆分、缺货、低价值、欺诈锁定卡片）。JS 要求：实时计算、进度跟踪、Confirm All 汇总模态、优雅处理缺失元素防崩溃。风格：Slate 灰做结构、Blue-600 主操作、Green/Orange/Red 状态、xl 圆角、SaaS 美学。

---

# 五、Spaces — 项目管理与研究

## 5.1 Project Setup（项目设置）

**里程碑：** M0（Jan 12-23 Palo Alto Onsite，概念设计细化 + 技术实验）；M1（100 天，EAC Scope（Sapphire 26），初始交付与价值证明——用 SAPUI5、Fiori Elements、Gen UI 资产构建统一 EL 原型 + demo 环境）；M2（H2/2026，MVP release，为两个先锋 LoB 产品交付最小可行体验 + 首版 compositional design system）；M3（Beyond 2026，规模化到 Tier 1 产品、发布 UX floor plans、经 SAP Build 提供可扩展性）。

**Spaces Workstream 团队：** Leads — Eric Bratter（Tech）、Matthias Roos/Marisa Wollner（UX）、Kirsten Ott（Project）；PM — Jean-Luc Terree、Aadil Kumar；后端 — Eric Bratter、Sebastian Schlunke、Daniel Wetzel、Luca Kaiser、Anita Okoh、Kevin Pontes、Ali Alagrami、Anton Niadzelka；支持 — Tobias Queck（Architect）等。

## 5.2 Ceremonies（仪式，2 周 sprint）

Week 1 周一 Sprint Planning（2-3h）；周二至周五每日站会（全体 20min / UX 30min）；周四 Backlog Grooming（1h）。Week 2 每日站会；周四 Grooming；周五 Sprint Review/Demo（1-1.5h）+ Retrospective（1h）。

## 5.3 Backlog Principles（Backlog 原则）

**Epic 结构——可关闭的特性 Epic：** epic 是可关闭特性，范围 2-4 sprint 完成，完成即关闭，新需求 = 新 epic。Jira 前缀 `[SPCS]`。示例：Space Creation E2E (EL-1128)、Data Pipeline — Enrichment & Refresh (EL-1131)、Card Interactions (EL-1132)、Conversation↔Space Linking (EL-1133)、Write Operations/Actions (EL-1134)、Agent-Triggered Spaces (EL-1113)、Compliance & Release Readiness (EL-924)。

**Issue 类型：** User Story（有人能看到结果，actor-visible）、Backlog Item（纯技术使能，须链接到它使能的 story）、Bug。判断法："能否给 stakeholder 演示？"能则 User Story，否则 Backlog Item。

**Release 跟踪：** fixVersion = 何时发布（如 `2606a` May 27 dev close → Jun 23 全 tenant）。Sprint planning 从 fixVersion 拉取。2 周 sprint 对齐 Joule MD dev close 的周三。

**User Story 分片：** 交付新价值的最薄垂直切片，1 sprint 内完成。需要其他团队未知时间的变更、或部分可独立有用则拆分；全部完成前无法演示则合并。

**Definition of Done：** (1) 代码合并到 main；(2) 在合适 feature flag 后；(3) 受影响服务 JRQ 通过；(4) 有/更新 Xray 测试；(5) 在 dev landscape 测试。完整 DoD（User Story）含 11 项：What&Why、UX、Architecture、Dev、Test Tasks、Quality、UX Sign-off、User Assistance（Draft/Final）、PM Sign-off、Compliance。

**其他：** 右 altitude（Epic / User Story / Backlog Item / Sub-task）；跨团队依赖是 blocking links 而非 epic；标签（`el_p2-high_priority`、`el_p3-nice_to_have`、`el_functional`、`el_ux-relevant`、`el_visual_support`、`mcp-jira`）；一个 backlog 一个真相源（Jira，Component `EL_Spaces`，无影子 backlog）。

## 5.4 Bug Report（如何报 bug）

克隆 bug 模板 EL-595 → 调整（Priority、Component 已是 `EL_Spaces`）→ 填描述字段（Environment: Dev/Staging/Pre-Prod、Steps to Reproduce、Actual/Expected Result、Version 即 commit hash/build/部署日期）→ 尽量附截图或 console 日志。

## 5.5 Product Standards — Requirements（产品标准）

各标准 owner 与状态（截至 Apr 17, 2026）：ACC 无障碍（N/A，12 个月例外，可上线后交付）；BC（Done）；CDE Cloud Delivery Excellence（进行中）；DPC（进行中，ECCN catalog）；FC Functional Correctness（进行中，见 test scenario）；GLOB 全球化（静态文本 6 语言交付中，动态翻译待定）；INTG（进行中）；OS/ILM（Sirius 未开始）；PERF 性能（已准备但 **blocked：无测试 landscape 可运行**）；SEC 安全（WIP，SEC_VAL 经 Joule 中心运行）；DPP 数据保护隐私（未开始）；SLC 软件生命周期（未开始）；UA、UXC 等。其他工作流：ACD（架构概念文档，威胁建模与 ECCN 前置）、Threat Modeling（未开始，须与 Joule 联合，强制）、SEC_VAL（Joule 中心处理）。关键工具：Sirius（Product Standards Dashboard）、Product Standards MCP `hs-psr-remote`（经 Claude Code 查需求）。

## 5.6 Product Standards — High-Level Test Scenario（测试场景）

10 个用户场景及期望行为：(1) 首登开 Spaces（列表 2-3s 可见，10 卡片 space 加载不超 3s）；(2) 从 prompt 创建 space（1-2s 内反馈、5-8s 首张有数据卡片、20-30s 全部生成、渐进出现、标题图标自动生成）；(3) 重排 space（拖放 60fps、reflow 即时、重命名 <200ms、删除即时、reload 后持久）；(4) 向已有 space 加卡片（已有卡片稳定无 layout shift、新卡片渐进）；(5) 会话/space 模式切换（即时、无整页刷新、不丢 prompt）；(6) 重开数天前 space（3s 加载、从存储渲染、数据保持创建时状态）；(7) 系统慢/降级（有意义状态更新每 5-10s、UI 保持响应、>2min 超时错误清晰）；(8) Returns Clerk 完整工作流（SAPPHIRE demo，30s 生成、15-20 行表流畅滚动、follow-up 上下文感知、业务可读数据、整体 <2min）；(9) 同集群并发用户（互不拖慢、无租户间数据泄漏、WebSocket 隔离）；(10) 长会话稳定性（无性能退化、WebSocket 自动重连、无内存泄漏）。

## 5.7 Product Standards — Performance (PERF-01)

**测试类型：** 单用户性能测试、负载与可扩展性测试（都含首版 baseline 与回归）。**工具：** SUPA + Playwright（单用户）、MUPA + JMeter（多用户）、IPA + Cloud Logging（交互式分析/存储可视化）。**测试用例：** TC-PERF-001 Space 列表加载（3s 内可见）；TC-PERF-002 Space 加载（≤10 卡片 <3s）；TC-PERF-003 Space 生成（1s 内反馈、6s 首张有意义卡片、30s 全部、渐进）；TC-PERF-004 增量加卡片（6s 内渐进、生成时可交互已有卡片）；TC-PERF-L01 并发用户负载（用户/活动与资源消耗线性）。备注：纯 UI 操作（resize、rename、remove）当前阶段不计入；首版取 baseline，含 E2E 响应时间与 CPU/内存资源消耗；有意影响性能的新特性需重新取 baseline。

## 5.8 Releases（发布）

- **Capability Releases：** 仅有标题占位（无内容）。
- **Platform Releases（Joule Exceptional MD 2606 release）：** 列出 Spaces 组件版本（spaces-agent、spaces-auth-service、spaces-card-generation、spaces-jop、spaces-management-service、spaces-s4-enrichment、spaces-subscription-controller、spaces-ui、spaces-capability 1.0.5 等）。**所需 Feature Flags：** `ff_x_el_spaces_integration`（主 Spaces 发布 flag，Spaces 模式开启时路由 prompt 到 Spaces capability）、`ff_el_shell_spaces`（Shell 渲染右侧 Spaces panel，缺失则 UI 不可见）、`rt_x_spaces_card_refresh`（经 refresh handles 刷新卡片数据，缺失则重开显示陈旧数据）、`rt_x_spaces_onb`（onboarding 流）、`ff_el_spaces_card_gen_v2`（v2 卡片生成流水线）。Landscape 集成测试：DEV/STAGING 已部署并测试通过，PREPROD/INTPROD/PROD 未部署。

## 5.9 Research — Joule Tools Landscape（Joule 工具全景）

映射 Joule 为 EL 提供的现有与计划工具：
- **BKG Virtual Scenario Provider（生产）：** 当前生产 VSP。两方法：Search（自然语言找 ≤10 个工具）、Execute（从 toolId 建 OData READ 查询）。提供 OData 端点发现、entity set 识别、属性选择、基础 filter、跨 LoB 覆盖。**局限：** 只读、属性选择过宽、无 annotation 感知（返回原始码 `Status: "02"` 而非可读描述）、无显示提示、无 action 信息、结果完整性不确定。
- **Predefined Joule Scenarios（生产）：** 用于写操作，手工创建、确定性执行、已测试。局限：范围有限、无扩展路径（须手工编写）、静态。
- **Tools-Bridge VSP（PR #7，进行中）：** Tobias Queck 引入，包装 `@sap/sh-tools-bridge` 经 Joule VSP 暴露。Discovery 用 LangGraph ReAct agent（tools-bridge 作 MCP 工具，导航 apps→pages→tools）；Execution 走确定性 tools-bridge 流水线（toolId 反序列化 → enableTools 加载 OData 元数据/annotation → 执行，无 LLM）。相比 BKG 新增：写操作、draft 感知、annotation 感知元数据、动态工具生成、参数 value help、人在环 Adaptive Cards、可扩展到任意 Fiori app。**缺：** discovery 用 LLM（非确定）、无表格/列表数据检索、无 header/detail 可视化、时间线不确定、仅 S/4HANA、单系统聚焦。
- **Tools-Bridge Visualization Extensions（table-viz/header 分支）：** 新增 DisplayHints 语义类型系统（currency-amount/code、unit、code/description、timestamp/date 等，含 displayWith 与 textArrangement）、丰富 TableColumn 列信息（name/label/displayHints）、object page 的 HeaderInfo/HeaderFacets、带 annotation 的数据 fetch（$expand 文本关联）。解决 BKG 显示原始码的局限（`Status: "In Process (02)"`）。
- **Enterprise Search via Tools-Bridge（不确定）：** core 库有 ESH 全局工具，但是否经 VSP 暴露待 Tobias Queck 确认。
- **Joule Data Orchestrator API 现状（2026-03）：** 单一自然语言端点（为 demo 建）。数据检索可用；re-trigger handle 会/已返回；但 action 元数据、确定性 action 执行、丰富元数据（display hints/列）、分页、write-back 均**不支持**。

**Spaces 集成要求：** 源无关抽象（Spaces 与具体数据源解耦，全经单一编排接口，理想是 Joule）；数据 + actions 一次响应（收到业务实体时已知可用动作，避免二次 NL 查询不可靠）；action 执行流（用户查询→编排返回数据+动作→Spaces 生成带动作按钮卡片→点击发送 action ID+参数→编排解析执行）；卡片生成组合由 Spaces compositor/agent 负责（非 Joule）。**Drop-In Replacement 策略：** 建一个模仿 Joule 当前 API、扩展更丰富元数据、支持并行开发、反哺为规范、可透明替换的替代品（若管理层决定用它发布而非 demo，需产品标准与治理审查，尚未决定）。风险：Sapphire 时间线（Joule 在 Sapphire 前不会有 action 执行或丰富元数据）、两条发现路径不一致、无产品标准审查、Joule 集成阻塞。

## 5.10 Research — Data & Actions Discovery with BKG and Joule

描述用 BKG 与 Joule 做数据与动作发现/执行的分阶段实现，弥合到 BKG 提供全部能力前的差距。**理想态：** BKG 提供 OData 端点 + 数据经 Joule 取 + 含 actions 的元数据 + 经 Joule Orchestrator 执行动作。**现状：** BKG 有效做端点发现，但不返回完整 UI annotation 元数据、可用 actions、业务流程信息（EKX GA 才 2026-10）。

**四阶段：** Phase 0 PoC（Spaces 全责，经 destination 直连 BKG/S4，用 spaces-process-mcp 工具）；Phase 1 Demo（Joule 转发 BKG 并返回 endpoint URL，Spaces 仍取元数据/提动作/经 Joule capability 执行）；Phase 2 Beta（Joule 编排为主，Joule capability 做元数据 fetch/action 提取/搜索/确定性执行，Spaces 极简）；Phase 3 GA（BKG 返回 endpoint+data+metadata+actions，Joule 确定性执行，Spaces 透传）。**设计原则：** 不依赖业务流程信息（无可靠服务）、迭代式增量构建 UI、复用现有 BKG 能力、迭代迁移（先逐个能力移到 Joule，最后移交编排）、以 Phase 0-2 为 BKG 需求发现过程。现有工具：spaces-process-mcp（`get_bkg_tool_for_app_action`、`get_odata_endpoint_from_bkg_tool` 仅 Phase 0；`get_s4hana_odata_metadata`、`search_odata_metadata` Phase 0/1）。

## 5.11 Research — Information Retrieval Sources for S/4HANA

评估能使能自动 UI 生成的 S/4HANA 数据源：
- **BKG：** API 已可用、集成 Joule 编排、经 NL 做端点发现；但描述不足以供 LLM 推理、返回实体过多、无 annotation/actions、未暴露业务流程。
- **EKX（Enterprise Knowledge Explorer）：** 返回业务流程分步描述 + Fiori app 名 + 各步 NL 动作描述；但无 OData 端点/技术 API 映射，**API GA 2026-10**（当前用浏览器 cookie 变通）。
- **EARL：** 含业务流程数据（BKG 内部已用），有 API 但无搜索功能，EARL 团队不计划做搜索服务；Spaces 若用需自建搜索。
- **S/4HANA OData Metadata：** 提供完整 actions 与 annotations；但需事先知道查哪个服务、无业务流程上下文、须动态解析。

**能力对比：** OData 端点发现（仅 BKG）、业务流程步骤（EKX/EARL）、Fiori app 映射（EKX/EARL，BKG 部分）、OData annotations/actions（仅 S/4HANA 元数据）。**PoC：** 实现 MCP server（spaces-process-mcp）组合 EKX（流程步骤/Fiori app）+ BKG（端点发现）+ S/4HANA 元数据（完整 OData 信息），当前用 EKX 浏览器 cookie 变通。下一步：切到 EKX API、定义目标结果格式、部署 PoC、定义 agent 架构、评估 EARL 可行性、向 BKG 传达详细需求、明确 Beta 部署策略（若 EKX 未按时发布）。

## 5.12 Research — S/4 Enrichment in KG Capability / Assistant

提供 KG preselection 集成，把自然语言查询转为 OData 调用并可选做 UI enrichment。**系统别名：** `TRANSLATION_SYSTEM`（DYN_KG，NL 转 OData 查询参数）、`BACKEND_SYSTEM`（DYN_JLD，执行 OData 请求）、`UI_ENRICHMENT_SYSTEM`（DYN_TOOLS_BRIDGE，用 UI 元数据 labels/descriptions 丰富）。**功能链（YAML capability）：** `kg_virtual_scenario`（入口）→ `kg_function`（从 transient state 提取 lob_id/tool_id/userInput 并初始化）→ `kg_orchestration`（依赖解析 hub，当前仅 base case）→ `call_translation`（POST TRANSLATION_SYSTEM `/tools/execute` 得 service/endpoint_url/is_count；若 `lob_id == 'S4_PUBLIC_CLOUD'` 调 enrichment）→ `call_odata_enrichment`（递归多阶段：start→metadata→completed，POST UI_ENRICHMENT + GET BACKEND 元数据直到完成）→ `call_backend`（GET BACKEND_SYSTEM，45s 超时，记录 timeTaken，按 is_count 返回全量或 body）。

## 5.13 Research — Spaces-Joule-KG Integration Current Limitations

（draft，2026-03-30）当前集成局限：(1) Joule filter 识别有 false positives（"5 return orders" 被解读为带 Return 标志的 sales orders）；(2) 返回的属性是可过滤的技术码而非业务用户期望看到的可读标签（拟用 UI enrichment service 解决）；(3) KG VSP 的 prompt 未足够引导到 UI OData 服务，返回用户无权访问的 API 级服务导致空成功响应（拟加提示 "Using latest version of SAP Fiori app"）；(4) 空响应仍渲染 5 张误导卡片；(5) 频繁超时无结果（条件未明）；(6) 无法检索可用 actions（拟用 UI enrichment service）；(7) 无确定性方式重触发 action 或强制数据刷新。

## 5.14 Product Management — Dynamic Spaces Scenarios

**Dynamic Spaces：** 让用户即刻组装目标明确的工作区（跨多个 SAP 数据源的卡片集合），处理复杂跨模块任务，替代在 5-8 个 Fiori app 间导航。7 个高价值场景（每个有专属 S/4HANA Cloud Public Edition Fiori 应用映射的详细文档）：
1. **Disputed Invoice Resolution**（争议发票解决，Finance AR）——AR Accountant。
2. **Stock-Out Investigation**（缺货调查，Supply Chain）——Supply Chain/Material Planner。
3. **Production Order Exception**（生产订单异常，Manufacturing）——Production Planner。
4. **Complex Service Request**（复杂服务请求，Service Management）——Service Manager/Field Technician。
5. **Employee Transfer / Reorganization**（员工调动/重组，HR 跨职能，需 SuccessFactors Employee Central 集成）——HR Business Partner/Admin。
6. **Manual Clearing**（手工清账，Finance AR/AP/GL）——AR/AP/GL Accountant。
7. **Post Outgoing Payment**（登记付款，Finance AP）——AP Accountant/Cash Mgmt。

**通用设计原则：** Event-triggered（响应具体情境而非常驻 dashboard）、Cross-app/Cross-module（跨 3-5+ SAP 模块，消除切换）、AI-customizable（经自然对话增删筛选重排卡片）、Decision-oriented（卡片支持具体判断/动作）、Role-aware（AI 按角色与授权预选卡片）、Situation-aware（每个 space 首行含 Summary 卡与 Actions 卡，秒级理解并行动）、Temporal（一次性、任务完成即归档丢弃）。文档结构：Situation、Cards in the Space、Required Business Roles、Data Sources（OData/CDS）、Example AI Agent Dialog、Card Examples（ASCII 线框）、Actions。

---

# 六、开发者相关技术要点

以下从 mobile 架构、shell 架构、product standards、spaces research 中提炼对 developer 有意义的技术要求与约束：

1. **移动端连接与认证架构：** EL 移动应用经 Joule Provider BTP 账户内的专用 Mobile Services 实例连接；HTTP 走 `/joule` 代理路由（因共享 Joule 的 identity-service token 实例，**无需 token 交换**，token 可直接转发给 Joule Approuter）；**Joule Approuter 的 service2approuter XSRF 关闭配置不得更改**；WebSocket（Conversations chat streaming、Spaces 实时更新）**不经 Mobile Services**，直连 Joule Approuter，握手时用同一 token 认证。App ID（`com.sap.mobile.joule` vs `com.sap.mobile.start`）在启动时决定后端上下文，两模式每次安装互斥。

2. **BKG/KG 的核心局限直接约束 Spaces UI 生成：** BKG 只读、返回技术码而非可读标签、无 annotation 感知、无 action 信息、结果完整性不确定，且 KG VSP 的 prompt 未引导到 UI OData 服务（拟加 "Using latest version of SAP Fiori app" 提示）。开发时需通过 UI enrichment service（tools-bridge）用 `@Common.Text`/`@Common.ValueList`/`@UI.TextArrangement` annotation 解析码→标签，并提供 DisplayHints（currency/unit/code/description、displayWith、textArrangement）。

3. **数据+动作的架构原则：** Spaces 必须与数据源解耦（全经单一编排接口，理想 Joule）；数据与可用 actions 应在**一次响应**中返回（避免二次 NL 查询不一致）；action 执行需**确定性路径**（action ID + 参数，无 LLM）——这是 Joule 当前缺失的能力（分 Phase 0-3 逐步移交）。tools-bridge 执行侧已确定性（enableTools 加载 OData 元数据），但 discovery 侧仍用 LLM（LangGraph ReAct，引入非确定性/延迟/成本）。

4. **Definition of Done 与发布约束：** 代码合并 main + 在合适 feature flag 后 + 受影响服务 JRQ 通过 + 有/更新 Xray 测试 + dev landscape 测试。Spaces 发布强依赖多个 feature flag（`ff_x_el_spaces_integration` 主 flag、`ff_el_shell_spaces` Shell panel、`rt_x_spaces_card_refresh` 刷新、`ff_el_spaces_card_gen_v2` v2 生成流水线）。fixVersion 决定发布节奏，sprint 对齐 Joule MD dev close。

5. **性能量化门槛（PERF-01）：** Space 列表 3s 可见、≤10 卡片 space <3s 加载、生成 1s 内反馈 / 6s 首张有意义卡片 / 30s 全部且渐进出现；首版取 baseline（含 E2E 响应时间与 CPU/内存），后续回归对比，有意影响性能的新特性需重新取 baseline。当前 PERF 被"无测试 landscape"阻塞。

6. **Shell 集成边界与 Voice/v10 演进：** Engagement Layer 只嵌入少数定义良好的 apps（spaces、conversations、assistants/jobs），**不是新 FLP**，新增 app 遵循 `DAS/shell-ui/docs/adding-a-new-app.md`。Voice 依赖云端实时模型（gpt-realtime via LiveKit）+ FastBrain，计费随 Joule v10 的 agent actions 原语演进（voice factor）；voice-native output 提案主张让上下文感知 agent 产出 `voice_text`（当前 `isVoice` header 停在 Client Connector 未传播到编排层，待 runtime 确认），支持优雅降级。
