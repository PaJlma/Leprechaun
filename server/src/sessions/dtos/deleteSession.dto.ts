import { ApiProperty } from "@nestjs/swagger";

export class DeleteSessionDto {
  @ApiProperty({
    description: "ID пользователя для которого была создана данная сессия",
    type: String,
  })
  user: string;

  @ApiProperty({
    description: "Уникальный отпечаток клиента (Например для браузеров это user-agent)",
    type: String,
  })
  fingerPrint: string;
}
