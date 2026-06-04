---
title: "app/plugins/agent_memory/evictor.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/agent_memory/evictor.py"
source_path: "app/plugins/agent_memory/evictor.py"
---

# app/plugins/agent_memory/evictor.py

evictor.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/agent_memory/evictor.py)

## Tags

- #agent
- #插件
- #记忆
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-client.py-01bd0b07|app/plugins/agent_memory/client.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_evictor.py-8d26ccc6|tests/plugins/agent_memory/test_evictor.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-plugin.py-fac2cca7|app/plugins/agent_memory/plugin.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_evictor.py-8d26ccc6|tests/plugins/agent_memory/test_evictor.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-evictor.py-_DeleteResult-7b656b0b|_DeleteResult]]: _DeleteResult 是 evictor.py 中的类，组织 插件系统 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-evictor.py-AgentMemoryEvictor-adb3b3fe|AgentMemoryEvictor]]: AgentMemoryEvictor 是 evictor.py 中的类，组织 插件系统 相关状态与行为，包含 3 个方法。
