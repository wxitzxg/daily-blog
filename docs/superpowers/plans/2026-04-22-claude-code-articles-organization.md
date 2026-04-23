# Claude Code 文章整理实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 117 篇 Claude Code 文章分类归档并融合成 25-30 篇完整文章，保留所有内容，方便学习。

**Architecture:** 分 5 阶段执行：元数据提取 → 分类归档 → 生成融合大纲（用户审核） → 主题融合 → 索引生成。每篇文章添加 YAML frontmatter，原文归档到 archive/，融合文章输出到 guides/。

**Tech Stack:** Markdown, YAML, Shell (文件操作), Python (可选：批量处理脚本)

---

## 文件结构

**创建的目录和文件：**
```
blog/
├── archive/                     # 原始文章归档（新建）
│   ├── skills/
│   ├── agents/
│   ├── workflow/
│   ├── design/
│   ├── knowledge/
│   ├── karpathy/
│   ├── tips/
│   ├── integration/
│   ├── cases/
│   ├── quant/
│   └── trends/
├── guides/                      # 融合文章（新建）
├── merge-outline.md             # 融合大纲（新建，需用户审核）
└── index.md                     # 总索引（新建）
```

**修改的文件：**
- `blog/*.md` - 每篇文章添加 YAML frontmatter
- `20260420/*.md` - 每篇文章添加 YAML frontmatter

---

## Task 1: 创建目录结构

**Files:**
- Create: `blog/archive/` (及子目录)
- Create: `blog/guides/`

- [ ] **Step 1: 创建 archive 子目录**

```bash
mkdir -p blog/archive/{skills,agents,workflow,design,knowledge,karpathy,tips,integration,cases,quant,trends}
```

- [ ] **Step 2: 创建 guides 目录**

```bash
mkdir -p blog/guides
```

- [ ] **Step 3: 验证目录结构**

```bash
ls -la blog/archive/ && ls -la blog/guides/
```

Expected: 显示新创建的目录

---

## Task 2: 提取文章列表

**Files:**
- Create: `docs/article-list.txt` (临时文件，记录所有文章路径)

- [ ] **Step 1: 生成文章列表**

```bash
find blog 20260420 -name "*.md" -type f | sort > docs/article-list.txt
```

- [ ] **Step 2: 验证文章数量**

```bash
wc -l docs/article-list.txt
```

Expected: 117 行（对应 117 篇文章）

---

## Task 3: 批量提取元数据（分批处理）

**Files:**
- Modify: 每篇文章添加 frontmatter

由于文章数量多（117 篇），分批处理。每批 10-15 篇。

### 子任务 3.1: 提取第一批文章元数据（blog/ A-F）

- [ ] **Step 1: 读取 blog/ 目录下 A-F 开头的文章**

使用 Agent 读取以下文章并提取元数据：
- 关键词标签（3-5个）
- 所属主题分类
- 内容摘要（100-200字）

- [ ] **Step 2: 为每篇文章添加 YAML frontmatter**

示例格式：
```markdown
---
title: 原文章标题
category: skills-ecosystem
tags: [superpowers, skills, claude-code]
summary: 本文介绍 Superpowers 的 14 个核心技能...
---

# 原文章内容...
```

### 子任务 3.2: 提取第二批文章元数据（blog/ G-L）

同上流程。

### 子任务 3.3: 提取第三批文章元数据（blog/ M-R）

同上流程。

### 子任务 3.4: 提取第四批文章元数据（blog/ S-Z）

同上流程。

### 子任务 3.5: 提取第五批文章元数据（20260420/ 目录）

同上流程。

---

## Task 4: 分类归档 - 移动文章到 archive/

**Files:**
- Move: `blog/*.md` → `blog/archive/<category>/`
- Move: `20260420/*.md` → `blog/archive/<category>/`

- [ ] **Step 1: 根据 frontmatter 中的 category 字段移动文章**

使用脚本批量移动：

```bash
#!/bin/bash
# move-to-archive.sh
for file in blog/*.md 20260420/*.md; do
  if [ -f "$file" ]; then
    category=$(grep "^category:" "$file" | head -1 | cut -d: -f2 | tr -d ' ')
    if [ -n "$category" ]; then
      mv "$file" "blog/archive/$category/"
    fi
  fi
done
```

- [ ] **Step 2: 验证移动结果**

```bash
find blog/archive -name "*.md" -type f | wc -l
```

Expected: 117 篇（或接近，排除 Info.md 等非正文文件）

---

## Task 5: 生成融合大纲

**Files:**
- Create: `blog/merge-outline.md`

- [ ] **Step 1: 分析每个主题下的文章**

读取每个 archive 子目录下的文章，分析：
- 文章标题和摘要
- 讲述的工具/方法
- 与其他文章的重叠关系

