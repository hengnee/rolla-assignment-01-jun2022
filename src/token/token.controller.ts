import {Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors} from '@nestjs/common';

import {TokenService} from './token.service';

@Controller()
export class TokenController {
  constructor(private readonly tokenSrv: TokenService) {}
}
