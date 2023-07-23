import { fillBaseUrl } from '@/config';
import { AsyncModelFactory, ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema()
export class Application {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({
    required: true,
    type: String,
    default: function (this: Application) {
      this.downloadLink = fillBaseUrl(`/apps/${this.name}.js`);
    },
  })
  downloadLink: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

export const ApplicationModelDefinition: ModelDefinition = {
  name: Application.name,
  schema: ApplicationSchema,
};
