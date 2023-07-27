import { UserDocument } from '@/modules/user/user.schema';
import { Request } from 'express';

export type RequestWithUser = Request & { user: UserDocument };

export enum STATUS {
  SUCCESS = 'success',
  FAILED = 'failed',
}
