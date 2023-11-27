import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { VideoDuration } from "./schemas/videoDuration.schema";
import * as path from "path";
import * as fse from "fs-extra";
import * as dayjs from "dayjs";
import * as dayjsDuration from "dayjs/plugin/duration";
import { promisify } from "util";
import Ffmpeg, { ffprobe } from "fluent-ffmpeg";

dayjs.extend(dayjsDuration);

@Injectable()
export class VideosFilesService {
  constructor() {}

  private pathToStaticVideosDir = path.resolve(__dirname, "..", "..", "static", "videos");

  async uploadVideo(videoId: string, video: Express.Multer.File, preview: Express.Multer.File): Promise<VideoDuration> {
    const pathToVideoDir = path.join(this.pathToStaticVideosDir, videoId);
    const pathToVideoFile = path.join(pathToVideoDir, "video.mp4");
    const pathToPreviewFile = path.join(pathToVideoDir, "preview.jpg");

    try {
      await fse.mkdir(pathToVideoDir);
      await fse.writeFile(pathToVideoFile, video.buffer);
      await fse.writeFile(pathToPreviewFile, preview.buffer);
    } catch {
      throw new InternalServerErrorException("Ошибка при загрузке видео");
    }

    return this.getVideoDuration(pathToVideoFile);
  }

  async deleteVideo(videoId: string): Promise<string> {
    const pathToVideoDir = path.join(this.pathToStaticVideosDir, videoId);

    try {
      await fse.rm(pathToVideoDir, { recursive: true });
    } catch {
      throw new InternalServerErrorException("Ошибка при удалении видео");
    }

    return pathToVideoDir;
  }

  // Private Method
  async getVideoDuration(path: string): Promise<VideoDuration> {
    const ffprobePromise = promisify<string, Ffmpeg.FfprobeData>(ffprobe);

    try {
      const metadata = await ffprobePromise(path);
      const seconds = metadata.format.duration;

      const dayjsObject = dayjs.duration(seconds, "seconds");

      return {
        hours: dayjsObject.hours(),
        minutes: dayjsObject.minutes(),
        seconds: dayjsObject.seconds(),
      };
    } catch {
      throw new InternalServerErrorException("Ошибка при получении длины видео");
    }
  }
}
