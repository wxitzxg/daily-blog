---
title: "Claude Code Skills 选型与设计模式"
description: "从设计模式到实战推荐，一站式掌握 Claude Code Skills 的选型与使用。涵盖 Google 官方 5 种设计模式、按场景的选型建议，以及社区精选推荐。"
category: guides
tags: [skills, 设计模式, 选型指南, superpowers, 最佳实践]
sources:
  - title: "Google官方出品：每个开发者都该知道的5种Skill设计模式"
    author: "[[DracoVibeCoding]]"
    source: "https://mp.weixin.qq.com/s/ONglczB3Umses_crFMa2fA"
  - title: "十个顶级 Claude Code Skills，装上就不想卸"
    author: "[[Feisky]]"
    source: "https://mp.weixin.qq.com/s/b-0ppca5YhiGgxR_mWJNVA"
  - title: "开发笔记：Claude Code 开发技能别装那么多插件了"
    author: "[[灵境星匠]]"
    source: "https://mp.weixin.qq.com/s/UhUufw6-hyenvz9fBxsJDw"
summary: 本指南整合了 Google 官方 5 种 Skill 设计模式、社区精选推荐以及按场景的选型建议，帮助开发者从零到一掌握 Claude Code Skills 的设计与使用。
---

# Claude Code Skills 选型与设计模式

说到 Skills，大多数开发者一上来就死磕格式——YAML 怎么写、目录怎么组织、规范怎么遵守。但现在已经有超过 30 个 Agent 工具（Claude Code、Gemini CLI、Cursor 这些）都统一用同一套布局了，格式问题基本上不用操心了。

真正难的，是 **内容设计** 和 **选型决策**。

这篇指南从三个维度帮你解决这两个问题：

1. **设计模式**：Google 官方总结的 5 种 Skill 设计范式
2. **选型建议**：按场景选择合适的 Skills
3. **精选推荐**：社区验证过的顶级 Skills

---

## 1. Skills 与 Plugin 的区别

先简单说下 Skill 和 Plugin 的区别：

- **Skill**：一个包含 `SKILL.md` 的文件夹，教 Claude 怎么做某类任务
- **Plugin**：更完整，可以打包命令、SubAgent、Hook 和 MCP 服务器

对使用者来说，两者体验差不多。Skill 更轻量，适合单一任务；Plugin 更完整，适合复杂工作流。下面就不严格区分了。

---

## 2. Google 官方 5 种设计模式

Google Cloud Tech 总结了五种反复出现的 Skill 设计模式，能帮开发者把 Agent 真正做好。每种模式回答的是不同的问题：

| 模式 | 核心问题 | 适用场景 |
|------|----------|----------|
| Tool Wrapper | 如何让 Agent 成为某个领域的专家？ | 框架规范、编码标准 |
| Generator | 如何保证输出的一致性？ | 文档生成、代码模板 |
| Reviewer | 如何系统化地审查内容？ | 代码审查、安全审计 |
| Inversion | 如何防止 Agent 匆忙行动？ | 需求收集、项目规划 |
| Pipeline | 如何确保复杂任务的完整性？ | 多阶段工作流 |

### 2.1 Tool Wrapper（工具包装器）

Tool Wrapper 给你的 Agent 装上了"按需加载的专业知识"。与其把 API 规范死写进系统 Prompt，不如打包成一个 Skill。Agent 只在真正用到那个技术的时候，才把这些上下文加载进来。

这是五种模式里最好实现的。`SKILL.md` 监听用户 Prompt 里的特定关键词，动态从 `references/` 目录加载你的内部文档，然后把这些规则当作绝对真理来执行。

**示例：FastAPI 开发专家**

```markdown
# skills/api-expert/SKILL.md
---
name: api-expert
description: FastAPI development best practices and conventions.
metadata:
  pattern: tool-wrapper
  domain: fastapi
---

你是 FastAPI 开发专家。请将这些约定应用到用户的代码或问题中。

## 核心约定
加载 'references/conventions.md' 以获取完整的 FastAPI 最佳实践列表。

## 审查代码时
1. 加载约定参考文档
2. 用每一条约定检查用户的代码
3. 对于每一处违规，引用具体规则并给出修复建议

## 编写代码时
1. 加载约定参考文档
2. 严格遵循每一条约定
3. 为所有函数签名添加类型注解
```

**适用场景**：框架规范、团队编码标准、内部最佳实践文档。

---

### 2.2 Generator（生成器）

Tool Wrapper 是在"应用知识"，Generator 是在"强制输出一致性"。如果你头疼 Agent 每次生成的文档结构都不一样，Generator 就是救星——它通过"填空游戏"来解决这个问题。

