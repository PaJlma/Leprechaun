import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { VideoDuration, VideoDurationSchema } from "./videoDuration.schema";
import { ApiProperty } from "@nestjs/swagger";

export type VideoDocument = HydratedDocument<Video>;

@Schema()
export class Video {
  @ApiProperty({
    description: "Название видео",
    type: String,
    required: true,
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: "ID автора",
    type: String,
    required: true,
  })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  author: string;

  @ApiProperty({
    description: "Дата и время создания видео в формате UTC",
    type: String,
    required: true,
    format: "YYYY-MM-DDTHH:mm:ssZ",
  })
  @Prop({ required: true })
  createdAt: string;

  @ApiProperty({
    description: "Описание видео",
    type: String,
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: "Объект, описывающий длину видео",
    type: VideoDuration,
  })
  @Prop({ type: VideoDurationSchema, _id: false })
  duration: VideoDuration;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
