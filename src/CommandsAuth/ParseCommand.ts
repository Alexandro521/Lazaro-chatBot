
import { Auth } from "./Auth";
import { Message } from "whatsapp-web.js";
 
//const getFlag = /(--\w.+?\s)/g
export  const commandExec = async (command: string,message:Message)=>{
       const Command = command.match(/(!\w+)/)[1]
       if(!Command) return await message.reply("Error de sintaxis")
       await Auth(Command,message)
}



