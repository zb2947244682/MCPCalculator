/**
 * 计算历史记录资源
 * 提供动态的计算历史记录和示例
 */

import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { generateHistoryData } from '../utils/dataUtils.js';
import { getSupportedOperations } from '../utils/operationUtils.js';

/**
 * 历史记录资源配置
 */
export const historyResourceConfig = {
  name: "calculation-history",
  template: new ResourceTemplate("history://{operation}/{a}/{b}", { 
    list: undefined,
    complete: {
      operation: (value) => {
        return getSupportedOperations().filter(op => op.startsWith(value));
      }
    }
  }),
  title: "计算历史记录",
  description: "查看特定运算的历史记录和示例。URI格式：history://{运算类型}/{数字1}/{数字2}",
  mimeType: "application/json"
};

/**
 * 历史记录资源处理函数
 * @param {URL} uri - 资源URI
 * @param {Object} params - 模板参数
 * @param {string} params.operation - 运算类型
 * @param {string} params.a - 第一个数字
 * @param {string} params.b - 第二个数字
 * @returns {Object} 资源内容
 */
export async function historyResourceHandler(uri, { operation, a, b }) {
  const historyData = await generateHistoryData(operation, a, b);
  
  return {
    contents: [{
      uri: uri.href,
      text: JSON.stringify(historyData, null, 2)
    }]
  };
}
