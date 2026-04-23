---
title: "awesome-design-md 实战指南：让 AI 写出媲美大厂设计的 UI"
source:
  - "https://mp.weixin.qq.com/s/PR363wcRGgYZdKRznUHdRQ"
  - "https://mp.weixin.qq.com/s/bypqZnQcjs57g1rplsngBQ"
author:
  - "[[老季聊AI]]"
  - "[[大模型AI之旅]]"
published:
created: 2026-04-16
description: "awesome-design-md 收录 60+ 顶级网站的设计系统，将 Vercel、Stripe、Apple、Linear 等公司的设计规范转化为 AI 可读的 Markdown 文件，解决 AI 生成页面设计一致性问题。"
category: design
tags:
  - design-md
  - claude-code
  - UI设计
  - 设计系统
  - google-stitch
keywords: [design-md, 设计系统, google-stitch, ai设计]
summary: 介绍 GitHub 50k+ 星的开源仓库 awesome-design-md，将全网顶级设计系统转化为 AI 可读的 DESIGN.md 格式。每个文件包含视觉主题、色彩系统、排版规则等九个章节，让 AI Agent 生成一致的高质量 UI 代码。
---

## 你打开 Claude Code，满怀期待地说"帮我做一个落地页"。

30 秒后，屏幕上出现了：蓝色渐变按钮、灰色卡片背景、16px Inter 字体、万年不变的圆角卡片布局。跟上次一模一样，跟上上次一模一样，跟全网 AI 生成的页面都一模一样。

不是 AI 不够聪明。是你没告诉它"好看"到底是什么。

你说"现代一点"，它不知道你要 Stripe 那种克制的奢华，还是 Linear 那种极客的冷峻。你说"精致一点"，它不知道你指的是阴影要带蓝色调，还是标题要细到 weight 300。

你给 AI 的"好看"，是一个薛定谔的形容词。打开之前，谁也不知道它理解成了什么。

---

## DESIGN.md：给 AI 的设计大脑

DESIGN.md 是 Google Stitch 在 2025 年 3 月推出的格式。核心想法特别简洁：Markdown 是 LLM 最擅长阅读的格式，那为什么不把设计系统也写成 Markdown？

传统的设计系统文档散落在 Figma、Storybook、CSS 变量表各处，AI Agent 要理解你的设计意图，需要从多个来源拼凑信息。DESIGN.md 把这些信息集中到一个文件里，放在项目根目录下，跟 README.md 并排。

| 文件 | 谁来读 | 定义什么 |
| --- | --- | --- |
| README.md | 开发者 | 项目是什么、怎么用 |
| AGENTS.md | AI Agent | 怎么构建项目 |
| DESIGN.md | AI Agent | 项目应该长什么样 |

一个纯文本文件，写死了颜色、字体、间距、阴影——全部从 Vercel、Stripe、Apple、Linear 这些真金白银堆出来的设计系统里提取的。丢到项目里，跟 Claude Code 说一句"读一下这个"，出来的页面就像那家公司自己的设计师做的。

---

## awesome-design-md：60+ 顶级设计系统合集

Google Stitch 团队提出这个概念后，GitHub 上立刻有人把全网知名网站的设计系统，全部提取成 DESIGN.md 格式，做了一个合集。

这个仓库叫 **awesome-design-md**，VoltAgent 团队做的。创始人之前做过 Refine（YC S23），有丰富的开源经验。仓库上线 10 天就冲到 35k star，到现在快 5 万了，增长速度惊人。

目前收录了 **60+ 个网站**，覆盖面相当广：

**AI 平台**：Claude、Cohere、ElevenLabs、Mistral AI、Ollama、Replicate、xAI

**开发者工具**：Cursor、Vercel、Expo、Raycast、Warp

**后端与数据库**：ClickHouse、MongoDB、Supabase、Sentry、PostHog

**SaaS 产品**：Linear、Notion、Cal.com、Resend、Zapier

**设计工具**：Figma、Framer、Webflow、Airtable、Miro

**金融科技**：Stripe、Coinbase、Revolut、Wise、Binance

**消费品牌**：Apple、Nike、Spotify、Uber、Airbnb、SpaceX

**汽车品牌**：Tesla、BMW、Ferrari、Lamborghini、Bugatti

每个网站的文件夹里包含三个文件：

- **DESIGN.md** — 设计系统文档，AI Agent 直接读这个
- **preview.html** — 视觉预览，展示色板、字体梯度、按钮、卡片
- **preview-dark.html** — 暗色模式预览

---

## 一份 DESIGN.md 里有什么

每份文件都按照统一的九个章节来组织：

