---
title: "Figma MCP + Claude Code 踩坑实践与实战经验"
source: "https://mp.weixin.qq.com/s/TGvI7hV9XqPtsFUxu-1RHg"
author:
  - "[[Dylan]]"
published:
created: 2026-04-12
description: "Figma MCP 本质上是一个设计与代码之间的上下文桥梁，它的上限取决于你的设计稿质量、Prompt 的精准程度，以及团队工作流的标准化程度"
category: design
tags: [figma-mcp, 设计转代码, 实战经验, 踩坑指南, design-token]
summary: Figma MCP 实战经验分享：Figma 套餐选择、Claude Code 能读取和不能读取的内容、构建规范文件的规则、Prompt 编写技巧、Design Token 提取流程。
---
原创 Dylan *2026年4月5日 14:44*

之前的一篇文章 [Claude Code 和 Codex 接入 Figma MCP 保姆级教程](https://mp.weixin.qq.com/s?__biz=MzIyMTUyMTU5Mg==&mid=2247484387&idx=1&sn=0debc666c853ae1def77e7c3beceb2bb&scene=21#wechat_redirect) 没想到这么多人阅读和转发，看得出来 Figma MCP + Claude Code/Codex 这套工作流，对很多人来说，是有实实在在的需求的。

留言区也有很多问题，限于篇幅，没法详细回答，这篇文章我想结合自己半年多的高强度使用经验，以及社区中其他开发者的踩坑经验，尝试给出一些具体的实战经验，限于本人能力有限，不足之处还请多多包涵。

在前端开发中，从设计到代码中间经历了设计师和工程师两个角色，在 AI 时代之前，大家需要频繁沟通，设计师希望代码尽可能与设计稿一致，工程师不希望把时间都花在各种 UI 细节的反复校对上。间距差了 4px，蓝色用错了色号，按钮内边距是 12px 而不是 16px...

Figma MCP 就是试图缩小设计师和工程师之间的鸿沟，把大量的 UI 细节交给 AI 来实现，毕竟 AI 不会喊苦喊累，只要 Fiagm 设计稿够规范，Claude Code Prompt 够精准，UI 细节就不会出现很大偏差。

## Figma

### 1\. Figma 套餐的常见坑

Figma 有不同的套餐和权限，同时还分远程 MCP 和 桌面 MCP，详细规则可以参考 Figma 官方文档，这里解释一些常见的问题。

远程 MCP vs 桌面 MCP：

- 远程 MCP：不需要装 Figma 桌面应用，在浏览器里就能用，更方便
- 桌面 MCP：需要装 Figma 桌面应用，适合企业内网环境

使用限制怎么理解：

- 免费版每月 6 次：相当于只能试用 6 个组件，用完就得等下个月
- Professional 按分钟限制：正常使用够了，除非你一分钟内疯狂生成几十个组件
- Enterprise 每天 600 次：大团队高强度使用也够了

席位类型的坑：

即使你买了付费计划，如果给团队成员分配的是 **Viewer（查看者）** 或 **Collab（协作者）** 席位，他们每月也只能用 6 次 MCP！

**必须给 Full（完整）或 Dev（开发者）席位才能正常使用 MCP。**

**实用建议：**

- 设计师给 **Full 席位** （$$16-90/月，能编辑设计 + 用 MCP）
- 开发者给 **Dev 席位** （同价，不能编辑设计但能用 Dev Mode 和 MCP）
- 产品经理、客户给 **Viewer 席位** （免费，只能看和评论）

### 2\. Claude Code 能从 Figma 文件中读取什么？

| 数据类型 | 提取内容 | 为什么重要 |
| --- | --- | --- |
| 图层名称和层级 | 完整的节点树和语义化命名 | 直接映射到组件结构和 DOM 层级 |
| 颜色 | 填充、描边、透明度值 | 生成准确的 CSS 颜色值和 Design Token |
| 排版 | 字体、大小、粗细、行高、字间距 | 创建一致的文本样式 |
| Auto Layout 设置 | 方向、间距、内边距、对齐、约束 | 直接转换为 CSS Flexbox/Grid 属性 |
| 组件变体 | 变体名称、属性、布尔状态 | 生成组件 props 和条件渲染逻辑 |
| Design Token/变量 | 语义化颜色名、间距比例、圆角值 | 生成符合设计系统的 CSS 变量或 Tailwind 配置 |
| 文本内容 | 设计中的所有文本字符串 | 填充组件中的实际内容 |
| 效果 | 阴影、模糊、背景模糊 | 生成 box-shadow、filter 和 backdrop-filter CSS |

### 3\. Claude Code 不能读取什么？

| 限制 | 影响 | 解决方案 |
| --- | --- | --- |
| 实际图像像素 | 无法提取光栅图像 | 手动导出资源到 `/public` 文件夹，在 Prompt 中引用 |
| 原型交互\*\* | 没有悬停状态、过渡或导航流程 | 在 Prompt 或注释中明确描述交互 |
| 评论和反馈 | 设计讨论上下文不可见 | 将相关决策包含在 Figma 注释中 |
| 版本历史 | 无法访问之前的迭代 | 如果需要比较版本，引用特定画框 |
| 复杂动画 | 动效设计无法转换 | 手动实现动画或使用单独的动画工具 |

建议将各种图片、动画资源提前下载并放入前端工程的 assets 目录中，Prompt 最好指明 AI 要读取的是哪些图片和动画。

### 4\. 构建 Figma 文件的原则

- 命名尽量清晰 `hero-section、` `nav-links、` `cta-button、` `product-card、` `price-display` 比 `Frame 427、` `Group 5、` `Component 1、` `Rectangle 12` 要好很多。
- 所有内容使用 Auto Layout → CSS Flexbox/Grid，对每个容器、每个部分、每个卡片、每个表单组应用 Auto Layout。明确设置方向、间距、内边距和对齐。下表展示了 Auto Layout 直接映射到 CSS Flexbox 属性：
	| Auto Layout 属性 | CSS 等效 | 示例 |
	| --- | --- | --- |
	| 方向：垂直 | `flex-direction: column` | 垂直堆叠项目 |
	| 方向：水平 | `flex-direction: row` | 项目并排 |
	| 间距 | `gap` | 项目之间的一致间距 |
	| 内边距 | `padding` | 容器内部间距 |
	| 对齐 | `align-items`  , `justify-content` | 容器内的项目定位 |
	| 填充容器 | `flex: 1`  或 `width: 100%` | 响应式尺寸 |
	| 内容 | `width: fit-content` | 内容驱动的尺寸 |
	没有 Auto Layout，AI 代理会回退到绝对定位—— `position: absolute; top: 247px; left: 132px;`——这对响应式布局毫无用处，会造成维护噩梦。
- 带命名变体的组件 → React/Vue Props，为每个重复元素创建组件。用描述性属性名定义变体： `size=sm|md|lg、` `state=default|hover|active|disabled，` 避免使用 `variant=1`
- 将所有颜色、间距值、排版比例和边框圆角定义为 Figma 变量。使用语义化命名： `color-primary、` `spacing-md、` `radius-lg、` `font-heading-xl。` 避免直接在元素上硬编码十六进制值、像素值或字体大小。

## Claude Code

### 1\. 先创建规则文件

这是被很多人低估的操作。规则文件告诉 AI 代理你的项目约定、编码标准和设计系统要求。没有它，AI 生成的通用代码不匹配你的代码库。

创建 `.claude/rules/` 目录，创建类似如下的规则：

```
# Figma MCP 代码生成的项目规则

## 技术栈
- 框架：Next.js 14（App Router）
- 样式：Tailwind CSS v3
- 语言：TypeScript（严格模式）
- 组件库：src/components/ui/ 中的自定义设计系统

## 代码标准
- 仅使用命名导出；不使用默认导出
- 使用 \`type\` 而不是 \`interface\`（除了类实现）
- 优先使用守卫子句而不是嵌套条件
- 所有组件必须使用 TypeScript 类型

## 样式规则
- 移动优先的响应式方法
- 使用 Tailwind 实用类；避免任意值如 p-[40px]
- 将重复的颜色提取到 src/styles/globals.css 中的 CSS 变量
- 使用设计系统间距比例：4, 8, 12, 16, 24, 32, 48, 64
- 永远不要硬编码十六进制颜色；始终引用 Design Token

## 无障碍性
- 使用语义化 HTML（section, article, nav, header, footer, main）
- 每个图像必须有描述性的 alt 文本
- 交互元素必须可键盘访问
- 遵循正确的标题层次结构（不要跳过级别）
- 为仅图标按钮包含 ARIA 标签

## 组件模式
- 在创建新组件之前检查 src/components/ui/
- 重用现有组件；如果需要用变体扩展
- Props 应使用联合类型，而不是枚举
- 包含加载、错误和空状态

## 图像
- 不要从 Figma 下载图像
- 使用 src/assets/ 中的占位符图像
- 始终指定 width 和 height 属性

## 工作流
- 生成期间跳过 linter 检查
- 除非发生错误，否则跳过依赖验证
- 首先关注核心实现，其次是细化
```

有了这个文件，Prompt 本身可以大幅简化，因为大量约定已经预置好了。需要注意的是，AI 有时会选择性忽略 Rules 文件里的规定，对于特别重要的约束，建议在 Prompt 里也再强调一遍。

### 2\. 先提取 Design Token，再生成组件

很多人上来就让 AI 直接生成组件，结果颜色全是硬编码的十六进制值，间距全是 `p-[40px]` 这类任意值，生成完还要大量返工。

正确的顺序是： **第一步先提取设计系统，** 生成 Tailwind config 或 CSS 变量文件，再以此为基础生成组件。参考 Prompt：

```
读取我的 Figma 设计：[Figma Frame URL]

提取所有 Design Token 并创建：
1. 扩展默认主题的 Tailwind 配置，包括：
   - 匹配设计的自定义颜色（使用语义化名称）
   - 字体系列和大小
   - 间距比例
   - 边框圆角值
2. CSS 变量文件作为后备

参考 .claude/rules/ 中的规则以获取命名约定。
```

这一步做好之后，后续每个组件的生成都会自动引用这些 token，而不是到处散落硬编码值。

```
查看我的 Figma 文件中的 [组件名称]：[Figma Frame URL]

生成一个 React 组件，要求：
- 匹配设计的精确样式
- 使用我们创建的 Tailwind 配置
- 支持 Figma 中定义的所有变体
- 使用 TypeScript 完全类型化
- 包含悬停/焦点状态
- 遵循 .claude/rules/ 中的模式
- 检查 src/components/ui/ 以重用现有组件
```

### 3\. Prompt 描述尽可能详细，减少 AI 的"猜测空间"

具体来说，要在 Prompt 里明确：

- 技术栈和版本（不要只说"React"，要说"React 18 + TypeScript + Tailwind CSS v3"）
- 响应式要求（不要只说"响应式"，要说"适配 375px、768px、1440px 三种断点"）
- 交互行为（Figma MCP 读不到 prototype 交互，hover 状态、transition 动效、表单校验逻辑都要在 Prompt 里描述）
- 无障碍要求（"每个图片需要 alt 文本，交互元素需要键盘可访问"）

不明确说明的内容，AI 要么不做，要么随机猜测，两种结果都需要返工。

### 4\. 分步骤生成，而非一次性要求

这个经验尤其适用于复杂页面。一次性要求 AI 生成整个页面，往往得到一个结构混乱的大组件。推荐的分步流程：

**第一步，** 先让 AI 分析布局结构：

```
分析这个 Figma Frame 的布局，告诉我你识别到的主要区域和组件，并且说明你打算如何将他们构建为 React 组件
```

**第二步，** 确认 AI 的理解无误后，生成页面骨架：

```
基于你的分析，生成页面骨架，各区域的内容先用默认值填充
```

**第三步，** 逐个实现子组件：

```
现在用 full styling details 实现 xxx 组件
```

### 5\. 响应式设计：尽量同时提供移动端和桌面端 Figma 链接

不要只给一个 Frame 然后要求 AI "自行适配响应式"，而是在 Figma 中分别维护移动端和桌面端的 Frame，然后在 Prompt 里同时提供两个链接：

```
从 Figma 实现组件设计：
- 移动端：[移动端 Figma Frame URL]
- 桌面端：[桌面端 Figma Frame URL]

确保响应式设计：移动优先，在 1024px 切换到桌面布局。
使用 Tailwind 响应式前缀（md:, lg:）。
```

### 6\. 图片资源的处理约定要提前说清楚

Figma MCP 传递的是设计结构数据，不包含图片像素本身。如果 Prompt 里不说明，AI 会自行决定如何处理图片占位，结果可能是随机的 picsum 链接、空的 `<img>` 标签，或者试图从 Figma 下载图片（会失败）。

建议在 Rules 文件里加一条固定规则：

```
不要从 Figma 中下载图片，使用 src/assets 中的图片作为占位图片，总是要指定宽度和高度
```

## 小结

Figma MCP 本质上是一个 **设计与代码之间的上下文桥梁，** 它的上限取决于你的设计稿质量、Prompt 的精准程度，以及团队工作流的标准化程度，不想要频繁返工，最好在设计、Prompt 和工作流上提前下功夫。

继续滑动看下一个

碳基 Agent

向上滑动看下一个