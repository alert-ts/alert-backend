export interface IUser {
  uuid?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  username: string;
  fullname: string;
  password?: string;
  avatar?: string;
  posts?: Array<string>;
  alreadyFollowed?: boolean;
  followEachOther?: boolean;
  followers?: Array<string>;
  following?: Array<string>;
  numbers?: {
    posts: number;
    following: number;
    followers: number;
  };
}
