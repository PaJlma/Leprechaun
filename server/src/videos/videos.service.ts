import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Video } from "./schemas/video.schema";
import { Model } from "mongoose";
import { CreateVideoDto } from "./dtos/createVideo.dto";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { VideosFilesService } from "./videosFiles.service";
import { UsersService } from "@/users/users.service";
import { IPreparedVideo } from "./types/preparedVideo.interface";

dayjs.extend(utc);

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
    private readonly videosFilesService: VideosFilesService,
    private readonly usersService: UsersService,
  ) {}

  async getPreparedVideos(): Promise<IPreparedVideo[]> {
    const videos = await this.videoModel.find({}).exec();
    const preparedVideos: IPreparedVideo[] = [];

    for (const video of videos) {
      const author = await this.usersService.getById(video.author);
      preparedVideos.push({
        video,
        author: { login: author.login, _id: author["_id"], nick: author.nick, channelInfo: author.channelInfo },
      });
    }

    return preparedVideos;
  }

  async create(dto: CreateVideoDto, video: Express.Multer.File, preview: Express.Multer.File): Promise<Video> {
    if (!this.usersService.getById(dto.author)) {
      throw new BadRequestException("Пользователя с таким ID не существует");
    }

    const createdAt = dayjs().utc().format();
    const createdVideo = new this.videoModel({ ...dto, createdAt });
    const videoDuration = await this.videosFilesService.uploadVideo(createdVideo._id.toString(), video, preview);
    createdVideo.$set({ duration: videoDuration });
    return createdVideo.save();
  }

  async delete(id: string): Promise<Video> {
    const deletedVideo = await this.videoModel.findByIdAndDelete(id).exec();
    await this.videosFilesService.deleteVideo(id);
    return deletedVideo;
  }

  async deleteAllForUser(author: string): Promise<Video[]> {
    const deletedVideos = await this.videoModel.find({ author }).exec();
    await this.videoModel.deleteMany({ author }).exec();
    for (const video of deletedVideos) {
      await this.videosFilesService.deleteVideo(video._id.toString());
    }
    return deletedVideos;
  }

  isUserAuthor(user: string, author: string) {
    return user === author;
  }

  async checkUserRights(user: string, videoId: string): Promise<boolean> {
    const video = await this.videoModel.findById(videoId).exec();
    return user === video.author;
  }
}
