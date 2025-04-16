// pdf-parse库的包装器模块
// 避免库在导入时自动执行测试代码
import * as fs from 'fs';

// 使用commonjs require方式导入，防止自动执行代码
// @ts-ignore
const pdfParse = require('pdf-parse/lib/pdf-parse');

/**
 * 解析PDF文件内容
 * @param dataBuffer PDF文件的buffer
 * @param options 解析选项
 */
export function parsePDF(dataBuffer: Buffer, options?: any) {
  return pdfParse(dataBuffer, options);
}

export default parsePDF; 