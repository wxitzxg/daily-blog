---
title: "手机直接运行 Codex/OpenCode/Claude Code ，实时管理你的 AI Coding"
source: "https://mp.weixin.qq.com/s/VrJCxwnt4R21769RztksQQ"
author:
  - "[[恋猫de小郭]]"
published:
created: 2026-04-20
description: "最近发现一个有趣的开源项目 lunel ，用户可以通过手机连接上电脑，然后直接运行 Codex、OpenCod"
category: integration
tags: [lunel, 远程控制, 手机编程, rust, websocket]
summary: 开源项目Lunel介绍，通过手机远程控制AI编程工具。技术架构：Expo+React Native开发的移动App、Rust写的PTY伪终端、Bun实现的WebSocket中继服务器。支持Claude Code、Codex、OpenCode等多种CLI代理，提供完整终端、代码编辑器、文件浏览、Git管理等开发能力。手机作为纯UI客户端，AI代理仍在桌面执行。
---
恋猫de小郭 *2026年4月11日 08:55*

最近发现一个有趣的开源项目 lunel ，用户可以通过手机连接上电脑，然后直接运行 Codex、OpenCode、Claude Code ， **重要的是免费和公网可用** 。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/HFnwiajHvvNmQPQ5TZt8d4NaBuwqwdMGJoCacCDJMU3qlDIUHmEkY5XhfPZ0dRKsngicLo9FEEPRPgnnOibibjF7xpaYKj2ItgSDwI42TjyM05w/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

它的核心技术原理其实是「手机作为纯 UI 客户端 」，然后本地机器通过 WebSocket 网关实现中继连接，然后电脑 CLI 通过服务和 AI 终端交互，项目主要分三部分：

- Expo + React Native 开发的 Android 和 iOS App ：
- 支持 AI 面板（Codex、Opencode 等）
	- 支持 Git、终端模拟、文件浏览和编辑
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/HFnwiajHvvNnljWpQhBMN81NcPrBh1ZtGvdTWPNgJXPHXo7QibWXP7xmAvHKn2QSnHkhu2ic0Cib1EHFNAAznm71XfD2Szkia5U0zYXricCQcRlxk/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

- CLI 工具，就是电脑上跑的 `lunel-cli` ，负责所有真实操作：
- 文件读写、grep 搜索
	- Git 命令
	- 终端（PTY），用 Rust 写的伪终端（基于 wezterm 内核），每帧只发送变化的字符网格（cell grid + 颜色）
	- 进程管理、端口扫描、系统监控（CPU/内存/磁盘）
