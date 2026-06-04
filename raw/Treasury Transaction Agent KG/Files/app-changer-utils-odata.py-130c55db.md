---
title: "app/changer/utils/odata.py"
tags:
  - treasury-agent/file
  - understand-anything
node_type: "file"
node_id: "file:app/changer/utils/odata.py"
source_path: "app/changer/utils/odata.py"
---

# app/changer/utils/odata.py

odata.py 属于Changer 执行模块，承担该区域的业务逻辑、接口契约或运行时支撑职责，结构上包含7 个函数。

- Type: `file`
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`
- Source: [source](/Users/zzfancitizen/MyProjects/TreasuryTransactionAgent-v1-fix-hitl-confirm-ticket-gate/app/changer/utils/odata.py)

## Tags

- #changer
- #odata
- #函数

## Outgoing Links

- imports -> [[Treasury Transaction Agent KG/Files/app-providers-odata-params.py-864ac9a7|app/providers/odata/params.py]]

## Incoming Links

- [[Treasury Transaction Agent KG/Files/app-changer-utils-odata_backend.py-79fb87bf|app/changer/utils/odata_backend.py]] -> imports
- [[Treasury Transaction Agent KG/Files/tests-changer-test_odata.py-068f3f21|tests/changer/test_odata.py]] -> imports

## Contained Symbols

- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata.py-build_change_main_flow_body-a4ec8533|build_change_main_flow_body]]: build_change_main_flow_body 是 odata.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata.py-build_change_main_flow_path-af4cc797|build_change_main_flow_path]]: build_change_main_flow_path 是 odata.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata.py-build_fetch_instrument_details_path-dc21ab9a|build_fetch_instrument_details_path]]: build_fetch_instrument_details_path 是 odata.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata.py-build_fetch_transaction_manage_path-a3f5c167|build_fetch_transaction_manage_path]]: build_fetch_transaction_manage_path 是 odata.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata.py-build_instrument_filter-51e060e4|build_instrument_filter]]: build_instrument_filter 是 odata.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata.py-build_terminate_instrument_body-77bd77ad|build_terminate_instrument_body]]: build_terminate_instrument_body 是 odata.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
- `function` [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata.py-build_terminate_instrument_path-84bb7273|build_terminate_instrument_path]]: build_terminate_instrument_path 是 odata.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。
