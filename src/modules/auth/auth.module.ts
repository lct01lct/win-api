import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule, UserSchemaProvider } from '../user';

@Module({
  imports: [MongooseModule.forFeatureAsync([UserSchemaProvider]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
