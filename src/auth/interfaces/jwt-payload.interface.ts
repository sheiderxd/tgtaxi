import { Role } from "src/users/constants/role";

export interface JwtPayload {
  userId: string;
  email: string;
  role: Role;
}
