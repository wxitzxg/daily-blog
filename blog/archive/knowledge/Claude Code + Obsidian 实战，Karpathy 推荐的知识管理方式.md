---
title: "Claude Code + Obsidian 实战，Karpathy 推荐的知识管理方式"
source: "https://mp.weixin.qq.com/s/v9fVSKPylBwPUBAl85mgcg"
author:
  - "[[Lex 陆徐洲]]"
published:
created: 2026-04-12
description: "推荐给你的系统性知识管理方式。"
category: knowledge
tags: [obsidian, 知识管理, karpathy, 双向链接, claude-code]
summary: 用 Claude Code 将 43 篇文章编译成 Obsidian 知识库，实现知识网络的自我修复和关联发现。通过 LLM 编译，让散乱笔记变成可查询的结构化知识系统。
---
原创 Lex 陆徐洲 *2026年4月5日 07:50*

笔记越记越多，但从来不翻。你是不是也这样？

Karpathy 最近分享了他的解法：用 LLM 把散乱资料编译成可查询、能自我修复的知识系统。

大家好，我是陆徐洲。

从一月底到现在，我的公众号陆续写了 43 篇实战文章，5 个栏目，涉及二十多个 AI 工具。写的时候一篇一篇往前赶，回头一看全是散的。

最近有出版社找我聊合作出书，我才发现这些内容缺一次系统性的梳理，写过什么、哪些还没覆盖、下一步往哪走，我自己都说不清楚。

一个多月前我写过一篇 Obsidian 的介绍文章，当时讲得比较粗浅。

