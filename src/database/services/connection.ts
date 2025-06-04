import knex, { Knex } from 'knex';
import env from '../../core/shared/env';

const knexInstance: Knex = knex({
  client: 'postgresql',
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD
  }
});

export default knexInstance; 