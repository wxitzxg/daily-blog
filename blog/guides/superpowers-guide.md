---
title: "Superpowers 完整指南：Claude Code 核心技能深度解析"
source: "Merged from 8 source articles"
created: 2026-04-23
description: "将8篇关于 Superpowers 的文章融合成一篇完整指南，涵盖14个核心技能详解、安装配置、工具组合、模型选择、实战案例、CE对比及踩坑经验。"
category: guides
tags: [superpowers, claude-code, skills, TDD, workflow, 知识沉淀]
---

# Superpowers 完整指南

> 如果你只能装一个 Claude Code 插件，选这个。

Superpowers 是 Claude Code 的开源插件，装上之后 AI 多了 14 个"职业技能"。不是花哨的概念，是真正改变 AI 工作方式的底层规则。

装之前，AI 接到需求就动手写代码。装之后，它会先想需求、先写测试、先出方案、写完自查、自己做代码审查、出了 bug 按流程排查。

本指南将从 8 篇深度文章中提炼精华，涵盖 Superpowers 的完整使用体系。

---

## 一、Superpowers 是什么

Superpowers 是 Claude Code 的一个插件，GitHub 上已有 120k+ stars，它是一套行之有效的 agentic skills 框架和软件开发方法论。

**核心价值：让 AI 从"跟着感觉走"升级到"有流程地用 AI"**

- `brainstorm -> plan -> execute -> review` 这条线，帮很多人第一次从"跟 AI 瞎聊"升级到"有流程地用 AI"
- 120k stars 已经足够说明它的质量
- 它也已经做了一定程度的 generator-evaluator 分离

**它解决的问题：**

很多人用 AI 写代码还停留在 Vibe Coding 的阶段：有个想法，让 AI 写代码，跑通了就继续，跑不通就改，改不好就重写。

这种方式在个人项目、探索阶段还能应付。但一旦进入正式产品，问题就暴露出来了：需求模糊、架构混乱、代码质量不稳定。今天改好的 bug 明天又出现，同一个功能改了 N 个版本，AI 自己跟自己打架。

问题的根源不是 AI 不够聪明，而是整个开发过程缺乏规范。Vibe Coding 本质上是「跟着感觉走」，而正式产品需要的是「工程化」。

---

## 二、14 个核心技能详解

这 14 个技能不是散装的，它们形成了一条完整的开发流水线：

```
需求进来
-> 1 using-superpowers （路由：该调哪个技能？）
-> 2 brainstorming （需求分析：问问题、出方案、确认）
-> 3 writing-plans （写实施计划：拆成小任务）
-> 4 using-git-worktrees （开隔离环境）
-> 5 executing-plans / 6 subagent-driven-development （执行）
-> 7 dispatching-parallel-agents （并行派遣）
-> 8 test-driven-development （先测试后写码）
-> 9 systematic-debugging （四阶段排查 bug）
-> 10 verification-before-completion （验证才能说完成）
-> 11 requesting-code-review （请求审查）
-> 12 receiving-code-review （技术评估审查意见）
-> 13 writing-skills （封装新技能）
-> 14 finishing-a-development-branch （收尾）
```

**每个技能都有一条"铁律"——违反就停，不能绕过。不是建议，是强制规则。**

### 1. using-superpowers —— 路由器

**每条消息进来，先判断该调哪个技能。**

**哪怕只有 1% 的可能性某个技能适用，也必须先调用。**

内置"反合理化"表，堵住 AI 想偷懒跳过技能的每一条借口：

- "这个问题很简单" -> 问题也是任务，查技能
- "我先了解一下情况" -> 技能告诉你怎么了解，先查
- "这个技能太重了" -> 简单的事也会变复杂，用它
- "我先快速做一件事" -> 先查技能再做任何事

### 2. brainstorming —— 需求分析师

**动手之前，先把需求想清楚。**

**铁律：在用户确认方案之前，不准写任何代码。**

流程：
1. 先看项目现状 — 读文件、读文档、读 git 提交
2. 一次问一个问题 — 尽量给选项
3. 给 2-3 个方案 — 带优缺点对比，带推荐理由
4. 分段确认 — 架构/组件/数据流每段确认一次
5. 写设计文档 — 保存到 `docs/plans/` 并提交 git

**实际效果：以前 AI 接到"做个数据看板"就直接写代码。现在它先问 5 个问题，出 3 个方案，选完才动手。**

