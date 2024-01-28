import { TCategory } from "../category.types";
import { IAuthor } from "./author.interface";

export interface IVideo {
  _id: string;
  title: string;
  author: string;
  category?: TCategory;
  createdAt: string;
  description?: string;
  duration: IVideoDuration;
}

export interface IVideoDuration {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface IPreparedVideo {
  author: IAuthor;
  video: IVideo;
}
