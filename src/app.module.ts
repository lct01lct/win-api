import 'dotenv/config';
import { Module, NestApplicationOptions } from '@nestjs/common';
import { UsersModule } from './modules/users';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost/win-db')],
  controllers: [],
})
export class AppModule {
  public static PORT: number = Number(process.env.PORT);
  public static appConfig: NestApplicationOptions = { logger: ['error', 'warn'], cors: true };
}
