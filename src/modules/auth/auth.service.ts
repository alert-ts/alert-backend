import { Injectable } from "@nestjs/common";
import { x2 } from "sha256";

import { IAuth } from "./interfaces/IAuth";
import { IUser } from "../users/interfaces/IUser";
import { User } from "../users/schemas/user.schema";
import JWT from "../../shared/JWT";

@Injectable()
export class AuthService {
  public async make(auth: IAuth): Promise<string> {
    const user: IUser = await User.findOne({
      username: auth.username,
      password: x2(auth.password + process.env.PASS_SALT),
    });

    if (!user) throw new Error("Invalid Credentials");

    return new JWT().sign({ username: user.username });
  }
}
