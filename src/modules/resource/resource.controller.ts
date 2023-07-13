import { FormatResponseInterceptor, RESOURCE_API, WALLPAPER_API } from '@/shared';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ResourceService } from './resource.service';

@UseInterceptors(FormatResponseInterceptor)
@Controller(RESOURCE_API)
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get(WALLPAPER_API)
  getAllDefaultWallpaper() {
    return this.resourceService.getAllWallPapers();
  }
}
