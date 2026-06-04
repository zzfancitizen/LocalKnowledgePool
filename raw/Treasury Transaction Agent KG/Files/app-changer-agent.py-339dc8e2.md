---
title: "app/changer/agent.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/changer/agent.py"
source_path: "app/changer/agent.py"
---

# app/changer/agent.py

agent.py 属于Changer 执行模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/changer/agent.py)

## Tags

- #agent
- #changer
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-changer-backend.py-5123a6cd|app/changer/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-prompts.py-245cc447|app/changer/prompts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-utils-agent_tool_exposure.py-0690ae92|app/common/utils/agent_tool_exposure.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-prompt_utils.py-eac8ca06|app/core/prompt_utils.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-types.py-6747f1fd|app/changer/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-changer-utils-providers.py-743ba002|app/changer/utils/providers.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-utils-providers.py-b1bcea10|app/common/utils/providers.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-tool_registry.py-7fb3b648|app/core/tool_registry.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-message_trim.py-a18fab8e|app/core/message_trim.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-changer-test_agent.py-5897e92f|tests/changer/test_agent.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_agent.py-5897e92f|tests/changer/test_agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_execution_evidence.py-d16bf490|tests/changer/test_execution_evidence.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_tool_registry.py-69e4c5d1|tests/changer/test_tool_registry.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_memory_isolation.py-925c2986|tests/plugins/test_memory_isolation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_cross_agent_consistency.py-f193d019|tests/test_cross_agent_consistency.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_specialist_recursion_limits.py-bfc1d4a3|tests/test_specialist_recursion_limits.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-changer-agent.py-ChangerAgent-4f4bafff|ChangerAgent]]: ChangerAgent 是 agent.py 中的类，组织 Changer 执行 相关状态与行为，包含 8 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-agent.py-_has_execution_evidence-b0fc6431|_has_execution_evidence]]: _has_execution_evidence 是 agent.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-agent.py-_try_parse_as_changer_response-ea64b6bd|_try_parse_as_changer_response]]: _try_parse_as_changer_response 是 agent.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-agent.py-_utc_now-7e16990f|_utc_now]]: _utc_now 是 agent.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
