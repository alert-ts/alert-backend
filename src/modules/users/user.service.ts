import { Injectable } from "@nestjs/common";
import { model } from "mongoose";
import { x2 } from "sha256";

import { IUser } from "./interfaces/IUser";
import { UserSchema } from "./schemas/user.schema";

const User: any = model("User", UserSchema);

@Injectable()
export class UserService {
  public async create(user: IUser): Promise<void> {
    const users: Array<IUser> = await this.findAll();
    const userExists: boolean = !!users.find(
      (u: IUser) => u.username === user.username || u.email === user.email,
    );

    if (!userExists) {
      user.password = x2(user.password + process.env.PASS_SALT!);

      new User(user).save();

      return;
    }

    throw new Error("User already exists!");
  }

  public async findOne(username: string): Promise<IUser | undefined> {
    const users: Array<IUser> = await User.find();

    for (const user of users) {
      if (user.username === username) {
        user.password = undefined;
        user.numbers.followers = user.followers.length;
        user.numbers.following = user.following.length;
        user.numbers.posts = user.posts.length;

        return user;
      }
    }

    return undefined;
  }

  public async findAll(): Promise<Array<IUser>> {
    const users: Array<IUser> = await User.find();

    for (const user of users) {
      user.password = undefined;
      user.followers = undefined;
      user.following = undefined;
      user.posts = undefined;
    }

    return users;
  }

  public async update(username: string, data: IUser): Promise<void> {
    const user: IUser = await this.findOne(username);

    await (user as any).updateOne({
      updatedAt: new Date().toLocaleString(),
      email: data.email || user.email,
      username: data.username || user.username,
      fullname: data.fullname || user.fullname,
    });
  }

  public async remove(username: string): Promise<void> {
    const user: IUser = await this.findOne(username);

    await (user as any).remove();
  }
}
