# refactor-toolkit 拆分实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将单一的重构技能包拆分为7个独立技能，采用主从结构。

**Architecture:** 主技能 refactor-toolkit 作为编排器，根据用户请求自动选择子技能执行。子技能可独立调用，也可被主技能编排。共享 references 和 assets 目录。

**Tech Stack:** Markdown skill files, 无代码依赖

---

## 文件结构

**新建文件：**
```
docs/skills/refactor-toolkit/
├── SKILL.md                    # 修改：主技能编排器
├── skills/                     # 新建目录
│   ├── refactor-audit/
│   │   └── SKILL.md
│   ├── refactor-decide/
│   │   └── SKILL.md
│   ├── refactor-design/
│   │   └── SKILL.md
│   ├── refactor-review/
│   │   └── SKILL.md
│   ├── refactor-plan/
│   │   └── SKILL.md
│   ├── refactor-execute/
│   │   └── SKILL.md
│   └── refactor-verify/
│       └── SKILL.md
├── references/                 # 保留，共享
└── assets/                     # 保留，共享
```

**复用现有文件：**
- `references/code-smells.md`
- `references/common-scenarios.md`
- `references/refactor-techniques.md`
- `references/surgical-modification-rules.md`
- `references/refactor-checklist.md`
- `assets/refactor-plan-template.md`
- `assets/refactor-report-template.md`

---

## Task 1: 创建 skills 目录结构

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/`

- [ ] **Step 1: 创建子技能目录**

```bash
mkdir -p docs/skills/refactor-toolkit/skills/{refactor-audit,refactor-decide,refactor-design,refactor-review,refactor-plan,refactor-execute,refactor-verify}
```

- [ ] **Step 2: 验证目录创建成功**

Run: `ls -la docs/skills/refactor-toolkit/skills/`
Expected: 显示7个子目录

- [ ] **Step 3: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/
git commit -m "chore: create skills subdirectories for refactor-toolkit"
```

---

## Task 2: 创建 refactor-decide 技能（P0核心）

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/refactor-decide/SKILL.md`

- [ ] **Step 1: 创建 refactor-decide SKILL.md**

```markdown
---
name: refactor-decide
description: 重构决策技能。确认重构场景、评估风险等级、选择方法论、决定执行流程。触发条件：用户提到"重构"、"迁移"、"改造"、"升级"等关键词。
metadata:
  pattern: decision
  domain: refactoring
  parent: refactor-toolkit
---

# refactor-decide（重构决策）

> 铁律：先判断是否需要重构，再决定怎么重构。

## 触发条件

- 用户直接提出重构请求
- refactor-audit 输出审计报告后

## 流程

### Step 1: 场景识别

根据用户描述识别重构场景：

| 场景 | 关键词 | 风险等级 |
|------|--------|----------|
| 小范围优化 | "优化"、"清理"、"简化" | 低 |
| 代码风格统一 | "统一风格"、"规范化"、"格式化" | 低 |
| 技术栈升级 | "升级"、"迁移到"、"换成" | 中 |
| 框架迁移 | "Express→Hono"、"Vue2→Vue3" | 高 |
| 遗留代码重构 | "遗留"、"老代码"、"技术债" | 高 |
| 大规模重构 | "重构整个"、"全部重写" | 高 |

### Step 2: 风险评估

| 风险等级 | 条件 | 测试要求 |
|----------|------|----------|
| 低 | 单文件、逻辑简单 | 有测试即可 |
| 中 | 多文件、逻辑复杂 | 80%+ 覆盖 |
| 高 | 核心模块、框架迁移 | 100% 覆盖 |
| 极高 | 数据库变更、架构重写 | 全量回归 |

### Step 3: 方法论选择

| 场景 | 推荐方法论 |
|------|-----------|
| 小范围优化 | 童子军规则 |
| 代码风格统一 | ESLint + Prettier |
| 技术栈升级 | 分阶段迁移 |
| 框架迁移 | 渐进式迁移 |
| 遗留代码重构 | 绞杀植物模式 |
| 大规模重构 | Wave机制 |

### Step 4: 流程建议

根据风险等级决定执行流程：

| 风险等级 | 流程 |
|----------|------|
| 低 | 简化流程：decide → execute → verify |
| 中/高/极高 | 完整流程：decide → design → review → plan → execute → verify |

## 输出格式

```markdown
# 重构决策报告

## 场景识别
- 场景：[场景名称]
- 风险等级：[低/中/高/极高]

## 方法论选择
- 推荐方法论：[方法论名称]
- 原因：[简述原因]

## 流程建议
- 推荐流程：[简化流程 / 完整流程]
- 预计涉及文件：[数量]

## 下一步
请确认是否继续重构？
```

## 用户确认

**必须**等待用户确认后才可进入下一阶段。
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/refactor-decide/SKILL.md
git commit -m "feat: add refactor-decide skill"
```

---

## Task 3: 创建 refactor-execute 技能（P0核心）

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/refactor-execute/SKILL.md`

