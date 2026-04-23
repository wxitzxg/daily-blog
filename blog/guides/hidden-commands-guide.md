---
title: "Claude Code 隐藏命令与技巧大全"
source: "Merged from 5 articles"
created: 2026-04-23
category: guides
tags: [hidden-commands, tips, hooks, efficiency, best-practices]
summary: 整合自 5 篇热门文章，涵盖隐藏命令、常用技巧、踩坑解决方案和 Hooks 实战，助你将 Claude Code 从玩具变成生产力武器。
---

# Claude Code 隐藏命令与技巧大全

> 大多数人把 Claude Code 当自动补全用。顶尖的 1% 把它当操作系统用。区别就在于："帮我写这个函数" 和 "趁我睡觉把整个功能上线"。

本文整合自 5 篇热门文章，涵盖隐藏命令、常用技巧、踩坑解决方案和 Hooks 实战，助你将 Claude Code 从玩具变成生产力武器。

---

## 1. 隐藏命令一览

Claude Code 有很多隐藏命令，在帮助文档里找不到，但用好了能让效率翻倍。

### 1.1 /btw —— 插嘴神器（防上下文污染）

**场景**：Claude 正在给你重构一个大模块，你突然想问"测试文件在哪个目录？"

以前一问，它就停下来答，上下文多出一坨无关对话，后面继续干活容易跑偏（经典上下文污染）。

现在直接输入 `/btw` + 空格 + 问题，它会 **并行** 开个侧边回答，**不进主对话历史**，不中断主任务，答完直接空格/回车消除。

几乎不耗 token，复用缓存。长任务必备，每个长会话可以用好几次。

### 1.2 /rewind（或双击 Esc）—— 真正的 Ctrl+Z

**场景**：让 Claude 重构模块，重构完发现一塌糊涂，想回退怎么办？

以前改坏了只能整段对话回退，连前面讨论都丢。现在升级后：输入 `/rewind` → 弹出菜单选：

- 回退代码+对话
- 只回退对话（保留代码）
- 只回退代码（保留对话）
- 从该点压缩上下文释放空间

超级适合做实验：让 Claude 试新方案，不行就代码回退，对话留着，它还记得"刚才这条路走不通"，直接换方向，不用重新讲需求。

含泪 git reset 的时代结束了！

### 1.3 /insights —— Claude 反向观察你

输入 `/insights`，它吐出一份本地 HTML 报告：分析你过去一个月的使用习惯、最常用命令、重复操作模式，还给你推荐自定义命令/Skills。

它甚至会吐槽你"记忆改得太烂""服务器链接经常错"……像个严厉的产品经理审你。

建议每个月跑一次，真的能重新认识自己的坏习惯。

### 1.4 /model opusplan —— Pro 用户福音

Pro 订阅（$20/月）的 Opus 额度很少，全程用 Opus 容易限速。

这个隐藏模式：复杂推理/规划自动切 **Claude Opus 4.6 plan 模式**，写代码执行切 **Sonnet 4.6**（又快又省）。

在 /model 列表里搜不到，直接敲 `/model opusplan` 就行。轻度用户/想省钱的必开，两全其美。

### 1.5 /simplify —— 三合一代码审查

今年 2 月底集成的新内置 Skill。输入 `/simplify`，它同时启动三个平行 Agent，从 **代码复用、质量、运行效率** 三个角度审你的改动，然后汇总优化建议。

AI 写的代码常有冗余 import、重复逻辑、啰嗦写法，/simplify 基本全挑出来。相当于三个同事同时帮你 review。

### 1.6 /branch —— 分支测试

在当前上下文基础上分化出独立的测试分支，确保主干思路不受干扰。适合做方案探索。

### 1.7 /loop —— 定期后台检查

`/loop 5m check if deploy succeeded` 在会话保持开启的同时安排后台检查。设好之后继续干活，Claude 有消息会主动回报。

适合耗时较长的构建或排查任务。

### 1.8 /remote-control —— 远程控制

运行 `claude remote-control`，然后从 claude.ai 或手机 App 连接。在电脑上启动一个长时间重构任务，去倒杯咖啡，在沙发上查看进度。

打破设备限制，支持开发者通过移动端随时接管并监控本地的工作流。

### 1.9 /export —— 导出存档

将高价值的架构推演导出存档，支持将高价值的架构推演导出存档。

### 1.10 /clear —— 重置会话

