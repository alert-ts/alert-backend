import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  HttpCode,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiParam, ApiQuery, ApiBearerAuth } from "@nestjs/swagger";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { IUser } from "./interfaces/IUser";

@ApiTags("Users")
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

  @Get("getMe")
  public async getMe(
    @Req() { currentUser }: { currentUser: IUser },
  ): Promise<IUser> {
    return this.userService.getMe(currentUser.uuid);
  }

  @Get("search")
  @ApiQuery({ name: "query" })
  public async search(
    @Req() { currentUser }: { currentUser: IUser },
    @Query("query") query: string,
  ): Promise<Array<IUser>> {
    try {
      return await this.userService.search(currentUser.uuid, query);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get(":username")
  @ApiParam({ name: "username", required: true })
  public async findOne(
    @Req() { currentUser }: { currentUser: IUser },
    @Param("username") username: string,
  ): Promise<IUser> {
    try {
      return await this.userService.findOne(currentUser.uuid, username);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  public async findAll(
    @Req() { currentUser }: { currentUser: IUser },
  ): Promise<Array<IUser>> {
    return await this.userService.findAll(currentUser.uuid);
  }

  @Put()
  public async update(
    @Req() { currentUser }: { currentUser: IUser },
    @Body() updateUser: CreateUserDto,
  ): Promise<string> {
    try {
      await this.userService.update(currentUser.uuid, updateUser);

      return JSON.stringify({
        log: "User updated",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete()
  public async remove(
    @Req() { currentUser }: { currentUser: IUser },
  ): Promise<string> {
    try {
      await this.userService.remove(currentUser.uuid);

      return JSON.stringify({
        log: "User removed",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Post("follow/:username")
  @HttpCode(202)
  @ApiParam({ name: "username", required: true })
  public async follow(
    @Req() { currentUser }: { currentUser: IUser },
    @Param("username") username: string,
  ): Promise<string> {
    try {
      await this.userService.follow(currentUser.uuid, username);

      return JSON.stringify({
        log: "User followed",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
