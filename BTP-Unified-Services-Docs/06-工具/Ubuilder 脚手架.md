---
title: Ubuilder 脚手架
aliases:
  - Ubuilder
  - Unified Services Builder
tags:
  - tool
  - sap/dev
---

# Ubuilder 脚手架 (Unified Services Builder)

> [!abstract]
> **Ubuilder** 是一个 Go 开发框架/脚手架 CLI,用于快速创建 `ManagedService` 项目及 operator/controller 代码。面向 Unified Services 开发者。

## 前置条件

- 最新版 [[uctl 命令行工具|uctl]] + URM 访问权限
- `go env -w GOPRIVATE=github.tools.sap`
- 下载:`github.tools.sap/unified-resource-manager/ubuilder/releases/latest`

## 核心命令

| 命令 | 作用 |
|------|------|
| `init` | 生成项目骨架(`go.mod`、`PROJECT` 元数据、`charts` Helm 目录)。`--repo` 和 `--managed-service` 必填 |
| `create api` | 脚手架 URM API 资源定义/controller(`--group`/`--apiVersion`/`--type`/`--resource`/`--controller`/`--tenant`\|`--solution` 互斥) |
| `create webhook` | 生成 mutating/validating webhook(须先 `create api`) |
| `add provider-resource` / `add resource` | 添加资源 |
| `generate` | 读 Go markers 生成 RTD/webhook/auth/managed service manifest |
| `generate-dictionaries` | 从 RTD YAML 生成 `.properties` i18n |
| `project-info` / `version` / `completion` / `plugin` | 辅助 |

## 配置

- 项目根 `PROJECT` 文件;全局 `~/.ubuilder/`(`CONFIG`、`plugins/`)。
- 环境变量:`ubuilder_CONFIG`、`GH_TOKEN`(插件操作必需)、`NETRC`、`GOPRIVATE`。
- 从源码 `make build/install`(需 Go 1.26+)。
- 插件基于 HashiCorp go-plugin RPC。

## 相关

- [[Unified Resource Manager (URM)]]
- [[URM Studio (VS Code 扩展)]]
- [[开发-为你的应用开发 Operator]]
- [[其他工具与 SDK]]
