import { Message, MessageMedia } from "whatsapp-web.js";
import { messageInfo } from "../utils/menssageLog";
import { commandExec } from "../Auth/ParseCommand";
import { GameSession } from "../data/temp/temp";
import { localCommand } from "./commands/localCommands";
import { main, menu1, menu2, menu3, menu5, menu6, menu7 } from "../schemas/menus";
export async function onMessageCreate(message: Message) {
  try {
    const chat = await message.getChat();
    const PathImg = process.cwd() + "/static/img/bot.webp";
    const chatId = chat.id._serialized
    messageInfo(message, chat);

    if (message.hasQuotedMsg) {
      const quote = await message.getQuotedMessage();
      if (quote.fromMe && quote.body.startsWith("akinator")) {
        if (GameSession[message.author]) {
          GameSession[message.author].games(message.body.trimStart().trimEnd())
          return
        }
      }

    }

    if (message.body === "!main") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: main,
      });
    } else if (message.body === "!menu1") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: menu1,
      });
    } else if (message.body === "!menu2") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: menu2,
      });
    } else if (message.body === "!menu3") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: menu3,
      });
    } else if (message.body === "!menu4") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: menu5,
      });
    } else if (message.body === "!menu5") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: menu5,
      });
    }else if (message.body === "!menu6") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: menu6,
      });
    }
    else if (message.body === "!menu7") {
      const media = await MessageMedia.fromFilePath(PathImg);
      await message.reply(media,chatId, {
        caption: menu7,
      });
    } else if (message.body === '!regist') {
      await localCommand(message, chat)
    }
    else if (message.body.startsWith("!"))
      await commandExec(message.body, message);
  } catch (err) {
    console.log(err);
    const error = JSON.stringify(err);
    await message.reply(error, message.from);
  }
}