1. **视觉主题与氛围** — 整体 mood、设计密度、设计哲学
2. **色彩系统** — 语义化颜色名 + hex 值 + 功能角色
3. **排版规则** — 字体族、完整的层级表
4. **组件样式** — 按钮、卡片、输入框、导航，包含各种交互状态
5. **布局原则** — 间距刻度、栅格、留白策略
6. **深度与层级** — 阴影系统、表面层级
7. **设计规范** — Do's and Don'ts，设计护栏
8. **响应式行为** — 断点、触摸目标、折叠策略
9. **Agent 提示指南** — 快速色彩参考、可直接使用的 prompt

这些描述不是抽象的设计理念，而是 AI Agent 能直接执行的具体规范。

---

## 深入一个场景：Stripe 风格 Dashboard

为什么拿 Stripe 举例子？因为它是金融科技设计的金标准——同时做到了"专业"和"有品味"。

同一个 prompt："帮我做一个支付 Dashboard。" 第一次，什么都不给，Claude Code 凭空发挥——标准的蓝色系后台，你能猜到长什么样。

第二次，你把 Stripe 的 DESIGN.md 丢进去。Claude Code 读了文件，提取出 **Deep Navy（#061b31）** 作为侧边栏颜色，用 **#533afd** 那个标志性的紫色做交互高亮，标题用了 weight 300 的超细字重——不是大喊大叫的那种标题，是那种低声说"我很贵"的感觉。

### Stripe 设计系统的关键参数

**颜色**：标题色不是黑色，是 Deep Navy #061b31——一个带蓝色调的深色，暖而不冷，有金融级的沉稳感。主品牌色是 #533afd，一个饱和的蓝紫色，自信、昂贵，不像是企业软件里那种寡淡的紫色。

**字体**：Stripe 的标题有一种说不出的优雅。秘密在于两个字：一是字重只有 300——几乎是最细的那档。别人家 48px 的大标题恨不得加粗到 800，Stripe 反其道行之，等于在低声说"我很贵，你自然会听"。二是每个字母的形状都被微调过（sohne-var 字体 + OpenType ss01），更几何、更利落，加上 -0.96px 的负字间距把文字压成紧密的工程块。

**阴影**：这是 Stripe 的灵魂。所有可升降的组件都使用蓝色调多层阴影。主阴影色是 rgba(50,50,93,0.25)——注意那个 RGB 值，50、50、93，这不是灰色，是蓝灰色。跟品牌色里的蓝紫调完全呼应。连阴影都是品牌化的。普通 AI 生成的卡片阴影是灰色的，平淡无奇。Stripe 的两层蓝色调阴影叠在一起，卡片像是浮在暮色天空中——带着冷调的深度，像金融区写字楼的玻璃幕墙。

当 Claude Code 读了这些参数去生成 Dashboard，你会得到：深蓝侧边栏上的白色文字，数据卡片浮在带蓝色调阴影的白色表面上，金额数字用了 "tnum" 等宽数字特性（金融数据必备），表格行高紧凑但外围间距宽松——Stripe 称之为"dense data, generous chrome"，数据密集、边距慷慨。

---

## 其他风格各有绝活

### Linear：极简暗色的天花板

背景色 #08090a，几乎是纯黑但不是纯黑。Inter 字体全局开启 "cv01" 和 "ss03" 字体特性——单层 a、更几何的字形。所有边框都是半透明白色，rgba(255,255,255,0.05) 到 0.08，像月光下画的线框。整个页面唯一的彩色是品牌靛蓝 #5e6ad2，极度克制。感觉像一群强迫症工程师造的工具，每个像素都经过审判。

### Claude：最"反科技"的科技产品页面

背景是 Parchment #f5f4ed——不是白色，是羊皮纸色，像打开一本精装书。标题用衬线体（Anthropic Serif，fallback 是 Georgia），weight 500，line-height 1.10，读起来像散文不像产品页。强调色是 Terracotta #c96442，赤陶色，跟任何一家科技公司都不一样。所有的灰色都带黄棕底调，没有一处冷色灰。在一个所有科技公司都在比谁更冷、更未来感的时候，Claude 选择了温暖。这是一种审美上的逆行，也是一种自信。

### Vercel：把极简主义当成工程原则

独创了"阴影即边框"技法——全站没有一条传统 border，全部用 `box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08)` 替代。Geist Sans 字体在 48px 标题上用 -2.4px 的字间距，文字像被压缩过的代码。黑白世界，仅用三种彩色标注工作流：Ship 红 #ff5b4f、Preview 粉 #de1d8d、Develop 蓝 #0a72ef。

### Apple：留白几乎是一种暴力美学

标题 56px、weight 600、line-height 1.07——被压缩得像广告牌。全站只有一种彩色：Apple Blue #0071e3，只用于链接和按钮。产品照片占据主要视觉空间，文字极少，按钮是药丸形（border-radius: 980px）。你打开 Apple 的页面，感觉不是在看网页，是在逛精品店。

