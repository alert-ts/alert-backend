import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const PostSchema: Schema = new Schema({
  uuid: { type: String, default: uuid() },
  createdAt: { type: Date, default: new Date().toLocaleString() },
  updatedAt: { type: Date, default: new Date().toLocaleString() },
  creatorUuid: String,
  content: String,
  likes: [String],
  numbers: {
    likes: Number,
  },
});

export const Post: any = model("Post", PostSchema);
