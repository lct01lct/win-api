export const errorLog = (...strs: any[]) => {
  console.log(`\x1B[31m${strs.join(' ')}\x1B[0m`);
};

export const successLog = (...strs: any[]) => {
  console.log(`\x1B[32m${strs.join(' ')}\x1B[0m`);
};

export const infoLog = (...strs: any[]) => {
  console.log(`From: ${strs.join(' ')}`);
};

export const logger = {
  success: successLog,
  error: errorLog,
  info: infoLog,
};
