import { ApiProperty } from "@nestjs/swagger";

import { IUser } from "../interfaces/IUser";

export class CreateUserDto implements IUser {
  @ApiProperty({
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  fullname: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  avatar: string;
}
