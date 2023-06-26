export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'IMPORT_DATA_ENVIROMENT';
      PORT: string;
      PREFIX: string;
      DB: string;
    }
  }
}
