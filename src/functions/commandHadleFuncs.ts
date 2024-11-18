import CommandsConfig from "../DB/PostgreSQL/CommandConfig";
import Commands from "../data/json/Commands.json" with { type: "json" };
import {client} from "../index";
import { Message } from "whatsapp-web.js";
import { GroupChat } from "whatsapp-web.js";
import { bannedUser, onlyUser, superUser } from "../interfaces/postgressFuncTypes";

export class CommandHandlle{

    static async botOn(message:Message){
        try{
            const chat = await message.getChat()
             await client.sendMessage(chat.id._serialized,"Hola mundo")
        }catch(e){
            console.log(e)
        }
    }
    static async enable(message:Message){
      try {
        const regex = /(!\w+)\s+(!\w+)\s+(:set.+)(true|false|FALSE|TRUE)/
        const commandMatch = message.body.match(regex);
        if(!commandMatch){
            await message
            .reply(`Error de sintaxis: \n recibido: ${message.body} \n formato: !enable <commandName> :set true/false`)
            return
        }
        const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false 
        const commandName = commandMatch[2]
        const chatID = (await message.getChat()).id._serialized
        //verificar si el comando a configurar existe
        if(!Commands[commandName]){
            await message.reply("el comando a configurar no existe")
            return
        }
        const setConfig = await CommandsConfig.setEnableCommnad(chatID,commandName,enableState)
        await message.reply("Comando actualizado")

      } catch (error) {
        console.log(error)
      }
    }
    static async globalEnable(message:Message){
      try {
        if(message.author !== '18292078938@c.us'){
            await message.reply("Este comando solo puede ser utilizado por el usauario Root")
            return
        }
        const regex = /(!\w+)\s+(!\w+)\s+(:set.+)(true|false|FALSE|TRUE)/
        const commandMatch = message.body.match(regex);
        if(!commandMatch){
            await message
            .reply(`Error de sintaxis: \n recibido: ${message.body} \n formato: !G_enable <commandName> :set true/false`)
            return
        }
        const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false 
        const commandName = commandMatch[2]
        const chatID = (await message.getChat()).id._serialized
        //verificar si el comando a configurar existe
        if(!Commands[commandName]){
            await message.reply("el comando a configurar no existe")
            return
        }
        await CommandsConfig.setGlobalEnableCommnad(commandName,enableState)
       // await getCommandList()
        await message.reply("Comando actualizado globalmente")

      } catch (error) { 
        console.log(error)
      }
    }
    static async main(message:Message){
        try{
            const chat = await message.getChat()
            const CommandsArrList = (Array.from(Object.keys(Commands))).map(item=>`- ${item}\n`)
            const CList = CommandsArrList.join('')
            await client.sendMessage(chat.id._serialized,CList + '\n diseño provisional')
        }catch(e){
            console.log(e)
        }
    }
    static async AddUsersToBanList(message:Message){
        try{
            console.log(message.body)
            await message.reply("funcion no implementada")
          }catch(e){
            console.log(e)
          }
    }
    static async removeParticipants(message:Message){
      try {
          const BanList = message.body.match(/\s@(\d+)/g);
          if(!BanList) return message.reply("Error de sintaxis") 
          console.log(BanList)
          const chatID = (await message.getChat()).id._serialized
          const data = await CommandsConfig.getCommandsConfig(chatID,"!rm")
          const blackList = BanList.map(item=> {
            const user = item.trimStart().trimEnd().replace('@','').concat('@c.us')
            if(data['!rm'].super_users[user]){
              throw new Error("este comando no puede ser utilizado en super usuarios")
            }
            return user
          });
          console.log(blackList)
          const Group = <GroupChat> await message.getChat()
          await Group.removeParticipants(blackList)
      }
       catch (error) {
        console.log(error)
        const err = JSON.stringify(error.message,null, "\t")
        await message.reply(err)
      }
    }
    static async setOnlyAminds(message:Message){
        try{
          const match = message.body.match(/\s+(!\w+)\s+:set.+(true|false|FALSE|TRUE)/)
          if(!match) {
            await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !only_Admins <commandName> :set true/false")
            return
          }
          const commandName = match[1]
          const  state = match[2].toLowerCase() === 'true' ? true : false
          const chatID = (await message.getChat()).id._serialized
          //verificar si el comando a configurar existe
          if(!Commands[commandName]){
            await message.reply("el comando a configurar no existe")
            return
          }
          await CommandsConfig.setAdminOnlyCommnad(chatID,commandName,state)
          await message.reply("Comando actualizado")
          await CommandsConfig.getCommandsConfig(chatID,commandName)
        }
        catch(e){
          console.log(e)
        }
    }
      static async setOnlyAminds_global(message:Message){
        try{
          const match = message.body.match(/\s+(!\w+)\s+:set.+(true|false|FALSE|TRUE)/)
          if(!match) {
            await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !G_only_Admins <commandName> :set true/false")
            return
          }
          const commandName = match[1]
          const  state = match[2].toLowerCase() === 'true' ? true : false
          //verificar si el comando a configurar existe
          const chatID = (await message.getChat()).id._serialized
          if(!Commands[commandName]){
            await message.reply("el comando a configurar no existe")
            return
          }
          await CommandsConfig.setGlobalAdminOnlyGroupCommnad(commandName,state)
          await message.reply("Comando actualizado globalmente")
          await CommandsConfig.getCommandsConfig(chatID,commandName)
        }
        catch(e){
          console.log(e)
        }
    }
    static async addBannedUser(message:Message){
        try{
          const regex ={
            commandName: /\s:c\s+(!\w+)/,
            numberTarget: /(@\d+)/g
          }
          let match = message.body.match(regex.commandName)
          if(!match) {
            await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !restrict <commandName> :c <numberTarget...>")
            return
          }
          const commandName = match[1]
          const numberTarget = message.body.match(regex.numberTarget)
          if(!numberTarget) {
            await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !restrict <commandName> :c <numberTarget>")
            return
          }
        
          if(!Commands[commandName]){
            await message.reply("el comando a configurar no existe")
            return
          }
          const chatID = (await message.getChat()).id._serialized
          const data =await CommandsConfig.getCommandsConfig(chatID,commandName)

          const numberID:bannedUser = await numberTarget.map((item)=>{
            const user = item.replace('@','').trimStart().trimEnd().concat('@c.us')
            if(data[commandName].banned_users_list[user]){
              throw new Error("Este usuario ya esta en la lista de usuarios baneados")
            }
            if(data[commandName].super_users[user]){
              throw new Error("Este usuario ya esta en la lista de super usuarios no puede ser baneado de ningun comando")
            }
            return { 
              chat_id:chatID,
              command_id:commandName,
              banned_user: user
            }
          });
            await CommandsConfig.addUserToBanList(numberID)
            await message.reply("Usuarios añadidos a la lista de usuarios baneados")
        }catch(e){
          await message.reply(e.message)
          console.log(e)
        }
    }
    static async addWhiteListUser(message:Message){
      try {
        const regex ={
          commandName: /\s:c\s+(!\w+)/,
          numberTarget: /(@\d+)/g
        }
        let match = message.body.match(regex.commandName)
        if(!match) {
          await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !only_list <commandName> :c <numberTarget...>")
          return
        }
        const commandName = match[1]
        const numberTarget = message.body.match(regex.numberTarget)
        if(!numberTarget) {
          await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !only_list <commandName> :c <numberTarget>")
          return
        }
      
        if(!Commands[commandName]){
          await message.reply("el comando a configurar no existe")
          return
        }
        const chatID = (await message.getChat()).id._serialized

        const numberID:onlyUser = numberTarget.map(item=>{
          return { 
            command_id:commandName,
            chat_id:chatID,
            only_user: item.replace('@','').trimStart().trimEnd().concat('@c.us')
          }
        });
          await CommandsConfig.addUserToOnlyList(numberID)
          await message.reply("Usuarios añadidos a la lista de usuarios baneados")
          await CommandsConfig.getCommandsConfig(chatID,commandName)
      }catch(e){
        console.log(e)
      }
    }
    static async setSuperUser(message:Message){
      try {
        const regex = /(@\d+)/g
        const numberTarget = message.body.match(regex)
        if(!numberTarget) {
          await message.reply("Error de sintaxis \n recibido: " + message.body + "\n formato: !set_sudo [numbersTarget...]")
          return
        }
        function sendReply(text:string){
          message.getChat().then(chat=>{
            message.reply(text,chat.id._serialized).then(()=>{
              console.log("sent")
              return
            })
          }) 
        }
        const chatID = (await message.getChat()).id._serialized
        const data =await CommandsConfig.getCommandsConfig(chatID,'!set_sudo')
        const numberID :superUser = numberTarget.map((item)=>{
          const user = item.replace('@','').trimStart().trimEnd().concat('@c.us')
          if(data['!set_sudo'].super_users[user]){
            throw new Error(`Este usuario ya esta en la lista de usuarios superusuarios: [${item}]`)
            
          }
          if(data['!set_sudo'].banned_users_list[user]){
            throw new Error(`Este usuario ya esta en la lista de usuarios baneados: [${item}]`)
        
          }
          return {
            chat_id:chatID,
            user_id: user
          }
        })
        await CommandsConfig.addSuperUser(numberID)
        await message.reply("Usuarios añadidos a la lista de usuarios superusuarios")
      }catch(e){
        await message.reply(e.message)
      }
    }
    static async Unsudo(message:Message){
      try {
        const regex = /(@\d+)/g
        const numberTarget = message.body.match(regex)
        if(!numberTarget) {
          throw new Error("Error de sintaxis \n recibido: " + message.body + "\n formato: !unsudo [numbersTarget...]")
        }
        const chatID = (await message.getChat()).id._serialized
        const data =await CommandsConfig.getCommandsConfig(chatID,'!unsudo')
        const numberID:superUser = await numberTarget.map((item)=>{
          const user = item.replace('@','').trimStart().trimEnd().concat('@c.us')
          if(!(data['!unsudo'].super_users[user])){
            throw new Error(`[${user}] Este usuario no esta en la lista superusuarios: [${item}]`)
          }
          return {
            chat_id:chatID,
            user_id: user
          }
        })
        await CommandsConfig.removeSuperUser(numberID)
        await message.reply("Usuarios eliminados de la lista de superusuarios")
      }catch(e){
        const chat = await message.getChat()
        await message.reply(e.message,chat.id._serialized)
      }
    }
    static async getConfig(message:Message){
      try {
        const regex = /\s+(!\w+)/
        const commandMatch = message.body.match(regex)
        if(!commandMatch) {
          throw new Error("Error de sintaxis \n recibido: " + message.body + "\n formato: !get_config [command]")
        }
        const chatId = (await message.getChat()).id._serialized
        const config = await CommandsConfig.getCommandsConfig(chatId,commandMatch[1])
        
        const json = JSON.stringify(config,null,"\t")
        await message.reply(json)
      }catch(e){
        const chat = await message.getChat()
        await message.reply(e.message,chat.id._serialized)
      }
   /* static async GoodByeWorld(Message:Message){
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
    }*/
}}