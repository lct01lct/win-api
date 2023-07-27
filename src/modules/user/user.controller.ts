import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  AuthGuard,
  DOWNLOADED_APP_API,
  FormatResponseInterceptor,
  Roles,
  USER_API,
  USER_INFO_API,
  Users,
} from '@/shared';
import { UserService } from './user.service';
import { Role } from '@/types';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApplicationResourceService } from '../resource/app-resource.service';

@Controller(USER_API)
@UseGuards(AuthGuard)
@UseInterceptors(FormatResponseInterceptor)
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(ApplicationResourceService) private readonly appService: ApplicationResourceService
  ) {}

  @Get(USER_INFO_API)
  async getMe(@Users('_id') id: ObjectId) {
    return await this.userService.getMe(id);
  }

  @Patch(USER_INFO_API)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'wallpaper' }, { name: 'avatar' }]))
  async updateMe(
    @Users('_id') id: ObjectId,
    @Body() updateMeDto: UpdateUserDto,
    @UploadedFiles()
    files?: {
      wallpaper: Express.Multer.File[];
      avatar: Express.Multer.File[];
    }
  ) {
    updateMeDto = {
      ...updateMeDto,
      avatar: files?.avatar?.[0],
      wallpaper: updateMeDto.wallpaper || files?.wallpaper?.[0],
    };

    return await this.userService.updateMe(id, updateMeDto);
  }

  @Roles(Role.Admin)
  @Get()
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return { result: users.length, users };
  }

  @Roles(Role.Admin)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }

  @Put(DOWNLOADED_APP_API + '/:id')
  async addDownloadedApp(@Users('_id') userId: ObjectId, @Param('id') appId: ObjectId) {
    return this.appService.addDownloadedAppToUser(appId, userId);
  }

  @Delete(DOWNLOADED_APP_API + '/:id')
  async deleteDownloadedApp(@Users('_id') userId: ObjectId, @Param('id') appId: ObjectId) {
    return this.appService.deleteDownloadedAppToUser(appId, userId);
  }
}
