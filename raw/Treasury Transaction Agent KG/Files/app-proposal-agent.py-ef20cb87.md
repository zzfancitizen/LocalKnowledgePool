---
title: "app/proposal/agent.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/agent.py"
source_path: "app/proposal/agent.py"
---

# app/proposal/agent.py

agent.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/agent.py)

## Tags

- #agent
- #proposal
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-utils-agent_tool_exposure.py-0690ae92|app/common/utils/agent_tool_exposure.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-backend.py-70da5ddf|app/proposal/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-prompts.py-7f27f9e7|app/proposal/prompts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-prompt_utils.py-eac8ca06|app/core/prompt_utils.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-types.py-1546c3a4|app/proposal/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-utils-providers.py-b1bcea10|app/common/utils/providers.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-tool_registry.py-7fb3b648|app/core/tool_registry.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-message_trim.py-a18fab8e|app/core/message_trim.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-response_builder.py-76a1a5e1|app/proposal/response_builder.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_memory_isolation.py-925c2986|tests/plugins/test_memory_isolation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_agent_backend_wiring.py-ee698dea|tests/proposal/test_agent_backend_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_build_tools_integration.py-6be2b638|tests/proposal/test_build_tools_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_extract_param.py-f8e50468|tests/proposal/test_extract_param.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_mcp_tools_first_class.py-c3c67665|tests/proposal/test_mcp_tools_first_class.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_proposal_agent.py-02f26489|tests/proposal/test_proposal_agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_proposal_tool_logging.py-ee3f6645|tests/proposal/test_proposal_tool_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_status_logging.py-f9b08376|tests/proposal/test_status_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_structured_output.py-93453a65|tests/proposal/test_structured_output.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_try_parse_proposal_response.py-4a4107ee|tests/proposal/test_try_parse_proposal_response.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_cross_agent_consistency.py-f193d019|tests/test_cross_agent_consistency.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_proposal_dispatch_integration.py-a6daa3dc|tests/test_proposal_dispatch_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_specialist_recursion_limits.py-bfc1d4a3|tests/test_specialist_recursion_limits.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-proposal-agent.py-ProposalAgent-7b0ff88d|ProposalAgent]]: ProposalAgent 是 agent.py 中的类，组织 Proposal 专家 相关状态与行为，包含 6 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-agent.py-_extract_param-e4f87c4d|_extract_param]]: _extract_param 是 agent.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-agent.py-_extract_param_with_fallback-c439b8fb|_extract_param_with_fallback]]: _extract_param_with_fallback 是 agent.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-agent.py-_normalize_amount-14435cb3|_normalize_amount]]: _normalize_amount 是 agent.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-agent.py-_try_parse_as_proposal_response-b576db8e|_try_parse_as_proposal_response]]: _try_parse_as_proposal_response 是 agent.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
