export function logInfo(message: string, data?: unknown) {
  console.log(JSON.stringify({ level: 'info', message, data }));
}
