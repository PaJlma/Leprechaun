import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ChannelInfo, ChannelInfoSchema } from "./channelInfo.schema";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    description: "Логин пользователя",
    type: String,
    required: true,
  })
  @Prop({ required: true, unique: true })
  login: string;

  @ApiProperty({
    description: "Электронный почтовый адрес пользователя",
    type: String,
    required: true,
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: "Пароль пользователя",
    type: String,
    required: true,
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    description: "Дата и время создания аккаунта в формате UTC",
    type: String,
    required: true,
    format: "YYYY-MM-DDTHH:mm:ssZ",
  })
  @Prop({ required: true })
  createdAt: string;

  @ApiProperty({
    description: "Псевдоним пользователя",
    type: String,
  })
  @Prop()
  nick: string;

  @ApiProperty({
    description: "Имя пользователя",
    type: String,
  })
  @Prop()
  name: string;

  @ApiProperty({
    description: "Фамилия пользователя",
    type: String,
  })
  @Prop()
  lastName: string;

  @ApiProperty({
    description: "Телефонный номер пользователя",
    type: String,
  })
  @Prop({ unique: true, sparse: true })
  phoneNumber: string;

  @ApiProperty({
    description: "Состояние блокировки пользователя",
    type: Boolean,
  })
  @Prop()
  isBanned: boolean;

  @ApiProperty({
    description: "Дата рождения пользователя",
    type: String,
    format: "YYYY-MM-DD",
  })
  @Prop()
  birthDate: string;

  @ApiProperty({
    description: "Пол пользователя",
    type: String,
  })
  @Prop()
  sex: "Male" | "Female";

  @ApiProperty({
    description: "Роль пользователя",
    type: String,
  })
  @Prop()
  role: "User" | "Admin";

  @ApiProperty({
    description: "Информация о канале пользователя",
    type: ChannelInfo,
  })
  @Prop({ type: ChannelInfoSchema, _id: false })
  channelInfo: ChannelInfo;
}

export const UserSchema = SchemaFactory.createForClass(User);
