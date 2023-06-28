import 'dotenv/config';
import { Module, NestApplicationOptions } from '@nestjs/common';
import { UserModule, AuthModule } from './modules';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(process.env.DB), UserModule, AuthModule],
  controllers: [],
})
export class AppModule {
  public static PORT: number = Number(process.env.PORT);
  public static appConfig: NestApplicationOptions = { logger: ['error', 'warn'] };
}
