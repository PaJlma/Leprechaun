import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  fingerPrint: string;

  @Prop({ required: true, unique: true })
  access: string;

  @Prop({ required: true, unique: true })
  refresh: string;

  @Prop({ required: true })
  createdAt: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
