import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/zzfancitizen/Documents/MyKnowledge/装修/outputs/019f18a4-04b2-75b3-88b2-0f5a32ce4941";
const outputPath = `${outputDir}/装修问题与进度追踪.xlsx`;

const wb = Workbook.create();

const COLORS = {
  navy: "#1F4E78",
  blue: "#D9EAF7",
  lightBlue: "#EAF4FB",
  green: "#E2F0D9",
  yellow: "#FFF2CC",
  orange: "#FCE4D6",
  red: "#F4CCCC",
  gray: "#F3F4F6",
  border: "#D9E2EC",
  white: "#FFFFFF",
};

function title(sheet, text, range = "A1:H1") {
  const r = sheet.getRange(range);
  r.values = [[text, "", "", "", "", "", "", ""]];
  r.format.fill = { color: COLORS.blue };
  r.format.font = { bold: true, color: "#111827", size: 16 };
  r.format.rowHeightPx = 34;
  r.format.verticalAlignment = "center";
}

function writeTable(sheet, anchor, headers, rows, tableName) {
  const startCol = anchor.match(/[A-Z]+/)[0];
  const startRow = Number(anchor.match(/\d+/)[0]);
  const colCount = headers.length;
  const rowCount = rows.length + 1;
  const startColIdx = colLettersToIndex(startCol);
  const endCol = indexToColLetters(startColIdx + colCount - 1);
  const endRow = startRow + rowCount - 1;
  const range = `${anchor}:${endCol}${endRow}`;
  sheet.getRange(range).values = [headers, ...rows];
  const table = sheet.tables.add(range, true, tableName);
  table.style = "TableStyleMedium2";
  table.showFilterButton = true;
  const headerRange = sheet.getRange(`${anchor}:${endCol}${startRow}`);
  headerRange.format.fill = { color: COLORS.navy };
  headerRange.format.font = { bold: true, color: COLORS.white };
  headerRange.format.wrapText = true;
  sheet.getRange(range).format.borders = { preset: "inside", style: "thin", color: COLORS.border };
  sheet.getRange(range).format.wrapText = true;
  return { range, startRow, endRow, startCol, endCol };
}

function colLettersToIndex(letters) {
  let n = 0;
  for (const ch of letters) n = n * 26 + ch.charCodeAt(0) - 64;
  return n;
}

function indexToColLetters(index) {
  let s = "";
  while (index > 0) {
    const mod = (index - 1) % 26;
    s = String.fromCharCode(65 + mod) + s;
    index = Math.floor((index - mod) / 26);
  }
  return s;
}

function setWidths(sheet, widths) {
  for (const [col, px] of Object.entries(widths)) {
    sheet.getRange(`${col}:${col}`).format.columnWidthPx = px;
  }
}

function addListValidation(sheet, range, values) {
  sheet.getRange(range).dataValidation = {
    rule: { type: "list", values },
    prompt: { showPrompt: true, title: "可选值", message: values.join(" / ") },
  };
}

function addStatusFormatting(sheet, range) {
  const r = sheet.getRange(range);
  r.conditionalFormats.add("containsText", { text: "待追问", format: { fill: { color: COLORS.yellow } } });
  r.conditionalFormats.add("containsText", { text: "待确认", format: { fill: { color: COLORS.orange } } });
  r.conditionalFormats.add("containsText", { text: "有争议", format: { fill: { color: COLORS.red } } });
  r.conditionalFormats.add("containsText", { text: "已关闭", format: { fill: { color: COLORS.green } } });
  r.conditionalFormats.add("containsText", { text: "施工中", format: { fill: { color: COLORS.blue } } });
}

function addPriorityFormatting(sheet, range) {
  const r = sheet.getRange(range);
  r.conditionalFormats.add("containsText", { text: "高", format: { fill: { color: COLORS.red }, font: { bold: true } } });
  r.conditionalFormats.add("containsText", { text: "中", format: { fill: { color: COLORS.yellow } } });
  r.conditionalFormats.add("containsText", { text: "低", format: { fill: { color: COLORS.green } } });
}

