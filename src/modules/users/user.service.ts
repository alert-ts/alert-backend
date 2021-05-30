import { Injectable } from "@nestjs/common";
import { x2 } from "sha256";

import { IUser } from "./interfaces/IUser";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserService {
  public async create(user: IUser): Promise<void> {
    const userExists: boolean = !!(await User.findOne({
      $or: [{ username: user.username }, { email: user.email }],
    }));

    if (!userExists) {
      if (user.username.length < 3) {
        throw new Error(
          "Username need to be greater than or equal to 3 characters",
        );
      }

      user.password = x2(user.password + process.env.PASS_SALT!);

      await new User(user).save();

      return;
    }

    throw new Error("User already exists!");
  }

  public async getMe(uuid: string): Promise<IUser> {
    return await this.findOne(uuid);
  }

  public async findOne(username: string): Promise<IUser> {
    const user: IUser = await User.findOne({
      $or: [{ username: username }, { uuid: username }],
    });

    if (user) {
      user.password = undefined;
      user.numbers.followers = user.followers.length;
      user.numbers.following = user.following.length;
      user.numbers.posts = user.posts.length;

      return user;
    }

    throw new Error("User not found!");
  }

  public async findAll(): Promise<Array<IUser>> {
    const users: Array<IUser> = await User.find();

    for (const user of users) {
      user.password = undefined;
      user.numbers.followers = user.followers.length;
      user.numbers.following = user.following.length;
      user.numbers.posts = user.posts.length;
      user.followers = undefined;
      user.following = undefined;
      user.posts = undefined;
    }

    return users;
  }

  public async search(query: string): Promise<Array<IUser>> {
    if (query.length < 3) {
      throw new Error(
        "Search query need to be greater than or equal to 3 characters",
      );
    }

    const users: Array<IUser> = await User.find({
      $or: [
        { username: { $regex: `.*${query}.*` } },
        { fullname: { $regex: `.*${query}.*` } },
      ],
    });

    for (const user of users) {
      user.password = undefined;
      user.numbers.followers = user.followers.length;
      user.numbers.following = user.following.length;
      user.numbers.posts = user.posts.length;
      user.followers = undefined;
      user.following = undefined;
      user.posts = undefined;
    }

    return users;
  }

  public async update(uuid: string, data: IUser): Promise<void> {
    const user: typeof User = await User.findOne({ uuid });

    await user.updateOne({
      updatedAt: new Date().toLocaleString(),
      username: data.username || user.username,
      fullname: data.fullname || user.fullname,
      avatar: data.avatar || user.avatar,
    });
  }

  public async remove(uuid: string): Promise<void> {
    const user: typeof User = await User.findOne({ uuid });

    await user.remove();
  }
}
