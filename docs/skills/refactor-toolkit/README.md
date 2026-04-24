# refactor-toolkit 使用说明

## 技能结构

```
refactor-toolkit（主技能，编排器）
├─ refactor-audit（审计）
├─ refactor-decide（决策）
├─ refactor-design（方案设计）
├─ refactor-review（方案审查）
├─ refactor-plan（实现计划）
├─ refactor-execute（执行）
└─ refactor-verify（验证）
```

## 安装方法

### 方法一：项目级安装（推荐）

将整个 `refactor-toolkit` 目录复制到项目的 `.claude/skills/` 目录下：

```bash
mkdir -p .claude/skills
cp -r docs/skills/refactor-toolkit .claude/skills/
```

### 方法二：全局安装

复制到用户级 Skills 目录：

```bash
cp -r docs/skills/refactor-toolkit ~/.claude/skills/
```

---

## 使用方式

### 入口一：主动发现模式

```
用户："帮我看看这个项目哪些地方需要重构"

Claude：
[refactor-audit] 分析项目...
输出审计报告（场景推荐 + 优先级 + 依赖）

用户选择场景后进入重构流程
```

### 入口二：直接重构模式

```
用户："帮我把这个项目从 Express 迁移到 Hono"

Claude：
[refactor-decide] 场景识别：框架迁移，风险：高
请确认是否继续？

用户：确认

Claude：
[refactor-design] 设计方案...
[refactor-review] 审查方案...
[refactor-plan] 拆解任务...
[refactor-execute] 执行重构...
[refactor-verify] 验证结果...
```

---

## 核心原则

1. **先判断再动手** — decide 阶段评估风险
2. **没有方案不动手** — design + review 确保方向正确
3. **外科手术式修改** — 只碰必要的地方
4. **测试先行** — 没有测试就不重构核心代码

---

## 文件说明

| 文件 | 用途 |
|------|------|
| SKILL.md | 主技能编排器 |
| skills/*/SKILL.md | 子技能定义 |
| references/code-smells.md | 坏味道识别指南 |
| references/refactor-techniques.md | 重构手法详解 |
| references/surgical-modification-rules.md | 外科手术式修改规则 |
| references/common-scenarios.md | 常见场景指南 |
| references/refactor-checklist.md | 检查清单 |
| assets/refactor-plan-template.md | 计划模板 |
| assets/refactor-report-template.md | 报告模板 |
