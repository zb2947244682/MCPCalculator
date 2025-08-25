# MCP Calculator 计算器服务器

这是一个基于MCP (Model Context Protocol) 官方SDK的计算器演示项目，采用模块化架构设计。

## 项目特点

- **模块化架构**: 每个功能模块独立成文件，便于维护和扩展
- **MCP规范**: 完全符合MCP官方SDK规范
- **中文支持**: 提供中文界面和错误提示
- **资源模板**: 支持动态URI资源访问
- **错误处理**: 完善的错误处理和用户提示

## 项目结构

```
mcp-calculator/
├── index.js              # 主入口文件，负责启动服务器
├── registrar.js          # 注册器，管理所有组件的注册
├── tools/                # 工具模块目录
│   └── calculatorTool.js # 计算器工具实现
├── resources/            # 资源模块目录
│   ├── configResource.js # 配置资源
│   ├── historyResource.js # 历史记录资源
│   └── helpResource.js   # 帮助资源
├── prompts/              # 提示词模块目录
│   └── decimalCalcPrompt.js # 小数计算提示词
├── utils/                # 工具方法目录
│   ├── operationUtils.js # 数学运算工具方法
│   └── dataUtils.js      # 数据生成工具方法
└── README.md             # 项目说明文档
```

## 功能模块

### 1. 计算器工具 (calculate)
- 支持加法、减法、乘法、除法
- 完善的错误处理（如除零检查）
- 中文运算符号显示

### 2. 配置资源 (config://calculator)
- 服务器基本信息
- 支持的功能列表
- 资源模板说明

### 3. 历史记录资源 (history://{operation}/{a}/{b})
- 动态URI模板
- 运算历史示例
- 运算技巧提示

### 4. 帮助资源 (help://resource-templates)
- Resource Template使用说明
- 详细的使用示例

### 5. 小数计算提示词 (decimal-calc)
- 支持指定小数位数
- 详细的计算步骤指导

## 使用方法

### 启动服务器
```bash
node index.js
```

### 在MCP Inspector中测试
1. 启动MCP Inspector
2. 连接到计算器服务器
3. 测试各种工具和资源

## 模块化设计优势

1. **可维护性**: 每个功能独立，修改不影响其他模块
2. **可扩展性**: 新增功能只需添加新模块，无需修改现有代码
3. **可测试性**: 每个模块可以独立测试
4. **代码复用**: 工具方法可以在多个模块间共享
5. **团队协作**: 不同开发者可以并行开发不同模块

## 开发指南

### 添加新工具
1. 在 `tools/` 目录下创建新文件
2. 定义工具配置和处理函数
3. 在 `registrar.js` 中注册新工具

### 添加新资源
1. 在 `resources/` 目录下创建新文件
2. 定义资源配置和处理函数
3. 在 `registrar.js` 中注册新资源

### 添加新提示词
1. 在 `prompts/` 目录下创建新文件
2. 定义提示词配置和处理函数
3. 在 `registrar.js` 中注册新提示词

## 依赖项

- `@modelcontextprotocol/sdk`: MCP官方SDK
- `zod`: 数据验证库

## 许可证

MIT License
