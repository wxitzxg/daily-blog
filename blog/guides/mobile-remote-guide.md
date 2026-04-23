---
title: "手机远程控制 AI 编程工具完全指南"
created: 2026-04-23
description: "将桌面 AI 编程代理的能力延伸到手机端，实现随时随地发起任务、查看进度、补充需求"
category: guides
tags: [远程控制, 手机编程, paseo, lunel, claude-code, codex, opencode]
---

很多人以为"手机上用 AI 编程"，意味着把模型直接跑在手机里。

更实用的方案其实是另一种：

**手机负责发起任务和查看进度，真正的代码代理仍然运行在桌面电脑上。**

本文介绍两种主流方案：Paseo 和 Lunel，帮助你选择最适合的工具。

## 1. 为什么需要远程控制

### 传统方式的局限

把开发流程强行塞进手机有几个问题：

- 手机算力有限，无法运行大模型
- 开发环境（依赖、Git、SSH、密钥）难以完整迁移
- 屏幕太小，不适合复杂编码

### 远程控制的优势

手机作为远程控制入口，电脑负责实际执行：

- **保留桌面环境**：本地依赖、终端环境、仓库状态、权限和密钥都能直接复用
- **移动端接管更自然**：外出时随时补充需求、查看执行结果、继续刚才的线程
- **多代理统一管理**：一个入口管理 Claude Code、Codex、OpenCode 等多个工具

这种体验很像：

**电脑在执行，手机在指挥。**

## 2. Paseo 工具介绍

### 什么是 Paseo

Paseo 是一层 **桌面 AI 编程代理的移动控制层**。

它本身不是代码代理，也不是独立的大模型产品，而是把你电脑里已经安装好的 CLI 工具接起来，再把控制入口延伸到手机端：

- AI 代理在你的 Mac 上执行
- 项目目录、依赖、Git、SSH、密钥仍然在你的桌面环境里
- 手机只是一个远程操作入口

### 核心功能

接入完成后，手机端可以实现：

- 远程发起 Claude Code、Codex、OpenCode 任务
- 随时继续已有线程，而不是只能新开对话
- 基于桌面上的真实项目目录继续工作
- 出门在外时查看执行进度、补充需求、追问结果
- 用一个入口切换多个 coding agent

### 核心优点

**1. 保留桌面环境**

真正执行任务的还是桌面电脑，所以本地依赖、终端环境、仓库状态、权限和密钥都能直接复用。

**2. 移动端接管更自然**

不需要专门坐回电脑前，很多"临时补一句需求""看一下执行结果""继续刚才那条线程"的动作，在手机上就能完成。

**3. 多代理统一入口**

对于同时使用多个工具的人来说，Paseo 把多个 CLI 代理变成了统一的控制面板，管理成本更低。

### 常见问题排查

**问题一：Codex 显示 Binary not found**

这通常不是 Codex 没装，而是 Paseo 没找到 `codex` 可执行文件。

最常见原因是：**macOS 图形应用里的 PATH，和你终端里的 PATH 不一致。**

处理方法：

1. 先确认终端里 `which codex` 能找到
2. 如果终端正常、Paseo 仍报错，就在 `~/.paseo/config.json` 里给 `codex` 显式指定绝对路径
3. 例如直接指定 `/Applications/Codex.app/Contents/Resources/codex`
4. 改完后彻底退出并重启 Paseo

**问题二：手机里开的 Codex 线程，在桌面 Codex 里看不到**

这通常不是线程丢了，而是线程绑定到了另一个工作目录。

Codex 的线程列表往往会按当前工作区过滤。如果 Paseo 创建线程时使用的是另一个 `cwd`，那条线程虽然已经写进 Codex 历史里，但在当前项目视图下不一定显示。

处理方法：

1. 检查 Paseo 创建线程时对应的项目目录
2. 让 Paseo 和桌面 Codex 尽量使用同一个工作区
3. 必要时用 `codex resume --all` 查看全部历史线程

## 3. Lunel 工具介绍

### 什么是 Lunel

