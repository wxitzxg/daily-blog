---
title: "Karpathy Skills 编码原则指南"
source:
  - "https://mp.weixin.qq.com/s/RB5h5BQ-x3c78JgbjxKBtA"
  - "https://mp.weixin.qq.com/s/bCFiJ4HPE65T-m-GKMdOhQ"
author:
  - "结构派AI"
  - "里德德"
created: 2026-04-23
description: "Andrej Karpathy发现AI写代码存在三大顽疾：自作主张做错误假设、喜欢把简单问题复杂化、乱改无关代码。andrej-karpathy-skills项目用四个核心原则解决这些问题：编码前先思考、简单优先、外科手术式修改、目标驱动执行。实践证明，一个CLAUDE.md文件就能让AI从'热情过度的实习生'变成'手稳不越界的资深工程师'。"
category: guides
tags: [karpathy, ai编程, 编码原则, claude-skills, 工程实践]
---

# Karpathy Skills 编码原则

## 1. 项目介绍

几天前，Andrej Karpathy 发了一条吐槽：

> "模型会自作主张做出错误假设，然后一路错下去。它们不会管理困惑，不会寻求澄清，该反驳的时候不反驳，100行能解决的问题，要写1000行。"

基于这条观察，有人创建了 **andrej-karpathy-skills** 项目——仅仅一个 `CLAUDE.md` 文件，上线几天狂揽 20.8K Star。

这个项目的核心洞察来自 Karpathy 的一句话：

> "大语言模型特别擅长循环迭代直到达成具体目标……别告诉它要做什么，给它成功标准，然后看着它自己跑。"

把这句洞察变成可执行的规则，就是这个项目的全部内容。

## 2. AI编程三大顽疾

用 AI 写代码的同学，多半遇到过这些糟心事：

### 顽疾一：自作主张，闷头错跑

你让改一个导出函数，它顺便把整个配置文件重新格式化了。需求有歧义，它不问，直接选一个错的理解往下跑，最后你还要返工。

Karpathy 的原话：

> "模型会替你做错误的假设，然后闷头跑。它们不管理自己的困惑，不寻求澄清，不暴露矛盾，不展示权衡，该反抗的时候不反抗。"

### 顽疾二：过度复杂化

你说清楚"只加一个参数"，它给你抽出三层抽象，把简单问题复杂化。

> "它们特别喜欢把代码和 API 搞复杂，滥用抽象，不清理无用代码……明明 100 行能解决的事，非要写 1000 行。"

### 顽疾三：乱改无关代码

> "它们有时候会改/删自己没完全理解的注释和代码，哪怕跟手头的任务完全无关。"

这三点加在一起，AI 写代码从"帮手"变成了"需要你盯着的孩子"。

## 3. 四个核心原则

这个 `CLAUDE.md` 里写了四条原则，每一条都是奔着上面那些问题去的：

### 原则一：Think Before Coding（编码前先思考）

**核心：不猜，不装懂。**

帮你省：猜错需求返工的半小时。

具体做法：
- 不确定就问，不要默默选一个解释运行
- 有歧义就把几种解释都列出来
- 发现更简单的方案就直接说出来
- 哪里不懂就直接指出来，停下来澄清

看到不确定的地方要问清楚，而不是闷头猜。如果有歧义，主动提出来说有几种解释，让人类选。不要自己悄咪咪选了一个方向就开干。

### 原则二：Simplicity First（简单优先）

**核心：能少写，就不多写。**

帮你省：读懂和维护垃圾代码的半小时。

具体做法：
- 只做需求内的功能，不提前加"灵活性"
- 单次调用不做抽象，不搞过度工程
- 不可能发生的场景，不做错误处理
- 200行能写完，绝不写201行

只写能解决问题的最少代码。不要加没要的功能，不要给只用一次的代码写抽象，不要加没要求的"灵活性"。如果 200 行能改成 50 行，重写。

### 原则三：Surgical Changes（外科手术式修改）

**核心：只改你该改的。**

帮你省：还原无辜代码的十几分钟。

具体做法：
- 不动相邻的代码、注释、格式
- 没坏的地方不重构
- 原有风格是什么就是什么，哪怕你不喜欢
- 发现无关死代码，只提醒不删除

只碰非碰不可的地方。别顺便"优化"旁边的代码、别改注释、别重构没坏的东西。保持和现有风格一致。如果改完之后有多余的 import、变量、函数——删掉。但别动原来就有的无用代码。

### 原则四：Goal-Driven Execution（目标驱动执行）

**核心：先想清楚什么是"做好了"。**

帮你省：反复沟通"这样对不对"的十分钟。

具体做法：
- 把模糊需求转成可验证的目标
- 修bug先写测试复现，再改
- 多步任务要写出每一步验收标准
- 目标越具体，AI越少瞎折腾

把"去修个 bug"变成"写一个能复现 bug 的测试，然后让它通过"。把"加个校验"变成"写一个无效输入会失败的测试，然后让它通过"。

