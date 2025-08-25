#!/usr/bin/env node
/**
 * MCP-Calculator 计算器服务器
 * 
 * 这是一个简单的MCP演示项目，包含：
 * 1. 一个计算工具 (calculate) - 支持基本数学运算
 * 2. 一个配置资源 (config) - 提供计算器配置信息
 * 3. 一个小数计算提示词 (decimal-calc) - 帮助用户进行小数计算
 * 
 * 特点：
 * - 语法完全符合MCP官方SDK规范
 * - 简单易懂的代码结构
 * - 适合学习和演示使用
 */

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 创建MCP服务器实例
const server = new McpServer({
  name: "calculator-server",
  version: "1.0.0"
});

// 注册计算工具
server.registerTool(
  "calculate",
  {
    title: "数学计算器",
    description: "执行基本的数学运算：加法、减法、乘法、除法",
    inputSchema: {
      operation: z.enum(["add", "subtract", "multiply", "divide"]).describe("运算类型：add(加法), subtract(减法), multiply(乘法), divide(除法)"),
      a: z.coerce.number().describe("第一个数字"),
      b: z.coerce.number().describe("第二个数字")
    }
  },
  async ({ operation, a, b }) => {
    let result;
    let isError = false;
    let errorMessage = "";

    try {
      switch (operation) {
        case "add":
          result = a + b;
          break;
        case "subtract":
          result = a - b;
          break;
        case "multiply":
          result = a * b;
          break;
        case "divide":
          if (b === 0) {
            isError = true;
            errorMessage = "错误：除数不能为零";
          } else {
            result = a / b;
          }
          break;
        default:
          isError = true;
          errorMessage = `错误：未知的运算类型 "${operation}"，请使用：add(加法), subtract(减法), multiply(乘法), divide(除法)`;
      }
    } catch (error) {
      isError = true;
      errorMessage = `计算错误：${error.message}`;
    }

    if (isError) {
      return {
        content: [{ type: "text", text: errorMessage }],
        isError: true
      };
    }

    // 将英文操作符转换为中文显示
    const operationNames = {
      "add": "加",
      "subtract": "减", 
      "multiply": "乘",
      "divide": "除"
    };
    
    return {
      content: [{ type: "text", text: `${a} ${operationNames[operation]} ${b} = ${result}` }]
    };
  }
);

// 注册配置资源
server.registerResource(
  "config",
  "config://calculator",
  {
    title: "计算器配置信息",
    description: "计算器服务器的配置信息和功能说明",
    mimeType: "application/json"
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: JSON.stringify({
        serverName: "MCP 计算器服务器",
        version: "1.0.0",
        supportedOperations: ["add", "subtract", "multiply", "divide"],
        maxPrecision: 10,
        features: ["基础算术运算", "错误处理", "JSON输出"],
        resourceTemplates: {
          "计算历史记录": {
            uri: "history://{operation}/{a}/{b}",
            description: "查看特定运算的历史记录和示例",
            parameters: {
              operation: "运算类型：add(加法), subtract(减法), multiply(乘法), divide(除法)",
              a: "第一个数字",
              b: "第二个数字"
            },
            examples: [
              "history://add/5/3 - 查看5+3的加法历史",
              "history://multiply/10/2 - 查看10×2的乘法历史",
              "history://divide/15/4 - 查看15÷4的除法历史"
            ]
          }
        }
      }, null, 2)
    }]
  })
);

// 注册动态计算历史资源（使用Resource Template）
server.registerResource(
  "calculation-history",
  new ResourceTemplate("history://{operation}/{a}/{b}", { 
    list: undefined,
    complete: {
      operation: (value) => {
        return ["add", "subtract", "multiply", "divide"].filter(op => op.startsWith(value));
      }
    }
  }),
  {
    title: "计算历史记录",
    description: "查看特定运算的历史记录和示例。URI格式：history://{运算类型}/{数字1}/{数字2}",
    mimeType: "application/json"
  },
  async (uri, { operation, a, b }) => {
    // 将英文操作符转换为中文
    const operationNames = {
      "add": "加法",
      "subtract": "减法", 
      "multiply": "乘法",
      "divide": "除法"
    };
    
    // 模拟计算历史数据
    const historyData = {
      operation: operation,
      operationName: operationNames[operation] || operation,
      numbers: [Number(a), Number(b)],
      examples: [
        { a: 5, b: 3, result: operation === "add" ? 8 : operation === "subtract" ? 2 : operation === "multiply" ? 15 : 1.67 },
        { a: 10, b: 2, result: operation === "add" ? 12 : operation === "subtract" ? 8 : operation === "multiply" ? 20 : 5 },
        { a: 15, b: 4, result: operation === "add" ? 19 : operation === "subtract" ? 11 : operation === "multiply" ? 60 : 3.75 }
      ],
      tips: {
        "add": "加法运算，结果总是大于或等于较大的加数",
        "subtract": "减法运算，注意被减数要大于减数",
        "multiply": "乘法运算，正数相乘结果为正，负数相乘结果为正",
        "divide": "除法运算，除数不能为零，注意小数结果"
      }
    };
    
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(historyData, null, 2)
      }]
    };
  }
);

// 注册帮助资源（说明如何使用Resource Template）
server.registerResource(
  "help",
  "help://resource-templates",
  {
    title: "Resource Template 使用帮助",
    description: "详细说明如何使用动态资源模板",
    mimeType: "text/plain"
  },
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: `Resource Template 使用说明
=======================

1. 计算历史记录 (calculation-history)
   URI模板: history://{operation}/{a}/{b}
   
   参数说明:
   - {operation}: 运算类型
     * add = 加法
     * subtract = 减法  
     * multiply = 乘法
     * divide = 除法
   - {a}: 第一个数字
   - {b}: 第二个数字
   
   使用示例:
   - history://add/5/3     (查看5+3的加法历史)
   - history://multiply/10/2 (查看10×2的乘法历史)
   - history://divide/15/4   (查看15÷4的除法历史)
   
   返回内容:
   - 运算类型和名称
   - 输入的数字
   - 相关计算示例
   - 运算技巧提示

2. 如何访问:
   在MCP Inspector中，点击Resources标签，然后输入完整的URI即可。
   例如: history://add/5/3
`
    }]
  })
);

// 注册小数计算提示词
server.registerPrompt(
  "decimal-calc",
  {
    title: "小数计算助手",
    description: "帮助用户进行精确的小数计算，可以指定结果的小数位数",
    argsSchema: {
      precision: z.coerce.number().min(0).max(10).describe("结果的小数位数（0-10位）"),
      operation: z.string().describe("要计算的数学表达式，比如：3.14 + 2.86")
    }
  },
  ({ precision, operation }) => ({
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `请帮我计算以下数学表达式：${operation}\n\n要求：结果保留 ${precision} 位小数，请提供详细的计算步骤和最终结果。`
      }
    }]
  })
);

// 创建传输层并连接服务器
const transport = new StdioServerTransport();
await server.connect(transport);

// 服务器启动完成
// console.log("MCP Calculator Server is running...");
