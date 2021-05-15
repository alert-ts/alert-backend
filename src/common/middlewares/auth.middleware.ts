import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

import JWT from "../../shared/JWT";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ").includes("Bearer")
    ) {
      const token: string = req.headers.authorization.split(" ")[1];

      if (new JWT().verify(token)) {
        return next();
      }
    }

    throw new HttpException(
      "Invalid authorization token",
      HttpStatus.UNAUTHORIZED,
    );
  }
}
