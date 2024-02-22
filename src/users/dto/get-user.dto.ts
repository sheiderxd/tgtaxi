import { Role } from "../constants/role";
import { Expose } from "class-transformer";

export class GetUserDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;
}
