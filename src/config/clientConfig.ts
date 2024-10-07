import { LocalAuth } from "whatsapp-web.js"

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
    //webVersionCache: {
        //type: 'remote',
        //remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
      //  },
    authStrategy: new LocalAuth({
        dataPath: 'AuthData'
    }),

    
}
