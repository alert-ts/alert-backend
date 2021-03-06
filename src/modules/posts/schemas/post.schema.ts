import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const PostSchema: Schema = new Schema({
  uuid: { type: String, default: uuid },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  creatorUuid: String,
  content: String,
  alreadyLiked: Boolean,
  likes: [String],
  numbers: {
    likes: Number,
  },
});

export const Post: any = model("Post", PostSchema);
