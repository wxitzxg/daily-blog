---
title: "AI 编程工作流工具深度对比与实战指南"
source:
  - "https://mp.weixin.qq.com/s/NeBSi-Q8zUWlWb0mL5BPOA"
  - "https://mp.weixin.qq.com/s/4V9LTNFmCQvuIvtQohNH1A"
author:
  - "[[ElioYue]]"
  - "[[运维有术]]"
published:
created: 2026-04-02
description:
category: workflow
tags: [spec-kit, openspec, superpowers, 工作流对比, 实战指南, 技术选型]
summary: 三款AI编程工作流工具的完整实战指南与选型决策。Spec-Kit（GitHub官方，69k Star）：规范可执行化，分阶段流程，适合新项目企业级。OpenSpec（Fission-AI，23.7k Star）：轻量规范层，OPSX工作流，适合存量项目快速迭代。Superpowers（obra，50k Star）：技能驱动方法论，TDD强制，专注执行质量。关键结论：Spec-Kit和OpenSpec二选一（功能重叠），再搭配Superpowers互补。
---

## 前言：为什么需要这些工具？

用 AI 编程代理写代码，你有没有遇到过这些问题：

- 代理写出的代码风格飘忽不定，每次都要重新解释项目规范
- 多人协作时代理理解不一致，同样的需求给出完全不同的实现
- 想让代理遵循测试驱动开发，但它总爱跳过测试直接写代码

这些问题背后是同一个核心矛盾：**AI 代理缺乏结构化的工作流约束**。

三个工具应运而生，它们从不同角度解决这个问题：

| 工具 | 核心问题 | 类比 |
| --- | --- | --- |
| **Spec-Kit** | "按什么规矩干" | 建筑规范手册 |
| **OpenSpec** | "改了什么" | 施工变更单 |
| **Superpowers** | "怎么干" | 施工队工作手册 |

---

## 一、三者的背景与定位

### Spec-Kit：规范可执行化

GitHub 官方出品，由 Den Delimarsky 和 John Lam 等核心开发者维护。

官方定位很明确：

> **Spec-Driven Development flips the script on traditional software development. Specifications become executable, directly generating working implementations rather than just guiding them.**

翻译过来：规范不只是"指导文档"，而是**可执行的**——能直接生成工作代码。

- **GitHub 仓库**：https://github.com/github/spec-kit
- **Stars**：69.1k
- **技术栈**：Python (uv 包管理器)
- **适用 AI**：Claude Code、Copilot Agent 等 11+ 工具

Spec-Kit 的核心是七个阶段：`constitution`（项目治理）→ `specify`（定义需求）→ `clarify`（澄清模糊）→ `plan`（技术计划）→ `tasks`（任务分解）→ `analyze`（一致性检查）→ `implement`（执行实现）。

每个阶段都有明确的输入输出，像工厂流水线一样。Spec-Kit 的哲学是：**结构胜过混乱**。

### OpenSpec：轻量规范层

Fission-AI 团队开发，核心理念是四个词：**fluid、iterative、easy、built for brownfield**。

官方定义：

> **A lightweight spec-driven framework for coding agents and CLIs — universal, open source, and no API keys or MCP required.**

关键点：轻量级、通用、**无需 API Key 和 MCP**。

- **GitHub 仓库**：https://github.com/Fission-AI/OpenSpec
- **Stars**：23.7k
- **技术栈**：TypeScript (npm)
- **适用 AI**：Claude Code、Cursor、Windsurf、OpenCode、Codex、Copilot 等 20+ 工具

OpenSpec 不追求"规范生成代码"，而是做一层轻量的规范管理——通过 `/opsx:propose`（创建提案）→ `/opsx:apply`（执行）→ `/opsx:archive`（归档）的流程，让规范成为活文档。

OpenSpec 的哲学是：**迭代胜过瀑布**。

### Superpowers：技能驱动工作流

Jesse Vincent（obra）出品，专注于**执行方法论**。它不是文档管理工具，而是一套让 AI 更高效、更可靠地执行编码任务的最佳实践集合。

- **GitHub 仓库**：https://github.com/obra/superpowers
- **Stars**：50k
- **技术栈**：Markdown + JavaScript Plugin
- **适用 AI**：Claude Code、OpenCode、Codex

