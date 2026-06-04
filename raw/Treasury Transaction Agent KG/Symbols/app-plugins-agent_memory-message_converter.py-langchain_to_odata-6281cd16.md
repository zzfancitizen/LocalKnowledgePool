---
title: "langchain_to_odata"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/plugins/agent_memory/message_converter.py:langchain_to_odata"
source_path: "app/plugins/agent_memory/message_converter.py"
---

# langchain_to_odata

langchain_to_odata 是 message_converter.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-message_converter.py-84e5706a|app/plugins/agent_memory/message_converter.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`

## Tags

- #函数
- #插件系统

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-_get_role-6a3f164e|app/plugins/agent_memory/message_converter.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-_truncate_tool_calls-eaa86860|app/plugins/agent_memory/message_converter.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-message_converter.py-84e5706a|app/plugins/agent_memory/message_converter.py]] -> contains
