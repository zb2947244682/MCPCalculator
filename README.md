# MCP Calculator Server

## 项目介绍

这是一个简单的 MCP (Model Context Protocol) 服务，提供基本的加、减、乘、除运算，以及配置信息和计算历史记录。

**NPM 仓库地址:** `https://www.npmjs.com/package/@zb2947244682/mcp-calculator`

## 项目功能

此 MCP 服务提供了以下功能：

- **工具 (Tools):**
  - `calculate`: 执行基本的数学运算：加法、减法、乘法、除法。

- **资源 (Resources):**
  - `config`: 提供计算器服务器的配置信息和功能说明。
  - `calculation-history`: 查看特定运算的历史记录和示例，支持动态URI模板 `history://{operation}/{a}/{b}`。
  - `help`: 提供 `Resource Template` 的使用帮助。

- **提示词 (Prompts):**
  - `decimal-calc`: 帮助用户进行精确的小数计算，可以指定结果的小数位数。

## 如何配置到 Cursor 中

将以下配置添加到您的 Cursor `mcp.json` 文件中：

```json
{
  // ... 其他现有配置 ...
  "mcp-calculator": {
    "command": "npx",
    "args": [
      "-y",
      "@zb2947244682/mcp-calculator@latest"
    ]
  }
}
```

# 通过 npx 运行

您可以通过以下单行命令直接从命令行运行此 MCP 项目：

```bash
npx @zb2947244682/mcp-calculator@latest
```

## 本地开发配置

如果您在本地开发环境中使用，可以将以下配置添加到您的 Cursor `mcp.json` 文件中：

```json
{
  "mcp-calculator": {
    "command": "node",
    "args": ["D:\\Codes\\MCPRepo\\mcp-calculator\\index.js"]
  }
}
```
