---
name: refactor-toolkit
description: 重构技能包编排器。根据用户请求自动选择子技能执行流程。支持主动发现和直接重构两种入口模式。触发条件：用户提到"重构"、"迁移"、"改造"、"升级"等关键词。
metadata:
  pattern: orchestrator
  domain: refactoring
  version: 3.0.0
---

# refactor-toolkit（重构技能包编排器）

> 核心原则：外科手术式修改，只碰非碰不可的地方。

## 子技能

| 技能 | 职责 | 触发时机 |
|------|------|----------|
| refactor-audit | 审计项目、发现重构机会 | 用户请求分析项目 |
| refactor-decide | 场景识别、风险评估、方法论选择 | 所有请求的入口 |
| refactor-design | 方案设计、接缝识别 | 中高风险场景 |
| refactor-review | 方案审查 | design 完成后自动执行 |
| refactor-plan | 任务拆解、执行准备 | review 通过后 |
| refactor-execute | 执行重构 | 低风险直接执行，或 plan 后 |
| refactor-verify | 测试验证、报告生成 | execute 完成后 |

## 两种入口模式

### 入口一：主动发现模式

```
用户："帮我看看哪些需要重构"
    ↓
refactor-audit → 显示审计报告 → 用户选择场景
    ↓
refactor-decide → design → review → plan → execute → verify
```

### 入口二：直接重构模式

```
用户："把Express迁移到Hono"
    ↓
refactor-decide（场景识别 + 风险评估）
    ↓
┌─────────────────────────────────────────┐
│ 低风险 → execute → verify               │
│ 中高风险 → design → review → plan → execute → verify │
└─────────────────────────────────────────┘
```

## 编排逻辑

```python
def refactor_toolkit(user_request):
    # 判断入口模式
    if is_audit_request(user_request):
        audit_result = refactor_audit(project_path)
        display(audit_result)
        selected = ask_user_to_select(audit_result.scenarios)
        user_request = selected

    # 决策阶段
    decision = refactor_decide(user_request)
    if not confirm("是否继续？"):
        return

    # 根据风险选择流程
    if decision.risk == '低':
        refactor_execute()
        refactor_verify()
    else:
        design = refactor_design()
        while True:
            review_result = refactor_review(design)
            if review_result.passed:
                break
            design = refactor_design(review_result.issues)
        refactor_plan()
        refactor_execute()
        refactor_verify()
```

## 确认点

| # | 确认点 | 阶段 |
|---|--------|------|
| 1 | 是否继续？ | decide 后 |

## 参考资源

详见 `references/` 和 `assets/` 目录：

| 文件 | 用途 |
|------|------|
| `references/code-smells.md` | 代码坏味道识别 |
| `references/refactor-techniques.md` | 重构手法详解 |
| `references/surgical-modification-rules.md` | 外科手术式修改规则 |
| `references/common-scenarios.md` | 常见场景指南 |
| `references/refactor-checklist.md` | 检查清单 |
| `assets/refactor-plan-template.md` | 计划模板 |
| `assets/refactor-report-template.md` | 报告模板 |
