---
title: "app/agent_executor.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/agent_executor.py"
source_path: "app/agent_executor.py"
---

# app/agent_executor.py

agent_executor.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/A2A-473f1c|A2A 入口与协议层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/agent_executor.py)

## Tags

- #agent
- #函数
- #类
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-observer_bus.py-3c4e066d|app/core/observer_bus.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-test_agent_executor.py-95901752|tests/test_agent_executor.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-main.py-ad934351|app/main.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_agent_executor.py-95901752|tests/test_agent_executor.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-agent_executor.py-AgentExecutor-26961e19|AgentExecutor]]: AgentExecutor 是 agent_executor.py 中的类，组织 项目支撑 相关状态与行为，包含 5 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-agent_executor.py-_heartbeat_loop-9d15e0d8|_heartbeat_loop]]: _heartbeat_loop 是 agent_executor.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-agent_executor.py-_publish_observer_response-471afaf1|_publish_observer_response]]: _publish_observer_response 是 agent_executor.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
