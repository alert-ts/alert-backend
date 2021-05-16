import { Injectable } from "@nestjs/common";

import { IPost } from "./interfaces/IPost";
import { Post } from "./schemas/post.schema";

@Injectable()
export class PostService {
  public async create(post: IPost): Promise<void> {
    await new Post(post).save();
  }

  public async findOne(creatorUuid: string, uuid: string): Promise<IPost> {
    return await Post.findOne({ creatorUuid, uuid });
  }

  public async findMany(creatorUuid: string): Promise<Array<IPost>> {
    const posts: Array<IPost> = await Post.find();
    let postsTemp: Array<IPost> = [];

    for (const post of posts) {
      if (post.creatorUuid === creatorUuid) postsTemp.push(post);
    }

    return postsTemp;
  }
}
