import { Injectable } from '@nestjs/common';
// import { User, UserDocument } from '@/modules/user/user.schema';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// @InjectModel(User.name) private userModel: Model<UserDocument>
@Injectable()
export class FileService {
  constructor() {}

  updateUserFile(userId: any) {
    console.log(userId);
  }
}