const issues = [
  ["OI-001", "空调配合", "汇总表第7项；水电第8页第16-17项", "中央空调配套施工费688元仅写协调衔接，边界不清。", "包含协调；空调面板、安装及控制板安装由空调厂家负责，其余排线由装修公司负责。", "待追问", "高", "装修公司", "明确排线是否含线材、线管、开槽、修粉、穿线、接线；是否不按米数另收费；厂家要求增加线路时谁承担。", 688, "2026-06-30", ""],
  ["OI-002", "水电回路", "水电第8页第18项", "大功率线路按4回路计价，但回复只提洗碗机、书房电源、烘干机3项。", "洗碗机、书房电源、烘干机按回路收费，不论米数长短，没有和前面插座重复。", "待追问", "高", "装修公司", "列明4个回路分别对应设备/位置；确认线材、线管、开槽、修粉、接线全含且不重复收费。", 2192, "2026-06-30", ""],
  ["OI-003", "厨房防水", "厨房区域未见防水项", "厨房预算未列防水。", "厨房无需做防水。", "待确认", "高", "装修公司", "确认不做防水是公司标准且后续不再增项；写明水槽、下水、管根渗漏责任边界。", 0, "2026-06-30", ""],
  ["OI-004", "卫生间防水", "卫生间第5-6页；防水坝第5项", "卫生间仅列地面翻边300mm、淋浴区墙面2000mm、防水坝1m，干区和节点加强需确认。", "淋浴房刷到2米，其他区域刷到30公分，包含干区。", "待确认", "高", "装修公司", "确认面积覆盖干区、洗手台背墙、门槛石周边、管根、地漏；闭水试验和节点加强是否包含。", 1372.6, "2026-06-30", ""],
  ["OI-005", "墙面找平", "多空间“墙面冲筋找平”；其它费用第7项补差", "墙面冲筋找平合计约171.57㎡，接近全屋墙面。", "全屋冲筋找平是统帅工艺，为加强平整度、防开裂，并保证柜子、门套安装平整。", "待追问", "中", "装修公司", "确认是否必须全屋做；能否2m靠尺实测后对达标墙面减项；腻子、乳胶漆基层是否不会重复收费。", 10382.48, "2026-06-30", ""],
  ["OI-006", "美缝", "墙地砖相关美缝项", "美缝按米计价，需明确品牌、颜色、测量和损耗。", "涉及墙地砖的美缝已经包含在里面。", "待确认", "中", "装修公司", "确认包含区域、品牌/型号/颜色范围、是否清缝、最终是否按实补差或另计损耗。", 2198, "2026-06-30", ""],
  ["OI-007", "主材待定", "主材清单第1页；各空间主材项", "大量主材为品牌型号待定、按实结算。", "附件后面列了不同空间可选主材和品牌表，可提前约选材。", "待追问", "高", "装修公司", "提供预算内可选的具体品牌、系列、型号或价格区间；明确超预算是只补差价还是整项重计。", 56581.2, "2026-06-30", ""],
  ["OI-008", "定制柜", "厨房第12项；定制衣柜第1项", "橱柜15000元/套、衣柜5000元/套，口径不清。", "橱柜和衣柜看作全屋定制项目，后期找几家品牌详细沟通设计。", "待追问", "高", "装修公司", "列明预算内柜体面积/延米、板材、门板、台面、五金、抽屉、拉篮、封板、见光板、踢脚线、收口、安装。", 20000, "2026-06-30", ""],
  ["OI-009", "卫浴主材", "台盆柜、马桶、淋浴房、龙头等", "卫浴主材多为品牌型号待定。", "主材根据实际选择，按实际结算。", "待追问", "中", "装修公司", "提供预算价对应可选品牌/型号/价格范围；确认升级是否只补差价。", 9944, "2026-06-30", ""],
  ["OI-010", "灯具", "安装工程第6-12项", "灯具部分多项主材为0，只含安装或少量辅材。", "筒灯包含；主灯具业主购买，装修公司安装。", "待确认", "中", "装修公司", "确认射灯、吸顶灯、灯带、磁吸灯/线型灯的灯体、轨道、变压器、电源、开孔、接线、调试分别由谁负责。", 480.52, "2026-06-30", ""],
  ["OI-011", "窗帘", "窗帘项目第1-2项", "窗帘套餐只含10延米布帘，电机、超高、超宽另计。", "到软装馆按实际选择确定，也可外面对比选择。", "待追问", "中", "装修公司", "确认2999套餐包含内容、10延米是否够全屋、是否含纱帘/遮光布/轨道、348元/米是否锁价、电机是否不含。", 3695, "2026-06-30", ""],
  ["OI-012", "煤气管", "厨房第17-18项", "煤气管套餐含5m，超出75元/m。", "煤气表安装套餐够用。", "待确认", "低", "装修公司", "确认现场若超出5m是否仍不加钱；如加钱按75元/m，阀门、报警器、检测是否包含。", 1360, "2026-06-30", ""],
];

