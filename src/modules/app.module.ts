import { Module } from "@nestjs/common";

import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./posts/post.module";
import { CommentModule } from "./comments/comment.module";

@Module({
  imports: [UserModule, AuthModule, PostModule, CommentModule],
})
export class AppModule {}
