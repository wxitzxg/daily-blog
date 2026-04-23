---
title: "Spec 驱动开发（SDD）实践指南"
source:
  - "https://mp.weixin.qq.com/s/Lxz87OZXpnlv5keNaH_1-Q"
  - "https://mp.weixin.qq.com/s/ncDPY2VQ1Es4338wuxG-ug"
  - "https://mp.weixin.qq.com/s/wfc1CrT91E56MZP0aBQRXg"
  - "https://developer.aliyun.com/article/1709229"
author:
  - "[[是Aren吖]]"
  - "[[瞎捣鼓的老严]]"
  - "[[景晟]]"
  - "[[式遂]]"
published:
created: 2026-04-23
description: "从 Vibe Coding 到 Spec 驱动开发的完整实践指南：核心概念、工具对比、实测经验与真实案例"
category: guides
tags: [SDD, spec驱动开发, gstack, superpowers, bmad, openspec, speckit, ai编程, 工作流]
---

# Spec 驱动开发（SDD）实践指南

## 引言：为什么需要 SDD

很多人用 AI 写代码还停留在 Vibe Coding 的阶段：有个想法，让 AI 写代码，跑通了就继续，跑不通就改，改不好就重写。

这种方式在个人项目、探索阶段还能应付。但一旦进入正式产品，问题就暴露出来了：需求模糊、架构混乱、代码质量不稳定。今天改好的 bug 明天又出现，同一个功能改了 N 个版本，AI 自己跟自己打架。

问题的根源不是 AI 不够聪明，而是整个开发过程缺乏规范。Vibe Coding 本质上是「跟着感觉走」，而正式产品需要的是「工程化」。

---

## 1. 什么是 SDD

### 1.1 从 Vibe Coding 到 SDD

用过 AI 编程的朋友，大概都踩过这几个坑：

**坑一：需求在聊天里丢了**

AI 会记住你说过的话，但聊着聊着上下文就乱了。你说「先做个用户登录」，过 20 分钟说「再加点权限管理」，AI 可能已经把两件事混在一起做了，因为它记不清你到底想要什么。

**坑二：边做边猜**

你让 AI「加个暗黑模式」，它可能同时干了：改 CSS 变量、加 toggle 按钮、改状态管理、调整主题配置……一通操作猛如虎，结果十个功能里只有三个是你要的。

**坑三：改着改着就回不去了**

代码越改越多，想回退但不知道改了什么。只能硬着头皮继续改，或者干脆删掉重写。

这些问题不是因为 AI 不够聪明——恰恰相反，是 **AI 太聪明了，聪明到忍不住自己发挥。**

### 1.2 SDD 的核心理念

Spec-Driven Development（规格驱动开发，简称 SDD）的核心理念是：

**规格是唯一真理源（Single Source of Truth）**
- 所有的代码、测试、文档都从规格生成
- 规格即文档，文档永不过期

**设计先于实现**
- 先用自然语言描述「做什么」（规格）
- 再让 AI 生成「怎么做」（代码）

**可测试性内建**
- 规格中明确定义测试用例
- 自动生成完整的单元测试

听起来高大上，其实道理很简单：**先想清楚做什么，写成文档，再让 AI 动手。**

就像装修房子：你要先出设计图、列好材料清单、施工图，然后工人再干活。而不是跟工人说「帮我装一下」，然后祈祷他装出你想要的样子。

### 1.3 阿里团队的演进实践

淘特导购团队在 AI 编程实践中经历了完整的演进历程，从初期的代码智能补全到 Agent Coding 再到引入 Rules 约束，最终探索 SDD：

**阶段一：代码智能补全**
- 效率提升：代码补全在对象构建、模型转换中减少 70-80% 的键盘输入
- 局限性：只能帮助完成单个方法或代码片段，无法理解整体业务逻辑

**阶段二：Agentic Coding**
- 通过编写详细的提示词（Prompt），让 AI 一次性实现整个功能
- 问题：代码延续性差、风格不一致、团队协同性差

**阶段三：Rules 约束**
- 用 Rules 文件来约束 AI 的行为，将项目规范、架构模式、领域知识固化下来
- 技术方案填写时间从 2 小时降低到 20 分钟
- 代码实现时间从 1 天降低到 2 小时

**阶段四：SDD 探索**
- 理念先进但落地门槛高、工具链不成熟、历史代码集成难
- 最终采用融合策略：轻量级技术方案模板 + Rules 严格约束 + Agent Coding 高效实现 + AI 自动汇总架构文档

---

## 2. Spec 工具对比

### 2.1 工具全景

当前主流的 Spec 驱动工具可分为以下几类：

