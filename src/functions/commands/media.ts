import { Message, MessageMedia } from "whatsapp-web.js";
import { $ } from "bun";
import { tiktokLinksTemp, youtubeLinskTemp } from "../../data/temp/temp";

/* eslint-disable @typescript-eslint/no-extraneous-class */


async function verification(message: Message,type:string) {
    const regex = type === 'yts' ? /\[t:yts\s+(.+)\]/ : /\[t:ttk\s+(.+)\]/
    const regexTest = type === 'yts' ? /\[t:yts\s+.+\]/ : /\[t:ttk\s+.+\]/
  if (!message.hasQuotedMsg)throw new Error("debes citar un mensaje de tipo !"+type);
  const quote = await message.getQuotedMessage();
  const typeTest = regexTest.test(quote.body);
    
  if (!typeTest) throw new Error("tipo de mensaje de entrada no comaptible");
  const id = quote.body.match(regex)[1];
    
  if (!id) throw new Error("error en el id");
  const numberMatch = message.body.match(/#(\d+)/);
    
  if (!numberMatch) throw new Error("no tienes index");
  const getIndex = Number.parseInt(numberMatch[1]);
    
    const ArrayObj = type === 'yts' ? youtubeLinskTemp[id] : tiktokLinksTemp[id];
    
    if (!ArrayObj[getIndex]) throw new Error("El indice solicitado no existe");
    const { title, url} = ArrayObj[getIndex];
    return { id,title,url,ArrayObj}
    
}
function parseTitle(title:string){
    return title
        .trim()
        .replaceAll(" ", "x")
        .replaceAll("#", "x")
        .replaceAll("|", "x")
        .replaceAll("*", "x")
        .replaceAll("?", "x")
        .replaceAll("/", "x")
        .replaceAll("\\", "x")
        .replaceAll(":", "x")
        .replaceAll('"', "x")
        .replaceAll("<", "x")
        .replaceAll(">", "x")
}

export default class Media {
  static async mp3(message: Message) {
    try {
      const chatid = (await message.getChat()).id._serialized;
      const {title,url} = await verification(message,'yts')

      await message.react("📥");
      await message.reply(`Descargando y enviando mp3 de *${title}*...`);
      const Title = parseTitle(title)
      const ouput =
        await $`${process.cwd()}/bin/ytdlp/yt-dlp.exe -o "${Title}.%(ext)s" -f 139 -x --audio-format mp3 -P ${process.cwd()}/static/audio ${url}`.text();
        console.log(ouput);
        
      // message.reply(JSON.stringify(files, null, "\t"))
      const media = await MessageMedia.fromFilePath(
        `${process.cwd()}/static/audio/${Title}.mp3`
      );
      media.filename = Title;
        await message.reply(media, chatid);
        
    } catch (e) {
      message.reply(e.message);
      console.log(e);
    }
  }
  static async mp4(message: Message) {
    try {

         const chatid = (await message.getChat()).id._serialized;
         const { title, url } = await verification(message,'yts');

      await message.react("📥");
      await message.reply(
        `Descargando y enviando mp4 de *${title}*...(esto puede tardar un rato)`
      );
      const Title = parseTitle(title)
      const ouput =
        await $`${process.cwd()}/bin/ytdlp/yt-dlp.exe -S "res:720" -o "${Title}.%(ext)s" -P ${process.cwd()}/static/video ${url}`.text();
        console.log(ouput);
        
      // message.reply(JSON.stringify(files, null, "\t"))
      const media = await MessageMedia.fromFilePath(
        `${process.cwd()}/static/video/${Title}.mp4`
      );
      media.filename = Title;
      await message.reply(media, chatid, {
        sendMediaAsDocument: true,
      });
    } catch (e) {
      message.reply(e.message);
      console.log(e);
    }
  }
  static async ttkget(message: Message) {
    try {
      //get ttk video
  
    const chatid = (await message.getChat()).id._serialized;
    const { title, url } = await verification(message, "ttk");

  
      await message.reply(`Decargando y enviando *${title}*...`);
      const media = await MessageMedia.fromUrl(url, { unsafeMime: true });
      await message.reply(media, chatid, {
        sendMediaAsDocument: true,
      });
    } catch (e) {
      message.reply(e.message);
      console.log(e);
    }
  }
}
