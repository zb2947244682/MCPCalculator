# MCP Calculator Server

## 项目介绍

这是一个简单的 MCP (Model Context Protocol) 服务，提供基本的加、减、乘、除、平方根、幂运算、绝对值、自然对数和四舍五入运算。

**NPM 仓库地址:** `https://www.npmjs.com/package/@zb2947244682/mcp-calculator`

## 项目功能

此 MCP 服务提供了以下计算器工具：

- `add`: 添加两个数字
- `subtract`: 减去两个数字
- `multiply`: 乘以两个数字
- `divide`: 除以两个数字 (会处理除零错误)
- `sqrt`: 计算一个数字的平方根 (不允许负数)
- `pow`: 计算一个基数的指定指数幂
- `abs`: 计算一个数字的绝对值
- `log`: 计算一个数字的自然对数 (基数为 e，输入必须为正数)
- `round`: 将一个数字四舍五入到最接近的整数

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
