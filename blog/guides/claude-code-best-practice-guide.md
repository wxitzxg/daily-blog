---
title: "claude-code-best-practice 最佳实践大全"
source:
  - "https://mp.weixin.qq.com/s/n59kpG7IJSy4lAMPAnMk2Q"
  - "https://mp.weixin.qq.com/s/X-r1cLYRGZk0aXkW9SVk4w"
  - "https://mp.weixin.qq.com/s/aZd1TYU2e6d57iZR1ogtiQ"
  - "https://mp.weixin.qq.com/s/poeBDCvwxyBN9_xa6oTGaA"
  - "https://mp.weixin.qq.com/s/pu9xTThFlVi8qhHGthBVKg"
author:
  - "[[机器小脑]]"
  - "[[wsleepybear]]"
  - "[[Tinker]]"
  - "[[ColaAI]]"
  - "[[AI技术领航]]"
created: 2026-04-23
description: "Claude Code 从基础概念到高阶编排的完整知识地图，涵盖八大核心概念、工作流分工、长程开发实践与核心经验提炼。GitHub 26K Stars，官方认证推荐。"
category: workflow
tags:
  - claude-code
  - best-practice
  - subagents
  - skills
  - hooks
  - 长程开发
summary: 融合 5 篇精华文章的 Claude Code 最佳实践大全，涵盖八大核心概念（Subagents、Commands、Skills、Hooks、MCP、Plugins、Memory、Settings）、Command→Agent→Skill 三层架构、长程开发六大工具、Boris Cherny 的 13 条核心原则与 86 条实战技巧。
---

# claude-code-best-practice 最佳实践大全

## 1. 项目概览

### 项目基本信息

```js
https://github.com/shanraisshan/claude-code-best-practice
```

**Stars 26K** | **Forks 2.2K** | **开源协议 MIT** | **日增 1342 Stars（GitHub Trending #1）**

该项目上线后登顶 GitHub 趋势榜，由 Claude 社区认证架构师 shanraisshan 维护，**Claude Code 创造者 Boris Cherny 亲自推荐**，是全球 Claude Code 用户认可度最高的最佳实践参考仓库。

### 项目定位

**不是零散技巧合集，而是一份从基础概念到高阶编排的完整知识地图。**

核心价值：把 Claude Code 从"能聊"变成"能跑流程"。每个概念都有最佳实践文档 + 实现代码 + 编排工作流示例。

### 解决的核心痛点

1. **上下文混乱**：所有规则、背景、临时需求都塞进一个会话，越聊越钝
2. **职责混乱**：command、skill、agent、settings、memory、MCP 各自该干什么，没有边界
3. **流程失控**：同样一类任务每次都重讲一遍，无法复用，也很难协作

---

## 2. 八大核心概念

仓库围绕 Claude Code 的八大核心概念展开，每个概念都有独立的最佳实践指南和实现代码。

| 概念 | 定位 | 核心作用 |
|------|------|----------|
| Subagents | 自治执行器 | 独立上下文，隔离运行，互不干扰 |
| Commands | 工作流入口 | 斜杠命令触发完整工作流 |
| Skills | 知识模块 | 按需加载，不占上下文窗口 |
| Hooks | 事件拦截器 | 工具调用前后注入自定义逻辑 |
| MCP Servers | 外部连接器 | 数据库、浏览器、API 一键接入 |
| Plugins | 分发包 | 多组件打包，一键安装 |
| Memory | 持久记忆 | CLAUDE.md 三层记忆体系 |
| Settings | 配置系统 | 层级化配置，项目级覆盖全局级 |

### 2.1 Subagents：独立上下文的自治执行器

Subagent 是 Claude Code 中的"并发线程"。每个 Subagent 在独立的上下文中运行，有自己的系统提示、工具权限和工作目录。

**关键最佳实践：**

- **单一职责**：每个 Subagent 只做一件事，比如"搜索代码"或"运行测试"
- **上下文隔离**：Subagent 之间不共享对话历史，避免信息污染
- **结果汇总**：主 Agent 收集 Subagent 的输出后统一决策

