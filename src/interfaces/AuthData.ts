import { Message } from "whatsapp-web.js";
import { Command } from "./comandList";
 interface Data {
     status: boolean
     commandProps:Command
     Message:Message
}
export type AuthData  = Partial<Data>