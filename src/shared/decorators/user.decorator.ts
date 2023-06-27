import { ExecutionContext, SetMetadata, createParamDecorator } from '@nestjs/common';
import { Role } from '@/types';
import { AuthGuard } from '../guards';

export const Roles = (...roles: Role[]) => SetMetadata(AuthGuard.ROLES_KEY, roles);

export const Users = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  return data ? user?.[data] : user;
});