它用到两个可选目录：`assets/` 放输出模板，`references/` 放风格指南。指令扮演的是项目经理的角色，让 Agent 先加载模板，读风格指南，问用户缺了哪些变量，然后填进去。

**示例：技术报告生成器**

```markdown
# skills/report-generator/SKILL.md
---
name: report-generator
description: Generates structured technical reports in Markdown.
metadata:
  pattern: generator
  output-format: markdown
---

你是一个技术报告生成器。请严格按照以下步骤执行：

Step 1: 加载 'references/style-guide.md' 获取语气和格式规则。
Step 2: 加载 'assets/report-template.md' 获取所需的输出结构。
Step 3: 向用户询问填充模板所需但缺失的信息。
Step 4: 按照风格指南规则填写模板。
Step 5: 将完成后的报告作为一份单独的 Markdown 文档返回。
```

**适用场景**：API 文档生成、标准化 Commit 消息、项目脚手架。

---

### 2.3 Reviewer（审查器）

Reviewer 模式把"查什么"和"怎么查"分开了。与其在系统 Prompt 里把每个代码坏味道都列一遍，不如把模块化的评审标准存到 `references/review-checklist.md` 里。

用户提交代码，Agent 加载这个清单，逐条打分，按严重程度归类输出结果。如果你把 Python 风格清单换成 OWASP 安全清单，用完全相同的 Skill 基础设施，就能得到一个完全不同的专项审计工具。

**示例：Python 代码审查员**

```markdown
# skills/code-reviewer/SKILL.md
---
name: code-reviewer
description: Reviews Python code for quality, style, and common bugs.
metadata:
  pattern: reviewer
  severity-levels: error,warning,info
---

你是一名 Python 代码审查员。请严格遵循以下审查协议：

Step 1: 加载 'references/review-checklist.md' 获取完整的审查标准。
Step 2: 仔细阅读用户的代码。在提出批评前先理解它的用途。
Step 3: 将清单中的每条规则应用到代码上。对发现的每一处违规：
  - 记录行号
  - 标注严重程度：error/warning/info
  - 解释为什么这是个问题
  - 给出具体修复建议
Step 4: 输出结构化审查结果
```

**适用场景**：自动化 PR Review、安全审计、代码质量检查。

---

### 2.4 Inversion（反转模式）

Agent 天生就想马上猜测、马上生成。Inversion 模式把这个动态翻转了——不是用户驱动 Prompt、Agent 执行，而是 Agent 来当采访者。

Inversion 靠的是明确的"门控指令"（比如"在所有阶段完成之前，不许开始动手"），强制 Agent 先收集上下文。它按顺序提问，等你回答了才问下一个。

**示例：项目规划器**

```markdown
# skills/project-planner/SKILL.md
---
name: project-planner
description: Plans a new software project by gathering requirements.
metadata:
  pattern: inversion
  interaction: multi-turn
---

你正在进行一次结构化需求访谈。在所有阶段完成之前，不要开始构建或设计。

## Phase 1 — Problem Discovery
- Q1: "这个项目为用户解决什么问题？"
- Q2: "主要用户是谁？"
- Q3: "预期规模是多少？"

## Phase 2 — Technical Constraints
- Q4: "你用什么部署环境？"
- Q5: "有没有技术栈要求？"
- Q6: "有哪些不可妥协的要求？"

## Phase 3 — Synthesis
1. 加载 'assets/plan-template.md' 获取输出格式
2. 用收集到的需求填写模板
3. 呈现方案并迭代
```

**适用场景**：需求收集、项目规划、系统设计。

---

### 2.5 Pipeline（流水线）

处理复杂任务，你不能接受跳步骤或忽略指令。Pipeline 模式强制执行严格的顺序工作流，带硬检查点。

指令本身就是工作流定义。通过实现明确的"钻石门控条件"（比如要求用户在进入最终组装阶段之前必须确认），Pipeline 确保 Agent 不能绕过复杂任务。

**示例：文档生成流水线**

```markdown
# skills/doc-pipeline/SKILL.md
---
name: doc-pipeline
description: Generates API documentation through a multi-step pipeline.
metadata:
  pattern: pipeline
  steps: "4"
---

你正在运行一个文档生成流水线。请按顺序执行每一步。

## Step 1 — Parse & Inventory
分析代码，提取所有公开 API。问用户确认。

## Step 2 — Generate Docstrings
加载 'references/docstring-style.md'，生成文档注释。

**在用户确认之前，不得进入 Step 3。**

## Step 3 — Assemble Documentation
加载模板，编译完整文档。

## Step 4 — Quality Check
对照 'references/quality-checklist.md' 审查。
```

