import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Req,
  HttpCode,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiParam } from "@nestjs/swagger";

import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/createPost.dto";
import { IPost } from "./interfaces/IPost";
import { IUser } from "../users/interfaces/IUser";

@ApiTags("Posts")
@ApiBearerAuth()
@Controller("posts")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  public async create(
    @Req() { currentUser }: { currentUser: IUser },
    @Body() post: CreatePostDto,
  ): Promise<string> {
    try {
      (post as IPost).creatorUuid = currentUser.uuid;

      await this.postService.create(post);

      return JSON.stringify({
        log: "Post created",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Get(":username")
  @ApiParam({
    name: "username",
    required: true,
  })
  public async findMany(
    @Param("username") username: string,
  ): Promise<Array<IPost>> {
    return await this.postService.findMany(username);
  }

  @Get(":username/:uuid")
  @ApiParam({
    name: "username",
    required: true,
  })
  @ApiParam({
    name: "uuid",
    required: true,
  })
  public async findOne(
    @Param("username") username: string,
    @Param("uuid") uuid: string,
  ): Promise<IPost> {
    try {
      return await this.postService.findOne(username, uuid);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(":uuid")
  @ApiParam({
    name: "uuid",
    required: true,
  })
  public async update(
    @Req() { currentUser }: { currentUser: IUser },
    @Param("uuid") uuid: string,
    @Body() post: CreatePostDto,
  ): Promise<string> {
    try {
      await this.postService.update(currentUser.uuid, uuid, post);

      return JSON.stringify({
        log: "Post updated",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(":uuid")
  @ApiParam({
    name: "uuid",
    required: true,
  })
  public async remove(
    @Req() { currentUser }: { currentUser: IUser },
    @Param("uuid") uuid: string,
  ): Promise<string> {
    try {
      await this.postService.remove(currentUser.uuid, uuid);

      return JSON.stringify({
        log: "Post removed",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post("like/:username/:uuid")
  @HttpCode(202)
  @ApiParam({
    name: "username",
    required: true,
  })
  @ApiParam({
    name: "uuid",
    required: true,
  })
  public async like(
    @Req() { currentUser }: { currentUser: IUser },
    @Param("username") username: string,
    @Param("uuid") uuid: string,
  ): Promise<string> {
    try {
      await this.postService.like(currentUser.uuid, username, uuid);

      return JSON.stringify({
        log: "Post liked",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
