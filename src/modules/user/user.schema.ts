import { AsyncModelFactory, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '@/types';
import * as bcrypt from 'bcryptjs';
import { fillBaseUrl } from '@/config';
import { ApplicationDocument, Application } from '../resource/app-resource.schema';

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

  @Prop({
    type: String,
    default: fillBaseUrl(`/img/user/default/user_avatar_default_0.png`),
  })
  avatar: string;

  @Prop({
    type: String,
    default: fillBaseUrl(`/img/user/default/wallpaper_default_0.jpg`),
  })
  wallpaper: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Application.name })
  downloadedApp: ApplicationDocument[];

  correctPassword: typeof correctPassword;
}

export const UserSchema = SchemaFactory.createForClass(User);

const correctPassword = async (candidatePassword: string, userPassword: string) => {
  return await bcrypt.compare(userPassword, candidatePassword);
};

UserSchema.methods.correctPassword = correctPassword;

export const UserModelDefinition: AsyncModelFactory = {
  name: User.name,
  useFactory: () => {
    UserSchema.pre('save', async function () {
      this.password = await bcrypt.hash(this.password, 12);
      this.passwordConfirm = undefined;
    });

    return UserSchema;
  },
};
