import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ChannelInfoDocument = HydratedDocument<ChannelInfo>;

@Schema()
export class ChannelInfo {
  @Prop()
  description: string;

  @Prop()
  isConfirmed: boolean;
}

export const ChannelInfoSchema = SchemaFactory.createForClass(ChannelInfo);
