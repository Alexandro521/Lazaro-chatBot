import { CommandList } from "../interfaces/comandList";
import { CommandHandlle } from "../functions/commandHadleFuncs";
import { Message } from "whatsapp-web.js";


export const commandLinks = {
    '!main': {
        init: async (Message:Message)=>{
        await CommandHandlle.main(Message)}
    },
    '!only_Admins': {
        init: async (Message:Message)=>{
        await CommandHandlle.setOnlyAminds(Message)}
    },
    '!G_only_Admins': {
        init: async (Message:Message)=>{
        await CommandHandlle.setOnlyAminds_global(Message)}
    },
    '!set_sudo': {
        init: async (Message:Message)=>{
        await CommandHandlle.setSuperUser(Message)}
    },
    '!restrict': {
        init: async (Message:Message)=>{
        await CommandHandlle.addBannedUser(Message)}
    },
    '!rm': {
        init: async (Message:Message)=>{
        await CommandHandlle.removeParticipants(Message)}
    },
    '!enable': {
        init: async (Message:Message)=>{
        await CommandHandlle.enable(Message)}
    },
    '!only_list': {
        init: async (Message:Message)=>{
        await CommandHandlle.addWhiteListUser(Message)}
    },
    '!G_enable':{
        init: async (Message:Message)=>{
        await CommandHandlle.globalEnable(Message)}
    },
    '!unsudo':{
        init: async (Message:Message)=>{
        await CommandHandlle.Unsudo(Message)}
    },
    '!get_config':{
        init: async (Message:Message)=>{
        await CommandHandlle.getConfig(Message)}
    }
}
