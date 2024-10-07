
import{Client} from 'whatsapp-web.js';
const {Config} = require('./config/clientConfig')
import {clientFunc} from './functions/clientFunctions'

const client = new Client(Config);
const ClientFunc = new clientFunc(client)
 
client.on('loading_screen',ClientFunc.Loading);
client.on('authenticated',ClientFunc.Auth);
client.on("ready",ClientFunc.Ready);
client.on('auth_failure',ClientFunc.AuthError);
client.on('qr',ClientFunc.QR);
client.on('group_admin_changed', ClientFunc.AdminChange);
client.on('group_update', ClientFunc.GroupUpdate);
client.on('group_leave',ClientFunc.GroupLeave);
client.on('group_join',ClientFunc.GroupJoin);
client.on('message_revoke_everyone', ClientFunc.MessageRevokeEveryone);
client.on('message_create',ClientFunc.MessageCreate)


client.initialize();

