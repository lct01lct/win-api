import 'dotenv/config';
import { readFileSync, readdirSync, rmdirSync, unlinkSync } from 'fs';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { Inject, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { logger } from '@/utils';
import { UserService, UserModule } from '@/modules/user';
import { CreateUserDto } from '@/modules/user/user.dto';
import { ResourceModule } from '@/modules/resource';
import { ApplicationResourceService } from '@/modules/resource/app-resource.service';
import { CreateApplicationResourceDto } from '@/modules/resource/app-resource..dto';

const readFile = <T = any>(path: string): T[] => {
  return JSON.parse(readFileSync(join(__dirname, path), 'utf-8')) as T[];
};

@Module({
  imports: [MongooseModule.forRoot(process.env.DB!), UserModule, ResourceModule],
})
class ImportDataModule {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(ApplicationResourceService) private appService: ApplicationResourceService
  ) {
    (async () => {
      await this.deleteData();
      await this.importData();
      process.exit();
    })();
  }

  async deleteData() {
    await Promise.all([
      this.userService.deleteAllUsers(),
      this.deleteUserDir(),
      // this.appService.deleteAllApplications(),
    ]);
    logger.success('Data successfully deleted!');
  }

  async importData() {
    const userData = readFile<CreateUserDto>('./user.json');
    const applicationData = readFile<CreateApplicationResourceDto>('./app.json');
    await Promise.all([
      this.userService.createMultiUser(userData),
      // this.appService.createMutilApplcation(applicationData),
    ]);

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
