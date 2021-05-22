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
      user.password = x2(user.password + process.env.PASS_SALT!);

      new User(user).save();

      return;
    }

    throw new Error("User already exists!");
  }

  public async findOne(username: string): Promise<IUser> {
    const user: IUser = await User.findOne({ username });

    if (user) {
      user.password = undefined;
      user.numbers.followers = user.followers.length;
      user.numbers.following = user.following.length;

      return user;
    }

    throw new Error("User not found!");
  }

  public async findAll(): Promise<Array<IUser>> {
    const users: Array<IUser> = await User.find();

    for (const user of users) {
      user.password = undefined;
      user.followers = undefined;
      user.following = undefined;
    }

    return users;
  }

  public async update(username: string, data: IUser): Promise<void> {
    const user: typeof User = await this.findOne(username);

    await user.updateOne({
      updatedAt: new Date().toLocaleString(),
      username: data.username || user.username,
      fullname: data.fullname || user.fullname,
      avatar: data.avatar || user.avatar,
    });
  }

  public async remove(username: string): Promise<void> {
    const user: typeof User = await this.findOne(username);

    await user.remove();
  }
}
