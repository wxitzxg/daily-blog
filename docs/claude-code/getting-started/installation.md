---
sidebar_position: 2
---

# Claude Code 安装与配置

> 5 分钟完成安装配置，开始你的 AI 编程之旅

## 核心理念

Claude Code 是一个本地运行的 AI 编程助手，安装配置只需几分钟，但配置的质量直接影响后续使用体验。花时间做好初始配置，后续效率翻倍。

## 快速开始

```bash
# 1. 安装 Node.js (需要 v18+)
node --version

# 2. 安装 Claude Code
npm install -g @anthropic-ai/claude-code

# 3. 验证安装
claude --version

# 4. 初始化项目配置
claude init
```

## 配置详解

### init 流程

运行 `claude init` 后会让你配置：

| 配置项 | 说明 | 推荐值 |
|--------|------|--------|
| 项目目录 | 当前项目路径 | . |
| 项目名称 | 便于识别 | 你的项目名 |
| 预设规则 | 选择已有的 CLAUDE.md | 无 |

### CLAUDE.md 项目规则

创建项目根目录的 `CLAUDE.md`，让 Claude 理解你的项目：

```markdown
# 项目规则

## 技术栈
- Vue 3 + TypeScript
- Vite 构建
- Pinia 状态管理

## 代码规范
- 使用 ESLint + Prettier
- 组件名大驼峰
- 函数不超过 50 行

## 项目结构
/src
  /components  # 组件
  /views       # 页面
  /stores      # 状态
  /api         # 接口
```

## 常见问题

### Q: 安装失败？
A: 检查 Node.js 版本 `node --version`，需要 v18+

### Q: 配置文件在哪里？
- macOS: `~/.claude/settings.json`
- Linux: `~/.claude/settings.json`

### Q: 如何更新？
```bash
npm update -g @anthropic-ai/claude-code
```

## 行动清单

- [ ] 安装 Node.js (如未安装)
- [ ] 运行 `npm install -g @anthropic-ai/claude-code`
- [ ] 验证 `claude --version`
- [ ] 运行 `claude init` 初始化项目
- [ ] 创建项目的 CLAUDE.md

## 延伸阅读

- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/overview)
- [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)