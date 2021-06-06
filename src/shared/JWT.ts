import * as jwt from "jsonwebtoken";

export default class JWT {
  public static sign(payload: unknown, exp: string = "7h"): string {
    return jwt.sign({ data: payload }, process.env.JWT_PK.trim()!, {
      algorithm: "HS256",
      expiresIn: exp,
    });
  }

  public static verify(token: string): any {
    return jwt.verify(token, process.env.JWT_PK.trim()!);
  }
}
