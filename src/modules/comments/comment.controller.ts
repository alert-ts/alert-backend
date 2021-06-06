import {
  Controller,
  Post,
  Get,
  Param,
  Req,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";

import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dtos/createComment.dto";
import { IComment } from "./interfaces/IComment";
import { IUser } from "../users/interfaces/IUser";

@ApiBearerAuth()
@Controller("comments")
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(":postUuid")
  @ApiParam({
    name: "postUuid",
    required: true,
  })
  public async create(
    @Req() { currentUser }: { currentUser: IUser },
    @Param("postUuid") postUuid: string,
    @Body() comment: CreateCommentDto,
  ): Promise<string> {
    try {
      (comment as IComment).creatorUuid = currentUser.uuid;
      (comment as IComment).postUuid = postUuid;

      await this.commentService.create(comment);

      return JSON.stringify({
        log: "Comment created!",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(":postUuid")
  @ApiParam({
    name: "postUuid",
    required: true,
  })
  public async findAll(
    @Param("postUuid") postUuid: string,
  ): Promise<Array<IComment>> {
    return await this.commentService.findAll(postUuid);
  }
}