**使用场景：**

- 调查代码库中的问题（如"认证系统如何处理 token 刷新"）
- 验证刚写的代码（如"检查这段代码的边界情况"）
- 安全审查、性能分析等专门任务

**提示词示例：**

```
"用 subagent 调查我们的认证系统如何处理 token 刷新"
"用 subagent 审查这段代码的安全问题"
```

### 2.2 Commands：斜杠命令编排工作流

Commands 是 Claude Code 的"快捷键"。定义一次，反复使用。

**示例：**

```markdown
# .claude/commands/deploy.md
---
description: "Run full deployment pipeline"
---
1. Run all tests with `npm test`
2. Build the project with `npm run build`
3. Deploy to staging with `npm run deploy:staging`
4. Run smoke tests against staging
5. If all pass, deploy to production
```

输入 `/deploy`，Claude Code 自动按步骤执行整个部署流程。

### 2.3 Skills：按需加载的知识模块

Skills 是 Claude Code 的"技能树"。不同于 Commands 的流程编排，Skills 提供的是 **领域知识**——编码规范、架构约束、审查标准。

**目录结构：**

```
.claude/skills/
├── code-review/
│   └── SKILL.md        # 代码审查标准
├── security-audit/
│   └── SKILL.md        # 安全审计规则
└── api-design/
    └── SKILL.md        # API 设计规范
```

**核心特性：自动发现**

Claude Code 根据当前任务自动匹配并加载相关 Skill，不需要手动指定。Skill 的内容只有在被 Agent 调用时才进入上下文窗口，平时只加载一行描述。这对省 Token 至关重要。

**Skill 文件示例：**

```markdown
# .claude/skills/api-conventions/SKILL.md
---
name: api-conventions
description: REST API 设计规范
---
# API 规范
- URL 路径使用 kebab-case
- JSON 属性使用 camelCase
- 列表接口必须分页
```

### 2.4 Hooks：事件驱动的拦截器

Hooks 在 Claude Code 的 Agent 循环中注入自定义逻辑。

| Hook | 触发时机 | 典型用途 |
|------|----------|----------|
| PreToolUse | 工具调用前 | 拦截危险命令、参数检查 |
| PostToolUse | 工具调用后 | 自动格式化、日志记录 |
| Notification | 通知事件 | 推送到即时通讯工具 |
| Stop | Agent 停止时 | 清理资源、生成报告 |

**让 Claude 帮你写 Hook：**

```
"写一个在每次文件编辑后运行 eslint 的 hook"
"写一个阻止写入 migrations 文件夹的 hook"
```

或输入 `/hooks` 进行交互式配置。

**注意：** 自动格式化 Hook 可能会消耗大量上下文 Token。建议把格式化放在会话间隙手动跑，而不是每次自动触发。

### 2.5 MCP Servers：外部连接器

MCP 适合接入 **外部工具、数据源和系统能力**。重点不是"连上了没有"，而是有没有进入你的日常流程。

**注意：** 如果你的 MCP 占了超过 20K Token，那实际能用于工作的上下文就所剩无几。精简 MCP 配置，只挂真正需要的服务。

### 2.6 Memory：三层记忆体系

**适合放持续性背景和长期记忆**，解决"这件事以后也得记得"的问题。

### 2.7 Settings：层级化配置系统

**适合放稳定规则和全局偏好**，比如你长期希望模型遵守的约束，不必每次重讲。项目级配置覆盖全局级配置。

### 2.8 Plugins：分发包

多组件打包，一键安装，便于分享和复用。

---

## 3. 工作流分工

### 3.1 核心架构：Command → Agent → Skill

这是仓库最有价值的部分——**三层编排模式**。

```
用户输入 /review-pr
    ↓
Command: review-pr.md
    ↓ 编排逻辑
Agent 1: code-reviewer (加载 code-review Skill)
Agent 2: security-auditor (加载 security-audit Skill)
Agent 3: test-checker (加载 test-coverage Skill)
    ↓ 并行执行
汇总报告 → 输出给用户
```

**三层职责分明：**