const progressRows = [
  ["P-001", "预算确认", "预算开放问题逐条回复并写入备注/附件", "未开始", "业主/装修公司", null, null, null, null, "开放问题表中高优先级事项关闭或形成书面备注", ""],
  ["P-002", "主材选型", "地板、瓷砖、洁具、橱柜、衣柜、灯具、窗帘预算内选型确认", "未开始", "业主/设计师", null, null, null, null, "主材选型表完整，超预算补差规则明确", ""],
  ["P-003", "开工交底", "现场交底、水电点位确认、保护和施工边界确认", "未开始", "项目经理", null, null, null, null, "交底记录签字，水电图纸确认", ""],
  ["P-004", "拆改/砌筑", "拆改、新砌墙、门洞过梁等", "未开始", "项目经理", null, null, null, null, "现场尺寸和隐蔽问题确认", ""],
  ["P-005", "水电", "强弱电回路、开槽、排管、排水、煤气管配合", "未开始", "水电工/项目经理", null, null, null, null, "水电验收通过，照片留档", ""],
  ["P-006", "防水", "卫生间、阳台及需确认的厨房防水", "未开始", "项目经理", null, null, null, null, "闭水试验记录，节点加强照片", ""],
  ["P-007", "泥木", "瓷砖铺贴、美缝、吊顶、墙面找平", "未开始", "项目经理", null, null, null, null, "铺贴、找平、吊顶验收", ""],
  ["P-008", "油漆", "腻子、乳胶漆、修补", "未开始", "项目经理", null, null, null, null, "墙面平整、无明显裂缝色差", ""],
  ["P-009", "安装", "橱柜、衣柜、洁具、灯具、开关面板、窗帘", "未开始", "项目经理/供应商", null, null, null, null, "安装清单完成，功能测试通过", ""],
  ["P-010", "竣工验收", "竣工清单、尾款、保修资料", "未开始", "业主/装修公司", null, null, null, null, "问题清单关闭，资料交付", ""],
];

const materialRows = [
  ["M-001", "地板", "强化复合地板", "品牌/型号待定", "", "预算单价200元/㎡", "", "", "待选型", "确认可选系列、颜色、损耗率", ""],
  ["M-002", "墙地砖", "厨房/卫生间/阳台墙地砖", "品牌/型号待定", "", "墙地砖预算单价120元/㎡", "", "", "待选型", "确认规格对应铺贴人工和辅材是否加价", ""],
  ["M-003", "橱柜", "整体橱柜", "品牌/型号待定", "", "预算15000元/套", "", "", "待选型", "拆分延米、台面、板材、五金、拉篮", ""],
  ["M-004", "衣柜", "整体成品衣柜", "品牌/型号待定", "", "预算5000元/套", "", "", "待选型", "确认投影/展开面积和包含件", ""],
  ["M-005", "卫浴", "台盆柜/马桶/淋浴房/龙头", "品牌/型号待定", "", "按预算占位价", "", "", "待选型", "确认预算内可选型号和补差规则", ""],
  ["M-006", "灯具", "筒灯/射灯/主灯/灯带/磁吸灯", "部分含，部分业主自购", "", "多项主材为0", "", "", "待选型", "确认轨道、变压器、电源和安装边界", ""],
  ["M-007", "窗帘", "全屋窗帘套餐", "软装馆待选", "", "预算3695元", "", "", "待选型", "确认米数、纱帘、遮光布、轨道和电机", ""],
];

const changeRows = [
  ["CO-001", "", "预算确认", "厨房防水是否补项", "待报价", null, null, "未提交", "未签字", "待定", "若公司坚持不做，需写责任边界", ""],
  ["CO-002", "", "主材选型", "主材超预算补差", "待选型", null, null, "未提交", "未签字", "待定", "每项只补差价还是重算需明确", ""],
];

