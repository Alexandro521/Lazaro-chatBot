import CommandsConfig from "../DB/PostgreSQL/CommandConfig";
import Commands from "../data/json/Commands.json" with { type: "json" };
import {client} from "../index";
import { List, Message, MessageMedia } from "whatsapp-web.js";
import { GroupChat } from "whatsapp-web.js";
import { bannedUser, onlyUser, superUser } from "../interfaces/postgressFuncTypes";
import { error } from "../data/typescript/Errors";
import { GoogleImagesResponse, pinterest,Pinterestv1,tiltokSearch,yts,wallpaper} from "../interfaces/deliriussApiHttpResponses";
import { ApiUrl } from "../data/typescript/DelirusApisUrls";
import { config } from "../config/Axios.config";
import axios from "axios";
import fs from "fs";
import { $ } from "bun"
import { guidGenerator } from "../utils/guidGenerator";
import { tiktokLinksTemp,youtubeLinskTemp} from "./temp/temp";
import {youtubeResultsSchema} from "../schemas/textSchemas";
import { akinator } from "../functions/temp/aki";
import { AkinatorClient, Languages, Themes, Answers } from "node_akinator";

export class CommandHandlle {

  static async botOn(message: Message) {
    try {
      const chat = await message.getChat()
      await client.sendMessage(chat.id._serialized, "Hola mundo")
    } catch (e) {
      console.log(e)
    }
  }
  static async enable(message: Message) {
    try {
      const commandMatch = message.body.match(/(!\w+)\s+(!\w+)\s+(:set.+)(true|false|FALSE|TRUE)/)

      if (!commandMatch) throw new Error(error.syntax.enable.razon)

      const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false
      const commandName = commandMatch[2]
      const chatId = (await message.getChat()).id._serialized

      if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)

      await CommandsConfig.setEnableCommnad(chatId, commandName, enableState)
      await message.reply("Comando actualizado")

    } catch (error) {
      await message.reply(error.message)
    }
  }
  static async globalEnable(message: Message) {
    try {
      if (message.author !== '18292078938@c.us') throw new Error(error.Auth.Root.razon)

      const commandMatch = message.body.match(/(!\w+)\s+(!\w+)\s+(:set.+)(true|false|FALSE|TRUE)/);

      if (!commandMatch) throw new Error(error.syntax.globalEnable.razon)

      const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false
      const commandName = commandMatch[2]

      if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)

      await CommandsConfig.setGlobalEnableCommnad(commandName, enableState)
      await message.reply("Comando actualizado globalmente")

    } catch (error) {
      await message.reply(error.message)
    }
  }
  static async main(message: Message) {
    try {
      const chat = await message.getChat()
      const CommandsArrList = (Array.from(Object.keys(Commands))).map(item => `- ${item}\n`).join('')
      await client.sendMessage(chat.id._serialized, CommandsArrList + '\n diseño provisional')
    } catch (e) {
      await message.reply(e.message)
    }
  }
  static async removeParticipants(message: Message) {
    try {
      const numsTarget = message.body.match(/\s@(\d+)/g)

      if (!numsTarget) throw new Error(error.syntax.removeParticipants.razon)

      const chatID = (await message.getChat()).id._serialized
      const data = await CommandsConfig.getCommandsConfig(chatID, "!rm")

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
      const match = message.body.match(/\s+(!\w+)\s+:set.+(true|false|FALSE|TRUE)/)

      if (!match) throw new Error(error.syntax.setOnlyAminds.razon)
          
      const commandName = match[1]
      const state = match[2].toLowerCase() === 'true' ? true : false

      const chatID = (await message.getChat()).id._serialized

      if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)

      await CommandsConfig.setAdminOnlyCommnad(chatID, commandName, state)
      await message.reply("Comando actualizado")
    }
    catch (e) {
      await message.reply(e.message)
    }
  }
  static async setOnlyAminds_global(message: Message) {
    try {
      const match = message.body.match(/\s+(!\w+)\s+:set.+(true|false|FALSE|TRUE)/)
      if (!match) throw new Error(error.syntax.setOnlyAminds_global.razon)

      const commandName = match[1]
      const state = match[2].toLowerCase() === 'true' ? true : false

      if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)

      await CommandsConfig.setGlobalAdminOnlyGroupCommnad(commandName, state)
      await message.reply("Comando actualizado globalmente")
    }
    catch (e) {
      await message.reply(e.message)
    }
  }
  static async addBannedUser(message: Message) {
    try {
      const regex = {
        commandName: /\s:c\s+(!\w+)/,
        numberTarget: /(@\d+)/g,
        delFlag: /\s+:(rm|Rm)/
      }
      const match = message.body.match(regex.commandName)
      const delFlag = message.body.match(regex.delFlag)

      if (!match) throw new Error(error.syntax.addBannedUser.razon)

      const commandName = match[1]
      const numberTarget = message.body.match(regex.numberTarget)

      if (!numberTarget) throw new Error(error.syntax.addBannedUser.razon)
        
      if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)
            
      const chatID = (await message.getChat()).id._serialized
      const data = await CommandsConfig.getCommandsConfig(chatID, commandName)

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
        await CommandsConfig.removeUserFromBanList(numberID)
        await message.reply("Usuarios eliminados de la lista de usuarios baneados")
        return
      }
      await CommandsConfig.addUserToBanList(numberID)
      await message.reply("Usuarios añadidos a la lista de usuarios baneados")
    } catch (e) {
      await message.reply(e.message)
    }
  }
  static async addWhiteListUser(message: Message) {
    try {
      const regex = {
        commandName: /\s:c\s+(!\w+)/,
        numberTarget: /(@\d+)/g,
        delFlag: /\s+:(rm|Rm)/
      }
      let match = message.body.match(regex.commandName)
      const delFlag = message.body.match(regex.delFlag)
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
       
      await CommandsConfig.addUserToOnlyList(numberID)
      await message.reply("Usuarios añadidos a la lista de usuarios baneados")
      await CommandsConfig.getCommandsConfig(chatID, commandName)
    } catch (e) {
      console.log(e)
    }
  }
  static async setSuperUser(message: Message) {
    try {
      const regex = /(@\d+)/g
      const numberTarget = message.body.match(regex)
      if (!numberTarget) throw new Error(error.syntax.setSuperUser.razon)

      const chatID = (await message.getChat()).id._serialized
      const data = await CommandsConfig.getCommandsConfig(chatID, '!set_sudo')

      const numberID: superUser = numberTarget.map((item) => {
        const user = item.replace('@', '').trimStart().trimEnd().concat('@c.us')
        if (data['!set_sudo'].super_users[user]) throw new Error(`Este usuario ya esta en la lista de usuarios superusuarios: [${item}]`)
          
        if (data['!set_sudo'].banned_users_list[user]) throw new Error(`Este usuario ya esta en la lista de usuarios baneados: [${item}]`)

        return {
          chat_id: chatID,
          user_id: user
        }
      })
      await CommandsConfig.addSuperUser(numberID)
      await message.reply("Usuarios añadidos a la lista de usuarios superusuarios")
    } catch (e) {
      await message.reply(e.message)
    }
  }
  static async Unsudo(message: Message) {
    try {
      const regex = /(@\d+)/g
      const numberTarget = message.body.match(regex)
      if (!numberTarget) throw new Error(error.syntax.Unsudo.razon)
      const chatID = (await message.getChat()).id._serialized
      const data = await CommandsConfig.getCommandsConfig(chatID, '!unsudo')
      const numberID: superUser = await numberTarget.map((item) => {
        const user = item.replace('@', '').trimStart().trimEnd().concat('@c.us')
        if (!(data['!unsudo'].super_users[user])) throw new Error(`[${user}] Este usuario no esta en la lista superusuarios: [${item}]`)
          
        return {
          chat_id: chatID,
          user_id: user
        }
      })
      await CommandsConfig.removeSuperUser(numberID)
      await message.reply("Usuarios eliminados de la lista de superusuarios")
    } catch (e) {
      const chat = await message.getChat()
      await message.reply(e.message, chat.id._serialized)
    }
  }
  static async getConfig(message: Message) {
    try {
      const regex = /\s+(!\w+)/
      const commandMatch = message.body.match(regex)
      if (!commandMatch) throw new Error(error.syntax.getConfig.razon)
      const chatId = (await message.getChat()).id._serialized
      const config = await CommandsConfig.getCommandsConfig(chatId, commandMatch[1])
        
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
    }
  }
  static async testGay(message: Message) {
    try {
      const chat = <GroupChat>await message.getChat()
      const [metions] = await message.getMentions()
      const ReadPath = await fs.readdirSync(`${process.cwd()}/static/img/test_gay_img`, 'utf-8')
      const random = Math.floor(Math.random() * (ReadPath.length + 1));
      const image = await MessageMedia.fromFilePath(`${process.cwd()}/static/img/test_gay_img/${ReadPath[random]}`)
      function test_gay(to: string) {
        return `🏳️‍🌈🏳️‍🌈🏳️‍🌈 ${to} *es* ${Math.floor(Math.random() * 101)}% *Homosexual* 🏳️‍🌈🏳️‍🌈🏳️‍🌈`
      }
      if (!metions) {
        await message.reply(image, chat.id._serialized, {
          caption: test_gay('eres'),
           
        })
        return
      }
      await message.reply(image, chat.id._serialized, {
        caption: test_gay('@' + metions.id.user),
        mentions: [metions.id._serialized]
      })
    } catch (e) {
    }
  }
  static async pinterestv2(message: Message) {
    try {
      const chatid = (await message.getChat()).id._serialized
      const query = message.body.match(/!\w+\s+(.+)/)
      if (!query) throw new Error('debes ingresar el texto a buscar')
      const url = ApiUrl.Search.pinterestv2 + query[1]
      const request = await axios.get(url, config)
      const data: pinterest = request.data
      const random = Math.floor(Math.random() * (data.data.length));
      const img = data.data[random].image
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true })
      await message.reply(image, chatid)
    } catch (e) {
      console.log(e)
      message.reply(e.message)
    }
  }
  static async pinterestv1(message: Message) {
    try {
      const chatid = (await message.getChat()).id._serialized
      const query = message.body.match(/!\w+\s+(.+)/)
      if (!query) throw new Error('debes ingresar el texto a buscar')
      const url = ApiUrl.Search.pinterest + query[1]
      const request = await axios.get(url, config)
      const data: Pinterestv1 = request.data
      const random = Math.floor(Math.random() * (data.result.length));
      const img = data.result[random]
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true })
      await message.reply(image, chatid)
    } catch (e) {
      console.log(e)
      message.reply(e.message)
    }
  }
  static async googleImages(message: Message) {
    try {
      const chatid = (await message.getChat()).id._serialized
      const query = message.body.match(/!\w+\s+(.+)/)
      if (!query) throw new Error('debes ingresar el texto a buscar')
      const url = ApiUrl.Search.googleImg + query[1]
      const request = await axios.get(url, config)
      const data: GoogleImagesResponse = request.data
      const random = Math.floor(Math.random() * (data.data.length));
      const img = data.data[random].url
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true })
      await message.reply(image, chatid)
    } catch (e) {
      console.log(e)
      message.reply(e.message)
    }
  }
  static async stickerCreate(message: Message) {
    try {
      const chat = await message.getChat()
      const chatid = (await message.getChat()).id._serialized
      if (message.hasQuotedMsg) {
        const quote = await message.getQuotedMessage()
        // console.log(quote)
        if (!quote.hasMedia) throw new Error("no tienes mensaje con imagen")
        console.log(quote.type)
        const media = await quote.downloadMedia()
        await chat.sendMessage(media, {
          sendMediaAsSticker: true,
          stickerAuthor: 'chrollo bot',
          stickerName: 'chrollo bot name',
          stickerCategories: ['chrollo bot category'],
        })
        return
      }
      if (!message.hasMedia) throw new Error("no tienes mensaje con imagen")
      console.log(message.type)
      const media = await message.downloadMedia()
      await chat.sendMessage(media, {
        sendMediaAsSticker: true,
        stickerAuthor: 'chrollo bot',
        stickerName: 'chrollo bot name',
        stickerCategories: ['chrollo bot category'],
        sendVideoAsGif: true,
      })
    } catch (e) {
      message.reply(e.message)
    }
  }
  static async yts(message: Message) {
    try {
      const chat = await message.getChat()
      const query = message.body.match(/!\w+\s+(.+)/)
      if (!query) throw new Error('debes ingresar el texto a buscar')
      const url = ApiUrl.Search.YoutubeSearch + query[1]
      const request = await axios.get(url, config)
      if (request.status !== 200) throw new Error("Error http")
      const data: yts = request.data
      let text = ''
      let count = 0
      const ListObj = []
      const schema = youtubeResultsSchema()
      for (let i = 0; i < data.data.length; i++) {
        count += 1
        text += schema.body(i, data.data[i].title, data.data[i].duration, data.data[i].url, data.data[i].author.name)
        ListObj.push({
          title: data.data[i].title,
          duration: data.data[i].duration,
          url: data.data[i].url,
          canal: data.data[i].author.name,
        })
      }
      const uuid = guidGenerator()
      youtubeLinskTemp[uuid] = ListObj
      const header = schema.head(uuid, query[1])
      const image = await MessageMedia.fromUrl(data.data[0].image, { unsafeMime: true })
      await message.reply(image, chat.id._serialized, {
        caption: header + text
      })
    } catch (e) {
      message.reply(e.message)
    }
  }
  static async mp3(message: Message) {
    try {
      const chat = await message.getChat()
      if (!message.hasQuotedMsg) throw new Error("debes citar un mensaje de tipo !yts")
      const quote = await message.getQuotedMessage()
      
      const typeTest = (/\[t:yts\s+.+\]/).test(quote.body)
      if (!typeTest) throw new Error("tipo de mensaje de entrada no comaptible")
      const id = quote.body.match(/\[t:yts\s+(.+)\]/)[1]
      if (!id) throw new Error("error en el id")
      const numberMatch = message.body.match(/#(\d+)/)
      if (!numberMatch) throw new Error("no tienes index")
      const getIndex = Number.parseInt(numberMatch[1])
      
      const ArrayObj = youtubeLinskTemp[id]
      if (!ArrayObj[getIndex]) throw new Error("El indice solicitado no existe")
      
      let { title, url, duration, canal } = ArrayObj[getIndex]
      
      await message.react('📥')
      await message.reply(`Descargando y enviando mp3 de *${title}*...`)
      let title2 = title.trim().replaceAll(' ', 'x').replaceAll("#", 'x').replaceAll('|', 'x').replaceAll('*', 'x').replaceAll('?', 'x').replaceAll('/', 'x').replaceAll('\\', 'x').replaceAll(':', 'x').replaceAll('"', 'x').replaceAll('<', 'x').replaceAll('>', 'x')
      const ouput = await $`C:\\yt-dlp.exe -o "${title2}.%(ext)s" -f 139 -x --audio-format mp3 -P C:\\Users\\alex\\OneDrive\\Desktop\\desk\\bot\\static\\audio ${url}`.text()
      console.log(ouput)
      const files = await fs.readdirSync(`${process.cwd()}/static/audio`, {
        encoding: 'utf-8',
      })
      // message.reply(JSON.stringify(files, null, "\t"))
      const media = await MessageMedia.fromFilePath(`${process.cwd()}/static/audio/${title2}.mp3`)
      media.filename = title2
      await message.reply(media, chat.id._serialized)
    } catch (e) {
      message.reply(e.message)
      console.log(e)
    }
  }
  static async mp4(message: Message) {
    try {
      const chat = await message.getChat()
      if (!message.hasQuotedMsg) throw new Error("debes citar un mensaje de tipo !yts")
      const quote = await message.getQuotedMessage()
      
      const typeTest = (/\[t:yts\s+.+\]/).test(quote.body)
      if (!typeTest) throw new Error("tipo de mensaje de entrada no comaptible")
      const id = quote.body.match(/\[t:yts\s+(.+)\]/)[1]
      if (!id) throw new Error("error en el id")
      const numberMatch = message.body.match(/#(\d+)/)
      if (!numberMatch) throw new Error("no tienes index")
      const getIndex = Number.parseInt(numberMatch[1])
      
      const ArrayObj = youtubeLinskTemp[id]
      if (!ArrayObj[getIndex]) throw new Error("El indice solicitado no existe")
      
      let { title, url, duration, canal } = ArrayObj[getIndex]
      
      await message.react('📥')
      await message.reply(`Descargando y enviando mp4 de *${title}*...(esto puede tardar un rato)`)
      let title2 = title.trim().replaceAll(' ', 'x').replaceAll("#", 'x').replaceAll('|', 'x').replaceAll('*', 'x').replaceAll('?', 'x').replaceAll('/', 'x').replaceAll('\\', 'x').replaceAll(':', 'x').replaceAll('"', 'x').replaceAll('<', 'x').replaceAll('>', 'x')
      const ouput = await $`C:\\yt-dlp.exe -S "res:720" -o "${title2}.%(ext)s" -P C:\\Users\\alex\\OneDrive\\Desktop\\desk\\bot\\static\\video ${url}`.text()
      console.log(ouput)
      const files = await fs.readdirSync(`${process.cwd()}/static/video`, {
        encoding: 'utf-8',
      })
      // message.reply(JSON.stringify(files, null, "\t"))
      const media = await MessageMedia.fromFilePath(`${process.cwd()}/static/video/${title2}.mp4`)
      media.filename = title2
      await message.reply(media, chat.id._serialized, {
        sendMediaAsDocument: true,
      })
    } catch (e) {
      message.reply(e.message)
      console.log(e)
    }
  }
  static async walppaper(message: Message) {
    try {
      const chat = await message.getChat()
      const query = message.body.match(/!\w+\s+(.+)/)
      if (!query) throw new Error('debes ingresar el texto a buscar')
      const url = ApiUrl.Search.wallpaper + query[1]
      const request = await axios.get(url, config)
      const data: wallpaper = request.data
      const random = Math.floor(Math.random() * (data.data.length));
      const img = data.data[random].image
      const image = await MessageMedia.fromUrl(img, { unsafeMime: true })
      await message.reply(image, chat.id._serialized)
    } catch (e) {
      message.reply(e.message)
      console.log(e)
    }
  }
  static async ttks(message: Message) {
    try {
      const chat = await message.getChat()
      const query = message.body.match(/!\w+\s+(.+)/)
      if (!query) throw new Error('debes ingresar el texto a buscar')
      const url = ApiUrl.Search.tiktokSearch + query[1]
      const request = await axios.get(url, config)
      const data: tiltokSearch = request.data
      let text = ''
      const id = guidGenerator()
      let linksObj = []
      for (let i = 0; i < data.meta.length; i++) {
        let row = `*[${i}]..................\n\n*title*: ${data.meta[i].title.slice(0, 30)}\n*duration*: ${data.meta[i].duration}\n*Likes*: ${data.meta[i].like}\nauthor: ${data.meta[i].author.username}\n .............................\n`
        text += row
        linksObj.push({ url: data.meta[i].hd, title: data.meta[i].title.slice(0, 30) })
      }
      tiktokLinksTemp[id] = linksObj
      console.log(tiktokLinksTemp)
      await message.reply(`[t:ttk ${id}]\n${text}`, chat.id._serialized)
    } catch (e) {
      message.reply(e.message)
      console.log(e)
    }
  }
  static async ttkget(message: Message) {

    try {
      //get ttk video
      const chat = await message.getChat()
      if (!message.hasQuotedMsg) throw new Error("debes citar un mensaje de tipo !ttkS")
      const quote = await message.getQuotedMessage()
      const typeTest = (/\[t:ttk\s+.+\]/).test(quote.body)
      if (!typeTest) throw new Error("tipo de mensaje de entrada no comaptible")
      const id = quote.body.match(/\[t:ttk\s+(.+)\]/)[1]
      const links = tiktokLinksTemp[id]
      console.log(links)
      const numberMatch = message.body.match(/#(\d+)/)
      if (!numberMatch) throw new Error("no tienes index")
      const getIndex = Number.parseInt(numberMatch[1])
      //console.log(links[getIndex])
      const { title, url } = links[getIndex]
      await message.reply(`Decargando y enviando *${title}*...`)
      const media = await MessageMedia.fromUrl(url, { unsafeMime: true })
      await message.reply(media, chat.id._serialized, {
        sendMediaAsDocument: true,
      })
    } catch (e) {
      message.reply(e.message)
      console.log(e)
    }
  }
  static async onlyGroups(message: Message) {
    try {
      const commandMatch = message.body.match(/(!\w+)\s+(!\w+)\s+(:set.+)(true|false|FALSE|TRUE)/)

      if (!commandMatch) throw new Error(error.syntax.enable.razon)

      const enableState = (commandMatch[4].toLowerCase()) === 'true' ? true : false
      const commandName = commandMatch[2]
      const chatId = (await message.getChat()).id._serialized

      if (!Commands[commandName]) throw new Error(error.Auth.notExist.razon)

      await CommandsConfig.setOnlyGroupCommnad(commandName, enableState)
      await message.reply("Comando actualizado")

    } catch (error) {
      await message.reply(error.message)
    }
  }
  static async test(message: Message) {
    try {
      const chat = await message.getChat()
       if (akinator.won) {
           const media = await MessageMedia.fromUrl(akinator.winResult.pictureUrl, { unsafeMime: true })
          await message.reply(media, chat.id._serialized,{
            caption:akinator.winResult.name
          }
         )
         await akinator.submitWin()
            return
          }
      if (message.hasQuotedMsg) {
        const quote = await message.getQuotedMessage()
       
          const numberMatch = message.body.match(/#(\d+)/)[1]
          const options = {
            '1': Answers.Yes,
            '2': Answers.No,
            '3': Answers.IDontKnow,
            '4': Answers.Probably,
            '5': Answers.ProbablyNot
        }
          console.log(numberMatch)
          console.log(options[numberMatch])
        const answer = await akinator.answer(options[numberMatch]);
        console.log(answer.won, akinator.won)
        if (answer.won || akinator.won) {
           const media = await MessageMedia.fromUrl(akinator.winResult.pictureUrl, { unsafeMime: true })
          await message.reply(media, chat.id._serialized,{
            caption:akinator.winResult.name
          }
          )
            await akinator.submitWin()
            return
          }
           const answers = [
          "1-Yes",
          "2-No",
          "3-Don't know",
          "4-Probably",
          "5-Probably not"
        ];
        console.log(akinator.akitude)
        await message.reply('test' + '\n' + answer.question + '\n' + answers.join('\n'))
          console.log(`(${answer.step}/100) ${answer.question}`);
          console.log(answer.progression);
        
      }
      else {
        const session = "test"
        const chat = await message.getChat()
        const answers = [
          "1-Yes",
          "2-No",
          "3-Don't know",
          "4-Probably",
          "5-Probably not"
        ];
        const start = await akinator.start();
        await message.reply('test' + '\n' + start.question + '\n' + answers.join('\n'))
      }
    } catch (error) {
      
    }
  }
}