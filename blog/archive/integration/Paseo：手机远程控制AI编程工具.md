---
title: "Paseo：用手机远程控制 Claude Code、Codex 和 OpenCode"
source: "https://mp.weixin.qq.com/s/3sdgCVuavXORU-Ej4HbNSA"
author:
  - "[[Al4ALL]]"
published:
created: 2026-04-20
description: "把 Claude Code、Codex、OpenCode 这些 coding agent 统一跑在一个地方，然后你手机、iPad、任何设备都能连上来用"
category: integration
tags: [paseo, 远程控制, 手机编程, claude-code, 多设备同步]
summary: Paseo是一款桌面AI编程代理的移动控制层工具。它不是独立的代码代理，而是将Claude Code、Codex、OpenCode等CLI工具接入，再把控制入口延伸到手机端。核心优势：保留桌面环境（依赖、Git、密钥直接复用）、移动端接管自然（随时补充需求、查看进度）、多代理统一入口管理。
---
Al4ALL *2026年4月11日 17:57*

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

很多人以为“手机上用 AI 编程”，意味着把模型直接跑在手机里。

更实用的方案其实是另一种：

**手机负责发起任务和查看进度，真正的代码代理仍然运行在桌面电脑上。**

这正是 Paseo 这类工具的价值。

## Paseo 是什么？

Paseo 可以理解为一层 **桌面 AI 编程代理的移动控制层** 。

它本身不是代码代理，也不是独立的大模型产品，而是把你电脑里已经安装好的 `Claude Code` 、 `Codex` 、 `OpenCode` 等 CLI 接起来，再把控制入口延伸到手机端。

换句话说：

- ●AI 代理在你的 Mac 上执行
- ●项目目录、依赖、Git、SSH、密钥仍然在你的桌面环境里
- ●手机只是一个远程操作入口

这比“在手机里直接开一个聊天窗口”更接近真实开发场景。

## 它能实现什么效果？

接入完成后，手机端可以做到这些事情：

- ●远程发起 `Claude Code` 、 `Codex` 、 `OpenCode` 任务
- ●随时继续已有线程，而不是只能新开对话
- ●基于你桌面上的真实项目目录继续工作
- ●出门在外时查看执行进度、补充需求、追问结果
- ●用一个入口切换多个 coding agent

这种体验很像：

**电脑在执行，手机在指挥。**

## 它的核心优点

相比把开发流程强行塞进手机，Paseo 的优势主要在三点：

### · · ·1. 保留桌面环境· · ·

真正执行任务的还是桌面电脑，所以本地依赖、终端环境、仓库状态、权限和密钥都能直接复用。

### · · ·2. 移动端接管更自然· · ·

你不需要专门坐回电脑前，很多“临时补一句需求”“看一下执行结果”“继续刚才那条线程”的动作，在手机上就能完成。

### · · ·3. 多代理统一入口· · ·

对于同时使用 `Claude Code` 、 `Codex` 、 `OpenCode` 的人来说，Paseo 把多个 CLI 代理变成了统一的控制面板，管理成本更低。

## 两个最常见的问题

### · · ·问题一：Codex 显示 Binary not found· · ·

这通常不是 Codex 没装，而是 **Paseo 没找到 `codex` 可执行文件** 。

最常见原因是：

**macOS 图形应用里的 PATH，和你终端里的 PATH 不一致。**

处理方法很简单：

1. 1先确认终端里 `which codex` 能找到
2. 2如果终端正常、Paseo 仍报错，就在 `~/.paseo/config.json` 里给 `codex` 显式指定绝对路径
3. 3例如直接指定 `/Applications/Codex.app/Contents/Resources/codex`
4. 4改完后彻底退出并重启 Paseo

### · · ·问题二：手机里开的 Codex 线程，在桌面 Codex 里看不到· · ·

这通常也不是线程丢了，而是 **线程绑定到了另一个工作目录** 。

Codex 的线程列表往往会按当前工作区过滤。  
如果 Paseo 创建线程时使用的是另一个 `cwd` ，那条线程虽然已经写进 Codex 历史里，但在当前项目视图下不一定显示。

处理方法：

1. 1检查 Paseo 创建线程时对应的项目目录
2. 2让 Paseo 和桌面 Codex 尽量使用同一个工作区
3. 3必要时用 `codex resume --all` 查看全部历史线程

## 适合什么人用？

如果你符合下面任意一种情况，Paseo 都很值得尝试：

- ●你已经在桌面使用 `Claude Code` 、 `Codex` 或 `OpenCode`
- ●你经常需要外出，但又不想中断 AI 代理的执行流程
- ●你希望把多个 coding agent 放进同一个入口管理

## 最后一句

Paseo 的价值，不是把手机变成开发机，而是把桌面开发机的 AI 代理能力延伸到手机上。

它更像一套远程协作机制：

**AI 在桌面执行，人在手机调度。**

对真正把 AI 代理接入日常开发流程的人来说，这种方式往往比“纯移动端 AI 编程”更稳，也更实用。

智能体 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

AI Prime

向上滑动看下一个