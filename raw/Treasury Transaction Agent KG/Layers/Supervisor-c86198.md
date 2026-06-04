---
title: "Supervisor 编排层"
tags:
  - treasury-agent/layer
  - understand-anything
layer_id: "layer:supervisor"
node_count: 13
---

# Supervisor 编排层

负责对话状态、业务参数抽取、专家路由、结构化响应封装和流式事件输出。

> [!info]
> Layer notes are intentionally summaries. Open a file note for imports/incoming links, then open symbol notes for function/class-level detail when available.

## Most Connected Files

- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] (20 in / 23 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]] (11 in / 3 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]] (4 in / 5 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-dispatch_tools.py-c4c16ed4|app/supervisor/tools/dispatch_tools.py]] (5 in / 2 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-providers.py-9e5ebd0b|app/supervisor/utils/providers.py]] (2 in / 4 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-prompts.py-950721c4|app/supervisor/prompts.py]] (2 in / 3 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-context_tools.py-b9a85d61|app/supervisor/tools/context_tools.py]] (3 in / 1 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-types.py-d07c9c6e|app/supervisor/types.py]] (3 in / 1 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-envelope.py-0bb61fef|app/supervisor/utils/envelope.py]] (3 in / 1 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-stream_utils.py-bf7c54b4|app/supervisor/utils/stream_utils.py]] (1 in / 2 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-__init__.py-d9ab7150|app/supervisor/__init__.py]] (1 in / 1 out)
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-__init__.py-cbf72c08|app/supervisor/tools/__init__.py]] (0 in / 2 out)

## Files

- [[Treasury Transaction Agent KG/Files/app-supervisor-__init__.py-d9ab7150|app/supervisor/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-dispatch_contract.py-11533792|app/supervisor/dispatch_contract.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-prompts.py-950721c4|app/supervisor/prompts.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-__init__.py-cbf72c08|app/supervisor/tools/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-context_tools.py-b9a85d61|app/supervisor/tools/context_tools.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-tools-dispatch_tools.py-c4c16ed4|app/supervisor/tools/dispatch_tools.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-types.py-d07c9c6e|app/supervisor/types.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-__init__.py-af7afe95|app/supervisor/utils/__init__.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-dispatch_builder.py-9c1c8d99|app/supervisor/utils/dispatch_builder.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-envelope.py-0bb61fef|app/supervisor/utils/envelope.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-providers.py-9e5ebd0b|app/supervisor/utils/providers.py]]
- [[Treasury Transaction Agent KG/Files/app-supervisor-utils-stream_utils.py-bf7c54b4|app/supervisor/utils/stream_utils.py]]
