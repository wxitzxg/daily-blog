---
title: "OpenClaw教程04 - 多Agent与生产部署"
source: "https://mp.weixin.qq.com/s/djViaphPT41cpbVNBoNApg"
author:
  - "[[小T]]"
published:
created: 2026-04-02
description: "OpenClaw教程04 - 多Agent与生产部署"
tags:
  - "clippings"
---
原创 小T *2026年3月2日 08:00*

  

前三篇把 openclaw 的安装、平台接入、技能和记忆都走了一遍。这篇是系列最后一篇，专门讲两件事： **多 Agent 架构** ，以及如何把 openclaw 真正用在生产环境里。

如果你只是一个人用、单机跑、不对外暴露，多 Agent 部分可以跳过。但 Docker 部署和安全这两节，每个人都该看看。

## 01一个 Agent 够用吗？

大多数时候，够的。默认的 main Agent 能处理你发给它的所有事情。

但用一段时间后，你可能会遇到这几个问题：

**上下文越来越乱**

同一个 Agent 既帮你写代码、又管 Google 日历，系统提示词就得把两套技能都装进去。写代码时夹杂日历指令，AI 注意力被稀释，回答质量下滑，API 费用也在悄悄上涨。

**性格没法统一**

你希望编程助手严谨精确、少说废话；但希望社交助手像朋友一样聊天、语气轻松。同一个 Agent 很难同时扮演两种截然不同的角色。

**权限管控麻烦**

编程 Agent 需要跑 Shell 命令、访问 GitHub——但你不希望处理群聊消息的 Agent 也有这些权限。万一有人发了带恶意指令的消息触发了 Shell 执行，后果很难看。

**路由不了不同场景**

Discord 的 #coding 频道想要专业技术回复，家庭群想要轻松生活助手——一个 Agent 做不到根据消息来源自动切换行为模式。

多 Agent 就是为了解决这些问题。

## 02openclaw 的多 Agent 架构

openclaw 用的是 **扁平路由模型** ，不是层级管理。没有一个"总管 Agent"来调度其他 Agent，而是 Gateway 直接根据消息来源把消息路由给对应的 Agent。

消息平台（Discord/Telegram/WhatsApp/Slack）  
↓  
Gateway 路由引擎  
↓ ↓ ↓  
main Agent coding Agent social Agent  
（默认兜底） （只加载开发技能） （只加载生活技能）

这个设计很务实：路由是确定性的，不需要再用一个 AI 来判断消息该给谁。少一个中间环节，少一次 API 调用，少一个出错的机会。

每个 Agent 是完全独立的：工作空间、记忆文件、会话历史、认证凭证，全部隔离，互不干扰。

## 03怎么配置多个 Agent

第一步：创建 Agent

openclaw agents add coding  
openclaw agents add social  
openclaw agents add work

每个 Agent 会自动创建独立的工作空间目录（ `~/.openclaw/workspace-coding/` 等），里面有 SOUL.md、MEMORY.md 和 skills 目录。

第二步：写 SOUL.md 定义性格

SOUL.md 是 Agent 的"灵魂文件"，每次会话启动时 AI 都会读取它作为系统指令的一部分。编程 Agent 的示例：

\# coding Agent  
  
你是一个专业的编程助手，专注于帮助用户写代码、调试和架构设计。  
  
\## 性格  
\- 严谨、精确、代码优先  
\- 遇到不确定的问题会主动说"我不确定"  
\- 喜欢用代码示例解释概念  
  
\## 工作规则  
\- 所有代码必须有类型注解  
\- 代码变更前先解释方案，等用户确认再执行  
\- 遇到安全相关的代码要特别谨慎  
  
\## 不要做的事  
\- 不要回答跟编程无关的问题  
\- 不要泄露其他用户的信息

第三步：配置路由规则

在 `~/.openclaw/openclaw.json` 的 agents 字段里，给 Agent 绑定消息平台：

{  
"agents": {  
"defaults": {  
"model": "anthropic:claude-opus-4-6",  
"sandbox": {  
"mode": "non-main" // 非主会话在 Docker 沙箱中运行  
}  
},  
"list": \[  
{  
"agentId": "main",  
"workspace": "~/.openclaw/workspace"  
// 不设 binding，作为默认兜底  
},  
{  
"agentId": "coding",  
"workspace": "~/.openclaw/workspace-coding",  
"model": "anthropic:claude-opus-4-6",  
"temperature": 0.3,  
"skills": {  
"enabled": \["coding-agent", "github", "gh-issues"\]  
},  
"bindings": \[  
{  
"channel": "discord",  
"guildId": "你的服务器ID",  
"channelId": "#coding频道ID"  
}  
\]  
},  
{  
"agentId": "social",  
"workspace": "~/.openclaw/workspace-social",  
"model": "openai:gpt-5.2-mini", // 闲聊用便宜的模型  
"temperature": 0.9,  
"skills": {  
"enabled": \["weather", "goplaces", "summarize"\]  
},  
"bindings": \[  
{  
"channel": "telegram",  
"chatId": "你的群组ID（负数）"  
}  
\]  
}  
\]  
}  
}