---

## 怎么用？三步搞定

**第一步**，去 awesome-design-md 仓库逛一圈，打开任意一个 preview.html 看效果，选中你喜欢的风格。

**第二步**，把对应的 DESIGN.md 复制到你的项目根目录。就一个文件，拖进去就行。

**第三步**，告诉 Claude Code"先读一下 DESIGN.md，然后用里面的设计系统帮我做 XXX"。

### 进阶技巧

在项目的 CLAUDE.md 里加一条规则，让 AI 每次工作都自动遵守 DESIGN.md。这样不用每次都提醒，它自己就会按规范来。

这东西不只能配合 Claude Code 用。Cursor、Windsurf、Google Antigravity 都支持——只要是能读文件的 AI agent，都能用。Google Stitch 本身也原生支持导入 DESIGN.md。

### 混搭组合

不需要完全照搬某个网站的 DESIGN.md。你可以把 Vercel 的布局原则和 Stripe 的色彩系统混搭在一起，组合成你自己的设计规范。毕竟这只是一个 Markdown 文件，改起来跟改文档一样简单。

---

## 按场景选风格

不知道选哪个？按场景来：

**做 SaaS？** Linear（极简暗色、工程师审美）、Vercel（黑白精确、Geist 字体）、Framer（大胆黑蓝、动感十足）

**做金融？** Stripe（紫色渐变、精致金融感）、Revolut（暗色精致、渐变卡片）、Wise（清爽绿色、简洁可信）

**做 AI 产品？** Claude（温暖羊皮纸、反科技美学）、Cursor（深色科技感、渐变点缀）、Cohere（鲜艳渐变、数据密集）

**做开发者工具？** Vercel（黑白极简、Geist 全家桶）、Warp（终端风格、暗色 IDE 感）、Supabase（深色翡翠主题、代码优先）

**做电商？** Apple（极致留白、产品摄影驱动）、Airbnb（暖色圆角、图片优先）、Webflow（蓝色精致、营销站美学）

**做创意工具？** Figma（多彩、活泼而专业）、Clay（有机形状、柔渐变、艺术感）、Spotify（大胆绿黑、专辑封面驱动）

**做企业后台？** IBM（Carbon 设计系统、结构化蓝色）、HashiCorp（黑白企业感、沉稳）、MongoDB（绿色文档风、开发者友好）

**做区块链/加密？** Coinbase（蓝色可信、机构感）、Kraken（紫色暗色、数据密集）、Revolut（暗色精致）

**做文档站？** Mintlify（绿色点缀、阅读优先）、Notion（温暖极简、衬线标题）、Sanity（红色编辑风、内容至上）

---

## 为什么这件事值得关注

**第一，解决真实痛点。** 用 AI 写代码已经很普遍了，但 AI 生成的 UI 通常都是"能用但不好看"。为什么？因为 AI 不知道你想要什么风格。你在 prompt 里说"现代简约风格"，它每次理解的"现代简约"都不一样。DESIGN.md 把设计规范写死在文件里，AI 每次都读同一套标准，输出就稳定了。

**第二，门槛降到零。** awesome-design-md 把"写 DESIGN.md"这件事的门槛从一小时降到了零。你不需要自己从头提取一个网站的设计系统，直接从仓库里 copy 一份最接近你想要的风格的文件就行。

**第三，趋势信号。** Markdown 正在成为人机协作的通用语言。README.md 解决了"人告诉人"，AGENTS.md 解决了"人告诉 AI 怎么做"，DESIGN.md 解决了"人告诉 AI 做成什么样"。三个 .md 文件，覆盖了一个项目从构建到设计的所有沟通需求。

---

## 注意事项

仓库的 LICENSE 说得很清楚：这些 DESIGN.md 文件里提取的是公开可见的 CSS 样式值，不声称拥有任何网站的视觉身份的所有权。用它们来指导 AI 生成你自己的 UI 是没问题的，但如果你打算做一个跟 Stripe 官网像素级一致的产品页面，那还是要考虑品牌相关的法律问题。

另外，设计系统是会变的。今天 Vercel 用 Geist 字体，明天可能就换了。DESIGN.md 文件也需要跟着更新。

---

## 最后说一句

以后再有人说"AI 做的东西没设计感"，你可以把 DESIGN.md 甩给他。

不是 AI 没品味，是你没给它品味。

---

**仓库地址**：https://github.com/VoltAgent/awesome-design-md

**在线浏览**：https://getdesign.md

**相关工具**：Google Stitch、Claude Code、Cursor、GitHub Copilot

（画外音：Anthropic 官方推出的 frontend-design Skill 与 awesome-design-md 同出一脉，也很值得推荐！）
