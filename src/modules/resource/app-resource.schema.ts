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
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

export const ApplicationModelDefinition: ModelDefinition = {
  name: Application.name,
  schema: ApplicationSchema,
};
