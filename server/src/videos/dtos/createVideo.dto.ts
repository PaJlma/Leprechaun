import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TCategory } from "../types/category.types";

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

  @ApiProperty({
    description: "Категория видео",
    type: String,
  })
  @IsOptional()
  @IsString()
  category: TCategory;
}