### 3. writing-plans —— 计划工程师

**把需求拆成 2-5 分钟一个的小任务，精确到文件路径和命令。**

真实格式示例：

```markdown
### Task 2: 添加验证函数

文件:
- 创建: src/validator.py
- 修改: src/main.py:45-60
- 测试: tests/test_validator.py

Step 1: 写失败测试
def test_validate_email():
    result = validate("bad-email")
    assert result.error == "Invalid email"

Step 2: 跑测试确认失败
运行: pytest tests/test_validator.py -v
期望: FAIL "validate not defined"

Step 3: 写最小实现
Step 4: 跑测试确认通过
Step 5: git commit
```

**每步精确到命令和期望输出。文件路径精确到行号。代码直接写在计划里。严格 TDD。**

### 4. using-git-worktrees —— 隔离环境

**开一个独立工作目录，不动主分支。**

```bash
git worktree add .worktrees/feature-auth -b feature/auth
cd .worktrees/feature-auth
npm install
npm test # 确认基线干净
```

自动检查 `.worktrees/` 是否在 `.gitignore` 里，没有就自动加上。创建后自动跑测试确认基线干净。

**AI 写崩了？主分支不受影响，一键删除重来。**

### 5/6. 两种执行模式

#### executing-plans —— 分批执行

每 3 个任务一批，做完暂停汇报等反馈，适合需要人类检查的场景。

#### subagent-driven-development —— 子 agent 驱动

**Superpowers 最精妙的设计。**

**核心：每个任务派一个全新的子 agent，做完两轮审查。**

**每个任务过 3 关：**

1. 实现子 agent — 写代码、跑测试、自审、提交
2. Spec 审查子 agent — 代码是否符合计划（不多做、不漏做）
3. 质量审查子 agent — 安全/性能/命名/规范

审查不通过？打回改。改完再审。循环直到通过。

**为什么用全新子 agent？防上下文污染。Task 1 的 agent 脑子里全是 Task 1 的代码，做 Task 2 会硬套。全新 agent，干净上下文。**

### 7. dispatching-parallel-agents —— 并行指挥

**多个独立任务，同时派多个 agent 做。**

真实案例：6 个测试失败分布在 3 个文件，bug 互不相关。

串行修 30 分钟。并行派 3 个 agent，10 分钟全搞定，零冲突。

**关键：给 agent 的任务描述要具体到测试名、错误信息、约束条件。**

```
修复 agent-tool-abort.test.ts 的 3 个失败测试：
1. "should abort with partial output" - 期望包含 interrupted at
2. "should handle mixed completed/aborted" - fast tool 被错误 abort
3. "should track pendingToolCount" - 期望 3 个结果得到 0

这是时序问题。用事件等待替换超时。不要只增大超时。

返回：根因分析 + 修改摘要
```

### 8. test-driven-development —— 先测试后写码

**铁律：没有失败测试，不准写任何生产代码。违反了？删掉从头来。**

**RED-GREEN-REFACTOR：**

- RED -> 写失败测试，确认失败原因是"功能不存在"
- GREEN -> 写最少代码让测试通过，不多写一行
- REFACTOR -> 只在绿灯下重构，保持测试通过

**反例对比：**

```python
# 测试只要求 "重试 3 次"
# BAD: 过度设计
async function retryOperation<T>(
  fn, options?: { maxRetries?, backoff?, onRetry? }
) {... }

# GOOD: 刚好够用
async function retryOperation<T>(fn) {
  for (let i = 0; i < 3; i++) {
    try { return await fn(); }
    catch (e) { if (i === 2) throw e; }
  }
}
```

### 9. systematic-debugging —— 四阶段排查

**铁律：没有完成根因调查，不准尝试修复。**

**Phase 1: 根因调查**

逐行读错误 -> 稳定复现 -> 查最近改动 -> 多层系统加诊断日志

```bash
echo "=== Layer 1: Workflow ==="
echo "IDENTITY: ${IDENTITY:+SET}${IDENTITY:-UNSET}"
echo "=== Layer 2: Build ==="
env | grep IDENTITY || echo "not in env"
echo "=== Layer 3: Signing ==="
security find-identity -v
# 逐层打印，立刻看到哪层断了
```

**Phase 2: 模式分析**

