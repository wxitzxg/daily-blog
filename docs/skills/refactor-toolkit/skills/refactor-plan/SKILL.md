---
name: refactor-plan
description: 实现计划技能。将方案拆解为可执行的小步骤，准备执行环境。触发条件：refactor-review 审查通过后。
metadata:
  pattern: planning
  domain: refactoring
  parent: refactor-toolkit
---

# refactor-plan（实现计划）

> 铁律：没有计划，不准动手。

## 流程

### Step 1: 任务拆解

每个任务 2-5 分钟可完成：

```
- 每个任务对应一个具体操作
- 任务间依赖关系清晰
- 优先级明确
```

### Step 2: 步骤定义

```
- 具体代码变更
- 测试命令
- 预期结果
- 提交信息
```

### Step 3: 执行准备

```bash
# 创建重构分支
git checkout -b refactor/xxx

# 打 tag 标记起点
git tag before-refactor-xxx

# 确认测试可运行
npm test
```

### Step 4: 输出实现计划

使用 `assets/refactor-plan-template.md`

## 输出格式

```markdown
# 实现计划

## 准备工作
- [ ] 创建分支：refactor/xxx
- [ ] 打 tag：before-refactor-xxx
- [ ] 确认测试通过

## 任务清单

### Task 1: [任务名称]
**文件：**
- 修改：`path/to/file.ts`

**步骤：**
- [ ] Step 1: 修改代码
- [ ] Step 2: 运行测试
- [ ] Step 3: 提交

### Task 2: [任务名称]
...

## Wave 划分（大规模重构）
- Wave 1: Task 1-3（并行）
- Wave 2: Task 4-5（依赖 Wave 1）
```
