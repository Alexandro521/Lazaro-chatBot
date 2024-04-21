const { Client, LocalAuth} = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
const {schemas}= require('./schemas/textSchemas')
const {search,youtubeSearch,youtubeDwonMedia} = require('./services/services')
const qrcode = require('qrcode-terminal');

const client = new Client({
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
        },
    authStrategy: new LocalAuth({
        dataPath: 'AuthData'
    }),
});
client.on('ready',async () => {
    console.log('Client is ready!');
    const media = await MessageMedia.fromFilePath(schemas.botInit.img)
    console.log('Enviando mensaje')
    groupsID = ['120363183730817172@g.us','120363240013356303@g.us']//puesto de manera manual temporalmente
    groupsID.forEach( async element => {
    await client.sendMessage(element,media,{
        caption:schemas.botInit.text
    })
})

    //message.reply(Msg,message.all,{caption:title});
    
});
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});


client.on('message',async message => {
    try{
    const msg = message.body
    console.log(message.body)

    function sendMsg(Msg){
		client.sendMessage(message.from,Msg);
    }
    function sendReply(Msg,title = ''){
		message.reply(Msg,message.from,{caption:title});
    }
	if (msg === '!bot on') {
        sendMsg('hola mundo 🌍')
	}
    else if (msg === '!bot off') {
        sendMsg('Adios mundo cruel 😩')
	}
    else if(msg === '!menu'){
        const media = await MessageMedia.fromFilePath(schemas.menu.img)
        sendReply(media,schemas.menu.text)
    }
    else if (msg.startsWith('!img')) {

        const  regex = /!img(.+)/;
        const  searchText = msg.match(regex);

        if (searchText && searchText.length > 1) {
            const clearSearchText = searchText[1].trim();
            const data = await search(clearSearchText
            );
            const media = await MessageMedia.fromUrl(data.img,{unsafeMime:true});
            sendReply(media,data.title);

        } else {
            console.log("No se encontró coincidencia.");
            sendReply('especifica el texto de la imagen a buscar')
        }
    }
    else if (msg === '!everyone') {
        const chat = await message.getChat();
        let text = '';
        let mentions = [];    
        for (let participant of chat.participants) {
            mentions.push(`${participant.id.user}@c.us`);
            text += `@${participant.id.user} `;
        }
        await chat.sendMessage(text, { mentions });
    }
    else if(msg.startsWith('!test_gay')){
        const metionUser = await message.getMentions()
        let randomNumber = Math.floor(Math.random()*100)
        const imgList = [
            './public/lo_suponia/Gay.jpg',
            './public/lo_suponia/gay2.jpg',
            './public/lo_suponia/gay3.jpg',
            './public/lo_suponia/gay4.jpeg',
            './public/lo_suponia/gay5.jpg'
        ]//abierto a que se agreguen mas imagenes
        let img = null
        if(randomNumber < 70){
          img = imgList[Math.floor(Math.random()*5-1)]
        }else if(randomNumber > 70 && randomNumber < 90){
          img = './public/lo_suponia/lo_ultra_suponia.jpeg'
        }else if(randomNumber > 90){
          img = './public/lo_suponia/lo_ultra_mega_suponia.jpeg'
        }
        const media = await MessageMedia.fromFilePath(img);
        if(!metionUser[0]){
          const user = await message.getContact();
          const text = `@${user.id.user} es ${randomNumber}% homosexual 🏳️‍🌈🏳️‍🌈🏳️‍🌈 `;
          client.sendMessage(message.from,media,{
             caption: text,
             mentions : [`${user.id.user}@c.us`]
            });
        }else{
           const text = `@${metionUser[0].id.user} es ${randomNumber}% homosexual 🏳️‍🌈🏳️‍🌈🏳️‍🌈 `
           client.sendMessage(message.from,media,{
               caption: text,
               mentions : [`${metionUser[0].id.user}@c.us`]
           });
    }}  
    else if(msg.startsWith('!yts')){

        const  expresionRegular = /!yts(.+)/;
        const  searchText = msg.match(expresionRegular);
        if (searchText && searchText.length > 1) {
            const parteCapturada = searchText[1].trim();
            sendReply(`🤖Buscando en youtube ${parteCapturada}...`)
            const data = await youtubeSearch(parteCapturada)
            let text = ''
            let i = 0
            data.results.forEach((element,index) => {
                text += `

📺 *${i+=1}. ${element.title}*
    🔗 [${element.url}]
    👤  canal: ${element.author}
    👁  vistas: ${element.views}
    ⏰  duracion: ${element.duration}
    📆  fecha: ${element.date}`
            })

        const media = await MessageMedia.fromUrl(data.results[0].img,{unsafeMime:true})
        sendReply(media,`
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
    else if(msg.startsWith('!ytd')){
        //!necesita mantenimiento
        const  regex = /!ytd(.+)/;
        const  searchLink = msg.match(regex);
        if (searchLink && searchLink.length > 1) {
            const clearSearchLink = searchLink[1].trim();
            sendReply(`🤖Porfavor espere un momento...`)
            const obj = await youtubeDwonMedia(clearSearchLink)
            const media = await MessageMedia.fromUrl(obj.cover)
            sendReply(media,{
                caption:`
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
    else if(msg.startsWith('!ytmp3')){
        const  regex = /!ytmp3(.+)/;
        const  downLink = msg.match(regex);
        if (downLink && downLink.length > 1) {
            const link = downLink[1].trim();
            const ISlink = link.startsWith('https://www.youtube.com/watch');
            if (ISlink) {
                sendReply(`🤖Porfavor espere un momento mientras s  e descarga su audio...`);
                const Audio = await MessageMedia.fromUrl('http://localhost:1024/services/ytmp3?ytdLink='+link,{unsafeMime:true});
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
    else if(msg === '!version'){
      sendMsg('lazaro Bot version ALPHA 1.6')
    }

}catch(error){
    console.log(error)
    sendMsg('Ups ah ocurrido algo')
}
});

client.initialize();

