---
title: "每日一 Skills 推荐｜awesome-design-md：GitHub 50k 星，把全网顶级设计系统变成 AI 能读懂的 Markdown"
source: "https://mp.weixin.qq.com/s/bypqZnQcjs57g1rplsngBQ"
author:
  - "[[大模型AI之旅]]"
published:
created: 2026-04-16
description: "awesome-design-md：GitHub 50k 星，把全网顶级设计系统变成 AI 能读懂的 Markdown"
tags:
  - "clippings"
---
大模型AI之旅 *2026年4月15日 07:30*

## 每日一 Skills 推荐｜awesome-design-md：GitHub 50k 星，把全网顶级设计系统变成 AI 能读懂的 Markdown

---

先说一句，严格来说 awesome-design-md 不是一个 Claude Skill，它是一个 GitHub 上的开源资源仓库。但它跟 Skill 生态关系太紧密了，DESIGN.md 本质上就是一份给 AI Agent 读的设计规范文件，跟 Skill 的 。md 文件是同一个思路。所以这期破个例，聊聊这个东西。

前两天 Google Stitch 更新了一波大的，带火了一个新概念叫 DESIGN.md。

简单说就是，以前你的项目里有 README.md 告诉开发者怎么用，有 AGENTS.md 告诉 AI Agent 怎么构建项目，现在又多了一个 DESIGN.md，告诉 AI Agent 你的项目应该长什么样。

不是 Figma 文件，不是 JSON schema，就是一个纯 Markdown 文件。写清楚颜色、字体、组件样式、间距规范，AI 读完就能生成跟你的设计系统一致的 UI。

这个思路一出来，GitHub 上立刻就有人干了一件特别自然的事：把全网知名网站的设计系统，全部提取成 DESIGN.md 格式，做了一个合集。

这个仓库叫 awesome-design-md，VoltAgent 团队做的，目前 49.9k star，6.2k fork。

3 月 31 日上线，10 天就冲到 35k star，比 GitHub 历史上几乎所有 awesome list 的同期增速都快。到现在不到一个月，快 5 万了。

---

## DESIGN.md 到底是什么

先说清楚这个概念。

DESIGN.md 是 Google Stitch 在 2025 年 3 月的一次大更新中正式推出的格式。Google Stitch 本身是一个 AI 驱动的设计平台，前身是被 Google 收购的创业公司 Galileo AI，在 Google I/O 2025 上首次亮相，后来重新构建成了一个所谓的「AI 原生软件设计画布」。

DESIGN.md 的核心想法特别简洁：Markdown 是 LLM 最擅长阅读的格式，那为什么不把设计系统也写成 Markdown？

传统的设计系统文档散落在 Figma、Storybook、CSS 变量表各处，AI Agent 要理解你的设计意图，需要从多个来源拼凑信息。DESIGN.md 把这些信息集中到一个文件里，放在项目根目录下，跟 README.md 并排。

| 文件 | 谁来读 | 定义什么 |
| --- | --- | --- |
| README.md | 开发者 | 项目是什么、怎么用 |
| AGENTS.md | AI Agent | 怎么构建项目 |
| DESIGN.md | AI Agent | 项目应该长什么样 |

你把这个文件丢进项目里，对 Claude Code 说一句「按 DESIGN.md 的规范帮我搭一个页面」，它就能生成颜色、字体、间距、组件样式全部一致的 UI 代码。Cursor、GitHub Copilot Workspace、Gemini CLI 也都一样适用。

