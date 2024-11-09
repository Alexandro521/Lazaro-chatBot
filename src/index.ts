
import { Client } from "whatsapp-web.js";
import { LocalAuth} from "whatsapp-web.js"
import { ClientHandlle } from "./functions/clientHandlleFuncs";
import qrCode from "qrcode-terminal";
import chalk from 'chalk';

export const client = new Client({
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/v2.2410.1.html`,
    },
    authStrategy: new LocalAuth({
        dataPath: "AuthData"
    }),
});
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

client.on('message_create',ClientHandlle.onMessageCreate)


client.initialize();


