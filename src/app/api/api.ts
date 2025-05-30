import { server } from "../../infrastructure/server/Server";
import { databaseService } from "../../database";
import userRoutes from "./user/routes/userRoutes";

const startServer = async () => {
  try {
    await databaseService.connectAll(); // Conectar todas las bases de datos
    server.setRoutes((app) => {
      app.use("/api/users", userRoutes);
    });
    server.start(); // Iniciar el servidor
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();
