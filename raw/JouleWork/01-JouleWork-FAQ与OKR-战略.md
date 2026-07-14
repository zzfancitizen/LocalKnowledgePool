# Joule Work — 技术 FAQ 与 2026 OKR（战略与产品就绪度）

> 来源：`fx-engagement-layer/fx-engagement-layer.github.tools.sap` 仓库 `main` 分支 `.local-only/` 目录
> - `Joule_Work_FAQ_Technical.md`（技术 FAQ，最后更新 2026-05-20）
> - `Joule_Work_OKRs_2026.md`（2026 产品 OKR，最后更新 2026-05）
>
> 本文用中文整理。这两份是理解「产品就绪度、路线图时间点、以及对 developer 的硬性技术约束」最关键的材料。

---

## 一、Joule Work 是什么（战略定位）

**产品使命：** 把 SAP 从「隐形的企业基础设施」转变为「可见的、用户拥有的交互界面（engagement surface）」，在 AI 时代把「工作」从 **app-centric（以应用为中心）** 重构为 **intent-centric（以意图为中心）**。

**战略背景（竞争态势）：** 企业工作「前门（front door）」之争正在加速——竞争对手包括 Microsoft Copilot Tasks、OpenAI Operator、Anthropic CoWork、Workday Sana。SAP 的护城河在于：
- **Spaces（Generative UI，生成式 UI）**
- **联邦身份 + principal propagation（主体传播）**
- **带权限边界的 agent 授权**
- **跨复杂业务系统的无缝 onboarding**

---

## 二、技术 FAQ —— 产品就绪度与 UX 可定义性

### FAQ 1：Discover 与 Jobs 是否可以现在开始重设计？

**结论：Sapphire 2026 阶段「尚未就绪」，明确不在生产化范围内。**

官方范围声明（Out of Productization Scope）：
- ❌ **Discover** —— 当前不做生产化
- ❌ **Jobs（Assistant Orchestration）** —— 当前不做生产化

**路线图时间线：**

| 里程碑 | 能力 | 预期可用性 |
|--------|------|-----------|
| **Sapphire 26**（2026-05） | Discover & Jobs | **不在范围内（OUT OF SCOPE）** |
| **August 26**（2026-08） | Discover + Jobs | **首次可用（FIRST AVAILABILITY）** |
| **Nov 26**（2026-11） | 增强协作 | 成熟度提升 |

**August 26 计划能力：**
- **Discover：** 基于角色的动态主动内容（feeds / needs-based views）；面向通用 space 的推荐引擎
- **Jobs：** 终端用户对 agentic workflow 的监督（supervision）；用户可运行的「scheduled jobs」（支持语音/富媒体）；持久化、受治理的 agent 工作执行容器；对「必须达成什么、发生了什么、最终结果」的正式追踪

**建议：** 现在**不要**为 Sapphire 范围开始重设计。应：等待 August 26 里程碑；现在就记录用例需求以影响 August 26 规划；参与 EAC（Early Access Care，2026-05-14 起至发布后 180 天）反馈；可用 **system-generated spaces（PoC 已可用）** 作为过渡模式做原型。

---

### FAQ 2：Extensibility 用例 —— Spaces、Develop 还是二者结合？

**结论：当前架构中 Spaces 与 Develop 是相互独立的产品**（规划了集成点）。

**Sapphire 26 范围：**
- **Spaces：** 用户生成的事务型 space（Sapphire 阶段为只读），基于意图创建
- **Develop：** 「Low code / no code Build 体验」，在 UI Shell 中作为**独立菜单项**出现

二者面向不同用户画像：Spaces = 动态、意图驱动的业务用户工作区；Develop = 低代码/无代码开发者构建环境。

**当前用户旅程（混合体验）存在已知断点：** Fiori App → Space（✅ 可用）→ 切换到 ABAP 环境写代码（❌ 上下文断裂）。

**路线图集成点：**

| 里程碑 | 集成能力 |
|--------|---------|
| **August 26** | 与 Joule AI Flow 的跨工作流集成；Joule Action Bar 的 Omnipresence |
| **Nov 26** | 面向 extensibility/publishing 工具的轻量 IT Admin 体验；跨 OS 桌面体验 |
| **Beyond 2026** | Work Zone 内容集成；统一 IT Admin 体验 |

