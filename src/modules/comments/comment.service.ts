import { Injectable } from "@nestjs/common";

import { Comment } from "./schemas/comment.schema";
import { Post } from "../posts/schemas/post.schema";
import { IComment } from "./interfaces/IComment";

@Injectable()
export class CommentService {
  public async create(comment: IComment): Promise<void> {
    const postExists: boolean = !!(await Post.findOne({
      uuid: comment.postUuid,
    }));

    if (postExists) {
      await new Comment(comment).save();

      return;
    }

    throw new Error("Post doesn't exists");
  }

  public async findOne(postUuid: string, uuid: string): Promise<IComment> {
    return await Comment.findOne({ postUuid, uuid });
  }

  public async findAll(postUuid: string): Promise<Array<IComment>> {
    return await Comment.find({ postUuid });
  }
}