找"能跑的类似代码"和"坏掉的代码"逐项对比

**Phase 3: 假设+测试**

一次一个假设，一次只改一个变量

**Phase 4: 实施修复**

**修了 3 次都没成功？停！这不是 bug，是架构问题。**

### 10. verification-before-completion —— 不验证不准说完成

**没有当场跑验证命令并看到输出，不准说"完成"。**

- X "应该可以了" -> 跑验证命令
- X "我很有信心" -> 信心不等于证据
- X "Linter 通过了" -> Linter 不等于编译器
- O 跑测试 -> 看到 34/34 pass -> 才能说"全部通过"

**最狠要求：写回归测试 -> 跑通 -> 回退修复 -> 确认测试失败 -> 恢复 -> 再跑通。证明测试真的能抓 bug。**

### 11/12. 代码审查：请求 + 接收

**做完一个任务就派审查 agent，给它 git SHA 范围和计划要求。**

收到审查意见后的规则：

- X "你说得太对了！" -> 禁止，技术讨论不表演
- X 直接照做 -> 先验证建议在当前代码库是否正确
- O 该反驳就反驳，用技术理由

**YAGNI 检查：审查人说"功能该做完善" -> 先 grep 看有没有调用方 -> 没人调就删（YAGNI）。**

### 13. writing-skills —— 把经验变成技能

**和 TDD 一样的铁律：没先测试就写出来的技能，删掉重来。**

- RED -> 没有技能时 AI 怎么做？记录错误行为
- GREEN -> 写技能让 AI 行为正确
- REFACTOR -> AI 找到绕过方式？堵上再测再堵

**设计细节：技能的 description 只能写"什么时候用"，不能写"怎么用"。测试发现 AI 会按 description 走捷径跳过正文。**

```markdown
# BAD: AI 不读正文了
description: 用于 TDD - 先写测试，看到失败，写最小代码

# GOOD: 只写触发条件
description: Use when implementing any feature, before writing code
```

### 14. finishing-a-development-branch —— 收尾

1. 跑测试 -> 失败不准继续
2. 给 4 个选项：本地合并 / 创建 PR / 保持不动 / 丢弃
3. 丢弃需要输入完整单词"discard"确认（不是 y/n 防手滑）
4. 清理 worktree

---

## 三、安装与配置

### 官方安装方法

```bash
claude install-plugin superpowers-marketplace/superpowers
```

一行命令，14 个技能自动注入，无需额外配置。

### FradSer 增强版安装

```bash
# 第一步，添加作者的插件市场
claude plugin marketplace add FradSer/dotclaude

# 第二步，直接安装
claude plugin install superpowers@frad-dotclaude
```

装完重启 Claude 或者刷新会话，就能用了。

### 按需启用

20 多个 Skill 全开可能有点重。建议只启用 `brainstorming` 和 `TDD` 两个，其他的按需打开。

### 不用 Claude Code 的核心思路

如果你不用 Claude Code，核心思路也可以搬。本质 7 条规则：

1. 接到需求先问清楚，不准直接动手
2. 先写测试再写代码
3. 出了 bug 四阶段排查，不准乱改
4. 做完必须验证，不准口头说"搞定了"
5. 自己审查自己的代码
6. 独立任务并行做
7. 修 3 次修不好就停下来质疑方向

**这 7 条规则，不管你用什么 AI，都能让它的工作质量翻倍。**

---

## 四、与其他工具组合使用

### Superpowers + Ralph-Loop：自动化循环

Ralph-Loop 名字来自辛普森动画里的 Ralph Wiggum，Anthropic 工程师 Daisy Hollman 做的。通过 Stop Hook 拦截 Claude 的退出，把同一个任务重新喂给它。

Claude Code 有个习惯：做到一半觉得差不多了就停下来说"我已经完成了基础框架，你可以在此基础上继续"。Ralph Loop 不让它停。Claude 试图退出，Hook 拦截，检查完成条件，没满足就塞回去。循环往复，直到真正做完。

**使用技巧：完成条件要写得越具体越好。**

```bash
/ralph-loop:ralph-loop "实现用户认证模块。完成标准：JWT 登录注册、测试通过、README 更新。完成后输出 COMPLETE" --max-iterations 20 --completion-promise "COMPLETE"
```

### Superpowers + gstack：规范驱动开发

整体流程分三个阶段：

