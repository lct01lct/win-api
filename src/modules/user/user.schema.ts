import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '@/types';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, select: false })
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

  correctPassword: typeof correctPassword;
}

export const UserSchema = SchemaFactory.createForClass(User);

const correctPassword = async (candidatePassword: string, userPassword: string) => {
  return await bcrypt.compare(userPassword, candidatePassword);
};

UserSchema.methods.correctPassword = correctPassword;

export const UserSchemaProvider = {
  name: User.name,
  useFactory: () => {
    UserSchema.pre('save', async function () {
      this.password = await bcrypt.hash(this.password, 12);
      this.passwordConfirm = undefined;
    });

    return UserSchema;
  },
};
