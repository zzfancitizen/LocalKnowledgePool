---
title: uctl 命令行工具
aliases:
  - uctl
  - atomctl
tags:
  - tool
  - sap/cli
---

# uctl 命令行工具

> [!abstract]
> **uctl** 是 Unified Services 官方 CLI,通过 [[Unified Resource Manager (URM)|URM]] APIs 管理资源。面向所有 SAP 内部 provider/developer。支持 Windows/macOS/Linux(64 位)、WSL。
> 注:原名 **atomctl**,2023-10-16 更名为 uctl。

## 下载

- 下载页:`github.tools.sap/unified-services/uctl/releases`
- macOS 推荐 Homebrew:`brew tap urm-community/urmtools ...` + `brew install uctl`

## 认证(两种)

- **用户登录**:`uctl login --server-url <landscape-url>`(支持 `--sso`、`--idp`、`--idp-list`、2FA `--otp`)。会话约 **24 小时**有效。
- **技术用户**(`TechnicalClient`):X.509 证书 + `apiconfig.yaml`,经环境变量 `ATOMCONFIG` 或 `--atomconfig` flag 传入。登录方式优先于技术用户证书。

## 核心命令

`login`/`logout`、`target`(设默认 base-path)、`get`、`show-tree`、`api-resources`、`create`、`update`(含升级版本,用 `-m <yaml>` 指定新版本)、`patch`、`apply`、`edit`、`delete`、`touch`(reconcile)、`extract`(跨 landscape 迁移内容,配合 `apply`)、`label`、`annotate`、`events`(排障)。

## Quick helper 命令(无需 YAML)

`create-folder`、`create-resource-group`、`update-organization/folder/resource-group`、`create-role-policy`、`create-role-policy-binding`。

## 语法

`uctl [COMMAND] [ARGUMENTS..] [FLAGS..]`,支持别名(`-r`=`--recursive`, `-p`=`--path`)。

## 相关

- [[Unified Resource Manager (URM)]]
- [[Workspace 与 CAD]](UI 替代)
- [[入门-管理用户授权]]
- [[其他工具与 SDK]]
