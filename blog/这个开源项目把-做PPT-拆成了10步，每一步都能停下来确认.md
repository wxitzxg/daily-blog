---
title: "这个开源项目把\"做PPT\"拆成了10步，每一步都能停下来确认"
source: "https://mp.weixin.qq.com/s/9J0i9EKmUyQ1s3McRpmtbQ"
author:
  - "[[有料黑科技]]"
published:
created: 2026-04-12
description: "用 Agent 做PPT，不是一键生成，而是分阶段交付。这套工作流告诉你每一步该产出什么、什么时候该停下来。"
tags:
  - "clippings"
---
原创 有料黑科技 *2026年4月4日 14:52*

> 用 Agent 做PPT，不是一键生成，而是分阶段交付。这套工作流告诉你每一步该产出什么、什么时候该停下来。

ppt-agent-workflow-san 是一套开源的 PPT 制作工作流，核心理念是"约束工作流，不约束实现"。它把 PPT 制作拆成 10 个阶段，提供 6 套 prompt 模板，支持从调研简报到最终复核的全流程。本文介绍其核心设计、实际效果和安装使用方式。

---

GitHub 上有个项目叫 `ppt-agent-workflow-san，` 作者 mucsbr 在 Linux.do 论坛分享了一套做 PPT 的思路。

