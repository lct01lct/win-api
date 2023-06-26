import { readFileSync } from 'fs';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { User, UserSchema } from '../modules/users';
import { Module } from '@nestjs/common';
import { Model } from 'mongoose';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { logger } from '@/utils';

const readFile = <T>(path: string): T[] => {
  return JSON.parse(readFileSync(join(__dirname, path), 'utf-8')) as T[];
};

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB!),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
})
class ImportDataModule {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    (async () => {
      await this.importData();
    })();
  }

  async deleteData() {
    await Promise.all([this.userModel.deleteMany()]);
  }

  async importData() {
    await this.deleteData();
    const userData = readFile('./user.json');
    await Promise.all([this.userModel.create(userData)]);

    logger.success('Data successfully loaded!');
  }
}

(async () => {
  await NestFactory.create(ImportDataModule);
})();
