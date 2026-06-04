---
title: "trim_for_llm"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/core/message_trim.py:trim_for_llm"
source_path: "app/core/message_trim.py"
---

# trim_for_llm

trim_for_llm 是 message_trim.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-core-message_trim.py-a18fab8e|app/core/message_trim.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`

## Tags

- #函数
- #核心基础设施

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-_resolve_max_tokens-ce79e38f|app/core/message_trim.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-core-message_trim.py-repair_tool_pairs-585ebbbb|app/core/message_trim.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-core-message_trim.py-a18fab8e|app/core/message_trim.py]] -> contains