**规划阶段** 用 gstack 里的 Skill：

1. **office-hours**：验证需求真实性。YC 六步框架逼你想清楚
2. **plan-ceo-review**：战略评审，从市场规模、竞争壁垒、商业模式角度挑战方案
3. **plan-eng-review**：架构评审，审视数据流、性能瓶颈、测试覆盖
4. **plan-design-review**：设计评审，从七个维度评分

**开发阶段** 用 Superpowers：

1. **brainstorming**：结构化对话
2. **write-a-prd**：产出 PRD 文档
3. **writing-plans**：拆成小任务
4. **subagent-driven-development**：独立 subagent 执行

**发布阶段** 回到 gstack：

1. **review**：代码评审
2. **qa**：真实浏览器测试
3. **ship**：同步主分支、运行测试、推送代码、创建 PR

### Superpowers + CE：知识沉淀

很多人在 X 上讨论"CE 能不能替代 Superpowers"，superpowers 的 GitHub 上甚至有个 Issue #230 专门讨论这个，16 个 upvote。

**结论是：层次不同，不构成替代。**

简单说就是：**Superpowers 管纪律，CE 管能力。**

- Superpowers 是 Harness 层，通过 hooks 和技能约束强制 AI 遵守工程纪律
- CE 是 Skill Pack 层，提供多代理 review 和知识沉淀的能力

**推荐组合方式：**

- 需求探索用 Superpowers 的 brainstorming
- 技术计划用 CE 的 plan
- 代码实现用 Superpowers 的 TDD
- 代码审查用 CE 的 review
- 知识沉淀用 CE 的 compound

### Superpowers + Stitch + Claude Code：产品开发三件套

**流程：**

1. **Codex**：帮你把一句话需求翻译成精准的产品描述
2. **Superpowers**：脑暴阶段，把乱麻一样的想法整理成可执行的产品方案，顺手生成给 Stitch 用的设计 Prompt
3. **Stitch**：专业 AI 出专业 UI，2 分钟 8 张设计图
4. **Claude Code + MCP**：读取 Stitch 设计图，并行开发，代码到成品

**Stitch MCP 配置：**

```bash
claude mcp add stitch \
  --transport http \
  --url "https://stitch.googleapis.com/mcp" \
  --header "X-Goog-Api-Key: 你的APIKey"
```

---

## 五、模型选择

### 三模型实测对比

用 Opus 4.6、Kimi K2.5、GLM-5 三个模型构建同一全栈项目的结果：

| 维度 | Opus 4.6 | Kimi K2.5 | GLM-5 |
|------|----------|-----------|-------|
| Brainstorming 提问方式 | 从全局到局部 | 从全局到局部 | 从局部到整体 |
| 架构设计深度 | 最深，有风险分析和回退策略 | 不错 | 弱一截 |
| 外部指令遵循 | 好 | 差，会跳过 plan review 和 code review | 好 |
| 方案质量 | 最高 | 较高 | 一般 |

**结论：**

- 在计划阶段，Kimi 略优于 GLM-5，但两者跟 Opus 4.6 的差距仍然明显
- Kimi K2.5 的推理模式跟 Opus 接近，架构设计也不错，卡就卡在指令遵循上
- GLM-5 针对 Claude 的优化可能主要在基础对话层面，复杂的多步规划差距还在
- Kimi 和 GLM-5 有一个 Opus 给不了的优势：**便宜**，延迟低，适合日常开发中不那么关键的阶段

### 统一配置方案

七牛云的 MaaS 平台同时支持海内外 130+ 大模型，配置方式完全一样：

```json
// Claude Opus 4.6
{
  "env": {
    "ANTHROPIC_API_KEY": "你的七牛云 API Key",
    "ANTHROPIC_BASE_URL": "https://api.qnaigc.com",
    "ANTHROPIC_MODEL": "claude-4-6-opus"
  }
}

// Kimi K2.5
{
  "env": {
    "ANTHROPIC_API_KEY": "你的七牛云 API Key",
    "ANTHROPIC_BASE_URL": "https://api.qnaigc.com",
    "ANTHROPIC_MODEL": "moonshotai/kimi-k2.5"
  }
}

// GLM-5
{
  "env": {
    "ANTHROPIC_API_KEY": "你的七牛云 API Key",
    "ANTHROPIC_BASE_URL": "https://api.qnaigc.com",
    "ANTHROPIC_MODEL": "z-ai/glm-5"
  }
}
```

