import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Tokens} from './token.entity';
import {Repository} from 'typeorm';

@Injectable()
export class TokenService {
  constructor(@InjectRepository(Tokens) private tokenRepo: Repository<Tokens>) {}
}
