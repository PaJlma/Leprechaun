import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserDto {
  @ApiProperty({
    description: "Электронный почтовый адрес пользователя",
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    description: "Пароль пользователя",
    type: String,
    required: true,
  })
  password: string;
}
