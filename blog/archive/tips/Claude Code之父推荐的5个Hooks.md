---
title: "Claude Code 之父：推荐 5 个 Hooks，代码质量提升 3 倍"
source: "https://mp.weixin.qq.com/s/5lqlol132tSql0QoHYkokQ"
author:
  - "[[老陈Ryan]]"
published:
created: 2026-04-20
description:
category: tips
tags: [hooks, claude-code, 自动化, 代码质量, 工程实践]
summary: Claude Code创始人Boris推荐的5个实用Hooks配置：SessionStart自动喂上下文、PreToolUse拦截危险命令、PostToolUse代码自动格式化、Stop自动验证工作、推送到手机通知。通过这些hooks，可以让Claude Code作为基础设施稳定运行，避免覆盖文件、误删代码等问题，显著提升代码质量。
---
老陈Ryan *2026年4月13日 06:26*

哈喽，大家好，我是老陈。

前两天是真出了点状况——Claude 差点把我一个没保存的文件覆盖掉，吓出一身冷汗。

为了避免再次发生这种情况，开始老老实实翻文档。

翻的时候顺便刷了 Boris 的 X，Boris 是 Claude Code 创始人，他发的很多内容都挺有建设性。

他自己 hooks 没装几个，但装的都挺有意思。

我抄了一圈，砍掉一半，留下 5 个每天都在用。

## hook 是干嘛的

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其实没啥神秘的，你每次让 Claude 跑命令、写文件、改东西，它本来都会停下来让你确定或者问你一些权限。

点多了人就麻了，后面出事就是因为这个。

hooks 的意思是把那些判断提前写成脚本，该拦的它自动拦，人只在关键地方介入。

Boris 有句话我记下来了——把 Claude Code 当基础设施用，不要当魔法。

hooks 大概就是这个基础设施的水泥。

hooks 总共 27 种。粗分三类，工具执行前后的、会话开始结束的、还有决策相关的。

我下面讲的 5 个分别落在这三类里面。

## 1：会话开场自动喂上下文

我以前每次开 Claude Code 都要敲一遍差不多的话，让它看看当前分支、看看最近几个 commit、看看 TODO 文件。

每次都这样，烦得要死。

SessionStart hook 就是干这个的。

Claude 启动的那一刻，hook 自动跑一遍脚本，把这些信息直接塞进它的上下文里。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Boris 的 GitHub 配置仓库里第一个 hook 就是这个。配置大概长这样：

```
{"hooks":{"SessionStart":[{"hooks":[{"type":"command","command":"$CLAUDE_PROJECT_DIR/.claude/hooks/load-context.sh"}]}]}}
```

对应的脚本也很朴素：

```
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

所以你只要 echo 出来的内容，Claude 下一秒就能看到。

装完以后冷启动时间基本归零。

以前要来回问两三轮才能让 Claude 搞清楚状态，现在一打开它就知道上次干到哪了。

## 2：拦截危险命令

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Claude 有时候会自作主张。

我之前见过它跑 rm -rf 清理目录，也见过它改.env 文件把本地的数据库连接串给覆盖了。

当时都是手动点允许点到麻木的结果。

为了避免 Claude 删库跑路，研究了一下 PreToolUse，专门处理这种事。

它在任何工具执行之前触发，可以 allow 可以 deny 可以 ask，还可以改写输入参数。

阻止 rm -rf 的脚本大概这样：

```
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command' < /dev/stdin)

if echo"$COMMAND" | grep -qE 'rm\s+-rf'; 
then  jq -n '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: "Destructive rm -rf blocked by hook"}}'
else
  exit 0 
