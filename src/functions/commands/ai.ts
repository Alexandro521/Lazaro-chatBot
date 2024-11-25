
import { Message, MessageMedia} from "whatsapp-web.js";

import { characterAI_Client } from "../../services/character.ai";
import { characterSession } from "../../data/temp/temp";
import character from "../../data/json/character.ai.characters.json" with { type: "json" };
import { characterSchema } from "../../schemas/character.ai";
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Ai { 
    static async characterAi(message: Message) {
        try {
          let query = null
          const characters = {
            "1": "midudev",
            "2": "exNovia",
            "3": "anaDeArmas",
            "4": "taylosSwift",
            "5": "goticGirlFriend"
          }
          const test = /:change\s+(\d+)\s+(.+)/.test(message.body)
          if (!characterSession[message.author]) {
            
            const regex = /:p\s+(\d+)\s+(.+)/
            const match = message.body.match(regex)
            if (!match) throw new Error(characterSchema);
            const mess = await message.reply('creando sesion...')
            const [, characterID, msg] = [...match]
            const cha = characters[characterID]
    
            if (!cha) throw new Error("personaje no encontrado")
            query = msg
            const charID = character[cha].id
            const voiceID = character[cha].voice_id
            characterSession[message.author] = {
              user: message.author,
              character: charID,
              char: new characterAI_Client(charID, voiceID)
            }
            await mess.react("🟢")
          }
          if (test) {
            const regex = /:change\s+(\d+)\s+(.+)/
            const match = message.body.match(regex)
            if (!match) throw new Error(characterSchema);
            const [, characterID, msg] = [...match]
            const cha = characters[characterID]
            query = msg
            if (!cha) throw new Error("personaje no encontrado")
       
            await message.reply('personaje cambiado a ' + cha)
            await characterSession[message.author].char.change(character[cha].id,character[cha].voice_id)
          }
          else {
            const regex = /!\w+\s+(.+)/
            const match = message.body.match(regex)
            if (!match) throw new Error("debes ingresar el mensaje a enviar");
            query = match[1]
          }
            const client = characterSession[message.author].char
            const queryText = query
            const url = await client.senMessage(queryText)
            const media = await MessageMedia.fromUrl(url, { unsafeMime: true })
            const chatID = (await message.getChat()).id._serialized
            await message.reply(media, chatID, {
              // sendMediaAsDocument: true,
              sendAudioAsVoice: true,
            })
          
        } catch (error) {
          const chatid = (await message.getChat()).id._serialized
          await message.reply(error.message, chatid, {
            mentions: ['18292078938@c.us']
          })
          console.log(error)
        }
      }
}