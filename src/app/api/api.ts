import { server } from "../../infrastructure/server/Server";
import { databaseService } from "../../database";
import userRoutes from "./user/routes/userRoutes";
import productRoutes from "./product/routes/productRoutes";

const startServer = async () => {
  try {
    await databaseService.connectAll();
    server.setRoutes((app) => {
      app.use("/api/users", userRoutes);
      app.use("/api/products", productRoutes);
    });
    server.start();
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
