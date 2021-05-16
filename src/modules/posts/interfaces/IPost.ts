export interface IPost {
  uuid?: string;
  createdAt?: string;
  updatedAt?: string;
  creatorUuid?: string;
  content: string;
  likes?: Array<string>;
  numbers?: {
    likes: number;
  };
}
