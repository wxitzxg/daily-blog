---
title: "awesome-design-md × Claude Code：让 AI 写出媲美大厂设计的 UI"
source: "https://mp.weixin.qq.com/s/PR363wcRGgYZdKRznUHdRQ"
author:
  - "[[老季聊AI]]"
published:
created: 2026-04-12
description: "你打开 Claude Code，满怀期待地说\x26quot;帮我做一个落地页\x26quot;。"
tags:
  - "clippings"
---
原创 老季聊AI *2026年4月5日 17:16*

你打开 Claude Code，满怀期待地说"帮我做一个落地页"。

30 秒后，屏幕上出现了：蓝色渐变按钮、灰色卡片背景、16px Inter 字体、万年不变的圆角卡片布局。跟上次一模一样，跟上上次一模一样，跟全网 AI 生成的页面都一模一样。

不是 AI 不够聪明。是你没告诉它"好看"到底是什么。

你说"现代一点"，它不知道你要 Stripe 那种克制的奢华，还是 Linear 那种极客的冷峻。你说"精致一点"，它不知道你指的是阴影要带蓝色调，还是标题要细到 weight 300。

你给 AI 的"好看"，是一个薛定谔的形容词。打开之前，谁也不知道它理解成了什么。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/QJEHUXPnWhkn8rds0G4f7KF1PfBHxdgxJlVbLWzqhG1ga4zIdxzZHdmDfkan8krMjSwKhciaicsbyDZr06BnqVQibdY2y4OibvwM4S2M7ys50Ck/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

DESIGN.md 就是给 AI 的设计大脑。一个纯文本文件，写死了颜色、字体、间距、阴影——全部从 Vercel、Stripe、Apple、Linear 这些真金白银堆出来的设计系统里提取的。丢到项目里，跟 Claude Code 说一句"读一下这个"，出来的页面就像那家公司自己的设计师做的。

Google Stitch 团队最早提出了这个概念：一个 markdown 文件，AI agent 读了就能生成一致的高质量 UI。有个叫 awesome-design-md 的仓库，收集了 55 个从真实网站 CSS 提取的 DESIGN.md，每个都配了可视化预览。

55 个。Vercel、Stripe、Apple、Linear、Spotify、Airbnb、Figma、Coinbase……全在里面。

## 一个文件，天壤之别

想象一下这个场景。

同一个 prompt："帮我做一个支付 Dashboard。" 第一次，什么都不给，Claude Code 凭空发挥——标准的蓝色系后台，你能猜到长什么样。

第二次，你把 Stripe 的 DESIGN.md 丢进去。Claude Code 读了文件，提取出 Deep Navy（#061b31）作为侧边栏颜色，用#533afd那个标志性的紫色做交互高亮，标题用了 weight 300 的超细字重——不是大喊大叫的那种标题，是那种低声说"我很贵"的感觉。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最绝的是阴影。普通 AI 生成的卡片阴影是灰色的，平淡无奇。Stripe 的 DESIGN.md 里写的是两层蓝色调阴影：rgba(50,50,93,0.25) 搭配 rgba(0,0,0,0.1)。叠在一起，卡片像是浮在暮色天空中——带着冷调的深度，像金融区写字楼的玻璃幕墙。

这就是 DESIGN.md 的魔力。它不是给你一份设计规范，它是把一家公司的审美基因注射进了 AI 的脑子里。

（画外音：Anthropic官方推出的frontend-design Skill 与 awesome-design-md 同出一脉，也很值得推荐！）

## 深入一个场景：Stripe 风格 Dashboard

为什么拿 Stripe 举例子？因为它是金融科技设计的金标准——同时做到了"专业"和"有品味"。

Stripe 的 DESIGN.md 里有几个极其精确的参数，每一个都是反复打磨的结果：

颜色：标题色不是黑色，是 Deep Navy#061b31——一个带蓝色调的深色，暖而不冷，有金融级的沉稳感。主品牌色是#533afd，一个饱和的蓝紫色，自信、昂贵，不像是企业软件里那种寡淡的紫色。

字体：Stripe 的标题有一种说不出的优雅。秘密在于两个字：一是字重只有 300——几乎是最细的那档。别人家 48px 的大标题恨不得加粗到 800，Stripe 反其道行之，等于在低声说"我很贵，你自然会听"。二是每个字母的形状都被微调过（sohne-var 字体 + OpenType ss01），更几何、更利落，加上 -0.96px 的负字间距把文字压成紧密的工程块。整套排版像是从瑞士印刷厂出来的，不是从代码编辑器里出来的。

阴影：这是 Stripe 的灵魂。所有可升降的组件都使用蓝色调多层阴影。主阴影色是 rgba(50,50,93,0.25)——注意那个 RGB 值，50、50、93，这不是灰色，是蓝灰色。跟品牌色里的蓝紫调完全呼应。连阴影都是品牌化的。

当 Claude Code 读了这些参数去生成 Dashboard，你会得到：深蓝侧边栏上的白色文字，数据卡片浮在带蓝色调阴影的白色表面上，金额数字用了 "tnum" 等宽数字特性（金融数据必备），表格行高紧凑但外围间距宽松——Stripe 称之为"dense data, generous chrome"，数据密集、边距慷慨。

