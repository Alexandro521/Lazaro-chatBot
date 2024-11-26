import { menusIndex } from "../../schemas/menus";
import { Chat, Message, MessageMedia } from "whatsapp-web.js";
import CommandsdataBase from "../../DB/PostgreSQL/CommandConfig";
export async function localCommand(message: Message, chat: Chat) { 
    const chatId = chat.id._serialized
    const PathImg = process.cwd() + "/static/img/bot.webp";
    if (menusIndex[message.body]) {
        const media = await MessageMedia.fromFilePath(PathImg);
        await message.reply(media, chatId, {
            caption: menusIndex[message.body],
        });
        return
    } else if (message.body === '!regist' && message.fromMe) {
        const chat = await message.getChat();
        const chatid = chat.id._serialized
         await CommandsdataBase.register_chat([{ id: chatid, is_group: chat.isGroup, chat_name: chat.name }])
        
        
          await message.reply('Registro exitoso', chatId)
        
    }
  }