import { Injectable } from "@nestjs/common";
import { x2 } from "sha256";

import { IUser } from "./interfaces/IUser";
import { User } from "./schemas/user.schema";

import Filters from "./utils/Filters";

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
    return Filters.filterInfoForOne(await User.findOne({ uuid }));
  }

  public async findOne(currentUser: string, username: string): Promise<IUser> {
    const { following }: { following: Array<string> } = await User.findOne({
      uuid: currentUser,
    });
    const user: IUser = await User.findOne({
      $or: [{ username: username }, { uuid: username }],
    });

    if (user) {
      user.alreadyFollowed = following.includes(user.uuid);
      user.followEachOther =
        user.alreadyFollowed && user.following.includes(currentUser);

      return Filters.filterInfoForOne(user);
    }

    throw new Error("User not found!");
  }

  public async findAll(currentUser: string): Promise<Array<IUser>> {
    const { following }: { following: Array<string> } = await User.findOne({
      uuid: currentUser,
    });
    const users: Array<IUser> = await User.find();

    return users.map((user: IUser): IUser => {
      user.alreadyFollowed = following.includes(user.uuid);
      user.followEachOther =
        user.alreadyFollowed && user.following.includes(currentUser);

      return Filters.filterInfoForMany(user);
    });
  }

  public async search(
    currentUser: string,
    query: string,
  ): Promise<Array<IUser>> {
    if (query.length < 3) {
      throw new Error(
        "Search query need to be greater than or equal to 3 characters",
      );
    }

    const { following }: { following: Array<string> } = await User.findOne({
      uuid: currentUser,
    });

    const users: Array<IUser> = await User.find({
      $or: [
        { username: { $regex: `.*${query}.*` } },
        { fullname: { $regex: `.*${query}.*` } },
      ],
    });

    return users.map((user: IUser): IUser => {
      user.alreadyFollowed = following.includes(user.uuid);
      user.followEachOther =
        user.alreadyFollowed && user.following.includes(currentUser);

      return Filters.filterInfoForMany(user);
    });
  }

  public async update(currentUser: string, data: IUser): Promise<void> {
    const user: typeof User = await User.findOne({ uuid: currentUser });

    if (data.username) {
      const isInvalidUsername: boolean = !!(await User.findOne({
        username: data.username,
      }));

      if (isInvalidUsername) {
        throw new Error("Invalid username!");
      }
    }

    await user.updateOne({
      updatedAt: new Date().toLocaleString(),
      username: data.username || user.username,
      fullname: data.fullname || user.fullname,
      avatar: data.avatar || user.avatar,
    });
  }

  public async remove(currentUser: string): Promise<void> {
    const user: typeof User = await User.findOne({ uuid: currentUser });

    await user.remove();
  }

  public async follow(currentUser_: string, username: string): Promise<void> {
    const currentUser: typeof User = await User.findOne({
      uuid: currentUser_,
    });
    const targetUser: typeof User = await User.findOne({
      $or: [{ username: username }, { uuid: username }],
    });

    if (currentUser.uuid !== targetUser.uuid) {
      if (!currentUser.following.includes(targetUser.uuid)) {
        await currentUser.updateOne({
          $push: { following: targetUser.uuid },
        });

        await targetUser.updateOne({
          $push: { followers: currentUser_ },
        });
      } else {
        await currentUser.updateOne({
          $pull: { following: targetUser.uuid },
        });

        await targetUser.updateOne({
          $pull: { followers: currentUser_ },
        });
      }

      return;
    }

    throw new Error("You can't follow yourself!");
  }
}
