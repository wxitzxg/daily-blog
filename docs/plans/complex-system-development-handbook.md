# 复杂系统 AI 编程开发实操手册

> 基于 blog 文章提炼，结合真实开发流程：全局规划 → 按模块迭代 → 集成发布

---

## 目录

1. [核心理念](#1-核心理念)
2. [工具体系总览](#2-工具体系总览)
3. [阶段一：全局规划](#3-阶段一全局规划)
4. [阶段二：按模块迭代开发](#4-阶段二按模块迭代开发)
5. [阶段三：集成与发布](#5-阶段三集成与发布)
6. [文件结构规范](#6-文件结构规范)
7. [常见问题与解决方案](#7-常见问题与解决方案)

---

## 1. 核心理念

### 1.1 阿里团队实践经验

**SDD 的问题：**
- 规格编写门槛高，需要 3-5 次迭代
- 工具链不成熟，代码生成质量不稳定
- 历史代码集成困难
- 更适合从零开始的新项目

**融合策略（推荐）：**

```
┌─────────────────────────────────────────────────────────────┐
│  1. 用 Rules 约束 AI（项目规范、架构模式、领域知识）         │
│  2. 用轻量级技术方案指导实现（30分钟完成）                   │
│  3. 用 Agentic Coding 快速迭代                              │
│  4. 用 AI 汇总文档保持同步                                   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 黄金法则

| 法则 | 说明 |
|------|------|
| **全局规划一次，模块迭代多次** | 不要一次性实现所有功能 |
| **文件所有权是铁律** | 每个 agent 负责明确的文件范围，绝不重叠 |
| **Wave 机制管依赖** | 独立任务并行，有依赖的排后面 |
| **按阶段清上下文** | Phase 1 完成后，起一个新会话做 Phase 2 |
| **Rules 文件固化规范** | 把项目约定写入 CLAUDE.md 或 Skills |

---

## 2. 工具体系总览

### 2.1 工具分层架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                        用户输入层                                    │
│  /command → 自然语言触发工作流                                      │
├─────────────────────────────────────────────────────────────────────┤
│                        编排层                                        │
│  Command（定义做什么）→ Agent（独立上下文执行）→ Skill（领域知识）   │
├─────────────────────────────────────────────────────────────────────┤
│                        执行层                                        │
│  Superpowers TDD / Agent Teams 并行 / Subagent 探索                 │
├─────────────────────────────────────────────────────────────────────┤
│                        约束层                                        │
│  Rules 文件 / Hooks / CLAUDE.md                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 工具选型速查表

| 工具 | 类型 | 核心用途 | 安装方式 |
|------|------|----------|----------|
| **Superpowers** | Skills 包 | TDD、brainstorming、代码审查 | `/plugin install superpowers` |
| **gstack** | Skills 包 | 规划评审、QA、发布 | git clone + setup |
| **BMAD** | 完整框架 | 企业级从0到1 | `npx bmad-method install` |
| **OMC** | 编排系统 | 多模式执行 | `/plugin install oh-my-claudecode` |
| **OpenSpec** | 规范管理 | 存量项目迭代 | `npm install -g @fission-ai/openspec` |
| **Google Stitch** | 设计工具 | UI 设计生成 | 网页使用 + MCP 连接 |

### 2.3 三层协作关系

```
Command（入口层）
    ↓ 触发
Agent（执行层）
    ↓ 加载
Skill（知识层）
```

**示例：**

```
/review-pr（Command）
    ↓
派发 3 个 Subagent（Agent）
    ├── code-reviewer（加载 code-review Skill）
    ├── security-auditor（加载 security-audit Skill）
    └── test-checker（加载 test-coverage Skill）
```

---

## 3. 阶段一：全局规划

### 3.1 目标

- 需求分析 → PRD 文档
- 架构设计 → 技术选型、模块划分、接口定义
- Rules 文件 → 项目规范、代码风格、领域知识
- 开发计划 → 模块优先级、迭代节奏

### 3.2 使用工具

| 工具 | 用途 | 触发方式 |
|------|------|----------|
| gstack `/office-hours` | 需求验证（YC 六步框架） | `/office-hours` |
| gstack `/plan-ceo-review` | 战略评审 | `/plan-ceo-review` |
| gstack `/plan-eng-review` | 架构评审 | `/plan-eng-review` |
| gstack `/plan-design-review` | 设计评审 | `/plan-design-review` |
| Superpowers `brainstorming` | 需求细化 | 自动触发或描述任务 |
| Plan Mode | 生成规划文档 | `/plan` 或 Shift+Tab |

### 3.3 Step-by-Step 操作

#### Step 1: 需求验证

```
/office-hours

我想做一个[产品描述]，目标用户是[用户群体]，核心功能是[功能列表]。
请帮我验证这个需求的真实性。
```

**YC 六步框架会追问：**

1. 需求现实：你解决的问题是不是真的存在？有什么证据？
2. 现状分析：现有方案是什么？它们为什么不够好？
3. 具体性：你能不能用一个具体的场景描述这个问题？
4. 最小切入点：你能做的最小有用产品是什么？
5. 观察：你有没有和潜在用户聊过？
6. 未来适配：如果这个方向成功了，下一步是什么？

**输出：** 需求验证报告（保存到 `docs/plans/requirement-validation.md`）

---

#### Step 2: 架构评审

```
/plan-eng-review

基于已验证的需求，请帮我：
1. 推荐技术栈（对比优缺点）
2. 设计模块划分方案
3. 定义模块间的接口
4. 评估技术风险
5. 输出数据模型设计
```

**输出内容：**

- 技术选型决策表
- 模块划分图（Mermaid 格式）
- 接口定义文档
- 数据模型设计
- 技术风险评估

**保存位置：** `docs/architecture/`

---

#### Step 3: 创建 Rules 文件

**项目根目录创建：**

```
project/
├── CLAUDE.md                    # 主配置（控制在 200 行内）
├── .claude/
│   ├── rules/
│   │   ├── code-style.md        # 代码风格规范
│   │   ├── project-structure.md # 项目结构规范
│   │   └── api-conventions.md   # API 规范
│   └── skills/
│       └── project-specific/    # 项目专属 Skills
```

**CLAUDE.md 模板：**

```markdown
# 项目名称

## 技术栈
- 前端：React + TypeScript
- 后端：Node.js + Express
- 数据库：PostgreSQL

## 代码规范
- 使用 TypeScript strict mode
- 组件放在 src/components/
- 业务逻辑放在 src/services/

## 命名规范
- 组件：PascalCase（如 TaskList.tsx）
- 函数：camelCase（如 calculatePoints）
- 常量：UPPER_SNAKE_CASE

## 禁止事项
- 不使用 any 类型
- 不在组件中直接调用 API
- 不修改其他模块的文件
```

**Rules 文件示例（code-style.md）：**

```markdown
# 代码风格规范

## TypeScript 规范
- 所有函数必须有返回类型注解
- 优先使用 interface 定义对象类型
- 避免使用 any，用 unknown 代替

## React 规范
- 使用函数组件 + Hooks
- 组件文件名与导出名一致
- Props 必须定义类型

## 测试规范
- 测试文件放在 tests/ 目录
- 测试文件命名：*.test.ts
- 每个测试用例独立，不依赖执行顺序
```

---

#### Step 4: 开发计划

```
/plan

基于架构设计文档，请帮我：
1. 按模块拆分开发计划
2. 标注模块间的依赖关系
3. 确定 MVP 阶段的模块范围
4. 估算每个模块的开发工时
5. 输出迭代计划表
```

**输出：** `docs/plans/development-plan.md`

```markdown
# 开发计划

## 模块划分与优先级

### MVP 阶段（验证核心价值）
| 模块 | 优先级 | 预计工时 | 依赖 | 文件范围 |
|------|--------|----------|------|----------|
| 用户认证 | P0 | 2天 | 无 | src/auth/ |
| 积分任务系统 | P0 | 5天 | 用户认证 | src/task/ |
| 心愿奖励系统 | P0 | 3天 | 积分任务系统 | src/wish/ |

### V1.1 阶段（增强粘性）
| 模块 | 优先级 | 预计工时 | 依赖 | 文件范围 |
|------|--------|----------|------|----------|
| 专注训练 | P1 | 3天 | 无 | src/focus/ |
| 语音鼓励 | P2 | 2天 | 专注训练 | src/voice/ |

## Wave 划分

### Wave 1（并行）
- 用户认证模块
- 专注训练模块（无依赖）

### Wave 2（依赖 Wave 1）
- 积分任务系统（依赖用户认证）

### Wave 3（依赖 Wave 2）
- 心愿奖励系统（依赖积分任务）
```

---

### 3.4 阶段产出清单

| 文件 | 位置 | 用途 |
|------|------|------|
| 需求验证报告 | `docs/plans/requirement-validation.md` | 验证需求真实性 |
| 架构设计文档 | `docs/architecture/system-design.md` | 技术选型、模块划分 |
| Rules 文件 | `.claude/rules/` | 项目规范 |
| 开发计划 | `docs/plans/development-plan.md` | 模块迭代计划 |
| CLAUDE.md | 根目录 | AI 编码规范 |

---

## 4. 阶段二：按模块迭代开发

### 4.1 核心原则

```
┌─────────────────────────────────────────────────────────────┐
│  每个模块一个会话                                            │
│  每个模块一套技术方案                                        │
│  每个模块独立 TDD 循环                                       │
│  模块间通过接口解耦                                          │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 使用工具

| 工具 | 用途 | 触发方式 |
|------|------|----------|
| Plan Mode | 模块级任务拆分 | `/plan` |
| Superpowers `writing-plans` | 精确到文件行的任务 | 自动触发 |
| Superpowers `TDD` | 强制测试驱动开发 | 自动触发 |
| Superpowers `subagent-driven-development` | 多代理并行执行 | 自动触发 |
| Superpowers `systematic-debugging` | Bug 调试 | 描述 bug |
| Agent Teams | 大模块并行开发 | TeamCreate |
| Git Worktree | 隔离开发环境 | `git worktree add` |

### 4.3 单模块开发流程

#### Step 1: 启动新会话

```bash
# 给会话命名方便恢复
/rename module-auth

# 或从命令行
claude --continue
```

#### Step 2: 模块级技术方案（30分钟）

```
/plan

我要开发「用户认证模块」，基于 docs/architecture/system-design.md 中的设计。

请帮我：
1. 确认模块边界和文件范围
2. 定义模块对外接口
3. 列出需要创建/修改的文件
4. 输出模块级技术方案
```

**输出：** `docs/modules/auth-spec.md`

```markdown
# 用户认证模块技术方案

## 功能范围
- 用户注册/登录
- Token 管理
- 权限验证

## 对外接口
```typescript
// src/auth/types.ts
interface AuthUser {
  id: string;
  name: string;
  role: 'parent' | 'child';
}

interface AuthService {
  login(email: string, password: string): Promise<AuthUser>;
  logout(): void;
  getCurrentUser(): AuthUser | null;
  switchRole(): void;
}
```

## 文件清单
| 文件 | 类型 | 职责 |
|------|------|------|
| src/auth/types.ts | 新建 | 类型定义 |
| src/auth/service.ts | 新建 | 业务逻辑 |
| src/auth/hooks.ts | 新建 | React Hooks |
| src/screens/LoginScreen.tsx | 新建 | 登录页面 |
| tests/auth.test.ts | 新建 | 单元测试 |

## 依赖
- 无外部依赖
- 被依赖：src/task/, src/wish/
```

#### Step 3: 任务拆分

Superpowers 会自动把方案拆成 2-5 分钟的小任务：

```markdown
### Task 1: 类型定义
文件:
- 创建: src/auth/types.ts
Step 1: 定义 AuthUser 接口
Step 2: 定义 AuthService 接口
Step 3: 导出类型

### Task 2: 业务逻辑
文件:
- 创建: src/auth/service.ts
- 测试: tests/auth.test.ts
Step 1: 写失败测试 - login 函数不存在
Step 2: 实现 login 函数
Step 3: 写失败测试 - logout 函数不存在
Step 4: 实现 logout 函数
...
```

#### Step 4: TDD 开发循环

**Superpowers 强制执行：**

```
RED（红）
  → 写失败测试
  → 运行测试确认失败
  → 确认失败原因是"功能不存在"

GREEN（绿）
  → 写最小代码让测试通过
  → 不多写一行
  → 运行测试确认通过

REFACTOR（重构）
  → 只在绿灯下重构
  → 保持测试通过
  → 提交代码
```

**验证铁律：** 没有当场跑验证命令并看到输出，不准说"完成"。

#### Step 5: 代码审查

```
/requesting-code-review

请审查 src/auth/ 目录下的代码
```

**审查要点：**
- 是否符合架构设计
- 是否遵循代码规范
- 是否有安全漏洞
- 测试覆盖率是否足够

#### Step 6: 模块完成，清上下文

```bash
# 提交代码
git add src/auth/
git commit -m "feat: implement auth module"

# 清理上下文，准备下一个模块
/clear
```

---

### 4.4 多模块并行开发（Agent Teams）

**适用场景：** 多个独立模块需要同时开发

**前置条件：**
- 已有详细的开发计划
- 模块间依赖关系明确
- 文件所有权划分清晰

#### Step 1: 启用 Agent Teams

```bash
# 项目级配置
mkdir -p .claude
cat > .claude/settings.json << 'EOF'
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
EOF
```

#### Step 2: 创建计划文件

```markdown
# 并行开发计划

## Wave 1（并行执行）

### agent-auth（用户认证）
- 文件所有权：src/auth/
- 技术方案：docs/modules/auth-spec.md
- 完成标准：测试通过、代码审查通过

### agent-focus（专注训练）
- 文件所有权：src/focus/
- 技术方案：docs/modules/focus-spec.md
- 完成标准：测试通过、代码审查通过

## Wave 2（依赖 Wave 1）

### agent-task（积分任务）
- 文件所有权：src/task/
- 依赖：src/auth/types.ts（只读）
- 技术方案：docs/modules/task-spec.md
```

#### Step 3: 启动 Agent Team

```
读一下 PARALLEL_PLAN.md，创建 Agent Team 按计划执行开发。
你只负责协调，不要自己写代码。
所有 teammate 完成之前不要结束会话。
```

#### Step 4: 观察协调

```
# 查看进度
你：现在进度怎么样了？

# Lead 会回复
Lead：agent-auth 已完成登录功能，正在实现权限验证。
agent-focus 已完成专注计时器，正在做测试。
```

#### Step 5: 合并验证

```
# Team Lead 自动执行
git merge agent-auth-worktree
git merge agent-focus-worktree
npm test
```

---

### 4.5 OMC 高级模式

**安装：**

```bash
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode
/oh-my-claudecode:omc-setup --local
```

**五大执行模式：**

| 模式 | 用途 | 示例 |
|------|------|------|
| Autopilot | 完全自主执行 | `/oh-my-claudecode:autopilot "build user auth module"` |
| Ultrapilot | 并行加速（3-5倍） | `/oh-my-claudecode:ultrapilot "build fullstack todo app"` |
| Swarm | 批量独立任务 | `/oh-my-claudecode:swarm 5:executor "fix all TypeScript errors"` |
| Pipeline | 流水线模式 | `/oh-my-claudecode:pipeline explore:haiku -> architect:opus -> executor:sonnet` |
| Ecomode | 经济模式 | `/oh-my-claudecode:ecomode "refactor auth system"` |

**32 个专业智能体：**

```
分析与架构类：
- architect (Opus)：复杂调试、系统架构设计
- architect-medium (Sonnet)：常规技术分析、方案设计
- architect-low (Haiku)：快速问题定位

执行类：
- executor-high (Opus)：复杂代码重构
- executor (Sonnet)：常规业务功能实现
- executor-low (Haiku)：简单代码修改

前端与设计类：
- designer-high (Opus)：复杂 UI 系统设计
- designer (Sonnet)：组件级 UI 设计
- designer-low (Haiku)：简单样式调整

其他核心角色：
- planner (Opus)：任务规划
- critic (Opus)：方案评审、代码审查
- researcher (Sonnet)：文档查找、资料调研
- qa-tester (Sonnet)：自动化测试
```

---

## 5. 阶段三：集成与发布

### 5.1 使用工具

| 工具 | 用途 | 触发方式 |
|------|------|----------|
| gstack `/qa` | 浏览器自动化测试 | `/qa` |
| gstack `/qa-only` | 只报告不修复 | `/qa-only` |
| gstack `/review` | PR 代码审查 | `/review` |
| gstack `/ship` | 一键发布 | `/ship` |
| Superpowers `verification-before-completion` | 完成前验证 | 自动触发 |

### 5.2 集成测试流程

#### Step 1: 模块集成

```
请帮我集成所有已完成的模块：
1. 检查模块间接口是否一致
2. 运行全量测试
3. 修复集成问题
```

#### Step 2: 自动化 QA 测试

```
/qa

请测试以下核心流程：
1. 用户登录流程
2. 任务创建和完成流程
3. 积分计算和兑换流程
```

**gstack 会：**
- 自动打开浏览器
- 遍历所有页面
- 测试核心流程
- 发现 bug 自动修复
- 生成测试报告

#### Step 3: 代码审查

```
/review

请审查所有待合并的代码
```

**审查维度：**
- 代码质量
- 安全漏洞
- 性能问题
- 测试覆盖

#### Step 4: 发布

```
/ship

请帮我发布到生产环境
```

**gstack 会自动：**
- 同步主分支
- 运行全量测试
- 创建 PR
- 推送代码

---

### 5.3 发布检查清单

```markdown
## 发布前检查

### 代码质量
- [ ] 所有测试通过
- [ ] 代码审查通过
- [ ] 无安全漏洞
- [ ] 无 console.log 残留

### 功能完整性
- [ ] MVP 功能全部实现
- [ ] 核心流程可跑通
- [ ] 边界情况已处理

### 文档
- [ ] README 更新
- [ ] API 文档更新
- [ ] CHANGELOG 更新

### 部署
- [ ] 环境变量配置
- [ ] 数据库迁移脚本
- [ ] 回滚方案
```

---

## 6. 文件结构规范

### 6.1 项目目录结构

```
project/
├── CLAUDE.md                    # AI 编码规范（控制在 200 行内）
├── DESIGN.md                    # 设计规范（可选，从 Stitch 导出）
│
├── .claude/
│   ├── settings.json            # 项目级配置
│   ├── rules/                   # Rules 文件
│   │   ├── code-style.md
│   │   ├── project-structure.md
│   │   └── api-conventions.md
│   ├── skills/                  # 项目专属 Skills
│   │   └── project-specific/
│   │       └── SKILL.md
│   ├── commands/                # 自定义 Commands
│   │   └── deploy.md
│   └── plans/                   # Plan Mode 生成的计划
│       └── *.md
│
├── docs/
│   ├── plans/                   # 开发计划
│   │   ├── prd-*.md
│   │   ├── development-plan.md
│   │   └── requirement-validation.md
│   ├── architecture/            # 架构设计
│   │   └── system-design.md
│   └── modules/                 # 模块级技术方案
│       ├── auth-spec.md
│       └── task-spec.md
│
├── src/                         # 源代码
│   ├── components/              # UI 组件
│   ├── screens/                 # 页面
│   ├── services/                # 业务逻辑
│   ├── models/                  # 数据模型
│   └── utils/                   # 工具函数
│
└── tests/                       # 测试文件
    ├── unit/
    └── e2e/
```

### 6.2 Rules 文件模板

**code-style.md：**

```markdown
# 代码风格规范

## 语言规范
- 使用 TypeScript strict mode
- 所有函数必须有返回类型注解
- 优先使用 interface 定义对象类型
- 避免使用 any，用 unknown 代替

## 命名规范
- 组件：PascalCase（如 TaskList.tsx）
- 函数：camelCase（如 calculatePoints）
- 常量：UPPER_SNAKE_CASE
- 文件名：与导出的主要名称一致

## 文件规范
- 单文件不超过 400 行
- 单函数不超过 50 行
- 避免深度嵌套（不超过 4 层）

## 测试规范
- 测试文件放在 tests/ 目录
- 测试文件命名：*.test.ts
- 每个测试用例独立，不依赖执行顺序
```

**project-structure.md：**

```markdown
# 项目结构规范

## 目录职责
- src/components/：可复用 UI 组件
- src/screens/：页面级组件
- src/services/：业务逻辑和 API 调用
- src/models/：数据模型和类型定义
- src/utils/：纯工具函数

## 模块边界
- 每个模块有独立的目录
- 模块间通过接口通信
- 禁止跨模块直接修改文件

## 禁止事项
- 不在组件中直接调用 API
- 不修改其他模块的文件
- 不在 utils 中放业务逻辑
```

---

## 7. 常见问题与解决方案

### 7.1 上下文爆炸

**问题：** 会话越来越长，AI 响应变慢

**解决方案：**

```bash
# 手动压缩
/compact

# 切换任务时清空
/clear

# 大任务按模块拆分会话
/rename module-auth
# 完成后
/rename module-task
```

### 7.2 AI 不遵循规范

**问题：** AI 生成的代码风格不一致

**解决方案：**

1. **强化 Rules 文件**：把具体规则写入 `.claude/rules/`
2. **使用 Hooks**：在文件编辑后自动运行检查
3. **代码审查**：每次提交前用 `/review` 检查

### 7.3 模块间冲突

**问题：** 多个模块修改同一个文件

**解决方案：**

1. **严格文件所有权**：每个模块有明确的文件范围
2. **接口解耦**：模块间只通过定义好的接口通信
3. **Wave 机制**：有依赖的模块串行开发

### 7.4 测试失败不知道原因

**问题：** 测试失败但不知道为什么

**解决方案：**

```
/systematic-debugging

测试 [测试名] 失败了，错误信息是：
[粘贴错误信息]

请帮我：
1. 分析失败原因
2. 找出根因
3. 给出修复方案
```

### 7.5 发布前漏测

**问题：** 发布后发现有 bug

**解决方案：**

1. **使用 `/qa`**：自动化浏览器测试
2. **验证铁律**：没有跑验证命令不能说完成
3. **回归测试**：每次修改都跑全量测试

---

## 附录：工具安装指南

### A. Superpowers 安装

```bash
# 官方安装
claude install-plugin superpowers-marketplace/superpowers

# 或 FradSer 增强版
claude plugin marketplace add FradSer/dotclaude
claude plugin install superpowers@frad-dotclaude
```

### B. gstack 安装

```bash
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

### C. BMAD 安装

```bash
npx bmad-method install
```

### D. OMC 安装

```bash
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode
/oh-my-claudecode:omc-setup --local
```

### E. Google Stitch MCP 配置

```bash
claude mcp add stitch --transport http https://stitch.googleapis.com/mcp --header "X-Goog-Api-Key: 你的APIKey" -s user
```

### F. OpenSpec 安装

```bash
npm install -g @fission-ai/openspec@latest
openspec init
```

---

## 参考资源

- Superpowers: https://github.com/obra/superpowers
- gstack: https://github.com/garrytan/gstack
- BMAD: https://github.com/bmad-code-org/BMAD-METHOD
- OMC: https://github.com/Yeachan-Heo/oh-my-claudecode
- OpenSpec: https://github.com/Fission-AI/OpenSpec
- SpecKit: https://github.com/github/spec-kit
- Google Stitch: https://stitch.withgoogle.com
- awesome-design-md: https://github.com/VoltAgent/awesome-design-md