干净的新会话比混乱的长会话更可靠。积累的 context 会悄悄稀释你的指令。`/clear` 是防止输出质量在一天之中缓慢下滑的方法。

---

## 2. 常用技巧（40+ 技巧分类整理）

### 2.1 配置与基础设置

#### 设置 cc 别名

每个认真使用 Claude Code 的人都会做的第一件事：设置 `cc` 别名。在 `~/.zshrc` 或 `~/.bashrc` 中添加：

```bash
alias cc='claude --dangerously-skip-permissions'
```

运行 `source ~/.zshrc`。之后输入 `cc` 代替 `claude`，跳过每次操作的权限确认。仅在你清楚自己在授权什么的前提下使用——它之所以快，是因为它信任你。

#### 添加实时状态栏

在 Claude Code 中运行 `/statusline`，它会生成一个 shell 脚本，在每次对话后于终端底部显示实时信息——当前目录、分支、context 使用量。相当于给你的会话加一个 HUD。

#### 将 context 窗口扩展到 100 万 token

Sonnet 4.6 和 Opus 4.6 支持 100 万 token 的 context。会话中途通过 `/model opus[1m]` 切换。从 50 万开始往上调，找到 compaction 影响输出质量之前的最佳点。

#### 一次性设定输出风格

运行 `/config` 选择风格：Explanatory（详细解释）、Concise（简洁）或 Technical（技术向）。也可以在 `~/.claude/output-styles/` 中创建完全自定义的风格。提前配置好，不用每次手动修改 Claude 的回复。

#### 用手机远程控制 Claude Code

运行 `claude remote-control`，然后从 claude.ai 或手机 App 连接。在电脑上启动一个长时间重构任务，去倒杯咖啡，在沙发上查看进度。

### 2.2 工作流与效率技巧

#### `!` 前缀：让 bash 命令输出直接进入 context

输入 `!git status` 或 `!npm test`，输出会直接进入 Claude 的 context，无需复制粘贴，Claude 可以立即据此行动。在调试循环中很有用。

```bash
cat error.log | claude "explain this error and suggest a fix"
```

#### Esc 停止，Esc+Esc 回退

`Esc` 中止 Claude 当前操作。`Esc+Esc`（或 `/rewind`）打开菜单，可恢复代码、对话或两者。这是你对"当时不太确定的想法"的撤销键。

#### `Ctrl+S`：暂存当前 prompt 草稿

正在写一个长 prompt，突然需要问一个插播问题？`Ctrl+S` 暂存草稿。问完之后草稿自动恢复。在复杂的多步骤任务中很实用。

#### `Ctrl+B`：将长任务转入后台

Claude 在跑测试套件或构建时，按 `Ctrl+B`，Claude 在后台继续运行，你可以继续对话。并行推进——它在工作，你在规划下一步。

#### `Ctrl+G`：在 Claude 动手之前编辑它的计划

Claude 给出计划后，`Ctrl+G` 在编辑器中打开它。调整步骤、修改方向，再让它执行。避免在错误的实现方向上浪费时间。

#### 语音输入比打字给出更好的 prompt

运行 `/voice` 启用 push-to-talk。说话时你会自然地提供更多上下文、约束和细节，比逐字敲键盘更充分。输出质量的差异是立竿见影的。

### 2.3 Context 与 Prompt 管理

#### 不相关任务之间运行 `/clear`

干净的新会话比混乱的长会话更可靠。积累的 context 会悄悄稀释你的指令。`/clear` 是防止输出质量在一天之中缓慢下滑的方法。

#### 纠正两次还不对，直接开新会话

如果已经纠正了两次，Claude 还是偏了，不要再纠正第三次。运行 `/clear`，把你刚学到的信息写进新 prompt 重新开始。在一个已经跑偏的会话里继续纠偏只会越来越乱。

#### 不要描述 bug，直接贴原始数据

不用解释 bug，把错误日志、CI 输出或 Slack 线程贴进去，说 "fix"。抽象描述会丢失 Claude 真正需要的细节，原始数据才能给出有效的结果。

#### 涉及架构的任务用 Plan Mode

`Shift+Tab` 进入 Plan Mode。用于多文件改动或任何结构性调整。先规划，避免 Claude 自信地在错误方向上执行。

#### 明确告诉 Claude 看哪些文件

用 `@src/auth/middleware.ts` 直接引用文件，Claude 会自动解析，省去它搜索整个代码库的 token 消耗。

#### 用模糊的 prompt 探索陌生代码

