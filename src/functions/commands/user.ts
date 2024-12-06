/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Message} from "whatsapp-web.js";
import { level_session } from "../../services/level_System/session";
//import { leaderTableUserData,leaderTableGenerator } from "../../services/level_System/leaderTableGenerator";
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
}