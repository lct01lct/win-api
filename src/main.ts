import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExpectionFilter } from './shared';
import morgan = require('morgan');

(async () => {
  const app = await NestFactory.create(AppModule, AppModule.appConfig);

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.useGlobalFilters(new MongoExpectionFilter());
  app.enableCors({
    origin: 'http://127.0.0.1:8000',
    methods: ['get', 'post', 'delete', 'patch', 'put'],
    credentials: true,
  });

  await app.listen(AppModule.PORT);
})();
