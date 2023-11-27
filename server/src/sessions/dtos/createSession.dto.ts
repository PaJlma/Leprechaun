import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionDto {
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

  @ApiProperty({
    description: "Access токен, действующий для данной сессии",
    type: String,
  })
  access: string;

  @ApiProperty({
    description: "Refresh токен, действующий для данной сессии",
    type: String,
  })
  refresh: string;
}
