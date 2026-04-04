---
sidebar_position: 12
---

# 调试与排错

> 用 AI 快速定位和解决问题

## 核心理念

Claude Code 是调试利器。它可以：
- 分析错误信息
- 定位问题根因
- 提供解决方案

## 使用方法

### 1. 基础调试

```
这段代码报错：Error: Cannot read property 'x' of undefined
帮我分析原因
```

### 2. 日志分析

```
分析以下错误日志，找出根本原因：
[ERROR] 2024-01-01 10:00:00
Connection refused
at DB.connect (db.js:45)
```

### 3. 性能问题

```
分析这个函数为什么慢：
function slowFunction(items) {
  return items.map(item => item.id)
    .filter(id => id > 0)
    .filter(id => id < 1000);
}
```

## 调试技巧

### 1. 提供完整上下文

```
错误发生在用户登录时：
- 前端：React + Axios
- 后端：Node.js + Express
- 数据库：MySQL
- 错误：ER_ACCESS_DENIED_ERROR
```

### 2. 多种方案尝试

```
方案 1：增加错误处理
方案 2：检查配置
方案 3：简化复现步骤
```

### 3. 验证修复

```
修复后测试：
1. 正常运行流程
2. 错误处理流程
3. 边界情况
```

## 常见问题快速定位

| 错误类型 | 常见原因 | 检查点 |
|----------|----------|--------|
| Cannot read undefined | 空值访问 | 对象初始化 |
| Connection refused | 服务未启动 | 端口配置 |
| Timeout | 网络/负载 | 超时设置 |
| Memory leak | 资源未释放 | 监听器清理 |

## 行动清单

- [ ] 记住调试常用 prompt
- [ ] 记录常见错误解决方案
- [ ] 建立调试检查清单

## 延伸阅读

- [claude-code-best-practice - Debug](https://github.com/shanraisshan/claude-code-best-practice)