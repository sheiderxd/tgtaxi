import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./decorators/user.decorator";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "./constants/role";
import { SerializeInterceptor } from "src/interceptors/interceptor";
import { GetUserDto } from "./dto/get-user.dto";

@Controller("users")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Commited for testing
  // @Roles(Role.Admin)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Roles(Role.User)
  @UseInterceptors(new SerializeInterceptor(GetUserDto))
  @Get("/me")
  findCurrentUser(@User() user: any) {
    return this.usersService.findOne({ where: { id: user.userId } });
  }

  // @Roles(Role.Admin)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne({ where: { id } });
  }

  // @Roles(Role.Admin)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @Roles(Role.Admin)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
