import http from "http";
import app from "./app.js";
import { initMongo } from "./db/db.connect.js";
import dotenv from "dotenv";
dotenv.config();
const server = http.createServer(app);
const port = process.env.PORT_SERVER;

await initMongo(server);

const PORT = port;
server.listen(PORT, () => {
  console.log("conectado correctamente al servidor ${8080}");
});
