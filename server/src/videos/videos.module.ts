import { Module, forwardRef } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { VideosController } from "./videos.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./schemas/video.schema";
import { AuthModule } from "@/auth/auth.module";
import { VideosFilesService } from "./videosFiles.service";
import { UsersModule } from "@/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    forwardRef(() => AuthModule),
    UsersModule,
  ],
  providers: [VideosService, VideosFilesService],
  controllers: [VideosController],
  exports: [VideosService],
})
export class VideosModule {}
