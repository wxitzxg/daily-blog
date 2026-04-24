# refactor-toolkit 使用说明

## 安装方法

### 方法一：项目级安装（推荐）

将整个 `refactor-toolkit` 目录复制到项目的 `.claude/skills/` 目录下：

```bash
# 创建目录
mkdir -p .claude/skills

# 复制技能包
cp -r docs/skills/refactor-toolkit .claude/skills/
```

### 方法二：全局安装

复制到用户级 Skills 目录：

```bash
cp -r docs/skills/refactor-toolkit ~/.claude/skills/
```

---

## 目录结构

```
refactor-toolkit/
├── SKILL.md                              # 主文件（必须）
├── assets/
│   ├── refactor-plan-template.md         # 计划模板
│   └── refactor-report-template.md       # 报告模板
└── references/
    ├── refactor-checklist.md             # 检查清单
    ├── surgical-modification-rules.md    # 外科手术式修改规则
    └── common-scenarios.md               # 常见场景指南
```

---

## 触发方式

技能包会在以下情况自动激活：

- 用户提到"重构"、"迁移"、"改造"、"升级"
- 用户提到框架迁移（如 "Express → Hono"）
- 用户提到代码风格统一

也可以手动触发：

```
使用 refactor-toolkit 帮我重构用户认证模块
```

---

## 使用示例

### 示例 1：框架迁移

```
用户：帮我把这个项目从 Express 迁移到 Hono

Claude（自动激活 refactor-toolkit）：
我已经分析了项目结构：

- 路由文件：src/routes/*.ts（25 个）
- 中间件：src/middleware/*.ts（5 个）
- 测试覆盖：75%

API 映射表：
| Express | Hono |
|---------|------|
| req.body | c.req.json() |
| ... | ... |

请确认是否开始迁移？
```

### 示例 2：代码风格统一

```
用户：帮我把 callback 改成 async/await

Claude（自动激活 refactor-toolkit）：
我找到了 15 个使用 callback 的函数：

| 文件 | 函数 | 风险 |
|------|------|------|
| auth/login.js | authenticate | 低 |
| ... | ... | ... |

请确认是否开始迁移？
```

### 示例 3：大规模重构

```
用户：帮我把整个项目重构一下

Claude（自动激活 refactor-toolkit）：
项目分析完成：

- 主要模块：auth, user, order, payment
- 代码量：15,000 行
- 测试覆盖：60%

请告诉我你想重构哪些方面？
1. 框架迁移
2. 代码风格统一
3. TypeScript 迁移
4. 其他
```

---

## 核心原则

技能包会强制遵守以下原则：

### 1. 不理解不动手

```
❌ 直接开始改代码
✅ 先分析现有代码 → 提取规范 → 确认范围
```

### 2. 没有计划不动手

```
❌ 想到哪改到哪
✅ 生成计划 → 用户确认 → 按计划执行
```

### 3. 外科手术式修改

```
❌ 顺便优化其他代码
✅ 只碰非碰不可的地方
```

### 4. 测试先行

```
❌ 改完再说
✅ 先写测试 → 改代码 → 验证测试通过
```

---

## 配合其他工具

| 工具 | 配合方式 |
|------|----------|
| OpenSpec | 创建变更提案 |
| Superpowers | 使用 TDD 流程 |
| Agent Teams | 大规模并行重构 |
| gstack /qa | 自动化测试验证 |

---

## 文件说明

| 文件 | 用途 |
|------|------|
| SKILL.md | 主逻辑，定义四个阶段 |
| refactor-checklist.md | 每阶段检查清单 |
| surgical-modification-rules.md | 核心修改规则 |
| common-scenarios.md | 常见场景操作指南 |
| refactor-plan-template.md | 计划模板 |
| refactor-report-template.md | 报告模板 |

---

## 自定义

可以在 `SKILL.md` 末尾添加项目特有的重构规则：

```markdown
## 项目特有规则

- 不动 src/payment/ 目录
- 所有 API 必须保持向后兼容
- 重构前必须通知团队负责人
```
