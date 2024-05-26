import { Router } from "express";
import MessagesService from "../services/messages.service.js";

const route = Router();
route.post("/sendMessage", async (req, res) => {
  try {
    const { bodyMessage, receiver } = req.body;
    const sender = req.user.id;

    if (!bodyMessage || receiver === null || !sender) {
      return res
        .status(400)
        .json({ error: "Se debe enviar bodyMessage, receiver y sender" });
    }

    const newMessage = await MessagesService.createMessage(
      bodyMessage,
      sender,
      receiver
    );

    return res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});

route.get("/getAllMessages", async (req, res) => {
  const messages = await MessagesService.findMessages();
  if (!messages) {
    return res.status(500).json({ error: "no se encontraron mensajs " });
  }
  return res.status(200).json(messages);
});

route.get("/getChatRoom", async (req, res) => {
  const { receiver } = req.query;

  const sender = req.user.id;
  if (!sender || receiver === null) {
    return res
      .status(400)
      .json({ error: "Se debe enviar el usuario sender y receiver" });
  }

  try {
    const messages = await MessagesService.getUserMessages(sender, receiver);

    const lobby = {
      userSelected: receiver,
      actualUser: sender,
      messages: messages,
    };

    return res.status(200).json(lobby);
  } catch (error) {
    console.error("Error al obtener el lobby:", error);
    return res.status(500).json({ error: "Error al obtener el lobby" });
  }
});

export default route;