"这个文件你会改进哪些地方？" 给了 Claude 发现问题的空间，能暴露出你自己不会主动去问的不一致之处。在摸索陌生代码库时，模糊问法反而有用。

#### 使用 `/compact` 时给出保留方向

运行 `/compact` 时，告诉 Claude 要保留什么："重点保留 API 相关的变更"。不加引导的压缩容易丢失关键线索，加了引导才能精准提炼。

#### `ultrathink` 激活更深度的推理

在 Opus 4.6 的任意 prompt 中加上 "ultrathink"，Claude 会根据问题的实际复杂度动态分配推理资源。对于困难问题，效果明显。

### 2.4 自动化、工具与 MCP

#### 让 Claude 能自我验证结果

在 prompt 中包含测试命令："重构 auth 模块，跑测试套件，修复失败后再结束。" 这一条指令通过闭合反馈循环，能显著提升输出质量。

#### 安装 LSP 插件

LSP 插件让 Claude 在每次编辑后自动获取诊断信息，在你发现之前就捕捉并修复类型错误。

```bash
/plugin install typescript-lsp@claude-plugins-official
```

#### 优先使用 CLI 工具而不是 MCP server

CLI 工具比 MCP server 更节省 context。教 Claude 用 `gh` 处理 PR，用 `sentry-cli --help` 调试生产问题。节省的 context 在长会话中会累积。

#### 优先安装这几个 MCP server

信噪比较高的四个：Playwright（UI 验证）、PostgreSQL/MySQL（schema 查询）、Slack（直接读取 bug 讨论线程）、Figma（设计稿转代码）。先把这几个用熟，再考虑其他的。

#### 用 `/permissions` 将安全命令加入白名单

不要每次都手动批准 `npm run lint`。将可信命令加入白名单，保持流畅。频繁的确认弹窗是隐性的效率损耗。

### 2.5 CLAUDE.md 与 Rules 管理

#### 运行 `/init`，然后精简结果

`/init` 会生成一个 CLAUDE.md 初始文件。然后逐行审查，删掉无法明确说明必要性的内容。每一行多余的指令都是 token 的浪费，会分散注意力。

#### CLAUDE.md 的判断标准

对 CLAUDE.md 中的每一行问自己："没有这条，Claude 会出错吗？" 如果不会，删掉。大约 150–200 条指令之后，遵从度就会开始下降，把这个预算用在刀刃上。

#### 每次出错后自动更新规则

Claude 犯了错，就说："Update CLAUDE.md so this doesn't happen again。" 让规则文件随着每次会话变得更完善。

#### 用 `.claude/rules/` 设置条件规则

添加 `paths` frontmatter，让规则只在相关场景下加载。TypeScript 规则只对 `.ts` 文件生效，数据库规则只在 `/db` 目录下加载。无关场景下不占 context。

#### 用 `@imports` 保持 CLAUDE.md 精简

用 `@docs/git-instructions.md` 引用文档，而不是把内容直接粘贴进去。Claude 只在需要时读取，基础 context 保持轻量。

#### Skills：按需加载的知识扩展

在 `.claude/skills/` 中定义 Skills，扩展 Claude 的能力而不增加基础 context 的负担。用到时加载，用不到时不占空间。

#### CLAUDE.md 管建议，Hooks 管硬性要求

Claude 遵守 CLAUDE.md 的概率约为 80%。对于不容商量的要求——格式规范、安全标准、代码风格——使用 Hooks。Hooks 每次都会执行，没有例外。

### 2.6 进阶：Worktrees、Agents 与隔离

#### `--worktree` 并行开发多个分支

`claude --worktree feature-auth` 创建一个隔离的工作副本。可以同时开启多个并行会话，各自处理不同功能，互不干扰。

#### 用 subagent 保持主 context 轻量

"Use subagents to figure out the payment flow。" 这会生成一个独立实例去读取文件并返回摘要，主 context 保持精简和专注。

#### 为重复任务创建自定义 subagent

用 `/agents` 在 `.claude/agents/` 中保存预配置的 agent——比如基于 Haiku 的快速搜索 agent、严格的 TypeScript 审查 agent、文档撰写 agent。按需调用。

#### Agent 团队处理大规模并行任务

