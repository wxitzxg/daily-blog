---
title: "开发笔记：Claude Code 开发技能别装那么多插件了，按场景选Superpowers、GSD、PUA、UI/UX Pro Max、Claude Mem、Obsidian等 Skill就够了"
source: "https://mp.weixin.qq.com/s/UhUufw6-hyenvz9fBxsJDw"
author:
  - "[[灵境星匠]]"
published:
created: 2026-04-12
description: "用Claude Code半年攒下的经验：别贪多，按场景装这 7个插件就够了。附 GitHub 仓库地址和安装命令。"
tags:
  - "clippings"
---
原创 灵境星匠 *2026年4月6日 00:20*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/EVPwb8RUoO6ETLyRVG9kUDC6sjgZbdOSm4QUSVy2R5RxJ19hiahtl5J01geR56aMak7BwCJaDF3ofAKFZxjj0ibAuLNDFuMdxoHiaO8K9mq9jA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

现在 Vibe Coding 盛行，用 AI 写代码已经成了干这行的日常。我用 Claude Code 也半年了，当初是因为一个内部比赛项目入的坑，对 AI 编程完全没经验，一头扎了进去。

那时候还是纯聊天式 AI 编程，踩了不少坑。会话 token 满了就得开新会话，之前说的全忘了；一个问题改了好多遍还是解决不了；更离谱的是，AI 代码都没写完就敢说"开发完成"骗你；做出来的前端页面也千篇一律。

后来 Claude Code 出了 Skills 功能，情况好了一些，但默认的技能远远不够用。为了让 AI 写的代码真能用，我在 GitHub 上翻了一堆社区技能，并我开发场景做了分类。

场景一：日常开发，让流程跑起来

用 Claude Code 写代码，大部分人都是想到哪写到哪。要个功能，AI 给你写一版，你看看改改，再要下一个。没有 brainstorming，没有规划，没有测试，写完 review 一下就算不错了。

这种"野路子"写法，项目小的时候无所谓，一旦项目大了就容易翻车。需求没想清楚就开写，后面返工成本很高。

**Superpowers** （GitHub ~13.5W stars，仓库地址 <sup>[1]</sup> ）就是冲着这个问题来的。它把软件开发流程给自动化了——brainstorming、planning、TDD、code review，按标准流程走。

装好之后，Claude Code 会主动引导你走完整个开发流程——不再是你问一句它答一句了。一行命令就能装：

```bash
/plugin install superpowers@claude-plugins-official
```

装完之后直接开始干活就行，它会自动接管开发流程。比如你想开发一个新功能，跟 Claude Code 说"我要做一个用户登录模块"，它会先引导你做 brainstorming 想清楚需求，再出技术方案，然后写测试、写代码，最后自动 review。整个过程你只需要回答问题和确认方案。

不仅支持 Claude Code，还可以在Cursor、Codex CLI、Gemini CLI 使用。

如果你要快速启动一个新项目，可以搭配 **GSD（Get Shit Done）** （仓库地址 <sup>[2]</sup> ）。它专门帮你从零搭建项目框架，不用在初始化配置上花时间。用法很直接： `/gsd-new-project` 创建项目，它会一步步带你讨论需求、规划阶段、执行开发。临时有个小任务要搞定，也可以用 `/gsd-quick` 直接开始。不过要注意，它的 GitHub 仓库已经从原来的 glittercowboy 迁移到了 gsd-build，星数大约 4.8W（截至发稿时）。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 场景二：AI 摆烂怎么办

这是我用 Claude Code 半年感受最深的痛点。AI 反复试同一个方法，改了十遍还在同一个地方转圈。更气人的是，代码明明没有实现，它就告诉你"开发完成"了。

你是不是也遇到过？

**PUA** （GitHub ~1.5W stars，仓库地址 <sup>[3]</sup> ）的思路很清奇——用大厂 PUA 话术来"管教" AI。你被领导 PUA 过，现在轮到你 PUA AI 了。

它有一套 L0-L4 的压力递增机制：AI 第一次失败，正常执行；连续失败两次，会被告知"隔壁组的 agent 一次就搞定了"；失败三次，开始灵魂拷问；失败四次，直接绩效警告"3.25"。到了 L4，它会被通知"其他模型都能解决这个问题，你准备毕业吧"。

光靠话术还不够，PUA 里头还塞了 13 家大厂的问题解决套路，干调试就调华为的 RCA 根因分析，干构建就上马斯克的"质疑→删除→简化→加速"，做研究就走百度的"先搜再说"。

