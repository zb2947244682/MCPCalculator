/**
 * 小数计算提示词
 * 帮助用户进行精确的小数计算
 */

import { z } from "zod";

/**
 * 小数计算提示词配置
 */
export const decimalCalcPromptConfig = {
  name: "decimal-calc",
  title: "小数计算助手",
  description: "帮助用户进行精确的小数计算，可以指定结果的小数位数",
  argsSchema: {
    precision: z.coerce.number().min(0).max(10).describe("结果的小数位数（0-10位）"),
    operation: z.string().describe("要计算的数学表达式，比如：3.14 + 2.86")
  }
};

/**
 * 小数计算提示词处理函数
 * @param {Object} params - 输入参数
 * @param {number} params.precision - 结果的小数位数
 * @param {string} params.operation - 要计算的数学表达式
 * @returns {Object} 提示词消息
 */
export function decimalCalcPromptHandler({ precision, operation }) {
  return {
    messages: [{
      role: "user",
      content: {
        type: "text",
        text: `请帮我计算以下数学表达式：${operation}\n\n要求：结果保留 ${precision} 位小数，请提供详细的计算步骤和最终结果。`
      }
    }]
  };
}