![图片](https://mmbiz.qpic.cn/mmbiz_png/HFnwiajHvvNk7rfQa1ibvZY9gnzG4IaRVWsY4v2nMicE7icYolgckQBuuqfBdMc65e0NWzT2r13hQQ5EkX2f0GXLdpAHyIibBKqh9vnTIpUhncqo/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

- 中继服务器，用 Bun 写的 WebSocket 网关（公开部署在 gateway.lunel.dev / two.lunel.dev）
- 双通道架构（control channel + data channel）
	- QR 码配对机制
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

另外目前有两种模式：

- Lunel Connect：连本地电脑，支持公网
- Lunel Cloud：GitHub 登录后直接你开一个云 VM，还没正式完成

这里面一个核心之一是 “中继转发（Relay）” ，Lunel 包含了一个名为 `Proxy` 的 Bun 服务端，作为移动端 App 和本地 CLI 之间的 WebSocket 桥梁，App 只做 chat 和审，逻辑和执行都在电脑的 Lunel CLI 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

CLI 会调用一个 Rust 写的 `pty` 二进制文件， `pty` 是基于 `wezterm` 开发，当你在手机 App 的终端或 AI 聊天输入内容时，App 不会直接发送原始文本，而是会封装为标准化的 Message 对象：

- 命名空间 (ns)：区分消息用途（如 `pty` 代表终端操作， `ai` 代表 AI 指令）
- action：具体的操作，例如 `input` 或 `ask`
- payload：包含你输入的文字内容
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本地 CLI 接收到消息后，会根据 `ns` 将输入分发到不同的执行器：

#### 普通终端输入 (PTY 模式)

如果 `ns` 为终端相关的空间，CLI 会将 payload 中的字符通过 `stdin` （标准输入）写入 Rust PTY 进程，就类似你在电脑键盘上打字一样，本地的 Bash 或 Zsh 接收到字符执行。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### AI 指令输入 (Claude Code / OpenCode)

如果输入来自 AI 面板，CLI 会转给 AI 代理模块（如 `cli/src/ai/opencode.ts` ）：

- **上下文搜集** ：CLI 会自动读取当前的文件结构、终端最后几行的输出等上下文
- **API 调用** ：CLI 使用配置的 API Key（如 Anthropic 或 OpenAI），将“用户输入 + 系统上下文”发送给 AI 模型
- **工具调用** ：如果 AI 返回了“修改文件”或“运行命令”的指令，CLI 的 AI 模块会解析这些指令，并调用本地的文件系统接口或 PTY 接口去真实执行 。
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而对于调用上，不同 AI 终端还不一样，例如对于 OpenCode，Lunel CLI 不是直接运行外部命令，而是利用 SDK 在本地进程做管理：

- CLI 会调用 `@opencode-ai/sdk` 中的 `createOpencodeServer` ，在本地随机端口启动一个 OpenCode 服务器
- 同时创建一个 API 客户端，通过 `Authorization` 请求头与该本地服务器通信
- 通过 SSE (Server-Sent Events) 循环监听 AI 返回的事件（如 `server.heartbeat` 或 `session.updated` ），并将其转发给手机端 App

而对于 Codex 的调用方式是 JSON-RPC ，它的交互相对复杂一些：

- **静默启动后台进程** ：CLI 会通过 `spawn("codex", ["app-server"], ...)` 在后台启动一个 `codex` 进程，这个进程对用户是不可见
- **标准流通信** ：它不使用网络端口，而是直接通过进程的 **stdin（标准输入）** 和 **stdout（标准输出）** 进行对话
- 两者之间通过 **JSON-RPC 2.0** 协议交换结构化数据，例如 App 发送一个 `prompt` 指令，CLI 会转化为 `turn/start` 的 JSON 请求发送给后台进程
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

基于这个流程， Lunel CLI 可以在过程中精准识别和控制整个过程，例如当 AI 尝试执行危险命令或修改敏感文件时，CLI 可以捕获到 `requestApproval` 请求，并暂停执行，直到你在手机上点击“批准” 。

> ❝
> 
> Claude Code 也是采用类似方式，它会启动一个 `codex app-server` 后台进程实现处理拦截，在 `codex.ts` 的 `prompt` 方法，可以通过参数指定 `model` 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

另外 Lunel Cloud 模式还没完成，它的目标看起来是，在你需要的时候，直接通过 GitHub OAuth 登录，然后直接就可以在云端 VM 拉起一个服务，然后运行预装了 Lunel 的 VM ，这个看起来也挺有意思，也可以期待下。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个项目的思路还是挺好的，比如通过手机你就可以直接监控和管理你的 Codex 或者 Claude Code ，当然 Claude Code 本身也支持 mobile 远程命令，但是这个支持多个不同的 CLI 场景，更灵活，功能也更，对于 Happy Coder 提供了完整终端、代码编辑器、文件浏览、Git、Browser & DevTools、进程管理、端口管理、API Client 等完整端侧能力，属于完整开发 workflow on mobile，目前还是免费，重点是开源，自己弄一套感觉比龙虾有意思多了。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 链接

https://github.com/lunel-dev/lunel

**微信扫一扫赞赏作者**

继续滑动看下一个

GSYTech

向上滑动看下一个