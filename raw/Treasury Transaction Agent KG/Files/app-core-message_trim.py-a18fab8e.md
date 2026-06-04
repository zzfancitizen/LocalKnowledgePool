---
title: "app/core/message_trim.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/message_trim.py"
source_path: "app/core/message_trim.py"
---

# app/core/message_trim.py

message_trim.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/message_trim.py)

## Tags

- #函数
- #类
- #核心基础设施
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_message_trim.py-a917de8b|tests/core/test_message_trim.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_message_trim.py-a917de8b|tests/core/test_message_trim.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-_ModelCallRequest-1e3990cc|_ModelCallRequest]]: _ModelCallRequest 是 message_trim.py 中的类，组织 核心基础设施 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-MessageTrimMiddleware-fd05ae49|MessageTrimMiddleware]]: MessageTrimMiddleware 是 message_trim.py 中的类，组织 核心基础设施 相关状态与行为，包含 2 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-_last_tool_round-37670079|_last_tool_round]]: _last_tool_round 是 message_trim.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-_resolve_max_tokens-ce79e38f|_resolve_max_tokens]]: _resolve_max_tokens 是 message_trim.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-repair_tool_pairs-585ebbbb|repair_tool_pairs]]: repair_tool_pairs 是 message_trim.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-trim_for_llm-b01c2662|trim_for_llm]]: trim_for_llm 是 message_trim.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
