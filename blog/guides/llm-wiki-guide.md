---
title: "LLM-Wiki 知识管理实践指南"
source:
  - "https://mp.weixin.qq.com/s/v9fVSKPylBwPUBAl85mgcg"
  - "https://mp.weixin.qq.com/s/3wRbMYH04HpbCh__e4A5PA"
  - "https://mp.weixin.qq.com/s/z-S-UZfS-U3Ff0Tg_z6TgQ"
author:
  - "[[Lex 陆徐洲]]"
  - "[[学总笔记]]"
  - "[[李泽宇的AI实验室]]"
created: 2026-04-23
description: "LLM-Wiki 知识管理完整指南：从 Karpathy 的核心理念到三个实战案例，涵盖 Claude Code 编译、三层架构设计、开源方案 Brain OS，以及最佳实践总结。"
category: guides
tags: [llm-wiki, obsidian, 知识管理, claude-code, 自动化, 开源]
summary: 将三篇 LLM-Wiki 实践文章融合成完整指南。包含：Karpathy 的核心理念（用 LLM 编译知识而非临时 RAG）、Claude Code 编译 43 篇文章的实战过程、三层架构与三个核心命令、开源项目 Brain OS 的自动流水线，以及最佳实践总结。
---

# LLM-Wiki 知识管理实践指南

笔记越记越多，但从来不翻。你是不是也这样？

很多人晒过漂亮的 Obsidian 截图，但很少有人说"我用它查到了什么有用的东西"。知识库死在维护成本上，不是工具。

Andrej Karpathy 提出的 LLM-Wiki 思路，给出了一个解法：让 AI 来维护你的知识库。

本指南整合了三篇实践文章，从理念到实操，帮你搭建自己的 AI 驱动知识系统。

---

## 1. 什么是 LLM-Wiki

### Karpathy 的核心观点

去年 Karpathy 提出了一个想法：

> 与其每次查询时让 AI 临时检索拼接（RAG），不如让 AI 把新材料持续编译成一个 wiki，让知识真正沉淀下来。

RAG 的问题是，你问一千次，它就临时组装一千次，知识本身没有积累。

LLM-Wiki 反过来：先把知识编译成结构化条目，之后每次查询都在这个已经沉淀好的网络上检索。

更关键的是：**维护 wiki 的是 AI，不是你。**

### 为什么传统知识库会失败

传统知识管理流程：收集 → 整理 → 存储 → 利用

问题出在"整理"环节。每篇文章读完要提炼要点、打标签、建双链、写摘要——这套做下来比读文章本身还费时间。热情消退之后，inbox 就再也没清过。

Karpathy 引用了 Vannevar Bush 1945 年的 Memex 设想——一个有关联轨迹的个人知识存储。Bush 当时解决不了一个问题：谁来做维护？你做不到每天回顾过去三个月所有的笔记然后手动找连接。

LLM 能。Karpathy 说得好——"人类放弃 wiki 是因为维护成本比价值增长得快。LLM 不会觉得无聊。"

### 编译 vs 临时检索

直接让 LLM 读原文也能回答问题，但那是每次开新会话都要重新解析，每次推导出来的关系还不一定一样。

wiki 是编译后的产物，摘要浓缩、概念关系已经物化成文件，不用每次从头来。

打个比方，你每次运行程序是跑编译后的二进制，不是每次从源代码重新解释执行。知识管理也是一样，编译一次，后面反复查就行了。

---

## 2. Obsidian + Claude Code 实战

### 实战背景

从一月底到四月初，公众号陆续写了 43 篇实战文章，5 个栏目，涉及二十多个 AI 工具。写的时候一篇一篇往前赶，回头一看全是散的。

最近有出版社找合作出书，才发现这些内容缺一次系统性的梳理，写过什么、哪些还没覆盖、下一步往哪走，自己都说不清楚。

### 第一步：扫描生成清单

