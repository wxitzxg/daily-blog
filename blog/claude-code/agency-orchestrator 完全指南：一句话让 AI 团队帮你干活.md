---
title: "agency-orchestrator 完全指南：一句话让 AI 团队帮你干活"
source: "https://mp.weixin.qq.com/s/XcGbkMb6TM6NLQiL7ICwbw"
author:
  - "[[AI不止语]]"
published:
created: 2026-04-16
description: "让多个AI专家同时干活：趋势研究、财务分析、内容策划一步到位。211个角色，免费用，附完整教程。"
tags:
  - "clippings"
---
AI不止语 *2026年4月14日 15:41*

你已经在用 ChatGPT、Claude、DeepSeek 了。

但你有没有觉得——跟一个 AI 聊天，效率已经到天花板了？

你问它一个问题，它给你一个视角。但现实中做任何决策，你需要的是：产品经理的视角、技术的视角、财务的视角、营销的视角……然后综合判断。

agency-orchestrator 就做这件事： **一句话，多个 AI 角色自动分工协作，几分钟出完整方案。**

开源免费！昨天重大升级！已经很好用了！内嵌爆火：agency-agents 79.6K star！

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/OhCsUiaysCDaOscYiaNyPRJH8FRbK6zI412XErHbRPWxr3AH6FPsmtR5sqC6LuCiaV3w1qcCq8v4TykzHVZbylO4A7r1VMVYwuUANwWj5xuktc/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

---

## 它能干什么

先看一个真实例子。

我在终端里敲了一行命令：

```nginx
ao compose "我是一个程序员，想用AI做自媒体副业，目标月入2万，帮我做完整规划" --run
```

3 分钟后，5 个 AI 角色自动完成了各自的任务：

- 🔭 **趋势研究员** —— 分析了 6 个赛道的竞争度、变现天花板和 AI 提效倍数
- 📱 **平台分析师** —— 对比了 6 大平台，给出"小红书+公众号"组合策略
- 💰 **财务规划师** —— 把月入 2 万拆解成具体收入来源和变现阶梯
- ✍️ **内容策略师** —— 给出 20 个选题、4 套标题模板、内容生产 SOP
- 📋 **执行规划师** —— 排出 90 天行动计划，精确到每天做什么
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

输出的不是"建议你做自媒体"这种废话，而是可以直接执行的完整方案。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

比较火的案例：一人公司执行流程图如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 安装（2 分钟）

需要 Node.js 18+。

```css
npm install -g agency-orchestrator
```

验证：

```nginx
ao --version# v0.5.0
```

看到版本号就装好了。

---

## 配置 AI 模型

ao 支持 10 种大模型，分两类：

## 不需要 API Key 的（有会员就能用）

| **模型** | **怎么用** | **适合场景** |
| --- | --- | --- |
| **Claude Code** | \--provider claude-code | 质量最高，有 Claude Max 就免费 |
| **ChatGPT CLI** | \--provider codex-cli | 有 ChatGPT Plus 就能用 |
| **GitHub Copilot** | \--provider copilot-cli | 有 Copilot 订阅就能用 |
| **Gemini** | \--provider gemini-cli | 有 Google 账号就能用（免费） |
| **Hermes Agent** | \--provider hermes-cli | 🔥 NousResearch 热门开源，免费 |
| **Ollama** | \--provider ollama | 本地模型，完全离线 |
| **OpenClaw** | \--provider openclaw-cli | 社区 CLI |

## 需要 API Key 的（按量计费）

| **模型** | **配置** | **费用** |
| --- | --- | --- |
| **DeepSeek** （推荐） | export DEEPSEEK\_API\_KEY="你的key" | 充 10 块跑很久 |
| **OpenAI** | export OPENAI\_API\_KEY="你的key" | 按 token 计费 |
| **任何 OpenAI 兼容 API** | 设置 OPENAI\_BASE\_URL | Kimi/零一万物/硅基等 |

**推荐组合** ：日常用 DeepSeek（便宜），重要任务用 Claude Code（质量高）。

---

## 三种用法

## 用法一：一句话出结果（最简单）

```nginx
ao compose "你想让AI帮你做的事" --run
```

不用写配置，不用选角色。AI 自动从 211 个角色中挑选合适的，生成工作流并立刻执行。

**示例：**

```nginx
# 商业分析ao compose "帮我分析做一个AI记账工具的可行性" --run# 竞品分析ao compose "对比Cursor、Windsurf和Copilot，给出选择建议" --run# 内容创作ao compose "写一篇关于AI Agent趋势的深度文章" --run# 创业规划ao compose "用10万块启动一个AI教育项目，做完整规划" --run
```