- [ ] **Step 1: 创建 refactor-execute SKILL.md**

```markdown
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
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/refactor-execute/SKILL.md
git commit -m "feat: add refactor-execute skill"
```

---

## Task 4: 创建 refactor-verify 技能（P0核心）

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/refactor-verify/SKILL.md`

- [ ] **Step 1: 创建 refactor-verify SKILL.md**

```markdown
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
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/refactor-verify/SKILL.md
git commit -m "feat: add refactor-verify skill"
```

---

## Task 5: 创建主技能 refactor-toolkit（P0编排器）

**Files:**
- Modify: `docs/skills/refactor-toolkit/SKILL.md`

- [ ] **Step 1: 重写 refactor-toolkit SKILL.md 为编排器**

```markdown
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
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/SKILL.md
git commit -m "refactor: convert refactor-toolkit to orchestrator with 7 sub-skills"
```

---

## Task 6: 创建 refactor-audit 技能（P1）

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/refactor-audit/SKILL.md`

- [ ] **Step 1: 创建 refactor-audit SKILL.md**

```markdown
---
name: refactor-audit
description: 代码审计技能。深度扫描项目、识别坏味道、推荐重构场景、标注依赖顺序。触发条件：用户请求"分析项目"、"看看哪些需要重构"。
metadata:
  pattern: analysis
  domain: refactoring
  parent: refactor-toolkit
---

# refactor-audit（代码审计）

> 主动发现重构机会。

## 流程

### Step 1: 分析项目结构

```
1. 读取 package.json / 依赖配置
2. 扫描目录结构
3. 识别主要模块
4. 分析依赖关系
```

### Step 2: 识别代码坏味道

加载 `references/code-smells.md`：

| 坏味道 | 检测方式 | 严重程度 |
|--------|----------|----------|
| 重复代码 | 同样逻辑出现多次 | 高 |
| 过长函数 | 函数超过 50 行 | 高 |
| 过大类 | 类超过 500 行 | 中 |
| 过长参数列表 | 参数超过 4 个 | 中 |
| 发散式变化 | 一个类因多种原因变化 | 高 |
| 霰弹式修改 | 一个变化要改多个类 | 高 |

### Step 3: 检查测试覆盖

```
1. 统计测试文件数量
2. 估算测试覆盖率
3. 识别测试盲区
```

### Step 4: 推荐重构场景

根据发现的问题推荐重构场景：

| 问题类型 | 推荐场景 | 优先级 |
|----------|----------|--------|
| 代码风格不一致 | 代码风格统一 | P0 |
| 技术栈过时 | 技术栈升级 | P1 |
| 重复代码多 | 小范围优化 | P1 |
| 框架版本老旧 | 框架迁移 | P2 |

### Step 5: 标注依赖顺序

分析场景之间的依赖关系，建议执行顺序。

## 输出格式

```markdown
# 审计报告

## 项目概况
- 技术栈：[...]
- 主要模块：[...]
- 测试覆盖率：XX%

## 发现的问题
| 模块 | 坏味道 | 严重程度 | 影响范围 |
|------|--------|----------|----------|
| ... | ... | ... | ... |

## 推荐重构场景
| # | 场景 | 优先级 | 依赖 | 预计工作量 |
|---|------|--------|------|-----------|
| 1 | 代码风格统一 | P0 | 无 | 小 |
| 2 | 技术栈升级 | P1 | 依赖1 | 中 |
| 3 | 框架迁移 | P2 | 依赖1、2 | 大 |

## 建议
请选择要执行的场景编号，或输入"全部"按顺序执行所有场景。
```
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/refactor-audit/SKILL.md
git commit -m "feat: add refactor-audit skill"
```

---

## Task 7: 创建 refactor-design 技能（P2）

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/refactor-design/SKILL.md`

- [ ] **Step 1: 创建 refactor-design SKILL.md**

```markdown
---
name: refactor-design
description: 重构方案设计技能。设计目标架构、识别接缝、生成API映射表/Wave划分。触发条件：refactor-decide 输出中高风险决策后。
metadata:
  pattern: design
  domain: refactoring
  parent: refactor-toolkit
---

# refactor-design（方案设计）

> 铁律：没有方案，不准动手。

## 流程

### Step 1: 架构设计

```
1. 确定重构目标架构
2. 规划模块边界
3. 定义接口契约
```

### Step 2: 接缝识别

> 接缝（Seam）：一个可以安全修改的地方，不会影响调用方。

```
1. 识别可安全修改的入口点
2. 分析依赖关系
3. 确定修改顺序
```

**接缝类型：**
| 类型 | 说明 | 示例 |
|------|------|------|
| 接口层 | 通过接口隔离实现 | DataSource 接口 |
| 适配层 | 封装外部依赖 | API Client Adapter |
| 配置层 | 通过配置切换行为 | Feature Flag |

### Step 3: 场景特定设计

**框架迁移：**
- 生成 API 映射表
- 识别行为差异
- 设计双跑方案

**大规模重构：**
- 划分 Wave
- 定义文件所有权
- 设计 Agent 协作方式

