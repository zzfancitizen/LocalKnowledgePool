---
title: "app/core/prompt_utils.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/prompt_utils.py"
source_path: "app/core/prompt_utils.py"
---

# app/core/prompt_utils.py

prompt_utils.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含3 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/prompt_utils.py)

## Tags

- #函数
- #核心基础设施
- #python
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_prompt_utils.py-c6db4790|tests/core/test_prompt_utils.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-prompts.py-245cc447|app/changer/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-prompts.py-7f27f9e7|app/proposal/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_prompt_utils.py-c6db4790|tests/core/test_prompt_utils.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-core-prompt_utils.py-build_cached_system_message-6b80ca89|build_cached_system_message]]: build_cached_system_message 是 prompt_utils.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-prompt_utils.py-format_case_context_preamble-0fe72719|format_case_context_preamble]]: format_case_context_preamble 是 prompt_utils.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-core-prompt_utils.py-format_tool_summaries-906ac1d2|format_tool_summaries]]: format_tool_summaries 是 prompt_utils.py 中的函数，封装该文件在 核心基础设施 场景下的一段可复用处理逻辑。
