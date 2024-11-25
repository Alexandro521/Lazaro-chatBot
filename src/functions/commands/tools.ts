/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Message} from "whatsapp-web.js";

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
      await message.reply("No hay funciones experimentales para el momento")
     } catch (error) {
      await message.reply(error.message)
      console.log(error)
    }
  }


}