---
title: "tests/plugins/test_resolver.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:tests/plugins/test_resolver.py"
source_path: "tests/plugins/test_resolver.py"
---

# tests/plugins/test_resolver.py

test_resolver.py 属于测试模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、2 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/tests/plugins/test_resolver.py)

## Tags

- #测试
- #插件
- #函数
- #类

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-in_memory.py-e45e1a33|app/plugins/in_memory.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-odata_data_access.py-489123f1|app/plugins/odata_data_access.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-stub_data_access.py-26659b47|app/plugins/stub_data_access.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-destination.py-639e463c|app/providers/mcp/destination.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-providers-mcp-server_handle.py-ffde7d80|app/providers/mcp/server_handle.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-mcp_data_access.py-34803261|app/plugins/mcp_data_access.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-__init__.py-58193335|app/plugins/agent_memory/__init__.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]] -> tested_by

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_resolver.py-TestResolveDataAccessPlugin-01d16993|TestResolveDataAccessPlugin]]: TestResolveDataAccessPlugin 是 test_resolver.py 中的类，组织 测试 相关状态与行为，包含 5 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_resolver.py-TestResolveMemoryPlugin-9922ad42|TestResolveMemoryPlugin]]: TestResolveMemoryPlugin 是 test_resolver.py 中的类，组织 测试 相关状态与行为，包含 4 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_resolver.py-_clear_resolver_cache-d804d1ab|_clear_resolver_cache]]: _clear_resolver_cache 是 test_resolver.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
