---
sidebar_position: 17
---

# 定制化技能开发

> 创建属于你自己的专业技能

## 核心理念

定制技能（Custom Skills）让你将专业知识封装为可复用的 AI 能力。

## 创建流程

### 1. 定义技能

```yaml
skill:
  name: "PRD 写作专家"
  version: "1.0.0"
  description: "帮助产品经理撰写高质量 PRD"

  # 角色定义
  role: |
    你是一个资深产品经理，擅长撰写清晰、完整的 PRD。

  # 能力列表
  capabilities:
    - 用户故事编写
    - 功能描述
    - 验收标准制定

  # 输出模板
  output_template: |
    ## 1. 需求背景
    ...

    ## 2. 用户故事
    ...

    ## 3. 功能描述
    ...
```

### 2. 封装工具

```yaml
tools:
  - name: read_file
    description: "读取现有文档"
  - name: write_file
    description: "写入新文档"
  - name: markdown_template
    description: "Markdown 模板"
```

### 3. 定义工作流

```yaml
workflow:
  steps:
    - 理解需求背景
    - 编写用户故事
    - 描述功能细节
    - 制定验收标准
    - 生成完整文档
```

## 技能示例

### 示例 1：API 文档生成

```yaml
name: API 文档生成
input: OpenAPI 规范
output: Markdown 文档

workflow:
  1. 解析 OpenAPI
  2. 提取端点信息
  3. 生成文档结构
  4. 添加示例代码
```

### 示例 2：代码转换

```yaml
name: JavaScript → TypeScript
input: JS 文件
output: TS 文件

workflow:
  1. 分析 JS 代码
  2. 推断类型
  3. 生成 TS 代码
  4. 添加类型注解
```

## 最佳实践

### 1. 单一职责

```
一个技能只做一件事：
✓ PRD 写作
✓ API 文档生成
✓ 代码审查

✗ 所有事情
```

### 2. 清晰输入输出

```
输入：用户登录需求
输出：完整的用户登录 PRD

输入：OpenAPI 规范
输出：API 文档
```

### 3. 可测试

```
技能效果验证：
- 输入标准测试用例
- 检查输出是否符合预期
- 记录测试结果
```

## 行动清单

- [ ] 分析日常工作，找可封装场景
- [ ] 创建第一个自定义技能
- [ ] 测试并优化技能效果

## 延伸阅读

- [Spec-Kit 规范开发](https://github.com)
- [OpenSpec 轻量规范](https://github.com)