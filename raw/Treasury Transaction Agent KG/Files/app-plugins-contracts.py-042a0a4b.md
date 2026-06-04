---
title: "app/plugins/contracts.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/contracts.py"
source_path: "app/plugins/contracts.py"
---

# app/plugins/contracts.py

contracts.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含4 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/contracts.py)

## Tags

- #插件
- #类
- #插件系统
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-changer-backend.py-5123a6cd|app/changer/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-backend.py-fde4070b|app/common/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-backend.py-70da5ddf|app/proposal/backend.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-test_contracts.py-24748727|tests/plugins/test_contracts.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-plugin.py-fac2cca7|app/plugins/agent_memory/plugin.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_plugin.py-ca76c1ec|tests/plugins/agent_memory/test_plugin.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_agent_memory_wiring.py-57d91e62|tests/plugins/test_agent_memory_wiring.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_contracts.py-24748727|tests/plugins/test_contracts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_in_memory.py-86f58a86|tests/plugins/test_in_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_mcp_data_access.py-4a9ac051|tests/plugins/test_mcp_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_odata_data_access.py-bbc08ca0|tests/plugins/test_odata_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_plugin_wiring_integration.py-781d1cfa|tests/plugins/test_plugin_wiring_integration.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_resolver.py-f645ef3b|tests/plugins/test_resolver.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-test_stub_data_access.py-54c7f0bb|tests/plugins/test_stub_data_access.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_build_tools_integration.py-6ebeddd6|tests/supervisor/test_build_tools_integration.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-contracts.py-CheckpointEvictor-49357487|CheckpointEvictor]]: CheckpointEvictor 是 contracts.py 中的类，组织 插件系统 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-contracts.py-ContextStore-3472ec22|ContextStore]]: ContextStore 是 contracts.py 中的类，组织 插件系统 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-contracts.py-DataAccessPlugin-deab79a3|DataAccessPlugin]]: DataAccessPlugin 是 contracts.py 中的类，组织 插件系统 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-plugins-contracts.py-MemoryPlugin-07db55d0|MemoryPlugin]]: MemoryPlugin 是 contracts.py 中的类，组织 插件系统 相关状态与行为，包含 3 个方法。
