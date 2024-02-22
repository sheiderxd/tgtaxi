import { ApiProperty } from "@nestjs/swagger";
import { Allow } from "class-validator";

export class SignUpDto {
  @ApiProperty()
  @Allow()
  email: string;

  @ApiProperty()
  @Allow()
  password: string;

  @ApiProperty()
  @Allow()
  name: string;
}
