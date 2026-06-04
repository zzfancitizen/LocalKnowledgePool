---
title: "app/common/utils/providers.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/common/utils/providers.py"
source_path: "app/common/utils/providers.py"
---

# app/common/utils/providers.py

providers.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/common/utils/providers.py)

## Tags

- #函数
- #项目支撑
- #python

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-backend.py-fde4070b|app/common/backend.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-tools-fetch_instrument_details_tool.py-4360dc63|app/common/tools/fetch_instrument_details_tool.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-tools-python_sandbox_tool.py-cc0f8124|app/common/tools/python_sandbox_tool.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-tools-skill_tools.py-122e2ae9|app/common/tools/skill_tools.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-common-utils-agent_tool_exposure.py-0690ae92|app/common/utils/agent_tool_exposure.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-skill_loader.py-5e57af7f|app/core/skill_loader.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-core-tool_registry.py-7fb3b648|app/core/tool_registry.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-guardrails-enforcer.py-f978cafd|app/guardrails/enforcer.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-tools-test_providers.py-9115664e|tests/common/tools/test_providers.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-common-utils-providers.py-create_common_tool_provider-a732a2a3|create_common_tool_provider]]: create_common_tool_provider 是 providers.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