**遗留代码重构：**
- 设计双跑架构
- 规划绞杀植物模式

### Step 4: 输出重构方案

## 输出格式

```markdown
# 重构方案

## 目标架构
[架构描述/图示]

## 接缝清单
| 接缝 | 位置 | 修改类型 | 风险 |
|------|------|----------|------|
| ... | ... | ... | ... |

## API映射表（框架迁移）
| 源 API | 目标 API | 行为差异 | 注意事项 |
|--------|----------|----------|----------|
| ... | ... | ... | ... |

## Wave划分（大规模重构）
- Wave 1：[模块A] + [模块B]（并行）
  - Agent A：文件所有权 src/a/
  - Agent B：文件所有权 src/b/
- Wave 2：[模块C]（依赖Wave 1）
  - Agent C：集成

## 风险点
| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| ... | ... | ... |
```
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/refactor-design/SKILL.md
git commit -m "feat: add refactor-design skill"
```

---

## Task 8: 创建 refactor-review 技能（P2）

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/refactor-review/SKILL.md`

- [ ] **Step 1: 创建 refactor-review SKILL.md**

```markdown
---
name: refactor-review
description: 方案审查技能。自动全方位审查重构方案，发现问题并提出改进建议。触发条件：refactor-design 输出方案后自动执行。
metadata:
  pattern: review
  domain: refactoring
  parent: refactor-toolkit
---

# refactor-review（方案审查）

> 自动全方位审查，确保方案质量。

## 审查维度

### 1. 方法论审核

```
- 方法论是否适合当前场景？
- 是否有更优的方法论可选？
- 方法论应用是否正确？
```

### 2. 范围审核

```
- 重构范围是否合理？
- 是否有遗漏的模块？
- 是否有不必要的重构？
```

### 3. 风险审核

```
- 风险等级评估是否准确？
- 是否有未识别的风险？
- 回滚方案是否可行？
```

### 4. 接缝审核

```
- 接缝是否可以安全修改？
- 是否有遗漏的接缝？
- 依赖分析是否完整？
```

### 5. 场景特定审核

**框架迁移：**
- API映射表是否完整？
- 行为差异是否识别？
- 双跑方案是否可行？

**大规模重构：**
- Wave划分是否合理？
- 文件所有权是否清晰？
- Agent协作是否可行？

**遗留代码重构：**
- 特性测试是否覆盖关键行为？
- 绞杀植物模式是否正确应用？

## 输出格式

```markdown
# 方案审查报告

## 审查结果：通过 / 需修改

## 检查项结果
| 维度 | 状态 | 说明 |
|------|------|------|
| 方法论 | ✅/❌ | ... |
| 范围 | ✅/❌ | ... |
| 风险 | ✅/❌ | ... |
| 接缝 | ✅/❌ | ... |
| 场景特定 | ✅/❌ | ... |

## 问题清单
| # | 类别 | 问题描述 | 严重程度 | 改进建议 |
|---|------|----------|----------|----------|
| 1 | ... | ... | 高/中/低 | ... |

## 改进建议
1. ...
2. ...

## 结论
- ✅ 通过：自动进入 plan 阶段
- ❌ 需修改：返回 design 阶段修改方案
```

## 审查结果处理

| 结果 | 处理 |
|------|------|
| 通过 | 自动进入 refactor-plan |
| 需修改 | 返回 refactor-design，附上问题清单 |
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/refactor-review/SKILL.md
git commit -m "feat: add refactor-review skill"
```

---

## Task 9: 创建 refactor-plan 技能（P2）

**Files:**
- Create: `docs/skills/refactor-toolkit/skills/refactor-plan/SKILL.md`

- [ ] **Step 1: 创建 refactor-plan SKILL.md**

```markdown
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
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/skills/refactor-plan/SKILL.md
git commit -m "feat: add refactor-plan skill"
```

---

## Task 10: 更新 README.md

**Files:**
- Modify: `docs/skills/refactor-toolkit/README.md`

- [ ] **Step 1: 更新 README.md**

```markdown
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
```

- [ ] **Step 2: 提交**

```bash
git add docs/skills/refactor-toolkit/README.md
git commit -m "docs: update README for refactored skill structure"
```

---

## Task 11: 删除旧文件并验证

**Files:**
- Delete: `docs/skills/refactor-toolkit/test-prompts.json`

- [ ] **Step 1: 删除临时测试文件**

```bash
rm docs/skills/refactor-toolkit/test-prompts.json
```

- [ ] **Step 2: 验证文件结构**

Run: `find docs/skills/refactor-toolkit -type f -name "*.md" | sort`
Expected: 显示所有 SKILL.md 和 references/assets 文件

- [ ] **Step 3: 最终提交**

```bash
git add -A
git commit -m "refactor: complete refactor-toolkit restructure

- Split into 7 skills: audit, decide, design, review, plan, execute, verify
- Main skill acts as orchestrator
- Support two entry modes: audit discovery and direct refactor
- Share references and assets across all skills"
```
