import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { VideoDuration, VideoDurationSchema } from "./videoDuration.schema";

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  author: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop()
  description: string;

  @Prop({ type: VideoDurationSchema, _id: false })
  duration: VideoDuration;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
