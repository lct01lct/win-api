import 'dotenv/config';
import { readFileSync, readdirSync, rmdirSync, unlinkSync } from 'fs';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { Inject, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { logger } from '@/utils';
import { UserService, UserModule } from '@/modules/user';
import { CreateUserDto } from '@/modules/user/user.dto';

const readFile = <T = any>(path: string): T[] => {
  return JSON.parse(readFileSync(join(__dirname, path), 'utf-8')) as T[];
};

@Module({
  imports: [MongooseModule.forRoot(process.env.DB!), UserModule],
})
class ImportDataModule {
  constructor(@Inject(UserService) private userService: UserService) {
    (async () => {
      await this.deleteData();
      await this.importData();
      process.exit();
    })();
  }

  async deleteData() {
    await Promise.all([this.userService.deleteAllUser(), this.deleteUserDir()]);
    logger.success('Data successfully deleted!');
  }

  async importData() {
    const userData = readFile<CreateUserDto>('./user.json');
    await Promise.all([this.userService.createMultiUser(userData)]);

    logger.success('Data successfully loaded!');
  }

  async deleteUserDir() {
    const userDir = join(__dirname, '../../public/img/user');

    readdirSync(userDir).forEach(dir => {
      if (dir !== 'default') {
        const _userDir = join(userDir, dir);
        readdirSync(_userDir).forEach(file => {
          unlinkSync(join(_userDir, file));
        });
        rmdirSync(_userDir);
      }
    });
  }
}

(async () => {
  await NestFactory.create(ImportDataModule);
})();
