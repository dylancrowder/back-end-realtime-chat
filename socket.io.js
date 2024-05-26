import express from "express";
import { createServer } from "http";
import { Server as SocketIo } from "socket.io";
import cors from "cors";
import { initMongo } from "./db/db.connect.js";
import Message from "./schema/message.schema.js";
import dotenv from "dotenv";
dotenv.config();
initMongo();

const PORT = process.env.PORT_SOCKET;

const app = express();
app.use(express.static("public"));
app.use(cors({ origin: true, credentials: true }));

const httpServer = createServer(app);
const io = new SocketIo(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("message", async (data) => {
    const { sender, receiver, body } = data;
    if (!receiver) {
      return;
    }

    const message = new Message({ sender, receiver, body });
    await message.save();

    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
});
