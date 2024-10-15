import { client } from "../bot";
import { GroupNotification, Message} from "whatsapp-web.js";
import { commandList } from "../Admin/comandList";
const qrcode = require("qrcode-terminal");

export class clientFunc {
  static async Ready() {
    console.log("Client is ready!");
  }
  static async Auth() {
    console.log("AUTHENTICATED");
  }
  static async Loading(percent: string, message: string) {
    console.log("LOADING SCREEN", percent, message);
  }
  static async AuthError(error: string) {
    console.log("AUTH ERROR", error);
  }
  static async QR(qr: string) {
    const code = qrcode.generate(qr, { small: true });
    console.log("QR CODE", code);
  }
  static async AdminChange(notification: GroupNotification) {
    console.log("Adimistrador")
  }
  static async GroupLeave(notification: GroupNotification) {
    console.log("leave", notification);
  }
  static GroupUpdate(notification: GroupNotification) {
    // Group picture, subject or description has been updated.
    console.log("update", notification);
  }
  static async GroupJoin(notification: GroupNotification) {

  }
  static async MessageRevokeEveryone(after: Message, before: Message) {

  }
  static async MessageCreate(Message: Message) {
      console.log(Message.body)
      if (Message.body === commandList.general.botOn.c_name) {
            commandList.general.botOn.on({text:"Hola mundo 🌎",Message});
      } 
    } 
  }

