import { IDatabase } from "../interfaces/IDatabase";

export class DatabaseService {
  private databases: IDatabase[];

  constructor(databases: IDatabase[]) {
    this.databases = databases;
  }

  public async connectAll(): Promise<void> {
    for (const db of this.databases) {
      await db.connect();
    }
  }
}
