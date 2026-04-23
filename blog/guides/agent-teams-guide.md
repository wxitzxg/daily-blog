---
title: "Claude Code Agent Teams 完全指南"
description: "从多智能体概念到实战应用，一篇文章掌握 Claude Code 的团队协作能力"
category: guides
tags: [agent-teams, subagent, 多智能体协作, OMC, 代码重构]
---

# Claude Code Agent Teams 完全指南

你有没有遇到过这种时刻：

让 Claude 探索代码库找一个 bug，它吭哧吭哧分析了半天，读了几十个文件，主对话里全是它的分析过程。等它终于找到问题，你想继续聊，却发现上下文里全是刚才的探索痕迹，重要的信息被挤到后面去了。

或者你要做代码审查，想让 Claude 同时检查安全、性能和测试覆盖。但它只能一件一件来，安全审完审性能，性能审完审测试，本来三分钟能搞完的事，硬生生拖成半小时。

**这时候你需要的是多开几个 Claude，各自独立干活。**

Claude Code 提供了两种多智能体协作方式，这是从"单兵作战"到"团队协作"的质变。一个人只能串行一件一件做，多开几个就能并行同时搞。

---

## 1. 什么是多智能体编排

### 1.1 核心概念

Claude Code 提供两种多智能体协作方式：

| 方式 | 本质 | 通信方式 | 效果 |
| --- | --- | --- | --- |
| **Subagent** | 主 Agent 派出去的助手 | 只向主 Agent 汇报，Subagent 之间无法通信 | 干完活带结果回来，主对话保持干净 |
| **Agent Team** | 多个独立上下文并行跑 | teammates 之间可以直接互相通信 | 并行干活，互不影响，可协作讨论 |

**Subagent** 适合：主 Agent 委派任务，隔离复杂探索，保持主对话清爽。
**Agent Team** 适合：teammates 并行协作，互相讨论，节省时间。

### 1.2 Subagent：独立上下文，不污染主对话

**不用 Subagent 的时候：**

```
你：分析一下这个 bug
Claude：开始分析...
[读取文件 A]
[读取文件 B]
[分析数据流]
[推理可能原因]
[输出 3000 字分析过程]
你：找到问题了，现在修复吧
Claude：[回复很慢，因为上下文里全是刚才的分析]
```

主对话被探索过程塞满，后续操作都变慢。

**用 Subagent 之后：**

```
你：派 debugger subagent 分析这个 bug
Subagent：[在独立上下文里分析]
Subagent 返回：找到原因，是第 X 行空指针
你：修复它
Claude：[上下文干净，快速响应]
```

探索过程留在 Subagent 的独立上下文里，主对话保持干净。

#### Subagent 配置方法

Subagent 可以放在两个位置：
- `.claude/agents/`：项目级，只在当前仓库生效
- `~/.claude/agents/`：用户级，在所有项目里都能用

配置示例：

```markdown
---
name: debugger
description: Bug 分析专家
tools: Read, Grep, Glob, Bash
model: sonnet
---

你是调试专家。分析 bug，找出根本原因，给出修复方案。
```

然后用自然语言调用：

```
派 debugger subagent 分析这个 NPE
```

#### 内置 Subagent

| 名称 | 用途 | 特点 |
| --- | --- | --- |
| Explore | 代码库探索 | 只读，用 Haiku 模型，速度快 |
| Plan | 规划研究 | 为 Plan Mode 收集信息 |
| General-purpose | 复杂任务 | 全工具，能改代码 |

### 1.3 Agent Team：多个独立上下文并行跑

**不用 Agent Team：**

```
你：审查 PR，检查安全
Claude：[检查安全，5 分钟]
你：再检查性能
Claude：[检查性能，5 分钟]
你：再检查测试覆盖
Claude：[检查测试覆盖，5 分钟]
总共：15 分钟
```

**用 Agent Team：**

```
你：创建 agent team，三个队友分别检查安全、性能、测试覆盖
三个 teammate 同时开始
总共：5 分钟
```

