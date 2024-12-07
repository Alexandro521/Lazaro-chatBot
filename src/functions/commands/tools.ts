/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Message} from "whatsapp-web.js";
import {  archivement } from "../../services/level_System/Archivement_system/Archivement";

export default class Tools {
  static async stickerCreate(message: Message) {
    try {
      const chat = await message.getChat();
      const stkProps = {
        sendMediaAsSticker: true,
        stickerAuthor: "chrollo bot",
        stickerName: "chrollo bot name",
        stickerCategories: ["chrollo bot category"],
      };
      if (message.hasQuotedMsg) {
        const quote = await message.getQuotedMessage();
        // console.log(quote)
        if (!quote.hasMedia) throw new Error("no tienes mensaje con imagen");
        const media = await quote.downloadMedia();
        await chat.sendMessage(media, stkProps);
        return;
      }
      if (!message.hasMedia) throw new Error("no tienes mensaje con imagen");
      const media = await message.downloadMedia();
      await chat.sendMessage(media, stkProps);
    } catch (e) {
      message.reply(e.message);
    }
    }
  static async test(message: Message) {
    try {
      const chat = await message.getChat();
      const Archivement = new archivement(message.author,chat.id._serialized,'50 niveles','50 niveles',50,50,()=>true,'')
      await Archivement.sync()
      await message.reply("test ejecutadp")
     } catch (error) {
      await message.reply(error.message)
      console.log(error)
    }
  }
}