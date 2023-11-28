import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoDto {
  @ApiProperty({
    description: "Название видео",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: "ID автора",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  author: string;
}
