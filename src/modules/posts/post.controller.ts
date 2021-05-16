import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";

import { PostService } from "./post.service";
import { CreatePostDto } from "./dtos/createPost.dto";
import { IPost } from "./interfaces/IPost";

@ApiBearerAuth()
@Controller("posts")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  public async create(@Body() post: CreatePostDto): Promise<string> {
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
  ): Promise<string> {
    return JSON.stringify(await this.postService.findMany(creatorUuid));
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
}
