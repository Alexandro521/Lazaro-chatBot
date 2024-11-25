
import { commandLinks } from "../config/comandsLinks";
import { GroupChat, Message } from "whatsapp-web.js";
import CommandsdataBase from "../DB/PostgreSQL/CommandConfig";
import Commands from "../data/json/Commands.json" with { type: "json" };
import { error } from "../data/Objects/Errors";


export async function Auth(command: string, message: Message) {
    try {
        if (!Commands[command]){
            throw new Error(error.Auth.notExist.razon)
        }
          const chat = await message.getChat();
         const isGroup =chat.isGroup
        

        // if (!isGroup){
        //     throw new Error("Los comandos no estan disponibles en privado por el momento")
        // }   
        const group = <GroupChat>await message.getChat()
        const data = await CommandsdataBase.getCommandsdataBase(chat.id._serialized, command.trimStart().trimEnd())
        if (data[command].for_groups && !isGroup)
            {
           throw new Error(error.Auth.onlyGroups.razon)
       }
        if (data[command].g_enable === false && message.author !== '18292078938@c.us') throw new Error("el usuario Root ha deshabilitado este comando globalmente")
        else if (data[command].super_users[message.author]) {
            await message.reply("tienes permitido usar este comando, razon: Super usuario", chat.id._serialized)
            await commandLinks[command].init(message)
            return
        }
        else if (!(data[command].l_enable) && message.author !== '18292078938@c.us') throw new Error("Un administrador ha deshabilitado este comando")
        else if (data[command].only_users_list[message.author]) {
            await message.reply("tienes permitido usar este comando, razon: Usuario no con privilegios", chat.id._serialized)
            await commandLinks[command].init(message)
            return
        }
        else if (data[command].banned_users_list[message.author]) throw new Error("No tienes permisos para usar este comando, razon: Usuario no autorizado")
        else if (data[command].g_onlyadmins || data[command].onlyadmins) {

            const admins = group.participants.filter(participant => participant.isAdmin);
            const adminsObj = Object.fromEntries(admins.map(item => [item.id._serialized, item]))
            console.log(adminsObj)
            if (!adminsObj[message.author]) throw new Error("Este comando solo puede ser utilizado por un administrador del grupo o un super Usuario del grupo")
            await commandLinks[command].init(message)
            return
        }

        await commandLinks[command].init(message)

    } catch (e) {
        const chat = await message.getChat()
        await message.reply(e.message,chat.id._serialized)
    }

}


