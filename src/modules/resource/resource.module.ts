import { Module } from '@nestjs/common';
import { WallpaperResourceController } from './wallpaper-resource.controller';
import { WallpaperResourceService } from './wallpaper-resource.service';
import { ApplicationModelDefinition } from './app-resource.schema';
import { ApplicationResourceController } from './app-resource.controller';
import { ProtectModule } from '@/shared/middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationResourceService } from './app-resource.service';

@Module({
  imports: [
    ProtectModule.forFeature(WallpaperResourceController, ApplicationResourceController),
    MongooseModule.forFeature([ApplicationModelDefinition]),
  ],
  controllers: [WallpaperResourceController, ApplicationResourceController],
  providers: [WallpaperResourceService, ApplicationResourceService],
  exports: [ApplicationResourceService],
})
export class ResourceModule {}
