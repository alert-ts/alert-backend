import { ApiProperty } from "@nestjs/swagger";

import { IAuth } from "../interfaces/IAuth";

export class MakeAuthDto implements IAuth {
  @ApiProperty({
    type: String,
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;
}