![配图1：三个 .md 文件覆盖项目全流程](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

配图1：三个.md 文件覆盖项目全流程

---

## awesome-design-md 做了什么

VoltAgent 的这个仓库做的事情特别直接：把全网知名网站的公开 CSS 样式提取出来，按照 Stitch DESIGN.md 的格式规范，整理成标准化的 Markdown 文件。

说一下 VoltAgent 这个团队。创始人 Omer Aplak 和 Necati Ozmen 之前做过 Refine（YC S23 孵化的开源项目），有 15 个以上开源项目经验。VoltAgent 本身是一个 TypeScript 生态的 AI Agent 开发框架，awesome-design-md 是他们的社区项目。

目前收录了 60+ 个网站，覆盖面相当广：

**AI 平台** ：Claude、Cohere、ElevenLabs、Mistral AI、Ollama、Replicate、xAI

**开发者工具** ：Cursor、Vercel、Expo、Raycast、Warp

**后端与数据库** ：ClickHouse、MongoDB、Supabase、Sentry、PostHog

**SaaS 产品** ：Linear、Notion、Cal.com、Resend、Zapier

**设计工具** ：Figma、Framer、Webflow、Airtable、Miro

**金融科技** ：Stripe、Coinbase、Revolut、Wise、Binance

**消费品牌** ：Apple、Nike、Spotify、Uber、Airbnb、SpaceX

**汽车品牌** ：Tesla、BMW、Ferrari、Lamborghini、Bugatti

每个网站的文件夹里包含三个文件：

- DESIGN.md — 设计系统文档，AI Agent 直接读这个
- preview.html — 视觉预览，展示色板、字体梯度、按钮、卡片
- preview-dark.html — 暗色模式预览

---

## 一份 DESIGN.md 里有什么

每份文件都按照统一的九个章节来组织：

1. 视觉主题与氛围 — 整体 mood、设计密度、设计哲学
2. 色彩系统 — 语义化颜色名 + hex 值 + 功能角色
3. 排版规则 — 字体族、完整的层级表
4. 组件样式 — 按钮、卡片、输入框、导航，包含各种交互状态
5. 布局原则 — 间距刻度、栅格、留白策略
6. 深度与层级 — 阴影系统、表面层级
7. 设计规范 — Do’s and Don’ts，设计护栏
8. 响应式行为 — 断点、触摸目标、折叠策略
9. Agent 提示指南 — 快速色彩参考、可直接使用的 prompt

举个例子，Vercel 的 DESIGN.md 里会这样描述：黑白为主的精确视觉，使用 Geist 字体，组件追求极致克制。而 Stripe 的则是标志性的紫色渐变，font-weight: 300 的优雅排版。这些描述不是抽象的设计理念，而是 AI Agent 能直接执行的具体规范。

![配图2：DESIGN.md 的九个章节](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

配图2：DESIGN.md 的九个章节

---

## 为什么这件事值得关注

三个原因。

第一，DESIGN.md 解决了一个真实的痛点。用 AI 写代码已经很普遍了，但 AI 生成的 UI 通常都是「能用但不好看」。为什么？因为 AI 不知道你想要什么风格。你在 prompt 里说「现代简约风格」，它每次理解的「现代简约」都不一样。DESIGN.md 把设计规范写死在文件里，AI 每次都读同一套标准，输出就稳定了。

第二，awesome-design-md 把「写 DESIGN.md」这件事的门槛从一小时降到了零。你不需要自己从头提取一个网站的设计系统，直接从仓库里 copy 一份最接近你想要的风格的文件就行。想要 Linear 那种极简紫色风格？copy。想要 Stripe 那种优雅渐变？copy。想要 Tesla 那种激进留白？也是 copy。

第三，这代表了一个趋势：Markdown 正在成为人机协作的通用语言。README.md 解决了「人告诉人」，AGENTS.md 解决了「人告诉 AI 怎么做」，DESIGN.md 解决了「人告诉 AI 做成什么样」。三个 。md 文件，覆盖了一个项目从构建到设计的所有沟通需求。

OSS Insight 专门写了篇分析文章，认为 DESIGN.md 有望成为像 README.md 一样的项目标配。社区的预测更大胆一些：Figma、Framer 等设计工具未来可能会直接加一个「导出为 DESIGN.md」的功能。如果这件事真的发生，设计师和开发者之间的协作方式会被彻底改变，中间不再需要 Design Token JSON、Storybook 文档这些桥梁，一个 Markdown 文件就够了。

当然也有冷静的声音。Substack 上有一篇评论说得好：DESIGN.md 提供的是上下文，不是魔法。它不会让 AI 突然变成顶级设计师，但它确实能让 AI 的输出从「随机」变成「可控」。这个定位很准。

---

## 怎么用

用法几乎不需要教：

1. 去仓库里找一个你喜欢的网站风格
2. 把它的 DESIGN.md 复制到你的项目根目录
3. 对你的 AI 编程助手说「按照 DESIGN.md 的规范生成页面」

就这么简单。

如果你用 Claude Code，它会自动读取项目根目录下的 DESIGN.md。如果你用 Cursor 或 Copilot，在对话里提一下这个文件就行。Google Stitch 本身也原生支持导入 DESIGN.md。

一个实用的建议：不需要完全照搬某个网站的 DESIGN.md。你可以把 Vercel 的布局原则和 Stripe 的色彩系统混搭在一起，组合成你自己的设计规范。毕竟这只是一个 Markdown 文件，改起来跟改文档一样简单。

![配图3：DESIGN.md 工作流](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

配图3：DESIGN.md 工作流

---

## 一些注意事项

仓库的 LICENSE 说得很清楚：这些 DESIGN.md 文件里提取的是公开可见的 CSS 样式值，不声称拥有任何网站的视觉身份的所有权。用它们来指导 AI 生成你自己的 UI 是没问题的，但如果你打算做一个跟 Stripe 官网像素级一致的产品页面，那还是要考虑品牌相关的法律问题。

另外，设计系统是会变的。今天 Vercel 用 Geist 字体，明天可能就换了。DESIGN.md 文件也需要跟着更新。仓库目前有 262 个 open issue，说明社区在积极反馈和维护。

---

49.9k star，快 5 万了。从 3 月 Google Stitch 推出 DESIGN.md 概念到现在不到一个月，这个增长速度说明了一件事：开发者和设计师确实在等这样一个东西。

不是又一个设计工具，不是又一个 Figma 插件，就是一个简单的 Markdown 文件。但它填上了 AI 编程工作流里一块重要的空白：让 AI 不只会写代码，还知道代码应该长什么样。

---

**仓库地址** ：https://github.com/VoltAgent/awesome-design-md

**在线浏览** ：https://getdesign.md

**Star 数** ：49.9k（3 月 31 日上线，增长速度极快）

**收录网站** ：60+（持续增长中）

**相关工具** ：Google Stitch、Claude Code、Cursor、GitHub Copilot

---

以上，既然看到这里了，

如果觉得不错，随手点个赞、在看、转发三连吧，

如果想第一时间收到推送，也可以给我个星标⭐～

谢谢你看我的文章

后台回复skill，也可以获取全套skill～

我创建了一个skill分享交流群，有兴趣的可以加入

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

作者提示: 个人观点，仅供参考

继续滑动看下一个

大模型AI之旅

向上滑动看下一个