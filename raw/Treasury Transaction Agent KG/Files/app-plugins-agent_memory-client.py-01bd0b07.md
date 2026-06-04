---
title: "app/plugins/agent_memory/client.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/agent_memory/client.py"
source_path: "app/plugins/agent_memory/client.py"
---

# app/plugins/agent_memory/client.py

client.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/agent_memory/client.py)

## Tags

- #agent
- #插件
- #记忆
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-cache.py-d1efbeb7|app/plugins/agent_memory/cache.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_client.py-26dfcb09|tests/plugins/agent_memory/test_client.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-context_store.py-67955bfd|app/plugins/agent_memory/context_store.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-evictor.py-d869e38c|app/plugins/agent_memory/evictor.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-hybrid_checkpointer.py-3b8741f3|app/plugins/agent_memory/hybrid_checkpointer.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-plugin.py-fac2cca7|app/plugins/agent_memory/plugin.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_client.py-26dfcb09|tests/plugins/agent_memory/test_client.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-client.py-AgentMemoryClient-c5366db8|AgentMemoryClient]]: AgentMemoryClient 是 client.py 中的类，组织 插件系统 相关状态与行为，包含 13 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-client.py-_dump_metadata-9386153e|_dump_metadata]]: _dump_metadata 是 client.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
