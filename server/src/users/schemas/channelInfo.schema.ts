import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

export type ChannelInfoDocument = HydratedDocument<ChannelInfo>;

@Schema()
export class ChannelInfo {
  @ApiProperty({
    description: "Описание канала пользователя",
    type: String,
  })
  @Prop()
  description: string;

  @ApiProperty({
    description: "Состояние подтверждения канала пользователя",
    type: String,
  })
  @Prop()
  isConfirmed: boolean;
}

export const ChannelInfoSchema = SchemaFactory.createForClass(ChannelInfo);
