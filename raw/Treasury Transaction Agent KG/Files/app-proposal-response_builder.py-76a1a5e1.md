---
title: "app/proposal/response_builder.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/proposal/response_builder.py"
source_path: "app/proposal/response_builder.py"
---

# app/proposal/response_builder.py

response_builder.py 属于Proposal 专家模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含6 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/proposal/response_builder.py)

## Tags

- #proposal
- #函数
- #Proposal-专家
- #tested

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-types.py-1546c3a4|app/proposal/types.py]]
- imports -> [[Treasury Transaction Agent KG/Files/app-proposal-utils-mcp_backend.py-7ddb4f01|app/proposal/utils/mcp_backend.py]]
- tested_by -> [[Treasury Transaction Agent KG/Files/tests-proposal-test_response_builder.py-8609d297|tests/proposal/test_response_builder.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-proposal-agent.py-ef20cb87|app/proposal/agent.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_build_response.py-6462cd2a|tests/proposal/test_build_response.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-proposal-test_response_builder.py-8609d297|tests/proposal/test_response_builder.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-response_builder.py-_extract_deals_from_mcp_result-a1569557|_extract_deals_from_mcp_result]]: _extract_deals_from_mcp_result 是 response_builder.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-response_builder.py-_is_proposal_list_tool-a06125e6|_is_proposal_list_tool]]: _is_proposal_list_tool 是 response_builder.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-response_builder.py-_transform_odata_record-018f6bee|_transform_odata_record]]: _transform_odata_record 是 response_builder.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-response_builder.py-build_fallback_response-4871ec2e|build_fallback_response]]: build_fallback_response 是 response_builder.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-response_builder.py-build_premature_proposal_response-51c4a41d|build_premature_proposal_response]]: build_premature_proposal_response 是 response_builder.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-proposal-response_builder.py-build_proposal_response-c97c4c62|build_proposal_response]]: build_proposal_response 是 response_builder.py 中的函数，封装该文件在 Proposal 专家 场景下的一段可复用处理逻辑。
