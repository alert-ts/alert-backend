import { Module } from "@nestjs/common";

import { UserModule } from "./users/user.module";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./posts/post.module";

@Module({
  imports: [UserModule, AuthModule, PostModule],
})
export class AppModule {}
