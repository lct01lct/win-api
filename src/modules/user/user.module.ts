import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from './user.schema';
import { FileModule } from '../file';
import { ProtectModule } from '@/shared/middleware';
import { ResourceModule } from '../resource';

@Module({
  imports: [
    ProtectModule.forFeature(UserController),
    FileModule,
    MongooseModule.forFeatureAsync([UserModelDefinition]),
    ResourceModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
