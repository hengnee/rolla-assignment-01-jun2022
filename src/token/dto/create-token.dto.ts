import {IsDecimal, IsNumber, MaxLength} from 'class-validator';

export class CreateTokenDto {
  id!: number;

  @MaxLength(30)
  username!: string;

  @MaxLength(3)
  symbol!: string;

  @IsNumber()
  @IsDecimal()
  balance!: number;
}
