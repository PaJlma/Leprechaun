import { ApiProperty } from "@nestjs/swagger";

export class CreateVideoDto {
  @ApiProperty({
    description: "Название видео",
    type: String,
    required: true,
  })
  title: string;

  @ApiProperty({
    description: "ID автора",
    type: String,
    required: true,
  })
  author: string;
}
