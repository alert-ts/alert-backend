import { Controller } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

import { CommentService } from "./comment.service";

@ApiBearerAuth()
@Controller("comments")
export class CommentController {
  constructor(private commentService: CommentService) {}
}
