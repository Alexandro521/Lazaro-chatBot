import axios from "axios";
import { client } from "../../../index";
import { MessageMedia, Message, GroupChat } from "whatsapp-web.js";

export class CommandsNsfw {
 private static async CommandsStruct(
    message: Message, 
    ApiRequesUrl: string,
    option:{
        requestFailResponse: string,
    } = {
        requestFailResponse: "Ups a ocurrido un error :/\n\n"
    }
) {
            try {
                const media = await MessageMedia.fromUrl(ApiRequesUrl, { unsafeMime: true })
                await message.reply(media)
            }catch(error){
                console.log(error)
                await message.reply(option.requestFailResponse + error )
            }
}
static async Asian(message: Message) {
    await this.CommandsStruct(message, `https://delirius-api-oficial.vercel.app/api/china`)
 }
 static async Japan(message: Message) {
    await this.CommandsStruct(message, `https://delirius-api-oficial.vercel.app/api/japan`)
 }
 static async Boobs(message: Message) {
    await this.CommandsStruct(message, `https://delirius-api-oficial.vercel.app/api/boobs`)
 }
 static async Pack(message: Message) {
    await this.CommandsStruct(message, `https://delirius-api-oficial.vercel.app/api/girls`)
 }
 static async Rule34(message: Message) {
    try {
        const text = message.body.match(/!Rule34(.+)/);
        if (!(text[1].length > 1)) {
            message.reply("!especifica un texto a buscar");
            return;
        }
            const res = await axios.get(`https://delirius-api-oficial.vercel.app/api/rule34?query=${text[1].trim()}`)
            if (!(res.status === 200)) {
                throw new Error('Ups a ocurrido un error :/\n\n')
            }
             const arr = res.data.images
             const randomNumber = Math.floor(Math.random() * arr.length)

            const media = await MessageMedia.fromUrl(arr[randomNumber], { unsafeMime: true })
            message.reply(media)
            
    } catch (error) {
        console.log(error)
        await message.reply("Ups a ocurrido un error :/\n\n" + error)
    }
 }

}