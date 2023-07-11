import { Module, NestApplicationOptions } from '@nestjs/common';
import { UserModule, AuthModule } from './modules';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {
  public static PORT: number = Number(process.env.PORT || 3000);
  public static appConfig: NestApplicationOptions = { logger: ['error', 'warn'] };
}