如果只想生成 YAML 不执行：

```nginx
ao compose "你的需求"# 生成 workflows/xxx.yaml，之后手动 ao run 执行
```

## 用法二：用内置模板

```python
# 一人公司全员大会 —— 9个AI部门协作出商业方案ao run workflows/一人公司全员大会.yaml --input idea="帮打工人用AI写简历和模拟面试的求职神器"# AI深度文章创作ao run workflows/ai-opinion-article.yaml --input topic="AI会取代程序员吗"# 创业发布计划ao run workflows/ai-startup-launch.yaml --input idea="你的产品想法"# 小说创作ao run workflows/story-creation.yaml --input premise="一个时间旅行的故事" --input style="悬疑"
```

## 用法三：自己写 YAML（最灵活）

```bash
name: "我的工作流"agents_dir: "agency-agents-zh"llm:  provider: "deepseek"  model: "deepseek-chat"inputs:  - name: topic    required: truesteps:  - id: research    role: "product/product-trend-researcher"    task: "调研{{topic}}的市场趋势和竞争格局"    output: market_data  - id: analysis    role: "strategy/nexus-strategy"    task: "基于{{market_data}}，给出战略建议"    depends_on: [research]    output: strategy  - id: plan    role: "product/product-manager"    task: "基于{{strategy}}，制定产品路线图"    depends_on: [analysis]    output: roadmap
```

执行：

```nginx
ao run my-workflow.yaml --input topic="AI教育"
```

---

## 211 个内置角色

```nginx
ao roles
```

覆盖一个公司几乎所有岗位：

| **类别** | **角色数** | **示例** |
| --- | --- | --- |
| 战略 | 8 | CEO、战略分析师、创新催化师 |
| 产品 | 15 | 产品经理、趋势研究员、用户研究员 |
| 工程 | 25 | 架构师、全栈开发、代码审查、DevOps |
| 设计 | 12 | 品牌总监、UX设计师、交互设计师 |
| 营销 | 20 | 增长黑客、内容策略师、SEO专家、社媒运营 |
| 财务 | 10 | 财务分析师、预算规划师、风险分析师 |
| 写作 | 18 | 博客作者、文案、编辑、技术写作 |
| HR | 8 | 招聘专家、面试官、组织发展 |
| 法务 | 6 | 合同审查、合规分析、知识产权 |
| 测试 | 10 | QA工程师、性能测试、安全测试 |
| 更多 | 47 | 数据分析、客户成功、项目管理… |

每个角色都有完整的系统 prompt，不是简单的"你是一个产品经理"，而是包含工作流程、输出格式、思维模式的专业定义。

---

## 核心功能详解

## DAG 自动并行

没有依赖关系的步骤自动并行执行。比如：

```bash
steps:  - id: market     # 第1层    task: "市场调研"  - id: user       # 第1层（与market并行）    task: "用户研究"  - id: product    # 第2层（等market和user都完成）    task: "产品规划"    depends_on: [market, user]
```

market 和 user 同时跑，都完成后 product 才开始。自动优化执行时间。

## 变量传递

上一步的输出自动传给下一步：

```bash
- id: research    task: "调研市场数据"    output: market_data     # 输出变量  - id: analysis    task: "基于{{market_data}}做分析"   # 引用上一步输出    depends_on: [research]
```

## 不同步骤用不同模型（v0.5.0 新增）

调研用便宜的，决策用好的：

```bash
steps:  - id: research    role: "product/product-trend-researcher"    task: "调研市场趋势"    llm:      provider: deepseek      model: deepseek-chat       # 便宜，适合大量调研  - id: decision    role: "strategy/nexus-strategy"    task: "基于调研做最终决策"    llm:      provider: openai      model: gpt-4o              # 质量高，用于关键决策
```

也可以命令行临时切换全部步骤的模型：

```css
ao run workflow.yaml --provider claude-code
```

## 流式输出 + 断点续写（v0.5.0 新增）

之前用 DeepSeek 跑长任务，最头疼的问题：跑到一半，连接断了。

原因是 DeepSeek 服务端有 60 秒超时。AI 想太久，服务器就把连接掐了。

v0.5.0 彻底解决：

- **流式输出**
	—— 边想边给你看，不再等全部想完
- **断点续写**
	—— 连接断了自动从断的地方接着写，最多续 3 次
- **智能重试**
	—— 429 限速、500 服务端错误、网络抖动，自动退避重试

## 断点恢复（--resume）

跑完一个 9 步的工作流，觉得第 7 步的财务分析不够细？不用全部重跑：

