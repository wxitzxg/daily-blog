# Claude Code 文章整理设计文档

> 创建日期：2026-04-22

## 目标

将 117 篇 Claude Code 相关文章进行分类归档和主题融合，达到：
- **内容不丢失** - 融合时保留所有有价值信息
- **文章数量减少** - 同主题多篇合并为一篇完整文章
- **方便学习** - 一个主题一篇全面文章，无需东找西找

## 文章现状

- 总数量：117 篇（blog/ 目录 105 篇，20260420/ 目录 12 篇）
- 现状问题：主题分散、内容重叠、查找困难

## 主题分类

### 核心主题（6 个）

| 主题 | 预估文章数 | 说明 |
|------|-----------|------|
| Skills 生态 | ~25篇 | Superpowers、gstack、各类 Skills 推荐 |
| 多智能体编排 | ~10篇 | Agent teams、Ruflo、OpenSwarm、agency-orchestrator |
| 工作流方法论 | ~12篇 | Spec驱动、SDD、最佳实践、claude-code-best-practice |
| 设计/UI 工具链 | ~15篇 | frontend-design、Stitch、Figma、awesome-design-md |
| 知识管理 & 记忆 | ~8篇 | Obsidian、claude-mem、LLM-Wiki、planning-with-files |
| Karpathy 系列 | ~6篇 | Karpathy Skills、LLM-Wiki、推荐的92个信息源 |

### 辅助主题（3 个）

| 主题 | 预估文章数 | 说明 |
|------|-----------|------|
| Claude Code 基础技巧 | ~8篇 | 隐藏命令、设置、init配置 |
| 工具集成 | ~6篇 | Chrome DevTools、Figma MCP、远程控制 |
| 案例实战 | ~8篇 | 小说写作、小程序开发、游戏工作室 |

### 边缘主题（2 个）

| 主题 | 预估文章数 | 处理方式 |
|------|-----------|----------|
| 量化/股票 | ~5篇 | 单独归档，不融合 |
| 行业趋势/观点 | ~3篇 | 单独归档，不融合 |

## 实现流程

### 第一步：元数据提取

对每篇文章提取：
- 关键词标签（3-5个）
- 所属主题分类
- 内容摘要（100-200字）
- 与其他文章的重叠关系

输出：每篇文章添加 YAML frontmatter

### 第二步：分类归档

- 创建主题目录结构
- 移动文章到对应目录
- 建立索引文件

### 第三步：主题融合

对每个核心主题：
1. 读取该主题所有文章
2. 分析内容结构、提取所有有价值段落
3. 设计融合后的文章大纲
4. 按大纲整合内容，去重复、补衔接
5. 产出完整融合文章

融合原则：
- **不删减核心内容** - 保留所有有价值信息
- **去重复** - 相同内容只出现一次
- **逻辑重组** - 按学习路径组织，非简单拼接
- **补充衔接** - 必要处添加过渡说明

### 第四步：最终产出

```
blog/
├── guides/                      # 融合后的完整文章
│   ├── skills-ecosystem.md      # Skills 生态完整指南
│   ├── multi-agent-orchestration.md
│   ├── workflow-methodology.md
│   ├── design-ui-toolchain.md
│   ├── knowledge-management.md
│   ├── karpathy-series.md
│   ├── basic-tips.md
│   ├── tool-integration.md
│   └── case-studies.md
├── archive/                     # 原始文章归档
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
└── index.md                     # 总索引
```

## 数据格式

采用 Markdown + YAML frontmatter：

```markdown
---
title: 文章标题
category: skills-ecosystem
tags: [superpowers, skills]
summary: 内容摘要...
source: blog/original-article.md
---

# 文章内容...
```

## 融合策略

### 核心原则

**同一个工具/方法的多篇文章 → 融合成一篇**

不同出发点讲同一事物的文章，融合时保留所有内容，按逻辑重组。

### 细分逻辑

每个大主题下，按"工具/方法"拆分：

**示例：Skills 生态（~25篇）**
- Superpowers 相关（5篇）→ 融合成 1 篇
- gstack/gbrowser 相关（3篇）→ 融合成 1 篇
- 单个 Skill 推荐（每日一 Skill 系列，8篇）→ 融合成 1 篇精选合集
- Skill 开发实践（4篇）→ 融合成 1 篇
- 其他独立文章 → 单独保留

**示例：工作流方法论（~12篇）**
- Spec驱动相关（4篇）→ 融合成 1 篇
- claude-code-best-practice（2篇）→ 融合成 1 篇
- SDD实践（3篇）→ 融合成 1 篇
- 其他独立文章 → 单独保留

### 融合后预估

| 主题 | 原始篇数 | 预估融合后 |
|------|---------|-----------|
| Skills 生态 | ~25篇 | 4-5篇 |
| 多智能体编排 | ~10篇 | 2-3篇 |
| 工作流方法论 | ~12篇 | 3-4篇 |
| 设计/UI 工具链 | ~15篇 | 3-4篇 |
| 知识管理 & 记忆 | ~8篇 | 2-3篇 |
| Karpathy 系列 | ~6篇 | 2篇 |
| Claude Code 基础技巧 | ~8篇 | 2-3篇 |
| 工具集成 | ~6篇 | 2篇 |
| 案例实战 | ~8篇 | 2-3篇 |
| 边缘主题 | ~8篇 | 保持原样 |

**总计：原始 117 篇 → 融合后约 25-30 篇**

## 执行计划

| 阶段 | 任务 | 产出 |
|------|------|------|
| 1 | 元数据提取 | 每篇文章含 frontmatter |
| 2 | 分类归档 | archive/ 目录结构 |
| 3 | 生成融合大纲 | 融合方案文档（需用户审核） |
| 4 | 主题融合 | guides/ 目录融合文章 |
| 5 | 索引生成 | index.md 总索引 |

### 阶段 3：融合大纲格式

大纲文档包含每个主题的融合方案，格式如下：

```markdown
## Skills 生态

### 融合文章 1：Superpowers 完整指南
来源文章：
- Claude Code最佳搭档Superpowers：14个技能完整拆解
- Claude 插件新组合：Superpowers + Ralph-Loop
- ...

### 融合文章 2：gstack 实战指南
来源文章：
- AI 专用无头浏览器，快11倍、内存省9倍
- ...

### 不融合（单独保留）：
- xxx（原因：内容独立，与其他文章无重叠）

---

## 多智能体编排
...
```

用户审核大纲后，确认或修改，再进入融合阶段。

## 预期成果

- 原始 117 篇 → 融合后约 25-30 篇文章
- 每篇融合文章：聚焦单一工具/方法，内容全面、结构清晰
- 原文保留在 archive/ 供查阅
- 索引文件快速定位