#### Agent Team 架构

Agent Team 包括：
- **Lead（老大）**：创建团队、生成 teammate 和协调工作的主 Claude Code 会话
- **Teammate（小弟）**：各自处理分配任务的独立 Claude Code 实例
- **任务列表**：teammate 认领和完成的工作项共享列表
- **邮箱**：代理之间通信的消息系统

### 1.4 Subagent vs Agent Team 详细对比

|  | Subagent | Agent Team |
| --- | --- | --- |
| **上下文** | 自己的上下文窗口；结果返回给调用者 | 自己的上下文窗口；完全独立 |
| **通信** | 只向主 Agent 汇报结果 | teammates 直接互相发消息 |
| **协调** | 主 Agent 管理所有工作 | 共享任务列表，自我协调 |
| **最适合** | 只关心结果的专注任务 | 需要讨论和协作的复杂工作 |
| **Token 成本** | 较低：结果汇总回主上下文 | 较高：每个 teammate 是独立的 Claude 实例 |
| **稳定性** | 正式功能 | Beta 实验性 |

**选择标准**：
- 只要结果，不需要互相讨论：优先用 Subagent
- 需要多个角色并行推进，还要共享任务和互相沟通：用 Agent Team

---

## 2. Agent Teams 基础使用

### 2.1 启用 Agent Teams

Agent Teams 默认禁用，必须手动启用。

**方式一：环境变量**

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
claude
```

**方式二：settings.json**

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

**前置要求**：
- Claude Code v2.1.32 或更高版本
- Claude Max 订阅（推荐）或 Pro 订阅
- Node.js >= 20
- Git（Agent Teams 用 worktree 隔离各成员工作空间）

### 2.2 启动你的第一个 Agent Team

启用 Agent Teams 后，告诉 Claude 创建一个团队：

```
创建 agent team，三个队友：
- 安全审查员
- 性能审查员
- 测试审查员

