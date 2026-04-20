---
title: "Claude Code 长程开发最佳实践指南"
source: "https://mp.weixin.qq.com/s/pu9xTThFlVi8qhHGthBVKg"
author:
  - "[[AI技术领航]]"
published:
created: 2026-03-24
description: "Plan 模式、Tasks 系统、会话恢复、Skills、Subagents、Hooks — 6 大原生工具让 AI 持续工作"
tags:
  - "clippings"
---
原创 AI技术领航 *2026年3月21日 16:08*

## Claude Code 长程开发实战开发者必备指南

让你的 AI 助手连续工作数小时甚至数天

你有没有遇到过这种情况：给 Claude Code 一个大任务，它干到一半上下文就满了，新会话又得从头解释一遍？这篇文章教你如何用 Claude Code 原生工具，让 AI 跨越上下文窗口持续工作。

## 一、什么是长程开发？

**长程开发** 指的是那些无法在一个上下文窗口内完成的开发任务。它的三个核心特征：

✓ 长程开发三大特征

**长时间** — 任务跨度数小时甚至数天，非一次性完成

**大工作量** — 复杂项目，如重构整个模块、构建完整功能

**少干预** — 人类只需设置目标和检查点，AI 自主推进

**核心挑战：** 上下文窗口有限，压缩后信息丢失，新会话没有之前记忆。

## 二、什么场景需要长程开发？

🔧 大型重构

将旧代码库迁移到新架构，涉及数百个文件

🆕 新功能开发

从零构建完整功能模块，前后端联调

📊 代码库迁移

从一种技术栈迁移到另一种，如 JS 到 TS

🧪 测试覆盖

为大型项目补充单元测试和 E2E 测试

## 三、方法一：Plan 模式（先规划再执行）

Plan 模式是 Claude Code 的核心功能，它将 **探索** 和 **执行** 分开，避免 AI 一上来就写代码，结果解决错了问题。

### 🎯 四阶段工作流

1\. 探索阶段

进入 Plan 模式，Claude 只读文件不修改

2\. 计划阶段

Claude 制定执行计划，等待你审核

3\. 执行阶段

退出 Plan 模式，执行已审核的计划

4\. 验证阶段

检查执行结果，必要时迭代

### ⌨️ 如何使用

输入 /plan 或描述任务时 Claude 会自动进入 Plan 模式。

\# 进入 Plan 模式的提示词示例

"帮我重构用户认证模块，先出个计划"

"这个项目需要添加支付功能，规划一下"

**💡 核心理念：** Plan 模式生成的计划会保存在 `.claude/plans/` 目录，下次会话可以直接读取继续执行。

## 四、方法二：Tasks 系统（跨会话任务管理）

Claude Code 内置了任务管理系统，任务存储在 `~/.claude/tasks/` ， **跨会话持久化** ，不会因为上下文压缩而丢失。

### 📋 Tasks 核心能力

✓ **持久化** — 任务跨上下文压缩保持，不会丢失

✓ **状态追踪** — pending → in\_progress → completed 生命周期

✓ **多会话协调** — 多个 Claude 会话可共享同一任务列表

✓ **可视化** — 按 Ctrl+T 切换任务列表显示

### 🔗 多会话协调

多个 Claude Code 会话可以共享同一个任务列表，适合并行开发：

\# 在多个终端中设置相同的任务列表 ID

export CLAUDE\_CODE\_TASK\_LIST\_ID="my-project"

## 五、方法三：会话恢复与检查点

Claude Code 会自动保存对话历史，你可以随时恢复之前的会话，或者回退到某个检查点。

### 🔄 会话恢复命令

claude --continue # 恢复最近的会话

claude --resume # 从历史会话中选择

/rename oauth-migration # 给会话命名方便查找

### ⏪ 检查点倒带

Claude 在每次修改前会自动创建检查点。按 Esc Esc 或输入 /rewind 打开倒带菜单：

• 仅恢复对话

• 仅恢复代码

• 从某条消息开始总结（释放 context）

## 六、方法四：Skills 沉淀项目知识

Skills 是 **随上下文自动触发** 的知识模块。把项目特有的约定、工作流写成 Skill，Claude 会在相关时自动应用。

### 📁 Skill 文件结构

在项目根目录创建 `.claude/skills/` 目录，每个 Skill 是一个 `SKILL.md` 文件：

#.claude/skills/api-conventions/SKILL.md

\---

name: api-conventions

description: REST API 设计规范

\---

\# API 规范

\- URL 路径使用 kebab-case

\- JSON 属性使用 camelCase

\- 列表接口必须分页

**💡 优势：** CLAUDE.md 在每个会话都加载，适合广泛适用的规则；Skills 按需加载，适合特定场景的知识，不会让每次对话变得臃肿。

## 七、方法五：Subagents 独立调查

当 Claude 需要读取大量文件来调查问题时，会消耗大量 context。Subagents 在 **独立的 context 窗口** 中运行，调查完成后只返回摘要。

### 🔍 使用场景

✓ 调查代码库中的某个问题（如"认证系统如何处理 token 刷新"）

✓ 验证刚写的代码（如"检查这段代码的边界情况"）

✓ 安全审查、性能分析等专门任务

### 💬 提示词示例

"用 subagent 调查我们的认证系统如何处理 token 刷新"

"用 subagent 审查这段代码的安全问题"

## 八、方法六：Hooks 自动化验证

Hooks 在特定时刻自动运行脚本，确保每次修改都经过验证。 **与建议性的 CLAUDE.md 不同，Hooks 是确定性的，保证操作发生。**

### ⚙️ 三种 Hook 类型

• **PreToolUse** — 工具执行前（如验证参数）

• **PostToolUse** — 工具执行后（如自动格式化、跑测试）

• **Stop** — 会话结束时（如最终检查）

### 💬 让 Claude 帮你写 Hook

"写一个在每次文件编辑后运行 eslint 的 hook"

"写一个阻止写入 migrations 文件夹的 hook"

或输入 /hooks 进行交互式配置。

## 九、最佳实践清单

### ✅ 开始大任务前

□ 用 **/plan** 先出计划，审核后再执行

□ 把项目约定写入 **CLAUDE.md** 或 **Skills**

□ 用 **/rename** 给会话起个描述性名称

### ✅ 工作中

□ 用 **Subagents** 调查问题，保护主 context

□ 及时 **git commit** ，留下可回退的检查点

□ 用 **Ctrl+T** 查看 Tasks 进度

### ✅ 暂停或结束时

□ 确保代码已提交，环境干净

□ 下次用 **claude --continue** 恢复会话

□ 如果方向错了，用 **/rewind** 回退

## 十、总结

长程开发的核心是"工作交接"  
用好 Claude Code 原生工具，让每个新会话都能快速恢复状态

### 🛠️ 工具速查表

**/plan** — 先规划再执行

**Tasks** — 跨会话任务管理（Ctrl+T）

**\--continue** — 恢复上次会话

**/rewind** — 回退到检查点

**Skills** — 沉淀项目知识

**Subagents** — 独立 context 调查

**Hooks** — 自动化验证

掌握这套工具，让 Claude Code 成为你真正可靠的开发伙伴

现在就试试吧！

Claude Code 长程开发 Plan 模式 Tasks Skills 开发者指南

继续滑动看下一个

AI技术领航

向上滑动看下一个