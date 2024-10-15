
import{Client} from 'whatsapp-web.js';
const {Config} = require('./config/clientConfig')
import {clientFunc} from './functions/clientHandlleFuncs'

export const client = new Client(Config);
 
client.on('loading_screen',clientFunc.Loading);
client.on('authenticated',clientFunc.Auth);
client.on("ready",clientFunc.Ready);
client.on('auth_failure',clientFunc.AuthError);
client.on('qr',clientFunc.QR);
client.on('group_admin_changed', clientFunc.AdminChange);
client.on('group_update', clientFunc.GroupUpdate);
client.on('group_leave',clientFunc.GroupLeave);
client.on('group_join',clientFunc.GroupJoin);
client.on('message_revoke_everyone', clientFunc.MessageRevokeEveryone);
client.on('message_create',clientFunc.MessageCreate)


client.initialize();

