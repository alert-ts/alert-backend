import { ApiProperty } from "@nestjs/swagger";

import { IPost } from "../interfaces/IPost";

export class CreatePostDto implements IPost {
  @ApiProperty({
    type: String,
    required: true,
  })
  content: string;
}
