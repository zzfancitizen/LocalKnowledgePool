---
title: "Treasury Transaction Agent Knowledge Graph"
tags:
  - treasury-agent
  - understand-anything
  - codebase-map
---

# Treasury Transaction Agent Knowledge Graph

This export was generated from `../../../MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/.understand-anything/knowledge-graph.json`.

- Project: treasury-transaction-agent
- Description: SAP Treasury and Risk Management (TRM) 的 A2A 协议多代理系统，基于 LangGraph、LiteLLM 与 Application Foundation SDK 构建。
- Nodes: 1496
- Edges: 1768
- Layers: 9
- Tour steps: 10
- Overview Canvas: [[Treasury Transaction Agent KG/Architecture Overview.canvas|Architecture Overview]]

## Layer Detail Canvases

- [[Treasury Transaction Agent KG/Layers/A2A-473f1c.canvas|A2A 入口与协议层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/Supervisor-c86198.canvas|Supervisor 编排层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/Agent-195609.canvas|专业 Agent 层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/node-ecb4e1.canvas|运行时基础层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/node-3ba966.canvas|技能与提示词层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/Joule-8f7633.canvas|前端与 Joule 集成层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/node-dc7fa6.canvas|部署与配置层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/node-93ec47.canvas|评测与测试层 detail canvas]]
- [[Treasury Transaction Agent KG/Layers/node-633f33.canvas|文档与治理层 detail canvas]]

## Layers

- [[Treasury Transaction Agent KG/Layers/A2A-473f1c|A2A 入口与协议层]] (6 nodes)
- [[Treasury Transaction Agent KG/Layers/Supervisor-c86198|Supervisor 编排层]] (13 nodes)
- [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]] (42 nodes)
- [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]] (58 nodes)
- [[Treasury Transaction Agent KG/Layers/node-3ba966|技能与提示词层]] (26 nodes)
- [[Treasury Transaction Agent KG/Layers/Joule-8f7633|前端与 Joule 集成层]] (44 nodes)
- [[Treasury Transaction Agent KG/Layers/node-dc7fa6|部署与配置层]] (12 nodes)
- [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]] (267 nodes)
- [[Treasury Transaction Agent KG/Layers/node-633f33|文档与治理层]] (18 nodes)

## Guided Tour

## 1. 项目概览

先阅读项目说明与协作规则，理解 Treasury Transaction Agent 的目标、A2A 边界、TDD 约束和多代理职责划分。

[[Treasury Transaction Agent KG/Files/README.md-6e8b71dd|README.md]], [[Treasury Transaction Agent KG/Files/AGENTS.md-bcfeb4d9|AGENTS.md]]

## 2. A2A 启动路径

从应用入口和执行器看请求如何进入系统、如何映射为任务状态，并如何通过 SSE/心跳返回给 Joule 或其他 A2A 客户端。

[[Treasury Transaction Agent KG/Files/app-main.py-ad934351|app/main.py]], [[Treasury Transaction Agent KG/Files/app-agent_executor.py-87c591ed|app/agent_executor.py]], [[Treasury Transaction Agent KG/Files/.well-known-agent.json-5ff06873|.well-known/agent.json]]

## 3. Supervisor 的对话编排

聚焦 SupervisorAgent 如何维护 CaseContext、组装提示词、选择工具，并把专业 agent 的状态提升为统一的响应 envelope。

[[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]], [[Treasury Transaction Agent KG/Files/app-supervisor-types.py-d07c9c6e|app/supervisor/types.py]]

## 4. Proposal 分析专家

查看 proposal agent 如何通过技能、MCP/OData 后端和结构化响应生成金额增加或提前处理建议。

[[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]], [[Treasury Transaction Agent KG/Files/app-proposal-types.py-1546c3a4|app/proposal/types.py]]

## 5. Changer 确认执行链路

沿着 changer agent 的预览、确认和执行工具，理解不可逆变更如何通过 await_confirm 状态被闸住。

[[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]], [[Treasury Transaction Agent KG/Files/app-changer-types.py-6747f1fd|app/changer/types.py]]

## 6. 运行时支撑与插件化

阅读核心上下文存储、插件解析和 LLM 路由，理解数据访问、记忆后端和模型选择如何被运行时解耦。

[[Treasury Transaction Agent KG/Files/app-core-context_store.py-0674d9bb|app/core/context_store.py]], [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]], [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]]

## 7. 技能材料与业务约束

技能目录保存 agent 运行时加载的业务说明、字段映射和模板，是防止模型猜测参数的重要约束来源。

[[Treasury Transaction Agent KG/Files/app-proposal-skills-propose-amount-increase-references-field_mapping.md-b070f726|app/proposal/skills/propose-amount-increase/references/field_mapping.md]], [[Treasury Transaction Agent KG/Files/app-proposal-skills-propose-premature-references-field_mapping.md-0435bada|app/proposal/skills/propose-premature/references/field_mapping.md]], [[Treasury Transaction Agent KG/Files/app-supervisor-skills-request-dispatch-references-dispatch_targets.md-dfa57a69|app/supervisor/skills/request-dispatch/references/dispatch_targets.md]]

## 8. 前端与 Joule 展示

把后端结构化结果连接到聊天 UI 和 Joule rich card 布局，理解用户实际看到的确认、建议和变更结果。

[[Treasury Transaction Agent KG/Files/frontend-src-App.jsx-eecb924c|frontend/src/App.jsx]], [[Treasury Transaction Agent KG/Files/frontend-src-components-ChatMessage.jsx-c911b75f|frontend/src/components/ChatMessage.jsx]], [[Treasury Transaction Agent KG/Files/joule-a2a-functions-layout-display_proposal.yaml-2aa9322c|joule/a2a/functions/layout/display_proposal.yaml]]

## 9. 评测与回归保护

从 pytest 与 Aeval 用例看项目如何验证路由、记忆、幻觉防护、确认闸门和多轮行为。

[[Treasury Transaction Agent KG/Files/tests-supervisor-test_in_process_dispatch.py-d06ecbd2|tests/supervisor/test_in_process_dispatch.py]], [[Treasury Transaction Agent KG/Files/tests-changer-test_pending_cross_pod.py-095f50da|tests/changer/test_pending_cross_pod.py]], [[Treasury Transaction Agent KG/Files/aeval-configs-agent-config.yaml-598d344c|aeval/configs/agent-config.yaml]]

## 10. 部署与运行配置

最后查看容器、应用部署和模型/MCP 配置，理解本地代码如何落到可运行环境中。

[[Treasury Transaction Agent KG/Files/Dockerfile-a03f956c|Dockerfile]], [[Treasury Transaction Agent KG/Files/app.yaml-f71e8d41|app.yaml]], [[Treasury Transaction Agent KG/Files/config-models.yaml-d3c57633|config/models.yaml]], [[Treasury Transaction Agent KG/Files/config-mcp_servers.yaml-103c58b7|config/mcp_servers.yaml]]
