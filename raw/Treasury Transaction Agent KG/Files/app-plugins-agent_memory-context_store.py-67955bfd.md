---
title: "app/plugins/agent_memory/context_store.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/agent_memory/context_store.py"
source_path: "app/plugins/agent_memory/context_store.py"
---

# app/plugins/agent_memory/context_store.py

context_store.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/agent_memory/context_store.py)

## Tags

- #agent
- #插件
- #记忆
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-client.py-01bd0b07|app/plugins/agent_memory/client.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_context_store.py-f5f1a4aa|tests/plugins/agent_memory/test_context_store.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-plugin.py-fac2cca7|app/plugins/agent_memory/plugin.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_pending_cross_pod.py-095f50da|tests/changer/test_pending_cross_pod.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_context_store.py-f5f1a4aa|tests/plugins/agent_memory/test_context_store.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_memory_isolation.py-925c2986|tests/plugins/test_memory_isolation.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-context_store.py-AgentMemoryContextStore-80224020|AgentMemoryContextStore]]: AgentMemoryContextStore 是 context_store.py 中的类，组织 插件系统 相关状态与行为，包含 8 个方法。
