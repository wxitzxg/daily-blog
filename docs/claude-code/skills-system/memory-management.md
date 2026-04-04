---
sidebar_position: 9
---

# Memory 与上下文管理

> 理解上下文，让 AI 记住该记住的

## 核心理念

Claude Code 的 Memory 系统决定了 AI 能"记住"什么。理解不同层级的记忆机制，才能有效管理上下文。

## 记忆层级

```
┌─────────────────────────────────────────┐
│           Memory 层级                    │
├─────────────────────────────────────────┤
│  全局设置 (~/.claude/)                   │
│    - 用户偏好                           │
│    - MCP 配置                           │
│    - 全局规则                           │
├─────────────────────────────────────────┤
│  项目规则 (./CLAUDE.md)                 │
│    - 项目规范                           │
│    - 代码风格                           │
│    - 团队约定                           │
├─────────────────────────────────────────┤
│  会话记忆 (当前对话)                     │
│    - 对话历史                           │
│    - 上下文                             │
│    - 变量状态                           │
└─────────────────────────────────────────┘
```

## 会话管理

### 1. 上下文保持

Claude Code 默认会保持对话上下文，但有限制：

| 模型 | 上下文限制 |
|------|------------|
| Haiku | ~100K tokens |
| Sonnet | ~200K tokens |
| Opus | ~500K tokens |

### 2. 压缩上下文

当对话太长时，使用 `/compact`：

```
/compact
```

效果：
- 保留关键信息
- 压缩冗余内容
- 释放 token 空间

### 3. 清除上下文

完全重置对话：

```
/clear
```

## CLAUDE.md 中的记忆

在 CLAUDE.md 中声明需要记住的内容：

```markdown
# 项目规则

## 记住
- 用户登录使用 JWT
- API 基础路径: /api/v1
- 当前用户: admin

## 常用信息
- 开发服务器: localhost:3000
- 测试命令: npm test
- 构建命令: npm run build
```

## Memory 最佳实践

### 1. 重要的放 CLAUDE.md

```markdown
# 项目核心规则

## 技术决策
- 使用 React 而非 Vue
- 状态管理用 Zustand
- 样式用 Tailwind CSS
```

### 2. 临时的用对话

```python
# 当前任务：重构用户服务
# 目标：提取通用方法到 utils
```

### 3. 定期清理

```bash
# 清除旧的对话缓存
rm -rf ~/.claude/cache/
```

## 常见问题

### Q: 对话太长了怎么办？
A: 使用 `/compact` 压缩，或 `/clear` 重新开始

### Q: 想让 AI 记住某些内容？
A: 写入 CLAUDE.md 或在对话中明确说明

### Q: 上下文丢失？
A: 检查是否超过限制，或使用 `/summarize` 总结

## 行动清单

- [ ] 查看当前的 CLAUDE.md
- [ ] 添加项目关键信息
- [ ] 学习使用 /compact

## 延伸阅读

- [claude-code-best-practice - Memory](https://github.com/shanraisshan/claude-code-best-practice)