- [ ] **Step 2: 生成融合大纲文档**

输出格式：
```markdown
# 文章融合大纲

> 生成日期：2026-04-22
> 状态：待用户审核

## Skills 生态（archive/skills/）

### 融合文章 1：Superpowers 完整指南
**来源文章（5篇）：**
- Claude Code最佳搭档Superpowers：14个技能完整拆解
- Claude 插件新组合：Superpowers + Ralph-Loop
- ...（其他文章名）

### 融合文章 2：gstack 实战指南
**来源文章（3篇）：**
- AI 专用无头浏览器，快11倍、内存省9倍
- ...

### 不融合（单独保留）：
- xxx（原因：内容独立，与其他文章无重叠）

---

## 多智能体编排（archive/agents/）
...

---

## 用户确认

请审核以上融合方案，确认后回复"确认执行"开始融合。
```

- [ ] **Step 3: 提交大纲供用户审核**

输出：将 `blog/merge-outline.md` 内容展示给用户，等待审核确认。

**注意：此任务完成后必须等待用户确认，才能继续执行 Task 6。**

---

## Task 6: 主题融合 - 按大纲执行

**Files:**
- Create: `blog/guides/*.md` (融合后的文章)

**前提条件：** 用户已审核并确认 `blog/merge-outline.md`

### 子任务 6.1: 融合 Skills 生态主题

- [ ] **Step 1: 读取融合文章 1 的所有来源文章**

- [ ] **Step 2: 分析内容结构，提取所有有价值段落**

- [ ] **Step 3: 设计融合后文章大纲**

按学习路径组织：
1. 概述/入门
2. 核心概念
3. 详细用法
4. 实战案例
5. 踩坑经验

- [ ] **Step 4: 整合内容，去重复，补衔接**

- [ ] **Step 5: 写入融合文章**

文件：`blog/guides/superpowers-guide.md`

- [ ] **Step 6: 验证融合文章**

检查：内容是否完整，逻辑是否通顺

- [ ] **Step 7: 重复以上步骤完成该主题其他融合文章**

### 子任务 6.2: 融合多智能体编排主题

同上流程。

### 子任务 6.3: 融合工作流方法论主题

同上流程。

### 子任务 6.4: 融合设计/UI 工具链主题

同上流程。

### 子任务 6.5: 融合知识管理 & 记忆主题

同上流程。

### 子任务 6.6: 融合 Karpathy 系列主题

同上流程。

### 子任务 6.7: 融合 Claude Code 基础技巧主题

同上流程。

### 子任务 6.8: 融合工具集成主题

同上流程。

### 子任务 6.9: 融合案例实战主题

同上流程。

---

## Task 7: 生成总索引

**Files:**
- Create: `blog/index.md`

- [ ] **Step 1: 生成索引文档**

```markdown
# Claude Code 文章索引

> 最后更新：2026-04-22

## 融合文章（guides/）

### Skills 生态
- [Superpowers 完整指南](guides/superpowers-guide.md)
- [gstack 实战指南](guides/gstack-guide.md)
- ...

### 多智能体编排
- [Agent Teams 入门到精通](guides/agent-teams-guide.md)
- ...

### 工作流方法论
- ...

### 设计/UI 工具链
- ...

### 知识管理 & 记忆
- ...

### Karpathy 系列
- ...

### Claude Code 基础技巧
- ...

### 工具集成
- ...

### 案例实战
- ...

---

## 原始文章归档（archive/）

按主题分类保存，供查阅：
- [skills/](archive/skills/) - Skills 生态相关
- [agents/](archive/agents/) - 多智能体编排相关
- ...

---

## 边缘主题

- [量化/股票](archive/quant/)
- [行业趋势](archive/trends/)
```

- [ ] **Step 2: 验证索引链接**

检查所有链接对应的文件是否存在。

---

## Task 8: 最终验证

- [ ] **Step 1: 统计融合文章数量**

```bash
ls -la blog/guides/*.md | wc -l
```

Expected: 25-30 篇

- [ ] **Step 2: 统计归档文章数量**

```bash
find blog/archive -name "*.md" -type f | wc -l
```

Expected: 117 篇（原文全部保留）

- [ ] **Step 3: 抽查融合文章质量**

随机选取 2-3 篇融合文章，检查：
- 内容是否完整（无丢失）
- 结构是否清晰
- 是否有明显重复段落

- [ ] **Step 4: 清理临时文件**

```bash
rm -f docs/article-list.txt
```

---

## 验收标准

1. **内容完整性**：融合文章保留所有来源文章的有价值信息
2. **数量达标**：原始 117 篇 → 融合后 25-30 篇
3. **结构清晰**：每篇融合文章按学习路径组织，非简单拼接
4. **原文可查**：所有原文保留在 archive/ 目录
5. **索引完备**：index.md 提供完整的导航
