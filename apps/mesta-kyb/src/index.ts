import { logInfo } from '@fastxe/gas-core';

const __init = () => {
  Logger.log('init project')
}

export function main() {
  logInfo('forms ran', { now: new Date().toISOString() });
}

// In case bundling ever hides exports, you can force the global:
// (globalThis as any).main = main;
