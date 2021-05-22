export interface IUser {
  uuid?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  username: string;
  fullname: string;
  password?: string;
  avatar?: string;
  followers?: Array<string>;
  following?: Array<string>;
  numbers?: {
    following: number;
    followers: number;
  };
}
