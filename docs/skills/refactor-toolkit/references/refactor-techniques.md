# 重构手法详解

> 来源：Martin Fowler《重构：改善既有代码的设计》

---

## 一、代码组织类

### 1.1 提取方法（Extract Method）

**用途：** 将代码片段变成独立方法

**场景：**
- 代码片段需要注释才能理解
- 代码片段被多处复用
- 方法过长

**Before:**
```javascript
function printOwing(invoice) {
  console.log('***********************');
  console.log('*** Customer Owes ***');
  console.log('***********************');

  let outstanding = 0;
  for (const order of invoice.orders) {
    outstanding += order.amount;
  }

  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

**After:**
```javascript
function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log('***********************');
  console.log('*** Customer Owes ***');
  console.log('***********************');
}

function calculateOutstanding(invoice) {
  return invoice.orders.reduce((sum, order) => sum + order.amount, 0);
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

**AI 执行要点：**
1. 识别可独立的代码片段
2. 创建新方法，命名描述其功能
3. 将代码复制到新方法
4. 替换原代码为新方法调用
5. 运行测试

---

### 1.2 内联方法（Inline Method）

**用途：** 将方法体嵌入调用处

**场景：**
- 方法体和名称一样清晰
- 方法只被调用一次
- 方法过度拆分

**Before:**
```javascript
function getRating(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}
```

**After:**
```javascript
function getRating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}
```

---

### 1.3 提取变量（Extract Variable）

**用途：** 将表达式结果赋给变量

**场景：**
- 表达式复杂难以理解
- 表达式在多处使用

**Before:**
```javascript
if (platform.toUpperCase().indexOf('MAC') > -1 &&
    browser.toUpperCase().indexOf('IE') > -1 &&
    wasInitialized() && resize > 0) {
  // ...
}
```

**After:**
```javascript
const isMacOs = platform.toUpperCase().indexOf('MAC') > -1;
const isIE = browser.toUpperCase().indexOf('IE') > -1;
const wasResized = resize > 0;

if (isMacOs && isIE && wasInitialized() && wasResized) {
  // ...
}
```

---

### 1.4 内联变量（Inline Variable）

**用途：** 将变量替换为表达式

**场景：**
- 变量名和表达式一样清晰
- 变量阻碍重构

**Before:**
```javascript
const basePrice = anOrder.basePrice;
return basePrice > 1000;
```

**After:**
```javascript
return anOrder.basePrice > 1000;
```

---

## 二、类重组类

### 2.1 移动方法（Move Method）

**用途：** 将方法移到更合适的类

**场景：**
- 方法频繁使用其他类的数据
- 方法在当前类不合适

**Before:**
```javascript
class Account {
  constructor(type) {
    this.type = type;
  }

  getOverdraftCharge(daysOverdrawn) {
    if (this.type.isPremium()) {
      const result = 10;
      if (daysOverdrawn > 7) {
        result += (daysOverdrawn - 7) * 0.85;
      }
      return result;
    }
    return daysOverdrawn * 1.75;
  }
}
```

**After:**
```javascript
class Account {
  constructor(type) {
    this.type = type;
  }

  getOverdraftCharge(daysOverdrawn) {
    return this.type.getOverdraftCharge(daysOverdrawn);
  }
}

class AccountType {
  getOverdraftCharge(daysOverdrawn) {
    if (this.isPremium()) {
      const result = 10;
      if (daysOverdrawn > 7) {
        result += (daysOverdrawn - 7) * 0.85;
      }
      return result;
    }
    return daysOverdrawn * 1.75;
  }
}
```

---

### 2.2 提取类（Extract Class）

**用途：** 将部分职责提取为新类

**场景：**
- 一个类承担过多职责
- 类过大

**Before:**
```javascript
class Person {
  constructor(name, officeAreaCode, officeNumber) {
    this.name = name;
    this.officeAreaCode = officeAreaCode;
    this.officeNumber = officeNumber;
  }

  getTelephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
}
```

**After:**
```javascript
class Person {
  constructor(name, phoneNumber) {
    this.name = name;
    this.phoneNumber = phoneNumber; // PhoneNumber 类实例
  }

  getTelephoneNumber() {
    return this.phoneNumber.toString();
  }
}

class PhoneNumber {
  constructor(areaCode, number) {
    this.areaCode = areaCode;
    this.number = number;
  }

  toString() {
    return `(${this.areaCode}) ${this.number}`;
  }
}
```

---

### 2.3 内联类（Inline Class）

**用途：** 将类合并到另一个类

**场景：**
- 类不再承担足够职责
- 两个类应该合并

**Before:**
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}

class TelephoneNumber {
  constructor(areaCode, number) {
    this.areaCode = areaCode;
    this.number = number;
  }
}
```

**After:**
```javascript
class Person {
  constructor(name, areaCode, number) {
    this.name = name;
    this.areaCode = areaCode;
    this.number = number;
  }

  getTelephoneNumber() {
    return `(${this.areaCode}) ${this.number}`;
  }
}
```

---

## 三、简化条件类

### 3.1 分解条件（Decompose Conditional）

**用途：** 将复杂条件拆成独立方法

**Before:**
```javascript
if (date.before(SUMMER_START) || date.after(SUMMER_END)) {
  charge = quantity * winterRate + winterServiceCharge;
} else {
  charge = quantity * summerRate;
}
```

**After:**
```javascript
if (isSummer(date)) {
  charge = summerCharge(quantity);
} else {
  charge = winterCharge(quantity);
}

function isSummer(date) {
  return !date.before(SUMMER_START) && !date.after(SUMMER_END);
}