**当前可行的方案模式：**
- **方案 1 — 深链接 + 上下文交接：** Space 内含 **Link component** 用于携带上下文参数启动 ABAP 环境；agent 提供结构化交接 payload（如 tax report ID、比对结果）；ABAP 环境通过 URL 参数或基于意图的导航接收上下文。
- **方案 2 — 内嵌 iFrame（若支持）：** 需调研 Spaces 是否能通过 iFrame 内嵌外部开发工具；**当前 Sapphire 范围内未记录为可用组件**（见 consolidated component catalog）。
- **方案 3 — 会话式编排：** agent 通过 Joule 会话跨两个环境编排；用户停留在 Joule Work，agent 通过 API 调用触发 ABAP 动作，结果回流到 Space 供审阅。

**关键洞察：** 该用例代表了「业务用户 Spaces」与「开发者工具」之间的**战略性缺口**。

---

### FAQ 3：Spaces 中的多用户行为

**结论：Sapphire 26 仅支持单用户 Space；多用户计划在 Nov 26。**

- **Q：能否共享 Space 协作？** ❌ **不能**（Sapphire 26 无共享/协作）。
- **Q：相同角色+上下文会否为两个用户生成相同 Space？** ✅ **会生成结构相似但相互独立的 Space**；但 space 之间**不同步**，每个用户有自己的实例；layout 可变性可能导致差异。
- **Q：一个用户完成 5 个任务中的 2 个，另一个用户的视图会自动更新吗？** ❌ **不会**，Space **无实时同步**，各用户实例独立。

**Nov 26 计划的多用户能力（"Seamless Collaboration at Scale"）：** 共享 space（多用户 + agent 会话）；用户与 agent 并发协作；共享 space 所有权；实时同步；并发编辑；任务状态同步；agent 作为「协作者」参与。

**Nov 26 前的过渡方案：** ① 基于通知的交接（用户 A 完成后经 **ANS（Alert Notification Service）** 带深链接通知用户 B，B 打开新 space 实例）；② 用 system-generated space 做交接；③ 外部协调层（如 **SAP Task Center** 跟踪跨用户工作流状态）。

**建议：** Sapphire 26 **不要**基于多用户同步来设计工作流；按「单用户完成 + 通知交接」设计。

---

### FAQ 4：Spaces 的 UX 可定义性（最紧迫问题）

**结论：布局一致性是已知缺口（Known Gap）。** 这是 compositional design system（组合式设计系统）方法的根本张力。

**当前状态：AI 驱动的组合，控制能力有限。**
- Spaces 采用 **"guardrails instead of templates"（用护栏而非模板）**
- AI 在**运行时**基于 intent、context、constraints **动态组合**体验
- 设计知识是**机器可读**的，但不做刚性规定
- 组合式设计系统当前处于 **"Discovery and experimentation phase"（探索与实验阶段）**，尚未生产级硬化

**布局为何会变化（根因）：** ① 非确定性 AI 组合（相同 prompt → 不同布局，源于 LLM 推理可变性）；② 缺少布局模板；③ guardrails 尚不成熟；④ 无设计师控制层（UX 无法「锁定」布局结构）。

**今天「可控」的部分：**
- **组件 Schema（已定义）：** Card（根容器，含 title/subtitle/icon）；Stack（flex 布局，含 direction 水平/垂直、gap、align、justify）；数据组件 Text、Metric、Tag、Link、Table、List、Icon、Chart
- **数据绑定（一致）：** `$state` 绑定到 state 对象；`$template` 做字符串插值；Table/List 的列/字段定义
- **组件行为（可预测）：** 每个组件有确定的 props 与渲染行为；state 驱动更新是确定性的

**今天「不可控」的部分：** 布局结构（AI 决定用哪些组件、Stack 排布、嵌套层级）；组件选择（AI 在 Table/List/Chart 间选择）；跨会话布局稳定性（相同 prompt 新会话可能不同布局，无「保存为规范布局」功能）。

