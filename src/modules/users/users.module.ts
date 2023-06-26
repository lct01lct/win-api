import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          UserSchema.pre('save', async function () {
            this.password = await bcrypt.hash(this.password, 12);
            this.passwordConfirm = undefined;
          });

          return UserSchema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
