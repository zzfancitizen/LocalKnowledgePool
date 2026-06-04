---
title: "app/plugins/resolver.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/resolver.py"
source_path: "app/plugins/resolver.py"
---

# app/plugins/resolver.py

resolver.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/resolver.py)

## Tags

- #插件
- #函数
- #插件系统
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_agent_backend_wiring.py-ee698dea|tests/proposal/test_agent_backend_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-runtime-test_external_memory.py-81cd9087|tests/runtime/test_external_memory.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-resolver.py-_import_class-77c42883|_import_class]]: _import_class 是 resolver.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-resolver.py-resolve_data_access_plugin-de5461d5|resolve_data_access_plugin]]: resolve_data_access_plugin 是 resolver.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-resolver.py-resolve_memory_plugin-598ea3e9|resolve_memory_plugin]]: resolve_memory_plugin 是 resolver.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
