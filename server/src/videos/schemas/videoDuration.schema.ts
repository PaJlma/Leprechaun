import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type VideoDurationDocument = HydratedDocument<VideoDuration>;

@Schema()
export class VideoDuration {
  @ApiProperty({
    description: "Длина видео в часах",
    type: Number,
  })
  @Prop()
  hours: number;

  @ApiProperty({
    description: "Длина видео в минутах",
    type: Number,
  })
  @Prop()
  minutes: number;

  @ApiProperty({
    description: "Длина видео в секундах",
    type: Number,
  })
  @Prop()
  seconds: number;
}

export const VideoDurationSchema = SchemaFactory.createForClass(VideoDuration);
