---
title: "app/providers/odata/params.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/providers/odata/params.py"
source_path: "app/providers/odata/params.py"
---

# app/providers/odata/params.py

params.py 属于项目支撑模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含2 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/node-ecb4e1|运行时基础层]]
- Complexity: `simple`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/providers/odata/params.py)

## Tags

- #odata
- #函数
- #项目支撑
- #tested

## Outgoing Links

- tested_by -> [[Treasury Transaction Agent KG/Files/tests-providers-odata-test_params.py-909cc1c4|tests/providers/odata/test_params.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-utils-mcp_body.py-bcd9fd40|app/changer/utils/mcp_body.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-changer-utils-odata.py-130c55db|app/changer/utils/odata.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-utils-mcp_backend.py-7ddb4f01|app/proposal/utils/mcp_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/app-proposal-utils-odata.py-bf1df2ff|app/proposal/utils/odata.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-providers-odata-test_params.py-909cc1c4|tests/providers/odata/test_params.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-odata-params.py-escape_odata_string-da2336cc|escape_odata_string]]: escape_odata_string 是 params.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-providers-odata-params.py-validate_odata_param-39509ad5|validate_odata_param]]: validate_odata_param 是 params.py 中的函数，封装该文件在 项目支撑 场景下的一段可复用处理逻辑。
