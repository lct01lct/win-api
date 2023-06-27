import 'dotenv/config';
import { Module, NestApplicationOptions } from '@nestjs/common';
import { UserModule } from './modules/user';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, MongooseModule.forRoot(process.env.DB)],
  controllers: [],
})
export class AppModule {
  public static PORT: number = Number(process.env.PORT);
  public static appConfig: NestApplicationOptions = { logger: ['error', 'warn'], cors: true };
}