启用 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`，一个 lead agent 将任务分配给 3–5 个 subagent 并行处理。适合大规模研究或多模块重构，速度上是另一个量级。

#### `/sandbox` 用于无监督实验

`/sandbox` 通过 Seatbelt 或 bubblewrap 在 OS 级别隔离运行 Claude。让 Claude 在实验性重构中放开跑，对实际系统零风险。跑完之后审查 diff，合并你觉得好的部分。

---

## 3. 踩坑解决方案

### 3.1 Context Poisoning 问题

Claude Code 变蠢，**不是你的错**，也不是 Anthropic 故意降智，是 LLM 的先天性缺陷。

Claude Code 刚启动的时候，它的脑子是空的。它不认识你的代码，不认识你的项目，什么都不认识，像个刚出生的婴儿。然后呢，它通过你跟它的对话，一点一点，构建自己的 context。

问题来了。**人的记忆是有限的，LLM 也是。**

打个比方，我让你记住 5 个随机数字，你花 10 秒，30 秒后问你，你肯定记得住。但如果我让你再记 5 个，再记 5 个，不断不断地往你脑子里塞，你会发现前面的数字你全忘了。

Claude Code 一模一样。你跟它聊得越多，它的 context window 越满，它就开始犯傻。忘记几分钟前你告诉它的事情，忘记你刚才写的代码，开始写重复的代码，把事情搞砸。**这就是所谓的 context poisoning**，ctx 满了，脑子就空了。

### 3.2 解决方案一：装个 status line 监控你的 ctx

在终端里输入：

```bash
npx cc-statusline@latest
```

就这么简单。安装完之后，你的 Claude Code 底部会多出一个 status bar，显示三样东西：**模型、ctx 百分比、session cost、session 时间。**

其中，**ctx 百分比是最关键的**。经验是，一旦 ctx 超过 50%，你就要开始警惕了，Claude 已经开始忘记东西了。等到 100% 再行动，**黄瓜菜都凉了**。

有人会说，可以用 compact 命令压缩 context。建议是：**千万别**。compact 是最差的选择，你会同时失去之前的工作上下文，而且残留的 ctx 污染还在。双输。

### 3.3 解决方案二：启动 sub-agents

这是更暴力的解法。因为即使用了最新的模型，它们 ctx 消耗速度还是太快了。

真正的终级方案是：**让你的主 Claude Code 变成一个指挥官**。

它不再自己干活，它指挥 dozens of sub-agents 去干活。每个 sub-agent 有自己独立的 ctx window，它们互不干扰。

干完活，回来跟主 Claude 汇报。主 Claude 只需要记住"张三完成了功能 A"、"李四完成了测试 B"，而不是一下子把所有代码全部塞进自己的 ctx。

这就是**分布式架构**，效率直接拉满。

### 3.4 解决方案三：装 Superpowers 插件

这是最推荐的插件，没有之一。它让 Claude Code 瞬间拥有 orchestration 能力，可以同时指挥 dozens of sub-agents，**写代码、review 代码、debug、test**，全部分布式处理。

甚至 Anthropic 官方都推荐了这个插件，只是没有内置而已。

安装方式：

```bash
/claude/plugins
```

找到 Discovered, Add plugin，搜索 superpowers，安装，再装一个 code-simplifier，然后重启 Claude Code，就完成了。

Superpowers 有三个核心命令：

1. **superpowers brainstorm** — 开始任何项目
2. **superpowers write plan** — 生成实施计划
3. **superpowers execute plan** — 自动调度 sub-agents 执行

它把你的 **vibe coding** 直接升级成 **spec-driven development**，跟 Netflix、Spotify 这些大厂用 AI 写代码的方式，一模一样。

### 3.5 解决方案四：装 Sequential Thinking

光有 superpowers 不够，你得让 Claude 思考能力更强。

Sequential Thinking 这个插件用的是 chain-of-thought reasoning，让 Claude 思考得更深、更久，得出的结论质量完全不是一个 Level。

安装方式：在 Claude Code 里直接说"请安装 sequential thinking MCP server"。

它会自己找到、自己安装、自己配置好。安装完，重启 Claude，你的 superpowers 就直接进化成 **superpowers + 深度思考**，双重 buff。

### 3.6 解决方案五：装 Context 7

还有一个致命问题：Claude 的训练数据 **永远落后现实 6-12 个月**。

这意味着什么？它会用过时的 API，写会挂掉的代码，以为自己在写正确的代码，其实全是坑。

怎么办？**给 Claude 一个实时更新的知识库**。

这就是 Context 7 的作用。它让 Claude 能实时访问所有 API 的最新文档、所有服务商的最新信息、所有库的更新日志。

安装方式：

```bash
/claude/plugins
```

找到 Context 7，Install for everyone，重启，就完事了。装完这个插件，Claude 写代码基本上不会踩过时的坑。

### 3.7 解决方案六：换一个 Terminal——Warp

Warp，一个 AI-native terminal，跟传统终端不一样的是，它可以 **分屏**。左边显示 Claude 正在写的 plan、spec、code，右边显示你的项目文件。

你可以一边跟 Claude 对话，一边看它到底在写什么，一边实时 review。不用再盲打，不用再"相信它会写对"，你可以亲眼看，实时纠错。这才是正确的 AI 编程姿势。

而且 Warp 还能 Command + D 分屏、Control + T 开多个 tab、管理 dozens of Claude instances，完全免费。安装地址：**warp.dev**。

### 3.8 解决方案七：Happy Engineering——手机远程写代码

Claude Code 官方有移动端 app，但讲实话，**太拉胯了**。不能运行本地文件，大部分网站被 block，功能只有桌面端的 10%。

怎么办？**Happy Engineering**，免费，开源，支持 Android、iOS、Web。安装方式：去 happy.engineering 复制那行命令，在终端运行，然后手机设置一下，搞定。

从此你随时随地都可以在手机上启动一个真正的 Claude Code terminal，运行 superpowers、运行 sequential thinking、运行 context 7，**100% 能力同步**。

### 3.9 解决方案八：自定义 Skills

当你用 Claude Code 一段时间后，你会发现有些事情你每天都在重复做。每次手动输入太麻烦。

怎么办？**直接让 Claude 学会这个技能**。把所有规范、所有流程、所有文件位置全部告诉 Claude，然后说"Build a skill"。Superpowers + Sequential Thinking 直接给你定制了一个 skill。

第一次跑完，给了反馈"这里有问题"、"那里要改"，跑了几次之后完美。**每天节省至少 2 个小时**。

---

## 4. Hooks 实战

### 4.1 什么是 Hooks

Hooks 其实没啥神秘的，你每次让 Claude 跑命令、写文件、改东西，它本来都会停下来让你确定或者问你一些权限。

点多了人就麻了，后面出事就是因为这个。

hooks 的意思是把那些判断提前写成脚本，该拦的它自动拦，人只在关键地方介入。

Claude Code 创始人 Boris 有句话：**把 Claude Code 当基础设施用，不要当魔法。**

hooks 大概就是这个基础设施的水泥。

hooks 总共 27 种。粗分三类，工具执行前后的、会话开始结束的、还有决策相关的。

### 4.2 Hook 1：会话开场自动喂上下文（SessionStart）

以前每次开 Claude Code 都要敲一遍差不多的话，让它看看当前分支、看看最近几个 commit、看看 TODO 文件。每次都这样，烦得要死。

SessionStart hook 就是干这个的。Claude 启动的那一刻，hook 自动跑一遍脚本，把这些信息直接塞进它的上下文里。

配置大概长这样：

```json
{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/load-context.sh"
      }]
    }]
  }
}
```

对应的脚本也很朴素：

```bash
#!/bin/bash

