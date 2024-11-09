import { Message } from "whatsapp-web.js";
import {client} from "../index";
import { GroupChat } from "whatsapp-web.js";
import { blacklist } from "../data/blacklist";
import chalk from 'chalk';

export class CommandHandlle{
    static async botOn(Message:Message){
        try{
            const chat = await Message.getChat()
             await client.sendMessage(chat.id._serialized,"Hola mundo")
        }catch(e){
            console.log(e)
        }
    }
    static async GoodByeWorld(Message:Message){
        try{
            const chat = await Message.getChat()
            await client.sendMessage(chat.id._serialized,"Ejecutando script de prueba...")
            const group = <GroupChat> await client.getChatById(chat.id._serialized)
            await group.setMessagesAdminsOnly(true)
            await client.sendMessage(chat.id._serialized,">entorno cerrado exitosamente")
            await client.sendMessage(chat.id._serialized,">Eliminando a un usuario del grupo...")
            let i = 0
            const interval =setInterval(async ()=>{
              if(i === blacklist.length){
                clearInterval(interval)
                return
              }
              const user = blacklist[i]
              const Arr = group.participants.filter((participant)=>{
                return participant.id._serialized === user.id._serialized
              })
              if(Arr.length >= 1){
                await group.removeParticipants([user.id._serialized]) 
               }
              i+=1
            },2000)
            await client.sendMessage(chat.id._serialized,">Usuarios eliminados exitosamente")
          }catch(e){
            console.log(chalk.redBright(e))
          }
    }
}