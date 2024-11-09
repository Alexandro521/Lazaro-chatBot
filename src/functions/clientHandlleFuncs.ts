import { Chat, Message,GroupChat} from "whatsapp-web.js";
// import { blacklist } from "./blacklist"
// import { client } from "../index"
import chalk from 'chalk';
import { client } from "..";
import { blacklist } from "../data/blacklist";
import { commandList } from "../config/comandConfig";
import { commandExec } from "../functions/auth/commandAuth";

let state = false
    async  function messageInfo(message: Message,chat: Chat) {
    console.log(chalk.greenBright('...........................| Mensaje recibido |...............................'))
    console.log(chalk.redBright('proveniente de:'),chalk.yellowBright(message.from))
    console.log(chalk.redBright('Autor:'), chalk.blue(message.author))
    console.log(chalk.redBright('mensaje:'),chalk.greenBright(message.body))
    console.log(chalk.redBright('message ID:'),chalk.yellowBright(message.id._serialized))
    console.log(chalk.redBright('chat ID:'),chalk.yellowBright(chat.id._serialized))
    console.log(chalk.greenBright('.............................................................................'))
  }
export class ClientHandlle{
  static async onMessageCreate(message: Message) {
      try{
        const chat = await message.getChat();  
        messageInfo(message,chat)
        if(message.body.startsWith("!")){
        await commandExec(message.body,message)
        }
      }catch(e){
        console.log(e)
        console.log(chalk.redBright(e))
        let err = JSON.stringify(e)
        await message.reply(err,message.from)
      }
    
    }
  
}
