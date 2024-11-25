/* eslint-disable @typescript-eslint/no-extraneous-class */
import { GroupChat, Message, MessageMedia } from "whatsapp-web.js";
import fs from "fs";
import { NewGame } from "./games/Akinator";
import { Themes } from "node_akinator";
export default class Games{
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
        console.log(e)
        message.reply(e.message)
    }
  }
  static async Akinator(message: Message) {
    try {
      
      const regex = /\s+(character|objects|animals)/i
      const test = regex.test(message.body)
      if (!test) throw new Error("*Bienvenido al juego de akinator con chrollo bot , debes elegir un tema de juego*\n (```character|objects|animals```)\n\n ```ⓘeste es un comando experimental, no se garantiza la calidad del juego```")
      const groupTarget = message.body.match(regex)
      const theme = groupTarget[1]
      console.log(theme)
      let tema = null
      if(theme === 'character') tema = Themes.Character
      else if(theme === 'objects') tema = Themes.Objects
      else if (theme === 'animals') tema = Themes.Animals
      else throw new Error("Fallo al elegir el tema")
      const SessionProps = {
        player: message.author,
        theme: tema,
        SessionID: message.id.id,
        message: message
      }
      await NewGame(SessionProps)

    } catch (error) {
      await message.reply(error.message)
      console.log(error)
    }
  }
}