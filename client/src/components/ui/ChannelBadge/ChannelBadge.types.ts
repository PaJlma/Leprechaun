import { IAuthor } from "@/types/interfaces/author.interface";
import { HTMLAttributes } from "react";

export interface ChannelBadgeProps extends HTMLAttributes<HTMLDivElement> {
  author: IAuthor;
}
