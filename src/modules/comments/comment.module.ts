import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";

import { AuthMiddleware } from "../../common/middlewares/auth.middleware";

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CommentController);
  }
}
