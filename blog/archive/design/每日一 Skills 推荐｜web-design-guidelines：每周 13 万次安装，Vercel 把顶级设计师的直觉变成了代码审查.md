---
title: "每日一 Skills 推荐｜web-design-guidelines：每周 13 万次安装，Vercel 把顶级设计师的直觉变成了代码审查"
source: "https://mp.weixin.qq.com/s/8bkJLqKKxtPhaC0JgRaJHA"
author:
  - "[[大模型AI之旅]]"
published:
created: 2026-04-12
description: "每日一 Skills 推荐｜web-design-guidelines：每周 13 万次安装，Vercel 把顶级设计师的直觉变成了代码审查"
category: design
tags: [web-design, vercel, 前端审查, 交互细节]
keywords: [web-design, vercel, 前端审查, 交互细节]
summary: 介绍Vercel出品的web-design-guidelines skill，每周13万次安装，是Skills生态安装量最大的skill。将Arc浏览器和Vercel Dashboard设计者Rauno Freiberg的100多条交互经验转化为可执行规则，用于审查前端代码细节问题。
---
原创 大模型AI之旅 *2026年4月6日 09:01*

## 每日一 Skills 推荐｜web-design-guidelines：每周 13 万次安装，Vercel 把顶级设计师的直觉变成了代码审查

你写的前端代码能跑，能用，看着也行。

但总觉得哪里差一点。下拉菜单慢了半拍，动画幅度不太对，移动端点击有个奇怪的高亮闪一下，表单按回车没反应。这些问题不影响功能，用户也说不清楚哪不对，但他们能感觉到。

这类问题有个共同特点：知道的人觉得理所当然，不知道的人根本意识不到。

dropdown 应该在 mousedown 而不是 click 时打开。交互动画不应该超过 200ms。按钮缩放应该用 0.96 而不是 0.8。iOS 上要禁用默认的 tap highlight。这些细节散落在各种设计文档、博客、个人经验里，从来没有人系统地整理过。

直到 Rauno Freiberg 做了这件事。

## Rauno 是谁

先说背景。

Rauno Freiberg，爱沙尼亚人，现在是 Vercel 的 Staff Design Engineer。之前在 The Browser Company 做 Arc 浏览器的交互设计。

如果你用过 Arc，应该记得它的交互有多丝滑。那种“每个细节都被打磨过”的感觉，背后就是 Rauno 这样的人在扣。

2023 年，他把自己多年积累的 Web 界面设计经验写成了一份文档，发在 interfaces.rauno.me。GitHub 上拿了 22000 Star。

100 多条规则，覆盖 17 个类别。从无障碍到动画，从排版到性能，从输入框到菜单交互。每一条都是他在实际项目里踩过的坑或者验证过的最佳实践。

2025 年末，Vercel 把这份文档打包成了一个 Claude Code skill。

现在它是整个 Skills 生态里安装量最大的 skill。每周 13 万次。

## 它做什么

一句话：拿你的前端代码，逐行对照 100 多条设计规则，把不达标的地方列出来。

用法很直接：

```
1234567891011121314151617181920212223242526> 帮我审查一下 src/components/ 下的 UI 代码
 
  正在获取最新 Web Interface Guidelines...
  扫描文件: 23 个组件
 
  src/components/Dropdown.tsx:47
  ⚠ dropdown 应在 mousedown 而非 click 时打开，减少感知延迟
 
  src/components/Modal.tsx:12
  ⚠ 弹窗入场动画 scale 从 0 到 1，幅度过大
  建议: dialog 类组件 scale 范围 0.8 → 1
 
  src/components/Button.tsx:31
  ⚠ icon-only button 缺少 aria-label
 
  src/components/SearchInput.tsx:8
  ⚠ input 未包裹在 <form> 中，按 Enter 无法提交
 
  src/components/ThemeToggle.tsx:22
  ⚠ 切换主题时触发了全局 transition，应排除主题切换
 
  src/components/VideoGrid.tsx:5
  ⚠ 多个视频同时自动播放，iOS 上会卡顿
  建议: 离屏视频 pause/unmount
 
  审查完成: 23 个文件，6 个问题，0 个严重
```

输出格式是 `file:line` ，简洁到近乎粗暴。不解释为什么，不用客气的语气。标位置，给方向，你自己判断改不改。

## 100 条规则里最值得知道的

完整规则有 100 多条，我挑几个大多数开发者不知道但影响很大的：

**交互感知速度**

dropdown 菜单应该在 `mousedown` 时打开，不是 `click` 。 `click` 事件要等鼠标松开才触发，多了几十毫秒。用户感觉不出来具体差多少，但能感觉到“这个菜单很快”还是“慢了半拍”。

**动画幅度要跟触发元素成比例**

弹窗的入场缩放应该从 0.8 到 1，不是从 0 到 1。按钮按下的缩放应该是 0.96，不是 0.8。幅度太大会觉得夸张，太小又看不出来。这个比例是试出来的，不是算出来的。

**交互动画不超过 200ms**

超过 200ms 人就会开始觉得“在等”。不是功能有问题，是心理感受变了。

**iOS tap highlight**

iOS Safari 默认会在点击时加一个灰色半透明高亮。大部分人不知道这回事，但一旦你注意到就会觉得很廉价。用 `-webkit-tap-highlight-color: rgba(0,0,0,0)` 禁掉，但别忘了加自己的点击反馈。

**主题切换不该触发 transition**

很多网站切暗色模式的时候，所有元素都会做一遍颜色过渡动画。看着花哨，其实是 bug。正确做法是切主题时临时禁用所有 transition。

