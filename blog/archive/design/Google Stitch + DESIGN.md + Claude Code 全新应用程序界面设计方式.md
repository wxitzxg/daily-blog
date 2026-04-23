---
title: "Google Stitch + DESIGN.md + Claude Code 全新应用程序界面设计方式"
source: "https://mp.weixin.qq.com/s/BVTX2ZqwhggHbsTUldYu4w"
author:
  - "[[土著哥聊AI]]"
published:
created: 2026-04-12
description: "3月19日的时候，Google 为所有用户带来了全新的 Stitch，当时我也专门写过一篇文章介绍过。"
category: design
tags: [google-stitch, design-md, 设计工作流, 界面设计, mcp集成]
summary: 全新设计工作流范式：Stitch 当设计总监生成设计系统，DESIGN.md 作为设计语言标准，Claude Code 当前端工程师按规范生成代码。三大工具各司其职。
---
原创 土著哥聊AI *2026年4月6日 06:30*

3月19日的时候，Google 为所有用户带来了全新的 Stitch，当时我也专门 [写过一篇文章](https://mp.weixin.qq.com/s?__biz=Mzg2NTIxMzcyOQ==&mid=2247489262&idx=1&sn=b92bf9889a8ff45d2ab5ee5aa3ec1758&scene=21#wechat_redirect) 介绍过。

时隔没多久，我又发现了一个让这个工具真正变得"更能打"的关键角色，今天专门拿出来说说，还有全新的设计工作流范式介绍。

那咱们就先从一个大家都经历过的痛点说起。

你有没有用 AI 做过产品或者网站，功能都实现了，逻辑也没问题，但打开一看，界面丑得像头猪。

不是 AI 不够聪明，是因为你没给它足够的设计规范，它只能靠猜。每次新建一个页面，颜色飘了，字体换了，间距乱了，最后整个产品看起来像十个不同的人做的，因为从 AI 的角度来看，它确实每次都是从头开始猜的。

但当你看到下面这些用 Stitch 设计出来的优秀界面时，无不为之惊呼。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以前遇到这种问题，解决方法只有一个：自己找设计师。公司内部还好，要是找外包，一套完整的设计稿，少则 5、6千，多则几万，还要等好几周，中间还得不停的沟通打磨。等设计文件交付了，再花时间让人把设计转成代码，这一套流程走完，估计你的产品热度早就没了，钱也没少扔。

现在这套流程可以直接绕开了。

为何 Google Stitch 与众不同

还是再说一下 Google Stitch 是什么。它是 Google Labs 出品的 AI 原生 UI 设计工具，核心是用 Gemini 模型从你的文字描述、截图、草图直接生成高保真的多页面界面。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

官网地址：  
https://stitch.withgoogle.com

最关键的是它完全免费，不用安装任何东西，浏览器直接打开用。每个月有 350 次标准生成额度，另外还有 50 次实验模式额度，对大多数人来说完全够用。

Stitch 有几个能力值得单独说一下。你可以直接截图扔给它，让它把你现有的界面重新设计一遍。你也可以把网上找到的灵感图直接拖进去，告诉它往这个方向走。你甚至可以简单到只粘贴一个网址，它会把那个网站的设计风格反向解析出来，然后帮你生成类似风格的界面。

还有一个很实用的功能，语音输入。在画布上，你不用打字，直接对着它说你想要什么效果，它会自动转成 prompt 执行。在状态好的时候，这个功能可以让你保持很高的工作节奏。

Stitch 的生成逻辑和普通 AI 编程工具有一个本质区别：它先生成图片，然后再转成代码。这意味着它在视觉设计阶段不受 HTML 和 CSS 的限制，可以"想象"任何东西，然后再往回推着实现。

这就是为什么它出来的设计质感，要比你直接让 Claude Code 或者 Cursor 画界面好得多。

DESIGN.md 才是这场游戏规则的改变者

Stitch 本身只是这套设计工作流的一半儿。真正让这套流程变得完整的，是一个叫 DESIGN.md 的文件。

DESIGN.md 是什么？

**说白了，就是一个普通的 Markdown 文件** 。但它里面装的，是你整套产品的设计语言，包括颜色、字体、组件规范、设计哲学、禁止事项，全部用自然语言写清楚，放在一个地方。

如果你用过 Claude Code 做开发，你可能对 CLAUDE.md 这个文件不会陌生。它的作用是把你的编码规范、架构约束、项目约定提前写清楚，这样 AI 每次生成代码都有参照，不用你反复解释，效果比每次重新 prompt 好得多。

DESIGN.md 做的事情完全一样，只不过是把这套模式从「 **代码层** 」扩展到了「 **设计层** 」。

Google 官方对它的定义是：一份纯文本设计系统文档，AI Agent 可以读取它来生成一致的用户界面。没有 Figma 导出，没有 JSON 格式，没有需要安装的特殊工具，就是一个 Markdown 文件。

它不是 Figma 的替代品， **它是设计系统到 AI Coding Agent 之间桥梁** ，让 design-to-code 不再靠猜。

有一个 GitHub 仓库 VoltAgent 对这两个概念的总结非常到位：

◆ AGENTS.md 的读者是 Coding Agent，教它怎么构建项目；  
◆ DESIGN.md 的读者是 Design Agent，告诉它项目应该长什么样。  
一个管"怎么做"，一个管"长什么样"，分工非常清晰。

这个仓库叫 awesome-design-md。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

地址是：https://github.com/VoltAgent/awesome-design-md，目前接近 10K 星标，是目前这个领域最大的社区资源库之一。

我是如何运用这套全新工作流的

现在我来说说这整套工作流是怎么跑起来的，总共分六步，你也能学会。

**全新工作流 = Stitch + DESIGN.md + Claude Code**

我以我常用的 Claude Code 为例，其他 AI Coding Agent 也适用，比如 Codex、Antigravity、Gemini CL 等。

**第一步，准备素材** 。如果你在改造一个已有的产品，就截图现有界面，直接拖到 Stitch 的画布上。如果是从零开始，就找两三张你觉得方向对的参考图，不需要很多，你要的只是一个大致方向，不是直接 Copy。

**第二步，写一个聚焦的 prompt** 。告诉 Stitch 这个产品是干什么的，你想改哪些页面，设计走什么风格，比如暗色系、极简、编辑感之类的。字体方向如果有想法也可以说，标题用衬线体配正文无衬线体，这是一个对大多数 SaaS 产品都挺好用的组合。

**第三步，Stitch 会给你生成多个版本** 。不要只在画布上看第一个，把它帮你设计的每个版本都翻一遍，可以从一个版本里拿字体，从另一个版本里拿布局，从第三个版本里拿配色，你是在挑和组合，并非被动接受。

**第四步** ，设计完成之后，去右侧面板找「Design Systems」这个功能，点进去，你会看到 Stitch 在你设计的过程中已经自动帮你生成了一套完整的设计系统。字体规范、颜色体系、组件规则、间距标准，全都在里面。最重要的是找到 design.md，把这个文件里的全部内容复制出来。

**第五步** ，回到你的项目根目录下新建一个文件，就命名为 DESIGN.md，把你刚才复制的内容粘贴进去并保存。这个文件从现在起就是你整个产品设计语言的唯一标准。

**第六步** ，连接 Stitch MCP。通过 MCP 协议把 Stitch 和 Claude Code 连起来。操作方式是去 Google Stitch 的官方文档搜索"MCP setup"，找到对应你 Coding Agent 的 **安装命令** 。

Stitch 官方文档：  
https://stitch.withgoogle.com/docs/design-md/overview/

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

比如下面这个是针对 Claude Code 的安装命令：

```nginx
claude mcp add stitch --transport http https://stitch.googleapis.com/mcp --header "X-Goog-Api-Key: api-key" -s user
```

然后去 Stitch 的 Settings 里的 API 部分生成一个 **API Key** ，把「 **安装命令 + API Key** 」一起粘贴给 Claude Code 进行配置，安装并配置完成后建议你重启一下 CC 或者重启会话，Stitch 就会显示为已连接。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

连接之后，你可以像我这样直接告诉 Claude Code：

**按照 Google Stitch 里 dashboard 页面的桌面端框架，用 Stitch MCP 来更新界面** 。

Claude Code 会自动列出你的 Stitch 项目，找到对应的框架，获取真实的 HTML 和 CSS 源码，然后在你的实际项目里重建这个界面。它读的是真实的设计代码，不是你描述出来的文字，所以连 hover 效果和过渡动画它都会加上去，因为它理解的是真实设计意图。

这里有一个要注意的点：Stitch 有时候会设计出一些你产品里本没有的功能模块，比如"最近活动"面板或者"通知中心"，猜测可能与跟它的 System Prompt 有关。因为它在设计界面时是在猜一个完整产品该有什么。让 Claude Code 执行的时候，要明确告诉它哪些功能是实际存在的，哪些该跳过不需要，否则你还得浪费时间删掉那些不该出现的东西。

DESIGN.md 里写了什么

既然已经知道了这个 DESIGN.md 文件的重要性，那咱们就回过头来单独说一下 DESIGN.md 里面到底写了什么。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Google 官方定义了 4 个核心章节。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第一章是视觉主题与氛围，用感受来描述，告诉 AI 这个产品是什么性格或者说是什么调性，比如"温暖、编辑感、值得信赖"，这是整份文档的精神内核，先定性格再定参数。

**第二章是颜色体系** ，每个颜色要有「语义命名 + 用途说明」，不是直接列色值，而是像"Terracotta Brand #c96442，用于品牌强调色和 CTA 按钮"这样写，让 AI 知道什么时候用它。

**第三章是字体规则** ，字体家族、字重、字号、行高、字母间距，关键信息写清楚就够。

**第四章是组件样式** ，按钮、卡片、导航、输入框，每类组件的形状、颜色、交互状态用自然语言描述就行。

在官方 4 章的基础上，VoltAgent 社区仓库给扩展到了 9 个章节，增加了布局原则、阴影与层次体系、设计禁忌、响应式规则，以及专门给 AI 用的提示词指南。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其中设计禁忌这一章特别重要，因为 AI 在没有负面约束的情况下会自作聪明，在不该用品牌色的地方用品牌色，混用多种字体，在深色背景上用中性灰阴影（你根本看不见~）。把这些明确写成"不允许"，可以帮你避掉大量重复返工。

给 AI 用的提示词指南这章也很有价值，它给出的不是模糊的方向，而是包含具体数值和色值的可执行提示词，比如"在 Parchment 背景 #f5f4ed 上创建一个 hero 区域，标题用 64px Anthropic Serif 字重 500，行高 1.10，文字颜色用 Near Black #141413，副标题用 Olive Gray #5e5d59 20px，CTA 按钮用 Terracotta Brand #c96442，圆角 12px"。这就是 AI 真正能执行的指令，和"现代简洁风格"这种说法的效果不在一个量级。

**关于颜色系统，有几个值得学的细节**  
颜色命名一定要用语义名称，不要用描述性名称。"Warm Sand"比"浅灰"好，"Terracotta Brand"比"橙色"好，因为语义名称告诉 AI 什么时候用它，描述性名称只告诉 AI 它长什么样儿。阴影颜色也要纳入色彩体系，Stripe 的阴影是 rgba(50,50,93,0.25) 的蓝调，这本身就是品牌色的延伸，让 AI 知道「阴影也是有品牌的」。

**关于字体**  
除了基础的字体家族和字号规范，OpenType 的特性开关也很关键。Stripe 的 Sohne 字体在字重 300 配合 ss01 字形替换的时候才有品牌感，如果 AI 不知道这一点，它生成的字体效果就是普通的，不是 Stripe 的。

**关于阴影和深度系统**  
深色界面最常翻车的地方就在这里。深色背景上用普通的中性灰阴影完全看不见。Linear 的做法是用半透明白色边框代替阴影，Claude 的做法是用 Ring Shadow 系统，即 0px 0px 0px 1px 的阴影来模拟比实线更柔和的边框效果。把这些写进 DESIGN.md，可以帮 AI 避开大量深色界面的坑。

**关于圆角**  
它不是一个数字，是一套有性格的体系。Stripe 的按钮圆角是 4px，精确、专业、有金融感。Claude 的按钮圆角是 8 到 12px，温暖但不失专业。Linear 的最大圆角可以到 22px，Notion 的胶囊标签直接用 9999px。圆角大小和品牌调性高度相关，选错了整个界面的气质就偏了。

说到这里你可能想问： **我不想从头写 DESIGN.md，有没有现成的可以用** ？

有，而且非常全。

VoltAgent 的 awesome-design-md 仓库里已经整理了 6 大类、54 家公司的完整品牌设计规范，包括 Claude、xAI、Cursor、ElevenLabs、Supabase、Vercel、Lovable、Stripe、Notion、Apple、Uber、Airbnb 等等。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以 Claude 品牌为例，每家公司的资料包含三份文件：核心 DESIGN.md 设计说明、亮色和暗色两个版本的交互式文件。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以及 dark 和 light 两个版本的界面效果预览。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你完全不需要再把好看的设计网站一个个存进浏览器收藏夹，再截图扔给 AI 学着画。这些设计系统已经被整理成了标准文件，直接拿来，改改品牌色和字体，喂给你的 Coding Agent（Claude、Cursor 或者 Stitch），就能生成外观近似于那套设计语言的用户界面。

如果你不确定用哪个风格作为起点，这里给几个参考方向供你选择。

◆ 喜欢温暖人文、编辑感、有文学气息的，从 Claude 的 DESIGN.md 开始。  
◆ 喜欢极暗极简、工程师审美的，选 Linear。  
◆ 喜欢金融感、精密奢华、字体偏轻的，选 Stripe。  
◆ 喜欢温暖极简、留白多、消费者产品感的，选 Notion。  
◆ 喜欢开发者平台、黑色主题、绿色的，选 Vercel 或者 Supabase。

把产品真正做出来

通过上面这套工作流做完 UI 之后，Claude Code 还可以帮你把剩下的事情全搞定。

虽然下面这些不属于设计工作流中的一部分，但做任何事情不都是要以结果为导向的吗？产品上线能够让更多人看到才是你最终要达成的目标。

◆ 认证模块接 Supabase，它帮你设置好用户账户、登录流程和权限安全规则。  
◆ 支付接 Stripe，给它你的公钥和私钥，它自动找到产品 ID，帮你建好结账流程并连接用户系统，记得先用 Stripe 的测试卡 4242 4242 4242 4242 在沙盒模式里验证一遍。  
◆ 邮件通知可以接 Resend，密码重置、欢迎邮件、通知消息全部自动接好。  
◆ 最后推到 GitHub 上并部署到 Vercel，一键上线，之后在 Claude Code 里每次改动都会自动同步到线上。

你不需要懂 Stripe 的 webhook 机制，也不需要搞清楚 Supabase 的安全模式，告诉 Claude Code 你想要什么，它会主动向你索要它所需的各项凭据，就是这样。

写在最后

Stitch 也好、设计系统中的 DESIGN.md 文件也罢，任何工具都没有完美的。我认为这个也很重要，你需要提前知晓。比如：

字体有时候在 Claude Code 应用完 Stitch 的设计之后需要手动调一下。

颜色不总是精准复刻，有时候色值会有偏差。

Stitch MCP 读的是 HTML 和 CSS，所以遇到特别复杂的设计，Claude Code 的理解可能和你在 Stitch 画布上看到的不完全一致。

会话越长，token 消耗越多，成本自然也会上去，所以请保持 prompt 的专注度。

另外，Stitch 目前还不支持导出 React、Vue 或者 SwiftUI 格式，这几个在 Roadmap 上但还没发布。

实时协作和多人评论也没有，目前是单用户工具。

微交互和动画也暂时设计不了，hover 效果和过渡动画有时候是 Claude Code 读取代码之后自己推断加的，并不是 Stitch 原生设计的。

但这些不影响这套工作流的核心价值。

过去只有有钱、有团队的公司才能维护一套完整的设计系统，独立开发者或者小团队根本没有这个资源。

现在这道门槛基本消失了，一个人，可能一个下午或者一两天，就可以做出以前要花几千、几万块钱和几周时间才能得到的结果。

虽然这套流程还不完美，但它已经比之前所有的方案都好很多了，而且 Google 在持续快速更新 Stitch，缺口在一直缩小。

可以去试试这套「 **设计+开发** 」的工作流新范式，有什么新体验欢迎到评论区交流~

**既然看到这儿了，如果觉得还不错，帮忙随手点个「赞」、「在看」、「转发」三连；如果想第一时间收到推送，也可给我加个星标★，非常感谢！**

作者提示: 个人观点，仅供参考

继续滑动看下一个

土著哥聊AI

向上滑动看下一个