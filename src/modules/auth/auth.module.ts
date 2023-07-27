import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user';
import { UserModelDefinition } from '../user/user.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([UserModelDefinition]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
