import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @ApiProperty({
    description: "ID пользователя для которого была создана данная сессия",
    type: String,
  })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  user: string;

  @ApiProperty({
    description: "Уникальный отпечаток клиента (Например для браузеров это user-agent)",
    type: String,
  })
  @Prop({ required: true })
  fingerPrint: string;

  @ApiProperty({
    description: "Access токен, действующий для данной сессии",
    type: String,
  })
  @Prop({ required: true, unique: true })
  access: string;

  @ApiProperty({
    description: "Refresh токен, действующий для данной сессии",
    type: String,
  })
  @Prop({ required: true, unique: true })
  refresh: string;

  @ApiProperty({
    description: "Дата и время создания сессии в формате UTC",
    type: String,
    format: "YYYY-MM-DDTHH:mm:ssZ",
  })
  @Prop({ required: true })
  createdAt: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
