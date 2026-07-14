# Joule Work / Engagement Layer —— General（Tech Foundation）技术基础与其它版块

> 本文整理自 SAP 内部文档站点 `fx-engagement-layer` 的 General（Tech Foundation）版块及顶层杂项页面。忠实原文，未编造。所有列出的源文件均成功读取，无读取失败文件。
> 术语/产品名/人名保留英文。

---

## 1. Joule Work / Engagement Layer 总体简介

（来源：`docs/index.md`）

**是什么**：Joule Work / the Engagement Layer 是一个智能、统一、用户感知的体验框架（experience framework），通过意图（intent）、上下文（context）和对话式 AI，把用户连接到 SAP 内外的各种能力。它改变了工作方式，将任务（tasks）、洞察（insights）和内容（content）统一到一个动态信息架构中。交互模型的核心是：用户通过意图行动、获得主动式支持、并与面向任务的智能体（task-oriented agents）交互，这些智能体可跨用户的整个应用套件执行操作。

**战略背景（Strategic Context）**：
- 业务驱动：为 AI 时代重塑企业级 UX，将 SAP 定位为企业 AI 交互的领导者。
- 市场机会：每个客户都提出需要统一体验、减少上下文切换。
- 竞争定位：SAP 对"聊天之外的企业 AI UX 是什么样"这一问题的回答。
- 技术转变：从以应用为中心到以意图为中心；从预定义式（prescriptive）到生成式（generative）UI。

**Demo 链接**：
- Joule Work Playground: `https://engagement-layer.eu12.sapdas-dev.cloud.sap/new/conversations`
- 需申请 CAM Profile（AI DAS development subscriber enduser）：`profile_uuid=FA163E3CFEC41FD18494DC7891644000`

**术语澄清**（来源 `docs/content-and-asset-support/faq.md`）：Joule Work 与 Engagement Layer 是同一件事，Engagement Layer 将命名为 "Joule Work"。它当前不替代 Fiori Launchpad / SAP Start，而是补充它们。

### General 版块维护方与主要联系人（`docs/general/index.md`）
- 该版块由 **Tech Foundation** 子工作流维护（Engagement Layer 工作流的一部分），也涵盖 Compositional Design System 团队。
- Architecture 主联系人：Axel Schroeder；Product Management 主联系人：Florian Buech；Cross Architecture：Christian Hengstler、Damian Lion Tran-Maring。
- 覆盖主题：系统目标架构、性能、可观测性、IAM、provisioning、UI 技术策略，以及公共依赖（Joule、SAP Build Work Zone、SAP Mobile Start/Mobile Services、Task Center、ANS）、系统景观与数据源。

**Messaging 术语规范**（`docs/general/messaging-terminology.md`）：SAP 交付两类体验：
- **Application Experiences**（应用体验）：来自 S/4HANA、SuccessFactors、Analytics Cloud 等的事务性/分析性应用（system of record），描述词用 "SAP and customer-built"、"familiar"、"with pre-defined UIs"。
- **Engagement Layer Experiences**（Joule Work 体验，复数）：AI-native、agentic、generative；包括 Joule Conversations、Joule Spaces、Joule Jobs、Joule Studio 以及规划中的 Joule Discover。
- 应避免的术语：Static UIs、Transactional UIs、Classic UIs、Traditional UIs、Existing UIs、AI-generated UIs、Dynamic UIs、New/Old UIs（原文给出了每个术语被排除的理由）。

---

## 2. 系统目标架构总览

（来源：`docs/general/architecture/*`）

### 2.1 目标架构总述（`architecture/index.md`）

架构仍在演进中（work in progress），取决于 GTM 策略的开放问题与其他 All-in on AI 交付项的可用性。

**GTM & EAC Scope（Sapphire 26）范围**：
1. Joule 为用户提供 "Try out new Experience" 入口，打开 Engagement Layer UI（web）。
2. 并行的移动 App 连接 Joule 平台，提供一致的移动体验。
3. EL UI 为业务用户提供熟悉的 Joule 对话体验，同时引入生成式 UI（"Spaces"）。
4. 初期允许业务用户通过 Knowledge Graph（KG）与 S/4 Public Cloud、SuccessFactors 交互。
5. 开发者可在 EL UI（仅 web）访问开发者体验，基于 Build Core Services 构建应用与智能体。

**Provisioning（SAP-Managed 目标架构）**：EL 需要三个 blueprint —— **SCI、Account Profile、Joule Work**。Build Core 可通过 test/canary blueprint 独立 provision 做早期验证。Sapphire 是否支持 Inline Provisioning 尚不确定，否则需通过 SAP for Me 手动执行。当前 E2E provisioning 因 URM / SAP for Me 触发错误受阻（DP Query、Agent Gateway 也有 provisioning 失败）。

**ANS & Task Center 与 Joule 范围**：ANS 与 Task Center 作为 SAP-managed 服务在 Sapphire 范围内，LoB 可 provision 使用；但 Joule → ANS/Task Center 的直接集成排在 Sapphire 之后（post-Sapphire），以降低交付风险。6 月 1 日聚焦：通过 Agent Gateway 的 agent 调用，以及 EU11/US/India 的 E2E 就绪。