官方定义：

> **A complete software development workflow for your coding agents, built on top of a set of composable 'skills'.**

关键词：**技能组合**。Superpowers 不是规范驱动，而是通过一组可组合的"技能"来约束代理行为。核心技能包括：`test-driven-development`（强制 TDD）、`systematic-debugging`（系统化调试）、`brainstorming`（苏格拉底式设计细化）、`subagent-driven-development`（子代理并发执行）等。

Superpowers 的哲学是：**流程胜过猜测**。

---

## 二、技术架构深度对比

### 底层实现机制

**Spec-Kit 的架构**：

```
┌─────────────────────────────────────────────┐
│              Specify CLI (Python)            │
├─────────────────────────────────────────────┤
│  Templates  │  Extensions  │  Presets       │
├─────────────────────────────────────────────┤
│         AI Agent Integration Layer          │
│  Claude │ Copilot │ Cursor │ Gemini │ ...  │
└─────────────────────────────────────────────┘
```

Spec-Kit 基于 Python，使用 `uv` 作为包管理器。核心是**模板引擎 + 扩展系统**——规范通过模板渲染成代码，扩展系统允许自定义工作流。

```python
# 伪代码：Spec-Kit 的规范执行流程
class SpecKit:
    def execute_spec(self, spec_content):
        plan = self.plan_engine.generate(spec_content)
        tasks = self.task_breakdown.decompose(plan)
        return self.implementation_engine.execute(tasks)
```

**OpenSpec 的架构**：

```
openspec/
├── changes/           # 活跃变更
│   └── add-dark-mode/
│       ├── proposal.md
│       ├── design.md
│       ├── tasks.md
│       └── specs/
├── specs/            # 持久规范
└── archive/          # 归档变更
```

OpenSpec 基于 TypeScript，核心是**变更驱动的工作流**。每个功能变更是独立目录，包含提案、设计、任务和规范增量（Spec Delta）。

```typescript
// 伪代码：OpenSpec 的变更管理
class OpenSpec {
  async propose(description: string): Promise<Change> {
    const change = await this.changes.create(description);
    const affectedSpecs = await this.specs.findRelated(description);
    change.specDeltas = await this.generateSpecDeltas(affectedSpecs);
    return change;
  }
}
```

**Superpowers 的架构**：

```
┌────────────────────────────────────────┐
│           Skills Library               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ Testing │ │Debugging│ │  Collab │  │
│  └─────────┘ └─────────┘ └─────────┘  │
├────────────────────────────────────────┤
│           Hooks System                 │
│  Pre-task │ Post-task │ Triggers      │
├────────────────────────────────────────┤
│       Agent Integration                │
└────────────────────────────────────────┘
```

Superpowers 基于 Shell/JavaScript，核心是**技能触发系统**——不是手动调用命令，而是通过 Hook 自动激活相关技能。

### 数据流对比

| 维度 | Spec-Kit | OpenSpec | Superpowers |
| --- | --- | --- | --- |
| 规范存储 | 中心化配置文件 | 分布式目录结构 | 无独立规范层 |
| 变更追踪 | Git 分支隔离 | changes/ 目录 | Git Worktrees |
| 状态管理 | 阶段门控 | 提案状态 | 技能激活状态 |

---

## 三、核心特性对比

| 维度 | Spec-Kit | OpenSpec | Superpowers |
| --- | --- | --- | --- |
| **核心范式** | 规范可执行化 | 轻量规范层 | 技能组合 |
| **工具类型** | 规范管理（SDD） | 规范管理（SDD） | 执行方法论 |
| **主要语言** | Python | TypeScript | Shell/JavaScript |
| **Star 数** | 69.1k | 23.7k | 50k |
| **安装方式** | `uv tool install` | `npm install -g` | 插件市场/手动配置 |
| **AI 代理支持** | 11+ | 20+ | 5+ |
| **是否需要 API Key** | 取决于代理 | 不需要 | 取决于代理 |
| **是否需要 MCP** | 取决于代理 | 不需要 | 取决于代理 |
| **TDD 强制** | 不强制 | 不强制 | 强制 |
| **Brownfield 支持** | 支持 | 优先设计 | 支持 |
| **团队协作** | 企业级 | 开发中 | Discord 社区 |
| **学习曲线** | 中等 | 平缓 | 平缓 |
| **定制性** | 高（扩展/预设） | 中等 | 高（技能系统） |

