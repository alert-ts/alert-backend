import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiParam, ApiBearerAuth } from "@nestjs/swagger";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/createUser.dto";

@ApiBearerAuth()
@Controller("users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async create(@Body() createUser: CreateUserDto): Promise<string> {
    try {
      await this.userService.create(createUser);

      return JSON.stringify({
        log: "User created",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get(":username")
  @ApiParam({ name: "username", required: true })
  public async findOnd(
    @Param() { username }: { username: string },
  ): Promise<string> {
    return JSON.stringify(await this.userService.findOne(username));
  }

  @Get()
  public async findAll(): Promise<string> {
    return JSON.stringify(await this.userService.findAll());
  }

  @Put(":username")
  @ApiParam({ name: "username", required: true })
  public async update(
    @Param() { username }: { username: string },
    @Body() updateUser: CreateUserDto,
  ): Promise<string> {
    try {
      await this.userService.update(username, updateUser);

      return JSON.stringify({
        log: "User updated",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(":username")
  @ApiParam({ name: "username", required: true })
  public async remove(
    @Param() { username }: { username: string },
  ): Promise<string> {
    try {
      await this.userService.remove(username);

      return JSON.stringify({
        log: "User removed",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
