import * as jwt from "jsonwebtoken";

export default class JWT {
  private readonly pk: string = process.env.JWT_PK!.trim();

  public sign(payload: unknown, exp: string = "7h"): string {
    return jwt.sign({ data: payload }, this.pk, {
      algorithm: "HS256",
      expiresIn: exp,
    });
  }

  public verify(token: string): boolean {
    try {
      jwt.verify(token, this.pk);

      return true;
    } catch (err) {
      return false;
    }
  }
}