**Customer-Managed 目标架构**：尚未定义的场景包括 —— 带 Work Zone 的客户管理 Joule、不带 Work Zone 的客户管理 Joule、以及 SAP-managed Joule 搭配客户管理 Work Zone（BCS 与 Work Zone 的 CDM/Navigation Service 冲突、APG 中的 ANS 与 Work Zone 内 ANS 冲突）。

### 2.2 Content（内容架构，`architecture/content.md`）

- EL 通过 **Common Data Model（CDM）** 消费各产品的应用集成内容，联邦到中央 **Business Content Service**，作为所有 EL 客户端的单一真相源。
- CDM 是 SAP 标准化 JSON 格式，描述业务应用、导航意图、所需角色、可视化等；产品通过标准化 **CDM Replication API** 成为 **CDM content provider**（遵循 Product Standard INTG-01R2）。
- 关键假设：CDM 包含导航意图、应用元数据、角色要求；provider 支持内容变更的 push 通知；内容更新与租户生命周期变更自动反映；集成由 SAP 管理，经 **formations** 完成，客户无需配置。
- 组件：Business Content Service（联邦 CDM、管理 formation 类型、经 SPII 创建 destination/content channel、经 CDM Replication API 同步、与 SCI 集成做角色映射与授权过滤）；Product Tenants（暴露 CDM Replication API、实现 SPII 建议 v3、参与 EL formation、共享配置、发送 push 通知、处理 formation 生命周期事件）；SCI；Formations。
- **授权模型（两层）**：① CDM 角色定义（设计时，定义"需要哪些角色"）；② SCI 用户-角色分配（运行时，"用户拥有哪些角色"）。Business Content Service 在客户端消费 CDM 时执行授权过滤，仅返回用户 SCI 角色匹配 CDM 角色要求的内容。
- 术语：CDM、Formations、SCI、SPII（Service Provider Integration Interface，自动化配置交换与信任建立协议）。

### 2.3 Navigation（导航架构，`architecture/navigation.md`）

- 目标：跨应用/业务上下文的无缝转场；核心是 **Intent-Based Navigation（IBN）**，通过语义意图（如 `Product-display`）在运行时基于用户上下文解析为具体 URL。
- **Navigation Service** 是中央解析器，消费 Business Content Service 中的 CDM 导航意图定义，根据设备/表单因子/授权/可用集成选择最合适的应用版本。
- IBN 流程：意图定义（产品经 CDM Replication API 注册意图）→ 内容联邦 → 意图触发 → 解析请求（客户端携带意图+用户上下文，经后端 API 代理）→ 目标解析（匹配 CDM 目标、按授权过滤、按设备上下文选优、解析 URL 模板参数）→ 导航执行（移动端 deep link，桌面端 web URL）。
- **角色级解析**：与内容授权同样的两层模型（CDM 设计时角色定义 + SCI 运行时角色分配），经 SCI 身份联邦实现目标应用的安全 SSO。
- **URL 模式/Deep Link 要求**：CDM 中可定义灵活 URL 模板（path/query/hash 及组合），基于 **RFC6570 URI Template** 标准。**常见误区**：并非必须使用 hash-based 路由（Fiori Launchpad/UI5 那样）；Navigation Service 可解析任意 URL 模式。原文给出了 Path-Style、Query-Style、Hash-Style 三种示例及完整 CDM JSON 示例（`sap.joule.space.app`）。
- 集成模式：Joule Conversations、Spaces and Cards、Mobile Deep Linking（返回移动 deep link scheme，OS 路由到原生 App，不可用则回退移动 web）。
- 开放问题：目标临时不可用/被移除时的回退机制；如何支持客户自研应用的自定义 URL 模式；如何通过预解析/缓存优化导航体验。

### 2.4 Notifications（通知架构，`architecture/notifications.md`）

- 基础设施：**SAP Alert Notification service（ANS）**。通知来源主要是 LoB 产品、Joule、Task Center。使用 IBN 做 deep linking，Navigation Service 按用户上下文（移动/桌面）解析 URL。
- 关键假设：UI 客户端必须支持 deep linking（应用需在 URL 中管理其状态，path/query/hash 均可）；Joule 已在其它场景与 Navigation Service 集成 IBN，可复用。
- **通知流程**：注册（Joule 作为 CDM content provider 注册导航意图如 `space-display`）→ 事件触发（space 创建时 Space 创建服务向 ANS 发送通知）→ 意图引用（通知携带意图与参数如 space ID）→ 投递（ANS 经用户偏好渠道投递）→ 导航解析（用户点击后经 Joule 后端到 Navigation Service 解析 URL）→ deep linking。原文含 mermaid 时序图。
- **实现计划状态**（✅ 完成 / 🔄 进行中 / ⬜ 未开始）：
  - Navigation Service：✅ 支持 REST API 意图解析。
  - Joule Backend：⬜ 成为 CDM content provider、⬜ 定义 CDM 导航意图、⬜ 实现 SPII、⬜ 暴露 REST 端点接收意图+参数+设备上下文并代理到 Navigation Service、✅ 已集成 Navigation Service（其它上下文）、⬜ 返回解析 URL；通知启用：⬜ 建立 Joule 与 ANS 的信任连接（Joule 双重角色：通知 provider + 通知 consumer，含 approuter 与 SPII 适配）。
  - Joule Spaces Service：⬜ 与 ANS 集成定义通知类型与渠道并在 space 创建时发布通知。
  - Task Center：✅ 与 ANS 集成定义 HITL 事件通知类型；🔄 建立 Task Center 与 ANS 信任连接。
  - ANS：✅ 投递带 intent 引用的通知；🔄 对 provider/consumer 实现 SPII。
  - Web Client：🔄 集成 ANS 复用通知面板/横幅、🔄 集成通知设置组件、⬜ 处理通知事件与点击导航。
  - Mobile Client：⬜ 实现推送/应用内通知显示、⬜ 处理事件与点击导航。
