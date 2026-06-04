---
title: "app/core/observability.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/observability.py"
source_path: "app/core/observability.py"
---

# app/core/observability.py

observability.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含8 个函数、1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/observability.py)

## Tags

- #函数
- #类
- #核心基础设施
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_observability.py-00d14bc5|tests/core/test_observability.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-agent_executor.py-87c591ed|app/agent_executor.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-__init__.py-14a9f6d1|app/core/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-checkpoint_eviction.py-67079dce|app/core/checkpoint_eviction.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-push_notification.py-5bbb018d|app/core/push_notification.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-providers-llm-router.py-d759664a|app/providers/llm/router.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_llm_fallback_observability.py-0b0a4ed8|tests/core/test_llm_fallback_observability.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_observability.py-00d14bc5|tests/core/test_observability.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-_OperationTracker-f9968632|_OperationTracker]]: _OperationTracker 是 observability.py 中的类，组织 核心基础设施 相关状态与行为，包含 3 个方法。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-_normalize_model_name-674201e0|_normalize_model_name]]: _normalize_model_name 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-on_llm_failure-358b9c3a|on_llm_failure]]: on_llm_failure 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-on_llm_success-95c05c6b|on_llm_success]]: on_llm_success 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-record_llm_completion-5f11d27b|record_llm_completion]]: record_llm_completion 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-register_fallback_callbacks-d3083371|register_fallback_callbacks]]: register_fallback_callbacks 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-track_operation-6e212c4f|track_operation]]: track_operation 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-track_operation_generator-007fffa3|track_operation_generator]]: track_operation_generator 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-observability.py-track_operation_sync-47e76478|track_operation_sync]]: track_operation_sync 是 observability.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
