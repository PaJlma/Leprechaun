import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { VideosService } from "./videos.service";
import { CreateVideoDto } from "./dtos/createVideo.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Video } from "./schemas/video.schema";
import { AuthGuard } from "@/auth/auth.guard";
import { AuthService } from "@/auth/auth.service";
import { Request } from "express";
import { IPreparedVideo } from "./types/preparedVideo.interface";

@Controller("videos")
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  getPreparedVideos(): Promise<IPreparedVideo[]> {
    return this.videosService.getPreparedVideos();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "video", maxCount: 1 },
      { name: "preview", maxCount: 1 },
    ]),
  )
  create(
    @Body() dto: CreateVideoDto,
    @UploadedFiles() { video, preview }: { video?: Express.Multer.File[]; preview?: Express.Multer.File[] },
    @Req() request: Request,
  ): Promise<Video> {
    const userIdFromReq = request["user"]._id;

    if (!this.videosService.isUserAuthor(userIdFromReq, dto.author)) {
      throw new BadRequestException("Вы не имеете право на создание видео под чужим авторством");
    }

    if (!video[0] || !preview[0]) {
      throw new BadRequestException("Не передано видео или превью");
    }

    return this.videosService.create(dto, video[0], preview[0]);
  }

  @Delete("/:videoId")
  @UseGuards(AuthGuard)
  async delete(@Param("videoId") videoId: string, @Req() request: Request): Promise<Video> {
    const userIdFromReq = request["user"]._id;

    if (!(await this.videosService.checkUserRights(userIdFromReq, videoId))) {
      throw new BadRequestException("Вы не имеете право на создание видео под чужим авторством");
    }

    return this.videosService.delete(videoId);
  }
}