| 工具 | 核心定位 | GitHub Star | 适配平台 | 最佳场景 |
|------|----------|-------------|----------|----------|
| **BMAD** | AI 敏捷开发全框架 | 34k+ | 全平台 AI IDE | 企业级、团队协作、完整产品从 0 到 1 |
| **GStack** | Claude 专家工作流 | YC CEO 出品 | 仅 Claude Code | 高频发布、生产级、需 QA 自动化 |
| **Superpowers** | 通用工作流系统 | 115k+ | 全主流 Agent | 个人开发、通用场景、新手友好 |
| **SpecKit** | GitHub 官方 Spec 驱动 | GitHub 官方 | 18+ AI 工具 | 跨平台、规约一致性、团队规范 |
| **OpenSpec** | 存量代码 Spec 驱动 | 29k+ | 20+ AI 工具 | 已有项目迭代、多需求并行 |
| **everything-claude-code** | Claude 全配置生产系统 | 黑客松冠军 | 仅 Claude | Claude 专属、生产级优化 |

### 2.2 OpenSpec：轻量规范层

OpenSpec 是一个开源的命令行工具，专门给 AI 编程加了一个「规范层」。它不替代你的 AI 编程工具——你继续用 Cursor、Claude Code、Copilot 都行。OpenSpec 的作用是 **让 AI 先跟你对齐想法，再开始写代码。**

**核心工作流：**

```
1. Proposal（提案）→ 为什么要做这个功能
2. Spec（规格）   → 具体要做成什么样
3. Apply（实施） → 按规范生成代码
4. Archive（归档）→ 合并回主规范
```

**技术原理：**

1. **规范注入（Spec Injection）**：运行 `openspec init` 时，自动创建规范目录、配置文件、注入系统提示词
2. **变更追踪（Change Tracking）**：像 Git 一样追踪需求变更，而不是代码变更
3. **任务拆分（Task Breakdown）**：一次只给 AI 分配一个任务，不会「一锅炖」
4. **验收标准（Acceptance Criteria）**：规范文档中明确功能验收和性能验收标准

**支持的 AI 编程工具：**

| 工具 | 支持情况 | 特点 |
|------|----------|------|
| Cursor | 原生支持 | 自动注入 OpenSpec 命令 |
| Claude Code | 原生支持 | 可用 `/openspec:proposal` 命令 |
| GitHub Copilot | 原生支持 | 通过命令行集成 |
| OpenCode | 支持 | 开源免费 CLI 工具，可连接任意 LLM |

**快速上手：**

```bash
# 安装
npm install -g @fission-ai/openspec@latest

# 初始化
cd your-project
openspec init
```

### 2.3 SpecKit：GitHub 官方方案

SpecKit 是 GitHub 官方推出的 Spec 驱动工具，核心特点是：

**文件体系：**

```
├── .specify/
│   ├── memory/
│   │   └── constitution.md    # 项目宪章
│   ├── scripts/
│   └── templates/
├── specs/
│   └── 001-nn-redpacket-module/
│       ├── spec.md            # 规格说明
│       ├── plan.md            # 实施计划
│       ├── data-model.md      # 数据模型
│       └── checklists/
│           └── requirements.md
└── req/
    └── nn-redpacket.md
```

**执行流程：**

1. `speckit.constitution` — 制定整个项目的原则
2. `speckit.specify` — 编写规格说明
3. `speckit.plan` — 制定实施计划
4. `speckit.tasks` — 任务分解
5. `speckit.implement` — 实现代码

### 2.4 Superpowers：通用工作流天花板

Superpowers 在 GitHub 上已有 115k+ Star，是一套行之有效的 agentic skills 框架和软件开发方法论。

**核心 Skills：**

1. **brainstorming**：结构化对话，把模糊想法转化为清晰设计方案
2. **write-a-prd**：产出结构化的 PRD 文档
3. **writing-plans**：把大任务拆成 2-5 分钟的 bite-sized 小任务
4. **subagent-driven-development**：每个任务用独立的 subagent 执行，两阶段评审

**核心思路：**

把大任务拆成 2-5 分钟的小任务，每个任务用独立的 subagent 跑，强制 TDD（测试驱动开发）。这样做的好处是每个任务都是干净的，不会互相干扰，质量可控。

**GitHub 地址：** https://github.com/obra/superpowers

---

## 3. 6 大 Spec 驱动规范实测

### 3.1 BMAD：完整的 AI 敏捷框架

**全称**：Breakthrough Method for Agile AI Driven Development

**核心**：21 个专业 Agent、50+ 引导式工作流、自适应规模智能

**安装：**

```bash
npx bmad-method install
```

**Spec 生成全流程：**

1. **产品简报**：定义问题、用户、MVP 范围
2. **PRD**：生成完整需求文档，含用户画像、验收指标、风险点
3. **架构设计**：输出技术架构，提供多套方案
4. **用户故事**：拆解为可执行用户故事，标好优先级
5. **迭代跟踪**：指定交付标准

