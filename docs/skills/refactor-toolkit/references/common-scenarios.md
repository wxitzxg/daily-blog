# 常见重构场景指南

## 场景一：框架迁移（Express → Hono）

### 分析阶段

```bash
# 搜索所有路由定义
grep -r "app\.\(get\|post\|put\|delete\)" src/

# 搜索中间件
grep -r "app.use\|router.use" src/

# 统计文件数量
find src/ -name "*.ts" | wc -l
```

### 映射表

| Express | Hono |
|---------|------|
| `app.get(path, handler)` | `app.get(path, handler)` |
| `req.body` | `await c.req.json()` |
| `req.params.id` | `c.req.param('id')` |
| `req.query.name` | `c.req.query('name')` |
| `res.json(data)` | `c.json(data)` |
| `res.status(400).json(data)` | `c.json(data, 400)` |
| `next()` | `await next()` |

### 执行流程

1. 先迁移路由，保持 handler 不变
2. 逐个修改 handler 中的 req/res 调用
3. 迁移中间件
4. 运行测试

---

## 场景二：callback → async/await

### 分析阶段

```bash
# 搜索 callback 模式
grep -r "function.*callback\|cb\|next" src/

# 搜索 Promise 包装
grep -r "new Promise" src/
```

### 转换模式

**Before:**
```javascript
function getUser(id, callback) {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows[0]);
  });
}

// 调用
getUser(1, (err, user) => {
  if (err) console.error(err);
  console.log(user);
});
```

**After:**
```javascript
async function getUser(id) {
  const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

// 调用
try {
  const user = await getUser(1);
  console.log(user);
} catch (err) {
  console.error(err);
}
```

### 执行流程

1. 逐个函数转换
2. 更新调用处
3. 运行测试

---

## 场景三：JavaScript → TypeScript

### 分析阶段

```bash
# 统计 JS 文件
find src/ -name "*.js" | wc -l

# 检查是否有类型定义
ls src/types/ 2>/dev/null || echo "No types directory"
```

### 迁移策略

**Phase 1: 配置**
```bash
# 创建 tsconfig.json
npx tsc --init

# 安装类型定义
npm install -D @types/node @types/express
```

**Phase 2: 文件重命名**
```bash
# 逐个模块重命名
mv src/auth/service.js src/auth/service.ts
```

**Phase 3: 添加类型**

```typescript
// Before
function getUser(id) {
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
}

// After
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): Promise<User> {
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
}
```

### 执行流程

1. 配置 TypeScript
2. 按模块迁移（types → service → routes）
3. 每迁移一个模块运行测试
4. 解决类型错误

---

## 场景四：代码风格统一

### 分析阶段

```bash
# 检查现有风格
npx eslint --print-config src/index.js

# 统计风格不一致
npx eslint src/ --format json | jq '.[] | .warningCount'
```

### 自动化工具

**ESLint 配置：**
```javascript
// .eslintrc.js
module.exports = {
  extends: ['eslint:recommended'],
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
  }
};
```

**Prettier 配置：**
```javascript
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### 执行流程

```bash
# 1. 运行自动格式化
npx prettier --write "src/**/*.js"

# 2. 运行 ESLint 修复
npx eslint src/ --fix

# 3. 手动修复剩余问题
# ...
```

---

## 场景五：数据库迁移（MySQL → PostgreSQL）

### 分析阶段

```bash
# 搜索 SQL 查询
grep -r "SELECT\|INSERT\|UPDATE\|DELETE" src/

# 搜索数据库特定语法
grep -r "LIMIT\|AUTO_INCREMENT\|NOW()" src/
```

### 语法映射

| MySQL | PostgreSQL |
|-------|------------|
| `LIMIT 10` | `LIMIT 10`（相同） |
| `AUTO_INCREMENT` | `SERIAL` |
| `NOW()` | `NOW()`（相同） |
| `\`table\`` | `"table"` |
| `CONCAT(a, b)` | `a \|\| b` |

### 执行流程

1. 修改数据库连接配置
2. 逐个修改 SQL 查询
3. 修改 schema 文件
4. 运行迁移脚本
5. 测试数据完整性

---

## 场景六：API 版本升级

### 分析阶段

```bash
# 搜索 API 调用
grep -r "api/v1\|/v1/" src/

# 搜索废弃的 API
grep -r "deprecated\|@deprecated" src/
```

### 迁移策略

1. 创建 API 版本适配层
2. 逐个接口迁移
3. 保留旧 API 的兼容层
4. 逐步废弃旧 API

```javascript
// 适配层示例
function callApi(endpoint, params) {
  // 新 API
  if (endpoint.startsWith('/v2/')) {
    return fetch(`/api${endpoint}`, { params });
  }
  // 旧 API 兼容
  return fetch(`/api/v1${endpoint}`, { params });
}
```

---

## 场景七：模块拆分

### 分析阶段

```bash
# 分析模块大小
find src/ -name "*.ts" -exec wc -l {} \; | sort -rn | head -20

# 分析模块依赖
npx madge --image deps.svg src/
```

### 拆分策略

**Before:**
```
src/
└── user.ts  (500 行)
```

**After:**
```
src/
└── user/
    ├── index.ts       # 导出入口
    ├── types.ts       # 类型定义
    ├── service.ts     # 业务逻辑
    ├── repository.ts  # 数据访问
    └── utils.ts       # 工具函数
```

### 执行流程

1. 创建模块目录
2. 提取类型定义
3. 提取业务逻辑
4. 提取数据访问
5. 更新导入路径
6. 运行测试

---

## 风险等级评估

| 场景 | 风险等级 | 测试要求 | 回滚难度 |
|------|----------|----------|----------|
| 代码风格统一 | 低 | 中 | 容易 |
| callback → async/await | 中 | 高 | 中等 |
| JS → TS | 中 | 高 | 中等 |
| 框架迁移 | 高 | 极高 | 困难 |
| 数据库迁移 | 极高 | 极高 | 极困难 |

---

## 测试策略

### 低风险重构
- 修改后运行测试即可

### 中风险重构
- 修改前补充测试
- 修改后运行测试
- 对比修改前后行为

### 高风险重构
- 修改前补充测试到 80%+ 覆盖
- 创建行为对比测试
- 灰度发布
- 监控告警