然后你可以迭代。"按钮阴影再蓝一点"——Claude Code 会把阴影参数往 rgba(50,50,93,0.25) 方向调。"标题再细一点"——从 weight 400 调到 300，瞬间从普通变成 Stripe。

这就是 DESIGN.md 的核心价值：你不用解释"好看"是什么，你只需要引用文件里的具体值。

## 还有这些风格，各有绝活

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Linear：极简暗色的天花板。背景色#08090a，几乎是纯黑但不是纯黑。Inter 字体全局开启 "cv01" 和 "ss03" 字体特性——单层 a、更几何的字形。所有边框都是半透明白色，rgba(255,255,255,0.05) 到 0.08，像月光下画的线框。整个页面唯一的彩色是品牌靛蓝#5e6ad2，极度克制。感觉像一群强迫症工程师造的工具，每个像素都经过审判。这是设计界的少即是多——不是没东西可放，是放进去的每一个都经得起放大镜。

Claude：最"反科技"的科技产品页面。背景是 Parchment#f5f4ed——不是白色，是羊皮纸色，像打开一本精装书。标题用衬线体（Anthropic Serif，fallback 是 Georgia），weight 500，line-height 1.10，读起来像散文不像产品页。强调色是 Terracotta#c96442，赤陶色，跟任何一家科技公司都不一样。所有的灰色都带黄棕底调，没有一处冷色灰。在一个所有科技公司都在比谁更冷、更未来感的时候，Claude 选择了温暖。这是一种审美上的逆行，也是一种自信。

Vercel：把极简主义当成工程原则。独创了"阴影即边框"技法——全站没有一条传统 border，全部用 box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.08) 替代。Geist Sans 字体在 48px 标题上用 -2.4px 的字间距，文字像被压缩过的代码。黑白世界，仅用三种彩色标注工作流：Ship 红#ff5b4f、Preview 粉#de1d8d、Develop 蓝#0a72ef。

Apple：留白几乎是一种暴力美学。标题 56px、weight 600、line-height 1.07——被压缩得像广告牌。全站只有一种彩色：Apple Blue#0071e3，只用于链接和按钮。产品照片占据主要视觉空间，文字极少，按钮是药丸形（border-radius: 980px）。你打开 Apple 的页面，感觉不是在看网页，是在逛精品店。

## 怎么用？三步搞定

第一步，去 awesome-design-md 仓库逛一圈，打开任意一个 preview.html 看效果，选中你喜欢的风格。

第二步，把对应的 DESIGN.md 复制到你的项目根目录。就一个文件，拖进去就行。

第三步，告诉 Claude Code"先读一下 DESIGN.md，然后用里面的设计系统帮我做 XXX"。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有一个进阶技巧：在项目的 CLAUDE.md 里加一条规则，让 AI 每次工作都自动遵守 DESIGN.md。这样不用每次都提醒，它自己就会按规范来。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这东西不只能配合 Claude Code 用。Cursor、Windsurf、Google Antigravity都支持——只要是能读文件的 AI agent，都能用。

## 按你的需求选风格

不知道选哪个？按场景来：

做 SaaS？Linear（极简暗色、工程师审美）、Vercel（黑白精确、Geist 字体）、Framer（大胆黑蓝、动感十足）

做金融？Stripe（紫色渐变、精致金融感）、Revolut（暗色精致、渐变卡片）、Wise（清爽绿色、简洁可信）

做 AI 产品？Claude（温暖羊皮纸、反科技美学）、Cursor（深色科技感、渐变点缀）、Cohere（鲜艳渐变、数据密集）

做开发者工具？Vercel（黑白极简、Geist 全家桶）、Warp（终端风格、暗色 IDE 感）、Supabase（深色翡翠主题、代码优先）

做电商？Apple（极致留白、产品摄影驱动）、Airbnb（暖色圆角、图片优先）、Webflow（蓝色精致、营销站美学）

做创意工具？Figma（多彩、活泼而专业）、Clay（有机形状、柔渐变、艺术感）、Spotify（大胆绿黑、专辑封面驱动）

做企业后台？IBM（Carbon 设计系统、结构化蓝色）、HashiCorp（黑白企业感、沉稳）、MongoDB（绿色文档风、开发者友好）

做区块链/加密？Coinbase（蓝色可信、机构感）、Kraken（紫色暗色、数据密集）、Revolut（暗色精致）

做文档站？Mintlify（绿色点缀、阅读优先）、Notion（温暖极简、衬线标题）、Sanity（红色编辑风、内容至上）

## 最后说一句

以后再有人说"AI 做的东西没设计感"，你可以把 DESIGN.md 甩给他。

不是 AI 没品味，是你没给它品味。

仓库地址：github.com/VoltAgent/awesome-design-md

---

觉得有用，转发给那个总是抱怨 AI 生成的页面丑的朋友。他会感谢你的。

**微信扫一扫赞赏作者**

继续滑动看下一个

老季聊AI

向上滑动看下一个