几个关键差异点：

**工具支持范围**：OpenSpec 支持最广（20+ 工具），包括 Claude Code、Cursor、Codex、Windsurf、Gemini CLI 等。Spec-Kit 支持 11+，Superpowers 专注少数平台（主要为 Claude Code 优化）。

**TDD 强制**：只有 Superpowers 强制 RED-GREEN-REFACTOR 循环。如果你的团队对测试有严格要求，这是重要考量。

**Brownfield 支持**：OpenSpec 明确打出 **built for brownfield** 的旗号——它的设计优先考虑现有代码库的渐进式改造。

> **重要提示**：Spec-Kit 和 OpenSpec 都是"规范驱动开发"（SDD）工具，解决的是**同一个问题**——防止 AI "vibe coding" 导致的实现漂移。两者是**竞争关系**，应该二选一，而不是同时使用。Superpowers 则是**执行方法论**工具，与两者互补。

---

## 四、工作流范式对比

三者最大的差异在于**工作流范式**——这是选型的核心依据。

### Spec-Kit：阶段门控式

```
constitution → specify → clarify → plan → tasks → analyze → implement
     ↓            ↓         ↓        ↓       ↓        ↓         ↓
   [门控]      [门控]    [门控]   [门控]  [门控]   [门控]    [门控]
```

每个阶段都是一道"门"——必须完成当前阶段才能进入下一阶段。好处是流程严格、质量可控；坏处是灵活性低，适合大型项目。

### OpenSpec：流畅迭代式

```
/opsx:new → /opsx:continue → /opsx:apply → /opsx:archive
      ↓              ↓             ↓             ↓
   [提案]        [迭代细化]      [执行]        [归档]
```

没有严格的阶段门，可以随时调整提案。变更驱动——每个功能是独立的变更目录，完成后归档。

### Superpowers：技能触发式

```
brainstorming → writing-plans → executing-plans → TDD → code-review
      ↓              ↓               ↓            ↓        ↓
   [自动触发]     [自动触发]       [自动触发]   [自动触发] [自动触发]
```

不是手动调用命令，而是通过上下文自动触发相关技能。比如写代码前自动激活 TDD 技能，写完代码自动激活 code-review 技能。

### 你适合哪种范式？

| 你的情况 | 推荐范式 | 原因 |
| --- | --- | --- |
| 大型项目、多人协作 | 阶段门控（Spec-Kit） | 质量可控、流程可追溯 |
| 快速迭代、频繁调整 | 流畅迭代（OpenSpec） | 灵活性高、学习曲线低 |
| 质量优先、强制 TDD | 技能触发（Superpowers） | 自动强制质量门 |

---

## 五、安装与实战

### 5.1 Spec-Kit 实战

#### 前置条件

- Python 3.11+
- uv 包管理器
- Git
- 支持的 AI 编码助手（Claude Code、Copilot、Cursor 等）

#### 安装步骤

```bash
# 1. 安装 uv（如果还没有）
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. 安装 Specify CLI（持久安装，推荐）
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 3. 验证安装
specify check
```

#### 初始化项目

```bash
# 创建新项目
specify init my-project --ai claude

# 在当前目录初始化
specify init . --ai claude

# 强制初始化（跳过确认）
specify init . --force --ai claude
```

初始化后的目录结构：

```
your-project/
├── .specify/
│   ├── memory/
│   │   └── constitution.md    # 项目宪法
│   ├── scripts/               # 内置脚本
│   ├── specs/                 # 功能规范目录
│   └── templates/             # 模板文件
└── CLAUDE.md                  # AI 助手配置
```

#### 使用流程

**步骤一：建立项目宪法**

```
/speckit.constitution Create principles focused on code quality, testing standards,
user experience consistency, and performance requirements
```

**步骤二：创建功能规范**

```
/speckit.specify Build an application that can help me organize my photos
in separate photo albums. Albums are grouped by date and can be re-organized
by dragging and dropping on the main page.
```

**步骤三：创建技术计划**

