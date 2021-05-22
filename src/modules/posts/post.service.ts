import { Injectable } from "@nestjs/common";

import { IPost } from "./interfaces/IPost";
import { Post } from "./schemas/post.schema";

@Injectable()
export class PostService {
  public async create(post: IPost): Promise<void> {
    await new Post(post).save();
  }

  public async findOne(creatorUuid: string, uuid: string): Promise<IPost> {
    const post: IPost = await Post.findOne({ creatorUuid, uuid });

    post.numbers.likes = post.likes.length;

    return post;
  }

  public async findMany(creatorUuid: string): Promise<Array<IPost>> {
    const posts: Array<IPost> = await Post.find({ creatorUuid });

    for (const post of posts) {
      post.numbers.likes = post.likes.length;
    }

    return posts;
  }

  public async update(
    creatorUuid: string,
    uuid: string,
    data: IPost,
  ): Promise<void> {
    const post: typeof Post = await Post.findOne({ creatorUuid, uuid });

    await post.updateOne({
      updatedAt: new Date().toLocaleString(),
      content: data.content || post.content,
    });
  }

  public async remove(creatorUuid: string, uuid: string): Promise<void> {
    const post: typeof Post = await Post.findOne({ creatorUuid, uuid });

    await post.remove();
  }
}
