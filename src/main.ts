import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoExpectionFilter } from './shared';
import morgan = require('morgan');

(async () => {
  const app = await NestFactory.create(AppModule, AppModule.appConfig);

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

  app.useGlobalFilters(new MongoExpectionFilter());

  await app.listen(AppModule.PORT);
})();
