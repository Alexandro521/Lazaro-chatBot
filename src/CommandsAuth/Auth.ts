
import { commandLinks } from "../config/comandsLinks";
import { GroupChat, Message } from "whatsapp-web.js";
import CommandsConfig from "../DB/PostgreSQL/CommandConfig";
import Commands from "../data/json/Commands.json" with { type: "json" };
import { client } from "..";


export async function Auth(command: string, message: Message) {

    const chat = await message.getChat()

    if (!Commands[command]) {
        message.reply("Este comando no existe", chat.id._serialized)
        return
    }
    if (Commands[command].is_only_groups && !chat.isGroup || Commands[command].only_admins && !chat.isGroup) {
        message.reply("Solo para grupos", chat.id._serialized)
        return
    }
    // if(message.author !== '18292078938@c.us'){
    //     await commandLinks[command].init(message)
    //     return
    // }else{
    if (!chat.isGroup) {
        client.sendMessage(chat.id._serialized, "Los comandos no estan disponibles en privado por el momento")
    }

    const group = <GroupChat>await message.getChat()

    const data = await CommandsConfig.getCommandsConfig(group.id._serialized, command.trimStart().trimEnd())
    
    if (data[command].g_enable === false && message.author !== '18292078938@c.us') {
        message.reply("el usuario Root ha deshabilitado este comando globalmente", chat.id._serialized)
        return
    }
    if(data[command].super_users[message.author]){
        await message.reply("tienes permitido usar este comando, razon: Super usuario", chat.id._serialized)
        await commandLinks[command].init(message)
        return
    }
    if (!(data[command].l_enable) && message.author !== '18292078938@c.us') {
        await message.reply("Un administrador ha deshabilitado este comando", chat.id._serialized)
        return
    }
    if (data[command].only_users_list[message.author]) {
        await message.reply("tienes permitido usar este comando, razon: Usuario no con privilegios", chat.id._serialized)
        await commandLinks[command].init(message)
        return
    }
    if (data[command].banned_users_list[message.author]) {
        await message.reply("No tienes permisos para usar este comando, razon: Usuario no autorizado", chat.id._serialized)
        return
    }
    if (data[command].g_onlyadmins  || data[command].onlyadmins ) {
        const admins = group.participants.filter(participant => participant.isAdmin);
        const adminsObj = Object.fromEntries(admins.map(item => [item.id._serialized, item]))
        console.log(adminsObj)
        if (!adminsObj[message.author]) {
            await message.reply("Este comando solo puede ser utilizado por un administrador del grupo o un super Usuario del grupo", chat.id._serialized)
            return
        }
        await commandLinks[command].init(message)
        return
    }
    await commandLinks[command].init(message)

}