消息路由逻辑很简单：先看有没有匹配的 binding，有就路由过去；没有就给 main Agent 兜底。

成本优化：按任务复杂度选模型

多 Agent 架构有一个隐藏福利——可以为不同 Agent 选不同的模型，把钱花在刀刃上：

| Agent | 模型 | 原因 |
| --- | --- | --- |
| `coding` | claude-opus-4-6 | 复杂推理，用最强的 |
| `work` | claude-sonnet-4-6 | 中等复杂，性价比最高 |
| `social` | gpt-5.2-mini | 日常闲聊，用便宜的 |

合理分配模型，同样的任务量可以省下一半以上的 API 费用。

## 04Agent 分工策略

**按职能分工（最常见）**

coding Agent 管代码、office Agent 管邮件日历、social Agent 管社交闲聊。职责清晰，每个 Agent 的上下文干净专注。

**按平台分工**

WhatsApp Agent 处理家人群，Slack Agent 处理工作消息，Discord Agent 处理开源社区。适合不同平台用途完全不同的场景。

**按安全等级分工**

trusted Agent 有完整权限只接受你的私聊，limited Agent 有限权限处理群聊，readonly Agent 只读权限处理公开频道。安全意识强的用户推荐这个策略。

**流水线协作**

research Agent → writing Agent → review Agent，每个 Agent 负责一个阶段，通过共享文件或 sessions\_send 工具串联，可以用定时任务自动驱动。

## 05Agent 之间怎么通信

流水线协作需要 Agent 互相传数据，有三种方式。

共享文件（最简单）

在两个 Agent 的 SOUL.md 里都指向同一个公共目录：

\## 共享数据  
需要传给其他 Agent 的内容，写到 ~/.openclaw/shared/ 目录。  
读取其他 Agent 的输出也从这个目录读取。

定时任务串联（适合流水线）

在 openclaw.json 里配两个任务，让 research 先跑、writer 后跑：

{  
"schedules": \[  
{  
"name": "collect-research",  
"cron": "0 9 \* \* 1-5",  
"agentId": "research",  
"prompt": "搜索今天的行业新闻，整理摘要，保存到 ~/.openclaw/shared/daily-news.md"  
},  
{  
"name": "write-briefing",  
"cron": "30 9 \* \* 1-5",  
"agentId": "writer",  
"prompt": "读取 ~/.openclaw/shared/daily-news.md，写一篇简报，发到 Slack #news 频道"  
}  
\]  
}

research Agent 9:00 跑完，writer Agent 9:30 接着读文件写稿，通过共享文件完成接力。

Sessions 工具（直接通信）

openclaw 内置了四个 Sessions 工具，让 Agent 之间可以直接发消息：

| 工具 | 功能 |
| --- | --- |
| `sessions_list` | 发现当前有哪些活跃的 Agent 会话 |
| `sessions_history` | 查看某个会话的历史记录 |
| `sessions_send` | 向另一个 Agent 发消息： **ping-pong** （发消息等回复，适合来回协商）或 **announce** （单向通知不等回复，适合流水线传递） |
| `sessions_spawn` | 动态生成一个新的 Agent 会话 |

Sessions 工具是写在技能里的，让 Agent 自主决定什么时候通知同伴。比如 coding Agent 完成代码审查后，用 sessions\_send（announce 模式）通知 writer Agent 可以开始写报告了，整个流程不需要你手动中转。

**调试多 Agent 的小技巧**

直接在浏览器 URL 里加`?agent=agentId` ，不用配消息平台就能跟指定 Agent 对话：  
  
`http://localhost:18789/chat?agent=coding` `http://localhost:18789/chat?agent=social`

逐个测试每个 Agent 的行为，比在真实平台上反复发消息调试省事多了。

