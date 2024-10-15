import { Message , GroupChat} from "whatsapp-web.js";
import { client } from "../bot";

export class MenuConfig{
   static async botOn({ text, Message }: { text: string; Message: Message }) {
    const chat = await Message.getChat();
    console.log(chat.id)
    console.log(Message.from)
    await client.sendMessage(Message.from, text);
    return;
  }
}