- 开放问题：客户管理集成中信任配置如何处理；Sapphire 之后需支持客户管理场景（客户管理 Joule 中的通知/HITL、SAP-managed Joule 集成客户管理 Work Zone）。

### 2.5 Task Center（`architecture/tasks.md`）

- Task 是需人工完成的离散工作单元；来自 LoB、n8n、agents 等的任务聚合到 **Task Center**，形成统一 inbox，通过 Conversations 在 EL 内访问。
- **Provisioning 与集成**：SAP Managed Task Center 通过 Account Profile blueprint provision，**每个 SCI 租户单例**。通过 UCL formations（"Integration with SAP Task Center"）与 task provider 集成。
- **Task Provider 要求**：必须是 SAP Managed；遵循 adoption guide；支持 inbound IAS App2App（INTG-02R5，保证 Task Center 可用主体传播调用应用 SPI）；如需 "push" 能力则支持 outbound IAS App2App（INTG-02R6）。
- **n8n 集成**：Task Center n8n node 允许 n8n 工作流创建任务（支持标题、描述、指派人、截止日期、元数据）。⚠️ 主体传播依赖仍在开发中的可复用凭据组件。
- **HITL/Agent Gateway 集成**：经 "Integration with SAP Task Center" formation。
- **Conversations 能力**：Task Center 在 Conversations 中呈现任务，需与 Joule 经 "Integration with Joule" formation 集成并设置主体传播。⚠️ Joule 团队尚未承诺能在 Sapphire 时间线实现所需 SPII 流程。
- **通知**：Task Center 与 ANS 经 "Integration with Notification service" formation 集成。⚠️ 从通知到 Conversations 任务详情的 IBN 定义进行中。

### 2.6 Work Zone 内容兼容（Brownfield，`architecture/compatibility/wz_content/*`）

- **待解决挑战（challenges_to_solve.md，Prio 1）**：客户今天用 SAP Mobile Start + SAP Build Work Zone，采用 Joule Work 后希望继续使用 Work Zone 内容（Business Apps、Tiles、UI Integration Cards、Advanced Workspaces、Custom Content）。因此 Work Zone 及相关服务必须成为 Joule Work 的 "Content Providers"。步骤：SAP-Managed Joule 在 SAP for Me 选择并设置与客户管理 Work Zone 的集成 → 在 Work Zone Admin UI 选择要消费的 Site → App 经 App2App 通信消费内容。同时需解决 ANS 与 SAP Task Center 这类"聚合服务"的重复与映射问题（客户管理与 SAP-managed Task Center 共存/合并任务、共存 ANS、通知抵达正确的移动 App）。
- **PM Sync（PM_input.md，2026-04-17）**：为 PAL Week 2 架构 workshop 收集 PM 指引，聚焦 Sapphire 之后 SAP-managed Joule 与现有客户 landscape 的兼容性与 North Star。要点：单一 Joule 移动 App 决策；Web/Mobile 共享上下文是硬需求（Conversations/Spaces/Jobs）；通知对移动体验至关重要；一 App 约束（Mobile 上 WZ 内容与 Joule Work 不能并列）；HITL 动作应始终在 Jobs 中出现；SAP-managed Joule 必须是客户 landscape 之上的一层，客户不应被迫手动升级环境；需明确少量高价值场景优先级并明确短期范围外内容；GenUI 内容需可解释（来源、可回溯到源系统）。

---

## 3. 系统景观、数据源与依赖

### 3.1 System Landscape（`docs/general/landscape.md`）

- **开发环境（BTP Accounts/Spaces）**：EL 托管于 **Joule Dev landscape**；通过 CAM Profile 申请 **EU12 Dev landscape** 访问（`profile_uuid=FA163E3C...`）。
- 测试 URL：`engagement-layer.eu12.sapdas-dev.cloud.sap/new/conversations`。
- Engagement Layer Account：Subdomain `engagement-layer`，Subaccount ID `c25a00fd-08a7-406d-ae34-f1418c0f8215`。
- Spaces Service（GenUI）：Kyma 集群，Namespace `sapdas-kyma-poc`。
- IAS 租户：`uxecollaboration.accounts400.ondemand.com`。
- S/4HANA Public Cloud：PoC 默认 JLD 系统（测试用户 administrator / Welcome1!，含创建个人业务用户步骤，推荐角色 SAP_BR_INTERNAL_SALES_REP、SAP_BR_PURCHASER）。
- **关键缺失/不完整依赖**：Joule Mobile Client 不可用（Mobile Services enablement 待办）；Notifications 不可用（需将 ANS 嵌入 Joule provider account，约 1 PD）；与 SAP Build Work Zone editions 不兼容，限制 SAP-managed Joule 场景兼容性（影响 WZ 内容、Mobile Start/Joule Mobile Client 体验、既有 Task Center 与 Notification 集成）；KG 的 Metadata Enrichment Route（experimental）需嵌入 Joule/Spaces；LiveKit 在 Joule 不可用，故 Joule voice 不可用。
- **强制要求**（验证客户级场景）：部署最新 Joule Dev 版本；在 Joule provider account 嵌入配置 Mobile Services；S/4、SF、CX 配置连接到 Joule；KG 为 Joule 启用并与 S/4、SF 集成；在 Joule provider account 嵌入配置 ANS。
- **Joule 特性兼容要求**：客户管理 Work Zone 连接（客户管理 Joule 需要，SAP-managed 不兼容）；Business Content Service（SAP-managed Joule 需要，客户管理不兼容）；Task Center（两者都需要）。