echo "Current branch: $(git branch --show-current)"
echo ""
echo "Recent commits:"
git log --oneline -5
echo ""
echo "Uncommitted changes:"
git status --short
```

SessionStart 和 UserPromptSubmit 这两个 hooks 有个特点，stdout 输出会自动被加进 Claude 的对话上下文。所以你只要 echo 出来的内容，Claude 下一秒就能看到。

装完以后冷启动时间基本归零。以前要来回问两三轮才能让 Claude 搞清楚状态，现在一打开它就知道上次干到哪了。

### 4.3 Hook 2：拦截危险命令（PreToolUse）

Claude 有时候会自作主张。见过它跑 rm -rf 清理目录，也见过它改 .env 文件把本地的数据库连接串给覆盖了。当时都是手动点允许点到麻木的结果。

为了避免 Claude 删库跑路，研究了一下 PreToolUse，专门处理这种事。

它在任何工具执行之前触发，可以 allow 可以 deny 可以 ask，还可以改写输入参数。

阻止 rm -rf 的脚本大概这样：

```bash
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command' < /dev/stdin)

if echo "$COMMAND" | grep -qE 'rm\s+-rf'; then
  jq -n '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: "Destructive rm -rf blocked by hook"}}'
else
  exit 0
fi
```

配置里 matcher 写 Bash 就行：

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/block-rm.sh"
      }]
    }]
  }
}
```

