import { IUser } from "../interfaces/IUser";

export default class Filters {
  public static filterInfoForOne(user: IUser): IUser {
    user.password = undefined;
    user.numbers.followers = user.followers.length;
    user.numbers.following = user.following.length;
    user.numbers.posts = user.posts.length;

    return user;
  }

  public static filterInfoForMany(user: IUser): IUser {
    user.password = undefined;
    user.numbers.followers = user.followers.length;
    user.numbers.following = user.following.length;
    user.numbers.posts = user.posts.length;
    user.followers = undefined;
    user.following = undefined;
    user.posts = undefined;

    return user;
  }
}
