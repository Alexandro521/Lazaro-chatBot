/* eslint-disable @typescript-eslint/no-extraneous-class */

import { Message, MessageMedia } from "whatsapp-web.js"
import { ApiUrl } from "../../data/Objects/DelirusApisUrls"
import { GoogleImagesResponse, pinterest, Pinterestv1, tiltokSearch, wallpaper, yts } from "../../interfaces/deliriussApiHttpResponses"
import axios from "axios"
import { config } from "../../config/Axios.config"
import { youtubeResultsSchema,titokSearchTextSchema} from "../../schemas/search"
import { guidGenerator } from "../../utils/guidGenerator"
import { tiktokLinksTemp, youtubeLinskTemp } from "../../data/temp/temp"


async function verification(message: Message, ApiUrl: string) {
    const chatid = (await message.getChat()).id._serialized;
    const query = message.body.match(/!\w+\s+(.+)/)
    if (!query) throw new Error("debes ingresar el texto a buscar");
    return {url: ApiUrl + query[1],chatid,query:query[1]}
}
const random = (n) => Math.floor(Math.random() * n);


export default class Search { 
    
static async pinterestv2(message: Message) {
    try {
      const {url,chatid} = await verification(message,ApiUrl.Search.pinterestv2)
      const request = await axios.get(url, config)
      const data: pinterest["data"] = request.data.data
      const Index = random(data.length)
      const img = data[Index].image
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true })
      await message.reply(image, chatid)
    } catch (error) {
      console.log(error)
      message.reply(error.message)
    }
  }
  static async pinterestv1(message: Message) {
    try {
      const {url,chatid} = await verification(message,ApiUrl.Search.pinterest)
      const request = await axios.get(url, config)
      const data: Pinterestv1["result"] = request.data.result
      const Index = random(data.length)
      const img = data[Index]
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true })
      await message.reply(image, chatid)
    } catch (e) {
      console.log(e)
      message.reply(e.message)
    }
  }
  static async googleImages(message: Message) {
    try {
      const { url, chatid } = await verification(
        message,
        ApiUrl.Search.pinterest
      );
      const request = await axios.get(url, config);
      const data: GoogleImagesResponse["data"] = request.data.result;
      const Index = random(data.length);
      const img = data[Index].url;
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true });
      await message.reply(image, chatid);
    } catch (e) {
      console.log(e)
      message.reply(e.message)
    }
    }
  static async yts(message: Message) {
    try {
      const {url,chatid,query} = await verification(message,ApiUrl.Search.YoutubeSearch)
      const request = await axios.get(url, config)
      if (request.status !== 200) throw new Error("Error http")
      const data: yts["data"] = request.data.data
      let text = ''
      const ListObj = []
      const schema = youtubeResultsSchema()
        
        for (let i = 0; i < data.length; i++) {
            const {
                title,
                duration,
                url,
                author,
            } = data[i];
        
        text += schema.body(i, title, duration, url, author.name)
        ListObj.push({
          title,
          duration,
          url,
          canal: author.name,
        })
        }
      const uuid = guidGenerator()
      youtubeLinskTemp[uuid] = ListObj
      const header = schema.head(uuid, query)
      const image = await MessageMedia.fromUrl(data[0].image, { unsafeMime: true })
      await message.reply(image, chatid, {
        caption: header + text
      })
    } catch (e) {
      message.reply(e.message)
    }
  }
  static async walppaper(message: Message) {
    try {
      const {url,chatid} = await verification(message,ApiUrl.Search.wallpaper)
      const request = await axios.get(url, config)
      const data: wallpaper["data"] = request.data.data
      const Index = random(data.length);
      const img = data[Index].image
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true })
      await message.reply(image, chatid)
    } catch (e) {
      message.reply(e.message)
      console.log(e)
    }
  }
  static async ttks(message: Message) {
    try {
      const {url,chatid,query} = await verification(message,ApiUrl.Search.tiktokSearch)
      const request = await axios.get(url, config)
      const data: tiltokSearch = request.data
      let text = ''
      const id = guidGenerator()
        const linksObj = []
        const schema = titokSearchTextSchema()
        for (let i = 0; i < data.meta.length; i++) {
            const {
                title,
                duration,
                like,
                author,
                hd,
            } = data.meta[i];
          
        const row = schema.body(i, title.slice(0, 30), duration, like, author.username)
        text += row
        linksObj.push({ url: hd, title:title.slice(0, 30) })
        }
      const header = schema.head(id, query)
      tiktokLinksTemp[id] = linksObj
      console.log(tiktokLinksTemp)
      await message.reply(header+text, chatid)
    } catch (e) {
      message.reply(e.message)
      console.log(e)
    }
  }
}