---
title: "Karpathy 引爆AI圈的LLM Wiki，我其实已经跑了三个月——于是我开源了"
source: "https://mp.weixin.qq.com/s/z-S-UZfS-U3Ff0Tg_z6TgQ"
author:
  - "[[李泽宇的AI实验室]]"
published:
created: 2026-04-20
description: "开源开箱即用的个人上下文系统"
tags:
  - "clippings"
---
李泽宇的AI实验室 *2026年4月7日 22:42*

前两天刷到 Karpathy 发了一篇叫 LLM Wiki 的文章，当天几千 star。核心观点是：别再每次 RAG 检索了，让 LLM 帮你维护一个持久化的个人知识库——三层架构，自动摄入，定期审计，Obsidian 当前端。

1 月份龙虾火的时候我开始玩。2 月底从马代度假回来，认真打磨。从"存聊天记录"一步步搞成了一整套系统——每天凌晨自动跑知识整合，每天早上自动生成今日待办，每天晚上自动挖掘当天对话里的关键洞察。每天在用，一直觉得就是自己的工具，没觉得有什么特别。

直到 Karpathy 用一篇文章把底层逻辑抽出来—— **我和他竟然想到一块去了。**

既然这个方向被验证了，我决定把自己一直在用的这套东西开源出来，希望和大家一起把它变好。

GitHub: https://github.com/FairladyZ625/Obsidian-Brain-OS

---

## 先看它能做什么

### 每天早上 7:00——今日驾驶舱

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/AV9KYr8WyjploEAMmmcgqWOrvNKMb4ibz4ichyfGefbiauqhp9tmUmsUC79Tg2YX8KicRoOSdicp6V1DkKc0JNuPWTnYaSYkVXfFx0cSgTexWonU/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

AI 每天凌晨读你的 todo-backlog、承诺事项、决策队列，然后自动生成这份驾驶舱。早上打开 Obsidian 扫一眼，就知道今天该干什么、催什么、不干什么。

15:00 和 20:00 还会自动提醒你检查进展（因为我是拖延症晚期😅）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/AV9KYr8WyjojgINIVTYcB4K1M9SIibyqHDRDjex0pDic6mjSmhVcSDibSmu8sDwXMVwU51LhTWRa7plgxVCkyhn5E7t64wSiaPflSc7KgRISy2E/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

### 每天凌晨 2:00-4:00——三段自动流水线

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/AV9KYr8WyjrZ1CeibOmaVXAia7jhXTZ1jFFfumKARRaticKuBLpiazpEet5s1NrdWpq0NgA0Jq0iatoxdlefJyNl8dlLgogTnkFIxicFeeWxXNpxQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

你睡觉的时候它在干活：

- **02:00 文章整合** — 你白天标记的文章被自动变成结构化知识卡片，建立领域索引和交叉引用
- **03:00 对话挖掘** — 你当天跟 AI 的聊天记录被自动提炼出关键洞察、决策记录和研究种子
- **04:00 知识放大** — 跨来源交叉引用。上面那份 digest 里，放大器发现文章侧的技术素材和对话侧的战略定位恰好对齐，形成了一个"强交叉"。这种连接，靠人工每天做不现实

如果信号足够重要，它还会自动调用 NotebookLM 做深度研究，把一个线索展开成完整的研究报告。

早上醒来看一份 digest，就知道你的知识库昨晚又长大了多少。

### 知识图谱/Canvas——每天自动生成，一眼看全局

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

17 个研究问题、25 篇文章笔记、28 篇 READING 层知识卡片，自动分组、自动连线。每天更新。

---

## 你每天产生的上下文，正在消失

你每天跟 AI 聊产品方向、设计决策、技术选型、项目复盘。有时候一个下午聊出来三个关键判断。关掉对话，第二天开新窗口，一切从零开始。那三个判断？那段讨论里突然冒出来的灵感？要么翻聊天记录找，要么重新聊一遍。

不只是对话。你读的文章、做的决策、犯的错误、积累的经验——如果不被系统性地收集和连接，就是一堆散落的碎片。它们各自的价值有限， **但当它们被交叉引用、被连接起来的时候，价值远大于各自的总和。**

这就是复利。

Karpathy 在文章里引用了 Vannevar Bush 1945 年的 Memex 设想——一个有关联轨迹的个人知识存储。Bush 当时解决不了一个问题：谁来做维护？你做不到每天回顾过去三个月所有的笔记然后手动找连接。LLM 能。Karpathy 说得好——"人类放弃 wiki 是因为维护成本比价值增长得快。LLM 不会觉得无聊。"

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**上下文是每个人最重要的复利资产。你需要精心呵护它。**

---

## Agent 的灵魂和你的上下文，是两件事

龙虾为什么火？因为它好像有灵魂。你跟它聊得越多，它的 Memory 越来越丰富，它越来越像你的朋友、伙伴。它记得你的喜好、你的口吻、你跟它之间的默契。这是 **Agent 的记忆** ——它的个性化灵魂。

- **Agent Memory** 是你的虾的灵魂——让 AI 有个性，成为你的伙伴
- **你的上下文资产** 是你生活中大量的背景信息——健康记录、工作决策、读过的文章、犯过的错、积累的行业经验——能让你的 Agent **真正懂你** ，成为一个真正的数字分身

