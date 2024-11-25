import { CommandHandlle } from "../functions/commandHadleFuncs";
import { Message } from "whatsapp-web.js";


export const commandLinks = {
    '!only_Admins': {
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.setOnlyAminds(Message)}
    },
    '!G_only_Admins': {
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.setOnlyAminds_global(Message);}
    },
    '!set_sudo': {
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.setSuperUser(Message);}
    },
    '!restrict': {
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.addBannedUser(Message);}
    },
    '!rm': {
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.removeParticipants(Message);}
    },
    '!enable': {
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.enable(Message);}
    },
    '!only_list': {
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.addWhiteListUser(Message);}
    },
    '!G_enable':{
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.globalEnable(Message);}
    },
    '!unsudo':{
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.Unsudo(Message);}
    },
    '!get_config':{
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.getConfig(Message);}
    },
    '!todos':{
        init: async (Message:Message)=>{
        await CommandHandlle.Configs.Everyone(Message);}
    },
    '!test_gay':{
        init: async (Message:Message)=>{
        await CommandHandlle.Games.testGay(Message);}
    },
    '!pinterest':{
        init: async (Message:Message)=>{
        await CommandHandlle.Search.pinterestv1(Message)}
    },
    '!img':{
        init: async (Message:Message)=>{
        await CommandHandlle.Search.googleImages(Message);}
    },
    '!pinterestv2':{
        init: async (Message:Message)=>{
        await CommandHandlle.Search.pinterestv2(Message);}
    },
    '!stk':{
        init: async (Message:Message)=>{
        await CommandHandlle.Tools.stickerCreate(Message);}
    },
    '!test': {
        init: async (Message: Message) => {
            await CommandHandlle.Tools.test(Message)
        }
    },
    '!mp3': {
        init: async (Message: Message) => {
            await CommandHandlle.Media.mp3(Message)
        }
    },
    '!mp4': {
        init: async (Message: Message) => {
            await CommandHandlle.Media.mp4(Message)
        }
    },
    '!yts': {
        init: async (Message: Message) => {
            await CommandHandlle.Search.yts(Message)
        }
    },
    '!wallpaper': {
        init: async (Message: Message) => {
            await CommandHandlle.Search.walppaper(Message)
        }
    },
    '!ttks': {
        init: async (Message: Message) => {
            await CommandHandlle.Search.ttks(Message)
        },
       
    },
    '!ttkg': {
        init: async (Message: Message) => {
            await CommandHandlle.Media.ttkget(Message)
        }
    },
    '!only_Groups': {
        init: async (Message: Message) => {
            await CommandHandlle.Configs.onlyGroups(Message)
        }
    },
    '!akinator': {
        init: async (Message: Message) => {
            await CommandHandlle.Games.Akinator(Message)
        }
    },
    '!char': {
        init: async (Message: Message) => {
            await CommandHandlle.Ai.characterAi(Message)
        }
    }
}