| 层级 | 职责 | 说明 |
|------|------|------|
| Command | 定义"做什么"和执行顺序 | 入口层，收集参数，编排流程 |
| Agent（Subagent） | 在独立上下文中执行具体任务 | 执行层，有自己的工具和权限 |
| Skill | 为 Agent 提供领域知识和行为约束 | 复用层，按需加载 |

**具体到实例：**

用户输入 `/weather-orchestrator` 这个 Command，它先问你要摄氏度还是华氏度，然后调用 weather-agent。Agent 自带预加载的 weather-fetcher Skill 去查温度，再调用 weather-svg-creator Skill 生成一张漂亮的 SVG 天气卡片。

每层只做一件事，职责清晰，可复用。

### 3.2 分工边界

这套仓库最值得读的，是它把 Claude Code 里最容易混掉的几类能力讲出了边界：

| 能力 | 适合放什么 |
|------|------------|
| command | 入口、触发词、固定流程包装。你希望一句话拉起一套动作 |
| skill | 可复用的方法、步骤、判断标准。以后还会反复用到的经验 |
| agent / subagent | 重任务、长任务、需要独立上下文的任务。不要把所有复杂活都塞在主会话里 |
| settings | 稳定规则和全局偏好。长期希望模型遵守的约束 |
| memory | 持续性背景和长期记忆。"这件事以后也得记得" |
| MCP | 外部工具、数据源和系统能力 |

**这套分工一旦清楚，Claude Code 才会从"能聊"变成"能跑流程"。**

### 3.3 实战案例：多 Agent 代码审查

仓库提供了完整的多 Agent 代码审查工作流实现：

| 步骤 | 执行者 | 加载的 Skill | 输出 |
|------|--------|--------------|------|
| 1. 获取 PR diff | 主 Agent | - | diff 文件 |
| 2. 代码质量审查 | Subagent A | code-review | 质量报告 |
| 3. 安全漏洞扫描 | Subagent B | security-audit | 安全报告 |
| 4. 测试覆盖率检查 | Subagent C | test-coverage | 覆盖率报告 |
| 5. 汇总评审意见 | 主 Agent | - | 最终报告 |

三个 Subagent 并行执行，互不干扰，最终由主 Agent 汇总。

---

## 4. 长程开发实践

**长程开发** 指的是那些无法在一个上下文窗口内完成的开发任务。

### 4.1 长程开发三大特征

- **长时间**：任务跨度数小时甚至数天，非一次性完成
- **大工作量**：复杂项目，如重构整个模块、构建完整功能
- **少干预**：人类只需设置目标和检查点，AI 自主推进

**核心挑战：** 上下文窗口有限，压缩后信息丢失，新会话没有之前记忆。

### 4.2 适用场景

- **大型重构**：将旧代码库迁移到新架构，涉及数百个文件
- **新功能开发**：从零构建完整功能模块，前后端联调
- **代码库迁移**：从一种技术栈迁移到另一种，如 JS 到 TS
- **测试覆盖**：为大型项目补充单元测试和 E2E 测试

### 4.3 六大原生工具

#### 方法一：Plan 模式（先规划再执行）

Plan 模式是 Claude Code 的核心功能，它将 **探索** 和 **执行** 分开，避免 AI 一上来就写代码，结果解决错了问题。

**四阶段工作流：**

1. **探索阶段**：进入 Plan 模式，Claude 只读文件不修改
2. **计划阶段**：Claude 制定执行计划，等待你审核
3. **执行阶段**：退出 Plan 模式，执行已审核的计划
4. **验证阶段**：检查执行结果，必要时迭代

**如何使用：** 输入 `/plan` 或描述任务时 Claude 会自动进入 Plan 模式。

```
"帮我重构用户认证模块，先出个计划"
"这个项目需要添加支付功能，规划一下"
```

**核心理念：** Plan 模式生成的计划会保存在 `.claude/plans/` 目录，下次会话可以直接读取继续执行。

#### 方法二：Tasks 系统（跨会话任务管理）

