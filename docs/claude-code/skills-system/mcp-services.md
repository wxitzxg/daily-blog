---
sidebar_position: 6
---

# MCP 服务配置

> Model Context Protocol — 连接 Claude Code 与外部世界的桥梁

## 核心理念

MCP（Model Context Protocol）是 Claude Code 连接外部工具的协议。通过 MCP，你可以让 Claude Code 访问文件系统、操作 Git、调用 API、连接数据库等。

## MCP 架构

```
┌─────────────────────────────────────────────┐
│              Claude Code                     │
├─────────────────────────────────────────────┤
│                 MCP Client                    │
└──────────────────┬──────────────────────────┘
                   │
         ┌─────────┼─────────┐
         ↓         ↓         ↓
    ┌────────┐ ┌────────┐ ┌────────┐
    │Filesystem│ │  Git   │ │ Custom │
    │ Server  │ │ Server │ │ Server │
    └────────┘ └────────┘ └────────┘
```

## 快速配置

### 1. 文件系统 MCP

让 Claude Code 可以读写文件：

```json
// ~/.claude/settings.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
    }
  }
}
```

### 2. Git MCP

让 Claude Code 执行 Git 操作：

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}
```

### 3. 自定义 MCP

连接你自己的服务：

```json
{
  "mcpServers": {
    "my-api": {
      "command": "node",
      "args": ["/path/to/your-mcp-server.js"]
    }
  }
}
```

## 常用 MCP 服务

| 服务 | 功能 | 场景 |
|------|------|------|
| filesystem | 文件操作 | 读写项目文件 |
| github | GitHub API | 操作 Issue/PR |
| git | Git 操作 | 版本控制 |
| database | 数据库 | 查询/操作 |
| search | 搜索引擎 | 信息检索 |

## 使用示例

### 文件操作

```
MCP: 读取 src/index.ts
→ 返回文件内容

MCP: 创建 src/utils/helper.ts
→ 文件已创建
```

### Git 操作

```
MCP: 创建分支 feature/user-auth
→ 分支已创建

MCP: 提交所有更改
→ 提交完成: feat: add user auth
```

## 常见问题

### Q: MCP 服务启动失败？
A: 检查 Node.js 版本和服务是否安装正确

### Q: 权限不够？
A: 确保目录/文件有正确的读写权限

### Q: 连接超时？
A: 检查服务是否运行，网络是否正常

## 行动清单

- [ ] 配置文件系统 MCP
- [ ] 尝试基本文件操作
- [ ] 根据需要添加更多 MCP 服务

## 延伸阅读

- [MCP 官方文档](https://modelcontextprotocol.io)
- [MCP 服务列表](https://github.com/modelcontextprotocol)