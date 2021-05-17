import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Req,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiParam, ApiBearerAuth } from "@nestjs/swagger";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { IUser } from "./interfaces/IUser";

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
  ): Promise<IUser> {
    return await this.userService.findOne(username);
  }

  @Get()
  public async findAll(): Promise<Array<IUser>> {
    return await this.userService.findAll();
  }

  @Put()
  public async update(
    @Req() { currentUser }: { currentUser: IUser },
    @Body() updateUser: CreateUserDto,
  ): Promise<string> {
    try {
      await this.userService.update(currentUser.username, updateUser);

      return JSON.stringify({
        log: "User updated",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete()
  public async remove(
    @Req() { currentUser }: { currentUser: IUser },
  ): Promise<string> {
    try {
      await this.userService.remove(currentUser.username);

      return JSON.stringify({
        log: "User removed",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
