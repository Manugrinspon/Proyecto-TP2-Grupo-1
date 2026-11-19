import express from "express";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import { PORT } from "./config/config.js";
import buildContainer from "./container/container.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.js";

async function startServer() {
  const app = express();
  
  app.use(logger);
  app.use(express.json());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument ));
  
  try {
    const router = await buildContainer();
    app.use(router);
  } catch (err) {
    console.error("Error al inicializar el contenedor de dependencias:", err);
    process.exit(1);
  }

  app.use(notFound);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
    console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
  });
}

startServer();