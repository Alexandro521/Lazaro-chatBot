import { AuthData } from "../../interfaces/AuthData";
import { Client } from "whatsapp-web.js";
import { GroupChat } from "whatsapp-web.js";

export async function Auth(data:AuthData){
    if(!data.status){
        const chat = await data.Message.getChat()
        await data.Message.reply("Este comando no existe",chat.id._serialized)
        return
    }
    const Message = data.Message
    const chat = await Message.getChat()
    const Props = data.commandProps.props
    const isGroup = chat.isGroup
    if(Props.IsDesabilited){
        await Message.reply("Este comando no esta disponible en este momento",chat.id._serialized)
        return
    }
    if(Props.onlyGroups && !chat.isGroup){
        await Message.reply("Solo para grupos",chat.id._serialized)
        return
    }
    if(Props.onlyForUsers.length > 0 && !Props.onlyForUsers.includes(Message.author)){
        await Message.reply("No tienes permisos para usar este comando, razon: Usuario no autorizado",chat.id._serialized)
        return
    }
    if(Props.restrictedUsers.length > 0 && !Props.restrictedUsers.includes(Message.author)){
        await Message.reply("No tienes permitido usar este comando, razon: Usuario no Restringido",chat.id._serialized)
        return  
    }
    if(Props.onlyAdmin){
        if(!chat.isGroup) return
        const Group = <GroupChat> await Message.getChat()
        const admins = <string[]><unknown[]>Group.participants.filter(
            (participant)=>{
           if(participant.isAdmin){
              const admin =<string>participant.id._serialized
              return admin
           }
        })
        const isSuper = Props.onlyForUsers.includes(Message.author)
        const isAdmin = admins.includes(Message.author)
        if(!isSuper && !isAdmin){
            await Message.reply("Este comando solo puede ser utilizado por un administrador del grupo o un super Usuario del grupo",chat.id._serialized)
            return
        }
    }
    await data.commandProps.init({Message})
}