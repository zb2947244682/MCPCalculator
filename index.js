#!/usr/bin/env node
/**
 * MCP-Calculator 计算器服务器
 * 
 * 这是一个功能完整的数学计算工具集，提供8个核心计算工具：
 * 1. add - 加法运算
 * 2. subtract - 减法运算  
 * 3. multiply - 乘法运算
 * 4. divide - 除法运算（带除零检查）
 * 5. sqrt - 平方根计算（带负数检查）
 * 6. pow - 幂运算
 * 7. abs - 绝对值计算
 * 8. log - 自然对数（带正数检查）
 * 9. round - 四舍五入
 * 
 * 特点：
 * - 完整的数学运算支持
 * - 智能错误处理（除零、负数平方根等）
 * - 支持整数和小数运算
 * - 返回标准化的文本格式结果
 * 
 * 额外功能：
 * - greeting 资源：动态问候生成器
 * - 支持动态参数 {name} 的URI模式
 */

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "calculator-server", // 更准确的服务器名称
  version: "1.0.0"
});

// 注册一个名为 "add" 的工具 (加法工具)
server.registerTool("add",
  {
    title: "Addition Tool",         // 工具在 UI 中显示的标题
    description: "Add two numbers", // 工具的描述
    inputSchema: { a: z.number(), b: z.number() } // 定义工具的输入参数 schema，使用 zod 进行类型验证
  },
  // 工具的处理函数，当工具被调用时执行
  // 接收解构的参数 { a, b }
  async ({ a, b }) => ({
    // 返回一个包含结果内容的对象
    content: [{ type: "text", text: String(a + b) }] // 结果以文本形式返回
  })
);

// 注册一个名为 "subtract" 的工具 (减法工具)
server.registerTool("subtract",
  {
    title: "Subtract Tool",
    description: "Subtract two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a - b) }]
  })
);

// 注册一个名为 "multiply" 的工具 (乘法工具)
server.registerTool("multiply",
  {
    title: "Multiply Tool",
    description: "Multiply two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a * b) }]
  })
);

// 注册一个名为 "divide" 的工具 (除法工具)
server.registerTool("divide",
  {
    title: "Divide Tool",
    description: "Divide two numbers",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => {
    // 处理除数为零的情况，返回错误信息
    if (b === 0) {
      return {
        content: [{ type: "text", text: "Error: Division by zero" }], // 错误消息
        isError: true                                             // 标记为错误响应
      };
    }
    // 返回计算结果
    return {
      content: [{ type: "text", text: String(a / b) }]
    };
  }
);

// 注册一个名为 "sqrt" 的工具 (平方根工具)
server.registerTool("sqrt",
  {
    title: "Square Root Tool",
    description: "Calculate the square root of a number",
    inputSchema: { a: z.number() }
  },
  async ({ a }) => {
    if (a < 0) {
      return {
        content: [{ type: "text", text: "Error: Cannot calculate square root of a negative number" }],
        isError: true
      };
    }
    return {
      content: [{ type: "text", text: String(Math.sqrt(a)) }]
    };
  }
);

// 注册一个名为 "pow" 的工具 (幂运算工具)
server.registerTool("pow",
  {
    title: "Power Tool",
    description: "Calculate the power of a base number raised to an exponent",
    inputSchema: { base: z.number(), exponent: z.number() }
  },
  async ({ base, exponent }) => ({
    content: [{ type: "text", text: String(Math.pow(base, exponent)) }]
  })
);

// 注册一个名为 "abs" 的工具 (绝对值工具)
server.registerTool("abs",
  {
    title: "Absolute Value Tool",
    description: "Calculate the absolute value of a number",
    inputSchema: { a: z.number() }
  },
  async ({ a }) => ({
    content: [{ type: "text", text: String(Math.abs(a)) }]
  })
);

// 注册一个名为 "log" 的工具 (自然对数工具)
server.registerTool("log",
  {
    title: "Natural Logarithm Tool",
    description: "Calculate the natural logarithm (base e) of a number",
    inputSchema: { a: z.number() }
  },
  async ({ a }) => {
    if (a <= 0) {
      return {
        content: [{ type: "text", text: "Error: Logarithm input must be positive" }],
        isError: true
      };
    }
    return {
      content: [{ type: "text", text: String(Math.log(a)) }]
    };
  }
);

// 注册一个名为 "round" 的工具 (四舍五入工具)
server.registerTool("round",
  {
    title: "Round Tool",
    description: "Round a number to the nearest integer",
    inputSchema: { a: z.number() }
  },
  async ({ a }) => ({
    content: [{ type: "text", text: String(Math.round(a)) }]
  })
);

// 注册一个名为 "greeting" 的资源 (问候资源)
// ResourceTemplate 定义了资源的 URI 模式，这里是动态的 {name} 参数
server.registerResource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  {
    title: "Greeting Resource",      // 资源在 UI 中显示的标题
    description: "Dynamic greeting generator" // 资源的描述
  },
  // 资源的处理函数，当资源被请求时执行
  // 接收 URI 和解构的参数 { name }
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,                 // 返回资源的完整 URI
      text: `Hello, ${name}!`      // 返回资源的内容
    }]
  })
);

// 创建一个 StdioServerTransport 实例
const transport = new StdioServerTransport();
// 将 MCP 服务器连接到传输层
// await 确保在连接建立完成后才继续执行后续代码 (例如打印日志)
await server.connect(transport);
// 连接成功后打印日志，表示服务器已在运行
//console.log("MCP已启动");