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
    },
    '!todos':{
        init: async (Message:Message)=>{
        await CommandHandlle.Everyone(Message)}
    },
    '!test_gay':{
        init: async (Message:Message)=>{
        await CommandHandlle.testGay(Message)}
    },
    '!pinterest':{
        init: async (Message:Message)=>{
        await CommandHandlle.pinterestv1(Message)}
    },
    '!img':{
        init: async (Message:Message)=>{
        await CommandHandlle.googleImages(Message)}
    },
    '!pinterestv2':{
        init: async (Message:Message)=>{
        await CommandHandlle.pinterestv2(Message)}
    },
    '!stk':{
        init: async (Message:Message)=>{
        await CommandHandlle.stickerCreate(Message)}
    },
    '!test': {
        init: async (Message: Message) => {
            await CommandHandlle.test(Message)
        }
    },
    '!mp3': {
        init: async (Message: Message) => {
            await CommandHandlle.mp3(Message)
        }
    },
    '!mp4': {
        init: async (Message: Message) => {
            await CommandHandlle.mp4(Message)
        }
    },
    '!yts': {
        init: async (Message: Message) => {
            await CommandHandlle.yts(Message)
        }
    },
    '!wallpaper': {
        init: async (Message: Message) => {
            await CommandHandlle.walppaper(Message)
        }
    },
    '!ttks': {
        init: async (Message: Message) => {
            await CommandHandlle.ttks(Message)
        },
       
    },
    '!ttkg': {
        init: async (Message: Message) => {
            await CommandHandlle.ttkget(Message)
        }
    },
    '!only_Groups': {
        init: async (Message: Message) => {
            await CommandHandlle.onlyGroups(Message)
        }
    }
}
