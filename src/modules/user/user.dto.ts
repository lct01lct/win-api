import { Role } from '@/types';
import { User } from './user.schema';
export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: Role;
}

export interface UpdateUserDto {
  username: string;
  email: string;
}
