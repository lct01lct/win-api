import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaProvider } from './user.schema';
import { ProtectMiddleware } from '@/shared/middleware/auth.middleware';
import { FileModule } from '../file';

@Module({
  imports: [FileModule, MongooseModule.forFeatureAsync([UserSchemaProvider])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectMiddleware).exclude().forRoutes(UserController);
  }
}
