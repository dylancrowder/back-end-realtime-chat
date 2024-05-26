import Message from "../schema/message.schema.js";

export default class MessagesService {
  static async createMessage(body, sender, receiver) {
    return await Message.create({
      body,
      sender,
      receiver,
    });
  }

  static async findMessages() {
    const messages = await Message.find();
    return messages;
  }

  static async getUserMessages(sender, receiver) {
    try {
      console.log("este es el sender", sender, "este es el receiver", receiver);

      // Encuentra los mensajes entre el remitente y el destinatario
      const messages = await Message.find({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      }).sort({ createdAt: 1 });

      return messages;
    } catch (error) {
      console.error("Error al obtener los mensajes del usuario:", error);
      throw error;
    }
  }
}
