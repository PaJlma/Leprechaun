import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type VideoDurationDocument = HydratedDocument<VideoDuration>;

@Schema()
export class VideoDuration {
  @Prop()
  hours: number;

  @Prop()
  minutes: number;

  @Prop()
  seconds: number;
}

export const VideoDurationSchema = SchemaFactory.createForClass(VideoDuration);
