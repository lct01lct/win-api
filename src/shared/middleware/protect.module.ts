import { UserModelDefinition } from '@/modules/user/user.schema';
import { MiddlewareConsumer, Module, Type } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProtectMiddleware } from './protect.middleware';
import { DynamicModule, RouteInfo } from '@nestjs/common/interfaces';

export class ProtectModule {
  static forFeature(...routes: (string | Type<any> | RouteInfo)[]): DynamicModule {
    @Module({
      imports: [MongooseModule.forFeatureAsync([UserModelDefinition])],
    })
    class _ProtectModule {
      configure(consumer: MiddlewareConsumer) {
        consumer.apply(ProtectMiddleware).forRoutes(...routes);
      }
    }

    return {
      module: _ProtectModule,
    };
  }
}
