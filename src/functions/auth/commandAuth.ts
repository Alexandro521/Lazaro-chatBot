import { Message } from "whatsapp-web.js";
import { commandList } from "../../config/comandConfig";
import { Command } from "../../interfaces/comandList";
import { Auth } from "./Auth";

export const commandExec = async (command: string,Message:Message)=>{
    if(commandList[command]){
       const commandProps: Command = commandList[command]
       await Auth({status:true,commandProps,Message})
    }else{
       await Auth({status:false,Message})
    }
}