Claude Code 内置了任务管理系统，任务存储在 `~/.claude/tasks/`，**跨会话持久化**，不会因为上下文压缩而丢失。

**核心能力：**

- **持久化**：任务跨上下文压缩保持，不会丢失
- **状态追踪**：pending → in_progress → completed 生命周期
- **多会话协调**：多个 Claude 会话可共享同一任务列表
- **可视化**：按 Ctrl+T 切换任务列表显示

**多会话协调：**

```bash
# 在多个终端中设置相同的任务列表 ID
export CLAUDE_CODE_TASK_LIST_ID="my-project"
```

#### 方法三：会话恢复与检查点

Claude Code 会自动保存对话历史，你可以随时恢复之前的会话，或者回退到某个检查点。

**会话恢复命令：**

```bash
claude --continue     # 恢复最近的会话
claude --resume       # 从历史会话中选择
/rename oauth-migration  # 给会话命名方便查找
```

**检查点倒带：**

Claude 在每次修改前会自动创建检查点。按 Esc Esc 或输入 `/rewind` 打开倒带菜单：

- 仅恢复对话
- 仅恢复代码
- 从某条消息开始总结（释放 context）

#### 方法四：Skills 沉淀项目知识

Skills 是 **随上下文自动触发** 的知识模块。把项目特有的约定、工作流写成 Skill，Claude 会在相关时自动应用。

**优势：** CLAUDE.md 在每个会话都加载，适合广泛适用的规则；Skills 按需加载，适合特定场景的知识，不会让每次对话变得臃肿。

#### 方法五：Subagents 独立调查

当 Claude 需要读取大量文件来调查问题时，会消耗大量 context。Subagents 在 **独立的 context 窗口** 中运行，调查完成后只返回摘要。

#### 方法六：Hooks 自动化验证

Hooks 在特定时刻自动运行脚本，确保每次修改都经过验证。**与建议性的 CLAUDE.md 不同，Hooks 是确定性的，保证操作发生。**

### 4.4 最佳实践清单

**开始大任务前：**

- 用 `/plan` 先出计划，审核后再执行
- 把项目约定写入 CLAUDE.md 或 Skills
- 用 `/rename` 给会话起个描述性名称

**工作中：**

- 用 Subagents 调查问题，保护主 context
- 及时 git commit，留下可回退的检查点
- 用 Ctrl+T 查看 Tasks 进度

**暂停或结束时：**

- 确保代码已提交，环境干净
- 下次用 `claude --continue` 恢复会话
- 如果方向错了，用 `/rewind` 回退

### 4.5 高阶功能

#### Auto Mode：全自动执行

Auto Mode 的核心是 **后台安全分类器**。它在 Agent 执行工具调用前自动评估风险级别：

- **低风险**（读文件、搜索代码）→ 自动放行
- **中风险**（写文件、运行测试）→ 根据配置决定
- **高风险**（删除文件、执行脚本）→ 需要确认

开启 Auto Mode 后，大部分操作无需人工确认，Agent 可以连续执行几十步而不中断。

#### Agent Teams：多 Agent 并行协作

Agent Teams 让多个 Claude Code 实例协作完成大型项目：

```
Coordinator Agent
    ├── Frontend Agent (Git Worktree: feature/ui)
    ├── Backend Agent (Git Worktree: feature/api)
    └── Test Agent (Git Worktree: feature/tests)
```

**关键机制：**

- **Git Worktree 隔离**：每个 Agent 在独立的工作树中开发，互不干扰
- **共享协调文件**：通过 `.claude/coordination/` 目录交换状态
- **并行 Sprint**：多个 Agent 同时开发不同模块，效率翻倍

#### Ralph Loop：自主开发迭代

Ralph Loop（Ralph Wiggum Loop）是一种自主开发循环模式：

```
写代码 → 运行测试 → 分析失败 → 修复代码 → 运行测试 → ...
```

Agent 自主决定修改方向，反复迭代直到所有测试通过。适合明确需求+完善测试的场景。

---

## 5. 核心经验提炼

### 5.1 Boris Cherny 的 13 条核心原则

