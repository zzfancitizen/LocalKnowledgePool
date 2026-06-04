---
title: "app/core/token_usage.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/token_usage.py"
source_path: "app/core/token_usage.py"
---

# app/core/token_usage.py

token_usage.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含14 个函数、3 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/token_usage.py)

## Tags

- #函数
- #类
- #核心基础设施
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_token_usage.py-05351198|tests/core/test_token_usage.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-agent_executor.py-87c591ed|app/agent_executor.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-observability.py-650ac986|app/core/observability.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_token_usage.py-05351198|tests/core/test_token_usage.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-_GlobalUsageAccumulator-5b6bd073|_GlobalUsageAccumulator]]: _GlobalUsageAccumulator 是 token_usage.py 中的类，组织 核心基础设施 相关状态与行为，包含 4 个方法。
- `class` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-LlmTokenUsage-4b862c35|LlmTokenUsage]]: LlmTokenUsage 是 token_usage.py 中的类，组织 核心基础设施 相关状态与行为。
- `class` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-LlmTokenUsageSummary-25c821a8|LlmTokenUsageSummary]]: LlmTokenUsageSummary 是 token_usage.py 中的类，组织 核心基础设施 相关状态与行为。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-_extract_cache_tokens-b86a7118|_extract_cache_tokens]]: _extract_cache_tokens 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-_safe_completion_cost-a0c189fd|_safe_completion_cost]]: _safe_completion_cost 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-compute_usage_delta-7ff164d6|compute_usage_delta]]: compute_usage_delta 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-extract_token_usage-47e3a02a|extract_token_usage]]: extract_token_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-get_current_llm_call_count-dd00fe8e|get_current_llm_call_count]]: get_current_llm_call_count 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-get_global_usage_summary-776767a2|get_global_usage_summary]]: get_global_usage_summary 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-get_request_usage_summary-301f02f6|get_request_usage_summary]]: get_request_usage_summary 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-log_request_usage_summary-7f64c0d4|log_request_usage_summary]]: log_request_usage_summary 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-merge_usage-a86ee15a|merge_usage]]: merge_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-record_global_usage-b5a15be9|record_global_usage]]: record_global_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-record_token_usage-c22f8001|record_token_usage]]: record_token_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-reset_global_usage-1e59f996|reset_global_usage]]: reset_global_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-reset_request_usage-d6961b28|reset_request_usage]]: reset_request_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-snapshot_usage-0c5bc344|snapshot_usage]]: snapshot_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
