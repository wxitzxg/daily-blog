---
name: refactor-verify
description: 重构验证技能。运行测试、行为对比、代码质量检查、生成验证报告。触发条件：refactor-execute 执行完成后。
metadata:
  pattern: verification
  domain: refactoring
  parent: refactor-toolkit
---

# refactor-verify（重构验证）

> 铁律：没有跑验证命令，不准说完成。

## 流程

### Step 1: 运行全量测试

**前置检查：**
```bash
# 确认测试文件存在
# Node.js: **/*.test.* 或 **/*.spec.*
# Python: **/*_test.py 或 **/test_*.py
# Go: **/*_test.go
```

**运行测试（根据项目类型）：**

```bash
# Node.js
npm test

# Python
pytest

# Go
go test ./...

# Rust
cargo test

# Java
mvn test
```

### Step 2: 行为对比（高风险重构）

对于高风险重构，必须验证行为一致性：

```
1. 对比重构前后 API 返回值
2. 对比重构前后日志输出
3. 对比重构前后性能指标
```

### Step 3: 代码质量检查

```bash
# ESLint
npm run lint

# Prettier
npm run format:check

# TypeScript
npm run type-check
```

**检查清单：**
- [ ] 无 console.log 残留
- [ ] 无 TODO/FIXME 新增
- [ ] 无硬编码密钥

### Step 4: 生成验证报告

使用 `assets/refactor-report-template.md` 生成报告。

## 输出格式

```markdown
# 验证报告

## 测试结果
- 单元测试：XX 通过 / XX 失败
- 集成测试：XX 通过 / XX 失败
- 覆盖率：XX%

## 行为对比
| 检查项 | 结果 |
|--------|------|
| API 行为一致 | ✅ / ❌ |
| 日志输出一致 | ✅ / ❌ |
| 性能无明显下降 | ✅ / ❌ |

## 代码质量
- ESLint：✅ 通过 / ❌ 有问题
- 类型检查：✅ 通过 / ❌ 有问题

## 变更统计
- 文件数：XX
- 新增行：XX
- 删除行：XX

## 结论
✅ 重构成功 / ❌ 需要修复
```

## 测试失败处理

```
测试失败
    ↓
┌─────────────────────────────────────┐
│ 检查失败原因                         │
├─────────────────────────────────────┤
│ 行为变化 → 回退到上一个commit         │
│ 测试本身问题 → 修复测试               │
│ 新发现bug → 记录后继续（不影响重构）   │
└─────────────────────────────────────┘
```

**恢复命令：**
```bash
git revert HEAD
git log --oneline --all | head -20
```
