export interface IPost {
  uuid?: string;
  createdAt?: string;
  updatedAt?: string;
  creatorUuid?: string;
  content: string;
  alreadyLiked?: boolean;
  likes?: Array<string>;
  numbers?: {
    likes: number;
  };
}
