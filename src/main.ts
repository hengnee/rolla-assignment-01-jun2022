import {Logger, ValidationPipe} from '@nestjs/common';

import {AppModule} from './app.module';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';

(async () => {
  const app     = await NestFactory.create(AppModule);
  const config  = app.get<ConfigService>(ConfigService);
  const port    = config.get<number>('PORT');
  const address = config.get<string>('ADDRESS') || 'localhost';

  app.useGlobalPipes(new ValidationPipe({transform: true}));

  await app.listen(port, address, async () =>
    Logger.log(`Application running on ${await app.getUrl()}`),
  );
})();
