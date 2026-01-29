import { logInfo } from '@fastxe/gas-core';

export function main() {
  logInfo('forms ran', { now: new Date().toISOString() });
}

// In case bundling ever hides exports, you can force the global:
// (globalThis as any).main = main;