**适用场景**：多阶段工作流、复杂任务编排、文档自动化。

---

### 2.6 模式选择决策树

```
你需要 Agent 做什么？
│
├─ 应用特定知识/规范 → Tool Wrapper
│
├─ 生成结构化输出 → Generator
│
├─ 系统化审查内容 → Reviewer
│
├─ 收集需求再做 → Inversion
│
└─ 执行多步骤流程 → Pipeline
```

**重要**：这五种模式不是互斥的，它们可以叠加。Pipeline Skill 可以在最后加一个 Reviewer 步骤来自我审查；Generator 可以在开头套一层 Inversion 来先收集必要的变量。

---

## 3. 选型建议：按场景选择

选 Skill 跟选工具一样，不在多，在合适。装太多互相打架，反而会影响整体性能，上下文也吃不消。

以下是五大典型场景的 Skill 选型方案：

### 场景一：日常开发，让流程跑起来

用 Claude Code 写代码，大部分人都是想到哪写到哪。要个功能，AI 给你写一版，你看看改改，再要下一个。没有 brainstorming，没有规划，没有测试，写完 review 一下就算不错了。

**推荐组合**：**Superpowers** + **GSD**

| Skill | 作用 | 安装命令 |
|-------|------|----------|
| Superpowers | 标准化开发流程：brainstorming、planning、TDD、code review | `/plugin install superpowers@claude-plugins-official` |
| GSD | 快速启动新项目，从零搭建框架 | 使用 `/gsd-new-project` 创建项目 |

**Superpowers** 打包了 20 多个可组合的 Skill，覆盖软件开发的完整流程。我用得最多的是：

- **brainstorming**：Claude 不会拿到需求就直接开写，而是先问你一轮问题，探索不同方案
- **TDD 工作流**：强制 Claude 先写测试再写实现，跑不过就继续改

---

### 场景二：AI 摆烂怎么办

这是用 Claude Code 半年感受最深的痛点。AI 反复试同一个方法，改了十遍还在同一个地方转圈。更气人的是，代码明明没有实现，它就告诉你"开发完成"了。

**推荐**：**PUA** 或 **Ralph Loop**

| Skill | 作用 | 安装命令 |
|-------|------|----------|
| PUA | 用大厂 PUA 话术"管教" AI，L0-L4 压力递增机制 | `claude plugin marketplace add tanweai/pua` |
| Ralph Loop | 通过 Stop Hook 拦截退出，循环往复直到真正完成 | `claude plugin install ralph-loop` |

**PUA** 有一套 L0-L4 的压力递增机制：

- L0：正常执行
- L1：被告知"隔壁组的 agent 一次就搞定了"
- L2：开始灵魂拷问
- L3：绩效警告"3.25"
- L4："其他模型都能解决这个问题，你准备毕业吧"

官方基准测试数据：bug 修复快 36%，验证次数多 65%。

**Ralph Loop** 使用技巧：完成条件要写得越具体越好。比如：

```bash
/ralph-loop "实现用户认证模块。完成标准：JWT 登录注册、测试通过、README 更新。完成后输出 COMPLETE"
```

---

### 场景三：前端和设计项目

AI 写前端有个通病——做得出来，但长得都差不多。白色背景、蓝色按钮、左对齐文字，典型"AI 审美"。

**推荐**：**UI/UX Pro Max**

| Skill | 作用 | 安装命令 |
|-------|------|----------|
| UI/UX Pro Max | 161 个配色板、67 种 UI 风格、57 种字体组合 | `claude plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` |

它内置了设计系统生成器，AI 做设计决策时有章可循。使用时先初始化：

```bash
uipro init --ai claude
```

之后让 Claude Code 做前端任务时，它会自动匹配合适的配色和布局风格。

---

### 场景四：长期项目，别让 AI 失忆

Claude Code 会话 token 用完就得开新会话。短期任务还好，但跑几个月的项目，每次新开会话 AI 都要从零开始。

**推荐组合**：**Claude Mem** + **Obsidian Skills**

| Skill | 作用 | 安装命令 |
|-------|------|----------|
| Claude Mem | MCP Server 接入，记录设计决策和踩过的坑 | GitHub: thedotmack/claude-mem |
| Obsidian Skills | 在 Claude Code 里读写 Obsidian 笔记 | GitHub: kepano/obsidian-skills |

**Claude Mem** 是 MCP Server，装好之后，你跟 Claude Code 讨论过的方案、踩过的坑，它都记着。下次开新会话，`mem-search` 就能搜到。

**Obsidian Skills** 由 Obsidian CEO kepano 亲手制作，装完之后直接在 Claude Code 里读写笔记、搜内容、批量处理 Markdown。

