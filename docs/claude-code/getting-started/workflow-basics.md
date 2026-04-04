---
sidebar_position: 3
---

# Claude Code 工作流基础

> 理解核心概念：Command、Skill、Agent、Memory、MCP

## 核心理念

Claude Code 不是简单的代码补全工具，而是一个**完整的 AI 编程工作流系统**。理解各个组件的职责和配合方式，是用好它的关键。

## 架构概览

```
┌─────────────────────────────────────────────────────┐
│                   Claude Code                        │
├─────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │Command  │  │ Skill   │  │  Agent  │  │  MCP    │ │
│  │ 命令    │  │ 技能    │  │  代理   │  │ 服务    │ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘ │
│       │            │            │            │       │
│       └────────────┴────────────┴────────────┘       │
│                      │                               │
│              ┌───────┴───────┐                       │
│              │    Memory     │                       │
│              │  记忆/上下文   │                       │
│              └───────────────┘                       │
└─────────────────────────────────────────────────────┘
```

## 核心组件

### 1. Command（命令）

快速调用 Claude Code 的内置功能：

| 命令 | 功能 |
|------|------|
| `/help` | 查看所有命令 |
| `/review` | 代码审查 |
| `/test` | 生成测试 |
| `/clear` | 清除对话上下文 |
| `/compact` | 压缩上下文 |

**使用示例：**
```
/review src/utils/helper.ts
```

### 2. Skill（技能）

封装好的可复用技能，包含：
- 角色定义（system prompt）
- 工具集
- 工作流程

**常见内置 Skills：**
- `Write` - 代码生成
- `Review` - 代码审查
- `Debug` - 调试排错
- `Test` - 测试生成

### 3. Agent（代理）

Claude Code 的核心能力——**自主执行复杂任务**：

```
用户: "帮我重构用户认证模块"

Agent 流程:
1. 分析任务
2. 制定计划
3. 逐步执行
4. 反馈结果
5. 等待确认
```

**使用 Agent：**
```
用 Agent 模式重构用户认证模块，使用策略模式
```

### 4. Memory（记忆）

持久化上下文的方式：

| 类型 | 范围 | 生命周期 |
|------|------|----------|
| 对话历史 | 当前会话 | 会话结束 |
| 项目规则 | 项目 | CLAUDE.md |
| 全局设置 | 用户 | 永久 |

**CLAUDE.md 最佳实践：**
```markdown
# 项目规则

## 禁止事项
- 不要修改已有测试
- 不要删除未使用的文件

## 必须事项
- 提交前运行测试
- 新功能必须添加测试
```

### 5. MCP（Model Context Protocol）

连接外部工具的桥梁：

- 文件系统操作
- Git 操作
- 数据库连接
- API 调用
- 自定义工具

**MCP 服务配置示例：**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
```

## 工作流配合

### 场景：修复一个 Bug

```
1. Command: /review src/api/user.ts
   → 触发代码审查

2. Agent: 分析错误日志
   → 定位问题根因

3. Skill: 生成修复代码
   → 使用 Write skill

4. Memory: 更新项目规则
   → 记录修复经验

5. MCP: 提交 Git
   → 执行版本控制
```

## 行动清单

- [ ] 记住 5 个常用命令 `/help`, `/review`, `/test`, `/clear`, `/compact`
- [ ] 阅读项目的 CLAUDE.md
- [ ] 配置一个 MCP 服务
- [ ] 尝试用 Agent 模式完成一个任务

## 延伸阅读

- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)
- [16k星霸榜GitHub最佳实践](https://github.com/shanraisshan/claude-code-best-practice)