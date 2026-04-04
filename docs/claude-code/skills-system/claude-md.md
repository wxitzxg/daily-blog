---
sidebar_position: 8
---

# CLAUDE.md 编写指南

> 让 Claude 自己学会项目规则

## 核心理念

CLAUDE.md 是项目级的规则配置文件。让 Claude 在开始工作前就了解项目的规范、结构和要求，而不是每次都要重复提醒。

## 为什么重要

| 没有 CLAUDE.md | 有 CLAUDE.md |
|----------------|--------------|
| 每次都要说明规范 | 自动遵守 |
| 代码风格不一致 | 风格统一 |
| 重复解释项目结构 | 理解项目 |
| 容易踩坑 | 避免常见错误 |

## CLAUDE.md 结构

```markdown
# [项目名] 项目规则

## 项目概述
- 项目类型
- 核心功能
- 技术栈

## 代码规范
- 语言规范
- 命名规则
- 注释要求

## 项目结构
```
/src
  /components
  /services
  /utils
```

## 禁止事项
- 不允许的操作

## 必须事项
- 必须遵守的规则

## 常用命令
- 开发命令
- 测试命令
- 构建命令
```

## 最佳实践

### 1. 核心要素

```markdown
## 技术栈
- Vue 3 + TypeScript
- Vite 5
- Pinia

## 代码规范
- 组件名: PascalCase
- 样式: Scoped CSS
- API: RESTful
```

### 2. 具体禁止

```markdown
## 禁止事项
- 禁止直接修改 node_modules
- 禁止提交 console.log
- 禁止使用 any 类型
```

### 3. 验收标准

```markdown
## 提交前检查
- [ ] 测试通过
- [ ] 类型检查通过
- [ ] 代码格式化
```

## 高级技巧

### 自动生成

使用 `/generate-claude-md` 让 Claude 自动分析项目生成：

```
/generate-claude-md
```

它会：
1. 扫描项目结构
2. 分析 package.json
3. 检查现有代码风格
4. 生成 CLAUDE.md

### 多文件配置

```
/
├── CLAUDE.md          # 根目录，全局规则
├── frontend/
│   └── CLAUDE.md      # 前端特定规则
└── backend/
    └── CLAUDE.md      # 后端特定规则
```

## 行动清单

- [ ] 为当前项目创建 CLAUDE.md
- [ ] 添加代码规范
- [ ] 添加项目结构说明
- [ ] 添加常用命令

## 延伸阅读

- [别再手写 CLAUDE.md 了](https://github.com)
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)