import { getServerConfig } from '@/config';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class ResourceService {
  getAllWallPapers() {
    return {
      wallpapers: Array(7)
        .fill(void 0)
        .map((_, index) => this.getWallPaper(index)),
    };
  }

  private getWallPaper(index: number) {
    return join(getServerConfig().baseUrl, `/img/user/default/wallpaper_default_${index}.jpg`);
  }
}
