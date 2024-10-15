import { GroupNotification, Message} from "whatsapp-web.js";
import { CommandList } from "../Admin/comandList";
import { client } from "../index";
import { schemas } from "../schemas/textSchemas.js";
const qrcode = require("qrcode-terminal");

export class clientFunc {
  static async Ready() {
    console.log("Client is ready!");

    //const media = await MessageMedia.fromFilePath(schemas.botInit.img);

    console.log("Enviando mensaje");

    /*const groupsIdList:groupList = await JSON.parse(groupsList)

         //puesto de manera manual temporalmente */
    //groupsIdList.forEach(async (groupID) => {
    await client.sendMessage("120363183730817172@g.us", schemas.botInit.text);
    //});
  }
  static Auth() {
    console.log("AUTHENTICATED");
  }
  static Loading(percent: string, message: string) {
    console.log("LOADING SCREEN", percent, message);
  }
  static AuthError(error: string) {
    console.log("AUTH ERROR", error);
  }
  static QR(qr: string) {
    const code = qrcode.generate(qr, { small: true });
    console.log("QR CODE", code);
  }
  static async AdminChange(notification: GroupNotification) {
    const type: string = notification.type;

    if (type === "promote") {
      console.log(notification);
      console.log(`You were promoted by ${notification.author}`);
    } else if (type === "demote") console.log(notification);
    console.log(`You were demoted by ${notification.author}`);
  }
  static async GroupUpdate(notification: GroupNotification) {
    // Group picture, subject or description has been updated.
    console.log("update", notification);
  }
  static async GroupLeave(notification: GroupNotification) {
    // User has left or been kicked from the group.
    console.log("leave", notification);
    notification.reply("User left.");
    const c = await notification.getContact();
    console.log("--------------------");
    const profile = await client.getProfilePicUrl(notification.id + "@g.us");
    console.log(profile);
    console.log(c);
  }
  static async GroupJoin(notification: GroupNotification) {
    console.log("join", notification);
    notification.reply("User joined.");
    const c = await notification.getContact();
  }
  static async MessageRevokeEveryone(after: Message, before: Message) {
    const chat = await before?.getChat();
    if (chat?.isGroup) {
      console.log("after");
      console.log(after);

      if (before?.type === "image") {
        console.log(before);
        /*   const media = await new MessageMedia(before.mime,before.data.body)
                client.sendMessage(before.from,media,{caption:  `el que nada teme nada borra`+ ` @${before.data.id.participant.replace('@c.us','')} eh aqui lo que borraste \n ${before.data.caption}`,
            mentions: [before.data.id.participant]})*/
      } else {
        // console.log('before')
        // const mentions = [before.data.id.participant]
        // const contact = await before?.getContact()
        // console.log(contact)
        // console.log(before); // message before it was deleted.
        // client.sendMessage(before.from,
        //  'el que nada teme nada borra'+ ` @${before.data.id.participant.replace('@c.us','')} eh aqui lo que borraste \n`+
        //  '\n`'+ before?.data.body +'`'
        // ,{mentions})
      }
    }
  }
  static async MessageCreate(message: Message) {
      if (message.body === CommandList.general.botON.x) {
        await CommandList.general.botON.exec(message,"Hola mundo 🌎")
      } 
    } 
  }

