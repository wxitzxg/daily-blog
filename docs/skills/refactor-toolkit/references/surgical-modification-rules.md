# 外科手术式修改规则

> 来源：Karpathy Skills，是重构的核心原则

## 规则一：只碰非碰不可的地方

### 正确示例

```javascript
// 任务：将 login 函数从 callback 改成 async/await

// 只修改这一处
async function login(email, password) {
  // 原来：return new Promise((resolve, reject) => { ... })
  // 现在：直接用 async/await
  const user = await db.findUser(email);
  if (!user) throw new Error('User not found');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');
  return user;
}

// 调用处只改这一行
// 原来：login(email, password, (err, user) => { ... })
// 现在：const user = await login(email, password);
```

### 错误示例

```javascript
// 任务：将 login 函数从 callback 改成 async/await

// ❌ 顺便改了变量名
async function authenticateUser(email, userPassword) {  // 不该改
  const userData = await db.findUser(email);  // 不该改
  // ...
}

// ❌ 顺便加了日志
console.log('Login attempt:', email);  // 不该加

// ❌ 顺便改了其他函数
function logout() {  // 这个函数根本不在任务范围内
  // ...
}
```

---

## 规则二：保持现有风格一致

### 正确示例

```javascript
// 现有代码风格
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// 重构后保持相同风格
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    if (items[i].active) {  // 只加了条件判断
      total += items[i].price;
    }
  }
  return total;
}
```

### 错误示例

```javascript
// 现有代码风格：var + for 循环
function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// ❌ 重构后改成了不同风格：const + reduce
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

---

## 规则三：不删除现有无用代码

### 正确示例

```javascript
// 任务：修复 login 函数的 bug

function login(email, password) {
  // 这段代码虽然没用，但不在任务范围内，不动
  // TODO: 添加记住我功能
  // const rememberMe = req.body.rememberMe;

  // 只修复这里的 bug
  const user = validateUser(email, password);
  return user;
}
```

### 错误示例

```javascript
// 任务：修复 login 函数的 bug

function login(email, password) {
  // ❌ 删除了"没用"的注释
  const user = validateUser(email, password);
  return user;
}
```

---

## 规则四：改完清理多余代码

### 正确示例

```javascript
// 重构前
import { login, logout, validateUser, oldAuth } from './auth';

function doLogin(email, password) {
  const user = login(email, password);
  return user;
}

// 重构后（oldAuth 不再使用，删除 import）
import { login, logout, validateUser } from './auth';

function doLogin(email, password) {
  const user = login(email, password);
  return user;
}
```

### 错误示例

```javascript
// 重构后
import { login, logout, validateUser, oldAuth } from './auth';  // ❌ oldAuth 没删

function doLogin(email, password) {
  const user = login(email, password);
  return user;
}
```

---

## 规则五：测试先行

### 正确示例

```javascript
// 任务：修复 login 函数的 bug

// Step 1: 先写测试复现 bug
describe('login', () => {
  it('should throw error when email is empty', async () => {
    await expect(login('', 'password')).rejects.toThrow('Email required');
  });
});

// Step 2: 运行测试，确认失败
// Expected: Error: Email required
// Actual: Error: Cannot read property 'email' of undefined

// Step 3: 修复 bug
async function login(email, password) {
  if (!email) throw new Error('Email required');  // 加上验证
  // ...
}

// Step 4: 运行测试，确认通过
```

---

## 总结

| 规则 | 说明 |
|------|------|
| 只碰必要的地方 | 修改范围最小化 |
| 保持现有风格 | 不引入新风格 |
| 不删除无用代码 | 那不是这次的任务 |
| 清理多余代码 | 改完要打扫 |
| 测试先行 | 改代码前先写测试 |
