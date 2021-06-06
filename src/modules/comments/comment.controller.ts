import {
  Controller,
  Post,
  Param,
  Req,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam } from "@nestjs/swagger";

import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dtos/createComment.dto";
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
    @Body() body: CreateCommentDto,
  ): Promise<string> {
    try {
      await this.commentService.create(
        currentUser.uuid,
        postUuid,
        body.content,
      );

      return JSON.stringify({
        log: "Comment created!",
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
