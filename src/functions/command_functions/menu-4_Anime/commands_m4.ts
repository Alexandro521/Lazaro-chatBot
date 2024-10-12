
import { MessageMedia, Message} from "whatsapp-web.js";

export class CommandsAnime {
private static async commandStruct(
    message: Message,
    ReuquestUrl: string,
    option:{
        requestFailResponse: string,
    } = {
        requestFailResponse: "Ups a ocurrido un error :/\n\n"
    }
){
    try {
        const media = await MessageMedia.fromUrl(ReuquestUrl, { unsafeMime: true })
        await message.reply(media)
    }catch(error){
        console.log(error)
        await message.reply(option.requestFailResponse + error )
    }
}
static async loli(message: Message) {
    await this.commandStruct(message, `https://delirius-api-oficial.vercel.app/api/loli`)
}
static async neko(message: Message) {
    await this.commandStruct(message, `https://delirius-api-oficial.vercel.app/api/neko`)
}
static async foxgirl(message: Message) {
    await this.commandStruct(message, `https://delirius-api-oficial.vercel.app/api/foxgirl`)
}
static async lolipc(message: Message) {
    await this.commandStruct(message, `https://delirius-api-oficial.vercel.app/api/lolipc`)
}

}
/*
| <--comandos de Anime-->

- 🍚 *!loli* obten imagen de una loli

- 🍚 *!neko* obten imagen de una neko

- 🍚 *!foxgirl* obten imagen de una foxgirl

- 🍚 *!lolipc* obten imagen de una loli 

*/