import { sequelize } from "./config/db";
import app from "./server"
import { sendEmail } from "./Utils/Emails";

const port = process.env.PORT || 4000;
process.env.TZ = 'America/Mazatlan';


(async () => {
  try {
    //await sequelize.sync(); // cuando quiera generar las tablas
    await sequelize.authenticate()
    console.log("Conexión establecida con SQL Server");
    console.log(new Date().toLocaleString('en-US', {
      //timeZone: 'America/Mazatlan' tepic
      timeZone: 'America/Ciudad_Juarez'
    }));
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);

      /*
    */});
  } catch (error) {
    console.error("Error al conectar:", error);
  }
})();
