import { DatabaseService } from "./services/DatabaseService";
import { SQLDatabase } from "./relational/SQLDatabase";

export const databaseService = new DatabaseService([
  new SQLDatabase()
]);
