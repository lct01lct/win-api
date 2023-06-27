import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchemaProvider, UserService } from '../user';

@Module({
  imports: [MongooseModule.forFeatureAsync([UserSchemaProvider])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
