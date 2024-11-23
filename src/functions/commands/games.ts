/* eslint-disable @typescript-eslint/no-extraneous-class */
import { GroupChat, Message, MessageMedia } from "whatsapp-web.js";
import fs from "fs";

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
}