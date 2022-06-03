import {Module} from '@nestjs/common';
import {Tokens} from './token.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tokens])],
  controllers: [],
  providers: [],
})
export class TokenModule {}