```
/speckit.plan The application uses Vite with vanilla HTML, CSS, and JavaScript.
Images are not uploaded anywhere and metadata is stored in a local SQLite database.
```

**步骤四：分解任务**

```
/speckit.tasks
```

**步骤五：执行实现**

```
/speckit.implement
```

#### 可选命令

| 命令 | 描述 |
| --- | --- |
| `/speckit.clarify` | 澄清规范中不明确的地方 |
| `/speckit.analyze` | 跨工件一致性和覆盖率分析 |
| `/speckit.checklist` | 生成自定义质量检查清单 |

### 5.2 OpenSpec 实战

#### 前置条件

- Node.js 20.19.0 或更高版本
- npm 或 pnpm

#### 安装步骤

```bash
# 方式一：全局安装（推荐）
npm install -g @fission-ai/openspec@latest

# 方式二：项目级安装
npm install --save-dev @fission-ai/openspec

# 方式三：使用 npx 直接运行
npx @fission-ai/openspec init
```

#### 初始化项目

```bash
# 在项目根目录运行
openspec init

# 这会创建以下结构：
# your-project/
# ├── .openspec/
# │   ├── changes/            # 活跃变更
# │   ├── changes/archive/    # 归档的变更
# │   ├── config.yaml         # 项目配置（可选）
# │   └── schemas/            # 自定义工作流模式
# └── .claude/skills/openspec-*  # 自动生成的技能
```

#### 使用流程

**步骤一：创建配置文件（可选）**

```yaml
# openspec/config.yaml
schema: spec-driven

context: |
  Tech stack: TypeScript, React, Node.js
  API conventions: RESTful, JSON responses
  Testing: Vitest for unit tests, Playwright for e2e

rules:
  proposal:
    - Include rollback plan
    - Identify affected teams
  specs:
    - Use Given/When/Then format for scenarios
```

**步骤二：创建新变更**

```
/opsx:new Add user profile page
```

生成的工件结构：

```
openspec/changes/add-user-profile-page/
├── proposal.md           # 变更提案
├── specs/                # 功能规范
├── design.md             # 技术设计
└── tasks.md              # 实施任务清单
```

**步骤三：逐步创建工件**

```
/opsx:continue
```

**步骤四：快速前进（可选）**

```
/opsx:ff add-user-profile-page
```

**步骤五：实施**

```
/opsx:apply
```

**步骤六：归档**

```
/opsx:archive add-user-profile-page
```

### 5.3 Superpowers 实战

#### Claude Code 用户（推荐方式）

```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace

# 验证安装
/help
```

看到 `brainstorm`、`write-plan`、`execute-plan` 这 3 个命令就说明安装成功。

#### OpenCode 用户

```bash
# 1. 克隆 Superpowers 仓库
git clone https://github.com/obra/superpowers.git ~/.config/opencode/superpowers

# 2. 创建目录
mkdir -p ~/.config/opencode/plugins ~/.config/opencode/skills

# 3. 创建符号链接（插件）
ln -s ~/.config/opencode/superpowers/.opencode/plugins/superpowers.js ~/.config/opencode/plugins/superpowers.js

# 4. 创建符号链接（技能）
ln -s ~/.config/opencode/superpowers/skills ~/.config/opencode/skills/superpowers

# 5. 重启 OpenCode
```

#### 核心技能列表

| 技能名称 | 用途 |
| --- | --- |
| **brainstorming** | 在任何创造性工作前先头脑风暴，理解需求后再动手 |
| **subagent-driven-development** | 子代理驱动开发：为每个任务派发独立子代理 + 两阶段审查 |
| **executing-plans** | 执行已制定的实施计划 |
| **requesting-code-review** | 请求代码审查 |
| **systematic-debugging** | 系统化调试：解决 bug 时使用 |
| **test-driven-development** | TDD 工作流：测试驱动开发 |
| **verification-before-completion** | 完成前验证：每步都要验证 |
| **writing-plans** | 编写实施计划 |

#### 使用示例：完整工作流

假设你要给电商网站添加一个优惠券功能。

**1. 开始头脑风暴**

```
"我想添加用户优惠券功能"
```

Superpowers 的 brainstorming 技能会自动启动，逐步确认设计。

**2. 子代理驱动开发**

```
"帮我实施优惠券功能，按照上面的设计文档"
```

