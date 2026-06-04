---
title: "transform_instrument_details"
tags:
  - treasury-agent/symbol
  - understand-anything
node_type: "function"
node_id: "function:app/changer/utils/odata_transform.py:transform_instrument_details"
source_path: "app/changer/utils/odata_transform.py"
---

# transform_instrument_details

transform_instrument_details 是 odata_transform.py 中的函数，封装该文件在 Changer 执行 场景下的一段可复用处理逻辑。

- Type: `function`
- Parent file: [[Treasury Transaction Agent KG/Files/app-changer-utils-odata_transform.py-784fa54a|app/changer/utils/odata_transform.py]]
- Layer: [[Treasury Transaction Agent KG/Layers/Agent-195609|专业 Agent 层]]
- Complexity: `moderate`

## Tags

- #函数
- #Changer-执行

## Outgoing Symbol Links

- calls -> [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata_transform.py-_extract_main_flow_type-bf2b4ecd|app/changer/utils/odata_transform.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata_transform.py-_extract_attribute-9a5d9f8f|app/changer/utils/odata_transform.py]]
- calls -> [[Treasury Transaction Agent KG/Symbols/app-changer-utils-odata_transform.py-_extract_condition_rate-bc21ad5c|app/changer/utils/odata_transform.py]]

## Incoming Symbol Links

- [[Treasury Transaction Agent KG/Files/app-changer-utils-odata_transform.py-784fa54a|app/changer/utils/odata_transform.py]] -> contains
