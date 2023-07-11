import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchemaProvider } from '../user/user.schema';
import { FileService } from './file.service';

@Module({
  imports: [
    // MongooseModule.forFeatureAsync([UserSchemaProvider])
  ],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
