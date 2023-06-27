import { Role } from '@/types';

export interface SignupDto {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: Role;
}

export interface LoginDto {
  username: string;
  password: string;
}
