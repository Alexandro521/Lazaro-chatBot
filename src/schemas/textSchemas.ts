import type{ mangaHeaderInfo } from "../interfaces/mangaHeaderInfo"
export const schemas = {
 menu:{   
    img : "./public/lazaro.jpg",

    text: `🤖 *¡Bienvenido a Lázaro bot, version Alpha 1.8*


🌟 Aquí tienes una lista de comandos para explorar todas las funciones que ofrece Lázaro:
    

- 🎶 *!ytmp3:*${`<youtube video link>`} ¿Quieres escuchar música o un archivo de audio específico?
    
- 🌈 *!test_gay:* ¿Te preguntas si un amigo es gay o no?                         

- 🗣 *!everyone:* llama a todos los integrantes de un grupo

- 📺 *!yts <text>* busca cualquier video, impulsado por youtube

- 💾 *!ytd <yt link>* descargar videos u audios (fuera de servicio temporalmente)

- 🔊 *!tts <texto>* convierte texto a audio v 1.0

- 📚  *!nvs <texto>* haz busquedas de mangas u novelas

- 📘 *!nvc <nombre de categoria>* haz busquedas de mangas u novelas por sus generos

- 📕 *!nvi <id>* obten informacion de una novela o manga por su id, la informacion incluye lista de capitulos y id de capitulos

- 📖 *!nvd <capitulo id>*  descarga un capitulo de una novela u manga en formato pdf por el id del capitulo

- 📜 *!nvg* obten una lista de generos, util para el comando "!nvc"

- 🤖 *!version* verificar la version del bot 

- 📷 *!s* <imagen> crea un sticker a partir de una imagen adjunta

- 📜 *!menu* ver lista de comandos

- 🥠 *!menu2*  menu de frases

- 😀 *!emojiFusion* 😀#🤖 crea imagenes fusionando dos emojis

- 📮 *!send* *#* <number> *:* <mensaje a enviar> 
   -  envia mensajes a un numero destinatario de tu eleccion, en grupos puedes obviar el prefijo *#* y etiquetar a un usuario con el arroba @

| <--comandos de busqueda-->

- ✒ *!lyricSearch* buscador de letras de canciones

- ✒ *!getLyric* <link> obtiene la letra de una cancion mediante el enlace proporcionados por !lyricSearch

- ✒ *!GLYSearch* obten la letra de una cancion directamente solo por su nombre

- 🎱 *!pokemon* busca pokemones y obten su carta

- 📷 *!pinterest* busca imagenes en pinterest

- 📷 *!img_Bing* busca imagenes con Bing

- 📸 *!img:* ¿Necesitas una imagen para alegrar tu día?

- 🎭 *!tik_tok* haz busquedas en tik tok (comando en desarrollo♻)

| <--comandos de Intenligencia Artificial-->

- 🤖 *!chatgpt* conversa con chat gpt v3.5

- 🤖 *!BingChat* conversa con Bing chat 

- 🤖 *!gpt-4* conversa con chat gpt v4

- 🤖 *!Gemini* conversa con Gemini chat

- 🤖 *!simi* envia un mensaje y obten una respuesta random

| <--comandos de 🔞 Nsfw-->

- 🔞 *!Rule34* busca en rule 34

- 🔞 *!japan* obten imagenes subidas de tono

- 🔞 *!china* obten imagenes subidas de tono

- 🔞 *!boobs* obten imagenes subidas de tono

- 🔞 *!pack* obten imagenes subidas de tono


| <--comandos de Anime-->

- 🍚 *!loli* obten imagen de una loli

- 🍚 *!neko* obten imagen de una neko

- 🍚 *!foxgirl* obten imagen de una foxgirl

- 🍚 *!lolipc* obten imagen de una loli 


[Mas comandos en desarrollo 🛠🤖 ]
`
},
 botInit:{
    img:"./public/lazaro.jpg",
    text: 'hola mundo'/*'「Lázaro `¡ACTIVADO!`」\n' +
    '    \n' +
    '> --- Lázaro - Tu asistente virtual en WhatsApp ---\n' +
    '    \n' +
    '- 👋 Lázaro está disponible y listo para recibir tus órdenes. 👨‍💻\n' +
    '- 👉 Puedes ejecutar los comandos escribiendo "!menu". 📋\n' +
        '\n' +
    '¡Gracias por usar Lázaro ! 🙌'*/
 },
 ytsResultHeader:{
    text: `
    ✨ ¡Utiliza [!ytmp3 <link youtube>] para descargar en video u audio! ✨
                
    |---------------------------------------------------------------------------|  
  
    `
 },
 lazaroFooter:{
    text: `
    -------
    Fuente Lázaro 🤖
    -----`
 },
 mangaHeaderInfo: ({element}:{element:mangaHeaderInfo})=>{
 return ( `
class-nvi
 🖋    *titulo:* ${element.title}
 ☀    *calificacion* ${element.rate}/5                                                    
 📘    *tipo de obra*: ${element.bookType}
 👁    *vistas*: ${element.views}
 📚    *generos*: ${element.genres.join(',')}
 📄    *descripcion*: ${element.description}
 
 |------------------------->
            
            `)
 },
 mangaChapterSchemaInfo: ({chapterData,index})=>{
   return(
      `
      🆔 (${index++}) 
      *capitulo id*: 
      [ ${chapterData.chapterId} ]
         -  *titulo cap*: ${chapterData.chapterTitle} 
         -  *vistas cap*: ${chapterData.chapterViews}  
         -  *fecha de lanzamiento*: ${chapterData.chapterDate}  
      |-------------------->
                                  `
   )
 }
}
