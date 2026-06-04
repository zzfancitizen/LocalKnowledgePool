---
title: "app/core/skill_loader.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/core/skill_loader.py"
source_path: "app/core/skill_loader.py"
---

# app/core/skill_loader.py

skill_loader.py 属于核心基础设施模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含1 个类。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/core/skill_loader.py)

## Tags

- #类
- #核心基础设施
- #python
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-common-types.py-5fdf7621|app/common/types.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-core-test_skill_loader.py-0aa48e26|tests/core/test_skill_loader.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-agent.py-339dc8e2|app/changer/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-prompts.py-245cc447|app/changer/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-common-tools-skill_tools.py-122e2ae9|app/common/tools/skill_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-common-utils-providers.py-b1bcea10|app/common/utils/providers.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-core-__init__.py-14a9f6d1|app/core/__init__.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-prompts.py-7f27f9e7|app/proposal/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-agent.py-4025fc8a|app/supervisor/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-supervisor-prompts.py-950721c4|app/supervisor/prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_business_case_skills.py-fd8397e2|tests/common/test_business_case_skills.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_skill_tools_logging.py-bbd127f1|tests/common/test_skill_tools_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-common-test_tools.py-dee06386|tests/common/test_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_skill_header.py-e82b1706|tests/core/test_skill_header.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-core-test_skill_loader.py-0aa48e26|tests/core/test_skill_loader.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_domain_skills.py-a80a82ec|tests/proposal/test_domain_skills.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_prompts.py-7fc96e38|tests/proposal/test_prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_skill_loading.py-1385360b|tests/proposal/test_skill_loading.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_status_logging.py-f9b08376|tests/proposal/test_status_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_structured_output.py-93453a65|tests/proposal/test_structured_output.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_awaiting_input_propagation.py-915ad6b7|tests/supervisor/test_awaiting_input_propagation.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_memory.py-a48a4a44|tests/supervisor/test_memory.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_prompts.py-d3f9f46e|tests/supervisor/test_prompts.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_status_logging.py-8a3fdd04|tests/supervisor/test_status_logging.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-supervisor-test_tools.py-b49f5e46|tests/supervisor/test_tools.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-test_proposal_dispatch_integration.py-a6daa3dc|tests/test_proposal_dispatch_integration.py]] -> imports

## Contained Symbols

- `class` [[Treasury Transaction Agent KG/Symbols/app-core-skill_loader.py-RuntimeSkillLoader-e0992acd|RuntimeSkillLoader]]: RuntimeSkillLoader 是 skill_loader.py 中的类，组织 核心基础设施 相关状态与行为，包含 13 个方法。