任务的描述方式从"命令式"变成"声明式"，给 AI 明确的成功标准，让它自己循环直到达成。

## 4. 实测效果

把这个文件放到项目里测试，前后变化超出预期：

**之前的 Claude：**
- 让改一个导出路径，它顺便把整个配置文件的缩进重新格式化了
- 说好了只加一个判断，它给我抽出一个基类，再搞两个实现类
- 对需求有疑问，它不说，直接按照错的来，最后我要回滚改半天

**加上文件后的 Claude：**
- 它会先问："我理解的需求是XXX，如果理解错了请纠正我"
- 真的只改了说的那几行，无关代码碰都不碰
- 发现要的方案太复杂，它会主动说："这里可以更简单，你看行不行"

**从"热情过度帮倒忙的实习生"变成"手稳不越界的资深工程师"。**

官方说，用了这些规则之后，你会看到：
- 代码改动变少了——只有真正要求改的东西
- 很少出现"写完又重写"的情况——代码一次就写简单了
- AI 会先问清楚再动手，而不是做完了才发现做错了
- 提交变得干净——没有顺带的重构和"改进"

有人测了一下，加上规则前后，相同任务的 code review 一次通过率从大约 40% 提升到了 80% 以上。

## 5. 为什么这招有用？

这个项目之所以爆火，戳破了三个行业迷信：

### 不是模型越大越好，是行为约束越好

现在大家都在追更大的模型，参数从7B涨到70B再涨到405B。

但实际上，GitHub 上这个项目的 issue 区里，排在前面的反馈几乎一模一样——"加了这个文件后，Claude 不再自作主张了""同样的模型，感觉聪明了一倍"。

这说明什么？大部分时候不是 AI 能力不够，而是行为不对。它不是写不出来，是太"热情"了，喜欢过度发挥，喜欢帮你做决定。

给它一套清晰的边界规则，效果比换个更贵的大模型好得多，成本是零。

### 不需要提示工程，需要"提示落地"

很多人还在玩"顶级提示词"，找各种1000字的万能提示词。

这个项目给了另一个思路：**把沉淀下来的经验，变成项目级的固定规则**。

放进 `CLAUDE.md`，它就变成了代码仓库的一部分。可以 git 版本管理，可以团队共享，新人加入项目自动继承，不用每个人重新摸索一遍"怎么跟 AI 说话"。

这才是可复用、可传承、可迭代的提示工程。

### AI coding 的终极方向：人和 AI 分工明确

人提需求，定边界；AI干活，不越界。

人负责拍板"做不做"、"做成什么样"；AI负责"怎么做"，不多做也不少做。

这其实是软件工程几十年的老道理——最好的工程师不是写代码最多的那个，而是最克制的那个。只不过以前这个道理是用来管人的，现在我们发现用来管 AI 一样好使。

## 6. 如何使用

### 方式一：作为 Claude Code 插件安装（推荐）

```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

装完以后，这个规则全局生效——所有项目都用得上。

### 方式二：放到项目根目录

新项目：
```
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

已有项目：
```
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

### CLAUDE.md 完整内容

```markdown
# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes.

## 1. Think Before Coding
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them.
- If a simpler approach exists, push back.
- If unclear, stop and ask clarification.

## 2. Simplicity First
- No features beyond what was asked.
- No abstractions for single-use code.
- No unrequested "flexibility" or "configurability".
- If 200 lines can be 50, rewrite it.

## 3. Surgical Changes
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing project style.
- Mention dead code but don't delete it unless asked.

## 4. Goal-Driven Execution
- Transform tasks into verifiable success criteria.
- State a brief plan for multi-step tasks with checks.
```

### 叠加项目特有规则

你可以在这四条原则之上叠加自己的项目规则：

```markdown
## 项目特有规则
- 使用 TypeScript 严格模式
- 所有 API 接口必须有测试
- 遵循 src/utils/errors.ts 中现有的错误处理模式
```

项目特有的规矩和这套通用原则一合并，AI 干活更靠谱。

## 7. 适用范围

这个方法不绑定 Claude Code，你用 Cursor、GPT-4o、Gemini Code Assist，一样能用。

做法一样简单：在项目根目录放这个文件，AI 一般都会自动读取。就算不自动读，你每次提问的时候加一句"参考项目根目录的CLAUDE.md"就行。

就算你不用 AI 写代码，把这四个原则放在你自己的开发流程里，也能少写很多垃圾代码：
- 想清楚再动手 → 少返工
- 能简单就不复杂 → 好维护
- 别碰不该碰的 → 少出 bug
- 先想验收标准 → 少走歪路

这其实就是资深工程师的基本素养，现在我们把它教给 AI。

---

**项目地址**：[forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)

**总结**：这个项目最有意思的地方是，它没有写任何一行功能代码，只是把聪明人已经验证的开发原则，整理出来交给 AI。但就是这一页纸，解决了无数人每天都在遇到的痛点。

把现有的模型用好，把边界定清楚，比等一个更大的模型，回报快得多。