```css
ao run workflow.yaml --resume last --from finance_plan
```

只从 finance\_plan 开始重新执行，前面 6 步复用上次结果。省时间、省 token。

## 条件分支

根据上一步结果决定下一步：

```bash
- id: review    task: "审核方案质量"    output: review_result  - id: revise    task: "修改方案"    depends_on: [review]    condition: "{{review_result}} contains 需要修改"
```

## 循环迭代

让 AI 自动改到满意为止：

```bash
- id: write    task: "写文章"    output: draft    loop:      back_to: review      max_iterations: 3      exit_condition: "{{review_result}} contains 通过"
```

## 文件输入

把本地文件内容传给 AI：

```nginx
ao run workflow.yaml --input prd_content=@prd.md
```

## 查看执行计划

不执行，只看 AI 会怎么分工：

```nginx
ao plan workflow.yaml
```

```nginx
ao explain workflow.yaml   # 用自然语言解释执行计划
```

---

## v0.5.0 更新汇总

这是一次大版本更新，解决了 8 个社区 issue：

| **功能** | **说明** |
| --- | --- |
| ao compose --run | 一句话生成工作流并立刻执行，零配置 |
| 流式输出 | DeepSeek 等 API 边想边输出，不再超时断开 |
| 断点续写 | 连接断了自动从断的地方接着写 |
| 智能重试 | 429/500/网络错误自动分级退避重试 |
| 步骤级模型切换 | 同一个工作流不同步骤用不同模型 |
| 自定义 Provider | 支持任意 OpenAI 兼容 API（base\_url） |
| Agent 身份 | 每个步骤显示角色名和 emoji |
| Windows 兼容 | 修复 Windows 下找不到 CLI 命令的问题 |
| init 优化 | 优先从 npm 下载角色包，不再依赖 GitHub |
| compose 文件名 | \--name 参数自定义生成的 YAML 文件名 |

升级：

```css
npm install -g agency-orchestrator@latest
```

---

## 执行结果在哪里

每次执行的结果保存在 ao-output/ 目录：

```bash
ao-output/└── 程序员AI自媒体副业规划-2026-04-13T14-38-06/    ├── metadata.json          # 执行信息（耗时、token、状态）    └── steps/        ├── 1-trend_research.md        ├── 2-platform_analysis.md        ├── 3-income_model.md        ├── 4-content_strategy.md        └── 5-execution_plan.md
```

每个角色的输出都是独立的 Markdown 文件，方便查看和引用。

---

## 与 Claude Code / Cursor 集成

ao 可以作为 MCP Server 被 Claude Code 或 Cursor 调用：

```nginx
ao serve
```

然后在 Claude Code 或 Cursor 里直接说"帮我跑一个工作流"，它会自动调用 ao。

---

## 常见问题

**Q：要花多少钱？** 工具本身免费开源。用 DeepSeek API 跑一次完整工作流约 ¥0.1-0.5。用 Claude Code / ChatGPT Plus 等订阅制模型不额外花钱。

**Q：和 ChatGPT / Claude 直接对话有什么区别？** 直接对话是一个 AI 给你一个视角。ao 是多个专业角色各自完成擅长的部分，最后汇总。相当于一个人 vs 一个团队。

**Q：和 CrewAI / LangGraph 有什么区别？** 它们需要写 Python，需要 API key，角色要自己定义。ao 用 YAML 零代码，211 个角色开箱即用，7 种模型不需要 API key。

**Q：跑到一半断了怎么办？** v0.5.0 有流式输出 + 断点续写 + 智能重试。万一还是断了，用 --resume last 从断的地方继续。

**Q：Windows 能用吗？** 能。v0.5.0 修复了 Windows 兼容问题。

**Q：可以用本地模型吗？** 可以。--provider ollama 支持所有 Ollama 本地模型，完全离线。

---

## 链接

- GitHub：https://github.com/jnMetaCode/agency-orchestrator
- 安装：npm install -g agency-orchestrator
- 角色库：https://github.com/jnMetaCode/agency-agents-zh
- 问题反馈：提 Issue 或加群交流

---

agency-orchestrator 是一个开源的多智能体编排工具。用 YAML 定义 AI 协作流程，自动 DAG 并行执行。211 个专业角色开箱即用，支持 10 种大模型（7 种免 API key）。

\--------------------

进微信群: 请关注 AI不止语，回复 \`群\`

欢迎来聊✌️

**微信扫一扫赞赏作者**

作者提示: 个人观点，仅供参考

继续滑动看下一个

AI 不止语

向上滑动看下一个