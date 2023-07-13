import { Role } from '@/types';

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: Role;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  avatar?: Express.Multer.File;
  wallpaper?: Express.Multer.File | string;
}
