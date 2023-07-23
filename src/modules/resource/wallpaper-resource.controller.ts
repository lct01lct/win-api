import { FormatResponseInterceptor, RESOURCE_API, WALLPAPER_API } from '@/shared';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { WallpaperResourceService } from './wallpaper-resource.service';

@UseInterceptors(FormatResponseInterceptor)
@Controller(RESOURCE_API)
export class WallpaperResourceController {
  constructor(private resourceService: WallpaperResourceService) {}

  @Get(WALLPAPER_API)
  getAllDefaultWallpaper() {
    return this.resourceService.getAllWallPapers();
  }
}
