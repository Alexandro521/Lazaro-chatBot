
import qrCode from "qrcode-terminal";
import chalk from 'chalk';
import { onMessageCreate } from "./functions/clientHandlleFuncs";
import { getCommandList } from "./functions/initJSonCreator";
import { clientConfig } from "./config/clientConfig";
import { Client } from "whatsapp-web.js";

await getCommandList()

export const client = new Client(clientConfig);

client.on('authenticated', ()=>{
    console.log(chalk.blue("Authenticated"))
})
client.on('loading_screen', (percent,message)=>{
    console.log(chalk.yellow(percent)+'%',chalk.blue(message))
})
client.on('disconnected',(reason)=>{
    console.log(reason)
    client.initialize()
})
client.on('qr',(qr)=>{
    qrCode.generate(qr,{small:true})
})
client.on('ready',async ()=>{
    console.log(chalk.blue("Ready"))
   /* const chats = await client.getChats()
    const insert:insertType = []
    chats.forEach(async (chat)=>{

        console.log(chalk.cyanBright('----------------------------------'))
            console.log(chalk.greenBright(chat.name))
            console.log(chalk.redBright(chat.id._serialized))
            console.log(chalk.yellowBright(chat.isGroup))
            console.log(chalk.cyanBright('----------------------------------'))
        
        insert.push({id:chat.id._serialized,is_group:chat.isGroup,chat_name:chat.name})

        
    })
    await CommandsConfig.register_chat(insert)
    */
})

client.on('message_create',onMessageCreate)


client.initialize();


