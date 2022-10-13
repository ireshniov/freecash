import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DEFAULT_CONNECTION_NAME } from '@nestjs/typeorm/dist/typeorm.constants';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { Offer } from '../module/offer/entity/Offer';

const isDevEnv: boolean = 'development' === process.env.NODE_ENV;
const basePath: string = isDevEnv && process.env.TS_NODE ? '' : 'dist/';

export const mysql: MysqlConnectionOptions = {
  name: DEFAULT_CONNECTION_NAME,
  type: 'mysql',
  url: process.env.DB_URL,
  entities: [Offer],
  synchronize: false,
  logging:
    process.env.DB_LOGGING === 'true' ? true : (process.env.DB_LOGGING as any),
  migrations: [`${basePath}/src/migration/mysql/*{.ts,.js}`],
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each',
  migrationsRun: false,
  cli: {
    migrationsDir: `${basePath}/src/migration/mysql`,
  },
  namingStrategy: new SnakeNamingStrategy(),
};
