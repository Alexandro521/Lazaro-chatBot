import axios from "axios";
import { Testgay,lazaroImg } from "../../../data/imagesUrl";
import { client } from "../../../index";
import { schemas } from "../../../schemas/textSchemas";
import { mangaHeaderInfo } from "../../../interfaces/mangaHeaderInfo";
import { MessageMedia,Message,GroupChat} from "whatsapp-web.js";
import { CommandList } from "../../../Admin/comandList";
import { Auth } from "../Auth";

export class Commands{
  static  async botOn(text:string,Message:Message){
      const props = CommandList._generals.botON.props
      //Auth(Message,)
       await client.sendMessage(Message.from,text)
       return
    }
   static async StickerCreate(Message:Message){

        if(!Message.hasMedia){
            await Message.reply('🤖 Debes enviar una imagen para que funcione el comando')
            return
        }

        const media =  await Message.downloadMedia();

        await client.sendMessage(Message.from, media, {
                sendMediaAsSticker: true,
                stickerAuthor: 'Lazaro Bot MD',
                stickerName: 'sticker'
            })
            .catch(async (error) => {
                await client.sendMessage(Message.from, 'No se pudo procesar el sticker');
                return;
            });
            return
    }
    //todo: Funciom pendiente a refactorizar{
   static async _testName(Message:Message){
        console.log(`menssage: ${Message}`)
    
        if(!Message.hasQuotedMsg){
            return
        }        
        let responseMsg = await Message.getQuotedMessage()

        if (!responseMsg.id.fromMe){
                return
            }
        const searchText = Message.body.match( /#(.+)/);
        const textLength = searchText?.length > 1

        if (!searchText && !textLength) {
            return
        }

        const number = Number.parseInt(searchText[1].trim())
       await Message.reply(`buscando ${number}...`,Message.from)
               
        const text =  Message.body

        console.log(text)
        if (text.includes("class-nvs")) {

            await Message.react("📕");
            console.log(text);
            const list = text.split("⭐");
            console.log(list);
            const searchID = list[number].match(/\[.+\]/g);

            console.log(searchID);

            const id = searchID[0]
                .replace("[", "")
                .replace("]", "")
                .trim();

            console.log(id);

            //!Cambio pendiente{       
            const response = await axios.get(
                `http://localhost:1024/services/nvi?q=${id}`
            );
            //!}     

            const mangaData:mangaHeaderInfo = response.data

            let headerText = schemas.mangaHeaderInfo({ element: mangaData });
            let chapterList = "";
            mangaData.chaptersList.forEach((chapterData:any, index:number) => {
                chapterList += schemas.mangaChapterSchemaInfo({
                    chapterData,
                    index,
                });
            });

            const media = await MessageMedia.fromUrl(mangaData.img, {
                unsafeMime: true,
            });
            await Message.reply(
                media,
                await Message.from,{
                    caption:`
        ${headerText}
        ${chapterList}
                    `});

        } else if (text.includes("class-nvi")) {
            Message.react("📖");
            const list = text.split("🆔");
            console.log(list);
            const searchID = list[number].match(/\[.+\]/g);
            console.log(searchID);
            const id = searchID[0]
                .replace("[", "")
                .replace("]", "")
                .trim();
            console.log(id);
           await Message.react("📥");

           await Message.reply(
                "descaragando pdf de " +
                id +
                " 📄 Antes de enviar el PDF, queremos informarte de que el proceso puede tardar entre 1 y 2 minutos. Por favor, ten paciencia durante este tiempo. Si después de esperar este período no recibes nada, por favor inténtalo de nuevo. ¡Gracias por tu comprensión! 🕒",Message.from
            );

            const media = await MessageMedia.fromUrl(
                `http://localhost:1024/services/pdf/${id}`,
                { unsafeMime: true }
            );

            await Message.reply("Archivo descargado con !exito, Enviando...",Message.from);

            Message.react("📤");

            await client.sendMessage(Message.from, media);
        } else if (text.includes("class-yts")) {
            const list = text.split("📺");
            const select = list[number].match(/\{.+\}/g);
            const id = select[0]
                .replace("{", "")
                .replace("}", "")
                .trim();
            await Message.reply(
                `🤖Porfavor espere un momento mientras s  e descarga su audio...`,
                Message.from
            );
            const Audio = await MessageMedia.fromUrl(
                "http://localhost:1024/services/ytmp3?ytdLink=" + id,
                { unsafeMime: true }
            );
            await Message.reply(Audio,Message.from);
            await Message.reply("Archivo descargado Exitosamente!",Message.from);
        }


        return
        }
    //todo: }
    static async main(Message:Message){ 
        try{
        await Message.react('📜')
    
        const media = await MessageMedia.fromFilePath(lazaroImg);
        await Message.reply(media,Message.from,{caption:schemas.menu.text})
        }catch(error){
            console.log(error)
        }
    }
    static async Everyone(Message:Message){
        try{
        await Message.react('🗣')
        const chat= <GroupChat> await Message.getChat()
        if(!chat.isGroup){
            Message.reply('Este comando solo puede ser usado enviado en grupos',Message.from)
        }
        let text = '';
        let mentions = [];
        for (let participant of chat.participants) {
            mentions.push(`${participant.id.user}@c.us`);
            text += `@${participant.id.user}/n `;
        }
        await client.sendMessage(Message.from,text, { mentions });
        }catch(error){
            console.log(error)
        }
    }
    static async test_gay(message:Message){{
        try {
            message.react('🏳️‍🌈')
    
            const metionUser = await message.getMentions()
            let randomNumber = Math.floor(Math.random() * 100)
            const imgList = Testgay.imgList
            let img;

            if (randomNumber < 70) {
                img = imgList[Math.floor(Math.random() * 5 - 1)]

            } else if (randomNumber > 70 && randomNumber < 90) {

                img = Testgay.porcent70

            } else if (randomNumber > 90) {

                img = Testgay.porcent90

            }
            const media = await MessageMedia.fromFilePath(img);
            if (!metionUser[0]) {
                const user = await message.getContact();
                const text = `@${user.id.user} es ${randomNumber}% homosexual 🏳️‍🌈🏳️‍🌈🏳️‍🌈 `;
                await client.sendMessage(message.from, media, {
                    caption: text,
                    mentions: [`${user.id.user}@c.us`]
                });
            } else {
                const text = `@${metionUser[0].id.user} es ${randomNumber}% homosexual 🏳️‍🌈🏳️‍🌈🏳️‍🌈 `
                client.sendMessage(message.from, media, {
                    caption: text,
                    mentions: [`${metionUser[0].id.user}@c.us`]
                });
            }
        } catch (error) {
            console.log(error)
        }}
    }
}