import {MaxLength, MinLength} from 'class-validator';

export class CreateUserDto {
  @MaxLength(30)
  username!: string;

  @MinLength(16)
  password!: string;
}
