import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const CommentSchema: Schema = new Schema({
  uuid: { type: String, default: uuid },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  postUuid: String,
  creatorUuid: String,
  content: String,
});

export const Comment: any = model("Comment", CommentSchema);
