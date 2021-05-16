import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

import { AuthMiddleware } from "../../common/middlewares/auth.middleware";

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: "users",
        method: RequestMethod.POST,
      })
      .forRoutes(UserController);
  }
}
