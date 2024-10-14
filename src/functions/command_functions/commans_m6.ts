import axios from "axios";
import { MessageMedia, Message} from "whatsapp-web.js";
import { ApiUrl } from "../../data/DelirusApisUrls";
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
    await this.CommandsStruct(Message, ApiUrl.Nsfw.CoreanImg)
 }
 static async Japan({Message}:{Message: Message}) {
    await this.CommandsStruct(Message, ApiUrl.Nsfw.GirlsPack)
 }
 static async Boobs({Message}:{Message: Message}) {
    await this.CommandsStruct(Message, ApiUrl.Nsfw.Boobs)
 }
 static async Pack({Message}:{Message: Message}) {
    await this.CommandsStruct(Message, ApiUrl.Nsfw.GirlsPack)
 }
 static async Rule34({Message}:{Message: Message}) {
    try {
        const text = Message.body.match(/!Rule34(.+)/);
        if (!(text[1].length > 1)) {
            Message.reply("!especifica un texto a buscar");
            return;
        }
            const res = await axios.get(ApiUrl.Nsfw.Rule34+text[1].trim())
            if (!(res.status !== 200)) {
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