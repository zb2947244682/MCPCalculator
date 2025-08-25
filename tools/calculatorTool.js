/**
 * 计算器工具
 * 提供基本的数学运算功能
 */

import { z } from "zod";
import { performCalculation, getOperationName } from '../utils/operationUtils.js';

/**
 * 计算器工具配置
 */
export const calculatorToolConfig = {
  name: "calculate",
  title: "数学计算器",
  description: "执行基本的数学运算：加法、减法、乘法、除法",
  inputSchema: {
    operation: z.enum(["add", "subtract", "multiply", "divide"]).describe("运算类型：add(加法), subtract(减法), multiply(乘法), divide(除法)"),
    a: z.coerce.number().describe("第一个数字"),
    b: z.coerce.number().describe("第二个数字")
  }
};

/**
 * 计算器工具处理函数
 * @param {Object} params - 输入参数
 * @param {string} params.operation - 运算类型
 * @param {number} params.a - 第一个数字
 * @param {number} params.b - 第二个数字
 * @returns {Object} 计算结果
 */
export async function calculatorToolHandler({ operation, a, b }) {
  const { result, isError, errorMessage } = performCalculation(operation, a, b);

  if (isError) {
    return {
      content: [{ type: "text", text: errorMessage }],
      isError: true
    };
  }

  const operationName = getOperationName(operation);
  
  return {
    content: [{ type: "text", text: `${a} ${operationName} ${b} = ${result}` }]
  };
}
