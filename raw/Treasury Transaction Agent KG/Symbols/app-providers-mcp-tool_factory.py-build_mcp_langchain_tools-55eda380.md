---
title: "build_mcp_langchain_tools"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/providers/mcp/tool_factory.py:build_mcp_langchain_tools"
source_path: "app/providers/mcp/tool_factory.py"
---

# build_mcp_langchain_tools

build_mcp_langchain_tools 是 tool_factory.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_factory.py-ecad45b0|app/providers/mcp/tool_factory.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`

## Tags

- #函数
- #项目支撑

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-normalize_name-26b8e690|app/providers/mcp/tool_factory.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-_build_args_model-506d0b0d|app/providers/mcp/tool_factory.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-providers-mcp-tool_factory.py-_build_handler-d14ad255|app/providers/mcp/tool_factory.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-providers-mcp-tool_factory.py-ecad45b0|app/providers/mcp/tool_factory.py]] -> contains
