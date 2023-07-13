import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExpectionFilter } from './shared';
import * as cookieParser from 'cookie-parser';
import morgan = require('morgan');
import { logger } from './utils';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, AppModule.appConfig);

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
  app.setGlobalPrefix(process.env.PREFIX);
  app.use(cookieParser());
  app.useGlobalFilters(new MongoExpectionFilter());
  app.enableCors({
    origin: 'http://127.0.0.1:8000',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
  });

  await app.listen(AppModule.PORT);
  logger.success(`Application is running on: ${await app.getUrl()}`);
})();