v2.0.10 之后 PreToolUse 还多了个能力，可以在返回值里加 updatedInput 字段直接改写参数。比如 Claude 想跑 rm -rf ./，你可以改成 rm -rf ./dist 缩小爆炸半径，不用直接拦截它。

Boris 本人还用 PreToolUse 做了另一件事——记录每一个 bash 命令，相当于审计日志。

### 4.4 Hook 3：代码自动格式化（PostToolUse）

这是 Boris 本人公开强烈推荐的 hook，他的原话：

> We use a PostToolUse hook to format Claude's code. Claude usually generates well-formatted code out of the box, and the hook handles the last 10% to avoid formatting errors in CI later.

翻译一下就是：Claude 写代码大部分时候没啥问题，但总有那 10% 情况会漏个分号、缩进不对、行尾多个空格，最后卡在 CI 上。

那 10% 不值得人去管，交给 hook 跑一次 prettier 就好。

PostToolUse 在工具执行完以后触发，matcher 写 Write 或 Edit：

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/format.sh"
      }]
    }]
  }
}
```

脚本根据文件类型分发：

```bash
#!/bin/bash
FILE_PATH=$(jq -r '.tool_input.file_path' < /dev/stdin)

case "$FILE_PATH" in
  *.ts|*.tsx|*.js) prettier --write "$FILE_PATH" ;;
  *.py) black "$FILE_PATH" ;;
  *.go) gofmt -w "$FILE_PATH" ;;
esac
```

Claude 的上下文窗口就那么大，你让它自己盯着分号缩进的事，就是在烧它的注意力。prettier 两秒钟的事，交给脚本。

### 4.5 Hook 4：自动验证工作（Stop）

Boris 提的另外一个 hook。他的原话是让 agent Stop hook 用来 verify Claude's work more deterministically，翻成人话就是让 hook 去替你验收。

相信大家都遇到过这样的场景，Claude 干完一轮说搞定了你信了，一跑测试全红，lint 报一片错，类型检查又挂。

Stop hook 在 Claude 觉得活干完的那一刻触发，这时候你让它先跑测试，挂了就返回 block 让 Claude 继续干，它就会老老实实回去补。

```bash
#!/bin/bash
if ! pnpm test --silent > /dev/null 2>&1; then
  jq -n '{decision: "block", reason: "Tests failed. Please fix failing tests before stopping."}'
  exit 0
fi

if ! pnpm lint --silent > /dev/null 2>&1; then
  jq -n '{decision: "block", reason: "Lint errors detected. Please fix them."}'
  exit 0
fi

exit 0
```

这个 hook 能生效的底层逻辑，Anthropic 的人提过——Claude 能看到自己代码跑起来的结果，质量据说能翻几倍。

### 4.6 Hook 5：推送到手机

最后一个偏生活场景。跑大重构经常十几分钟起步。有次开会回来发现 Claude 卡在权限请求上卡了半小时，进度条纹丝没动。

后来搞了个飞书推送，Claude 跑完活直接往飞书群发一条。

配置里能直接写 HTTP 请求，都不用写脚本：

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "http",
        "url": "https://open.feishu.cn/open-apis/bot/v2/hook/xxx",
        "headers": {
          "Content-Type": "application/json"
        },
        "timeout": 10
      }]
    }]
  }
}
```

url 那里填飞书机器人的 webhook 就行。不过现在有 remote control，现在大多数时候都在用 remote control。

---

## 5. 快速行动清单

从这个列表里选 5 条，这周就实施：

1. 设置 `cc` 别名
2. 安装 status line 监控 ctx
3. 学会 `/btw` 和 `/rewind`
4. 配置 PostToolUse 自动格式化
5. 配置 SessionStart 自动喂上下文

30 天后再来看，你会发现 Claude Code 已经从"玩具"变成"生产力武器"。

> "大多数工程师优化代码。最快的那些人优化 AI 工作流。这是两种不同的复利优势。"

---

**整合来源：**
1. Claude Code 用到吐血才知道：这5个隐藏命令，直接让你的效率翻3倍！
2. Claude code使用的10个隐藏指令，看完真香
3. 彻底解决 Claude Code 犯蠢问题，最强CC使用技巧分享！
4. 我用错 Claude Code 好几个月，直达这 40 个技巧彻底改变了一切（译）
5. Claude Code之父推荐的5个Hooks，代码质量提升3倍