官方基准测试数据：bug 修复快 36%，验证次数多 65%，工具调用频繁 50%。我自己用下来最明显的感受是，AI 不再轻易放弃——它会穷尽所有方法之后才说"搞不定"。

安装方式：

```nginx
claude plugin marketplace add tanweai/puaclaude plugin install pua@pua-skills
```

支持 Claude Code、Codex CLI、Cursor、Kiro 等 9 个平台。中文 PUA 版和英文 PIP 版都有，甚至还有个"中国妈妈唠叨"模式（ `/pua:mama` ），挺逗的。如果你想换个口味，试试 `/pua:yes` 鼓励模式，AI 会用积极正面的语气帮你解决问题。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 场景三：前端和设计项目

AI 写前端有个通病——做得出来，但长得都差不多。白色背景、蓝色按钮、左对齐文字，你说不出哪里不好，就是没新意。

**UI/UX Pro Max** （GitHub ~5.8W stars，仓库地址 <sup>[4]</sup> ）就是给 AI 装上"设计感"的。161 个配色板、67 种 UI 风格、57 种字体组合，从极简到赛博朋克都有覆盖。

这个技能最近更新到了 v2.0，变化挺大。新增了 Design System Generator，能一键生成完整的设计系统。还加了 161 条推理规则，AI 做设计决策的时候有章可循了。另外附了个 CLI 工具 `uipro-cli` ，终端里直接跑。

经常用 Claude Code 出前端原型的话，装上这个，做出来的东西确实不一样。不用再啰嗦"我要深色系、圆角卡片、渐变按钮"，直接报风格名称就完事。

实际用起来，先在终端运行 `uipro init --ai claude` 初始化，之后让 Claude Code 做前端相关的任务时，它会自动参考这些设计规则。比如你说"给我做一个 Dashboard 页面"，它会自动匹配合适的配色和布局风格，而不是默认的蓝白配色。

## 场景四：长期项目，别让 AI 失忆

前面说过，Claude Code 会话 token 用完就得开新会话。短期任务还好，但跑几个月的项目，每次新开会话 AI 都要从零开始，之前定的方案、踩过的坑、约好的规范，全没了。

Claude Mem（GitHub ~4.5W stars，仓库地址 <sup>[5]</sup> ）就是干这个的。MCP Server 接入，装好之后，你跟 Claude Code 讨论过的设计、踩过的坑，它都记着。下次开新会话，自动加载。跑长期项目的话，这东西跟空气一样——平时感觉不到，没了真不行。

装好之后基本是"无感"使用的——你在会话中讨论的方案、踩过的坑，它会自动记录。下次开新会话时，直接 `mem-search` 就能搜到之前的内容。它还有个 `timeline` 功能，能查看某个方案的来龙去脉，回忆当初为什么这么选。

如果项目还跟知识管理沾边，可以搭个 **Obsidian Skills** （GitHub ~1.9W stars，仓库地址 <sup>[6]</sup> ）。Obsidian CEO kepano 亲手做的，装完之后直接在 Claude Code 里读写笔记、搜内容、批量处理 Markdown。我有个做笔记系统的朋友，靠这个来回切换的功夫省了不少。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 场景五：还想找更多好工具

6个不够？ **Awesome Claude Code** （GitHub ~3.6W stars，仓库地址 <sup>[7]</sup> ）就是你的弹药库。不是插件，是个资源导航站——技能、插件、工具、提示词，按分类列得清清楚楚。不知道装什么的时候去逛逛，总能翻到好东西。

最后，分享我的安装优先级：

- **Superpowers：装就对了，开发流程规范起来没坏处**
- **PUA：被 AI 气过的装一个，治摆烂有奇效**
- **Claude Mem：跑长期项目的刚需，不用每次跟 AI 重新交代背景**
- **UI/UX Pro Max：做前端的再装，告别千篇一律的蓝白配色 ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**

## 🙏喜欢的朋友们，欢迎一键三连--关注、点赞和推荐。🙏

#### 引用链接

`[1]` 仓库地址:*https://github.com/obra/superpowers*  
`[2]` 仓库地址:*https://github.com/gsd-build/get-shit-done*  
`[3]` 仓库地址:*https://github.com/tanweai/pua*  
`[4]` 仓库地址:*https://github.com/nextlevelbuilder/ui-ux-pro-max-skill*  
`[5]` 仓库地址:*https://github.com/thedotmack/claude-mem*  
`[6]` 仓库地址:*https://github.com/kepano/obsidian-skills*  
`[7]` 仓库地址: *https://github.com/hesreallyhim/awesome-claude-code*

作者提示: 个人观点，仅供参考

继续滑动看下一个

灵境星匠AI

向上滑动看下一个