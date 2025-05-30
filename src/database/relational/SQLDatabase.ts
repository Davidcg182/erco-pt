// src/config/database/SQLDatabase.ts
import knex, { Knex } from "knex";
import { IDatabase } from "../interfaces/IDatabase";
import env from "../../core/shared/env";

export class SQLDatabase implements IDatabase {
  private knex: Knex;

  constructor() {
    this.knex = knex({
      client: 'postgresql',
      connection: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASSWORD
      }
    });
  }

  public async connect(): Promise<void> {
    try {
      await this.knex.raw('SELECT 1');
      console.log("✅ SQL database connected");
    } catch (error) {
      console.error("❌ Error SQL connection:", error);
      throw error;
    }
  }

  public getClient(): Knex {
    return this.knex;
  }
}
