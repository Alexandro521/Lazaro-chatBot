import chalk from "chalk"
import { Message,Chat } from "whatsapp-web.js"

export function messageInfo(message: Message,chat: Chat) {
    console.log(chalk.greenBright('...........................||> Mensaje recibido <||...............................'))
    console.log(chalk.redBright('chat:'),chalk.yellowBright(chat.name))
    console.log(chalk.redBright('es un grupo:'),chalk.yellowBright(chat.isGroup))
    console.log(chalk.redBright('chat id:'),chalk.yellowBright(message.from))
    console.log(chalk.redBright('Autor:'), chalk.blue(message.author))
    console.log(chalk.redBright('mensaje:'),chalk.greenBright(message.body))
    console.log(chalk.redBright('tiempo de envio:'),chalk.yellowBright( (new Date(message.timestamp*1000)).toLocaleString()))
    console.log(chalk.redBright('message ID:'),chalk.yellowBright(message.id._serialized))
    console.log(chalk.greenBright('.............................................................................'))
  }