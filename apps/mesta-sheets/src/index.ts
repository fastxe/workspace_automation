import { logInfo } from '@fastxe/gas-core';

export function main() {
  logInfo('forms ran', { now: new Date().toISOString() });
}

/**
 * Multiplies two numbers together.
 * @param {number} a First number.
 * @param {number} b Second number.
 * @return {number} The product of a and b.
 * @customfunction
 */
export function MULTIPLY(a: number, b: number): number {
  return a * b;
}

/**
 * Converts text to uppercase.
 * @param {string} text The text to convert.
 * @return {string} The uppercase text.
 * @customfunction
 */
export function SHOUT(text: string): string {
  return text.toUpperCase();
}

/**
 * Calculates the sum of a range.
 * @param {number[][]} range The range of values.
 * @return {number} The sum.
 * @customfunction
 */
export function SUMRANGE(range: number[][]): number {
  return range.flat().reduce((sum, val) => sum + (val || 0), 0);
}