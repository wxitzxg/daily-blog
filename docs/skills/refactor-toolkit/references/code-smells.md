# 代码坏味道识别指南

> 来源：Martin Fowler《重构：改善既有代码的设计》

## 什么是代码坏味道

代码坏味道是指代码中需要重构的信号。它不是 bug，但会影响代码的可维护性和可读性。

**重要：坏味道 ≠ 必须重构**

发现坏味道后，需要评估：
1. 影响范围有多大？
2. 修改成本有多高？
3. 是否有测试保护？

---

## 一、Bloaters（膨胀类）

这类坏味道随着代码增长而积累，通常一开始不明显。

### 1.1 过长函数（Long Method）

**症状：** 函数超过 50 行

**问题：**
- 难以理解
- 难以测试
- 难以复用

**识别方法：**
```bash
# 查找超过 50 行的函数
grep -r "function\|def\|public\|private" --include="*.js" --include="*.ts" src/ | while read line; do
  # 统计函数行数
done
```

**重构手法：**
- 提取方法（Extract Method）
- 以查询取代临时变量（Replace Temp with Query）

---

### 1.2 过大类（Large Class）

**症状：** 类超过 500 行

**问题：**
- 职责不清
- 难以理解
- 难以测试

**识别方法：**
```bash
# 统计类行数
find src/ -name "*.ts" -exec wc -l {} \; | sort -rn | head -20
```

**重构手法：**
- 提取类（Extract Class）
- 提取子类（Extract Subclass）
- 提取接口（Extract Interface）

---

### 1.3 过长参数列表（Long Parameter List）

**症状：** 参数超过 4 个

**问题：**
- 难以理解
- 难以调用
- 容易出错

**示例：**
```javascript
// 坏味道
function createUser(name, email, age, address, phone, company) {
  // ...
}

// 重构后
function createUser(userInfo) {
  const { name, email, age, address, phone, company } = userInfo;
}
```

**重构手法：**
- 引入参数对象（Introduce Parameter Object）
- 保持对象完整（Preserve Whole Object）

---

### 1.4 重复代码（Duplicated Code）

**症状：** 同样逻辑出现多次

**问题：**
- 修改时容易遗漏
- 维护成本高

**识别方法：**
```bash
# 查找重复代码
npx jscpd src/
```

**重构手法：**
- 提取方法（Extract Method）
- 上移方法（Pull Up Method）
- 模板方法模式（Form Template Method）

---

## 二、Object-Orientation Abusers（面向对象滥用）

### 2.1 发散式变化（Divergent Change）

**症状：** 一个类因多种原因变化

**示例：**
```javascript
// 坏味道：User 类既要处理用户信息，又要处理权限，还要处理通知
class User {
  updateProfile() { /* ... */ }
  checkPermission() { /* ... */ }
  sendNotification() { /* ... */ }
}
```

**重构手法：**
- 提取类（Extract Class）

---

### 2.2 霰弹式修改（Shotgun Surgery）

**症状：** 一个变化要改多个类

**示例：**
```javascript
// 添加一个新的支付方式需要修改：
// - PaymentService
// - OrderService
// - NotificationService
// - ReportService
// - ...
```

**重构手法：**
- 移动方法（Move Method）
- 移动字段（Move Field）
- 内联类（Inline Class）

---

### 2.3 依恋情节（Feature Envy）

**症状：** 方法大量调用其他类的数据

**示例：**
```javascript
// 坏味道：Order 的方法大量访问 Customer 的数据
class Order {
  getCustomerDiscount() {
    return this.customer.membershipLevel === 'gold' ? 0.2 : 0.1;
  }
}

// 重构后：把折扣计算移到 Customer 类
class Customer {
  getDiscount() {
    return this.membershipLevel === 'gold' ? 0.2 : 0.1;
  }
}
```

**重构手法：**
- 移动方法（Move Method）
- 提取方法（Extract Method）

---

## 三、Change Preventers（变化阻止者）

### 3.1 平行继承体系（Parallel Inheritance Hierarchies）

**症状：** 为一个类添加子类时，必须为另一个类添加子类