![图片](https://mmbiz.qpic.cn/mmbiz_png/2tmmBsrhXa2ttzpDCafj0VSjicEZ0hlIKd301oQRdHtFa059UZBUYjWsySsXDC0NdyhrUnJWkS7Zvrxf5wTts03jyGqqniaSe1s6KmjTDYQXw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

它不是一个"一键生成 PPT"的工具。 **它是一套工作流。**

区别在哪？普通的 AI PPT 工具是黑箱——你输入主题，它输出文件，中间发生了什么你不知道，也控制不了。而这个工作流把整个过程拆成了 **10 个阶段，** 每一步都有明确的输入和产出，你可以停在任意一层：

| 层级 | 产出 | 适合场景 |
| --- | --- | --- |
| research-brief | 调研简报（关键事实、数据来源、风险点） | 还没想清楚方向 |
| outline | 大纲（JSON 格式，含每页目标） | 已有素材需要结构化 |
| planning-draft | 策划稿（每页的信息层级、布局建议） | 大纲定了要细化 |
| sample-artifact | 可审阅的中间产物 | 需要确认方向再铺开 |
| full-deck-plan | 完整方案 | 方向确认后全面展开 |
| review-notes | 复核笔记（逻辑/证据/一致性检查） | 交付前的质检 |

这就像装修。一种是你跟工头说"帮我装个房子"，三个月后给你钥匙——进去一看，粉色墙纸配绿色地板。另一种是你先确认平面图，再确认水电点位，再确认瓷砖样式，每一步签字确认。

前者快。后者返工率低。

## 核心设计：约束工作流，不约束实现

这个项目最关键的原则写在 SKILL.md 第一行：

> **Constrain the workflow, not the implementation.**
> 
> 约束工作流，不约束实现。

意思是：它不绑定任何具体工具。不强制你用某个搜索 API，不规定渲染器必须是 HTML 还是 SVG，不指定输出格式。你的环境有什么能力，它就用到什么能力的上限。没有？那就诚实告诉你在哪一步停住，不会假装什么都能做。

整个工作流的 10 个默认阶段：

**① 需求澄清**

收集受众、目的、页数范围、风格、必含/必避内容。信息不全就问，不会自己脑补。这一步解决的是"PPT 到底给谁看、要达到什么效果"的问题——大多数翻车的 PPT 都是在这里就开始偏了。

**② 判断是否需要调研**

依赖时事/数据/产品细节的主题才启动调研，纯经验分享类就直接用你给的素材。不是每个 PPT都需要搜一大堆资料，但需要的时候不能跳过。

**③ 整理资料**

搜索也行，上传文档也行。关键是：如果外部调研做不到，明确告诉你"素材有限"，不装作什么都知道。

**④ 产出调研简报**

在搭大纲之前，先把关键事实、证据、风险点整理成一页 brief。后面所有内容都锚定在这个 brief 上，不飘。

**⑤ 生成大纲**

用金字塔原理搭结构（结论先行、以上统下、归类分组、逻辑递进），输出标准 JSON 格式，每个章节都有"这一部分要说明什么"。可读、可审、可改。

**⑥ 策划稿**

这是整个工作流里 **信息密度最高的一步。** 每一页都要写清楚：

- 页面目标（观众应该记住什么）
- 核心信息（3-6 条）
- 证据来源建议
- 推荐表达方式（对比 / 流程 / 时间线 / 数据卡 / 象限等）
- 信息层级与布局方向
- 需要强调的关键词
- 设计注意事项

普通工具从大纲直接跳到设计稿，中间缺的就是这一层。

**⑦ 中间产物**

先生成几页样稿让你确认方向。HTML 也好、SVG 也好、甚至手绘草图也行。目的是在铺开之前说一句"对，就这个感觉"或"不对，重来"。

**⑧ 审阅门控**

对外汇报、管理汇报、客户提案、技术密集类主题，必须在这里停下来等你确认。普通内部分享可以跳过。

**⑨ 全面展开**

方向确认后才大规模生成。

**⑩ 复核 + 交付**

检查逻辑、事实置信度、证据覆盖、信息密度、跨页一致性。有任何能力限制影响了结果——直说。

10 步看起来多，但你不需要每次都跑满。简单内部分享到第 5 步（大纲）就够了，客户提案才需要跑到第 10 步。

## 实际效果

作者用这套工作流做了汽水音乐的产品分析 PPT，8 张效果图直接放在项目仓库里。

封面页干净利落——大标题 + 副标题 + 目录导航 + 一句话说清分析视角，没有多余装饰。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

核心结论页用了大数字 + 四栏卡片论点的打法，观众 3 秒内能抓住重点。增长飞轮那页画了一个环形箭头图，四个步骤环绕核心判断。竞品分析页用三列对比卡片（腾讯音乐系 vs 网易云音乐 vs 汽水音乐），下面接三行维度对比矩阵，信息密度高但层次清晰。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

整体观感： **不像 AI 生成的。**

AI 生成 PPT 的典型特征是什么？每页信息量均匀得可疑，排版精美但没有重点，颜色高级但你记不住任何一页说了什么。而这几张效果图——有的页字多，有的页图大，有的页就是一个核心论断。 **信息密度的起伏像人做的。**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当然作者自己也说了，SVG 自动生成的逻辑还没实现，效果图目前是手动/半手动出来的。但这套工作流的价值本来就不在于自动渲染，而在于 **前面 90% 的工作——想清楚、理清楚、确认清楚。**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 怎么用

### 方式一：当方法论用（零安装）

你不需要安装任何东西。把这 10 个阶段当成 checklist，下次做重要 PPT 时一步步来。项目仓库的 `references/prompts.md` 里提供了 **6 套现成的 prompt 模板：**

1. **调研简报 prompt**
	— 让 AI 先做事实梳理，不急着写
2. **大纲架构师 prompt**
	— 金字塔原理 + JSON 输出
3. **策划稿 prompt**
	— 每页的目标、信息层级、表达方式
4. **中间产物 prompt**
	— 生成可审阅的方向性样稿
5. **确认审阅 prompt**
	— 结构化反馈框架
6. **格式化生成 prompt**
	— SVG / HTML 页面渲染（可选）

复制出来就能喂给你的 AI 助手，不管是 ChatGPT、Claude 还是其他任何 Agent。

### 方式二：安装为 Skill 使用

如果你用的是 WorkBuddy 或兼容的 Agent 平台，可以直接把这个项目安装成一个 Skill。安装后每次你说"做个 PPT"，Agent 会自动按这套工作流执行。

**安装步骤：**

```
# 方式 A：Git 克隆
git clone https://github.com/mucsbr/ppt-agent-workflow-san.git
# 将文件夹放到 skills 目录即可

# 方式 B：下载 ZIP
# 从 GitHub 下载 zip → 解压 → 放到 skills 目录
```

零依赖，纯文档型项目，没有任何脚本。整个项目的文件结构很清晰：

```
ppt-agent-workflow/
├── SKILL.md              # 工作流主定义（10 阶段详细说明）
├── README.md             # 效果图展示
├── references/
│   ├── method.md         # 方法论文档（为什么这样设计）
│   ├── prompts.md        # 6 套可复用 prompt 模板
│   └── agent-integration.md  # Agent 协调规则
└── 01-cover.png ~ 08-conclusion.png  # 汽水音乐分析效果图
```
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 和现有 PPT 工具的关系

| 你已有 | 这套工作流补什么 |
| --- | --- |
| Gamma / Beautiful.AI | 渲染能力强，但缺前面的需求澄清→调研→大纲环节 |
| ChatPPT / 博思 AIPPT | 中文理解不错，但交互偏"一键到底" |
| 自己写 HTML/SVG | 你的前端能力就是渲染器，工作流帮你组织"每页该写什么" |
| 什么都不用 | 工作流本身就是完整的思考框架 |

一句话： **现有的 AI PPT 工具擅长"怎么画"，这个工作流擅长"画什么"以及"为什么这样画"。两者结合才是完整解。**

## 几句实在话

这套工作流没有新算法、没有新模型、没有新架构。它做的事情是把"一个有经验的顾问怎么做 PPT"拆成了 10 个步骤写下来。

但恰恰是因为没什么技术含量，才让人觉得—— **对，就是这样，之前怎么没人好好写过？**

大多数 AI PPT 工具在卷模板数量、卷渲染速度、卷动画效果。好像 PPT 做不好是因为模板不够炫。但 PPT 做不好从来不是因为模板，是因为 **想得不深、结构不清、重点不明。** 模板是最后 10% 的事，前面 90% 的时间都应该花在上面那些阶段里。

这个项目提醒了一件事：AI 时代最有价值的未必是最强的模型，而是 **最好的流程。**

---

## 📎 项目地址：

https://github.com/mucsbr/ppt-agent-workflow-san

## 📎 论坛原帖：

https://linux.do/t/topic/1785157

继续滑动看下一个

有料黑科技

向上滑动看下一个