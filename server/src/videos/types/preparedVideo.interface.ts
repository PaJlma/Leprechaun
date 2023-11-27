import { Video } from "../schemas/video.schema";
import { IAuthor } from "./author.interface";

export interface IPreparedVideo {
  video: Video;
  author: IAuthor;
}