龙虾解决了"怎么让 AI 有灵魂"。Brain OS 解决的是"怎么让你的所有上下文资产不丢失、不散落、持续增长"。 **一个是 Agent 侧的事，一个是你自己侧的事。它们互补。**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Brain OS 里的很多 Skill——写作、brainstorming、研究——本质就是龙虾那些"模块"在 Agent 世界的实现。

---

## 这套系统到底有什么

**🌙 Nightly Pipeline** — 上面已经看过效果了。三段流水线（文章整合 → 对话挖掘 → 知识放大），外加 NotebookLM 深度研究。全自动，每天凌晨跑。

**📋 Personal Ops** — 你的 AI 参谋长。todo-backlog 扔进去就行，AI 帮你分优先级、生成每日驾驶舱、追踪承诺事项、管理决策队列。周计划、月里程碑也自动生成。

**📚 三层知识架构** — READING（你真正读的）、WORKING（AI 的工作台，你不用看）、SYSTEM（流水线内部，完全自动）。物理隔离，好内容不会被处理中间产物淹没。

**🔍 QMD 语义搜索** — 向量检索已经内置了。你可以用自然语言在整个知识库里搜索，不用记关键词。

**🤖 Agent 团队** — 主 Agent（编排所有事）+ Writer Agent（专职写入，确保格式一致）+ Chronicle Agent（史官，静默记录频道历史）+ Review Agent（审计，定期检查知识库健康）。

**🔒 隐私分层** — `06-PERSONAL-DOCS` AI 默认不碰（健康、财务）； `07-WORK-CONTEXT` AI 可以参考（工作经验、客户背景、决策记录）。你的隐私你控制。

**🎯 7 个核心 Skill + 18 个推荐 Skill** — 核心 skill 驱动 nightly pipeline 和 personal ops。另外 18 个推荐 skill 都是社区里别人做的优秀工具——brainstorming、写作、深度研究、代码审计等——我平时用得多，觉得好就推荐了，大家按需取用。

---

## 怎么开始

**把下面这段话复制给你的 AI Agent（Claude / Codex / Cursor / OpenClaw / 任何编程助手），它会帮你装好：**

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

Brain OS 自带一个安装向导 Skill——你的 Agent 读完之后会引导你一步步把它装起来。中英文文档都有，从 `docs/zh/README.md` 开始。

**几件事需要提前知道：**

**这不是下载就能用的工具。** 你需要投入时间——跟你的 Agent 详细讨论你的使用场景、配置你的定时任务（我有很多示例）、把自己的上下文资产认真维护起来。好的 Agent 配合需要你把自己的龙虾养好。装完只是起点。

**这套东西还在早期。** 它是我从自己一直在用的系统里抽出来的，还没有经过非常完善的测试。我自己平常在 Discord 上用，不确定在飞书上用会不会顺畅——如果你是飞书用户，特别欢迎你帮忙测试。飞书的知识库怎么跟本地 Obsidian vault 结合，这块我还没探索过。会有 bug，会有粗糙的地方。我需要大家跟我一起把它越建越好。

**我每天都在迭代。** 这是一个活的项目。正在接入更好的语义检索系统，正在优化 nightly pipeline 的稳定性，正在加更多实用的 skill。今天刚看到 Milla Jovovich（就是生化危机的那个 Alice）开源了一个叫 MemPalace 的 AI 记忆框架——借鉴古希腊记忆宫殿术，把记忆组织成可导航的空间结构，benchmark 跑分拿了行业第一个满分。一个好莱坞演员做出了超过所有 AI 公司 memory 产品的东西。我已经在研究怎么把它的记忆架构跟 Brain OS 的夜间流水线做结合了。

欢迎给我提 PR、提 Issue、提任何意见。

**建议的 MVP 路径：** 先用最简单的——INBOX + todo-backlog + morning brief。把想到的事都让你的Agent往 INBOX 里扔（建议专门有个频道收集你的个人事务），让 AI 每天给你生成一份今日驾驶舱。用两周，你会开始理解为什么这套系统有用。然后再加 nightly pipeline、conversation mining、knowledge amplification。慢慢来。

---

> **1945 年，Vannevar Bush 在 As We May Think 里设想了 Memex——一个私人的、有关联轨迹的知识存储。他描述的东西跟今天的 Obsidian + LLM 惊人地相似。81 年过去了，Bush 解决不了的那个问题——谁来做维护——终于有了答案。**
> 
> **你每天都在产生上下文。它们要么消失在关掉的对话窗口里，要么沉淀在你的 vault 里，变成未来的你能用上的东西。**

---

**参考链接：**

- Karpathy LLM Wiki：https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Obsidian Brain OS（GitHub）：https://github.com/FairladyZ625/Obsidian-Brain-OS
- MemPalace by Milla Jovovich（GitHub）：https://github.com/milla-jovovich/mempalace
- Vannevar Bush, "As We May Think" (1945)：https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/

**微信扫一扫赞赏作者**

作者提示: 个人观点，仅供参考

继续滑动看下一个

榴莲的AI实验室

向上滑动看下一个