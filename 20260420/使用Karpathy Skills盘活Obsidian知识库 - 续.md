---
title: "Andrej Karpathy 盘活了我的 Obsidian 知识库"
source: "https://mp.weixin.qq.com/s/3wRbMYH04HpbCh__e4A5PA"
author:
  - "[[学总笔记]]"
published:
created: 2026-04-20
description:
tags:
  - "clippings"
---
学总笔记 *2026年4月19日 08:00*

半年前我写过一篇文章，《为什么 Obsidian 才是个人知识库的最佳选择》。

写完那篇文章之后没多久，我的 Obsidian 知识库就停更了。

## 问题不是工具

我当时设计了一套完整的流程：收集 → 整理 → 存储 → 利用，工具选了又选，插件装了一堆。

但"整理"这个环节谁来做？我自己。

每篇文章读完要提炼要点、打标签、建双链、写摘要——这套做下来比读文章本身还费时间。热情消退之后，inbox 就再也没清过。

这不是我一个人的问题。很多人晒过漂亮的 Obsidian 截图，但很少有人说"我用它查到了什么有用的东西"。

知识库死在维护成本上，不是工具。

## Karpathy 的思路

去年 Karpathy 提了一个想法，大意是：

与其每次查询时让 AI 临时检索拼接（RAG），不如让 AI 把新材料持续编译成一个 wiki，让知识真正沉淀下来。

RAG 的问题是，你问一千次，它就临时组装一千次，知识本身没有积累。

LLM-Wiki 反过来：先把知识编译成结构化条目，之后每次查询都在这个已经沉淀好的网络上检索。

更关键的是：维护 wiki 的是 AI，不是你。

## 我把它跑起来了

先看整体架构，再说怎么用。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

三层结构，一个规则文件：

raw/ ← 原始材料，只进不改

wiki/ ← 编译后的知识，AI 维护

tools/ ← CLI 工具集

AGENTS.md ← AI 的操作手册

## 三个核心命令

配合任何支持 agent 的 IDE 使用——Trae、Cursor、Codex、Claude Code 都行。打开项目，跑起来只需要三件事：

wiki-update — 有新文件进了 raw/，运行这个更新 wiki

你：raw/ 里有新文章，帮我更新 wiki

AI：扫描新文件 → 编译内容 → 合并或新建条目 → 更新索引和日志

wiki-query — 搜索和问答

你：扩散模型和 GAN 的核心区别是什么？

AI：读索引 → 读相关条目 → 给出基于 wiki 的答案 → 存入 outputs/qa/

wiki-dashboard — 查看你的专属 wiki 全貌

你：给我看一下 wiki 现在的状态

AI：展示条目数量、覆盖领域、最近更新、健康问题（断链/孤立页）

## 用起来是什么感觉

读完一篇论文，扔进 raw/，跟 AI 说一句"wiki-update"。

自动分析内容、检查有没有重复条目、合并或新建、更新索引、写入日志。

我什么都不用做。

查询时直接问问题，AI 先读索引，再读相关条目，答案基于沉淀好的 wiki，不是临时拼凑。高质量的回答还会被存进 outputs/qa/，好的可以升级成新的 wiki 条目。

知识在滚雪球，不是在漏沙。

## 现在的样子

跑了几个月，wiki 里有：

•几十个人物、概念、公司、专题条目

•涵盖 AI、产品、自动驾驶等我持续关注的领域

•每次 lint 都能发现一些之前漏掉的关联和问题

第一次感觉知识库是活的。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 拿去用

核心就两样东西：

AGENTS.md 模板 — 把它放进 vault 根目录，AI 就知道按什么规则干活。

tools/ 工具包 — 四个 Python 脚本，依赖极少。

三步上手：

mkdir my-kb && cd my-kb

mkdir raw wiki outputs tools

\# 把文件包解压进来，扔第一篇文章，跟 AI 说"wiki-update"

私信「kb」，完整文件夹发给你。

包含 AGENTS.md 模板、四个脚本、一份示例 vault 结构。

**微信扫一扫赞赏作者**

继续滑动看下一个

学总笔记

向上滑动看下一个