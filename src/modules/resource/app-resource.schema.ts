import { fillBaseUrl } from '@/config';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({
    type: String,
    default: function (this: Application) {
      this.downloadLink = fillBaseUrl(`/apps/${this.name}/index.js`);
    },
  })
  downloadLink: string;

  @Prop({
    type: String,
    default: function (this: Application) {
      this.icon = fillBaseUrl(`/apps/${this.name}/logo.png`);
    },
  })
  icon: string;

  @Prop({ type: Number, default: 4 + Math.random(), min: 0, max: 5 })
  rating: number;

  @Prop({ type: String, enum: ['应用', '游戏'], default: '应用' })
  type: '应用' | '游戏';

  @Prop({ type: String, default: '免费应用' })
  desc: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

export const ApplicationModelDefinition: ModelDefinition = {
  name: Application.name,
  schema: ApplicationSchema,
};
