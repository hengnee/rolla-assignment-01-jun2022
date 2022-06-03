import {ConfigModule, ConfigService} from '@nestjs/config';
import {Logger, Module} from '@nestjs/common';

import {DataSource} from 'typeorm';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {Tokens} from 'src/token/token.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Users} from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'default', // optional: default value is "default"
      useFactory: (config: ConfigService) =>
        ({
          type: 'postgres',
          port: +config.get('POSTGRES_PORT'),
          host: config.get('POSTGRES_HOST'),
          username: config.get('POSTGRES_USER'),
          password: config.get('POSTGRES_PASSWORD'),
          database: config.get('POSTGRES_DATABASE'),
          synchronize: config.get('NODE_ENV') !== 'production',
          // logging    : true,
          entities: [Users, Tokens],
        } as PostgresConnectionOptions),
    }),
  ],
})
export class PostgresDatabaseModule {
  private readonly logger = new Logger(PostgresDatabaseModule.name);
  constructor(private readonly dbConnection: DataSource) {
    if (this.dbConnection.isInitialized) {
      this.logger.log('Database connection established');
    }
  }
}
