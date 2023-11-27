import { User } from "@/users/schemas/user.schema";

export interface IAuthor extends Pick<User, "login" | "nick" | "channelInfo"> {
  _id: string;
}
