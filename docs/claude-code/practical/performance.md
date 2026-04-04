---
sidebar_position: 13
---

# 性能优化

> 用 AI 优化代码性能

## 核心理念

Claude Code 可以帮助你：
- 分析性能瓶颈
- 优化算法复杂度
- 改进代码结构

## 使用方法

### 1. 性能分析

```
分析这个函数的性能：
function findUser(users, name) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === name) {
      return users[i];
    }
  }
  return null;
}
```

### 2. 批量优化

```
优化整个模块的性能：
- src/services/user.ts
- src/services/order.ts
重点关注数据库查询
```

### 3. 架构优化

```
优化系统架构：
当前问题：高并发下响应慢
约束：不能增加服务器
```

## 性能优化技巧

### 1. 算法优化

```javascript
// 优化前：O(n²)
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // ...
  }
}

// 优化后：O(n)
const map = new Map(arr.map(x => [x.id, x]));
```

### 2. 缓存使用

```javascript
// 避免重复计算
const cache = new Map();
function getData(id) {
  if (cache.has(id)) return cache.get(id);
  const data = fetchFromDb(id);
  cache.set(id, data);
  return data;
}
```

### 3. 异步优化

```javascript
// 并行替代串行
const [users, orders, products] = await Promise.all([
  fetchUsers(),
  fetchOrders(),
  fetchProducts()
]);
```

## 性能指标

| 指标 | 目标 | 优化方法 |
|------|------|----------|
| 响应时间 | < 200ms | 缓存、CDN |
| 吞吐量 | > 1000 QPS | 负载均衡 |
| 内存 | < 80% | 对象池、懒加载 |
| CPU | < 70% | 算法优化、并行 |

## 行动清单

- [ ] 用 AI 分析性能瓶颈
- [ ] 记录优化前后对比
- [ ] 建立性能基准

## 延伸阅读

- [claude-code-best-practice - Performance](https://github.com/shanraisshan/claude-code-best-practice)