### 3.2 Data & Content Sources（`docs/general/datasources.md`）

EL web/mobile 客户端构建在 **Joule orchestrator** 之上，Joule 提供的所有数据源最终对 EL 客户端可用。当前 EAC Scope（Sapphire 26）聚焦：基于从 **Knowledge Graph（KG）** 经 Joule orchestrator 检索的数据生成 Spaces（GenUI）。

已知内容源（多数状态为"待测试"）：
- **Knowledge Graph（KG）**：访问 Product APIs、CDS views、OData、Fiori Applications 等（见 SAP MCP Server List）。
- **Joule Scenarios**：低复杂度、窄范围业务动作，是编排的基本构件（事务性/信息性/导航性/分析性）；设计时 artifact 推送到 Joule 团队验证，落地 Artifactory，运行时经 UMS/Formations 解析。
- **Document Grounding**：客户上传文档（如 HR/差旅政策）丰富信息类用例。
- **SAP Analytics Cloud**：客户特定数据模型的分析类问题所需。
- **Joule Skills**：客户实现的技能，填补 SAP 交付事务能力的功能空白。
- **BDC**：Data Products。
- **AutoSQL**：提供 OData 之外的非 API 内容访问。
- **UMS**：如 BTP Fabric 的 Code Agents。
- **MCPHub**：经 Joule MCP Client。
- **UI Integration Cards**：作为 Joule Scenario 交付。
- **Navigation Targets**：IBN 供 Joule 缩小意图范围并提供导航目标；可注册为 Work Zone foundation services（navigation service、content service、CDM store）中的 IBN 目标，经 content service 的 content channel 注册并存入 CDM store；部署到 HTML5 app repository 的应用自动注册导航目标（见 INTG-01R2）。
- **Work Zone Content**：访问 Work Zone 静态内容。

### 3.3 Links（`docs/general/links.md`）

开发仓库：Engagement Layer Shell Architecture、`DAS/shell-ui`（外层 shell，加载 EL 各部分）、`DAS/webclient`（Conversation/WebClient）、`DAS/spaces-ui`、`DAS/assistant-ui`。EU12 Dev Landscape 经 CAM Profile 申请。

---

## 4. IAM 身份与访问管理

（来源：`docs/general/iam.md`；注：因 2026-03-03 EL Business Users 与 Developers 的 GTM 策略合并，部分内容已过时。）

**目标与愿景**：
- **EL for Business Users**：经 Joule 交付，遵循 Joule 的 IAM 策略；客户管理 Joule 租户下自动可用，但预期先以 feature toggle 面向选定客户。Sapphire 初期，选定 S/4 与 SFSF 客户需与一个共享 Joule 租户建立信任；支持现有 3SL/2SL 客户 landscape（与套件的信任）；对未使用 Joule 的客户依托 SAP-managed Joule 工作流自动建立信任。
- **EL for Developers**：需从公共 playground 登录到客户环境的无缝旅程，包括：单一登录 URL（支持 Sapphire 大规模用户，QR code）；自动用户路由（Discovery，按 email 域名检测客户，路由到公共 playground 或企业租户）；无缝迁移（用户及其内容从 playground 迁到企业环境）；**Customer Data Cloud（Gigya, CDC）** 用于社交登录（因 SCI 不支持社交登录）。

**待澄清点**：自动用户路由（IDP discovery）与跨身份租户的内容自动迁移当前不支持（属长期 "Identity Renovation Program" 目标）；SCI 与 CDC 混合场景；Joule 能否处理数千用户同时登录；能否自动迁移用户内容。

**IAM 会议要点（2026-02-27）**：
- EL_dev 与 EL_bu 架构互补不冲突，采用同一服务架构（可能用不同服务子集），可用不同 AppRouter。
- 单域登录到客户 landscape/prod（QR code）在 Sapphire 不可行（需 email 域名验证、区域识别、SAP 提供客户 IDP 查找基础设施，均需客户 opt-in）。替代方案：SAP 自有 demo playground（不登录 prod）。
- **负载能力**：Sapphire playground 需处理 20k+ 同时登录，登录流 CDC → IAS → XSUAA → AppRouter 存在瓶颈，IAS/XSUAA 速率限制可能需临时提高，需在 Sapphire 前验证。
- **SCI 整合**：SCI 作为中央身份骨干，CDC 作为社交登录扩展。各 **Line of Business 应用必须实现将角色复制到 IdDS** 的功能，实现 SAP-managed 中央角色复制，替代客户管理的角色复制到 IPS & SAP Build Work Zone。若 S/4、SFSF、Build 在 Sapphire 前完成角色复制，客户将无需在 Work Zone 设计时工具手动映射角色。
- 决策选项：Option 1（Sapphire 就合并 EL_dev & EL_bu，共享服务架构 + 单一 UI 客户端 + 全量部署，需全架构 SAP-managed）；Option 2（Sapphire 前保持分离，共享服务架构但独立 UI 客户端 + 最小部署）。

