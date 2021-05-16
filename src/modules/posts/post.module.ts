import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";

import { AuthMiddleware } from "../../common/middlewares/auth.middleware";

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(PostController);
  }
}
