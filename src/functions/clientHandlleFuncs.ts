import { Message } from "whatsapp-web.js";
import { messageInfo } from "../utils/menssageLog";
import { commandExec } from "../CommandsAuth/ParseCommand";

export async function onMessageCreate(message: Message) {
  try {
    const chat = await message.getChat();
    messageInfo(message, chat);
    if (message.body.startsWith("!")) await commandExec(message.body, message);
    
  } catch (err) {
    console.log(err);
    let error = JSON.stringify(err);
    await message.reply(error, message.from);
  }
}
