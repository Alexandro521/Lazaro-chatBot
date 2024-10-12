import axios from "axios";
import {Message} from "whatsapp-web.js";

export class CommandsAI {
    //nombre provisional
    private static async CommandsStruct(
        message: Message, 
        regex: RegExp, 
        ApiRequesUrl: string,
        option:{
        anyTextSearhResponse: string,
        requestFailResponse: string,
    } = {
        anyTextSearhResponse: "especifica un texto a buscar'",
        requestFailResponse: "Ups a ocurrido un error :/\n\n"
    }
) {
            try {
                const text = message.body.match(regex)
                if (!(text[1].length > 1)) {
                    await message.reply(option.anyTextSearhResponse);
                    return
                }
                const data = await axios.get(ApiRequesUrl+(text[1].trim()))
                   await message.reply(data.data.message)            
            }catch(error){
                console.log(error)
                await message.reply(option.requestFailResponse + error )
            }
    }
    static async ChatGPT(message: Message) {
        await this.CommandsStruct(message, /!chatgpt(.+)/, `https://delirius-api-oficial.vercel.app/api/chatgpt?q=`)
    }
    static async Bingchat(message:Message){
        await this.CommandsStruct(message, /!BingChat(.+)/, `https://delirius-api-oficial.vercel.app/api/bingia?query=`)
    }
    static async Gpt4(message:Message){
        await this.CommandsStruct(message, /!gpt-4(.+)/, `https://delirius-api-oficial.vercel.app/api/ia2?text=quien%20eres%20y%20quien%20es%20tu%20creador?&prompt=`)
    }
    static async Gemini(message:Message){
        await this.CommandsStruct(message, /!Gemini(.+)/, `https://delirius-api-oficial.vercel.app/api/gemini?query=`)
    }
    static async Simi(message:Message){
        await this.CommandsStruct(message, /!simi(.+)/, `https://delirius-api-oficial.vercel.app/api/simi?text=`)
    }
}
/*
| <--comandos de Intenligencia Artificial-->

- 🤖 *!chatgpt* conversa con chat gpt v3.5

- 🤖 *!BingChat* conversa con Bing chat 

- 🤖 *!gpt-4* conversa con chat gpt v4

- 🤖 *!Gemini* conversa con Gemini chat

- 🤖 *!simi* envia un mensaje y obten una respuesta random

*/