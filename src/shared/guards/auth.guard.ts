import { RequestWithUser, Role } from '@/types';
import { AppError } from '@/utils';
import { CanActivate, ExecutionContext, Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  public static ROLES_KEY = Symbol('roles');

  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride(AuthGuard.ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    const req: RequestWithUser = ctx.switchToHttp().getRequest();
    const isPermission = requiredRoles.includes(req.user.role);

    if (!isPermission) {
      throw new AppError('You do not have permission to perform this action', 403);
    }

    return requiredRoles.includes(req.user.role);
  }
}

@Injectable()
export class isLoginGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    return true;
  }
}
