import {ConfigModule} from '@nestjs/config';
import {Module} from '@nestjs/common';
import {PostgresDatabaseModule} from './database/postgres.module';
import {TokenModule} from './token/token.module';
import {UserModule} from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}),
    PostgresDatabaseModule,
    UserModule,
    TokenModule,
  ],
})
export class AppModule {}