fi
```

配置里 matcher 写 Bash 就行：

```
{"hooks":{"PreToolUse":[{"matcher":"Bash","hooks":[{"type":"command","command":"$CLAUDE_PROJECT_DIR.claude/hooks/block-rm.sh"}]}]}}
```

v2.0.10 之后 PreToolUse 还多了个能力，可以在返回值里加 updatedInput 字段直接改写参数。比如 Claude 想跑 rm -rf./，你可以改成 rm -rf./dist 缩小爆炸半径，不用直接拦截它。这个比较新，大部分文章还没提。

比如 Claude 想跑 rm -rf./，你可以改成 rm -rf./dist 缩小爆炸半径，不用直接拦截它。

Boris 本人还用 PreToolUse 做了另一件事——记录每一个 bash 命令，相当于审计日志。

我也抄过来了，哪天要回溯 Claude 到底干了啥都能查。

## 3：代码自动格式化

这是 Boris 本人公开强烈推荐的 hook，他的原话：

> We use a PostToolUse hook to format Claude's code. Claude usually generates well-formatted code out of the box, and the hook handles the last 10% to avoid formatting errors in CI later.

翻译一下就是：Claude 写代码大部分时候没啥问题，但总有那 10% 情况会漏个分号、缩进不对、行尾多个空格，最后卡在 CI 上。

那 10% 不值得人去管，交给 hook 跑一次 prettier 就好。

PostToolUse 在工具执行完以后触发，matcher 写 Write 或 Edit：

```
{"hooks":{"PostToolUse":[{"matcher":"Write|Edit",
"hooks":[{"type":"command","command":"$CLAUDE_PROJECT_DIR.claude/hooks/format.sh"}]}]}}
```

脚本根据文件类型分发：

```
#!/bin/bash
FILE_PATH=$(jq -r '.tool_input.file_path' < /dev/stdin)

case "$FILE_PATH" in *.ts|*.tsx|*.js) prettier --write "$FILE_PATH" ;; *.py) black "$FILE_PATH" ;; *.go) gofmt -w "$FILE_PATH" ;; esac
```

Claude 的上下文窗口就那么大，你让它自己盯着分号缩进的事，就是在烧它的注意力。

prettier 两秒钟的事，交给脚本。

## 4：自动验证工作

这是 Boris 提的另外一个。

他的原话是让 agent Stop hook 用来 verify Claude's work more deterministically，翻成人话就是让 hook 去替你验收。

相信大家都遇到过这样的场景，Claude 干完一轮说搞定了你信了，一跑测试全红，lint 报一片错，类型检查又挂。

Stop hook 在 Claude 觉得活干完的那一刻触发，这时候你让它先跑测试，挂了就返回 block 让 Claude 继续干，它就会老老实实回去补。

```
#!/bin/bash
if ! pnpm test --silent > /dev/null 2>&1; then jq -n '{decision: "block", reason: "Tests failed. Please fix failing tests before stopping."}'  exit 0 fi

if ! pnpm lint --silent > /dev/null 2>&1; then jq -n '{decision: "block", reason: "Lint errors detected. Please fix them."}'  exit 0 fi

exit 0
```

这个 hook 能生效的底层逻辑，我之前看 Anthropic 的人提过——Claude 能看到自己代码跑起来的结果，质量据说能翻几倍。

我一开始半信半疑，后来装上以后确实感觉 bug 少了一截。

反正你也不用嘴巴催它检查，脚本替你催就行。

## 5：推送到手机

最后一个偏生活场景。

跑大重构经常十几分钟起步。我有次开会回来发现 Claude 卡在权限请求上卡了半小时，进度条纹丝没动，当场想掀桌。

后来我搞了个飞书推送，Claude 跑完活直接往飞书群发一条。

配置里能直接写 HTTP 请求，都不用写脚本：

```
{"hooks":{"Stop":[{"hooks":[{"type":"http","url":"https://open.feishu.cn/open-apis/bot/v2/hook/xxx","headers":{"Content-Type":"application/json"},"timeout":10}]}]}}
```

url 那里填飞书机器人的 webhook 就行。

不过现在有 remote control，我现在大多数时候都在用 remote control，飞书这个 hook 弃了。

还有其他好用的 hook 用法吗，评论区一起交流～

未来已来，Enjoy AI！

— END —  
👇 欢迎点赞、在看、转发

AI · 目录

继续滑动看下一个

老陈AI生活

向上滑动看下一个