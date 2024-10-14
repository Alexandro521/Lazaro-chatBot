
import { MessageMedia, Message} from "whatsapp-web.js";
import { ApiUrl } from "../../data/DelirusApisUrls";
export class CommandsAnime {
private static async commandStruct(
    Message: Message,
    ReuquestUrl: string,
    option:{
        requestFailResponse: string,
    } = {
        requestFailResponse: "Ups a ocurrido un error :/\n\n"
    }
){
    try {
        const media = await MessageMedia.fromUrl(ReuquestUrl, { unsafeMime: true })
        await Message.reply(media)
    }catch(error){
        console.log(error)
        await Message.reply(option.requestFailResponse + error )
    }
}
static async loli({Message}:{Message: Message}) {
    await this.commandStruct(Message, `https://delirius-api-oficial.vercel.app/api/loli`)
}
static async neko({Message}:{Message: Message}) {
    await this.commandStruct(Message, `https://delirius-api-oficial.vercel.app/api/neko`)
}
static async foxgirl({Message}:{Message: Message}) {
    await this.commandStruct(Message, `https://delirius-api-oficial.vercel.app/api/foxgirl`)
}
static async lolipc({Message}:{Message: Message}) {
    await this.commandStruct(Message, `https://delirius-api-oficial.vercel.app/api/lolipc`)
}

}
/*q88u87
| <--comandos de Anime-->

- 🍚 *!loli* obten imagen de una loli

- 🍚 *!neko* obten imagen de una neko

- 🍚 *!foxgirl* obten imagen de una foxgirl

- 🍚 *!lolipc* obten imagen de una loli 

*/