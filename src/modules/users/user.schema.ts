import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '@/types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    validate: {
      validator: function (this: User, val: string) {
        return this.password === val;
      },
      message: 'Passwords are not the same!',
    },
  })
  passwordConfirm?: string;

  @Prop({ enum: Object.values(Role), default: Role.User })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
