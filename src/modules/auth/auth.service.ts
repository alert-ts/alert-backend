import { Injectable } from "@nestjs/common";
import { x2 } from "sha256";

import { IAuth } from "./interfaces/IAuth";
import { User } from "../users/schemas/user.schema";

import JWT from "../../shared/JWT";

@Injectable()
export class AuthService {
  public async make(auth: IAuth): Promise<string> {
    const { uuid }: { uuid: string } = await User.findOne({
      username: auth.username,
      password: x2(auth.password + process.env.PASS_SALT),
    });

    if (!uuid) throw new Error("Invalid Credentials");

    return JWT.sign({ uuid });
  }
}
