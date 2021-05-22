import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  Req,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";

import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/createPost.dto";
import { IPost } from "./interfaces/IPost";
import { IUser } from "../users/interfaces/IUser";

@ApiBearerAuth()
@Controller("posts")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  public async create(
    @Req() { currentUser }: { currentUser: IUser },
    @Body() post: CreatePostDto,
  ): Promise<string> {
    (post as IPost).creatorUuid = currentUser.uuid;

    await this.postService.create(post);

    return JSON.stringify({
      log: "Post created",
    });
  }

  @Get(":creatorUuid")
  @ApiParam({
    name: "creatorUuid",
    required: true,
  })
  public async findMany(
    @Param("creatorUuid") creatorUuid: string,
  ): Promise<Array<IPost>> {
    return await this.postService.findMany(creatorUuid);
  }

  @Get(":creatorUuid/:uuid")
  @ApiParam({
    name: "creatorUuid",
    required: true,
  })
  @ApiParam({
    name: "uuid",
    required: true,
  })
  public async findOne(
    @Param("creatorUuid") creatorUuid: string,
    @Param("uuid") uuid: string,
  ): Promise<IPost> {
    return await this.postService.findOne(creatorUuid, uuid);
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
      throw new HttpException("Post not found!", HttpStatus.NOT_FOUND);
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
      throw new HttpException("Post not found!", HttpStatus.NOT_FOUND);
    }
  }
}