让 Claude Code 扫描整个目录，生成内容清单。43 篇文章的标题、字数、涉及的工具，几秒钟全部列出来。

这一步的意义在于你第一次在一个地方看到自己所有内容的全貌。

### 第二步：LLM 编译

在公众号目录下新建了一个 `wiki/` 文件夹作为 Obsidian vault。

Claude Code 逐篇读完 43 篇文章，每篇生成一张摘要卡片，三五句话概括内容，标注核心观点和涉及的工具。

所有工具名用 Obsidian 的 `[[双向链接]]` 语法标注，比如 `[[Claude Code]]`、`[[MCP]]`。这不是装饰，后面整个知识网络能跑起来就靠这些链接。

整个编译过程拆成多个任务，Claude Code 按顺序一步步跑。生成摘要卡片这步最耗时，4 个 agent 按栏目同时跑，十来分钟全部跑完。

### 第三步：提取概念页

43 张卡片出来之后，Claude Code 又从里面提取高频概念，每个概念生成一个独立页面。

比如 `[[Claude Code]]` 的概念页，自动列出了 28 篇提到它的文章，还标注了和 `[[Codex CLI]]`、`[[Superpowers]]`、`[[MCP]]` 之间的关系。

你不用手动整理"哪篇文章用了什么工具"，LLM 帮你把关联全部抽出来了。

### 第四步：生成索引

最后自动生成四张索引：全局索引、按栏目分类、按工具分类、按时间线排列。

跑完之后 wiki 里有 73 个 .md 文件：43 张文章卡片、25 个概念页、5 张索引。

这些不是原文的复制粘贴，而是 LLM 理解之后重新组织的结构化产物。

### 第五步：可视化与导航

打开 Obsidian 加载 vault，Graph View 能直接看到知识网络的全貌。

Claude Code 是最大的节点，28 条线连出去。OpenCode 第二大，9 条线。MCP 在中间位置，一边连着 Figma 和 Pencil 这些设计工具，一边连着 Obsidian。

点进任何一个概念节点，跳到概念页，再点文章链接跳到摘要卡片，一路点下去能发现之前完全没注意到的关联。

### 第六步：对知识库提问

收获最大的环节——对知识库提问。

**问题一：覆盖分析**

问："写过哪些 Claude Code 能力点，还有什么重要功能没覆盖？"

它扫完概念页和卡片，给了一张覆盖矩阵。Agent Teams、Subagents、Skills、git worktree 都有深度文章。

但空白区让人没想到：Hooks 系统、IDE 插件、CI/CD 集成、Memory 持久记忆全是零覆盖。写了两个月，这些重要功能完全没碰过。

**问题二：关联发现**

再问关联发现。OpenCode 有 9 篇，Superpowers 有 4 篇，两者零交叉。MCP 出现 6 次但从没当过文章主角。

它还跑出来一张概念引用频率表和聚类拓扑图，把所有文章涉及的工具分成了 CLI 工具层、Agent 架构层、设计协作层、方法论层这些聚类。

**问题三：选题推荐**

让它推荐接下来该写什么。给了三个选题：

- Claude Code Hooks 实战（零覆盖的高级功能）
- MCP Server 横评（散见各文但没有专题）
- OpenCode + Superpowers（两座孤岛的桥）

每个都附了关联已有文章和理由。这些靠自己翻文件夹是发现不了的。

这些问答结果不是聊天记录。Claude Code 把分析保存成了 .md 文件，下次规划选题直接打开就能用。

### 第七步：自我修复

最后做一轮校验。让 Claude Code 扫描所有双向链接，查哪些链接没有对应文件。

扫出 32 个断链——`[[Kimi]]` 被 4 篇文章引用但没有概念页，`[[GLM-5]]`、`[[BMAD]]` 都一样。

Claude Code 自动补建了 7 个高频概念页，断链降到 25 个。剩下的都是低频的模型版本号，不值得单独建。