Boris Cherny 是 Claude Code 的创造者，他总结的 13 条核心原则是整个仓库的基石：

1. **上下文就是一切**：Claude Code 的输出质量完全取决于你给它的上下文
2. **CLAUDE.md 是你的操作手册**：把编码规范、架构决策、常见错误全写进去
3. **用 Commands 编排，不要用长提示词**：可复用、可版本控制
4. **让 Agent 规划再执行**：先让 Claude Code 输出计划，确认后再执行
5. **小步快跑**：一次只做一件事，频繁检查中间结果

### 5.2 CLAUDE.md 写作原则

社区里有个经典案例：有人用 500 词的 CLAUDE.md，把一个 500MB 的坏项目修到只剩 30KB 的干净代码。

**关键原则：**

- **控制长度**：单个 CLAUDE.md 控制在 200 行以内，60 行更理想。太长了 Claude 会有选择地忽略
- **Monorepo 分层**：用多个 CLAUDE.md 分层加载，不要硬塞在一个文件里
- **写规则，不写感受**："MUST"加全大写也不能保证 Claude 一定听。更好的做法是用具体的、可执行的指令
- **别把 memory.md 当救命稻草**：memory.md、constitution.md 都不能保证任何事情。真正管用的是结构化的 CLAUDE.md + 分层加载

### 5.3 上下文管理

Claude Code 的几乎所有最佳实践，都是围绕一个约束展开的——上下文窗口填满得很快，填满后性能会崩。

**具体做法：**

- **避免"笨区"**：在上下文用到 50% 时就手动 `/compact`，不要等到系统自动压缩
- **切换任务时用 `/clear`**：重置上下文
- **MCP 别贪多**：精简 MCP 配置，只挂真正需要的服务
- **小任务直接用原生 Claude Code**：vanilla CC 在小任务上比任何复杂工作流都好用

### 5.4 规划先行

在生产级项目里，规划先行是不可协商的。

**推荐流程：**

1. 先进入 Plan 模式，给 Claude 高层描述和现有代码指引，让它研究并提出方案
2. 你审查方案，不满意就说哪里不对、让它改
3. 在计划阶段捕捉误解，比写完代码再返工便宜太多

**实用技巧：** 用一个模型做规划，用另一个模型审查。比如 Opus 做方案，Sonnet 来挑刺。跨模型 QA 能发现很多单模型发现不了的问题。

### 5.5 散落但管用的技巧

- **挑战 Claude**：不要只会说 fix。试试："烤问我这些改动，不通过别提 PR"，或者"你现在知道所有信息了，抛弃现有方案，重新实现一个优雅的解法"
- **勤提交**：让 Claude 每完成一个步骤就 commit。这样出问题可以随时 revert
- **开思考模式**：始终开启 thinking mode，配合 Explanatory 输出风格。遇到难题用 ultrathink 关键词触发深度推理
- **别堆自定义命令**：如果你有一长串复杂的自定义 slash command，你就创建了一个反模式

---

## 6. 86 条实战技巧分类

仓库整理了 86 条经过验证的实战技巧，按类别分组：

| 类别 | 数量 | 代表技巧 |
|------|------|----------|
| 提示词技巧 | 15 条 | 明确输出格式、提供示例、分步描述 |
| 规划策略 | 12 条 | Spec 驱动、TDD 优先、任务拆解 |
| Agent 编排 | 10 条 | Subagent 单一职责、上下文隔离 |
| Skills 设计 | 8 条 | 领域知识封装、自动发现匹配 |
| 工作流 | 15 条 | CI/CD 集成、多 Agent 协作、定时任务 |
| 调试方法 | 10 条 | 截图调试、日志分析、Checkpoint 回溯 |
| 成本优化 | 8 条 | 模型路由、上下文压缩、缓存 |
| 实用工具 | 8 条 | Git Worktrees、Chrome 自动化、语音听写 |

---

## 7. 仓库结构

