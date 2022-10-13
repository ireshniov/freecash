import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/AppModule';
import { appBootstrap } from './app';

(async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule);

  await appBootstrap(app);

  const port: number | string = `${process.env.SERVER_PORT}` || 3000;

  await app.listen(port);
})();
