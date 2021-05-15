export interface IUser {
  uuid?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  username: string;
  fullname: string;
  password?: string;
  posts?: Array<string>;
  followers?: Array<string>;
  following?: Array<string>;
  numbers?: {
    posts: number;
    following: number;
    followers: number;
  };
}
