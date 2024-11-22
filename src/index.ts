
import qrCode from "qrcode-terminal";
import chalk from 'chalk';
import { onMessageCreate } from "./functions/clientHandlleFuncs";
import { clientConfig } from "./config/clientConfig";
import { Client } from "whatsapp-web.js";


// console.time("init")
// await sleep(5000)
//console.timeEnd("end")
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
})

client.on('message_create',onMessageCreate)


client.initialize();


