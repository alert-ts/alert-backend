import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const UserSchema = new Schema({
  uuid: { type: String, default: uuid() },
  createdAt: { type: Date, default: new Date().toLocaleString() },
  updatedAt: { type: Date, default: new Date().toLocaleString() },
  email: String,
  username: String,
  fullname: String,
  password: String,
  posts: [String],
  followers: [String],
  following: [String],
  numbers: {
    followers: Number,
    following: Number,
    posts: Number,
  },
});

export const User: any = model("User", UserSchema);