一个平台、一个 Key、改一行配置就能切换模型。

---

## 六、实战案例

### 案例 1：创作者中心开发

**需求：** 把 6 个图片生成模块做成 Web 可视化界面

**流程：**

1. **需求翻译**：先用 Codex 把简短的原始需求润色扩展成完整版本
2. **脑暴确认**：Superpowers 引导确认用户群体、技术栈、权限处理等细节
3. **方案输出**：AI 输出三套技术方案，用户选择并定制
4. **导航结构**：临时 Web 预览，直接在浏览器里看导航结构方案
5. **UI 设计**：Stitch 2-3 分钟出 8 张设计图
6. **并行开发**：Claude Code 通过 MCP 读取设计图，subagent 并行开发

**调试技巧：不要一次截图说太多问题，一次只说一个最重要的问题。一口气列 10 个问题，AI 很容易顾此失彼。**

### 案例 2：Agent 竞技场项目

**需求：** 做一个让多个 AI Agent 进行博弈对战、观察策略演化的平台

**流程：**

1. **office-hours 验证需求**：YC 六步框架逼你想清楚
   - 需求现实：你解决的问题是不是真的存在？
   - 现状分析：现有方案是什么？它们为什么不够好？
   - 具体性：你能不能用一个具体的场景描述这个问题？
   - 最小切入点：你能做的最小有用产品是什么？
   - 观察：你有没有和潜在用户聊过？
   - 未来适配：如果这个方向成功了，下一步是什么？

2. **brainstorming 方案设计**：逐步提问，确定支持经典博弈场景、自定义博弈规则、策略演化展示

3. **write-a-prd 撰写 PRD**：产出用户视角的问题描述、解决方案、用户故事列表

4. **三轮评审**：
   - plan-ceo-review：战略角度挑战方案
   - plan-eng-review：工程架构审视
   - plan-design-review：产品设计评分

5. **分阶段开发**：writing-plans 拆分，subagent-driven-development 执行

---

## 七、CE vs Superpowers 对比

### 核心差异：记忆系统

这是有人开始用 CE 替代 Superpowers 的关键原因。

**Superpowers 的问题：做完就完了，下一个 session 还是从零开始。**

### CE 在三个层面做得更深

**第一层：Plan 更深**

- Superpowers 大多还是在当前 context 里写 plan
- CE 的 `/ce:plan` 会并行派出 research agents，去搜项目历史经验、扫 codebase pattern、读 git history
- 这意味着它写出来的 plan，不只基于"你刚刚说了什么"，还基于"这个项目过去到底发生过什么"

**第二层：Review 更细**

- Superpowers 的 reviewer 数量有限
- CE 会拉起 6 到 15 个专项 reviewer 并行，从 correctness、security、performance、testing、maintainability 到 adversarial 分别出报告

**第三层：知识积累**

- Anthropic 的 progress file 解决的是连续性：session A 给 session B 交接
- CE 的 `docs/solutions/` 解决的是积累性：所有未来的班次都能查历史知识库

### compound 的价值

CE 的 `/ce:compound` 会并行拉起三个 agent：

1. Context Analyzer
2. Solution Extractor
3. Related Docs Finder

最后把这次 session 里真正有价值的东西，写进 `docs/solutions/`。

结构化知识包含：
- Problem
- What Didn't Work
- Solution
- Prevention

**知识沉淀的价值验证：**

第一轮开发留下的 `fastapi-chromadb-production-patterns.md`，在第二轮开发增加 PDF 上传功能时，被 learnings-researcher 子代理自动搜索到。plan 文档里直接引用了上轮的已知问题，新增的 OCR 模块主动采用了单例模式，因为上一轮 compound 记录了 ChromaDB 非单例是个问题。

### 推荐组合

**不是"只选一个"，而是 gstack + CE：**

- gstack 负责：`/plan-ceo-review`、`/plan-eng-review`、`/qa`
- CE 负责：`/ce:plan`、`/ce:work`、`/ce:review`、`/ce:compound`

**一句话总结：gstack 负责"做不做"和"真实测"，CE 负责"怎么做""做得好不好"和"记住"。**

---

## 八、踩坑经验

### 1. 装太多插件的问题

