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
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ").includes("Bearer")
      ) {
        const token: string = req.headers.authorization.split(" ")[1];
        const decodedToken: any = new JWT().verify(token);

        (req as any).currentUser = decodedToken.data;

        return next();
      }

      throw new Error("Invalid token");
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
