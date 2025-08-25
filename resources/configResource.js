/**
 * 配置资源
 * 提供计算器服务器的配置信息和功能说明
 */

import { generateConfigData } from '../utils/dataUtils.js';

/**
 * 配置资源配置
 */
export const configResourceConfig = {
  name: "config",
  uri: "config://calculator",
  title: "计算器配置信息",
  description: "计算器服务器的配置信息和功能说明",
  mimeType: "application/json"
};

/**
 * 配置资源处理函数
 * @param {URL} uri - 资源URI
 * @returns {Object} 资源内容
 */
export async function configResourceHandler(uri) {
  const configData = generateConfigData();
  
  return {
    contents: [{
      uri: uri.href,
      text: JSON.stringify(configData, null, 2)
    }]
  };
}