---

## 5. 交付与发布

### 5.1 Delivery（`docs/general/delivery.md`）
- Joule 的 provisioning 与运营由 Team Runtime 负责；Manager：Reddy, Srinivasa B R；PO：Sumeet Kumar。
- Deployment & Release / Artifacts & Distribution / Process & Lifecycle：均为 tbd。

### 5.2 User Access / Rollout（`docs/general/rollout_access.md`）
- **Web Client**：EL 随 Joule 交付，产生 Joule 租户专属 URL：`%joule-tenant-url%/resources/%engagement_layer%/index.html`。Joule Web Client 通过相对 URL 在新标签页启动 EL（`<a href="../<engagement_layer>/index.html" target="_blank">`）。当前无全局 URL 计划，考虑客户专属 URL（如 `company.joule.cloud.sap`），初版不在范围。
- **Mobile Client**：tbd。

### 5.3 Sapphire Demo Setup（`docs/general/sapphire-demo.md`）
- Sapphire demo 必须跑在 **INT-PROD**（Joule Internal Production）集成 landscape，**不是 Staging**（最新 shell/conversations 状态未能完全传播到 Staging）。
- Demo URL 必须带 `?botName=sapphire_spaces` 参数（标准 bot 被 Signavio 阻断且不含所需能力）：`https://joule-internal-prod.eu12.sapdas.cloud.sap/new/spaces?botName=sapphire_spaces`。
- Demo 用户示例：`eileen.amos1@bestrunsap.com`（密码在 PassVault）；底层 S/4 系统 BB6（client 100）。
- 已完成工作：部署带 Spaces/KG 能力的新 Digital Assistant；集成租户 onboard 到 Spaces onboarding service；将 enrichment flow 从 IAS token 切换为 XSUAA token；webclient 支持 `botName` 请求参数并部署到 Int-Prod/Staging。

### 5.4 Early Adopter Care（EAC，`docs/early-adopter-care.md`）
- **项目**：The Autonomous Suite Experience EAC（合并了 Joule Studio 2.0 + Joule Work（含 Joule Work Desktop）+ Autonomous Domain Agents + Joule Innovations）。Program Leads：Martin Grasshoff、Boris Andree。
- **状态**（截至 2026-06-30）：提名已关闭（2026-06-19，506 份注册）；Wave 0 客户 Bosch、Schneider Electric（备选 Mars、Piller Blowers）；RTC 目标改为 2026-07-16；EAC 期 2026 年 7/8 月 – 11 月 30 日；目标 GA 2026 年 9/10 月。
- **关键细节**：SKU 8021813（$0 EAC SKU，随 FUL 免费）；仅面向 SAP-managed Joule（"the BOX"）客户；最多 100 客户；前置条件 S/4HANA Cloud Public Edition（强制）+ SAP-managed Joule（2026-07-15 前 GA）+ 非生产与生产 landscape（经 IAS）；区域 EU11、US。
- **EAC 范围内特性（Sapphire 26 / 7 月中发布）**：Conversations & Spaces（含 AutoSQL 与 KG、用户生成只读 Spaces、动态组合式 UI、移动/web 创建）；Joule Work Desktop（Mac/Windows 原生应用，可独立提供供早期测试）；Mobile（iOS/Android，由 SAP Mobile Start 更名，含语音模式与持久聊天）；Skills（AI Skills Catalog 无代码构建）；Joule Innovations（Agentic Thinking v10、Skills catalog、Business content service）。
- **不在 EAC 范围**（8 月起可用）：Discover（8 月）、Jobs（8 月）、Multi-user spaces（9 月）、Spaces 写回（8 月）、多系统支持（8 月）。
- 治理：AI RIG（AI Research & Innovation Group）中央编排；SAP Engagement Coach 作为客户单一联系人（1:2-3 账户）；EAC Steering Committee（投票成员 Steffen Pietsch、Mark Smith、Markus Albrecht、Thorsten Leiduck）。
- 反馈三阶段：Discovery Evaluation（Pre-RTC）、RTC/EAC（Customer Validation Framework）、Productive Use（Post-GA），全部集中到 Aha!。
- 开放问题：EAC（11/30 结束）与 GA（10/1）时间线不一致；EAC→GA 迁移路径；组件 RTC 未达标处置；Brownfield 客户需 CMJ→SMJ 迁移（Joule 不能两次连同一后端）。技术依赖识别：production 部署需 GitHub.com/GitHub Enterprise（可访问互联网）。

---

## 6. 质量：可观测性、性能、Bug Bash

### 6.1 Observability（`docs/general/qualities/observability.md`）

