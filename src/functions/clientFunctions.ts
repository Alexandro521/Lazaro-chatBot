import {GroupNotification, Message, MessageMedia } from "whatsapp-web.js";
import type { groupList } from "../types/types.ts";
import { client}  from "../index";
import {schemas} from '../schemas/textSchemas.js';
import { Commands } from "./commands/command";
const qrcode = require('qrcode-terminal');
//const groupsList = require("../data/groupsList")


export  class clientFunc{
  
     static async Ready(){
        console.log("Client is ready!");

        //const media = await MessageMedia.fromFilePath(schemas.botInit.img);
    
        console.log("Enviando mensaje");
    
        /*const groupsIdList:groupList = await JSON.parse(groupsList)

         //puesto de manera manual temporalmente */
        //groupsIdList.forEach(async (groupID) => {
            await client.sendMessage("120363183730817172@g.us", schemas.botInit.text);
        //});
    }
  static  Auth(){
    console.log('AUTHENTICATED');
    }
  static  Loading(percent:string,message:string){
        console.log('LOADING SCREEN', percent, message);
    }
  static  AuthError(error:string){
        console.log('AUTH ERROR', error);
    }
  static  QR(qr:string){
    qrcode.generate(qr, {small: true});
    }
    static async AdminChange(notification:GroupNotification){
        const type:string = notification.type;

        if (type === "promote") {
            console.log(notification)
            console.log(`You were promoted by ${notification.author}`);
        } else if (type === 'demote')
            console.log(notification)
            console.log(`You were demoted by ${notification.author}`);
    }
 static   async GroupUpdate(notification:GroupNotification){
        // Group picture, subject or description has been updated.
        console.log('update', notification);
    }
static async GroupLeave (notification:GroupNotification) {
        // User has left or been kicked from the group.
        console.log('leave', notification);
        notification.reply('User left.');
        const c =await notification.getContact()
        console.log('--------------------')
        const profile =await client.getProfilePicUrl(notification.id+'@g.us')
        console.log(profile)
        console.log(c)
    }
 static   async GroupJoin (notification:GroupNotification) {
        console.log('join', notification);
        notification.reply('User joined.');
       const c =await notification.getContact()

    }
static    async MessageRevokeEveryone(after:Message,before:Message){

        const chat = await before?.getChat()
        if(chat?.isGroup){
            console.log('after')
             console.log(after); 
     
            if (before?.type === 'image') {
                console.log(before)
             /*   const media = await new MessageMedia(before.mime,before._data.body)
                client.sendMessage(before.from,media,{caption:  `el que nada teme nada borra`+ ` @${before._data.id.participant.replace('@c.us','')} eh aqui lo que borraste \n ${before._data.caption}`,
            mentions: [before._data.id.participant]})*/
            }
            else{
            // console.log('before')
            // const mentions = [before._data.id.participant]
    
            // const contact = await before?.getContact()
            // console.log(contact)
            // console.log(before); // message before it was deleted.
            // client.sendMessage(before.from,
            //  'el que nada teme nada borra'+ ` @${before._data.id.participant.replace('@c.us','')} eh aqui lo que borraste \n`+
            //  '\n`'+ before?._data.body +'`'
            // ,{mentions})
        
    }}
    }
 static   async MessageCreate(message:Message){
        try {
           

            const msg = message.body
            console.log(msg)
            // function sendMsg(Msg:string) {
            //     client.sendMessage(message.from, Msg)
            // }
            // function sendReply(Msg:string, title = '') {
            //     message.reply(Msg, message.from, {
            //         caption: title, extra: {
            //             hd: true
            //         }
            //     });
            // }
            if (msg === '!bot on') {
                 await Commands.botOn("Hola mundo",message)
            }
            else if (msg === "!sticker") {

                 await Commands.StickerCreate(message)
            }

            else if (msg.startsWith("#")) {
                //await Commands._testName()
                console.log("hola")
            }
            else if (msg === '!bot off') {
                Commands.botOn('Adios mundo cruel 😩',message)
            }
        /*    else if (msg === '!menu') {
                message.react('📜')
    
                const media = await MessageMedia.fromFilePath(schemas.menu.img)
                sendReply(media, schemas.menu.text)
            }
            else if (msg === '!everyone') {
                message.react('🗣')
                const chat = await message.getChat();
                let text = '';
                let mentions = [];
                for (let participant of chat.participants) {
                    mentions.push(`${participant.id.user}@c.us`);
                    text += `@${participant.id.user}/n `;
                }
                await chat.sendMessage(text, { mentions });
            }
            else if (msg.startsWith('!test_gay')) {
                message.react('🏳️‍🌈')
    
                const metionUser = await message.getMentions()
                let randomNumber = Math.floor(Math.random() * 100)
                const imgList = [
                    './public/lo_suponia/Gay.jpg',
                    './public/lo_suponia/gay2.jpg',
                    './public/lo_suponia/gay3.jpg',
                    './public/lo_suponia/gay4.jpeg',
                    './public/lo_suponia/gay5.jpg'
                ]//abierto a que se agreguen mas imagenes
                let img = null
                if (randomNumber < 70) {
                    img = imgList[Math.floor(Math.random() * 5 - 1)]
                } else if (randomNumber > 70 && randomNumber < 90) {
                    img = './public/lo_suponia/lo_ultra_suponia.jpeg'
                } else if (randomNumber > 90) {
                    img = './public/lo_suponia/lo_ultra_mega_suponia.jpeg'
                }
                const media = await MessageMedia.fromFilePath(img);
                if (!metionUser[0]) {
                    const user = await message.getContact();
                    const text = `@${user.id.user} es ${randomNumber}% homosexual 🏳️‍🌈🏳️‍🌈🏳️‍🌈 `;
                    this.Client.sendMessage(message.from, media, {
                        caption: text,
                        mentions: [`${user.id.user}@c.us`]
                    });
                } else {
                    const text = `@${metionUser[0].id.user} es ${randomNumber}% homosexual 🏳️‍🌈🏳️‍🌈🏳️‍🌈 `
                    this.Client.sendMessage(message.from, media, {
                        caption: text,
                        mentions: [`${metionUser[0].id.user}@c.us`]
                    });
                }
            }
            else if (msg.startsWith('!yts')) {
    
                const expresionRegular = /!yts(.+)/;
                const searchText = msg.match(expresionRegular);
                if (searchText && searchText.length > 1) {
                    message.react('📺')
    
                    const parteCapturada = searchText[1].trim();
                    sendReply(`🤖Buscando en youtube ${parteCapturada}...`)
                    const data = await youtubeSearch(parteCapturada)
                    let text = ''
                    let i = 0
                    data.results.forEach((element, index) => {
                        text += `
    
    📺 *${i += 1}. ${element.title}*
        🔗 {${element.url}}
        👤  canal: ${element.author}
        👁  vistas: ${element.views}
        ⏰  duracion: ${element.duration}
        📆  fecha: ${element.date}`
                    })
    
                    const media = await MessageMedia.fromUrl(data.results[0].img, { unsafeMime: true })
                    sendReply(media, `
            class-yts
            🌟🔍 *¡Resultados de ${data.search}* 🔍🌟
            ${schemas.ytsResultHeader.text}
            ${text}
            ${schemas.lazaroFooter.text}
            `);
    
                } else {
                    console.log("No se encontró coincidencia.");
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!ytd')) {
                //!necesita mantenimiento
                const regex = /!ytd(.+)/;
                const searchLink = msg.match(regex);
                if (searchLink && searchLink.length > 1) {
                    message.react('👾')
    
                    const clearSearchLink = searchLink[1].trim();
                    sendReply(`🤖Porfavor espere un momento...`)
                    const obj = await youtubeDwonMedia(clearSearchLink)
                    const media = await MessageMedia.fromUrl(obj.cover)
                    sendReply(media, {
                        caption: `
    Muchas gracias por la espera!
    ${obj.title}
    -------
    *AUDIO*:
    formato: ${obj.mp3.formato}
    peso: ${obj.mp3.peso}Mb
    descargar: ${obj.mp3.down}
    --------
    *VIDEO*:
    formato: ${obj.mp4.formato}
    peso: ${obj.mp4.peso}Mb
    descargar: ${obj.mp4.down}
    [en un futuro esto sera mas accesible]`});
                } else {
                    console.log("No se encontró coincidencia.");
                    sendReply('🤖especifique un link de youtbe!')
                }
            }
            else if (msg.startsWith('!ytmp3')) {
                const regex = /!ytmp3(.+)/;
                const downLink = msg.match(regex);
                if (downLink && downLink.length > 1) {
                    message.react('🔊')
                    const link = downLink[1].trim();
                    const ISlink = link.startsWith('https://www.youtube.com/watch');
                    if (ISlink) {
                        sendReply(`🤖Porfavor espere un momento mientras se descarga su audio...`);
                        const Audio = await MessageMedia.fromUrl('http://localhost:1024/services/ytmp3?ytdLink=' + link, { unsafeMime: true });
                        sendReply(Audio)
                        sendReply('Archivo descargado Exitosamente!')
                    } else {
                        sendReply('!Esto no es una url valida a youtube')
                    }
                } else {
                    console.log("No se encontró coincidencia.");
                    sendReply('especifica una url de youtube!')
                }
            }
            else if (msg === '!version') {
                message.react('🔌')
    
                sendMsg('lazaro Bot version ALPHA 1.8')
            }
            else if (msg.startsWith('!nvs') || msg.startsWith('!nvc')) {
    
                const regex = msg.startsWith('!nvs') ? /!nvs(.+)/ : /!nvc(.+)/;
                const searchText = msg.match(regex);
                if (searchText && searchText.length > 1) {
                    message.react('📚')
                    const url = msg.startsWith('!nvs') ? 'http://localhost:1024/services/nvs?q=' : 'http://localhost:1024/services/nvs-c?q='
                    const text = searchText[1].trim();
                    sendReply(`buscando ${text}...`)
                    const data = await axios.get(`${url}${text}`)
                    let textResult = ''
                    if (data.data.result.length < 1) {
                        sendReply('404 no hay resultados para tu busqueda')
                    }
                    let i = 0
                    data.data.result.forEach(element => {
                        textResult += `
    
    ⭐(${i += 1})   
    *id*:
     [ ${element.id} ]
     
     🖋    *titulo:* ${element.title}
    ☀    *calificacion* ${element.bookRate}/5
    📘    *tipo de obra*: ${element.typeManga}
    👁    *vistas*: ${element.views}
    📅    *Fecha de ultima actualizacion*: ${element.dataTime}
    📚    *generos*: ${element.genres.join(',')}
    📄    *descripcion*: ${element.description}
    
    |------------------------->
                    `
                    })
                    const media = await MessageMedia.fromUrl(data.data.result[0].img, { unsafeMime: true })
                    sendReply(media, `
    class-nvs
    Resultados de: 🔍${text}
    📎${data.data.result.length} Resultados
    |------------------------>
    ${textResult}
                `)
                } else {
                    sendReply('especifica un texto a buscar')
                }
            }
            else if (msg.startsWith('!nvi')) {
                const regex = /!nvi(.+)/;
                const searchText = msg.match(regex);
                if (searchText && searchText.length > 1) {
                    message.react('📕')
                    const text = searchText[1].trim();
                    sendReply(`buscando ${text}...`)
                    const data = await axios.get(`http://localhost:1024/services/nvi?q=${text}`)
                    const element = data.data
    
                    let headerText = `
    class-nvi
    🖋    *titulo:* ${element.title}
    ☀    *calificacion* ${element.rate}/5                                                    
    📘    *tipo de obra*: ${element.bookType}
    👁    *vistas*: ${element.views}
    📚    *generos*: ${element.genres.join(',')}
    📄    *descripcion*: ${element.description}
    
    |------------------------->
    
    `    ;
                    let chapterList = ''
                    let i = 0;
                    element.chaptersList.forEach(ele => {
                        chapterList += `
    🆔 (${i += 1}) 
    *capitulo id*: 
    [ ${ele.chapterId} ]
       -  *titulo cap*: ${ele.chapterTitle} 
       -  *vistas cap*: ${ele.chapterViews}  
       -  *fecha de lanzamiento*: ${ele.chapterDate}  
    |-------------------->
                    `
    
                    })
                    const media = await MessageMedia.fromUrl(element.img, { unsafeMime: true })
                    sendReply(media, `
    ${headerText}
    ${chapterList}
                `)
                }
                else {
                    sendReply('especifica un texto a buscar')
                }
            }
            else if (msg.startsWith('!nvd')) {
                const regex = /!nvd(.+)/;
                console.log(msg)
                const searchText = msg.match(regex);
                console.log(searchText)
                if (searchText[1].length > 1) {
                    message.react('📥')
    
                    const text = searchText[1].trim();
                    sendReply('descaragando pdf de ' + text + ' 📄 Antes de enviar el PDF, queremos informarte de que el proceso puede tardar entre 1 y 2 minutos. Por favor, ten paciencia durante este tiempo. Si después de esperar este período no recibes nada, por favor inténtalo de nuevo. ¡Gracias por tu comprensión! 🕒')
    
                    const media = await MessageMedia.fromUrl(`http://localhost:1024/services/pdf/${text}`, { unsafeMime: true, sendAsDocument: true })
                    sendReply('Archivo descargado con !exito, Enviando...')
                    message.react('📤')
                    sendReply(media)
                } else {
                    sendReply('especifica la id a descargar')
                }
            }
            else if (msg === '!nvg') {
                const url = await axios.get('http://localhost:1024/services/nv-cat')
                console.log(url.data)
                const data = url.data.Genres
    
                let text = data
                sendReply(`
    Lista de generos para buscar:
    
    ${text}
    `)
            }
            else if (msg.startsWith('!tts')) {
                const regex = /!tts(.+)/;
                console.log(msg)
                const searchText = msg.match(regex);
                console.log(searchText)
    
                if (searchText[1].length > 1) {
                    message.react('🎶')
                    const text = searchText[1].trim();
                    if (text.length > 100) {
                        sendReply('tu texto no puede contener mas 100 caracteres, envia algo mas corto porfavor')
                    } else {
                        sendReply('creando audio...')
    
                        const media = await MessageMedia.fromUrl(`http://localhost:1024/services/tts2?text=${text}`, { unsafeMime: true })
                        message.react('🔊')
                        sendReply(media)
                    }
                } else {
                    sendReply('debes escribir un texto!')
                }
            }
            else if (msg === '!menu2') {
                const media = await MessageMedia.fromUrl('https://as1.ftcdn.net/v2/jpg/01/65/36/64/1000_F_165366471_TAR6S3WcNuDfsbZQ6aaMC5UxzNYuJkId.jpg')
                sendReply(media,
                    '*Menu de frases* \n' +
                    '<-------0------>' +
                    '\n' +
                    '- !chiste ---> un chiste al azar \n\n' +
                    '- !fraseEdu ---> una frase educacional \n\n' +
                    '- !fraseEdu2 ---> mas frases educacionales \n\n' +
                    '- !fraseBonita ---> frases lindas \n\n' +
                    '- !fraseCitada ---> frases famosas de la historia \n\n' +
                    '- !graciosa ---> una frase con un tono ironico \n\n' +
                    '- !refran ---> un refran para personas sabias \n\n' +
                    '- !pregunta ---> una pregunta al azar \n\n' +
                    '- !cortas ---> una frase corta \n\n'
                )
            }
            else if (msg === '!chiste') {
                const res = await axios.get('http://localhost:1024/services/texto/1')
                sendReply(res.data.text)
            }
            else if (msg === '!fraseEdu') {
                const res = await axios.get('http://localhost:1024/services/texto/2')
                sendReply(res.data.text)
            }
            else if (msg === '!fraseEdu2') {
                const res = await axios.get('http://localhost:1024/services/texto/3')
                sendReply(res.data.text)
            }
            else if (msg === '!fraseBonita') {
                const res = await axios.get('http://localhost:1024/services/texto/4')
                sendReply(res.data.text)
            }
            else if (msg === '!fraseCitada') {
                const res = await axios.get('http://localhost:1024/services/texto/5')
                sendReply(res.data.text)
            }
            else if (msg === '!graciosa') {
                const res = await axios.get('http://localhost:1024/services/texto/6')
                sendReply(res.data.text)
            }
            else if (msg === '!cortas') {
                const res = await axios.get('http://localhost:1024/services/texto/7')
                sendReply(res.data.text)
            }
            else if (msg === '!refran') {
                const res = await axios.get('http://localhost:1024/services/texto/8')
                sendReply(res.data.text)
            }
            else if (msg === '!pregunta') {
                const res = await axios.get('http://localhost:1024/services/texto/9')
                sendReply(res.data.text)
            }
            else if (msg.startsWith('!send')) {
                const chat = await message.getChat()
                console.clear()
                const metionUser = await message.getMentions()
                console.log(message)
                console.log('======================')
                console.log(metionUser)
                console.log('<|--------------------------------|>')
                console.log(chat.participants)
                console.log('<|--------------------------------|>')
                if (msg.includes(':')) {
                    if (metionUser[0]) {
                        const regex = /:(.+)/g
                        const sendText = msg.match(regex)
                        console.log(sendText)
                        if (sendText && sendText[0].length >= 1) {
                            message.react('📮')
                            client.sendMessage(metionUser[0].id._serialized, sendText[0].replace(':', ''))
                            client.sendMessage(message.from, 'mensaje enviado exitosamente')
                        } else {
                            message.react('❌')
                            sendReply('error  \n verifique que  \n - el usuario etiquetado existe en el grupo  \n - que el mensaje a enviar sea mayor a un caracter  \n  si todo esta correcto y el error persiste porfavor comuniquese con: +18292078938')
                        }
                    } else {
                        const numberRegex = /#(.+:)/g
                        const msgRegex = /:(.+)/g
                        const number = msg.match(numberRegex)
                        const text = msg.match(msgRegex)
                        console.log(numberRegex)
                        if (number && text && number[0].length >= 8 && text[0].length >= 1) {
                            const numberID = number[0].replaceAll(':', '').replace('#', '').trim()
                            const isNumber = /\d+/g.test(numberID)
                            if (isNumber) {
                                message.react('📮')
                                client.sendMessage(numberID + '@c.us', text[0].replace(':', ''))
                                client.sendMessage(message.from, 'mensaje enviado exitosamente')
                            } else {
                                message.react('❌')
                                sendReply('Erro: numero de destinatario invalido')
                            }
                        } else {
                            message.react('❌')
                            sendReply('error \n parametro incorrecto, verifica bien que:  \n - el numero tiene minimo 8 caracteres  \n - al menos un caracter al enviar  \n si todo esta correcto y el error persiste porfavor comuniquese con: +18292078938')
                        }
    
                    }
                } else {
                    message.react('❌')
                    sendReply('Error: parametro requerido ":" ')
                }
            }
            else if (msg.startsWith('!lyricSearch')) {
                const regex = /!lyricSearch(.+)/
                const text = msg.match(regex)
                console.log(text)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/genius?q=${text[1].trim()}`)
                    const dataArray = data.data;
                    let sendText = ''
                    let i = 0
                    dataArray.forEach(element => {
                        sendText +=
                            `*[${i += 1}]🎶${element.fullTitle}*\n` +
                            `   - 🎙 Artista: ${element.artist.name}} \n` +
                            `   - ✒ liryc: {${element.url}} \n \n`
                    })
                    const media = await MessageMedia.fromUrl(dataArray[0].image, { unsafeMime: true })
                    sendReply(media,
                        `resultados de ${text[1].trim()}\n` +
                        `📎${dataArray.length} Resultados \n \n` +
                        sendText
                    )
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!getLyric')) {
                const regex = /!getLyric(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(
                        'https://delirius-api-oficial.vercel.app/api/lyrics?url=' +
                        text[1]);
                    sendReply('Aqui esta la letra de tu cancion  \n \n' + data.data.lyrics)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
    
            else if (msg.startsWith('!GLYSearch')) {
                const regex = /!GLYSearch(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/letra?query=${text[1].trim()}`)
                    const obj = data.data
                    const media = await MessageMedia.fromUrl(obj.data.image)
                    sendReply(media,
                        `*🎶${data.data.data.fullTitle}*\n\n` +
                        `- 🎙 Artista: ${obj.data.artist} \n` +
                        `- ✒ liryc: {${obj.data.lyrics}} \n\n\n`
                    )








                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!Pokemon')) {
                const regex = /!Pokemon(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const media = await MessageMedia.fromUrl(`https://delirius-api-oficial.vercel.app/api/pokecard?text=${text[1].trimStart().trimEnd()}`, {
                        unsafeMime: true
                    })
                    sendReply(media)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!pinterest')) {
                const regex = /!pinterest(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    console.log(text[1])
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/pinterest?text=${text[1].trim()}`)
                    const arr = data.data.result;
                    console.log(arr)
                    console.log(data.status)
                    const randomNumber = Math.floor(Math.random() * (arr.length - 1))
                    const media = await MessageMedia.fromUrl(arr[randomNumber].media.url, { unsafeMime: true })
                    sendReply(media, arr[randomNumber].title)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!Rule34')) {
                const regex = /!Rule34(.+)/
                const text = msg.match(regex)
                if (text && text[1].length > 1) {
                    console.log(text)
                    console.log(text[1])
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/rule34?query=${text[1].trim()}`)
                    if (data.status === 200) {
                        const res = data.data
                        const arr = res.images
                        const randomNumber = Math.floor(Math.random() * arr.length)
                        console.log(res)
                        console.log(arr)
                        const media = await MessageMedia.fromUrl(arr[randomNumber], { unsafeMime: true })
                        sendReply(media)
                    }
                } else {
                    sendReply('!especifica un texto a buscar');
    
                }
            }
            else if (msg.startsWith('!img')) {
                const regex = /!img(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/gimage?query=${text[1].trim()}`)
                    const arr = data.data.data;
                    console.log(arr)
                    const randomNumber = Math.floor(Math.random() * arr.length - 1)
                    const media = await MessageMedia.fromUrl(arr[randomNumber].url, { unsafeMime: true })
                    sendReply(media)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!img_Bing')) {
                const regex = /!img_Bing(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/bingimage?query=${text[1].trim()}`)
                    const arr = data.data.results;
                    const randomNumber = Math.floor(Math.random() * arr.length - 1)
                    const media = await MessageMedia.fromUrl(arr[randomNumber].thumbnail, { unsafeMime: true })
                    sendReply(media, arr[randomNumber].description)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!tik_tok')) {
                const regex = /!tik_tok(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/tiktoksearch?query=${text[1].trim}`)
                    const arrResult = data.data;
                    let textResult = ''
                    arrResult.meta.forEach(element => {
                        textResult += 'titulo: ' + element.title +
                            ' \n link: ' + element.hd + ' \n \n'
                    })
                    sendReply(
                        'resultados de tu busqueda  \n \n' + textResult
                    )
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!chatgpt')) {
                const regex = /!chatgpt(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/chatgpt?q=${text[1].trim()}`)
                    sendReply(data.data.data)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!BingChat')) {
                const regex = /!BingChat(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/bingia?query=${text[1].trim()}`)
                    sendReply(data.data.message)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!gpt-4')) {
                const regex = /!gpt-4(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/ia2?text=quien%20eres%20y%20quien%20es%20tu%20creador?&prompt=${text[1].trim()}`)
                    sendReply(data.data.gpt)
                } else {
                    sendReply('!especifica un texto a buscar');
                }
            }
            else if (msg.startsWith('!Gemini')) {
                const regex = /!Gemini(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/gemini?query=${text[1].trim()}`)
                    sendReply(data.data.message)
                } else {
    
                }
            }
            else if (msg.startsWith('!simi')) {
                const regex = /!simi(.+)/
                const text = msg.match(regex)
                if (regex && text[1].length > 1) {
                    const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/simi?text=${text[1].trim()}`)
                    sendReply(data.data.data.message)
                } else {
    
                }
            }
            else if (msg === '!loli') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/loli', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg === '!foxgirl') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/foxgirl', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg === '!lolipc') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/lolipc', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg === '!neko') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/neko', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg === '!china') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/china', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg === '!japan') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/japan', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg === '!boobs') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/boobs', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg === '!pack') {
                const media = await MessageMedia.fromUrl('https://delirius-api-oficial.vercel.app/api/girls', { unsafeMime: true })
                sendReply(media)
            }
            else if (msg.startsWith('!emojiFusion')) {
                const emojToHex = (emoji) => {
                    const emojiCode = emoji.codePointAt().toString(16)
                    const hexadecimalcode = String.fromCodePoint(parseInt(emojiCode, 16))
                    return encodeURIComponent(hexadecimalcode)
                }
                const regex = /!emojiFusion(.+)/
                const text = msg.match(regex)
                if (text && text[1].length > 1) {
                    if (text[1].includes('#')) {
                        const emojis = text[1].trim().split('#')
                        const emoji1 = emojToHex(emojis[0])
                        const emoji2 = emojToHex(emojis[1]);
                        console.log(emoji1)
                        const data = await axios.get(`https://delirius-api-oficial.vercel.app/api/mixed?emoji1=${emoji1}&emoji2=${emoji2}`)
                        if (!data.status) {
                            throw new Error('uno de tus emojis no esta soportado, intenta con algun otro')
                        }
                        const url = data.data.data.url
                        const media = await MessageMedia.fromUrl(url, { unsafeMime: true })
                        sendReply(media)
                    } else {
                        sendReply('valor nbo encontrado "#" ejemplo; !emojiFusion 🎃#🤑');
                    }
                } else {
                    sendReply('debes enviar dos emojis');
                }
    
            }
            else if (msg === '!universe') {
                const data = await nasa.PictureOfTheDay()
                const media = await MessageMedia.fromUrl(data.imageUrl, { unsafeMime: true })
                sendReply(media, data.title + '\n' + '\n' + data.description)
            }
            else if (msg === '!video') {
                const media = await MessageMedia.fromFilePath(process.cwd() + '/descarga.mp4')
                client.sendMessage(message.from, media)
            }*/
        } catch (error) {
            console.log(error)
            client.sendMessage(message.from, 'Ups ah ocurrido algo:' + error)
        }
    }
    }