**开发与审查闭环：**

- `/quick-spec`：分析代码库，生成技术规格与故事
- `/dev-story`：按故事开发，子 Agent 分工执行
- `/code-review`：内置 Quinn(QA) 自动测试，质量校验

**真实使用感受：**

被专业团队带着走，从产品→架构→开发→测试全流程标准化。不是简单代码规范，是 AI 时代的敏捷开发完整方法论。大项目/团队协作碾压轻量工具，新手也能产出企业级质量。

**GitHub 地址：** https://github.com/bmad-code-org/BMAD-METHOD

### 3.2 GStack：Claude 专家增强

**定位**：把 Claude Code 变成专家团队，6 大强意见工作流 Skill

**安装：**

```bash
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup
```

**6 大 Skill：**

| Skill | 模式 | 作用 |
|-------|------|------|
| `/office-hours` | YC Office Hours | 需求验证，用六步框架逼你想清楚 |
| `/plan-ceo-review` | 创始人模式 | 战略评审，挑战方案价值 |
| `/plan-eng-review` | 技术负责人模式 | 架构评审，审视数据流、性能瓶颈 |
| `/plan-design-review` | 设计评审 | 从七个维度评分设计 |
| `/ship` | 偏执工程师模式 | 审查生产级风险，一键发布 |
| `/qa` | QA 工程师模式 | 自动打开浏览器测试，找到 bug 后自动修复 |
| `/retro` | 工程管理模式 | 分析提交历史，生成复盘报告 |

**核心亮点：**

- 模式切换太丝滑，需要产品高度就切 CEO 视角，需要技术严谨就切 Eng 视角
- 审查和发布完全解放双手
- 浏览器自动化 QA 直接封神，60 秒完成全量 QA

**GitHub 地址：** https://github.com/garrytan/gstack

### 3.3 选型建议

基于实际测试经验：

1. **完整产品/团队协作/企业级** → BMAD（真正的 AI 敏捷框架）
2. **Claude 专属/生产发布/QA 自动化** → GStack（YC CEO 亲测，发布与审查无敌）
3. **个人通用/新手/全平台适配** → Superpowers（115k Star，无脑冲）
4. **跨平台/规约统一/GitHub 生态** → SpecKit
5. **存量代码/多需求迭代** → OpenSpec
6. **Claude 深度定制/生产优化** → everything-claude-code

关键不是哪个工具最厉害，而是哪个最适合你的场景。

---

## 4. 实践案例

### 4.1 案例：gstack + superpowers 组合工作流

以下是一个完整的实践案例，展示如何使用 gstack + superpowers 组合实现 SDD 规范开发。

#### 4.1.1 整体流程

**规划阶段**（gstack）：

1. **office-hours**：验证需求真实性
2. **plan-ceo-review**：战略评审
3. **plan-eng-review**：架构评审
4. **plan-design-review**：设计评审

**开发阶段**（superpowers）：

1. **brainstorming**：结构化对话
2. **write-a-prd**：产出 PRD 文档
3. **writing-plans**：任务拆分
4. **subagent-driven-development**：分阶段开发

**发布阶段**（gstack）：

1. **review**：代码评审
2. **qa**：浏览器测试
3. **ship**：一键发布

#### 4.1.2 实战：Agent 竞技场项目

**第一步：需求验证**

调用 office-hours 后，AI 用 YC 的六步框架问：

- ① 需求现实：你解决的问题是不是真的存在？有什么证据？
- ② 现状分析：现有方案是什么？它们为什么不够好？
- ③ 具体性：你能不能用一个具体的场景描述这个问题？
- ④ 最小切入点：你能做的最小有用产品是什么？
- ⑤ 观察：你有没有和潜在用户聊过？
- ⑥ 未来适配：如果这个方向成功了，下一步是什么？

一轮聊下来，方向定在「Agent 竞技场」——一个让多个 AI Agent 进行博弈对战、观察策略演化的平台。

**第二步：方案设计**

用 brainstorming 进行方案设计，AI 逐步提问：

- 「你希望 Agent 支持哪些博弈场景？囚徒困境？猎鹿博弈？还是自定义博弈？」
- 「用户是被动观察还是可以干预 Agent 的策略？」
- 「策略演化需要可视化呈现吗？用什么形式？」

**第三步：PRD 撰写**

用 write-a-prd 产出 PRD 文档，追问每个设计细节。

**第四步：评审**

- **plan-ceo-review** 从战略角度挑战方案
- **plan-eng-review** 从工程架构角度审视数据流瓶颈
- **plan-design-review** 用 0-10 分评估七个设计维度

