---
title: URM Studio (VS Code 扩展)
aliases:
  - URM Studio
tags:
  - tool
  - sap/dev
---

# URM Studio (VS Code 扩展)

> [!abstract]
> **URM Studio** 是一个 **VS Code 扩展**,用于 SAP-managed SaaS 应用/应用组向 Unified Services onboarding 与建模。面向规模化、专业化开发。source-code-first,基于 **Helm + YAML + Git**。当前为 **alpha** 版。

## 核心能力

- 新 app/product blueprint 的引导式脚手架
- 将现有 URM 文件夹/[[Workspace 与 CAD|Workspace]] 项目导入并转为 Helm 项目
- PROJECT MANAGER 语义化面板管理资源
- 可视化/YAML 编辑器建模 RTD
- **CHART PREVIEW** 部署前预览 Helm chart
- staged development(`dev`/`test`/`preprod`/`production`)
- CI/CD 集成

## 安装

- 从 `int.repositories.cloud.sap/.../urm-studio/release/` 下载 `.vsix`,VS Code `Extensions: Install from VSIX`。
- Windows 需手动装 Helm;macOS/Linux 自动装。
- 最低 VS Code 版本 `1.80.0`。更新前须先卸载旧版本。

## 手动部署命令

- 首次:`helm urm install [NAME] [CHART] -p <urm-path>`
- 后续:`helm urm upgrade`
- 常用 flag:`--timeout`、`--atomic`(失败自动回滚)、`--take-ownership`。
- UCA 应用须附加 `--values ./charts/urm/values.cloud-automation-secret.yaml`(**切勿提交 Git**)。

## 支持

- 报 bug:SAP JIRA **SAPBTPCFSBUG**("Unified Resource Manager Studio" 组件)
- 提问:MS Teams "URM Studio Alpha Support" 频道

## 相关

- [[Ubuilder 脚手架]]
- [[其他工具与 SDK#Helm Plugin]]
- [[How-To 其他任务#CI-CD Your Environment]]
