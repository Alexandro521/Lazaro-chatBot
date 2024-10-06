import type { Client, GroupNotification, Message, MessageMedia } from "whatsapp-web.js";
import type { groupList } from "../types/types.ts";
import {schemas} from '../schemas/textSchemas.js';
const qrcode = require('qrcode-terminal');

const groupsList = require("../data/groupsList")

export  class clientFunc{
    constructor(Client:Client){
        this.Client = Client;
    }
    Client:Client;

    async Ready(){
        console.log("Client is ready!");

        //const media = await MessageMedia.fromFilePath(schemas.botInit.img);
    
        console.log("Enviando mensaje");
    
        const groupsIdList:groupList = await JSON.parse(groupsList)

         //puesto de manera manual temporalmente
        groupsIdList.forEach(async (groupID) => {
            await this.Client.sendMessage(groupID, schemas.botInit.text);
        });
    }
    Auth(){
    console.log('AUTHENTICATED');
    }
    Loading(percent:string,message:string){
        console.log('LOADING SCREEN', percent, message);
    }
    AuthError(error:string){
        console.log('AUTH ERROR', error);
    }
    QR(qr:string){
    qrcode.generate(qr, {small: true});
    }
   async AdminChange(notification:GroupNotification){
        const type:string = notification.type;

        if (type === "promote") {
            console.log(notification)
            console.log(`You were promoted by ${notification.author}`);
        } else if (type === 'demote')
            console.log(notification)
            console.log(`You were demoted by ${notification.author}`);
    }
    async GroupUpdate(notification:GroupNotification){
        // Group picture, subject or description has been updated.
        console.log('update', notification);
    }
    async GroupLeave (notification:GroupNotification) {
        // User has left or been kicked from the group.
        console.log('leave', notification);
        notification.reply('User left.');
        const c =await notification.getContact()
        console.log('--------------------')
        const profile =await this.Client.getProfilePicUrl(notification.id+'@g.us')
        console.log(profile)
        console.log(c)
    }
    async GroupJoin (notification:GroupNotification) {
        console.log('join', notification);
        notification.reply('User joined.');
       const c =await notification.getContact()

    }
    async MessageRevokeEveryone(after:Message,before:Message){

        const chat = await before?.getChat()
        if(chat?.isGroup){
            console.log('after')
             console.log(after); 
     
            if (before?.type === 'image') {
                console.log(before)
             /*   const media = await new MessageMedia(before.mime,before._data.body)
                client.sendMessage(before.from,media,{caption:  `el que nada teme nada borra`+ ` @${before._data.id.participant.replace('@c.us','')} eh aqui lo que borraste \n ${before._data.caption}`,
            mentions: [before._data.id.participant]})*/
            }
            else{
            // console.log('before')
            // const mentions = [before._data.id.participant]
    
            // const contact = await before?.getContact()
            // console.log(contact)
            // console.log(before); // message before it was deleted.
            // client.sendMessage(before.from,
            //  'el que nada teme nada borra'+ ` @${before._data.id.participant.replace('@c.us','')} eh aqui lo que borraste \n`+
            //  '\n`'+ before?._data.body +'`'
            // ,{mentions})
        
    }}
    }
}
