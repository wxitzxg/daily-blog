---
name: refactor-toolkit
description: "Refactoring skill orchestrator. Automatically selects sub-skills based on user request. Supports two entry modes: proactive discovery and direct refactoring."
metadata:
  pattern: orchestrator
  domain: refactoring
  version: 4.0.0
---

# refactor-toolkit (Refactoring Skill Orchestrator)

> Core principle: Surgical modification, only touch what must be touched.

## Sub-skills

| Skill | Responsibility | Mode | Trigger |
|-------|----------------|------|---------|
| refactor-audit | Audit project, discover opportunities | Socratic dialogue | User requests analysis |
| refactor-decide | Scenario identification, risk assessment, methodology selection | Socratic dialogue | Entry point for all requests |
| refactor-design | Design solution, identify seams | Socratic dialogue | Medium/high risk scenarios |
| refactor-review | Design review | Automated | Automatically after design |
| refactor-plan | Task breakdown, execution preparation | Automated | After review passes |
| refactor-execute | Execute refactoring | Automated | Low risk direct, or after plan |
| refactor-verify | Test verification, report generation | Automated | After execute completes |

## Two Entry Modes

### Mode 1: Proactive Discovery

```
User: "Help me see what needs refactoring"
    ↓
refactor-audit → Display audit report → User selects scenario
    ↓
refactor-decide → design → review → plan → execute → verify
```

### Mode 2: Direct Refactoring

```
User: "Migrate Express to Hono"
    ↓
refactor-decide (scenario identification + risk assessment)
    ↓
┌─────────────────────────────────────────┐
│ Low risk → execute → verify              │
│ Medium/high risk → design → review → plan → execute → verify │
└─────────────────────────────────────────┘
```

## Orchestration Logic

```python
def refactor_toolkit(user_request):
    # Determine entry mode
    if is_audit_request(user_request):
        audit_result = refactor_audit(project_path)
        display(audit_result)
        selected = ask_user_to_select(audit_result.scenarios)
        user_request = selected

    # Decision phase (Socratic dialogue)
    decision = refactor_decide(user_request)

    # Based on risk select flow
    if decision.risk == 'Low':
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

## Output Directory Structure

```
docs/refactor/
├── audits/           # Audit reports
│   └── YYYY-MM-DD-<project>-audit.md
├── decisions/        # Decision reports
│   └── YYYY-MM-DD-<project>-decision.md
├── designs/          # Design documents
│   └── YYYY-MM-DD-<project>-design.md
├── plans/            # Execution plans
│   └── YYYY-MM-DD-<project>-plan.md
└── reports/          # Verification reports
    └── YYYY-MM-DD-<project>-report.md
```

## Reference Resources

| File | Purpose |
|------|---------|
| `references/code-smells.md` | Code smell identification (Fowler) |
| `references/refactor-techniques.md` | Refactoring techniques |
| `references/surgical-modification-rules.md` | Surgical modification rules |
| `references/common-scenarios.md` | Common scenario guide |
| `references/refactor-checklist.md` | Verification checklist |
| `assets/refactor-plan-template.md` | Plan template |
| `assets/refactor-report-template.md` | Report template |
