import {Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UserService} from './user.service';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  registerNewAccount(@Body() user: CreateUserDto) {
    return this.appService.registerNewAccount(user);
  }

  @Post('account')
  getAccountInfo(@Body() user: CreateUserDto) {
    return this.appService.getAccountInfo(user);
  }

  @Post('test')
  makeTransaction(@Body() user: CreateUserDto) {
    return this.appService.makeTransaction(user);
  }
}
