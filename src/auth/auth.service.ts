import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { SignUpDto } from "./dto/sign-up.dto";
import { Role } from "src/users/constants/role";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateAccessToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload);
    return `${accessToken}`;
  }

  private async generateRefreshToken(userId: string) {
    const payload = { userId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
    return `${refreshToken}`;
  }

  async signIn(email: string, pass: string): Promise<any> {
    let user;

    if (email) {
      user = await this.usersService.findOne({ where: { email } });
    }

    if (!user || !user.verifyPassword(pass)) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
      refreshToken: await this.generateRefreshToken(user.id),
    };
  }

  async signUp(signUpData: SignUpDto): Promise<any> {
    const user = await this.usersService.findOne({
      where: { email: signUpData.email },
    });

    if (user) {
      throw new ConflictException();
    }

    const createdUser = await this.usersService.create({
      ...signUpData,
      role: Role.User,
    });

    return this.generateAccessToken({
      userId: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });
  }
}
