---
title: "app/plugins/agent_memory/message_converter.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/plugins/agent_memory/message_converter.py"
source_path: "app/plugins/agent_memory/message_converter.py"
---

# app/plugins/agent_memory/message_converter.py

message_converter.py 属于插件系统模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含6 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `complex`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/plugins/agent_memory/message_converter.py)

## Tags

- #agent
- #插件
- #记忆
- #函数
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_message_converter.py-9f5773e1|tests/plugins/agent_memory/test_message_converter.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-plugins-agent_memory-hybrid_checkpointer.py-3b8741f3|app/plugins/agent_memory/hybrid_checkpointer.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-plugins-agent_memory-test_message_converter.py-9f5773e1|tests/plugins/agent_memory/test_message_converter.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-_get_role-6a3f164e|_get_role]]: _get_role 是 message_converter.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-_sanitize_tool_call-801101a1|_sanitize_tool_call]]: _sanitize_tool_call 是 message_converter.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-_truncate_tool_calls-eaa86860|_truncate_tool_calls]]: _truncate_tool_calls 是 message_converter.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-langchain_to_odata-6281cd16|langchain_to_odata]]: langchain_to_odata 是 message_converter.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-merge_chunked_odata-c690a565|merge_chunked_odata]]: merge_chunked_odata 是 message_converter.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-plugins-agent_memory-message_converter.py-odata_to_langchain-4deb726e|odata_to_langchain]]: odata_to_langchain 是 message_converter.py 中的函数，封装该文件在 插件系统 场景下的一段可复用处理逻辑。