const onsiteRows = [
  ["SI-001", "", "水电", "全屋", "水电回路和点位需现场放线确认", "待处理", "业主/项目经理", "", "水电点位图签字，照片留档", "", ""],
  ["SI-002", "", "防水", "卫生间/阳台", "闭水试验和管根地漏加强需留档", "待处理", "项目经理", "", "闭水记录和照片", "", ""],
];

const paymentRows = [
  ["PAY-001", "预算总价", "预算汇总", 213457, "", "待确认", "总价是否含税、发票税率和付款节点需从合同主体确认", ""],
  ["PAY-002", "防水相关", "卫生间/阳台/防水坝", 1372.6, "", "待确认", "厨房无防水；卫生间干区和节点加强需确认", ""],
  ["PAY-003", "主材占位", "主材清单", 56581.2, "", "待确认", "按实际选择结算，需锁预算内可选范围", ""],
];

const contactsRows = [
  ["装修公司/预算员", "", "", "", "预算解释、增减项报价", ""],
  ["设计师", "", "", "", "选材、图纸、风格把控", ""],
  ["项目经理", "", "", "", "现场施工、进度、验收", ""],
  ["空调厂家", "", "", "", "空调面板、控制板安装、设备安装", ""],
  ["业主", "", "", "", "确认、签字、付款、验收", ""],
];

const dashboard = wb.worksheets.add("总览");
const issueSheet = wb.worksheets.add("开放问题");
const progress = wb.worksheets.add("施工进度");
const site = wb.worksheets.add("现场问题");
const change = wb.worksheets.add("变更增减项");
const materials = wb.worksheets.add("主材选型");
const payments = wb.worksheets.add("付款验收");
const contacts = wb.worksheets.add("联系人");

// Dashboard
dashboard.showGridLines = false;
title(dashboard, "装修问题与进度追踪", "A1:H1");
dashboard.getRange("A3:B9").values = [
  ["项目", "普陀区富平路889弄26号1301"],
  ["预算附件", "第八分公司-张之凡-预算合同.pdf"],
  ["预算总价", 213457],
  ["当前重点", "预算开放问题、主材锁价、水电/防水边界"],
  ["更新日期", new Date("2026-06-30")],
  ["使用说明", "先关闭开放问题，再按施工进度持续记录现场问题、变更和付款验收。"],
  ["关键原则", "所有增项先报价、先书面确认、再施工。"],
];
dashboard.getRange("A3:A9").format.font = { bold: true };
dashboard.getRange("B5").setNumberFormat("#,##0");
dashboard.getRange("B7").setNumberFormat("yyyy-mm-dd");
dashboard.getRange("A3:B9").format.fill = { color: COLORS.lightBlue };
dashboard.getRange("A3:B9").format.borders = { preset: "outside", style: "thin", color: COLORS.border };
dashboard.getRange("A11:H11").values = [["指标", "数量/金额", "说明", "", "状态", "数量", "金额", "备注"]];
dashboard.getRange("A11:H11").format.fill = { color: COLORS.navy };
dashboard.getRange("A11:H11").format.font = { bold: true, color: COLORS.white };
dashboard.getRange("A12:H17").values = [
  ["开放问题总数", null, "开放问题表总行数", "", "待追问", null, null, ""],
  ["高优先级问题", null, "优先级为高的问题", "", "待确认", null, null, ""],
  ["已关闭问题", null, "状态为已关闭", "", "有争议", null, null, ""],
  ["待追问问题", null, "状态为待追问", "", "已关闭", null, null, ""],
  ["当前关联金额", null, "开放问题中关联金额合计", "", "施工中", null, null, ""],
  ["主材占位金额", 56581.2, "来自主材清单合计", "", "未开始", null, null, ""],
];
dashboard.getRange("B12:B16").formulas = [
  ["=COUNTA('开放问题'!$A$2:$A$200)"],
  ["=COUNTIF('开放问题'!$G$2:$G$200,\"高\")"],
  ["=COUNTIF('开放问题'!$F$2:$F$200,\"已关闭\")"],
  ["=COUNTIF('开放问题'!$F$2:$F$200,\"待追问\")"],
  ["=SUM('开放问题'!$J$2:$J$200)"],
];
dashboard.getRange("F12:F17").formulas = [
  ["=COUNTIF('开放问题'!$F$2:$F$200,E12)"],
  ["=COUNTIF('开放问题'!$F$2:$F$200,E13)"],
  ["=COUNTIF('开放问题'!$F$2:$F$200,E14)"],
  ["=COUNTIF('开放问题'!$F$2:$F$200,E15)"],
  ["=COUNTIF('施工进度'!$D$2:$D$200,E16)"],
  ["=COUNTIF('施工进度'!$D$2:$D$200,E17)"],
];
dashboard.getRange("G12:G17").formulas = [
  ["=SUMIF('开放问题'!$F$2:$F$200,E12,'开放问题'!$J$2:$J$200)"],
  ["=SUMIF('开放问题'!$F$2:$F$200,E13,'开放问题'!$J$2:$J$200)"],
  ["=SUMIF('开放问题'!$F$2:$F$200,E14,'开放问题'!$J$2:$J$200)"],
  ["=SUMIF('开放问题'!$F$2:$F$200,E15,'开放问题'!$J$2:$J$200)"],
  ["=0"],
  ["=0"],
];
dashboard.getRange("B16:B17").setNumberFormat("#,##0.00");
dashboard.getRange("G12:G17").setNumberFormat("#,##0.00");
dashboard.getRange("A12:H17").format.borders = { preset: "inside", style: "thin", color: COLORS.border };
setWidths(dashboard, { A: 180, B: 120, C: 260, D: 24, E: 110, F: 80, G: 100, H: 160 });