**UX 团队今天能做的（过渡策略）：**
1. **定义组件级一致性（而非布局）：** 聚焦数据绑定标准、语义化组件使用规则（如「KPI 一律用 Metric 而非 Text」）、Table/List 字段映射。
2. **通过 Enrichment 规范约束：** 与后端一起构造带**显式组件提示**的 enrichment 响应，用 schema 驱动的 payload 引导 AI 组件选择。
3. **为 agent 训练创建参考布局：** 记录各用例的规范 Space 示例，供 AI/LLM 团队用于 prompt 工程 / in-context learning。
4. **利用 Card 组件 Schema 校验：** 使用 **validator 工具**（`https://pages.github.tools.sap/I053631/space-agent-content-validator/`）捕获非法 spec，定义 JSON Schema 约束。
5. **用 System-Generated Spaces 显式 spec：** 若 agent 创建 space，在 agent 输出 payload 中**显式定义组件树**——agent 控制的布局是完全确定性的。

**权衡（关键架构张力）：** 传统设计系统 = 高一致性、低适应性、高变体维护成本；组合式系统 = 高适应性、较低一致性、较低维护成本。系统必须在灵活性与可预测性间平衡。

---

### FAQ 汇总表

| 问题 | Sapphire 26 状态 | 未来可用性 | 行动 |
|------|------------------|-----------|------|
| **Discover & Jobs** | ❌ 不在范围 | August 26 | 等待；记录需求 |
| **Extensibility（Spaces + Develop）** | 🔶 独立产品 | Nov 26 集成 | 请求架构评审 |
| **多用户 Spaces** | ❌ 不可用 | Nov 26 | 按单用户 + 交接设计 |
| **UX 布局控制** | 🔶 有限（组合式） | Nov 26+ 治理 | 作为战略问题上报 |

---

## 三、2026 产品 OKR

### O1：通过 Early Access Care（EAC）验证市场契合度
- **KR1.1：** 2026-05-14 前启动 EAC Influence Campaign，纳入 ≥10 家 SAP-managed Joule 客户（S/4HANA Cloud Public + SuccessFactors）
- **KR1.2：** EAC 参与者对「减少上下文切换」「提升日常生产力」满意度达 **80%**
- **KR1.3：** 180 天 EAC 期结束前，记录 **≥5 个已验证业务价值案例**（量化 ROI：节省时间、完成任务、减少错误）
- **KR1.4：** Q3 2026 前，基于 EAC 学习获得 post-Sapphire 路线图资金的高管承诺

### O2：交付 Sapphire-Ready 的 Joule Work 体验
- **KR2.1（Conversations）：** 交付 consumer-grade 特性（AutoSQL、Knowledge Graph 集成、主动建议、摘要），90% 查询 **<3s** 响应延迟
- **KR2.2（Spaces）：** 支持经 Joule 基于意图创建的用户生成事务型 space，覆盖 **≥8 个已验证场景**（Production Order Exception、Stock-Out Investigation、Disputed Invoice Resolution、Employee Transfer 等）
- **KR2.3（Skills）：** 发布 AI Skills Catalog + Agent Harness，**≥20 个 skill** 可在无代码 build 体验中发现并执行
- **KR2.4（Mobile）：** 交付 iOS/Android 语音模式，含持久聊天、视觉主题、深链接到 spaces/conversations，核心工作流与 web 达到功能对等
- **KR2.5：** 稳定性证明：Sapphire 展台 **20,000+ 并发登录**（5/11–5/21），错误率 **<5%**

### O3：建立企业级技术基础 ← **对 developer 约束最强**
- **KR3.1（Observability）：** 实现基于 **OpenTelemetry** 的端到端 tracing，覆盖 UI、服务、Joule Orchestrator、agents；P1 事件 **MTTRC <5 分钟**
- **KR3.2（Security & Compliance）：** 在 S/4HANA Cloud 与 SuccessFactors 集成中实现 **100% principal propagation 与联邦身份覆盖**；agent 授权模型通过 **SOC2 审计**
- **KR3.3（Performance SLA）：** conversation 交互 **<1s**，space 生成 **<3s**（P90）；相对基线零性能回退
- **KR3.4（Integration Readiness）：** 2026-06-01 前 SAP-managed Joule provisioning 在 **EU11、US、India** 运行，经 formations & SPII 自动建立信任

