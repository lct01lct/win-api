import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './app-resource.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateApplicationResourceDto } from './app-resource..dto';
import { User } from '../user/user.schema';

@Injectable()
export class ApplicationResourceService {
  constructor(
    @InjectModel(Application.name) private appModel: Model<Application>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async createApplication(app: CreateApplicationResourceDto) {
    return await this.appModel.create(app);
  }

  async createMutilApplcation(apps: CreateApplicationResourceDto[]) {
    return Promise.all(apps.map(app => this.createApplication(app)));
  }

  async getAllApplications() {
    const apps = await this.appModel.find();

    return {
      result: apps.length,
      apps,
    };
  }

  async getApplication(query: { id?: ObjectId; name?: string }) {
    return await this.appModel.findById(query);
  }

  async deleteAllApplications(): Promise<any> {
    return await this.appModel.deleteMany();
  }

  async addDownloadedAppToUser(appId: ObjectId, userId: ObjectId) {
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { downloadedApp: appId } },
        { new: true, runValidators: true }
      )
      .select({
        downloadedApp: true,
        _id: false,
      });
  }

  async deleteDownloadedAppToUser(appId: ObjectId, userId: ObjectId) {
    return await this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { downloadedApp: appId } },
        { new: true, runValidators: true }
      )
      .select('downloadedApp -_id');
  }
}
