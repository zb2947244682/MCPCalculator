/**
 * 数据工具方法
 * 提供配置数据、历史数据等生成功能
 */

import { getSupportedOperations } from './operationUtils.js';

/**
 * 生成计算器配置信息
 * @returns {Object} 配置信息对象
 */
export function generateConfigData() {
  return {
    serverName: "MCP 计算器服务器",
    version: "1.0.0",
    supportedOperations: getSupportedOperations(),
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
  };
}

/**
 * 生成计算历史数据
 * @param {string} operation - 运算类型
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {Object} 历史数据对象
 */
export async function generateHistoryData(operation, a, b) {
  const { getFullOperationName } = await import('./operationUtils.js');
  
  // 模拟计算历史数据
  const historyData = {
    operation: operation,
    operationName: getFullOperationName(operation) || operation,
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
  
  return historyData;
}

/**
 * 生成帮助文档内容
 * @returns {string} 帮助文档文本
 */
export function generateHelpContent() {
  return `Resource Template 使用说明
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
`;
}