一起审查 PR #142
```

Claude 会：
1. 开三个独立上下文（三个 Claude 实例）
2. 给它们分配任务
3. 让它们并行工作

### 2.3 七个核心工具

Agent Teams 的协作靠这七个工具实现：

| 工具 | 作用 | 什么时候用 |
| --- | --- | --- |
| **TeamCreate** | 创建团队命名空间 | 最开始，一次性 |
| **Task（spawn）** | 启动 teammate 实例 | 创建完团队后 |
| **TaskCreate** | 定义任务 + 设置依赖 | 启动前规划好 |
| **TaskList** | 查看任务看板 | teammate 自动拉取下一个任务 |
| **TaskUpdate** | 认领/完成任务 | 文件锁机制，防止重复认领 |
| **SendMessage** | 成员间直接通信 | 接口变更、问题协调 |
| **TeamDelete** | 清理团队 | 全部完成后 |

最有意思的是 **TaskUpdate 的文件锁机制**——当 Agent A 认领了一个任务，其他 agent 就不能同时认领，避免了重复工作。而 **SendMessage** 支持点对点和广播两种模式，agent 可以主动通知其他成员自己做了什么改动。

### 2.4 显示模式

Agent Teams 支持两种显示模式：

**In-process（进程内模式）**：
- 所有 teammate 在你的终端里
- 按 `Shift+Down` 切换查看
- 任何终端都能用

**Split-pane（分屏模式）**：
- 每个 teammate 有自己的窗格
- 同时看到所有人的输出
- 需要 tmux 或 iTerm2

默认是 "auto"，如果你已经在 tmux 会话中运行则使用分屏，否则使用进程内模式。

强制指定模式：

```bash
claude --teammate-mode in-process
```

或在 settings.json 中：

```json
{
  "teammateMode": "in-process"
}
```

### 2.5 控制团队

**分配任务**：

```
让安全审查员检查认证模块
让性能审查员检查数据库查询
```

**直接与 teammate 对话**：
- In-process：按 `Shift+Down` 切过去
- Split-pane：点击窗格

**查看任务列表**：按 `Ctrl+T`

**要求 teammate 计划审批**：

对于复杂或有风险的任务，你可以要求 teammate 在实施前计划：

```
Spawn an architect teammate to refactor the authentication module. Require plan approval before they make any changes.
```

**使用委托模式**：

按 **Shift+Tab** 切换到委托模式。这会将 Lead 限制为仅协调工具，防止它自己开始实施任务。

**结束团队**：

先让队友停下来：

```
Ask the researcher teammate to shut down
```

再让 Team lead 清理团队资源：

```
Clean up the team
```

### 2.6 当前限制

Agent Teams 是实验性的，当前限制：
- 进程内小组成员不支持会话恢复：/resume 和 /rewind 不会恢复进程内 teammate
- 任务状态可能滞后：teammate 有时无法标记任务完成
- 关闭可能很慢：teammate 在关闭前完成当前请求
- 每会话一个团队：一个 Lead 一次只能管理一个团队
- 不支持嵌套团队：teammate 不能生成自己的团队
- Lead 固定：创建团队的会话在其生命周期内是 Lead
- 分屏需要 tmux 或 iTerm2：不支持 VS Code 集成终端、Windows Terminal 或 Ghostty

---

## 3. OMC (Oh My Claude Code)：高级编排模式

### 3.1 什么是 OMC

Oh My Claude Code（OMC）是基于 Claude Code 构建的扩展增强体系，整体设计思路对标 Oh My Zsh 对原生 Shell 的增强逻辑。通过模块化插件机制，将原生单点对话式交互升级为可编排、可并行、可分工的多智能体执行系统。

**设计目标**：
- 统一多智能体调用规范，降低配置与学习门槛
- 实现任务自动拆分与角色化分配，减少人工干预
- 支持高并发并行执行，提升复杂任务处理速度
- 自动完成模型路由与资源调度，优化 token 消耗

### 3.2 安装与配置

**安装前提**：
- Claude Code 已正常启动（推荐版本 v2.1.19 及以上）
- 网络可正常访问 GitHub 仓库

**快速安装**：

```bash
# 步骤一：将插件加入市场
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode

# 步骤二：安装插件
/plugin install oh-my-claudecode