![多Agent架构图解](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 06Docker 部署：为什么值得

本地开发直接装就行，但如果你想把 openclaw 跑在服务器上，Docker 是正确答案。

**环境一致性** — 本地能跑的，服务器上一定能跑。Node.js 版本、系统依赖、配置文件全部打包在一起，不再有"我这里没问题"的经典场景。 **数据安全** — Docker Volume 把数据存在宿主机上，容器重建后数据还在。更新镜像不会丢配置。 **Agent 沙箱** — 通过 `sandbox.mode: "non-main"` 配置，非主会话的 Agent 工具执行自动在独立 Docker 容器里隔离运行，不会影响宿主机。 **回滚方便** — 升级出问题直接切回上一个镜像版本，数据都在 Volume 里不受影响。

### 基础版 docker-compose.yml

version: "3.8"  
  
services:  
openclaw-gateway:  
image: openclaw/openclaw:latest  
container\_name: openclaw-gateway  
ports:  
\- "127.0.0.1:18789:18789" # 只监听本地，不直接暴露公网  
volumes:  
\- openclaw-data:/home/node/.openclaw  
\- openclaw-workspace:/home/node/.openclaw/workspace  
environment:  
\- OPENCLAW\_GATEWAY\_TOKEN=${OPENCLAW\_GATEWAY\_TOKEN}  
\- NODE\_ENV=production  
restart: unless-stopped  
healthcheck:  
test: \["CMD", "curl", "-f", "http://localhost:18789/health"\]  
interval: 30s  
timeout: 10s  
retries: 3  
  
volumes:  
openclaw-data:  
openclaw-workspace:

搭配`.env` 文件：

OPENCLAW\_GATEWAY\_TOKEN=用 openssl rand -hex 32 生成一个随机 Token  
OPENAI\_API\_KEY=sk-proj-xxxxx  
ANTHROPIC\_API\_KEY=sk-ant-xxxxx

常用命令：

docker compose up -d # 后台启动  
docker compose ps # 查看状态  
docker compose logs -f # 实时查看日志  
docker compose pull && docker compose up -d # 更新版本

不想手动更新？加一个 Watchtower 服务，它会自动检测新镜像并重启：

services:  
watchtower:  
image: containrrr/watchtower  
volumes:  
\- /var/run/docker.sock:/var/run/docker.sock  
environment:  
\- WATCHTOWER\_CLEANUP=true  
\- WATCHTOWER\_POLL\_INTERVAL=86400 # 每 24 小时检查一次  
restart: unless-stopped

加完 `docker compose up -d` 之后就不用管了，openclaw 出新版本会自动更新。

### 远程访问方案

Gateway 默认只绑定 `127.0.0.1` ，外部无法直接访问。三个方案：

**SSH 隧道（临时访问）**

ssh -L 18789:127.0.0.1:18789 user@your-server  
\# 然后本地访问 http://127.0.0.1:18789/

**Tailscale（长期推荐）**

在服务器和本地都装 Tailscale，通过私有网络访问，自动加密，零配置。

**Nginx 反向代理（对外服务）**

server {  
listen 443 ssl http2;  
server\_name openclaw.yourdomain.com;  
  
ssl\_certificate /etc/letsencrypt/live/openclaw.yourdomain.com/fullchain.pem;  
ssl\_certificate\_key /etc/letsencrypt/live/openclaw.yourdomain.com/privkey.pem;  
  
location / {  
proxy\_pass http://127.0.0.1:18789;  
proxy\_http\_version 1.1;  
proxy\_set\_header Upgrade $http\_upgrade;  
proxy\_set\_header Connection "upgrade";  
proxy\_set\_header Host $host;  
proxy\_read\_timeout 300s;  
}  
}

![安全五层架构](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 07安全：不能偷懒的部分

openclaw 不是普通聊天机器人。它能读写文件、执行 Shell 命令、调用 API、发送消息——它拥有你赋予它的一切权限。配置不当的后果可能很严重：API Key 被人拿去刷额度、恶意消息触发危险命令执行、未授权用户控制你的 Agent。

openclaw 的安全设计分五层：

第1层：网络边界 → TLS 1.3 / 防火墙 / IP 白名单  
第2层：认证与授权 → Gateway Token / DM 配对系统  
第3层：输入验证 → 提示词护栏 / 消息过滤  
第4层：执行隔离 → Docker 沙箱 / 文件系统隔离  
第5层：审计监控 → 操作日志 / 异常检测

每一层独立防护，即使某层被突破，下一层还能兜住。

### DM Pairing 配对系统（普通用户必看）

配对系统控制谁能给你的 Agent 发私信。默认策略是 `"pairing"` ：陌生人发消息时，Agent 会回复一个配对码，你需要手动批准才能建立通信。

openclaw pairing list # 查看待配对请求  
openclaw pairing approve <channel> <code> # 批准  
openclaw pairing reject <contact> # 拒绝  
openclaw pairing list --approved # 查看已批准的联系人

不要改成 `"open"` （允许所有人）——除非你的 openclaw 跑在完全可信的封闭环境里，否则这等于把 AI 助手的控制权开放给所有人。

运行 `openclaw doctor` 可以一键检查配对系统、Gateway 认证、沙箱设置、文件权限是否都配置正确。

### Gateway Token（必须设置）

没有认证的 Gateway 任何人都能连。用环境变量设置，不要明文写在配置文件里：

export OPENCLAW\_GATEWAY\_TOKEN=$(openssl rand -hex 32)

### API Key 安全

永远不要把 API Key 硬编码在配置文件里。正确姿势是环境变量：

export OPENAI\_API\_KEY="sk-proj-xxxxx"  
export ANTHROPIC\_API\_KEY="sk-ant-xxxxx"

配置文件设置严格的文件权限：

chmod 600 ~/.openclaw/openclaw.json  
chmod 600 ~/.openclaw/.env

建议每 90 天轮换一次 Key，怀疑泄露时立即去提供商后台撤销并重新生成。

### 文件访问权限

生产环境建议开启 `defaultPolicy: deny` ，没有明确允许的路径一律禁止 Agent 访问：

{  
"filesystem": {  
"defaultPolicy": "deny",  
"rules": \[  
{  
"path": "~/.openclaw/workspace",  
"permissions": \["read", "write", "create", "delete"\]  
},  
{  
"path": "~/Documents",  
"permissions": \["read"\]  
},  
// 明确禁止访问敏感目录  
{ "path": "~/.ssh", "permissions": \[\] },  
{ "path": "~/.openclaw/.env", "permissions": \[\] }  
\]  
}  
}

### 沙箱配置

沙箱确保 Agent 执行的代码和命令被隔离在受控环境里，不会影响宿主机：

{  
"agents": {  
"defaults": {  
"sandbox": {  
"mode": "non-main" // 非主会话在 Docker 沙箱中运行  
// "always" — 所有会话都在沙箱中  
// "never" — 禁用（仅限开发调试）  
}  
}  
}  
}

生产环境用 `"non-main"` 就够了：主会话保持正常执行速度，子会话（Agent 派生的工具执行）在 Docker 容器里隔离运行。

## 08高频问题精华

**Q: AI 不记得之前说过的话？**

检查 `~/.openclaw/workspace/MEMORY.md` 是否存在和有内容。主动告诉 AI"记住：xxx"，它会把信息写入记忆文件。也可以直接编辑 MEMORY.md 手动填入重要信息。

**Q: 消息延迟严重？**

先看日志找到慢在哪个环节： `openclaw logs --tail 20` 。通常原因是用了太强的模型（Opus 很慢）、技能加载太多（Token 多推理慢），或者网络延迟。开启流式响应可以改善体验：

`openclaw config set streaming.enabled true` **Q: API 费用太高？**

社交 Agent 换用便宜的 gpt-5.2-mini，费用降 10 倍；减少每个 Agent 加载的技能数量；设置每日预算上限： `openclaw config set budget.dailyLimit 5.00` ；本地任务考虑 Ollama 跑本地模型，零 API 费用。

**Q: 国内 API 访问不了？**

两个方案：一是配代理（ `export HTTPS_PROXY="http://127.0.0.1:7890"` ），二是用国产模型（通义千问 / DeepSeek / Kimi），不需要代理、中文能力强、价格便宜：

`openclaw config set providers.deepseek.apiKey "sk-xxxxx"` `openclaw config set defaultModel "deepseek:deepseek-chat"` **Q: WhatsApp 频繁断开？**

WhatsApp Web 协议要求手机端保持在线。把 Gateway 安装为系统服务（ `openclaw daemon` ），同时确保手机上的 WhatsApp 没被省电模式限制后台运行。建议用专门的手机号来跑 openclaw。

## 09部署最小安全清单

每次上线前过一遍：

☐ Gateway Token 已设置（环境变量）

☐ API Key 使用环境变量，不在配置文件明文存储

☐ DM 配对系统已启用（ `dmPolicy: "pairing"` ）

☐ Gateway 绑定 `127.0.0.1` （不直接暴露公网端口）

☐ 配置文件权限设为 `600`

☐ 沙箱已启用（ `sandbox.mode: "non-main"` ）

☐ 文件访问权限已配置（ `defaultPolicy: "deny"` ）

☐ 跑过 `openclaw doctor` 确认无误

## 10全系列回顾

四篇下来，从零到生产，openclaw 的核心用法基本都覆盖了：

**第 01 篇** 认识 openclaw 是什么、本地安装和快速上手

**第 02 篇** 接入 WhatsApp、Telegram、Discord 等消息平台

**第 03 篇** 技能系统的用法和扩展、三层记忆架构

**第 04 篇** 多 Agent 分工协作、Docker 生产部署、安全配置

openclaw 还在快速迭代，ClawHub 上的技能库也在持续丰富。如果你在配置过程中遇到问题，GitHub Issues 和 Discord 社区都很活跃。

系列完结了，你最感兴趣的是哪部分？

多 Agent 架构 / Docker 部署 / 安全配置 / 技能记忆系统——在评论区聊聊，如果有足够多人感兴趣某个话题，我会单独写一篇深度文章。

继续滑动看下一个

TL的AI 笔记

向上滑动看下一个