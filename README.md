# MCP Calculator Server

## 项目介绍

这是一个简单的 MCP (Model Context Protocol) 服务，提供基本的加、减、乘、除、平方根、幂运算、绝对值、自然对数和四舍五入运算。

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

要将此 MCP 服务配置到 Cursor 中，您可以将以下 JSON 片段添加到您的 `c:\Users\Jimmy\.cursor\mcp.json` 文件中 (如果该文件不存在，请创建它)。

**请确保在添加前，`c:\Users\Jimmy\.cursor\mcp.json` 是一个有效的 JSON 对象。**

```json
{
  // ... 其他现有配置 ...
  "calculator-mcp": {
    "command": "npx",
    "args": [
      "-y",
      "@zb2947244682/mcp-calculator"
    ]
  }
}
```
