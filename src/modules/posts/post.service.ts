import { Injectable } from "@nestjs/common";

import { IPost } from "./interfaces/IPost";
import { Post } from "./schemas/post.schema";
import { User } from "../users/schemas/user.schema";

@Injectable()
export class PostService {
  public async create(post: IPost): Promise<void> {
    const postAlreadyExists: boolean = !!(await Post.findOne({
      content: post.content,
    }));

    if (!postAlreadyExists) {
      const currentUser: typeof User = await User.findOne({
        uuid: post.creatorUuid,
      });
      const newPost: typeof Post = new Post(post);

      await currentUser.updateOne({
        $push: { posts: newPost.uuid },
      });
      await newPost.save();

      return;
    }

    throw new Error("Post already exists!");
  }

  public async findOne(username: string, uuid: string): Promise<IPost> {
    const { posts }: { posts: Array<string> } = await User.findOne({
      username,
    });

    if (posts.includes(uuid)) {
      const post: IPost = await Post.findOne({ uuid });

      if (post) {
        post.numbers.likes = post.likes.length;

        return post;
      }
    }

    throw new Error("Post not found!");
  }

  public async findMany(username: string): Promise<Array<IPost>> {
    const { posts }: { posts: Array<string> } = await User.findOne({
      username,
    });
    const posts_: Array<IPost> = await Post.find({ uuid: { $in: posts } });

    for (const post of posts_) {
      post.numbers.likes = post.likes.length;
      post.likes = undefined;
    }

    return posts_;
  }

  public async update(
    currentUser: string,
    uuid: string,
    data: IPost,
  ): Promise<void> {
    const post: typeof Post = await this.findOne(currentUser, uuid);

    await post.updateOne({
      updatedAt: new Date().toLocaleString(),
      content: data.content || post.content,
    });
  }

  public async remove(currentUser: string, uuid: string): Promise<void> {
    const post: typeof Post = await this.findOne(currentUser, uuid);

    await post.remove();
  }

  public async like(
    currentUser: string,
    username: string,
    uuid: string,
  ): Promise<void> {
    const post: typeof Post = await this.findOne(username, uuid);

    if (!post.likes.includes(currentUser)) {
      await post.update({
        $push: { likes: currentUser },
      });
    } else {
      await post.update({
        $pull: { likes: currentUser },
      });
    }
  }
}
