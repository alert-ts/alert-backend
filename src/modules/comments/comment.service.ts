import { Injectable } from "@nestjs/common";

import { Comment } from "./schemas/comment.schema";
import { Post } from "../posts/schemas/post.schema";
import { IComment } from "./interfaces/IComment";

@Injectable()
export class CommentService {
  public async create(
    creatorUuid: string,
    postUuid: string,
    content: string,
  ): Promise<void> {
    const postExists: boolean = !!(await Post.findOne({ uuid: postUuid }));

    if (postExists) {
      await new Comment({ creatorUuid, postUuid, content }).save();

      return;
    }

    throw new Error("Post doesn't exists");
  }
}
