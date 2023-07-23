import { APPLICATION_API, FormatResponseInterceptor, RESOURCE_API } from '@/shared';
import { Controller, Get, Inject, Param, Post, Query, UseInterceptors } from '@nestjs/common';

import { ApplicationResourceService } from './app-resource.service';
import { ObjectId } from 'mongoose';
import { CreateApplicationResourceDto } from './app-resource..dto';

@UseInterceptors(FormatResponseInterceptor)
@Controller(RESOURCE_API)
export class ApplicationResourceController {
  constructor(@Inject(ApplicationResourceService) private appService: ApplicationResourceService) {}

  @Get(APPLICATION_API)
  async getAllApplications(@Query() query?: { name?: string }) {
    const name = query?.name;
    if (name) {
      return await this.appService.getApplication({ name });
    }
    return await this.appService.getAllApplications();
  }

  @Get(APPLICATION_API + '/:id')
  async getApplcation(@Param('id') id: ObjectId) {
    return await this.appService.getApplication({ id });
  }

  @Post(APPLICATION_API)
  async createApplcation(createAppDto: CreateApplicationResourceDto) {
    return this.appService.createApplication(createAppDto);
  }
}