**重构手法：**
- 移动方法（Move Method）
- 移动字段（Move Field）

---

### 3.2 发散式变化 vs 霰弹式修改

| 类型 | 症状 | 一个变化影响 |
|------|------|-------------|
| 发散式变化 | 一个类，多种变化原因 | 多个地方 |
| 霰弹式修改 | 一个变化原因，多个类 | 多个类 |

---

## 四、Dispensables（多余物）

### 4.1 注释过多（Comments）

**症状：** 代码需要大量注释才能理解

**问题：** 代码本身不够清晰

**重构手法：**
- 提取方法（Extract Method）
- 引入解释性变量（Introduce Explaining Variable）

**注意：** 好的注释解释"为什么"，坏的注释解释"做什么"

---

### 4.2 重复代码（Duplicate Code）

见上文

### 4.3 懒类（Lazy Class）

**症状：** 类做的事情太少

**重构手法：**
- 内联类（Inline Class）
- 折叠继承体系（Collapse Hierarchy）

### 4.4 数据类（Data Class）

**症状：** 类只有数据，没有行为

**示例：**
```javascript
// 坏味道
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

// 重构后：添加行为
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getDisplayName() {
    return `${this.name} <${this.email}>`;
  }

  isValid() {
    return this.name && this.email.includes('@');
  }
}
```

---

## 五、Couplers（耦合者）

### 5.1 过度耦合的消息链（Message Chains）

**症状：** 链式调用过长

```javascript
// 坏味道
const city = user.getAddress().getCity().getName();

// 重构后：隐藏委托
const city = user.getCityName();
```

**重构手法：**
- 隐藏委托（Hide Delegate）
- 提取方法（Extract Method）

---

### 5.2 中间人（Middle Man）

**症状：** 类只是转发请求

```javascript
// 坏味道
class Manager {
  getEmployeeName(id) {
    return this.department.getEmployee(id).getName();
  }
}

// 重构后：直接调用
const name = department.getEmployee(id).getName();
```

**重构手法：**
- 移除中间人（Remove Middle Man）
- 内联方法（Inline Method）

---

### 5.3 不当亲密（Inappropriate Intimacy）

**症状：** 类过度访问彼此的私有数据

**重构手法：**
- 移动方法（Move Method）
- 移动字段（Move Field）
- 提取类（Extract Class）

---

## 六、其他坏味道

### 6.1 拒绝遗赠（Refused Bequest）

**症状：** 子类不需要父类的某些方法

**重构手法：**
- 提取子类（Extract Subclass）
- 以委托取代继承（Replace Inheritance with Delegation）

### 6.2 异曲同工的类（Alternative Classes with Different Interfaces）

**症状：** 两个类做同样的事，但方法名不同

**重构手法：**
- 重命名方法（Rename Method）
- 移动方法（Move Method）

---

## 坏味道速查表

| 坏味道 | 症状 | 优先级 | 重构手法 |
|--------|------|--------|----------|
| 重复代码 | 同样逻辑多次 | 高 | 提取方法 |
| 过长函数 | 超过 50 行 | 高 | 提取方法 |
| 过大类 | 超过 500 行 | 中 | 提取类 |
| 过长参数列表 | 超过 4 个参数 | 中 | 参数对象 |
| 发散式变化 | 一类多原因变化 | 高 | 提取类 |
| 霰弹式修改 | 一变化改多类 | 高 | 移动方法 |
| 依恋情节 | 方法访问其他类数据 | 中 | 移动方法 |
| 数据类 | 只有数据无行为 | 低 | 添加行为 |
| 注释过多 | 代码不清晰 | 低 | 提取方法 |

---

## 重构决策流程

```
发现坏味道
    ↓
评估影响范围
    ↓
┌─────────────────────────────────────┐
│ 影响小 + 有测试 → 直接重构           │
│ 影响小 + 无测试 → 补充测试后重构     │
│ 影响大 + 有测试 → 评审后重构         │
│ 影响大 + 无测试 → 评估是否值得重构   │
└─────────────────────────────────────┘
    ↓
应用重构手法
    ↓
运行测试验证
    ↓
提交代码
```