- **范围**：跨 UI 客户端、(spaces) 服务、Joule 与 AI agents 的端到端洞察，是排障、透明度、metering、审计日志、监控、可解释性（explainability）的基础能力。
- **标准**：**OpenTelemetry（OTel）** 是 SAP 商定的观测标准，需在 EL web/mobile 客户端、Joule 技术、底层平台服务一致启用。参考 OpenTelemetry GenAI/Agent Spans/MCP 语义约定、CPA Telemetry 语义约定、SAP 对 OTel 的扩展。All-in on AI 决策含 Observability Framework 与 Observability Filtering and Routing。
- **Frontend & Client**：React/Next.js 今天没有 React 专用 OTel 标准库，需用标准 OTel browser SDK + 手动埋点（业务场景与 agent workflow 需手动 span）；Mobile Start 尚无 OTel collector，Mobile Services 需提供 OTEL 支持（进行中）。
- **Routing & Infra**：AppRouter OTel 支持处于 PoC；目标方向 Collector as a Service + 经 **OctoRoute** 路由遥测；AppRouter 可作为 Telemetry Proxy（尤其对 React 客户端）。
- **数据保护**：敏感数据**不得**记录；DPP 相关信息需 **data masking**；用户级追踪边界、匿名/假名标识使用属开放问题；自动埋点需谨慎审查（默认可能采集超出允许的数据）。
- **Explainability**：讨论中的 Explainability Service（Joule 的一部分），目标向用户呈现功能级 trace 信息（数据从哪来）而不暴露底层技术细节，属对齐的 90 天计划；EL 客户端需要它，将等待 Joule 结果以避免重复。
- React 深入：可用标准 OTel browser 库 + 自动埋点（HTTP、page load、用户交互）+ 对 React effects/应用逻辑的手动埋点；典型 setup 含 SDK/exporter 层、自动埋点、自定义 span API 层。实现前必须澄清数据保护约束。

### 6.2 Performance（`docs/general/qualities/performance.md`）

- 性能被理解为 AI 驱动用户交互的**端到端体验质量与系统可靠性**。EL 作为分布式复杂产品之上的 agentic 体验，用户交互、数据查找/访问及 UI 生成能力预期需要大量 LLM 请求，性能是成功关键。
- **范围**：用户感知体验性能、系统可观测性与遥测。
- **现状**：首批生成体验耗时数秒；**尚无性能测量到位**。
- **观测与遥测作为基础**：EL 依赖深度结构化遥测来管理性能 —— 捕获用户动作/导航路径/任务流是一方面，对 Joule 与 Spaces 后端的埋点更重要；用 **OpenTelemetry** 实现前端到后端端到端追踪，并作为持续学习与系统改进（而非仅诊断）的输入。

### 6.3 Bug Bash（`docs/general/qualities/bug_bash.md`）

- Jira Dashboard 是 Bug Bash 参与、triage 与发布就绪的单一真相源。
- **强制模板**：所有 bug 必须克隆标准模板 **EL-500**（保证字段完整、标签正确、不被 triage 遗漏；非模板创建的 bug 可能不正确出现在 dashboard 并被排除在发布决策外）。
- 过滤器：P0 Blockers、P1 Critical、P2 High Priority、P3 Nice to Have、UX Relevant、Functional、Visual Support、Labels、Components、JQL。
- **Go/No-Go 检查表**：所有 bug 用 EL-500 模板创建；**P0 Blockers = 0**；P1 已审查决策；Pre-Release bug 已审查；风险已记录并达成一致。
- 日常工作流：工程师优先处理 P0/P1、更新状态与证据；Leads/PM 审查 Bugs by Area、确认 P0 Blockers=0、用 donut 图看健康信号。标签如 `el_p0_blocker`、`el_p1_critical`、`el_functional`、`el_ux_relevant` 等。

---

## 7. Compositional Design System（CompDS）

### 7.1 概览（`docs/comp-design/index.md`）
- 联系人：Tech - Philip Miseldine；UX - Bart Meeuwssen；PM - Petya Begovska；Project - Lora Hristova。
- **是什么**：为 AI 打造的下一代设计系统。不提供静态组件，而是给 AI 结构化的设计知识与目的富化（purpose-enriched）的组件目录，实现运行时动态、上下文感知的界面生成，可渲染于任意技术。
- 关键能力：动态 UI 生成（按用户意图/角色/上下文）；嵌入式设计知识（最佳实践、无障碍标准、品牌原则、组合规则）；目的富化的构件（primitives/components/tokens）；技术无关的 schematics（JSON blueprint，可在任意技术/平台渲染）。

### 7.2 开发资源（`docs/comp-design/links.md`）
- 仓库：`SAPDesign/symphony-ds-frontend`、`SAPDesign/symphony-server`；Playground：Symphony shadcn。规划：Jira EL、AHA! Roadmap。

### 7.3 Strategy Statement v1.0（`docs/comp-design/strategy/strategy_statement_v1.0.md`）

