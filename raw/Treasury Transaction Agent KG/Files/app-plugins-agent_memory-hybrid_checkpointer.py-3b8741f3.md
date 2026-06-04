---
title: "app/plugins/agent_memory/hybrid_checkpointer.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/agent_memory/hybrid_checkpointer.py"
source_path: "app/plugins/agent_memory/hybrid_checkpointer.py"
---

# app/plugins/agent_memory/hybrid_checkpointer.py

hybrid_checkpointer.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含7 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/agent_memory/hybrid_checkpointer.py)

## Tags

- #agent
- #插件
- #记忆
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-message_converter.py-84e5706a|app/plugins/agent_memory/message_converter.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-client.py-01bd0b07|app/plugins/agent_memory/client.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_hybrid_checkpointer.py-b6ee7bf9|tests/plugins/agent_memory/test_hybrid_checkpointer.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-plugin.py-fac2cca7|app/plugins/agent_memory/plugin.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_hybrid_checkpointer.py-b6ee7bf9|tests/plugins/agent_memory/test_hybrid_checkpointer.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_memory_isolation.py-925c2986|tests/plugins/test_memory_isolation.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-HybridCheckpointer-1a8c0f54|HybridCheckpointer]]: HybridCheckpointer 是 hybrid_checkpointer.py 中的类，组织 插件系统 相关状态与行为，包含 13 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-_approximate_tokens-f4bf26b5|_approximate_tokens]]: _approximate_tokens 是 hybrid_checkpointer.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-_is_session_expired-9bc86ba9|_is_session_expired]]: _is_session_expired 是 hybrid_checkpointer.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-_is_user_visible-99dace16|_is_user_visible]]: _is_user_visible 是 hybrid_checkpointer.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-_resolve_history_max_tokens-d2c47dc6|_resolve_history_max_tokens]]: _resolve_history_max_tokens 是 hybrid_checkpointer.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-_resolve_max_history-2dab2513|_resolve_max_history]]: _resolve_max_history 是 hybrid_checkpointer.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-_resolve_ttl-f679091e|_resolve_ttl]]: _resolve_ttl 是 hybrid_checkpointer.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-hybrid_checkpointer.py-_trim_to_token_budget-032fb4d4|_trim_to_token_budget]]: _trim_to_token_budget 是 hybrid_checkpointer.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
