---
title: "extract_token_usage"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/core/token_usage.py:extract_token_usage"
source_path: "app/core/token_usage.py"
---

# extract_token_usage

extract_token_usage 是 token_usage.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`

## Tags

- #函数
- #核心基础设施

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-_extract_cache_tokens-b86a7118|app/core/token_usage.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-core-token_usage.py-_safe_completion_cost-a0c189fd|app/core/token_usage.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-core-token_usage.py-00d0e35e|app/core/token_usage.py]] -> contains
