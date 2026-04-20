---
title: "不装框架不装插件，Karpathy发现的AI编程三大顽疾，被andrej-karpathy-skills.md文件治好了，20.8k星标"
source: "https://mp.weixin.qq.com/s/bCFiJ4HPE65T-m-GKMdOhQ"
author:
  - "[[里德德]]"
published:
created: 2026-04-20
description: "AI 写代码总爱“画蛇添足”？一个 CLAUDE.md 文件丢进项目，AI 瞬间变得听话、简洁、不乱改代码。"
tags:
  - "clippings"
---
里德德 *2026年4月13日 22:11*

点击上方蓝字【聚大模型前言】关注我，热门AI资讯每天更新~~

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/ngN84AqSwiaonWqv7Owavy1QBQpibnHo94cEBR0L1QdxBKGc3wL8rBRfQaf8La23LBfOeWBtmKFUlQFhFg4xKuJtxcqtCicgWL5Sg72I2rUzog/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

说出来你可能不信，一个.md 文件能火到 **20.8K** Star。

就一个 CLAUDE.md，丢到项目目录里，然后你让 Claude Code 干活的时候，它就会自动按规矩来——不乱加依赖、不把代码写得过度复杂、不碰不该碰的代码。

这项目叫 **andrej-karpathy-skills** ，是从 Andrej Karpathy 大神发的一条关于大语言模型编程毛病的帖子衍生出来的。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ngN84AqSwiapzHcdr5E0Uiatl75aiaicll0QxcGP78dxWTENrGVHAuwEic85vVQiaU9doMtJkiaDy6J3pKCZMyugDMxiaa4BB51S9f6gXfOrfNhquck/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

**Karpathy 发现了什么问题？**

简单说，他观察到 AI 写代码时有几个 **根深蒂固的坏习惯** ：

> "模型会替你做错误的假设，然后闷头跑。它们不管理自己的困惑，不寻求澄清，不暴露矛盾，不展示权衡，该反抗的时候不反抗。"

> "它们特别喜欢把代码和 API 搞复杂，滥用抽象，不清理无用代码……明明 100 行能解决的事，非要写 1000 行。"

> "它们有时候会改/删自己没完全理解的注释和代码，哪怕跟手头的任务完全无关。"

但 forrestchang（项目作者）从 Karpathy 的帖子中提炼出了一句话特别关键的观点：

> "大语言模型特别擅长循环迭代直到达成具体目标……别告诉它要做什么，给它成功标准，然后看着它自己跑。"

这句话是整个项目的核心。

**四个原则，治 AI 的病。**

这个 CLAUDE.md 里就写了四条原则，每一条都是奔着上面那些问题去的：

### 1\. 编码前先思考

别假设。看到不确定的地方要问清楚，而不是闷头猜。如果有歧义，主动提出来说有几种解释，让人类选。不要自己悄咪咪选了一个方向就开干。

### 2\. 简单优先

只写能解决问题的最少代码。不要加没要的功能，不要给只用一次的代码写抽象，不要加没要求的"灵活性"。如果 200 行能改成 50 行，重写。

### 3\. 外科手术式修改

只碰非碰不可的地方。别顺便"优化"旁边的代码、别改注释、别重构没坏的东西。保持和现有风格一致。如果改完之后有多余的 import、变量、函数——删掉。但别动原来就有的无用代码。

### 4\. 目标驱动执行

把"去修个 bug"变成"写一个能复现 bug 的测试，然后让它通过"。把"加个校验"变成"写一个无效输入会失败的测试，然后让它通过"。

任务的描述方式从"命令式"变成"声明式"，给 AI 明确的成功标准，让它自己循环直到达成。

**实际效果啥样？**

官方说，用了这些规则之后，你会看到：

- 代码改动变少了——只有你真正要求改的东西
- 很少出现"写完又重写"的情况——代码一次就写简单了
- AI 会先问清楚再动手，而不是做完了才发现做错了
- 提交变得干净——没有顺带的重构和"改进"

当然，官方也提了个醒：这些规则偏向于谨慎而非速度。简单到一眼就能看出来的活（改个错别字之类的），就不用上纲上线地用这套流程了。

**怎么用？**

两种安装方式，看你心情：

**方式一：装成 Claude Code 插件（推荐）**

在 Claude Code 里分两步安装：

```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

先加插件市场，再安装插件。装完以后，这个规则全局生效——所有项目都用得上。

**方式二：扔到项目里（针对单个项目）**

新项目：

```
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

已有项目：

```
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

**写在最后。**

以前，我们聊"提示词工程"，更多是在聊"怎么让 AI 回答我的问题"。但这个项目代表的趋势不太一样——

它是 **在工程层面上去约束 AI 的行为** 。

一个.md 文件，不是什么复杂的框架，也不是什么高科技工具。100% 开源。但它确确实实改变了 AI 写代码的方式。你不需要再每次都叮嘱它"别乱加依赖""保持现有风格"——放一个文件，它自己就懂了。

而且最妙的是，你可以在这四条原则之上叠加自己的项目规则。比如：

```
## 项目特有规则
- 使用 TypeScript 严格模式
- 所有 API 接口必须有测试
- 遵循 src/utils/errors.ts 中现有的错误处理模式
```

项目特有的规矩和这套通用原则一合并，AI 干活更靠谱。

有点像给 AI 写了一本"员工手册"。以前是"手把手教它做每一件事"，现在是"告诉它原则，让它自己判断"。

工具不一定是软件，有时候 **好的指令本身就是最好的工具** 。

---

*你有没有被 AI 代码助手坑过？留言吐吐槽～*

继续滑动看下一个

聚大模型前言

向上滑动看下一个