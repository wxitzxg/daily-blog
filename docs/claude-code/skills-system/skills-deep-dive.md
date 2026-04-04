---
sidebar_position: 4
---

# Skills 系统详解

> Skills 是 Claude Code 的核心竞争力——封装可复用的专业能力

## 核心理念

Skill（技能）= **角色定义 + 工具集 + 工作流程**

一个好的 Skill 可以：
- 封装专业领域的处理方式
- 复用最佳实践
- 保证输出一致性

## Skill 结构

```yaml
name: 代码审查
description: 专业的代码审查技能

# 角色定义
role: |
  你是一个资深代码审查专家，
  擅长发现代码中的问题并提供改进建议。

# 工具集
tools:
  - read_file
  - grep
  - bash

# 工作流程
workflow:
  1. 理解代码功能
  2. 检查代码规范
  3. 识别潜在问题
  4. 提供改进建议
```

## 内置 Skills

Claude Code 自带一系列内置 Skills：

| Skill | 功能 | 使用场景 |
|-------|------|----------|
| `Write` | 代码生成 | 写新功能时 |
| `Review` | 代码审查 | 代码检查 |
| `Debug` | 调试排错 | 修复 bug |
| `Test` | 测试生成 | 补充测试 |
| `Explain` | 代码解释 | 学习理解 |
| `Refactor` | 代码重构 | 优化代码 |

## 自定义 Skill

### 场景：创建一个 PRD 写作 Skill

**第一步：定义角色**
```markdown
# PRD 写作专家

你是一个资深产品经理，擅长撰写高质量的 PRD（产品需求文档）。

## 你的能力
- 清晰描述功能需求
- 考虑边界情况和异常流程
- 提供可衡量的验收标准

## 输出格式
使用以下结构：
1. 需求背景
2. 用户故事
3. 功能描述
4. 验收标准
5. 优先级
```

**第二步：封装为 Skill**
```
Skill: pmd-writing
├── role.md       # 角色定义
├── tools/        # 工具集
├── templates/    # 模板
└── workflow.md   # 工作流程
```

**第三步：使用**
```
使用 PRD 写作技能，帮我写一个用户登录模块的需求文档
```

## 最佳实践

### 1. Skill 颗粒度

**❌ 太粗**
```yaml
name: 全栈开发
# 太大，什么都包含
```

**✅ 适中**
```yaml
name: 前端组件开发
# 专注前端组件，职责清晰
```

**✅ 够细**
```yaml
name: Vue3 组件开发
# 只针对 Vue3 组件，目标明确
```

### 2. 角色定义技巧

```markdown
# ❌ 模糊
你是一个程序员，擅长写代码。

# ✅ 明确
你是一个 TypeScript 专家，擅长：
- 类型系统设计
- 类型安全实践
- 类型推断优化
```

### 3. 输出模板

```markdown
## 输出格式
生成代码必须包含：
1. TypeScript 类型定义
2. JSDoc 注释
3. 单元测试
4. 使用示例
```

## 行动清单

- [ ] 了解内置的 6 个 Skills
- [ ] 创建一个自定义 Skill
- [ ] 将常用工作流封装为 Skill

## 延伸阅读

- [claude-code-best-practice - Skills](https://github.com/shanraisshan/claude-code-best-practice)
- [6个skill实现产品经理的一天](https://github.com)