import axios from "axios";
import { MessageMedia, Message} from "whatsapp-web.js";

export class CommandsNsfw {
 private static async CommandsStruct(
    Message: Message, 
    ApiRequesUrl: string,
    option:{
        requestFailResponse: string,
    } = {
        requestFailResponse: "Ups a ocurrido un error :/\n\n"
    }
) {
            try {
                const media = await MessageMedia.fromUrl(ApiRequesUrl, { unsafeMime: true })
                await Message.reply(media)
            }catch(error){
                console.log(error)
                await Message.reply(option.requestFailResponse + error )
            }
}
static async Asian({Message}:{Message: Message}) {
    await this.CommandsStruct(Message, `https://delirius-api-oficial.vercel.app/api/china`)
 }
 static async Japan({Message}:{Message: Message}) {
    await this.CommandsStruct(Message, `https://delirius-api-oficial.vercel.app/api/japan`)
 }
 static async Boobs({Message}:{Message: Message}) {
    await this.CommandsStruct(Message, `https://delirius-api-oficial.vercel.app/api/boobs`)
 }
 static async Pack({Message}:{Message: Message}) {
    await this.CommandsStruct(Message, `https://delirius-api-oficial.vercel.app/api/girls`)
 }
 static async Rule34({Message}:{Message: Message}) {
    try {
        const text = Message.body.match(/!Rule34(.+)/);
        if (!(text[1].length > 1)) {
            Message.reply("!especifica un texto a buscar");
            return;
        }
            const res = await axios.get(`https://delirius-api-oficial.vercel.app/api/rule34?query=${text[1].trim()}`)
            if (!(res.status === 200)) {
                throw new Error('Ups a ocurrido un error :/\n\n')
            }
             const arr = res.data.images
             const randomNumber = Math.floor(Math.random() * arr.length)

            const media = await MessageMedia.fromUrl(arr[randomNumber], { unsafeMime: true })
            Message.reply(media)
            
    } catch (error) {
        console.log(error)
        await Message.reply("Ups a ocurrido un error :/\n\n" + error)
    }
 }

}