export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'IMPORT_DATA_ENVIROMENT';
      SERVER_DEV_ROOT: string;
      PUBLIC_ROOT: string;
      PORT: string;
      PREFIX: string;
      PUBLIC_ROOT: string;
      DB: string;
      JWT_SECRET: string;
      JWT_EXPIRED_IN: string;
      JWT_COOKIE_EXPIRED_IN: string;
      JWT_KEY: string;
    }
  }
}
