import { menuList } from "../interfaces/commandList"
import { main } from "../functions/command_functions/main"
import { Message } from "whatsapp-web.js"
export const CommandList = {
    main: {
        main: "!main",
    },
    general: {
        botON: {
            x: "!bot on",
            exec:(Message:Message,text:string)=>  main.general.botOn({Message,text}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }
        },
        botOff: {
            x: "!bot off",
            exec:(Message:Message,text:string)=>  main.general.botOn({Message,text}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }  
        },
        testNmae: {
            x: "!_test",
            exec:(Message:Message)=>  main.general._testName({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Everyone: {
            x: "!everyone",
            exec:(Message:Message)=>  main.general.Everyone({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        testGay: {
            x: "!test_gay",
            exec:(message:Message)=>  main.general.test_gay({message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    }
    },
    Search: {
        LyricSearch: {
            x: "!lyricSearch",
            exec:(Message:Message)=>  main.Search.LyricSearch({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        GetLyric: {
            x: "!getLyric",
            exec:(Message:Message)=>  main.Search.GetLyric({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        GlySearch: {
            x: "!GLYSearch",
            exec:(Message:Message)=>  main.Search.GlySearch({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Pokemon: {
            x: "!Pokemon",
            exec:(Message:Message)=>  main.Search.Pokemon({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Pinterest: {
            x: "!pinterest",
            exec:(Message:Message)=>  main.Search.Pinterest({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        ImgByBing: {
            x: "!img_Bing",
            exec:(Message:Message)=>  main.Search.ImgByBing({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        ImgByGoogle: {
            x: "!img",
            exec:(Message:Message)=>  main.Search.ImgByGoogle({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        TikTokSearch: {
            x: "!tik_tok",
            exec:(Message:Message)=>  main.Search.TikTokSearch({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
    },
    media: {
        TTS: {
            x: "!tts",
          //  exec:(Message:Message)=>  main({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Video: {
            x: "!videos",
            IsDesabilited: true,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
        },
    },
    AI: {
        chatgpt: {
            x: "!chatgpt",
            exec:(Message:Message)=>  main.AI.ChatGPT({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Bingchat: {
            x: "!BingChat",
            exec:(Message:Message)=>  main.AI.Bingchat({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        gpt4: {
            x: "!gpt-4",
            exec:(Message:Message)=>  main.AI.ChatGPT({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Gemini: {
            x: "!Gemini",
            exec:(Message:Message)=>  main.AI.Gemini({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Simi: {
            x: "!simi",
            exec:(Message:Message)=>  main.AI.Simi({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
    },
    Anime: {
        neko: {
            x: "!neko",
            exec:(Message:Message)=>  main.Anime.neko({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        loli: {
            x: "!loli",
            exec:(Message:Message)=>  main.Anime.loli({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        foxgirl: {
            x: "!foxgirl",
            exec:(Message:Message)=>  main.Anime.foxgirl({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        lolipc: {
            x: "!lolipc",
            exec:(Message:Message)=>  main.Anime.lolipc({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
    },
    Nsfw: {
        china: {
            x: "!Asian",
            exec:(Message:Message)=>  main.Nsfw.Asian({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        japan: {
            x: "!Japan",
            exec:(Message:Message)=>  main.Nsfw.Japan({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        boobs: {
            x: "!Boobs",
            exec:(Message:Message)=>  main.Nsfw.Boobs({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        girls: {
            x: "!Pack",
            exec:(Message:Message)=>  main.Nsfw.Pack({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        rule34: {
            x: "!Rule34",
            exec:(Message:Message)=>  main.Nsfw.Rule34({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
    },
tools: {
        stickerCrate: {
            x: "!sticker",
          //  exec:(Message:Message)=>  main({Message}),
            props:{
            IsDesabilited: true,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        EmojiFusion: {
            x: "!emojiFusion",
           // exec:(Message:Message)=>  main({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
        Universe: {
            x: "!universe",
         //   exec:(Message:Message)=>  main({Message}),
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            onlForGroupsAdmin: false,
            restrictedUsers: [],
            restrictedGroups: [],
            onlyForUsers: []
        }    },
    }
}