[别折腾NotebookLM了，这套免费方案对中文用户更友好](https://mp.weixin.qq.com/s?__biz=MzU0MDcyMDQ0Nw==&mid=2247483956&idx=1&sn=4c7456d2a6055fb8ea976baa0602ca35&scene=21#wechat_redirect)

这次结合 Karpathy 的方法和这段时间的使用经验，我想把完整的实操过程呈现一次，也给大家的知识管理提供一点思路。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**先让 Claude Code 扫描整个目录，生成内容清单。** 43 篇文章的标题、字数、涉及的工具，几秒钟全部列出来。这一步不复杂，但意义在于你第一次在一个地方看到自己所有内容的全貌。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**然后是最核心的一步：LLM 编译。**

我在公众号目录下新建了一个 `wiki/` 文件夹作为 Obsidian vault。Claude Code 逐篇读完 43 篇文章，每篇生成一张摘要卡片，三五句话概括内容，标注核心观点和涉及的工具。所有工具名用 Obsidian 的 `[[双向链接]]` 语法标注，比如 `[[Claude Code]]` 、 `[[MCP]]` 。这不是装饰，后面整个知识网络能跑起来就靠这些链接。

整个编译过程我拆成了多个任务，Claude Code 按顺序一步步跑。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

生成摘要卡片这步最耗时，4 个 agent 按栏目同时跑，十来分钟全部跑完。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

43 张卡片出来之后，Claude Code 又从里面提取高频概念，每个概念生成一个独立页面。这一步同样并行处理，两个 agent 同时跑上下两批。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

比如 `[[Claude Code]]` 的概念页，自动列出了 28 篇提到它的文章，还标注了和 `[[Codex CLI]]` 、 `[[Superpowers]]` 、 `[[MCP]]` 之间的关系。你不用手动整理"哪篇文章用了什么工具"，LLM 帮你把关联全部抽出来了。

最后自动生成四张索引：全局索引、按栏目分类、按工具分类、按时间线排列。

跑完之后 wiki 里有 73 个.md 文件：43 张文章卡片、25 个概念页、5 张索引。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这些不是原文的复制粘贴，而是 LLM 理解之后重新组织的结构化产物。随便打开一张摘要卡片，长这样：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

按工具索引页里，每个工具下面挂着所有提到它的文章链接，一目了然：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为什么叫"编译"？直接让 Claude Code 读 43 篇原文也能回答问题，但那是每次开新会话都要重新解析 30 万字，每次推导出来的关系还不一定一样。wiki 是编译后的产物，摘要浓缩到 5 万字，概念关系已经物化成文件，不用每次从头来。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

打个比方，你每次运行程序是跑编译后的二进制，不是每次从源代码重新解释执行。知识管理也是一样，编译一次，后面反复查就行了。

打开 Obsidian 加载 vault，Graph View 能直接看到知识网络的全貌。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Claude Code 是最大的节点，28 条线连出去。OpenCode 第二大，9 条线。MCP 在中间位置，一边连着 Figma 和 Pencil 这些设计工具，一边连着 Obsidian。

点进任何一个概念节点，跳到概念页，再点文章链接跳到摘要卡片，一路点下去能发现之前完全没注意到的关联。比如我写过 Pencil 和 gstack 各自的文章，但从没想过把它们组合起来。在图谱上它们离得很近，这个交叉选题就浮出来了。

首页 INDEX 也能直接导航到各个索引和最近文章：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**接下来是我觉得收获最大的环节——对知识库提问。**

我问 Claude Code："写过哪些 Claude Code 能力点，还有什么重要功能没覆盖？"它扫完概念页和卡片，给了一张覆盖矩阵。Agent Teams、Subagents、Skills、git worktree 都有深度文章。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

但空白区让我没想到： **Hooks 系统、IDE 插件、CI/CD 集成、Memory 持久记忆全是零覆盖。** 写了两个月，这些重要功能我完全没碰过。

再问关联发现。OpenCode 有 9 篇，Superpowers 有 4 篇，两者零交叉。MCP 出现 6 次但从没当过文章主角。它还跑出来一张概念引用频率表和 7 个聚类拓扑图，把我所有文章涉及的工具分成了 CLI 工具层、Agent 架构层、设计协作层、方法论层这些聚类。哪些聚类之间有连线、哪些是孤岛，一眼就看出来了。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第三个问题让它推荐接下来该写什么。它给了三个选题：Claude Code Hooks 实战（零覆盖的高级功能）、MCP Server 横评（散见各文但没有专题）、OpenCode + Superpowers（两座孤岛的桥）。每个都附了关联已有文章和理由。这些靠自己翻文件夹是发现不了的。

这些问答结果不是聊天记录。Claude Code 把分析保存成了两个.md 文件，下次规划选题直接打开就能用。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**最后做一轮校验。** 让 Claude Code 扫描所有双向链接，查哪些链接没有对应文件。扫出 32 个断链—— `[[Kimi]]` 被 4 篇文章引用但没有概念页， `[[GLM-5]]` 、 `[[BMAD]]` 都一样。Claude Code 自动补建了 7 个高频概念页，断链降到 25 个。剩下的都是低频的模型版本号，不值得单独建。

这就是 Karpathy 说的"知识库自我修复"。你不用盯着每个细节，LLM 帮你查漏补缺。

而且这套东西是活的。每次写新文章，生成一张摘要卡片扔进 wiki，更新索引和概念页。知识越查越厚，链接越修越密。

简单看下每个步骤都做了些什么。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对我来说收获最大的不是图谱多好看，是那几个问题的答案。两个月写了什么、还缺什么、下一篇该写什么，跑完这套流程心里就有数了。出版社再问内容规划，也不至于现场翻文件夹。

这套方法适合任何有大量散落.md 文件的人，笔记、文档、读书摘录都行。局限是初次编译需要跑十来分钟，Obsidian 对非技术用户有门槛。

大多数人用笔记软件，东西存进去就再也不翻。工具不是问题，问题是你的知识有没有被用起来。

我是陆徐洲，一家 LIMS 公司的 AI 算法负责人。关注我，让我们一起在 AI 落地实践的路上，走得更远。

感谢您阅读我的文章。有任何关于AI提效或者工程落地实践方面的问题都可以加我微信，交个朋友，一起探讨，共同进步。

作者提示: 个人观点，仅供参考

继续滑动看下一个

硅基鹿鸣

向上滑动看下一个