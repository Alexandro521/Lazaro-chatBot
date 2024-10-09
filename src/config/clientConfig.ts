import { LocalAuth,NoAuth} from "whatsapp-web.js"

const WWEBVERSION = '2.2410.1'
export const Config = {
    puppeteer:{
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
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${WWEBVERSION}.html`,
        },
    authStrategy:  new LocalAuth({
        dataPath:"AuthData"
    }),

    
}

 