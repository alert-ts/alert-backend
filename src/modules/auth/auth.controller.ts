import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { MakeAuthDto } from "./dtos/makeAuth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  public async make(@Body() auth: MakeAuthDto): Promise<string> {
    try {
      return JSON.stringify({
        token: await this.authService.make(auth),
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
