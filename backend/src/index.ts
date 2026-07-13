import { sequelize } from "./config/db";
import app from "./server"

const port = process.env.PORT || 4000;



(async () => {
  try {
    await sequelize.sync(); // cuando quiera generar las tablas
    //await sequelize.authenticate()
    //console.log("Conexión establecida con SQL Server");
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al conectar:", error);
  }
})();
