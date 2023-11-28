import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    description: "Электронный почтовый адрес пользователя",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Пароль пользователя",
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
