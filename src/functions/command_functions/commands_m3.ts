import axios from "axios";
import {Message} from "whatsapp-web.js";

export class CommandsAI {
    //nombre provisional
    private static async CommandsStruct(
        Message: Message, 
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
                const text = Message.body.match(regex)
                if (!(text[1].length > 1)) {
                    await Message.reply(option.anyTextSearhResponse);
                    return
                }
                const data = await axios.get(ApiRequesUrl+(text[1].trim()))
                   await Message.reply(data.data.Message)            
            }catch(error){
                console.log(error)
                await Message.reply(option.requestFailResponse + error )
            }
    }
    static async ChatGPT({Message}:{Message: Message}) {
        await this.CommandsStruct(Message, /!chatgpt(.+)/, `https://delirius-api-oficial.vercel.app/api/chatgpt?q=`)
    }
    static async Bingchat({Message}:{Message: Message}){
        await this.CommandsStruct(Message, /!BingChat(.+)/, `https://delirius-api-oficial.vercel.app/api/bingia?query=`)
    }
    static async Gpt4({Message}:{Message: Message}){
        await this.CommandsStruct(Message, /!gpt-4(.+)/, `https://delirius-api-oficial.vercel.app/api/ia2?text=quien%20eres%20y%20quien%20es%20tu%20creador?&prompt=`)
    }
    static async Gemini({Message}:{Message: Message}){
        await this.CommandsStruct(Message, /!Gemini(.+)/, `https://delirius-api-oficial.vercel.app/api/gemini?query=`)
    }
    static async Simi({Message}:{Message: Message}){
        await this.CommandsStruct(Message, /!simi(.+)/, `https://delirius-api-oficial.vercel.app/api/simi?text=`)
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