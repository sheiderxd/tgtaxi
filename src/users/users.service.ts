import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(params: FindOneOptions<User>): Promise<User | undefined> {
    return this.usersRepository.findOne(params);
  }

  update(id: string, updateUserDto: Partial<User>) {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete({ id });
  }
}
