import { RESOURCE_API, WALLPAPER_API } from '@/shared';
import { Controller, Get } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller(RESOURCE_API)
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get(WALLPAPER_API)
  getAllDefaultWallpaper() {
    return this.resourceService.getAllWallPapers();
  }
}
