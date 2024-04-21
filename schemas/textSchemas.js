const schemas = {
 menu:{   
    img : "./public/lazaro.jpg",

    text: `🤖 *¡Bienvenido a Lázaro bot, version Alpha 1.6*


🌟 Aquí tienes una lista de comandos para explorar todas las funciones que ofrece Lázaro:
    
- 📸 *!img:* ¿Necesitas una imagen para alegrar tu día?

- 🎶 *!ytmp3:*${`<youtube video link>`} ¿Quieres escuchar música o un archivo de audio específico?
    
- 🌈 *!test_gay:* ¿Te preguntas si un amigo es gay o no?                         

- 🗣 *!everyone:* llama a todos los integrantes de un grupo

- 📺 *!yts <text>* busca cualquier video, impulsado por youtube

- 💾 *!ytd <yt link>* descargar videos u audios 

[Mas comandos en desarrollo 🛠 ]
`
},
 botInit:{
    img:"./public/lazaro.jpg",
    text: `-- lazáro ¡ ${`Activado`} ! --
    
    
    > ¡Hola Mundo! 🌍
    
    
    --- ${`Lázaro - Tu asistente virtual en WhatsApp`} ---
    
    👋 Lázaro está disponible y listo para recibir tus órdenes. 👨‍💻
    
    👉 Puedes ejecutar los comandos escribiendo "!menu". 📋
    
    ¡${`Gracias por usar Lázaro`} ! 🙌
`
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
 }
}
module.exports = {
    schemas

}