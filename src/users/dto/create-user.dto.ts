import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
