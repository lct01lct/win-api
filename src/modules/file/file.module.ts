import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from '../user/user.schema';
import { FileService } from './file.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([UserModelDefinition])],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
