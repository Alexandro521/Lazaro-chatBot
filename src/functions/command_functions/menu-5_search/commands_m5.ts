import axios from "axios";
import { client } from "../../../index";
import { MessageMedia, Message, GroupChat } from "whatsapp-web.js";

export class CommandsSearch {
  static async LyricSearch(message: Message) {
    const text = message.body.match(/!lyricSearch(.+)/);
    console.log(text);

    if (!(text[1].length > 1)) {
      await message.reply("🤖 Debes Especificar un texto a buscar");
      return;
    }
    const request = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/genius?q=${text[1].trim()}`
    );
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
    await message.reply(
      media,
      `resultados de ${text[1].trim()}\n` +
        `📎${dataArray.length} Resultados \n \n` +
        sendText
    );
  }
  static async GetLyric(message: Message) {
    const text = message.body.match(/!getLyric(.+)/);

    if (!(text[1].length > 1)) {
      await message.reply("!especifica un texto a buscar");
      return;
    }
    const data = await axios.get(
      "https://delirius-api-oficial.vercel.app/api/lyrics?url=" + text[1]
    );
    message.reply("Aqui esta la letra de tu cancion  \n \n" + data.data.lyrics);
  }
  static async GlySearch(message: Message) {
    const text = message.body.match(/!GLYSearch(.+)/);
    if (!(text[1].length > 1)) {
      await message.reply("!especifica un texto a buscar");
      return;
    }
    const data = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/letra?query=${text[1].trim()}`
    );
    const obj = data.data;
    const media = await MessageMedia.fromUrl(obj.data.image);
    await message.reply(
      media,
      `*🎶${data.data.data.fullTitle}*\n\n` +
        `- 🎙 Artista: ${obj.data.artist} \n` +
        `- ✒ liryc: {${obj.data.lyrics}} \n\n\n`
    );
  }
  static async Pokemon(message: Message) {
    const text = message.body.match(/!Pokemon(.+)/);
    if (!(text[1].length > 1)) {
      await message.reply("!especifica un texto a buscar");
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
    await message.reply(media);
  }
  static async Pinterest(message: Message) {
    const text = message.body.match(/!pinterest(.+)/);

    if (!(text[1].length > 1)) {
      await message.reply("!especifica un texto a buscar");
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
    await message.reply(media, arr[randomNumber].title);
  }
  static async ImgByBing(message: Message) {
    const text = message.body.match(/!img_Bing(.+)/);
    if (!(text[1].length > 1)) {
      await message.reply("!especifica un texto a buscar");
    }

    const data = await axios.get(
      `https://delirius-api-oficial.vercel.app/api/bingimage?query=${text[1].trim()}`
    );
    const arr = data.data.results;
    const randomNumber = Math.floor(Math.random() * arr.length - 1);
    const media = await MessageMedia.fromUrl(arr[randomNumber].thumbnail, {
      unsafeMime: true,
    });
    await message.reply(media, arr[randomNumber].description);
  }
  static async ImgByGoogle(message: Message) {
    const text = message.body.match(/!img(.+)/);
    if (text[1].length > 1) {
      await message.reply("especifica un texto a buscar");
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
    await message.reply(media);
  }
  static async TikTokSearch(message: Message) {
    const text = message.body.match(/!tik_tok(.+)/);
    if (!(text[1].length > 1)) {
      await message.reply("!especifica un texto a buscar");
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
    await message.reply("resultados de tu busqueda  \n \n" + textResult);
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
