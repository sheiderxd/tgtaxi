import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async generateAccessToken(userId: string, email: string) {
    const payload = { userId, email };
    const accessToken = await this.jwtService.signAsync(payload);
    return `JWT ${accessToken}`;
  }

  private async generateRefreshToken(userId: string) {
    const payload = { userId };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.refreshTokenExpiresIn,
    });
    return `JWT ${refreshToken}`;
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
      accessToken: await this.generateAccessToken(user.id, user.email),
      refreshToken: await this.generateRefreshToken(user.id),
    };
  }

  async signUp(createUserDto): Promise<any> {
    const user = await this.usersService.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new ConflictException();
    }

    const createdUser = await this.usersService.create(createUserDto);

    return this.generateAccessToken(createdUser.id, createdUser.email);
  }
}
