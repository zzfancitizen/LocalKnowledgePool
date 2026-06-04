---
title: "load_mcp_overrides"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/providers/mcp/config.py:load_mcp_overrides"
source_path: "app/providers/mcp/config.py"
---

# load_mcp_overrides

load_mcp_overrides 是 config.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`

## Tags

- #函数
- #项目支撑

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-_parse_tool_filter-706c943f|app/providers/mcp/config.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-providers-mcp-config.py-d59585f9|app/providers/mcp/config.py]] -> contains
- [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-config.py-load_mcp_servers-3df79eb0|app/providers/mcp/config.py]] -> calls
