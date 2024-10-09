import axios from "axios";
import  { Message } from "whatsapp-web.js";
import { client } from "../../index";
import { schemas } from "../../schemas/textSchemas";
import { mangaHeaderInfo } from "../../interfaces/mangaHeaderInfo";
import { MessageMedia } from "whatsapp-web.js";
export class Commands{
 

  static  async botOn(text:string,Message:Message){
        client.sendMessage(Message.from,text)
    }
   static async StickerCreate(Message:Message){

        if(Message.hasMedia){
            await Message.reply('🤖 Debes enviar una imagen para que funcione el comando')
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
    }
   /* async _testName(){
        console.log(`menssage: ${this.Message}`)
    
        if(!this.Message.hasQuotedMsg){
            return
        }        
        let responseMsg = await this.Message.getQuotedMessage()

        if (!responseMsg.id.fromMe){
                return
            }
        const searchText = this.Message.body.match( /#(.+)/);
        const textLength = searchText?.length > 1

        if (!searchText && !textLength) {
            return
        }

        const number = Number.parseInt(searchText[1].trim())
        this.Message.reply(`buscando ${number}...`,this.Message.from)
               
        const text =  this.Message.body

        console.log(text)
        if (text.includes("class-nvs")) {

            this.Message.react("📕");
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
            this.Message.reply(
                media,
                this.Message.from,{
                    caption:`
        ${headerText}
        ${chapterList}
                    `});

        } else if (text.includes("class-nvi")) {
            Message.react("📖");
            const list = text.split("🆔");
            console.log(list);
            const searchID = list[number].match(rege);
            console.log(searchID);
            const id = searchID[0]
                .replace("[", "")
                .replace("]", "")
                .trim();
            console.log(id);
            Message.react("📥");

            sendReply(
                "descaragando pdf de " +
                id +
                " 📄 Antes de enviar el PDF, queremos informarte de que el proceso puede tardar entre 1 y 2 minutos. Por favor, ten paciencia durante este tiempo. Si después de esperar este período no recibes nada, por favor inténtalo de nuevo. ¡Gracias por tu comprensión! 🕒"
            );

            const media = await MessageMedia.fromUrl(
                `http://localhost:1024/services/pdf/${id}`,
                { unsafeMime: true, sendAsDocument: true }
            );

            sendReply("Archivo descargado con !exito, Enviando...");

            Message.react("📤");

            await client.sendMessage(Message.from, media, {
                sendAsDocument: true,
            });
        } else if (text.includes("class-yts")) {
            const list = text.split("📺");
            const select = list[number].match(/\{.+\}/g);
            const id = select[0]
                .replace("{", "")
                .replace("}", "")
                .trim();
            sendReply(
                `🤖Porfavor espere un momento mientras s  e descarga su audio...`
            );
            const Audio = await MessageMedia.fromUrl(
                "http://localhost:1024/services/ytmp3?ytdLink=" + id,
                { unsafeMime: true }
            );
            sendReply(Audio);
            sendReply("Archivo descargado Exitosamente!");
        }



        }
    */
}