/* eslint-disable @typescript-eslint/no-extraneous-class */

import { level_session } from "../../services/level_System/session";
import { Message, MessageMedia} from "whatsapp-web.js";
import { leaderTableUserData,leaderTableGenerator } from "../../services/level_System/leaderTableGenerator";


export default class User {

  static async level(message: Message) {
    try {
      const chat_id = (await message.getChat()).id._serialized
      const session = await level_session.get_session(message.author, chat_id)
      if (!session) {
        await level_session.create_session(message.author, chat_id)
      } else {
        await session.client.sendLevelCard(message,false)
      }
   
     } catch (error) {
      await message.reply(error.message)
      console.log(error)
    }
  }
  static async rank(message: Message) {
    try {
      const data = await leaderTableUserData(message)
      const base64 = await leaderTableGenerator(data)
      const media = new MessageMedia("image/png", base64)
      message.reply(media)
     } catch (error) {
      await message.reply(error.message)
      console.log(error)
    }
  }
}