// Open issues
issueSheet.showGridLines = false;
const issueHeaders = ["ID", "类别", "预算位置", "问题描述", "装修公司回复", "状态", "优先级", "责任人", "下一步/要求", "关联金额", "最后更新", "关闭说明"];
writeTable(issueSheet, "A1", issueHeaders, issues, "OpenIssues");
issueSheet.freezePanes.freezeRows(1);
setWidths(issueSheet, { A: 70, B: 100, C: 170, D: 280, E: 300, F: 90, G: 70, H: 100, I: 330, J: 90, K: 90, L: 220 });
issueSheet.getRange("J2:J60").setNumberFormat("#,##0.00");
issueSheet.getRange("K2:K60").setNumberFormat("yyyy-mm-dd");
addListValidation(issueSheet, "F2:F60", ["待追问", "待确认", "有争议", "已确认", "已关闭", "施工中"]);
addListValidation(issueSheet, "G2:G60", ["高", "中", "低"]);
addStatusFormatting(issueSheet, "F2:F60");
addPriorityFormatting(issueSheet, "G2:G60");

// Progress
progress.showGridLines = false;
const progressHeaders = ["ID", "阶段", "任务/范围", "状态", "负责人", "计划开始", "计划结束", "实际开始", "实际结束", "验收/完成标准", "备注"];
writeTable(progress, "A1", progressHeaders, progressRows, "Progress");
progress.freezePanes.freezeRows(1);
setWidths(progress, { A: 70, B: 100, C: 260, D: 90, E: 120, F: 95, G: 95, H: 95, I: 95, J: 280, K: 220 });
addListValidation(progress, "D2:D60", ["未开始", "施工中", "待验收", "已完成", "暂停", "有风险"]);
addStatusFormatting(progress, "D2:D60");
progress.getRange("F2:I60").setNumberFormat("yyyy-mm-dd");

// Site issues
site.showGridLines = false;
const siteHeaders = ["ID", "发现日期", "阶段", "位置", "问题描述", "状态", "责任人", "截止日期", "处理要求/验收标准", "照片/证据链接", "关闭记录"];
writeTable(site, "A1", siteHeaders, onsiteRows, "SiteIssues");
site.freezePanes.freezeRows(1);
setWidths(site, { A: 70, B: 95, C: 100, D: 120, E: 300, F: 90, G: 120, H: 95, I: 280, J: 200, K: 220 });
addListValidation(site, "F2:F60", ["待处理", "处理中", "待验收", "已关闭", "有争议"]);
addStatusFormatting(site, "F2:F60");
site.getRange("B2:B60").setNumberFormat("yyyy-mm-dd");
site.getRange("H2:H60").setNumberFormat("yyyy-mm-dd");

