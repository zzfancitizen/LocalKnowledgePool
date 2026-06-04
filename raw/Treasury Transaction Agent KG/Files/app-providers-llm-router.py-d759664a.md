---
title: "app/providers/llm/router.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/llm/router.py"
source_path: "app/providers/llm/router.py"
---

# app/providers/llm/router.py

router.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/llm/router.py)

## Tags

- #路由
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-config.py-4db7a115|app/providers/llm/config.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-llm-types.py-931d833c|app/providers/llm/types.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_router.py-3689ef55|tests/providers/llm/test_router.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-llm-__init__.py-b40eba5a|app/providers/llm/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-llm-test_router.py-3689ef55|tests/providers/llm/test_router.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-router.py-RouterChatLiteLLM-42c97bb9|RouterChatLiteLLM]]: RouterChatLiteLLM 是 router.py 中的类，组织 项目支撑 相关状态与行为，包含 3 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-router.py-_build_model_list-37eea43a|_build_model_list]]: _build_model_list 是 router.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-router.py-build_router-a28f1558|build_router]]: build_router 是 router.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-llm-router.py-create_agent_llm-34a142cc|create_agent_llm]]: create_agent_llm 是 router.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
