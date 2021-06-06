import { ApiProperty } from "@nestjs/swagger";

import { IComment } from "../interfaces/IComment";

export class CreateCommentDto implements IComment {
  @ApiProperty({
    type: String,
    required: true,
  })
  content: string;
}