Superpowers 会为每个任务派发子代理，执行 TDD 循环。

**3. 请求代码审查**

```
"请帮我审查一下这段代码"
```

---

## 六、技术选型建议

### 选型决策树

```
你的项目是...

├─ 新项目（Greenfield）
│   │
│   ├─ 大型/复杂系统？
│   │   └─ Spec-Kit + Superpowers
│   │      • 完整阶段流程保障设计质量
│   │      • constitution.md 确保全局一致性
│   │
│   └─ 小型/简单项目？
│       └─ OpenSpec + Superpowers
│          • 快速启动，无需复杂前置工作
│
├─ 存量项目（Brownfield）
│   └─ OpenSpec + Superpowers
│      • 无需重建规范体系
│      • 灵活迭代适应现有架构
│
├─ 简单任务/一次性脚本
│   └─ 仅 Superpowers
│      • 零配置，即插即用
│
└─ 不推荐的选择
    ├─ Spec-Kit + OpenSpec（功能重叠）
    ├─ 仅 Spec-Kit/OpenSpec（缺少执行方法论）
    └─ 三者都不用（"Vibe Coding"，复杂项目必翻车）
```

### 场景选型详解

#### 选择 Spec-Kit 的场景

| 场景 | 为什么选 Spec-Kit |
| --- | --- |
| 新项目从零开始 | 分阶段流程确保基础设计不被跳过 |
| 金融/医疗/合规项目 | 严格的阶段文档满足审计要求 |
| 大型团队协作 | 阶段门控防止不同成员各自为战 |
| 复杂系统架构 | constitution.md 保证全局一致性 |
| 需要完整设计文档 | 自动生成 specify/plan/tasks 文档链 |

#### 选择 OpenSpec 的场景

| 场景 | 为什么选 OpenSpec |
| --- | --- |
| 存量项目改造 | 无需从头建立完整规范体系 |
| 初创公司快速迭代 | 轻量级循环不拖慢开发节奏 |
| 原型/MVP 开发 | 快速验证想法，规范可后补 |
| 个人/小团队项目 | 单一 spec.md 便于维护 |
| 频繁需求变更 | 灵活跳转适应变化 |
| 跨工具开发 | 支持 20+ AI 编程工具 |

#### Superpowers：无论选哪个都要用

| 组合方案 | 效果 |
| --- | --- |
| **Spec-Kit + Superpowers** | 严格规范 + TDD 执行 = 企业级质量保障 |
| **OpenSpec + Superpowers** | 灵活规范 + TDD 执行 = 敏捷高质量交付 |
| **仅 Superpowers** | 无规范管理，但 AI 执行质量有保障 |

---

## 七、协同方案与最佳实践

由于 Spec-Kit 和 OpenSpec 功能重叠，本节提供**两个独立方案**，根据项目情况选择其一。

### 方案 A：Spec-Kit + Superpowers（新项目/复杂系统）

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        规范管理层                                        │
│                                                                         │
│   /specify:constitution  ──────>  .specify/memory/constitution.md       │
│          │                                                              │
│          ▼                                                              │
│   /specify:specify  ────────────>  .specify/功能名/specify.md           │
│          │                                                              │
│          ▼                                                              │
│   /specify:plan  ───────────────>  .specify/功能名/plan.md              │
│          │                                                              │
│          ▼                                                              │
│   /specify:tasks  ──────────────>  .specify/功能名/tasks.md             │
│                                                                         │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        执行方法层                                        │
│                                                                         │
│   /specify:implement  ──>  Superpowers TDD Loop                         │
│                            ├── brainstorm（探索阶段）                    │
│                            ├── write-tests（先写测试）                   │
│                            ├── implement（最小实现）                     │
│                            ├── run-tests（验证通过）                     │
│                            └── code-review（代码审查）                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 方案 B：OpenSpec + Superpowers（存量项目/快速迭代）

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        规范管理层                                        │
│                                                                         │
│   /opsx:new  ─────────────────>  spec.md (创建规范提案)                  │
│       │                                                                 │
│       ▼                                                                 │
│   /opsx:continue  ────────────>  spec.md (迭代细化)                     │
│       │               ▲                                                 │
│       │               │ (可多次循环)                                    │
│       ▼               │                                                 │
│   /opsx:apply  ───────┴───────>  应用到代码                             │
│       │                                                                 │
│       ▼                                                                 │
│   /opsx:archive  ─────────────>  archived/xxx.md (归档)                 │
│                                                                         │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        执行方法层                                        │
│                                                                         │
│   /opsx:apply  ─────────>  Superpowers TDD Loop                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 方案对比

