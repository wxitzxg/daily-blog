---
sidebar_position: 7
---

# 命令体系实战

> 掌握这些命令，效率提升 10 倍

## 核心理念

Claude Code 提供了一系列命令（Commands），让你快速调用特定功能。这些命令是提升效率的关键。

## 常用命令一览

### 核心命令

| 命令 | 功能 | 使用频率 |
|------|------|----------|
| `/help` | 查看所有命令 | ⭐⭐⭐⭐⭐ |
| `/review` | 代码审查 | ⭐⭐⭐⭐⭐ |
| `/test` | 生成测试 | ⭐⭐⭐⭐⭐ |
| `/clear` | 清除上下文 | ⭐⭐⭐⭐ |
| `/compact` | 压缩上下文 | ⭐⭐⭐⭐ |
| `/ls` | 查看当前文件 | ⭐⭐⭐ |
| `/cat` | 查看文件内容 | ⭐⭐⭐ |
| `/glob` | 搜索文件 | ⭐⭐⭐ |

### 进阶命令

| 命令 | 功能 |
|------|------|
| `/think` | 让 AI 深入思考 |
| `/summarize` | 总结对话 |
| `/export` | 导出对话 |
| `/webfetch` | 获取网页内容 |

## 深度使用

### /review - 代码审查

```
/review src/utils/helper.ts
```

输出包括：
- 代码规范检查
- 潜在 bug 提示
- 性能优化建议
- 安全漏洞预警

### /test - 测试生成

```
/test src/api/user.ts
```

自动生成：
- 单元测试
- 集成测试
- 边界测试

### /compact - 压缩上下文

当对话太长时：
```
/compact
```

会：
- 保留关键上下文
- 压缩冗余信息
- 释放 token 空间

## 命令组合使用

### 场景：修复 Bug

```
1. /review src/buggy.ts
   → 审查代码，找到问题

2. /test src/buggy.ts
   → 生成测试，确认边界

3. 使用 Agent 修复
   → 分析问题，执行修复
```

## 行动清单

- [ ] 记住核心 5 个命令
- [ ] 每天使用 /review
- [ ] 学会用 /compact 处理长对话

## 延伸阅读

- [claude-code-best-practice - Commands](https://github.com/shanraisshan/claude-code-best-practice)