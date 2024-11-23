import { GroupChat, Message } from "whatsapp-web.js"
import { client } from "../.."
import { error } from "../../data/Objects/Errors"
import CommandsdataBase from "../../DB/PostgreSQL/CommandConfig"
import Commands from "../../data/json/Commands.json" with { type: "json" }
import { bannedUser, onlyUser, superUser } from "../../interfaces/postgressFuncTypes"

/* eslint-disable @typescript-eslint/no-extraneous-class */
const regex = {
    commandTarget: /(!\w+)\s+(!\w+)\s+(:set.+)(true|false|FALSE|TRUE)/,
    numberTarget: /\s@(\d+)/g,
    commandName: /\s:c\s+(!\w+)/,
    delFlag: /\s+:(rm|Rm)/,
    numbergTarget: /(@\d+)/g,
    commandName2 : /\s+(!\w+)/
}
export default class ConfigsCommand {
  static async onlyGroups(message: Message) {
    try {
      const commandMatch = message.body.match(regex.commandTarget)

      if (!commandMatch) throw new Error(error.syntax.enable.razon)

      const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false
      const commandName = commandMatch[2]
      if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)

      await CommandsdataBase.setOnlyGroupCommnad(commandName, enableState)
      await message.reply("Comando actualizado")

    } catch (error) {
      await message.reply(error.message)
    }
  }
    static async enable(message: Message) {
        try {
            const commandMatch = message.body.match(regex.commandTarget)
            if (!commandMatch) throw new Error(error.syntax.enable.razon)
            const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false
            const commandName = commandMatch[2]
            const chatId = (await message.getChat()).id._serialized
            if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)
            await CommandsdataBase.setEnableCommnad(chatId, commandName, enableState)
            await message.reply("Comando actualizado")

        } catch (error) {
            await message.reply(error.message)
        }
    }
    static async globalEnable(message: Message) {
        try {
            if (message.author !== '18292078938@c.us') throw new Error(error.Auth.Root.razon)
            const commandMatch = message.body.match(regex.commandTarget);
            if (!commandMatch) throw new Error(error.syntax.globalEnable.razon)
            const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false
            const commandName = commandMatch[2]
            if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)
            await CommandsdataBase.setGlobalEnableCommnad(commandName, enableState)
            await message.reply("Comando actualizado globalmente")
        } catch (error) {
            await message.reply(error.message)
        }
    }
    static async removeParticipants(message: Message) {
        try {
            const numsTarget = message.body.match(regex.numberTarget)
            if (!numsTarget) throw new Error(error.syntax.removeParticipants.razon)
            const chatID = (await message.getChat()).id._serialized
            const data = await CommandsdataBase.getCommandsdataBase(chatID, "!rm")
            const blackList = numsTarget.map(item => {
                const user = item.trimStart().trimEnd().replace('@', '').concat('@c.us')
                if (data['!rm'].super_users[user]) throw new Error(error.Auth.superUser.razon)
                return user
            });
            const Group = <GroupChat>await message.getChat()
            await Group.removeParticipants(blackList)
        }
        catch (error) {
            await message.reply(error.message)
        }
    }
    static async setOnlyAminds(message: Message) {
        try {
            const match = message.body.match(regex.commandTarget)
            if (!match) throw new Error(error.syntax.setOnlyAminds.razon)
            const commandName = match[1]
            const state = match[2].toLowerCase() === 'true' ? true : false
            const chatID = (await message.getChat()).id._serialized
            if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)
            await CommandsdataBase.setAdminOnlyCommnad(chatID, commandName, state)
            await message.reply("Comando actualizado")
        }
        catch (e) {
            await message.reply(e.message)
        }
    }
    static async setOnlyAminds_global(message: Message) {
        try {
            const match = message.body.match(regex.commandTarget)
            if (!match) throw new Error(error.syntax.setOnlyAminds_global.razon)
            const commandName = match[1]
            const state = match[2].toLowerCase() === 'true' ? true : false
            if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)
            await CommandsdataBase.setGlobalAdminOnlyGroupCommnad(commandName, state)
            await message.reply("Comando actualizado globalmente")
        }
        catch (e) {
            await message.reply(e.message)
        }
    }
    static async addBannedUser(message: Message) {
        try {
            const match = message.body.match(regex.commandName)
            const delFlag = message.body.match(regex.delFlag)

            if (!match) throw new Error(error.syntax.addBannedUser.razon)

            const commandName = match[1]
            const numberTarget = message.body.match(regex.numberTarget)

            if (!numberTarget) throw new Error(error.syntax.addBannedUser.razon)
        
            if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)
            
            const chatID = (await message.getChat()).id._serialized
            const data = await CommandsdataBase.getCommandsdataBase(chatID, commandName)

            const numberID: bannedUser = await numberTarget.map((item) => {
                const user = item.replace('@', '').trimStart().trimEnd().concat('@c.us')
                if (data[commandName].banned_users_list[user] && !delFlag) throw new Error(error.verification.isInList.razon)
                if (data[commandName].super_users[user] && !delFlag) throw new Error(error.verification.notBanSuperUser.razon)
                return {
                    chat_id: chatID,
                    command_id: commandName,
                    banned_user: user
                }
            });
            if (delFlag) {
                await CommandsdataBase.removeUserFromBanList(numberID)
                await message.reply("Usuarios eliminados de la lista de usuarios baneados")
                return
            }
            await CommandsdataBase.addUserToBanList(numberID)
            await message.reply("Usuarios añadidos a la lista de usuarios baneados")
        } catch (e) {
            await message.reply(e.message)
        }
    }
    static async addWhiteListUser(message: Message) {
        try {
            const  match = message.body.match(regex.commandName)
            if (!match) {
                await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !only_list <commandName> :c <numberTarget...>")
                return
            }
            const commandName = match[1]
            const numberTarget = message.body.match(regex.numberTarget)
            if (!numberTarget) {
                await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !only_list <commandName> :c <numberTarget>")
                return
            }
            if (!Commands[commandName]) {
                await message.reply("el comando a configurar no existe")
                return
            }
            const chatID = (await message.getChat()).id._serialized

            const numberID: onlyUser = numberTarget.map(item => {
                return {
                    command_id: commandName,
                    chat_id: chatID,
                    only_user: item.replace('@', '').trimStart().trimEnd().concat('@c.us')
                }
            });
       
            await CommandsdataBase.addUserToOnlyList(numberID)
            await message.reply("Usuarios añadidos a la lista de usuarios baneados")
            await CommandsdataBase.getCommandsdataBase(chatID, commandName)
        } catch (e) {
            console.log(e)
        }
    }
    static async setSuperUser(message: Message) {
        try {
            const numberTarget = message.body.match(regex.numbergTarget)
            if (!numberTarget) throw new Error(error.syntax.setSuperUser.razon)

            const chatID = (await message.getChat()).id._serialized
            const data = await CommandsdataBase.getCommandsdataBase(chatID, '!set_sudo')

            const numberID: superUser = numberTarget.map((item) => {
                const user = item.replace('@', '').trimStart().trimEnd().concat('@c.us')
                if (data['!set_sudo'].super_users[user]) throw new Error(`Este usuario ya esta en la lista de usuarios superusuarios: [${item}]`)
          
                if (data['!set_sudo'].banned_users_list[user]) throw new Error(`Este usuario ya esta en la lista de usuarios baneados: [${item}]`)

                return {
                    chat_id: chatID,
                    user_id: user
                }
            })
            await CommandsdataBase.addSuperUser(numberID)
            await message.reply("Usuarios añadidos a la lista de usuarios superusuarios")
        } catch (e) {
            await message.reply(e.message)
        }
    }
    static async Unsudo(message: Message) {
        try {
            const numberTarget = message.body.match(regex.numbergTarget)
            if (!numberTarget) throw new Error(error.syntax.Unsudo.razon)
            const chatID = (await message.getChat()).id._serialized
            const data = await CommandsdataBase.getCommandsdataBase(chatID, '!unsudo')
            const numberID: superUser = await numberTarget.map((item) => {
                const user = item.replace('@', '').trimStart().trimEnd().concat('@c.us')
                if (!(data['!unsudo'].super_users[user])) throw new Error(`[${user}] Este usuario no esta en la lista superusuarios: [${item}]`)
          
                return {
                    chat_id: chatID,
                    user_id: user
                }
            })
            await CommandsdataBase.removeSuperUser(numberID)
            await message.reply("Usuarios eliminados de la lista de superusuarios")
        } catch (e) {
            const chat = await message.getChat()
            await message.reply(e.message, chat.id._serialized)
        }
    }
    static async getConfig(message: Message) {
        try {
            const commandMatch = message.body.match(regex.commandName2)
            if (!commandMatch) throw new Error(error.syntax.getConfig.razon)
            const chatId = (await message.getChat()).id._serialized
            const config = await CommandsdataBase.getCommandsdataBase(chatId, commandMatch[1])
        
            const json = JSON.stringify(config, null, "\t")
            await message.reply(json)
        } catch (e) {
            const chat = await message.getChat()
            await message.reply(e.message, chat.id._serialized)
        }

    }
    static async Everyone(message: Message) {
        try {
            const chatid = (await message.getChat()).id._serialized
            const chat = <GroupChat>await client.getChatById(chatid)
            let metionsText = ''
            const metionsList = [];
            const participants = chat.participants;
            console.log(participants)
            participants.forEach(participant => {
                metionsText += '@' + participant.id.user + "\n"
                metionsList.push(participant.id._serialized)
            })
            client.sendMessage(chat.id._serialized, metionsText, {
                mentions: metionsList
            })
        } catch (e) {
            console.log(e)
        }
    }
}