- **核心主张**：传统设计系统为人类组装静态界面而建，不可机读/可执行，随 AI 参与界面创建成为可扩展性、适应性、成本效率的限制因素。CompDS 把设计知识变为**机读、语义结构化、运行时可执行**，AI 成为设计系统的一等消费者，基于意图/上下文/角色/设备/约束动态组合体验，而非固定模板/变体。
- **改变个性化经济学**：传统系统靠维护不断增长的组件变体与布局排列实现灵活性（成本不可持续）；CompDS 从结构化 primitives 与 guardrails 动态生成，可近乎无限变体而运维成本不成比例增长 —— "扩展智能而非资产"（scale intelligence rather than assets）。
- **分层 Guardrails 替代刚性模板**：通用 UX/无障碍原则、品牌体验规则与语气、experience model 级约束、平台特定规则、设备/模态规则、角色约束与权限、声明式 UI 约束与组合规则。
- **闭环验证（Closed-loop validation）**：运行时评估生成体验，含质量/合规验证阈值、生成 UI 的可观测性、任务成功与用户价值监控、AI drift 检测、自我纠正机制。
- **如何起步**：Discovery/实验阶段，初期目标 —— 定义统一组件与组合 schema、用语义元数据富化核心组件、把 guardrails 编码为机读约束、验证技术可行性/用户价值/业务价值；对齐 EL MVP 用例做受控场景实验（元数据富化效果、guardrails 影响、AI 在不同约束下行为）；迭代式、证据驱动。
- **风险**：运行时组合的性能风险；准确性/可预测性影响信任；企业级可靠性；业务价值未证明；变更抵触；UX 稳定性（过度可变增加认知负荷、降低可识别性）。**信任是核心风险轴**。
- **向声明式 UI 转变**：当前状态是 Classic Fiori app 空间（预定义布局/组件）；Sapphire MVP 是演进步骤（更灵活布局组合，largely 保持组件行为约束）；CompDS 是下一代（布局与内容按意图/上下文动态组合，部分组件如 button 保持固定通用，其它可更定制化但仍守系统约束）。
- **需证明的价值**：AI 驱动组合的 UX 价值（清晰度、相关性、任务效率）；生产力与速度；成本与运维效率（更少变体、更少手工维护、更多组合复用）；内建智能与技术健壮性（自动适应 API 变更、数据契约，保持数据完整性/权限/合规）；面向未来（更易适配新平台/模态/AI 环境）。核心验证问题围绕"组合布局/组件 vs 预定义"的可测价值。
- **设计师职责转移**：从 build 阶段的手工组装/管理变体转向上游定义 intent/semantics/guardrails 与下游评估生成结果；build 由系统运行时组合执行，设计师转向质量控制与决策。

---

## 8. 内容与资产支持（Content and Asset Support）

（来源：`docs/content-and-asset-support/*`）

- **People（people.md）**：Program Leads —— Sophia Levens、Christina Salwitzek、Tillman Swinke、Sebastian Steinhauer、Judith Schneider；Reviewers —— Jens Maurer、Laurent Pollefoort、Syashi Gupta、Monika Csonka、Pascal Potvin、David Takacs。
- **Assets（assets.md）**：FX UI Kit（Figma）、Engagement Layer Documentation、FAQ 文档、Joule Integrated Testing Environment、**FX UI Library**（`pages.github.tools.sap/ui/fx-components/`）、FX Base Prototype（fx-layout）、AI Skill；Design Guidelines 需 Design System Portal 登录。
- **Requests（requests.md）**：Sapphire 评审请求追踪表（Main Stage Keynotes、Keynote Theater、UX Sessions 如 "Intro to JouleWork"/"Deep Dive JouleWork"、Experience Center、Pod Requests、Individual Requests 如 CALM Migration Cockpit 等）。
- **FAQ（faq.md）关键点**：
  - Joule Work = Engagement Layer；EL 不替代 Fiori Launchpad/SAP Start，而是补充。
  - DISCOVERY 模式不在 Sapphire 范围。
  - Sapphire 范围：**Conversations、Spaces、Develop（进入 SAP Build 2.0 入口）**；范围外：Discover、Jobs（讨论中）。
  - Spaces 在 Sapphire **只读、仅 Spaces 上的卡片、无写回**（先建立对 AI 生成结果的信心）。
  - 首批启用环境：6 个 All-in-One AI landscapes（staging/demo/prod）+ 独立 playground 环境（因稳定性与多用户考量，Agent Playground 用专属环境而非混入 AioAI landscape）。
  - 技术前置条件见产品文档；Sapphire 面向 SAP Joule-managed 客户，客户管理客户需升级参与。
  - 推荐 demo persona：S/4 系统相关（如 Returns Clerk）、SuccessFactors 的 HR persona；Joule Work 当前尤其擅长复杂多应用工作流（合并 4+ 应用）、知识工作者场景、跨系统洞察、迭代式决策。
  - 设计细节：列表 30 项上限，Spaces 中不用 integration cards（那是 Conversations 用）、表格当前显示 10 行（同 Joule）；卡片加载有 skeleton loading；多任务是否合并为一个通知尚未定义（倾向保持分离，用户需显式创建 space，不应被强制自动创建）。

---

## 9. Discover、Roadmap

### 9.1 Discover（`docs/discover/index.md`）
- 联系人：UX - Gentry Downs、Gergana Savova、Lounes Jaber；PM - Christian Hoffmann。资源：Figma、User Research。（Discover 不在 Sapphire/EAC 范围，属概念阶段。）

### 9.2 Roadmap（`docs/Roadmap/index.md`）
> 免责声明：高层愿景，未经产品团队验证或承诺，不作为承诺内部分享，非面向客户。Sapphire 后（6 月初）继续规划并纳入 EAC 学习成果。