这就是 Karpathy 说的"知识库自我修复"。你不用盯着每个细节，LLM 帮你查漏补缺。

---

## 3. 个人实践与开源方案

### 三层架构设计

一个完整的 LLM-Wiki 系统采用三层结构，一个规则文件：

```
raw/        ← 原始材料，只进不改
wiki/       ← 编译后的知识，AI 维护
tools/      ← CLI 工具集
AGENTS.md   ← AI 的操作手册
```

- **raw/**：原始材料的存放地，只进不改。读完一篇论文、一篇好文章，扔进去就行。
- **wiki/**：AI 维护的知识库。所有编译后的条目、索引、概念页都在这里。
- **tools/**：CLI 工具集，支持各种自动化操作。
- **AGENTS.md**：AI 的操作手册，定义了 AI 应该按什么规则工作。

### 三个核心命令

配合任何支持 agent 的 IDE 使用——Trae、Cursor、Codex、Claude Code 都行。打开项目，跑起来只需要三件事：

**wiki-update — 有新文件进了 raw/，运行这个更新 wiki**

```
你：raw/ 里有新文章，帮我更新 wiki

AI：扫描新文件 → 编译内容 → 合并或新建条目 → 更新索引和日志
```

**wiki-query — 搜索和问答**

```
你：扩散模型和 GAN 的核心区别是什么？

AI：读索引 → 读相关条目 → 给出基于 wiki 的答案 → 存入 outputs/qa/
```

**wiki-dashboard — 查看你的专属 wiki 全貌**

```
你：给我看一下 wiki 现在的状态

AI：展示条目数量、覆盖领域、最近更新、健康问题（断链/孤立页）
```

### 用起来是什么感觉

读完一篇论文，扔进 raw/，跟 AI 说一句"wiki-update"。

自动分析内容、检查有没有重复条目、合并或新建、更新索引、写入日志。

你什么都不用做。

查询时直接问问题，AI 先读索引，再读相关条目，答案基于沉淀好的 wiki，不是临时拼凑。高质量的回答还会被存进 outputs/qa/，好的可以升级成新的 wiki 条目。

知识在滚雪球，不是在漏沙。

---

## 4. 开源方案：Obsidian Brain OS

李泽宇开源了 Obsidian Brain OS——一个 AI 驱动的个人上下文管理系统。

GitHub: https://github.com/FairladyZ625/Obsidian-Brain-OS

### 核心功能

**Nightly Pipeline — 每天凌晨自动跑知识整合**

三段流水线：

- 02:00 文章整合 — 你白天标记的文章被自动变成结构化知识卡片，建立领域索引和交叉引用
- 03:00 对话挖掘 — 你当天跟 AI 的聊天记录被自动提炼出关键洞察、决策记录和研究种子
- 04:00 知识放大 — 跨来源交叉引用，发现文章侧的技术素材和对话侧的战略定位恰好对齐的"强交叉"

如果信号足够重要，它还会自动调用 NotebookLM 做深度研究，把一个线索展开成完整的研究报告。

**Personal Ops — AI 参谋长**

每天早上 7:00 自动生成今日驾驶舱。AI 读你的 todo-backlog、承诺事项、决策队列，然后自动生成这份驾驶舱。早上打开 Obsidian 扫一眼，就知道今天该干什么、催什么、不干什么。

15:00 和 20:00 还会自动提醒你检查进展。

**三层知识架构**

- READING：你真正读的内容
- WORKING：AI 的工作台，你不用看
- SYSTEM：流水线内部，完全自动

物理隔离，好内容不会被处理中间产物淹没。

**Agent 团队**

- 主 Agent：编排所有事
- Writer Agent：专职写入，确保格式一致
- Chronicle Agent：史官，静默记录频道历史
- Review Agent：审计，定期检查知识库健康

**隐私分层**

- `06-PERSONAL-DOCS` AI 默认不碰（健康、财务）
- `07-WORK-CONTEXT` AI 可以参考（工作经验、客户背景、决策记录）

### 快速开始

把下面这段话复制给你的 AI Agent：

```
你好！我想安装 Obsidian Brain OS——一个 AI 驱动的个人上下文管理系统。请帮我：
1. 克隆仓库：git clone https://github.com/FairladyZ625/Obsidian-Brain-OS.git
2. 阅读 skills/brain-os-installer/SKILL.md —— 这是给你的安装指南
3. 按指南帮我配置：问我 vault 放哪、我叫什么、时区等
4. 用我的回答运行 bash setup.sh（或手动一步步来）
5. 装完后读 docs/agents.md，帮我配好 Agent 团队
6. 最后跑一遍 setup.sh 的验证清单确认一切正常
现在就开始吧！
```

**建议的 MVP 路径：**

先用最简单的——INBOX + todo-backlog + morning brief。把想到的事都让 Agent 往 INBOX 里扔，让 AI 每天给你生成一份今日驾驶舱。用两周，你会开始理解为什么这套系统有用。然后再加 nightly pipeline、conversation mining、knowledge amplification。慢慢来。

---

## 5. 最佳实践

### 核心原则

**只进不改**

raw/ 目录是原始材料的存放地，只进不改。这保证了知识的可追溯性。

**AI 维护 wiki**

wiki/ 目录由 AI 维护。你不要手动编辑，让 AI 来做整理、索引、关联的工作。

**编译而非检索**

先把知识编译成结构化条目，再查询。不是每次临时检索拼接。

**持续增量**

每次有新材料，运行 wiki-update。知识库是活的，持续增长。

### 三种场景的适用方案

**场景一：已有大量散落笔记**

使用 Claude Code 编译方案：
1. 让 Claude Code 扫描所有笔记
2. 生成摘要卡片和概念页
3. 建立双向链接
4. 自动发现断链并修复

**场景二：需要持续维护知识库**

使用三层架构方案：
1. 建立 raw/wiki/tools 目录结构
2. 配置 AGENTS.md 规则文件
3. 新材料扔进 raw/
4. 定期运行 wiki-update

**场景三：需要高度自动化**

使用 Brain OS 开源方案：
1. 安装 Obsidian Brain OS
2. 配置 Nightly Pipeline
3. 设置 Personal Ops
4. 让系统自动运行

### 关键注意事项

**这不是下载就能用的工具**

你需要投入时间——跟你的 Agent 详细讨论使用场景、配置定时任务、把自己的上下文资产认真维护起来。好的 Agent 配合需要你把"龙虾"养好。装完只是起点。

**Agent Memory 和你的上下文是两件事**

- Agent Memory 是 AI 的个性化灵魂——让 AI 有个性，成为你的伙伴
- 你的上下文资产是你生活中的背景信息——健康记录、工作决策、读过的文章——能让你的 Agent 真正懂你

一个是 Agent 侧的事，一个是你自己侧的事。它们互补。

**建议从简单开始**

先用 INBOX + todo-backlog + morning brief。理解为什么这套系统有用之后，再加更复杂的功能。

---

## 总结

1945 年，Vannevar Bush 在《As We May Think》里设想了 Memex——一个私人的、有关联轨迹的知识存储。他描述的东西跟今天的 Obsidian + LLM 惊人地相似。

81 年过去了，Bush 解决不了的那个问题——谁来做维护——终于有了答案。

你每天都在产生上下文。它们要么消失在关掉的对话窗口里，要么沉淀在你的 vault 里，变成未来的你能用上的东西。

**上下文是每个人最重要的复利资产。精心呵护它。**

---

## 参考链接

- Karpathy LLM Wiki：https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Obsidian Brain OS（GitHub）：https://github.com/FairladyZ625/Obsidian-Brain-OS
- Vannevar Bush, "As We May Think" (1945)：https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/