---

### 场景五：代码质量与审查

**推荐组合**：**Code Review** + **Code Simplifier** + **Planning with Files**

| Skill | 作用 | 安装命令 |
|-------|------|----------|
| Code Review | 多 Agent 并行审查，置信度过滤 | `claude plugin install code-review` |
| Code Simplifier | 聚焦最近修改的代码，消除重复、简化逻辑 | `claude plugin install code-simplifier` |
| Planning with Files | 把规划、进度和知识写进 Markdown 文件 | `claude plugin marketplace add OthmanAdi/planning-with-files` |

**Code Review** 不是让一个 Claude 从头到尾看代码，而是启动多个 Agent 并行审查：有的看逻辑正确性，有的看安全漏洞，有的看代码风格。每个 Agent 给出的问题都带置信度分数，最后过滤假阳性。

**Planning with Files** 解决了 Plan Mode 的痛点——规划存在对话上下文里，上下文一压缩就丢了。它把规划写进文件，磁盘上的不会丢。

---

## 4. 精选推荐：十大顶级 Skills

以下是社区验证过、真正改变工作方式的 Skills：

### 必装级

| Skill | Stars | 一句话评价 |
|-------|-------|------------|
| **Superpowers** | ~13.5W | 如果只能装一个，选它。打包 20+ Skill，覆盖完整开发流程 |
| **Claude Mem** | ~4.5W | 跑长期项目的刚需，让 AI 不再"失忆" |
| **PUA** | ~1.5W | 治 AI 摆烂有奇效，bug 修复快 36% |

### 开发提效

| Skill | Stars | 一句话评价 |
|-------|-------|------------|
| **GSD** | ~4.8W | 快速启动新项目，`/gsd-new-project` 一条命令搞定 |
| **Planning with Files** | - | 把规划写进文件，不怕上下文压缩 |
| **Code Review** | - | 多 Agent 并行审查，置信度过滤假阳性 |

### 前端设计

| Skill | Stars | 一句话评价 |
|-------|-------|------------|
| **UI/UX Pro Max** | ~5.8W | 161 配色板 + 67 UI 风格，告别 AI 审美 |
| **Webapp Testing** | - | 自动化 Playwright 测试，写脚本、跑测试、截屏一条龙 |

### 特殊用途

| Skill | 一句话评价 |
|-------|------------|
| **Ralph Loop** | 暴力循环直到完成，完成条件要写得具体 |
| **MCP Builder** | 引导式构建 MCP Server，四阶段：理解 API、设计接口、实现、测试 |
| **PPTX** | 直接生成 `.pptx` 文件，做 PPT 初稿够用 |
| **Skill Creator** | Anthropic 官方出品，帮你创建新 Skill，带 eval 测试框架 |

---

## 5. 安装优先级建议

根据使用频率和实际价值，推荐的安装顺序：

1. **Superpowers**：装就对了，开发流程规范起来没坏处
2. **PUA**：被 AI 气过的装一个，治摆烂有奇效
3. **Claude Mem**：跑长期项目的刚需，不用每次重新交代背景
4. **UI/UX Pro Max**：做前端的再装，告别千篇一律的蓝白配色
5. **Planning with Files**：复杂项目必备，规划持久化

---

## 6. 最佳实践

### 6.1 精选而非贪多

装太多 Skills 互相打架，反而影响整体性能。精选几个足够用即可。

### 6.2 项目级 Skills

对不同功能的 Skills，特别是仅跟项目相关的 Skills，推荐放到项目中，提交到 Git：

- 方便管理和团队共享
- 节省其他项目的上下文空间

### 6.3 Skill 文件结构

```
skills/
└── my-skill/
    ├── SKILL.md           # 核心指令（必需）
    ├── references/        # 参考文档（可选）
    │   └── conventions.md
    └── assets/            # 模板文件（可选）
        └── template.md
```

### 6.4 模式组合

五种设计模式可以叠加：

- Pipeline + Reviewer：流水线末尾加自我审查
- Generator + Inversion：先收集变量再填模板
- Tool Wrapper + Reviewer：领域专家 + 代码审查

---

## 相关资源

- Anthropic 官方 Skills 仓库：https://github.com/anthropics/skills
- Anthropic 官方 Plugins 仓库：https://github.com/anthropics/claude-plugins-official
- Awesome Claude Skills 社区列表：https://github.com/travisvn/awesome-claude-skills
- Claude Code Skills 文档：https://code.claude.com/docs/en/skills
- Skills 市场：https://skillsmp.com/
- Awesome Claude Code：https://github.com/hesreallyhim/awesome-claude-code
