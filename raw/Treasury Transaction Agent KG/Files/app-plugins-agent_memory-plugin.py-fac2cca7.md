---
title: "app/plugins/agent_memory/plugin.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/agent_memory/plugin.py"
source_path: "app/plugins/agent_memory/plugin.py"
---

# app/plugins/agent_memory/plugin.py

plugin.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/agent_memory/plugin.py)

## Tags

- #agent
- #插件
- #记忆
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-client.py-01bd0b07|app/plugins/agent_memory/client.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-context_store.py-67955bfd|app/plugins/agent_memory/context_store.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-evictor.py-d869e38c|app/plugins/agent_memory/evictor.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-hybrid_checkpointer.py-3b8741f3|app/plugins/agent_memory/hybrid_checkpointer.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_plugin.py-ca76c1ec|tests/plugins/agent_memory/test_plugin.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-__init__.py-58193335|app/plugins/agent_memory/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_plugin.py-ca76c1ec|tests/plugins/agent_memory/test_plugin.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-plugin.py-AgentMemoryPlugin-e59b23e5|AgentMemoryPlugin]]: AgentMemoryPlugin 是 plugin.py 中的类，组织 插件系统 相关状态与行为，包含 4 个方法。