# 步骤三：运行配置向导
/oh-my-claudecode:omc-setup
```

**两种配置模式**：
- 项目级配置（推荐）：`/oh-my-claudecode:omc-setup --local`
- 全局配置：`/oh-my-claudecode:omc-setup`

### 3.3 五大执行模式

#### Autopilot — 完全自主执行模式

OMC 的旗舰模式，无需人工干预，全程自动完成从需求分析、规划、实施到测试、验证的全流程。

```
autopilot: build a REST API for managing tasks
```

**适用场景**：
- 构建完整功能模块或小型应用
- 需要从头到尾覆盖整个开发流程的任务
- 希望尽量减少人工干预的场景

#### Ultrapilot — 并行加速模式（3-5 倍提速）

Autopilot 模式的加速版，引入多并行工作者（最多 5 个），将复杂任务拆分为可并行的子任务。

```
/oh-my-claudecode:ultrapilot "build a fullstack todo app"
```

**适用场景**：
- 大规模代码重构
- 包含多个模块或服务的复杂系统开发
- 追求高效交付的场景

#### Swarm — 协作团队模式

模拟真实研发团队协作模式，生成一组智能体，共享一个任务池，每个智能体主动认领最小粒度的任务。

```
/oh-my-claudecode:swarm 5:executor "fix all TypeScript errors"
```

**适用场景**：
- 修复大量彼此独立的问题
- 批量、重复性的代码修改
- 需要多名执行者同时推进的一组独立任务

#### Pipeline — 流水线模式

将多个智能体按固定顺序串联起来，形成标准化流水线，前一个阶段的输出直接作为下一个阶段的输入。

**内置流水线**：
- `review`：探索 → 架构 → 评审 → 执行
- `implement`：规划 → 执行 → 测试引导
- `debug`：探索 → 架构 → 修复
- `refactor`：探索 → 架构 → 执行 → 测试

```
/oh-my-claudecode:pipeline explore:haiku -> architect:opus -> executor:sonnet
```

#### Ecomode — 经济模式

通过自动模型路由，优先使用更经济的模型完成任务，大幅降低 token 消耗。

```
/oh-my-claudecode:ecomode "refactor the authentication system"
```

### 3.4 32 个专业智能体

OMC 内置 32 个按职责划分的专业智能体：

**分析与架构类**：
- `architect` (Opus)：复杂调试、系统架构设计
- `architect-medium` (Sonnet)：常规技术分析、方案设计
- `architect-low` (Haiku)：快速问题定位

**执行类**：
- `executor-high` (Opus)：复杂代码重构
- `executor` (Sonnet)：常规业务功能实现
- `executor-low` (Haiku)：简单代码修改

**搜索与探索类**：
- `explore-high` (Opus)：架构级搜索
- `explore-medium` (Sonnet)：深入代码查找
- `explore` (Haiku)：快速定位代码

**前端与设计类**：
- `designer-high` (Opus)：复杂 UI 系统设计
- `designer` (Sonnet)：组件级 UI 设计
- `designer-low` (Haiku)：简单样式调整

**其他核心角色**：
- `planner` (Opus)：任务规划
- `critic` (Opus)：方案评审、代码审查
- `researcher` (Sonnet)：文档查找、资料调研
- `writer` (Haiku)：技术文档撰写
- `qa-tester` (Sonnet)：自动化测试
- `scientist` (Sonnet)：数据分析
- `vision` (Sonnet)：图像相关任务

### 3.5 模型路由机制

| 任务复杂度 | 示例任务 | 适配模型 | 智能体后缀 |
| --- | --- | --- | --- |
| 简单任务 | 代码格式化、注释补充 | Haiku | low |
| 标准任务 | 功能实现、接口开发 | Sonnet | 无（默认） |
| 复杂任务 | 系统架构设计、复杂 Bug 调试 | Opus | high |

---

## 4. 实战案例：大规模代码重构

### 4.1 场景描述

项目跑了两年，Express 路由散落在 30 多个文件里，中间件嵌套五六层，有人用 callback，有人用 async/await，错误处理各写各的。老板说"我们要迁移到 Hono"，你看了一眼代码量——**两万行，涉及 47 个文件**。

以前怎么办？开个分支，一个文件一个文件改，改一个跑一次测试。保守估计两周。

现在有了 Agent Teams，你可以**把重构拆成多个并行任务，让多个 Claude Code 实例像真正的开发团队一样协作**。

### 4.2 Step 1：先用 Plan Mode 做规划

社区踩坑最多的地方就是**直接让 Agent Teams 开干**，结果 agent 理解不一致，各做各的，token 白烧。

**正确做法**：先用 Plan Mode 生成重构计划，这一步 token 消耗很低。等计划确认后，再交给 Agent Teams 并行执行。

在 Claude Code 里按 **Shift+Tab** 切换到 Plan Mode，然后给它这样的 prompt：

```
我要把这个项目从 Express 迁移到 Hono。请帮我做一份重构计划，要求：

1. 先分析项目结构，列出所有需要改动的文件
2. 把任务按模块拆分，标注哪些可以并行、哪些有先后依赖
3. 给每组任务划定文件所有权（哪个 agent 负责哪些文件，不能重叠）
4. 列出 Express → Hono 的 API 映射表
5. 标明哪些层不动（数据库、业务逻辑）

输出为一份 REFACTOR_PLAN.md，我后面要用这个计划启动 Agent Teams。
```

Claude Code 会生成类似这样的计划：

```markdown
# Express → Hono 迁移计划

## 范围与分工

