export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'IMPORT_DATA_ENVIROMENT';
      PORT: string;
      PREFIX: string;
      DB: string;
      JWT_SECRET: string;
      JWT_EXPIRED_IN: string;
      JWT_COOKIE_EXPIRED_IN: string;
    }
  }
}