### O4：从被动聊天迈向主动、组合式体验
- **KR4.1（Compositional Design System）：** 验证 ≥3 个组合式场景（对齐 EL MVP 用例）；相对传统静态 UI 变体维护成本降低 **50%**
- **KR4.2（Discover，August 26）：** 为 ≥3 个业务角色（Returns Clerk、Finance Analyst、HR Manager）交付基于角色的动态主动内容
- **KR4.3（Conversations 360，August 26）：** 个性化 prompt 建议 + 面向生成 space 的上下文注入；AI 建议 prompt 的用户接受率 **40%**
- **KR4.4（System-Generated Spaces，August 26）：** 让自主 assistant 无需用户显式操作即可创建读/写 space，支持 ≥2 个已验证 agent 驱动工作流

### O5：为多用户 + agent 工作流扩展协作与可扩展性（Nov 26 及以后）
- **KR5.1（Shared Spaces，Nov 26）：** 多用户 space + 并发协作（用户 + agent），≥2 个已验证团队场景
- **KR5.2（Scheduled Jobs，Nov 26）：** 终端用户可调度「jobs you run」（agent + 语音/富媒体）；试点执行 ≥100 个 job
- **KR5.3（IT Admin 体验，Nov 26）：** 面向 IT admin 的轻量 extensibility/publishing 工具，onboard ≥5 家试点客户
- **KR5.4（Desktop & Voice，Nov 26）：** 跨 OS 桌面 app（Windows/Mac）+ 自定义品牌 + web 语音模式，与 mobile 达 70% 功能对等

---

## 四、成功指标看板（2026）

| 类别 | 目标指标 | 意义 |
|------|---------|------|
| 采用 | ≥10 EAC 客户；Q4 2026 前 ≥5,000 活跃用户 | 市场验证信号 |
| 参与 | 已注册用户周活 ≥60% | 黏性指标 |
| 价值兑现 | ≥5 个量化 ROI 案例 | 业务论证 |
| 质量 | 错误率 <5%；P90 延迟 <3s；CSAT ≥80% | 企业级体验 |
| 竞争定位 | ≥3 份分析师报告将其列为企业 AI UX 领导者 | 市场可见性 |
| 平台就绪 | 100% 可观测性覆盖；SOC2 合规；零安全事件 | 信任与规模基础 |

---

## 五、风险与关键依赖（对 developer 的硬约束）

**关键风险：** ① Joule 依赖（EU11/US/India 区域就绪延迟）；② 组合式设计未经证明（性能回退或信任问题，必要时 Sapphire 回退到静态 UI）；③ 客户 onboarding 摩擦（复杂系统 provisioning）；④ 数据质量问题（KG、AutoSQL 缺口影响回答质量，需持续监控 + human-in-the-loop 兜底）。

**关键依赖（技术指标）：**
- **Joule Orchestrator：** 稳定集成 API，编排延迟 **<500ms**
- **Business Content Service (BCS)：** CDM Replication API 对 S/4 + SF 可用
- **SAP Task Center：** 每个 SCI 租户单例；支持基于意图的导航
- **Alert Notification Service (ANS)：** 基于 formation 的 provisioning，深链接
- **Knowledge Graph + AutoSQL：** 支持域的查询成功率 **>85%**

---

## 六、对 Developer 的核心技术要点提炼

1. **可观测性是硬要求：** 必须接入 OpenTelemetry 端到端 tracing（UI → 服务 → Joule Orchestrator → agents），目标 P1 MTTRC <5 分钟、100% 覆盖。
2. **性能 SLA 是验收线：** conversation <1s、space 生成 <3s（P90）、Joule Orchestrator 编排 <500ms、KG/AutoSQL 查询成功率 >85%。
3. **安全模型：** 100% principal propagation + 联邦身份；agent 授权需过 SOC2；带权限边界的 agent 授权是护城河之一。
4. **Space 布局确定性：** 若要可控布局，走 **agent 显式 spec / system-generated space** 路线（agent 输出显式组件树），并用 space-agent-content-validator 做 schema 校验。
5. **组件 Schema 是稳定契约：** Card / Stack / Text / Metric / Tag / Link / Table / List / Icon / Chart + `$state` / `$template` 数据绑定 —— 面向这些做集成是可预测的。
6. **集成过渡模式：** Spaces↔Develop/ABAP 用深链接 + 结构化上下文 payload；多用户用 ANS 通知交接 + Task Center 协调。
