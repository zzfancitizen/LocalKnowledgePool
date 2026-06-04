---
title: "tests/providers/llm/test_router.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:tests/providers/llm/test_router.py"
source_path: "tests/providers/llm/test_router.py"
---

# tests/providers/llm/test_router.py

test_router.py 属于测试模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数、4 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/tests/providers/llm/test_router.py)

## Tags

- #测试
- #路由
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-types.py-931d833c|app/providers/llm/types.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]] -> tested_by

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-llm-test_router.py-TestBuildModelList-6191b889|TestBuildModelList]]: TestBuildModelList 是 test_router.py 中的类，组织 测试 相关状态与行为，包含 8 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-llm-test_router.py-TestBuildRouter-99ac29ca|TestBuildRouter]]: TestBuildRouter 是 test_router.py 中的类，组织 测试 相关状态与行为，包含 5 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-llm-test_router.py-TestCreateAgentLlm-6598d754|TestCreateAgentLlm]]: TestCreateAgentLlm 是 test_router.py 中的类，组织 测试 相关状态与行为，包含 11 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-providers-llm-test_router.py-TestRouterChatLiteLLM-90f33c2a|TestRouterChatLiteLLM]]: TestRouterChatLiteLLM 是 test_router.py 中的类，组织 测试 相关状态与行为，包含 2 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-llm-test_router.py-_fake_litellm_response-3410e674|_fake_litellm_response]]: _fake_litellm_response 是 test_router.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-llm-test_router.py-_sample_config-e96ff03b|_sample_config]]: _sample_config 是 test_router.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-providers-llm-test_router.py-_sample_config_with_tiers-b24b4ed6|_sample_config_with_tiers]]: _sample_config_with_tiers 是 test_router.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
