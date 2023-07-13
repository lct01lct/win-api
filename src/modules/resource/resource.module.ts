import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';

import { ProtectModule } from '@/shared/middleware';

@Module({
  imports: [ProtectModule.forFeature(ResourceController)],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