**focus ring 用 box-shadow 而不是 outline**

outline 不跟随 border-radius。圆角按钮加 outline 的 focus ring 是方的，看着很不协调。用 box-shadow 就没这个问题。

**hover 状态要加 @media (hover: hover)**

触屏设备没有 hover。如果不加媒体查询，用户点一下按钮，hover 样式会一直卡在那里不消失。

这些规则单独看每一条都不复杂。但谁能在写代码的时候同时记住 100 条？  
  

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Pasted image 20260403223325

## 为什么动态获取规则

技术上有个有意思的设计。

大部分 skill 的规则是写死在 SKILL.md 文件里的。web-design-guidelines 不一样，它每次运行时会先用 WebFetch 从 GitHub 拉取最新的规则文件：

```
1https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

这意味着 Rauno 或者社区更新了规则，你下次审查就能用上，不需要升级 skill 版本。

这个设计有个前提：你得能访问 GitHub 的 raw 域名。如果网络受限，skill 可能拉不到规则。但对大部分开发者来说这不是问题。

## 和其他 UI 类 skill 比起来

Skills 生态里做前端设计的 skill 不少。区别在哪：

|  | web-design-guidelines | frontend-design | UI/UX Pro Max |
| --- | --- | --- | --- |
| 做什么 | 审查现有代码 | 生成新代码 | 设计系统+审计 |
| 规则来源 | Rauno 的 100+ 条实战经验 | Anthropic 内置指令 | 社区整理的设计规范 |
| 更新方式 | 运行时动态拉取 | 跟随 skill 版本 | 跟随 skill 版本 |
| 输出格式 | file:line 精准定位 | 生成完整组件代码 | 设计 token + 规范文档 |
| 背后团队 | Vercel | Anthropic | 社区 |

简单说：frontend-design 帮你从零开始写出好看的前端，web-design-guidelines 帮你检查已经写好的前端有什么细节问题。

两个配合着用效果最好。先用 frontend-design 生成代码，再用 web-design-guidelines 做一遍审查。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Pasted image 20260403223402

## 为什么它能成为安装量第一

每周 13 万次安装，遥遥领先。我觉得原因有几个。

Vercel 的品牌背书很大。Next.js、Turborepo、v0，Vercel 在前端领域的影响力不需要多说。一个 Vercel 出品的设计审查工具，前端开发者天然信任。

规则本身的质量过硬。这不是某个博主随手整理的“前端最佳实践 50 条”，是 Arc 浏览器和 Vercel Dashboard 的设计者从实际项目里提炼出来的。每一条背后都有真实场景。

安装范围广。这个 skill 不只支持 Claude Code，还支持 Cursor、Codex CLI、Gemini CLI、Windsurf、Copilot 等 8 个 AI 工具。一条安装命令自动检测你装了哪些工具，全部配好。这意味着它的用户池比大部分 skill 大得多。

还有一个容易忽视的原因：前端开发者是 AI 编程工具的最大用户群体。写前端的人最多，写完想让人帮忙审查一下的需求也最大。

## 适合谁

**适合：写前端代码的人**

不管你用 React、Vue 还是原生 HTML/CSS，这些规则都适用。它检查的是 Web 标准层面的东西，不绑定框架。

**适合：独立开发者和小团队**

大公司有设计团队帮你审 UI 细节。独立开发者没有。这个 skill 相当于给你配了一个懂交互细节的设计 reviewer。

**适合：想提升前端“质感”的人**

如果你觉得自己写的前端“能用但不够精致”，大概率就是缺了这类细节。跑一遍 web-design-guidelines，把它指出的问题修完，质感会有明显提升。

**不太适合：后端开发者**

如果你平时不写前端，这个 skill 用不上。

**不太适合：追求极致定制的设计团队**

如果你们有自己的设计规范，这些规则可能和你们的标准冲突。它给的是通用最佳实践，不是定制化方案。

## 判断

web-design-guidelines 火的原因，归根结底是它把一种很难传递的知识变成了可执行的规则。

什么叫“好的交互感觉”？什么叫“UI 有质感”？这些东西以前只能通过跟好的设计师一起工作慢慢学。你看 Rauno 写的代码，看他调的动画参数，看他处理焦点状态的方式，潜移默化地学到这些细节。

现在这些细节被写成了 100 多条规则，AI 可以拿着这些规则去审查你的代码。不用跟 Rauno 共事，也能得到他审过一遍的效果。

当然不完全一样。规则能查出的是“你这里不对”，查不出的是“这里可以更好”。但对大部分开发者来说，先把“不对”的地方修完，已经比现在好很多了。

每周 13 万次安装，说明前端开发者确实需要有人帮忙盯这些细节。web-design-guidelines 干的就是这个活。

安装方式：

```
1npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
```

或者 Vercel 提供的一键安装：

```
1curl -fsSL https://vercel.com/design/guidelines/install | bash
```

原始规则文档：https://interfaces.rauno.me

---

**每日一 Skills 推荐** ，明天继续。

你写前端的时候，最容易忽略哪类细节？是无障碍？动画？还是那些“说不清哪不对但就是差点意思”的交互问题？

## 后台回复skill，也可以获取全套skill～

*我创建了一个skill分享交流群，有兴趣的可以加入*

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

🌟 关注我们

持续输出各行业AI落地实战教程  

⭐ 点赞 · 在看 · 转发

作者提示: 个人观点，仅供参考

继续滑动看下一个

大模型AI之旅

向上滑动看下一个