**第五步：分阶段开发**

**writing-plans** 把整个项目拆分成几个 Phase，每个 Phase 拆成十几个 bite-sized 任务，每个任务 2-5 分钟。

然后自动加载 **subagent-driven-development**，每个任务用一个独立的 subagent 执行，强制 TDD。

**第六步：发布**

用 gstack 的 **review** 进行代码评审，**qa** 用真实浏览器测试，**ship** 完成发布。

#### 4.1.3 核心价值

**返工大幅减少**：需求验证阶段就把模糊的想法厘清了，评审阶段把架构和设计漏洞堵住了，开发阶段 TDD 强制保证质量。

**效率提升明显**：所有决策都在前面做好了，后面就是纯粹的执行。AI 可以并行执行多个任务。

**过程可复用**：每个项目积累的文档、规范、最佳实践，都是下一个项目的资产。

### 4.2 案例：阿里团队 NN 红包模块

#### 4.2.1 规格说明示例

```
# NN 红包模块规格说明

## 功能概述
NN 红包模块用于在 NN 频道页面展示用户可用的红包列表。

## 功能需求

### FR-1: 红包数据获取
**处理逻辑：**
1. 调用 FpProvider.queryUserFundBuyPoolId() 查询红包
2. 过滤条件：
   - 红包状态（payStatus）= 2（可使用）
   - 红包未过期（当前时间在 startTime 和 endTime 之间）
   - 红包门槛 <= 配置的 amountThreshold（默认 20 元）

## 测试用例

### TC-1: 正常流程 - 有可用红包
**预期结果：**
- 返回的 VO 不为 null
- redPacketList 包含 2 个红包
- totalAmount = "15.00"（5 + 10）
- 红包按门槛排序（门槛低的在前）
```

#### 4.2.2 实践经验总结

**SDD 带来的改进：**

| 维度 | 改进效果 |
|------|----------|
| 一致性 | 所有代码都严格遵循规格说明，消除了理解偏差 |
| 可测试性 | 测试用例与规格说明一一对应，确保完整性 |
| 可维护性 | 规格说明就是最准确的文档，新人通过阅读规格快速理解功能 |
| 团队协作 | 新人上手时间从 1 周降低到 2 天 |

**SDD 的问题与挑战：**

1. **规格编写门槛高**：编写高质量的规格说明需要较强的抽象能力和文档编写能力
2. **工具链不成熟**：规格解析不准确、代码生成质量不稳定、增量更新困难
3. **历史代码集成困难**：SDD 更适合从零开始的新项目
4. **学习成本高**：写出合格的第一份规格说明，平均需要 3-5 次迭代

#### 4.2.3 融合策略

阿里团队最终采用的融合策略：

1. **用 Rules 约束 AI**
2. **用技术方案指导实现**
3. **用 Agentic Coding 快速迭代**
4. **用 AI 汇总文档保持同步**

技术方案模板比 SDD 规格更轻量，编写时间从 2 小时降低到 30 分钟，比纯 Agentic Coding 更规范。

---

## 5. 总结与建议

### 5.1 核心原则

Spec 驱动的核心从来不是让 AI 写代码更快，而是先把需求想透、把规范定死、把流程闭环，避免返工。

BMAD 是完整开发体系，GStack 是 Claude 专家增强，Superpowers 是通用工作流天花板——三款完全不是一个维度，按场景选，装对一个，你的 Agent 体验直接质变。

### 5.2 适用场景分析

**适合使用 SDD：**

- 全新的项目或模块
- 核心业务逻辑，需要长期维护
- 复杂度高，需要详细设计的功能
- 多人协作的大型需求
- 对质量要求极高的场景

**不适合使用 SDD：**

- 简单的工具函数或配置修改
- 快速验证的实验性功能
- 一次性的临时需求
- 对现有代码的小修改

### 5.3 入门建议

1. **从轻量工具开始**：OpenSpec 或 Superpowers 门槛较低
2. **建立项目规范**：先写 Rules 文件，固化代码风格和架构模式
3. **沉淀文档**：每个项目积累的 PRD、架构文档、最佳实践都是资产
4. **持续迭代**：SDD 是一个渐进式的过程，不断优化流程

### 5.4 参考资源

- BMAD: https://github.com/bmad-code-org/BMAD-METHOD
- GStack: https://github.com/garrytan/gstack
- Superpowers: https://github.com/obra/superpowers
- SpecKit: https://github.com/github/spec-kit
- OpenSpec: https://github.com/Fission-AI/OpenSpec

---

**OpenSpec 解决的问题很简单：不要让 AI 猜你想要什么，先写下来，让它照着做。**

就像那句话说的：AI 不会取代程序员，但会用规范的程序员会取代不会用的。
