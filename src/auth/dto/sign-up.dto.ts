import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsEmail, Length } from "class-validator";

export class SignUpDto {
  @ApiProperty()
  @Allow()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Allow()
  @Length(8, 20)
  password: string;

  @ApiProperty()
  @Allow()
  name: string;
}
