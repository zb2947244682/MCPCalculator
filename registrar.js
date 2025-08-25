/**
 * MCP服务器注册器
 * 负责注册所有工具、资源和提示词
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// 导入工具
import { calculatorToolConfig, calculatorToolHandler } from './tools/calculatorTool.js';

// 导入资源
import { configResourceConfig, configResourceHandler } from './resources/configResource.js';
import { historyResourceConfig, historyResourceHandler } from './resources/historyResource.js';
import { helpResourceConfig, helpResourceHandler } from './resources/helpResource.js';

// 导入提示词
import { decimalCalcPromptConfig, decimalCalcPromptHandler } from './prompts/decimalCalcPrompt.js';

/**
 * 注册所有工具到MCP服务器
 * @param {McpServer} server - MCP服务器实例
 */
export function registerTools(server) {
  // 注册计算器工具
  server.registerTool(
    calculatorToolConfig.name,
    {
      title: calculatorToolConfig.title,
      description: calculatorToolConfig.description,
      inputSchema: calculatorToolConfig.inputSchema
    },
    calculatorToolHandler
  );
}

/**
 * 注册所有资源到MCP服务器
 * @param {McpServer} server - MCP服务器实例
 */
export function registerResources(server) {
  // 注册配置资源
  server.registerResource(
    configResourceConfig.name,
    configResourceConfig.uri,
    {
      title: configResourceConfig.title,
      description: configResourceConfig.description,
      mimeType: configResourceConfig.mimeType
    },
    configResourceHandler
  );

  // 注册历史记录资源
  server.registerResource(
    historyResourceConfig.name,
    historyResourceConfig.template,
    {
      title: historyResourceConfig.title,
      description: historyResourceConfig.description,
      mimeType: historyResourceConfig.mimeType
    },
    historyResourceHandler
  );

  // 注册帮助资源
  server.registerResource(
    helpResourceConfig.name,
    helpResourceConfig.uri,
    {
      title: helpResourceConfig.title,
      description: helpResourceConfig.description,
      mimeType: helpResourceConfig.mimeType
    },
    helpResourceHandler
  );
}

/**
 * 注册所有提示词到MCP服务器
 * @param {McpServer} server - MCP服务器实例
 */
export function registerPrompts(server) {
  // 注册小数计算提示词
  server.registerPrompt(
    decimalCalcPromptConfig.name,
    {
      title: decimalCalcPromptConfig.title,
      description: decimalCalcPromptConfig.description,
      argsSchema: decimalCalcPromptConfig.argsSchema
    },
    decimalCalcPromptHandler
  );
}
