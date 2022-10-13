import { INestApplication } from '@nestjs/common';

export async function appBootstrap(
  app: INestApplication,
): Promise<INestApplication> {
  app.setGlobalPrefix('/api');

  return app;
}