```
claude-code-best-practice/
├── .claude/                        # Claude Code 配置目录
│   ├── agents/                     # Agent 定义
│   ├── commands/                   # 斜杠命令
│   ├── skills/                     # Skills 知识模块
│   └── settings.json               # 配置文件
├── best-practice/                  # 每个概念的最佳实践指南
│   ├── subagents.md
│   ├── commands.md
│   ├── skills.md
│   ├── hooks.md
│   ├── mcp.md
│   └── ...
├── implementation/                 # 工作示例代码
├── orchestration-workflow/         # Command→Agent→Skill 编排示例
├── development-workflows/          # 开发工作流（Ralph Loop 等）
├── tips/                           # 86 条分类技巧
└── CLAUDE.md                       # 项目记忆文件
```

---

## 8. 与同类资源对比

| 维度 | claude-code-best-practice | awesome-claude-code | 官方文档 |
|------|---------------------------|---------------------|----------|
| 定位 | 知识体系 + 实现代码 | 工具收录列表 | API 参考 |
| 编排模式 | 完整解析 + 示例 | 无 | 部分提及 |
| 实战技巧 | 86 条分类整理 | 无 | 散落各处 |
| Boris 推荐 | 是 | 否 | - |
| 代码示例 | 完整可运行 | 链接跳转 | 片段 |
| 更新频率 | 持续更新 | 持续更新 | 版本跟随 |
| Stars | 26K | 15K+ | - |

awesome-claude-code 是"应用商店"，告诉你有什么工具可以装；claude-code-best-practice 是"操作手册"，告诉你怎么把这些工具编排成高效的工作流。

---

## 9. 从哪里开始

### 如果你是 Claude Code 新手

1. 先读 `best-practice/memory.md`，学会用 CLAUDE.md 管理项目记忆
2. 再读 `best-practice/commands.md`，用 Commands 替代重复的长提示词
3. 然后读 `best-practice/skills.md`，学会封装领域知识

### 如果你是 Claude Code 老手

1. 直接看 `orchestration-workflow/`，学习 Command→Agent→Skill 编排
2. 然后看 `development-workflows/`，掌握 Agent Teams 和 Ralph Loop
3. 最后看 `tips/`，从 86 条技巧中找到你忽略的细节

### 最短上手闭环

1. **先挑一个你经常重复的任务**，不要一上来就重构全部流程
2. **把任务入口收成一个 command**，让触发方式固定下来
3. **把会重复解释的方法写成 skill**，别每次重新讲背景和步骤
4. **把又长又重的执行过程切给 subagent**，把主会话留给判断和调度
5. **把稳定规则放进 settings / memory**，把外部能力接到 MCP 里

做到这一步，你就已经不是"在和 Claude Code 聊天"，而是在搭一个能持续复用的工作流。

---

## 10. 局限与注意事项

1. **内容以英文为主**：所有文档和代码注释都是英文，中文开发者需要一定的英语阅读能力
2. **需要最新版 Claude Code**：部分高阶功能（Auto Mode、Agent Teams、Channels）需要 Claude Code 最新版本才能使用
3. **偏重方法论**：仓库提供的是架构设计和最佳实践，具体业务场景的适配需要自己完成
4. **学习曲线陡峭**：从 Subagents 到 Agent Teams 的概念跨度大，建议按八大概念顺序逐步学习

---

## 11. 相关项目推荐

1. **https://github.com/anthropics/skills**：Anthropic 官方维护的 Claude Code 技能合集，包含大量官方出品的开箱即用技能
2. **https://github.com/anthropics/claude-code**：Claude Code 官方仓库，最新的功能更新、变更日志
3. **https://github.com/shanraisshan/codex-cli-best-practice**：同作者维护的 OpenAI Codex 最佳实践仓库，适合搭建跨模型开发工作流

---

**项目地址**：https://github.com/shanraisshan/claude-code-best-practice

**Stars**：26K

**Forks**：2.2K

**日增 Stars**：1342（GitHub Trending #1）

**推荐者**：Boris Cherny（Claude Code 创造者）

---

practice made claude perfect —— 其实反过来也成立：perfect practice made 你更有的放矢。工具在那里，能用到什么程度，纯看你愿意花多少功夫去理解它。