### Wave 1（并行执行）
- router-agent：src/routes/*.ts（32 个文件）— 路由迁移
  - 文件所有权：src/routes/、src/app.ts
- middleware-agent：src/middleware/*.ts（8 个文件）— 中间件适配
  - 文件所有权：src/middleware/、src/types/

### Wave 2（依赖 Wave 1）
- test-agent：tests/**/*.test.ts — 测试更新
  - 文件所有权：tests/

## 迁移映射
- app.get() → hono.get()
- req.body → c.req.json()
- req.params → c.req.param()
- req.query → c.req.query()
- res.json() → c.json()
- res.status(x).json() → c.json(data, x)

## 约束
- 数据库层（src/db/）和业务逻辑层（src/services/）不动
- API 行为和响应格式必须完全一致
- 每个模块一个 commit
```

**两个关键要点**：
1. **Wave 机制**：把任务分成波次，独立的任务并行（Wave 1），有依赖的排后面（Wave 2）
2. **文件所有权**：每个 agent 明确负责哪些文件/目录，两个 agent 同时编辑同一个文件会导致覆盖

### 4.3 Step 2：启动 Agent Teams

打开 Claude Code，给 Team Lead 下指令。关键是**在 prompt 里明确约束 Lead 只做协调，不要自己写代码**：

```
读一下 REFACTOR_PLAN.md，创建 Agent Team 按计划执行重构。
你只负责协调，不要自己写代码。所有 teammate 完成之前不要结束会话。
```

Team Lead 收到后会自动：
1. 读取 REFACTOR_PLAN.md
2. TeamCreate → 创建团队
3. TaskCreate × 3 → 按 Wave 创建任务
4. Task(spawn) × 2 → 启动 router-agent 和 middleware-agent（Wave 1）
5. 等 Wave 1 完成 → Task(spawn) 启动 test-agent（Wave 2）

### 4.4 Step 3：观察协作

当 router-agent 改了路由的请求参数获取方式后，它会通过 SendMessage 主动通知 middleware-agent：

```
[router-agent → middleware-agent]
"我把 req.user 的注入方式从 Express 的 req 扩展改成了
Hono 的 c.set('user', decoded)，你那边中间件要用
c.get('user') 来读取。"
```

middleware-agent 收到后调整自己的实现。这种**实时协调**是子 Agent 做不到的。

你可以随时问 Lead 进度：

```
你：现在进度怎么样了？
Lead：router-agent 已完成 24/32 个文件，middleware-agent 完成了
6/8 个中间件适配。test-agent 在等待队列中。
```

### 4.5 Step 4：合并和验证

所有任务完成后，Team Lead 合并各 worktree 的改动。因为有文件所有权的约束，通常**不会有合并冲突**。

如果测试失败，Team Lead 会分析原因并分配修复任务——这也是为什么要在所有任务完成之前让 Lead 保持运行。

### 4.6 效果

从社区的实战反馈来看，**3 个 agent 并行 30-45 分钟可以完成手动需要 1-2 周的框架迁移**，时间节省在 5-12 倍左右。

一个有意思的实践：有人在团队里加了一个**只读的 QA agent**（用最便宜的 Haiku 模型），专门做代码审查。结果这个 QA agent 反而抓到了最关键的 Bug——因为只读角色用不同的分析视角思考，不会陷入"自己写的代码没问题"的盲区。

---

## 5. 社区总结的黄金法则

### 5.1 团队规模 3-5 人最优

超过 5 个 agent，协调开销急剧上升，边际收益递减。**两个专注的 agent 效果一定比一大群宽泛的 agent 好**。

### 5.2 每个 agent 5-6 个任务

太少浪费并行能力，太多 context 容易溢出。15 个独立任务 → 3 个 agent 是最优配置。

### 5.3 文件所有权是铁律

在 spawn prompt 中明确写清楚每个 agent 负责哪些文件。**两个 agent 编辑同一个文件 = 灾难**。如果确实有共享文件，用任务依赖串行化访问。

### 5.4 Spawn Prompt 要当文档写

Teammate 看不到 Lead 的对话历史。你的 spawn prompt 就是它的全部上下文。写清楚：项目是什么、改什么文件、遵循什么规则、完成标准是什么。

### 5.5 Prompt 约束 Lead 只做协调

不明确约束的话，Lead 经常自己动手写代码，而不是分配给 teammate。**在 prompt 里写清楚"你只负责协调，不要自己实现代码"**，必要时重复强调。

### 5.6 按阶段清上下文

一个大重构不要一口气全做完。Phase 1 的团队完成后，**起一个新会话**做 Phase 2。上一轮的陈旧上下文会污染下一轮的决策。

### 5.7 给小弟足够的上下文

小弟自动加载项目上下文，但不继承老大的对话历史。在生成提示中包含任务特定的细节。

### 5.8 适当调整任务大小

- **太小**：协调开销超过收益
- **太大**：小弟工作太久没有检查，增加浪费努力的风险
- **刚好**：自成一体的单元，产生清晰的交付物

### 5.9 避免文件冲突

两个小弟编辑同一文件会导致覆盖。拆分工作让每个小弟拥有不同的文件集。

### 5.10 监控和引导

检查小弟的进度，重定向不起作用的方法，并随着进展综合发现。

---

## 6. 什么时候用什么

### 6.1 场景选择

| 场景 | 用哪个 | 原因 |
| --- | --- | --- |
| 探索代码库找 bug | Subagent | 隔离探索过程，保持主对话干净 |
| 分析复杂问题 | Subagent | 分析过程不污染主对话 |
| 代码审查（多维度） | Agent Team | 安全/性能/测试并行审，省时间 |
| 多模块重构 | Agent Team | 各改各的，最后整合 |
| 调试时多个假设 | Agent Team | 多个线索并行追踪 |

### 6.2 适合用 Agent Teams 的重构

- 框架迁移（Express → Hono、Webpack → Vite、Jest → Vitest）
- API 版本升级（v1 → v2，批量改路由和文档）
- 代码风格统一（callback → async/await、CommonJS → ESM）
- 大规模重命名和目录重组
- 全站 QA 测试扫描

### 6.3 不适合用 Agent Teams 的重构

- 涉及复杂业务逻辑变更的重构（agent 不够理解业务上下文）
- 数据库 schema 迁移（风险太高，还是人来）
- 性能优化类重构（需要 profiling 数据驱动决策）
- 顺序任务、同一文件编辑、有很多依赖的工作

---

## 7. Token 成本

Agent Teams 的 token 消耗约等于 team 成员数 × 单 agent 消耗。3 个 agent 并行，token 用量大约是单 agent 的 3 倍。**Max 计划相对宽裕，Pro 计划要注意用量上限**。

时间和 token 的交换通常是值得的——手动改两周 vs 花 3 倍 token 跑 40 分钟，选哪个不用多想。

---

## 8. 总结

**核心转变**：

以前是你和 Claude 一对一。
现在是你是项目经理，Claude 可以分身成一支团队。

Subagent = 主 Agent 委派，独立上下文，只汇报结果。
Agent Team = 多个 teammates 并行，互相通信，一起协作。
OMC = 32 个专业智能体，5 种执行模式，自动化编排。

**5 个要点带走**：
- **Plan Mode 先行**：用最低成本把计划做好，再交给 Agent Teams 执行
- **文件所有权是铁律**：每个 agent 负责明确的文件范围，绝不重叠
- **Wave 机制管依赖**：独立任务并行，有依赖的排后面
- **Prompt 约束 Lead 角色**：明确告诉 Lead 只做协调，不抢活
- **3-5 个 agent 是甜区**：多了没用，少了不够并行

Agent Teams 不是"多开几个 Claude Code"。它是**共享任务列表 + 直接通信 + 依赖管理 + 文件隔离**的完整协作系统。你的规划能力决定它的上限。
