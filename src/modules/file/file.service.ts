import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { User, UserDocument } from '@/modules/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as sharp from 'sharp';
import { AvailableFormatInfo, FormatEnum } from 'sharp';
import { join } from 'path';
import { accessSync, mkdirSync, constants, existsSync, unlinkSync } from 'fs';
import { getServerConfig } from '@/config';

export interface FormatImageOption {
  resizeWidth?: number;
  resizeHeight?: number;
  toFormat?: keyof FormatEnum | AvailableFormatInfo;
}

@Injectable()
export class FileService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateUserFile(
    userId: ObjectId,
    file: Express.Multer.File,
    field: keyof User,
    option?: FormatImageOption
  ) {
    const dirPath = this.getUserDirInStore(userId);

    try {
      accessSync(dirPath, constants.R_OK);
    } catch {
      mkdirSync(dirPath);
    } finally {
      const { filePath: newfilePath, filename: newFileName } = await this.handleImage(
        file,
        dirPath,
        option
      );
      const user = await this.userModel.findById(userId);

      const originPath = new URL(user?.[field] as string).pathname;

      const oldPath = join(__dirname, '../../../public', originPath);

      const isDelete = !(oldPath.includes('\\default\\') && existsSync(oldPath));

      if (isDelete) {
        unlinkSync(oldPath);
      }

      return this.handleFilePathInServer(userId, newFileName);
    }
  }

  async handleImage(file: Express.Multer.File, path: string, option?: FormatImageOption) {
    let sharpedImage = await sharp(file.buffer);

    if (option?.resizeHeight || option?.resizeWidth) {
      const resizeOpt: number[] = [option.resizeHeight!, option.resizeWidth!].filter(item => item);

      sharpedImage = await sharpedImage.resize(...resizeOpt);
    }

    if (option?.toFormat) {
      sharpedImage = await sharpedImage.toFormat(option.toFormat);
    }
    const filename = `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = join(path, filename);
    await sharpedImage.toFile(filePath);

    return {
      filePath,
      filename,
    };
  }

  private getUserDirInStore(userId: ObjectId) {
    return join(__dirname, `../../../public/img/user/${userId}`);
  }

  private handleFilePathInServer(userId: ObjectId, filename: string) {
    return join(getServerConfig().baseUrl, `/img/user/${userId}`, filename);
  }
}
