import { Message, MessageMedia } from "whatsapp-web.js";
import { messageInfo } from "../utils/menssageLog";
import { commandExec } from "../Auth/ParseCommand";
import { main, menu1, menu2, menu3, menu5, menu6 } from "../schemas/menus";
export async function onMessageCreate(message: Message) {
  try {
    const chat = await message.getChat();
    messageInfo(message, chat);
    if (message.body === "!main") {
      const media = await MessageMedia.fromFilePath(
        process.cwd() + "/static/img/bot.webp"
      );
      await message.reply(media, chat.id._serialized, {
        caption: main,
      });
    } else if (message.body === "!menu1") {
      const media = await MessageMedia.fromFilePath(
        process.cwd() + "/static/img/bot.webp"
      );
      await message.reply(media, chat.id._serialized, {
        caption: menu1,
      });
    } else if (message.body === "!menu2") {
      const media = await MessageMedia.fromFilePath(
        process.cwd() + "/static/img/bot.webp"
      );
      await message.reply(media, chat.id._serialized, {
        caption: menu2,
      });
    } else if (message.body === "!menu3") {
      const media = await MessageMedia.fromFilePath(
        process.cwd() + "/static/img/bot.webp"
      );
      await message.reply(media, chat.id._serialized, {
        caption: menu3,
      });
    } else if (message.body === "!menu4") {
      const media = await MessageMedia.fromFilePath(
        process.cwd() + "/static/img/bot.webp"
      );
      await message.reply(media, chat.id._serialized, {
        caption: menu5,
      });
    } else if (message.body === "!menu5") {
      const media = await MessageMedia.fromFilePath(
        process.cwd() + "/static/img/bot.webp"
      );
      await message.reply(media, chat.id._serialized, {
        caption: menu6,
      });
    } else if (message.body.startsWith("!"))
      await commandExec(message.body, message);
  } catch (err) {
    console.log(err);
    const error = JSON.stringify(err);
    await message.reply(error, message.from);
  }
}
