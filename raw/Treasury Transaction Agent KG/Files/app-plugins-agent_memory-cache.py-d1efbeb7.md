---
title: "app/plugins/agent_memory/cache.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/agent_memory/cache.py"
source_path: "app/plugins/agent_memory/cache.py"
---

# app/plugins/agent_memory/cache.py

cache.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/agent_memory/cache.py)

## Tags

- #agent
- #插件
- #记忆
- #类
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_cache.py-73352a61|tests/plugins/agent_memory/test_cache.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-client.py-01bd0b07|app/plugins/agent_memory/client.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_cache.py-73352a61|tests/plugins/agent_memory/test_cache.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-cache.py-CachedSession-551c01fb|CachedSession]]: CachedSession 是 cache.py 中的类，组织 插件系统 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-cache.py-SessionCache-f18ddb15|SessionCache]]: SessionCache 是 cache.py 中的类，组织 插件系统 相关状态与行为，包含 5 个方法。
