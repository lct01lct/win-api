import { Role } from '@/types';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: Role;
}
