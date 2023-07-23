import { fillBaseUrl } from '@/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WallpaperResourceService {
  getAllWallPapers() {
    const DEFAULT_WALLPAPER_COUNT = 7;
    console.log(this.getWallPaper(10));
    return {
      result: DEFAULT_WALLPAPER_COUNT,
      wallpapers: Array(DEFAULT_WALLPAPER_COUNT)
        .fill(void 0)
        .map((_, index) => this.getWallPaper(index)),
    };
  }

  private getWallPaper(index: number) {
    return fillBaseUrl(`/img/user/default/wallpaper_default_${index}.jpg`);
  }
}