- **EAC Scope（Sapphire 26）**：Conversations（Joule 消费级特性 AQ/AutoSQL、主动建议、增强摘要）；Spaces（用户生成、仅事务性、经 Joule/Mobile 创建、只读）；Skills（AI Skills Catalog、iOS/Android 语音模式、持久聊天、默认语言英语）。
- **September 24**：Discover（stretch，基于角色的动态主动内容）；Jobs（agent 驱动 jobs/workflows 视图）；Spaces（evals、质量一致性、写回、agent/系统触发 MVP）；Conversations 360；AI Skills（WalkMe 驱动的 AI 生成技能、跨工作流集成、更多语言）。
- **Nov 26**：Collaboration（共享 spaces、多用户与 agent 对话、带语音的定时 jobs、Discover 360、跨 OS 桌面体验、原生 agent 支持、web 语音模式）。
- **Beyond 2026**：个性化用户偏好、可扩展性与定制（含 Work Zone 用例启用）、超个性化体验（统一 IT Admin、具身/机器人 AI、Mobile as Device AI）、新兴技术扩展。
- 文档含大量分里程碑的 User Stories 草稿（Conversations/Spaces/Skills/Mobile/Discover/Jobs/Collaboration 等），并给出验收标准示例（如标准查询响应 < 3 秒、Spaces 尊重授权 profile、写回可审计并记录、语音模式在 iOS/Android 可靠等）。

---

## 10. 对 Developer 有意义的技术约束/要点

从 architecture、observability、performance、iam、datasources、tasks、strategy 等提炼：

1. **可观测性埋点必须用 OpenTelemetry**：React/Next.js 无专用 OTel 库，需用标准 browser SDK + 手动埋点，业务场景与 agent workflow 必须手动 span；应用需在 URL 中管理状态（path/query/hash）以支持 deep linking。数据保护强约束：敏感/DPP 数据不得记录、需 data masking，自动埋点默认可能采集超量数据，实现前必须澄清数据保护边界。

2. **导航与内容必须走 CDM + IBN**：内容通过 Common Data Model（CDM）经 CDM Replication API 联邦到 Business Content Service；导航用 Intent-Based Navigation（语义意图，不硬编码 URL），URL 模板基于 RFC6570，**不必是 hash 路由，可用任意 path/query/hash 模式**；产品需成为 CDM content provider（遵循 INTG-01R2），实现 SPII（建议 v3）参与 formation。

3. **授权是贯穿性两层模型**：设计时在 CDM 定义角色要求 + 运行时经 SCI 提供用户角色分配；所有内容/导航/通知场景必须做角色过滤，用户只看到有权访问的内容。LoB 应用需将角色复制到 IdDS 以支持 SAP-managed 中央角色复制。

4. **性能标准与现状**：EL 是重 LLM 请求的 agentic 体验；当前尚无性能测量，首批生成体验耗时数秒；Roadmap 验收标准示例给出"标准查询响应 < 3 秒"目标。性能管理以深度结构化遥测为前提（对 Joule/Spaces 后端埋点尤为重要）。

5. **Task Center 集成硬约束**：Task Provider 必须 SAP Managed；支持 inbound IAS App2App（INTG-02R5，保证主体传播）；如需 push 能力则支持 outbound IAS App2App（INTG-02R6）；经 UCL formations 集成；SAP Managed Task Center 每 SCI 租户单例。通知的 deep linking 依赖 ANS + Navigation Service。

6. **数据源接入方式**：EL 客户端构建在 Joule orchestrator 之上，数据经 KG（访问 Product APIs/CDS/OData/Fiori）、AutoSQL（OData 之外的非 API 内容）、Document Grounding、SAP Analytics Cloud、UMS、MCPHub（经 Joule MCP Client）、UI Integration Cards（作为 Joule Scenario）等接入；Joule Scenarios 是设计时 artifact，推送 Joule 团队后落 Artifactory，运行时经 UMS/Formations 解析；导航目标经 content service 的 content channel 注册到 CDM store，部署到 HTML5 app repository 的应用自动注册。

7. **IAM/登录与部署约束**：EL 随 Joule 交付，产生 Joule 租户专属 URL（无全局 URL）；社交登录需 CDC（SCI 不支持）；登录流 CDC→IAS→XSUAA→AppRouter 存在负载瓶颈；provisioning 需 SCI + Account Profile + Joule Work 三个 blueprint；production 部署技术依赖可访问互联网的 GitHub.com/GitHub Enterprise。

8. **CompDS 对前端约束**：交付技术无关的 JSON schematics（可在任意技术渲染，Playground 已含 shadcn）；生成 UI 需守分层 guardrails（UX/无障碍/品牌/平台/设备/角色/声明式 UI 约束）并支持闭环验证（运行时评估、可观测、AI drift 检测、自纠正）；组件需内建智能，自动适应 API/数据契约变更同时保持权限与合规。

---

### 附：源文件清单（均成功读取）
General/Tech Foundation：`docs/general/index.md`、`landscape.md`、`datasources.md`、`iam.md`、`delivery.md`、`rollout_access.md`、`messaging-terminology.md`、`links.md`、`sapphire-demo.md`、`architecture/{index,content,navigation,notifications,tasks}.md`、`architecture/compatibility/wz_content/{challenges_to_solve,PM_input}.md`、`qualities/{observability,performance,bug_bash}.md`。
顶层与其它：`docs/index.md`、`early-adopter-care.md`、`discover/index.md`、`Roadmap/index.md`、`comp-design/{index,links}.md`、`comp-design/strategy/strategy_statement_v1.0.md`、`content-and-asset-support/{README,assets,faq,people,requests}.md`。
