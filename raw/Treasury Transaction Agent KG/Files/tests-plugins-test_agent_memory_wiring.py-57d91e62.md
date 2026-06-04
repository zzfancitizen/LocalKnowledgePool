---
title: "tests/plugins/test_agent_memory_wiring.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:tests/plugins/test_agent_memory_wiring.py"
source_path: "tests/plugins/test_agent_memory_wiring.py"
---

# tests/plugins/test_agent_memory_wiring.py

test_agent_memory_wiring.py 属于测试模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数、7 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-93ec47|评测与测试层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/tests/plugins/test_agent_memory_wiring.py)

## Tags

- #测试
- #agent
- #插件
- #记忆
- #函数

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-__init__.py-58193335|app/plugins/agent_memory/__init__.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-context_store.py-67955bfd|app/plugins/agent_memory/context_store.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-evictor.py-d869e38c|app/plugins/agent_memory/evictor.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-contracts.py-042a0a4b|app/plugins/contracts.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-resolver.py-3a0d2707|app/plugins/resolver.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-hybrid_checkpointer.py-3b8741f3|app/plugins/agent_memory/hybrid_checkpointer.py]]

## Incoming Links

- none

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-TestAgentMemoryCheckpointerPerAgent-1b4fe218|TestAgentMemoryCheckpointerPerAgent]]: TestAgentMemoryCheckpointerPerAgent 是 test_agent_memory_wiring.py 中的类，组织 测试 相关状态与行为，包含 2 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-TestAgentMemoryContextStoreRoundtrip-1315c5b3|TestAgentMemoryContextStoreRoundtrip]]: TestAgentMemoryContextStoreRoundtrip 是 test_agent_memory_wiring.py 中的类，组织 测试 相关状态与行为，包含 2 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-TestAgentMemoryEvictorWiring-ed950473|TestAgentMemoryEvictorWiring]]: TestAgentMemoryEvictorWiring 是 test_agent_memory_wiring.py 中的类，组织 测试 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-TestAgentMemoryPluginSatisfiesProtocol-2dddf80d|TestAgentMemoryPluginSatisfiesProtocol]]: TestAgentMemoryPluginSatisfiesProtocol 是 test_agent_memory_wiring.py 中的类，组织 测试 相关状态与行为，包含 4 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-TestAllAgentsReceiveSameMemoryPlugin-74a0ac6f|TestAllAgentsReceiveSameMemoryPlugin]]: TestAllAgentsReceiveSameMemoryPlugin 是 test_agent_memory_wiring.py 中的类，组织 测试 相关状态与行为，包含 1 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-TestCheckpointerSaveAndLoadRoundtrip-10daa0f7|TestCheckpointerSaveAndLoadRoundtrip]]: TestCheckpointerSaveAndLoadRoundtrip 是 test_agent_memory_wiring.py 中的类，组织 测试 相关状态与行为，包含 3 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-TestResolverWiresAgentMemoryPlugin-1c9bfecf|TestResolverWiresAgentMemoryPlugin]]: TestResolverWiresAgentMemoryPlugin 是 test_agent_memory_wiring.py 中的类，组织 测试 相关状态与行为，包含 1 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/tests-plugins-test_agent_memory_wiring.py-_make_plugin-0d7aaa87|_make_plugin]]: _make_plugin 是 test_agent_memory_wiring.py 中的函数，封装该文件在 测试 场景下的一段可复用处理逻辑。