装太多互相打架，反而会影响整体的性能，并且上下文也吃不消。精选几个足够用即可。

**推荐安装优先级：**

- **Superpowers**：装就对了，开发流程规范起来没坏处
- **PUA**：被 AI 气过的装一个，治摆烂有奇效
- **Claude Mem**：跑长期项目的刚需，不用每次跟 AI 重新交代背景
- **UI/UX Pro Max**：做前端的再装，告别千篇一律的蓝白配色

### 2. 项目级 Skills 推荐

对不同功能的 Skills，特别是仅跟项目相关的 Skills，推荐放到项目中，提交到 Git，即方便了管理和团队共享，还节省了其他项目的上下文空间。

### 3. TDD 阶段的坑

尽管严格按照约束做了 E2E 的测试，但实际上还会存在代码跑不通的情况。需要引入外部手段做 code review。

这就是为什么要组合 CE 的原因——CE 的 review 阶段能同时启动 12 个子代理从安全、性能、架构等维度并行审查代码。

### 4. compound 不是每次都要跑

不是每个 session 都值得沉淀知识。比如改一个 typo、调一处 CSS、跑一次 migration，这些事情通常不值得写进项目知识库。

如果什么都自动沉淀，最后 `docs/solutions/` 只会被低价值信息淹没，反而让真正有用的经验更难被检索到。

**推荐：做一个 compound janitor，每天回头扫当天的 session 和 git diff，只把真正有价值的那些任务沉淀下来。**

### 5. 费用问题

CE 光是装上不用就吃 36k token，多代理并行的费用也是实打实的。小任务、改 bug，完全不需要走全流程。

关键是用对场景。正经的功能开发，尤其是需要多轮迭代的项目，知识沉淀带来的加速效果是真实的。

---

## 九、核心价值总结

### 返工大幅减少

需求验证阶段就把模糊的想法厘清了，评审阶段把架构和设计漏洞堵住了，开发阶段 TDD 强制保证质量。每一步都有把关，不会因为「偷懒」而跳过。

### 效率提升明显

所有决策都在前面做好了，后面就是纯粹的执行。AI 可以并行执行多个任务，不需要等一个写完另一个才能开始。

### 过程可复用

每个项目积累的文档、规范、最佳实践，都是下一个项目的资产。PRD 模板、架构模式、测试策略都可以复用。

### 逼近"永续型 Agent"

所谓"永续" Agent，核心并不是 24 小时一直工作，而是：

- 持续工作
- 持续沉淀
- 持续避免重复错误
- 持续减少重复浪费

如果一个 Agent 每天帮你写代码、修 bug、跑测试，但做完之后所有经验都散落在 session 里，下次还要重踩一遍，那它顶多只是高效劳动力。

只有当这些经验会被系统化保留下来，并在未来 planning 阶段再次被自动检索出来，它才开始接近"会自我积累"的状态。

---

## 资源链接

- **Superpowers 开源地址**：https://github.com/obra/superpowers
- **gstack 地址**：https://github.com/garrytan/gstack
- **write-a-prd 地址**：https://github.com/mattpoclock/skills
- **Anthropic 官方 Skills 仓库**：https://github.com/anthropics/skills
- **Anthropic 官方 Plugins 仓库**：https://github.com/anthropics/claude-plugins-official
- **Awesome Claude Skills 社区列表**：https://github.com/travisvn/awesome-claude-skills
- **Claude Code Skills 文档**：https://code.claude.com/docs/en/skills
- **Skills 市场**：https://skillsmp.com/

---

## 来源文章

本文融合自以下 8 篇文章：

1. 《Claude Code最佳搭档Superpowers：14个技能完整拆解》- 莲花明
2. 《Claude 插件新组合：Superpowers + Ralph-Loop》- 知识姬 Mina
3. 《CE + Superpowers 三模型实测》- Lex 陆徐洲
4. 《Superpowers+Stitch+Claude Code：创作者中心实战全记录》- 幸运兔聊AI
5. 《十个顶级 Claude Code Skills》- Feisky
6. 《开发笔记：Claude Code 开发技能别装那么多插件了》- 灵境星匠
7. 《为什么有人开始用 CE 替代 Superpowers？》- 探索与发现-Ultra
8. 《放弃Vibe Coding：我用Superpowers+gstack沉淀出一套大幅减少返工的skill组合工作流》- 是Aren吖
