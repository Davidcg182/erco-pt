// src/config/server.ts
import express, { Application } from "express";
import cors from "cors";
import env from "../../core/shared/env";

class Server {
  private app: Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = env.PORT;

    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  public setRoutes(routesCallback: (app: Application) => void): void {
    routesCallback(this.app);
  }
  
  public getApp(): Application {
    return this.app;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }
}

export const server = new Server();
