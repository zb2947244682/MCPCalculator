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
 * - 模块化架构，便于维护和扩展
 * - 语法完全符合MCP官方SDK规范
 * - 简单易懂的代码结构
 * - 适合学习和演示使用
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools, registerResources, registerPrompts } from './registrar.js';

/**
 * 启动MCP计算器服务器
 */
async function startServer() {
  try {
    // 创建MCP服务器实例
    const server = new McpServer({
      name: "calculator-server",
      version: "1.0.0"
    });

    // 注册所有组件
    registerTools(server);
    registerResources(server);
    registerPrompts(server);

    // 创建传输层并连接服务器
    const transport = new StdioServerTransport();
    await server.connect(transport);

    // 服务器启动完成
    // console.log("MCP Calculator Server is running...");
  } catch (error) {
    console.error("服务器启动失败:", error);
    process.exit(1);
  }
}

// 启动服务器
startServer();
