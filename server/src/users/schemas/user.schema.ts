import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ChannelInfo, ChannelInfoSchema } from "./channelInfo.schema";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  login: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  createdAt: string;

  @Prop()
  nick: string;

  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true, sparse: true })
  phoneNumber: string;

  @Prop()
  isBanned: boolean;

  @Prop()
  birthDate: string;

  @Prop()
  sex: "Male" | "Female";

  @Prop()
  role: "User" | "Admin";

  @Prop({ type: ChannelInfoSchema, _id: false })
  channelInfo: ChannelInfo;
}

export const UserSchema = SchemaFactory.createForClass(User);
