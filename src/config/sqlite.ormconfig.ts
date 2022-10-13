import { Offer } from '../module/offer/entity/Offer';
import { DEFAULT_CONNECTION_NAME } from '@nestjs/typeorm/dist/typeorm.constants';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const sqlite: SqliteConnectionOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  name: DEFAULT_CONNECTION_NAME,
  entities: [Offer],
  synchronize: true,
};
