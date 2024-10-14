import axios from "axios";
import { client } from "../../index";
import { MessageMedia, Message, GroupChat } from "whatsapp-web.js";
import { error } from "console";
import { ApiUrl } from "../../data/DelirusApisUrls";
export class CommandsSearch {
  static async LyricSearch({Message}:{Message: Message}) {
    try {
      const msg =Message.body 
      const regex = /(!lyricSearch)(.+)\w+/g;
    const text = msg.match(regex);
    console.log(text,msg);

    if (!(text[2].length > 1 || !text[2])) {
      await Message.reply("🤖 Debes Especificar un texto a buscar");
      return;
    }
    const request = await axios.get(ApiUrl.Search.genius+(text[1].trim()));

    const dataArray = request.data;
    let sendText = "";
    let i = 0;
    dataArray.forEach((element, index) => {
      sendText +=
        `*[${(i += 1)}]🎶${element.fullTitle}*\n` +
        `   - 🎙 Artista: ${element.artist.name}} \n` +
        `   - ✒ liryc: {${element.url}} \n \n`;
    });
    const media = await MessageMedia.fromUrl(dataArray[0].image, {
      unsafeMime: true,
    });
    await Message.reply(
      media,
      `resultados de ${text[1].trim()}\n` +
        `📎${dataArray.length} Resultados \n \n` +
        sendText
    );
    } catch (error) { console.log(error)}
    await Message.reply("Ups a ocurrido un error :\n\n" + error)
  }
  static async GetLyric({Message}:{Message: Message}) {    
    const text = Message.body.match(/!getLyric(.+)/);

    if (!(text[1].length > 1)) {
      await Message.reply("!especifica un texto a buscar");
      return;
    }
    const data = await axios.get(
      "https://delirius-api-oficial.vercel.app/api/lyrics?url=" + text[1]
    );
    Message.reply("Aqui esta la letra de tu cancion  \n \n" + data.data.lyrics);
  }
  static async GlySearch({Message}:{Message: Message}) {
    const text = Message.body.match(/!GLYSearch(.+)/);
    if (!(text[1].length > 1)) {
      await Message.reply("!especifica un texto a buscar");
      return;
    }
    const data = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/letra?query=${text[1].trim()}`
    );
    const obj = data.data;
    const media = await MessageMedia.fromUrl(obj.data.image);
    await Message.reply(
      media,
      `*🎶${data.data.data.fullTitle}*\n\n` +
        `- 🎙 Artista: ${obj.data.artist} \n` +
        `- ✒ liryc: {${obj.data.lyrics}} \n\n\n`
    );
  }
  static async Pokemon({Message}:{Message: Message}) {
    const text = Message.body.match(/!Pokemon(.+)/);
    if (!(text[1].length > 1)) {
      await Message.reply("!especifica un texto a buscar");
      return;
    }
    const media = await MessageMedia.fromUrl(
      `https://delirius-api-oficial.vercel.app/api/pokecard?text=${text[1]
        .trimStart()
        .trimEnd()}`,
      {
        unsafeMime: true,
      }
    );
    await Message.reply(media);
  }
  static async Pinterest({Message}:{Message: Message}) {
    const text = Message.body.match(/!pinterest(.+)/);

    if (!(text[1].length > 1)) {
      await Message.reply("!especifica un texto a buscar");
    }
    console.log(text[1]);
    const data = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/pinterest?text=${text[1].trim()}`
    );
    const arr = data.data.result;
    console.log(arr);
    console.log(data.status);
    const randomNumber = Math.floor(Math.random() * (arr.length - 1));
    const media = await MessageMedia.fromUrl(arr[randomNumber].media.url, {
      unsafeMime: true,
    });
    await Message.reply(media, arr[randomNumber].title);
  }
  static async ImgByBing({Message}:{Message: Message}) {
    const text = Message.body.match(/!img_Bing(.+)/);
    if (!(text[1].length > 1)) {
      await Message.reply("!especifica un texto a buscar");
    }

    const data = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/bingimage?query=${text[1].trim()}`
    );
    const arr = data.data.results;
    const randomNumber = Math.floor(Math.random() * arr.length - 1);
    const media = await MessageMedia.fromUrl(arr[randomNumber].thumbnail, {
      unsafeMime: true,
    });
    await Message.reply(media, arr[randomNumber].description);
  }
  static async ImgByGoogle({Message}:{Message: Message}) {
    const text = Message.body.match(/!img(.+)/);
    if (text[1].length > 1) {
      await Message.reply("especifica un texto a buscar");
      return;
    }
    const data = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/gimage?query=${text[1].trim()}`
    );
    const arr = data.data.data;
    console.log(arr);
    const randomNumber = Math.floor(Math.random() * arr.length - 1);
    const media = await MessageMedia.fromUrl(arr[randomNumber].url, {
      unsafeMime: true,
    });
    await Message.reply(media);
  }
  static async TikTokSearch({Message}:{Message: Message}) {
    const text = Message.body.match(/!tik_tok(.+)/);
    if (!(text[1].length > 1)) {
      await Message.reply("!especifica un texto a buscar");
    }
    const data = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/tiktoksearch?query=${text[1].trim}`
    );
    const arrResult = data.data;
    let textResult = "";
    arrResult.meta.forEach((element) => {
      textResult +=
        "titulo: " + element.title + " \n link: " + element.hd + " \n \n";
    });
    await Message.reply("resultados de tu busqueda  \n \n" + textResult);
  }
}

/*
| <--comandos de busqueda-->

- ✒ *!lyricSearch* buscador de letras de canciones

- ✒ *!getLyric* <link> obtiene la letra de una cancion mediante el enlace proporcionados por !lyricSearch

- ✒ *!GLYSearch* obten la letra de una cancion directamente solo por su nombre

- 🎱 *!pokemon* busca pokemones y obten su carta

- 📷 *!pinterest* busca imagenes en pinterest

- 📷 *!img_Bing* busca imagenes con Bing

- 📸 *!img:* ¿Necesitas una imagen para alegrar tu día?

- 🎭 *!tik_tok* haz busquedas en tik tok (comando en desarrollo♻)

*/