| 维度 | 方案 A (Spec-Kit + Superpowers) | 方案 B (OpenSpec + Superpowers) |
| --- | --- | --- |
| **启动成本** | 较高（需建立 constitution） | 较低（直接 /opsx:new） |
| **规范严格度** | 高（阶段门控） | 中（灵活循环） |
| **迭代速度** | 较慢（完整流程） | 较快（轻量级） |
| **文档产出** | 丰富（多层文档） | 精简（单一 spec.md） |
| **适合团队** | 大团队、跨职能协作 | 小团队、个人开发 |
| **适合项目** | 新项目、复杂系统 | 存量项目、快速验证 |

---

## 八、三者的局限与权衡

没有完美工具，选型本质是做权衡。

### Spec-Kit 的局限

- **相对重量级**：需要 Python 3.11+ 和 uv，环境配置有一定门槛
- **阶段门较严格**：不适合需要频繁调整方向的项目
- **学习曲线较陡**：七个阶段需要时间理解

### OpenSpec 的局限

- **规范不直接生成代码**：只能指导，不能执行
- **企业功能开发中**：团队协作功能尚不完善
- **社区规模较小**：23.7K Star，生态相对薄弱

### Superpowers 的局限

- **非规范驱动**：没有独立规范层，规范是副产品
- **依赖代理平台**：安装方式因平台而异
- **缺少正式文档站点**：主要靠 GitHub README 和社区

---

## 九、总结

### 核心差异概括

三个工具的核心差异可以概括为一句话：

- **Spec-Kit**：规范**可执行**，生成代码
- **OpenSpec**：规范**轻量化**，灵活迭代
- **Superpowers**：技能**自动触发**，强制质量

### 选型建议速查表

| 场景 | 推荐 |
| --- | --- |
| 大型企业项目 | Spec-Kit + Superpowers |
| 快速迭代/个人项目 | OpenSpec + Superpowers |
| 质量优先/强制 TDD | Superpowers（搭配任一规范工具） |
| 现有代码库改造 | OpenSpec + Superpowers |
| 跨工具开发 | OpenSpec + Superpowers |
| 需要规范生成代码 | Spec-Kit + Superpowers |

### 核心洞察

```
┌─────────────────────────────────────────────────────────────────────────┐
│   ❓ 解决什么问题？                                                      │
│                                                                         │
│   Spec-Kit / OpenSpec                                                   │
│   ────────────────────                                                  │
│   解决："实现什么"（WHAT）                                               │
│   • 防止 AI "Vibe Coding"（凭感觉乱写）                                  │
│   • 确保实现符合设计意图                                                 │
│   • 提供可追溯的决策文档                                                 │
│                                                                         │
│   ⚠️ 两者是竞争关系，解决同一个问题，选其一即可                           │
│                                                                         │
│   Superpowers                                                           │
│   ───────────                                                           │
│   解决："怎么高质量实现"（HOW）                                          │
│   • 强制 TDD 确保代码可测试                                              │
│   • 代码审查防止低级错误                                                 │
│   • 子代理分解复杂任务                                                   │
│                                                                         │
│   ✅ 与 Spec-Kit/OpenSpec 正交，互补而非竞争                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

最后说一句：工具是手段不是目的。如果你的项目规模小、团队人数少，简单的 Git 提交规范 + Code Review 可能就够了——别为了用工具而用工具。

---

## 参考资源

### 官方资源

- [Spec-Kit GitHub](https://github.com/github/spec-kit)
- [OpenSpec GitHub](https://github.com/Fission-AI/OpenSpec)
- [Superpowers GitHub](https://github.com/obra/superpowers)

### 入门教程

- [Superpowers 入门指南](https://github.com/obra/superpowers#readme)
- [OpenSpec OPSX 工作流文档](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx-workflow.md)
- [OpenSpec Supported Tools 文档](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)