// Change orders
change.showGridLines = false;
const changeHeaders = ["ID", "提出日期", "阶段", "变更事项", "原因", "报价金额", "最终金额", "报价状态", "签字状态", "结算状态", "备注", "证据链接"];
writeTable(change, "A1", changeHeaders, changeRows, "ChangeOrders");
change.freezePanes.freezeRows(1);
setWidths(change, { A: 70, B: 95, C: 100, D: 240, E: 180, F: 90, G: 90, H: 90, I: 90, J: 90, K: 260, L: 180 });
addListValidation(change, "H2:H60", ["未提交", "已报价", "需修改", "已确认"]);
addListValidation(change, "I2:I60", ["未签字", "已签字", "不需要"]);
addListValidation(change, "J2:J60", ["待定", "计入结算", "不计入结算", "已关闭"]);
change.getRange("B2:B60").setNumberFormat("yyyy-mm-dd");
change.getRange("F2:G60").setNumberFormat("#,##0.00");

// Materials
materials.showGridLines = false;
const materialHeaders = ["ID", "类别", "项目", "预算内品牌/型号", "最终选择", "预算价/口径", "最终价", "补差金额", "状态", "待确认事项", "备注"];
writeTable(materials, "A1", materialHeaders, materialRows, "Materials");
materials.freezePanes.freezeRows(1);
setWidths(materials, { A: 70, B: 100, C: 200, D: 220, E: 200, F: 150, G: 90, H: 90, I: 90, J: 300, K: 220 });
addListValidation(materials, "I2:I60", ["待选型", "已选型", "待补差", "已确认", "取消"]);
addStatusFormatting(materials, "I2:I60");
materials.getRange("G2:H60").setNumberFormat("#,##0.00");

// Payments
payments.showGridLines = false;
const paymentHeaders = ["ID", "事项", "依据", "预算/应付金额", "实际支付日期", "状态", "说明", "凭证链接"];
writeTable(payments, "A1", paymentHeaders, paymentRows, "Payments");
payments.freezePanes.freezeRows(1);
setWidths(payments, { A: 70, B: 140, C: 180, D: 110, E: 110, F: 90, G: 330, H: 180 });
addListValidation(payments, "F2:F60", ["待确认", "待支付", "已支付", "待验收", "已验收", "有争议"]);
addStatusFormatting(payments, "F2:F60");
payments.getRange("D2:D60").setNumberFormat("#,##0.00");
payments.getRange("E2:E60").setNumberFormat("yyyy-mm-dd");

// Contacts
contacts.showGridLines = false;
const contactsHeaders = ["角色", "姓名", "电话/微信", "公司", "职责", "备注"];
writeTable(contacts, "A1", contactsHeaders, contactsRows, "Contacts");
contacts.freezePanes.freezeRows(1);
setWidths(contacts, { A: 140, B: 110, C: 160, D: 160, E: 260, F: 220 });

for (const sheet of [dashboard, issueSheet, progress, site, change, materials, payments, contacts]) {
  const used = sheet.getUsedRange();
  if (used) {
    used.format.font = { name: "Arial", size: 10 };
    used.format.verticalAlignment = "top";
    used.format.wrapText = true;
  }
}

// Re-apply title font after global body style.
dashboard.getRange("A1:H1").format.font = { bold: true, color: "#111827", size: 16 };
dashboard.getRange("A1:H1").format.wrapText = false;
dashboard.getRange("A1:H1").format.rowHeightPx = 32;

await fs.mkdir(outputDir, { recursive: true });

const inspect = await wb.inspect({
  kind: "sheet,table",
  maxChars: 6000,
  tableMaxRows: 3,
  tableMaxCols: 6,
});
console.log(inspect.ndjson);

const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

for (const sheetName of ["总览", "开放问题", "施工进度", "现场问题", "变更增减项", "主材选型", "付款验收", "联系人"]) {
  const preview = await wb.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  const bytes = new Uint8Array(await preview.arrayBuffer());
  await fs.writeFile(`${outputDir}/preview-${sheetName}.png`, bytes);
}

const exported = await SpreadsheetFile.exportXlsx(wb);
await exported.save(outputPath);
console.log(`saved:${outputPath}`);
