/**
 * 帮助资源
 * 提供Resource Template使用说明
 */

import { generateHelpContent } from '../utils/dataUtils.js';

/**
 * 帮助资源配置
 */
export const helpResourceConfig = {
  name: "help",
  uri: "help://resource-templates",
  title: "Resource Template 使用帮助",
  description: "详细说明如何使用动态资源模板",
  mimeType: "text/plain"
};

/**
 * 帮助资源处理函数
 * @param {URL} uri - 资源URI
 * @returns {Object} 资源内容
 */
export async function helpResourceHandler(uri) {
  const helpContent = generateHelpContent();
  
  return {
    contents: [{
      uri: uri.href,
      text: helpContent
    }]
  };
}
