---
name: refactor-execute
description: 重构执行技能。按计划执行重构，遵循外科手术式修改原则，支持小步循环和Wave并行执行。触发条件：refactor-plan 输出实现计划后，或低风险场景直接执行。
metadata:
  pattern: execution
  domain: refactoring
  parent: refactor-toolkit
---

# refactor-execute（重构执行）

> 铁律：遵循外科手术式修改原则，只碰必要的地方。

## 输入

| 来源 | 场景 | 内容 |
|------|------|------|
| refactor-plan | 中高风险重构 | 详细实现计划（任务清单、步骤、提交信息） |
| 用户请求 | 低风险重构 | 重构目标描述 |

**低风险场景判断：** 单文件、逻辑简单、有测试覆盖。

## 核心原则

加载 `references/surgical-modification-rules.md`：

| 原则 | 说明 |
|------|------|
| 只碰必要的地方 | 不顺便优化其他代码 |
| 保持现有风格一致 | 不引入新风格 |
| 每次小改动后运行测试 | 确保行为不变 |
| 改完清理多余代码 | 删除无用 import/变量 |

## 执行模式

### 模式一：小规模重构（1-5文件）

直接执行，每改一个文件运行测试：

```
1. 修改单个文件
2. 运行测试确认通过
3. 提交
4. 重复下一个文件
```

### 模式二：中规模重构（5-20文件）

使用 Superpowers `writing-plans` 拆任务，TDD 确保质量：

```
1. 每3个任务暂停汇报
2. 使用 TDD 流程
3. 频繁提交
```

### 模式三：大规模重构（20+文件）

使用 Wave 机制 + Agent Teams：

```
Wave 1（并行执行）：
├─ Agent A：负责模块 X（文件所有权：src/x/）
├─ Agent B：负责模块 Y（文件所有权：src/y/）
└─ 独立任务，互不依赖

Wave 2（依赖 Wave 1）：
└─ Agent C：负责集成
```

**Wave 启动方式：**

使用 Agent 工具并行启动：

```
Agent(
  description="重构模块X",
  prompt="重构 src/x/ 目录，遵循外科手术式修改原则。注意：只修改该目录下的文件。",
  subagent_type="general-purpose",
  model="haiku"
)
```

**Wave 完成确认：**
```bash
git status
npm test
```

## 小步循环

```
改代码 → 运行测试 → 测试通过 → 提交 → 下一步
         ↓
      测试失败 → 修复 → 重新测试
```

## 测试命令（多语言）

| 语言 | 命令 |
|------|------|
| Node.js | `npm test` |
| Python | `pytest` |
| Go | `go test ./...` |
| Rust | `cargo test` |
| Java | `mvn test` |

## 禁止事项

| 禁止 | 原因 |
|------|------|
| ❌ 无测试就重构核心代码 | 无法验证行为正确 |
| ❌ 重构同时加新功能 | 无法区分 bug 来源 |
| ❌ 顺便优化其他代码 | 范围不可控 |
| ❌ 改变 API 行为 | 影响调用方 |

## 异常处理

### 测试失败

```
1. 检查失败原因
   - 行为变化 → 回退到上一个 commit
   - 测试本身问题 → 修复测试
   - 新发现 bug → 记录后继续
```

**恢复命令：**
```bash
git revert HEAD
```