Lunel 是一个开源项目，通过手机连接电脑，直接运行 Codex、OpenCode、Claude Code。**免费且支持公网访问**。

### 技术架构

Lunel 分为三部分：

**移动端 App（Expo + React Native）**

- 支持 AI 面板（Codex、OpenCode 等）
- 支持 Git、终端模拟、文件浏览和编辑
- 支持 Browser & DevTools、进程管理、端口管理、API Client

**CLI 工具（本地运行）**

- 文件读写、grep 搜索
- Git 命令
- 终端（PTY），用 Rust 写的伪终端（基于 wezterm 内核）
- 进程管理、端口扫描、系统监控（CPU/内存/磁盘）

**中继服务器（Bun WebSocket 网关）**

- 公开部署在 gateway.lunel.dev / two.lunel.dev
- 双通道架构（control channel + data channel）
- QR 码配对机制

### 两种运行模式

**Lunel Connect**

连接本地电脑，支持公网访问。手机作为纯 UI 客户端，AI 代理仍在桌面执行。

**Lunel Cloud（开发中）**

GitHub 登录后直接在云端开一个 VM，预装 Lunel 环境。

### 工作原理

**中继转发机制**

Lunel 包含一个 Proxy 服务端，作为移动端 App 和本地 CLI 之间的 WebSocket 桥梁。App 只做聊天和审批，逻辑和执行都在电脑的 Lunel CLI。

**消息分发**

当你在手机 App 输入内容时，App 会封装为标准化的 Message 对象：

- 命名空间 (ns)：区分消息用途（如 `pty` 代表终端操作，`ai` 代表 AI 指令）
- action：具体的操作，例如 `input` 或 `ask`
- payload：包含输入的文字内容

**不同 AI 工具的调用方式**

- **OpenCode**：利用 SDK 在本地进程做管理，通过 SSE 循环监听 AI 返回的事件
- **Codex**：通过 JSON-RPC 2.0 协议交换结构化数据，直接通过进程的 stdin/stdout 通信
- **Claude Code**：类似 Codex，启动后台进程处理拦截

**安全审批机制**

当 AI 尝试执行危险命令或修改敏感文件时，CLI 可以捕获到请求并暂停执行，直到你在手机上点击"批准"。

### 项目地址

https://github.com/lunel-dev/lunel

## 4. 工具对比

| 特性 | Paseo | Lunel |
|------|-------|-------|
| 开源 | 否 | 是 |
| 费用 | 未知 | 免费 |
| 支持平台 | macOS | macOS / Linux |
| 公网访问 | 支持 | 支持 |
| 完整终端 | 基础 | 完整（Rust PTY） |
| 文件编辑 | 基础 | 完整编辑器 |
| Git 管理 | 依赖 CLI | 内置支持 |
| 云端 VM | 无 | 开发中 |

## 5. 如何选择

### 选择 Paseo 如果你

- 已在桌面使用 Claude Code、Codex 或 OpenCode
- 需要简单、稳定的远程控制方案
- 主要是临时补充需求、查看进度

### 选择 Lunel 如果你

- 需要完整的移动端开发能力（终端、编辑器、Git）
- 希望了解工具的技术实现细节
- 偏好开源方案，或想自己部署

## 6. 总结

Paseo 和 Lunel 的共同价值是：

**把桌面开发机的 AI 代理能力延伸到手机上。**

它们更像一套远程协作机制：

**AI 在桌面执行，人在手机调度。**

对真正把 AI 代理接入日常开发流程的人来说，这种方式往往比"纯移动端 AI 编程"更稳，也更实用。

---

## 参考资料

- [Paseo：用手机远程控制 Claude Code、Codex 和 OpenCode](https://mp.weixin.qq.com/s/3sdgCVuavXORU-Ej4HbNSA) - Al4ALL
- [手机直接运行 Codex/OpenCode/Claude Code，实时管理你的 AI Coding](https://mp.weixin.qq.com/s/VrJCxwnt4R21769RztksQQ) - 恋猫de小郭
