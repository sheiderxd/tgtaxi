import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Public } from "./decorators/public.decorator";
import { SignUpDto } from "./dto/sign-up.dto";
import { UpdateRefreshTokenDto } from "./dto/update-refresh-token.dto";

@Controller("auth")
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post("register")
  signUp(@Body() signUpData: SignUpDto) {
    return this.authService.signUp(signUpData);
  }

  @HttpCode(HttpStatus.OK)
  @Post("update-refresh-token")
  upadateRefreshToken(@Body() { refreshToken }: UpdateRefreshTokenDto) {
    return this.authService.updateRefreshToken(refreshToken);
  }
}
