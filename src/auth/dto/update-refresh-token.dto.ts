import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateRefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  refreshToken: string;
}
