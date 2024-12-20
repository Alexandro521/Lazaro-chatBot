import { LocalAuth, ClientOptions } from "whatsapp-web.js";

export const clientConfig: ClientOptions = {
  //ffmpegPath: "C:\\PATH_Programs-ytdpl\\ffmpeg.exe",
  
   puppeteer: {
  //  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  },
  webVersionCache: {
    type: "remote",
    remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/v2.2410.1.html`,
  },
  authStrategy: new LocalAuth({
    dataPath: "AuthData",
  }),
};
