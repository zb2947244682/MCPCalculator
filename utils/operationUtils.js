/**
 * 数学运算工具方法
 * 提供基本的数学运算功能和错误处理
 */

/**
 * 执行数学运算
 * @param {string} operation - 运算类型
 * @param {number} a - 第一个数字
 * @param {number} b - 第二个数字
 * @returns {Object} 运算结果
 */
export function performCalculation(operation, a, b) {
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

  return {
    result,
    isError,
    errorMessage
  };
}

/**
 * 获取运算类型的中文名称
 * @param {string} operation - 英文运算类型
 * @returns {string} 中文运算名称
 */
export function getOperationName(operation) {
  const operationNames = {
    "add": "加",
    "subtract": "减", 
    "multiply": "乘",
    "divide": "除"
  };
  return operationNames[operation] || operation;
}

/**
 * 获取运算类型的完整中文名称
 * @param {string} operation - 英文运算类型
 * @returns {string} 完整中文运算名称
 */
export function getFullOperationName(operation) {
  const operationNames = {
    "add": "加法",
    "subtract": "减法", 
    "multiply": "乘法",
    "divide": "除法"
  };
  return operationNames[operation] || operation;
}

/**
 * 验证运算类型是否有效
 * @param {string} operation - 运算类型
 * @returns {boolean} 是否有效
 */
export function isValidOperation(operation) {
  const validOperations = ["add", "subtract", "multiply", "divide"];
  return validOperations.includes(operation);
}

/**
 * 获取所有支持的运算类型
 * @returns {Array} 支持的运算类型列表
 */
export function getSupportedOperations() {
  return ["add", "subtract", "multiply", "divide"];
}
