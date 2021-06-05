import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const UserSchema: Schema = new Schema({
  uuid: { type: String, default: uuid },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  email: String,
  username: String,
  fullname: String,
  password: String,
  avatar: String,
  posts: [String],
  alreadyFollowed: Boolean,
  followers: [String],
  following: [String],
  numbers: {
    posts: Number,
    followers: Number,
    following: Number,
  },
});

export const User: any = model("User", UserSchema);
