import {ConfigModule, ConfigService} from '@nestjs/config';
import {EthersModule, RINKEBY_NETWORK} from 'nestjs-ethers';

import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    EthersModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        network: RINKEBY_NETWORK,
        useDefaultProvider: false,
        infura: {
          projectId    : config.get('INFURA_PROJECT_ID'),
          projectSecret: config.get('INFURA_PROJECT_SECRET'),
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
