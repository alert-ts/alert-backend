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

    throw new Error("Post doesn't exists!");
  }

  public async findOne(postUuid: string, uuid: string): Promise<IComment> {
    const comment: IComment = await Comment.findOne({ postUuid, uuid });

    if (comment) return comment;

    throw new Error("Comment doesn't exists!");
  }

  public async findAll(postUuid: string): Promise<Array<IComment>> {
    return await Comment.find({ postUuid });
  }

  public async update(
    currentUser: string,
    postUuid: string,
    uuid: string,
    data: IComment,
  ): Promise<void> {
    const comment: typeof Comment = await Comment.findOne({
      creatorUuid: currentUser,
      postUuid,
      uuid,
    });

    if (comment) {
      await comment.updateOne({
        updatedAt: new Date().toLocaleString(),
        content: data.content || comment.content,
      });

      return;
    }

    throw new Error("Comment doesn't exists!");
  }
}