function summerCharge(quantity) {
  return quantity * summerRate;
}

function winterCharge(quantity) {
  return quantity * winterRate + winterServiceCharge;
}
```

---

### 3.2 合并条件（Consolidate Conditional）

**用途：** 将多个条件合并

**Before:**
```javascript
function disabilityAmount() {
  if (seniority < 2) return 0;
  if (monthsDisabled > 12) return 0;
  if (isPartTime) return 0;
  // ...
}
```

**After:**
```javascript
function disabilityAmount() {
  if (isNotEligibleForDisability()) return 0;
  // ...
}

function isNotEligibleForDisability() {
  return seniority < 2 || monthsDisabled > 12 || isPartTime;
}
```

---

### 3.3 卫语句（Guard Clauses）

**用途：** 用 return 替代嵌套 if

**Before:**
```javascript
function getPayment() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalPayAmount();
      }
    }
  }
  return result;
}
```

**After:**
```javascript
function getPayment() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}
```

---

### 3.4 多态替换条件（Replace Conditional with Polymorphism）

**用途：** 用策略模式替代条件

**Before:**
```javascript
function getBirdSpeed(bird) {
  switch (bird.type) {
    case 'EUROPEAN':
      return getBaseSpeed(bird);
    case 'AFRICAN':
      return getBaseSpeed(bird) - getLoadFactor() * bird.numberOfCoconuts;
    case 'NORWEGIAN_BLUE':
      return bird.isNailed ? 0 : getBaseSpeed(bird);
    default:
      return 0;
  }
}
```

**After:**
```javascript
class EuropeanSwallow {
  getSpeed() {
    return getBaseSpeed();
  }
}

class AfricanSwallow {
  getSpeed() {
    return getBaseSpeed() - getLoadFactor() * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot {
  getSpeed() {
    return this.isNailed ? 0 : getBaseSpeed();
  }
}
```

---

## 四、数据处理类

### 4.1 封装字段（Encapsulate Field）

**用途：** 将字段设为 private

**Before:**
```javascript
class Person {
  constructor() {
    this.name = ''; // public
  }
}
```

**After:**
```javascript
class Person {
  #name = '';

  getName() {
    return this.#name;
  }

  setName(name) {
    this.#name = name;
  }
}
```

---

### 4.2 以对象取代基本类型（Replace Primitive with Object）

**用途：** 如用 Money 替代 int

**Before:**
```javascript
let price = 1000;
let discount = 0.1;
let finalPrice = price * (1 - discount);
```

**After:**
```javascript
class Money {
  constructor(amount, currency = 'USD') {
    this.amount = amount;
    this.currency = currency;
  }

  multiply(factor) {
    return new Money(this.amount * factor, this.currency);
  }

  subtract(other) {
    return new Money(this.amount - other.amount, this.currency);
  }
}

const price = new Money(1000);
const discount = 0.1;
const finalPrice = price.multiply(1 - discount);
```

---

### 4.3 引入参数对象（Introduce Parameter Object）

**用途：** 将多个参数打包成对象

**Before:**
```javascript
function amountInvoiced(start, end) { /* ... */ }
function amountReceived(start, end) { /* ... */ }
function amountOverdue(start, end) { /* ... */ }
```

**After:**
```javascript
class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

function amountInvoiced(range) { /* ... */ }
function amountReceived(range) { /* ... */ }
function amountOverdue(range) { /* ... */ }
```

---

## 五、方法调用简化

### 5.1 重命名方法（Rename Method）

**用途：** 方法名更清晰

**Before:**
```javascript
function dn() { /* ... */ }
```

**After:**
```javascript
function getDiscount() { /* ... */ }
```

---

### 5.2 以工厂取代构造函数（Replace Constructor with Factory）

**用途：** 更灵活的对象创建

**Before:**
```javascript
const employee = new Engineer(level);
```

**After:**
```javascript
class Employee {
  static create(type) {
    switch (type) {
      case 'engineer': return new Engineer();
      case 'manager': return new Manager();
      default: throw new Error('Invalid type');
    }
  }
}

const employee = Employee.create('engineer');
```

---

## 六、AI 重构手法应用

### 选择合适的手法

```
识别坏味道
    ↓
┌─────────────────────────────────────────┐
│ 重复代码 → 提取方法                      │
│ 过长函数 → 提取方法                      │
│ 过大类 → 提取类                          │
│ 复杂条件 → 分解条件 / 卫语句             │
│ 参数过多 → 引入参数对象                  │
│ 方法在错误类 → 移动方法                  │
└─────────────────────────────────────────┘
```

### 重构手法组合

**典型组合：**

1. **过长函数 + 复杂条件**
   ```
   提取方法 → 分解条件 → 卫语句
   ```

2. **过大类 + 发散式变化**
   ```
   提取类 → 移动方法
   ```

3. **霰弹式修改**
   ```
   移动方法 → 移动字段 → 提取类
   ```

---

## 重构手法速查表

| 手法 | 用途 | 难度 | 风险 |
|------|------|------|------|
| 提取方法 | 代码复用、可读性 | 低 | 低 |
| 内联方法 | 消除不必要抽象 | 低 | 低 |
| 提取变量 | 表达式可读性 | 低 | 低 |
| 提取类 | 职责分离 | 中 | 中 |
| 移动方法 | 方法归属 | 中 | 中 |
| 分解条件 | 条件可读性 | 低 | 低 |
| 卫语句 | 消除嵌套 | 低 | 低 |
| 多态替换条件 | 条件复杂度 | 高 | 高 |
| 引入参数对象 | 参数简化 | 低 | 低 |
