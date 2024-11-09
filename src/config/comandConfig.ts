import { CommandList } from "../interfaces/comandList";
import { CommandHandlle } from "../functions/commandHadleFuncs";
export const commandList: CommandList = {   

    '!menu1': {
            c_name:"!menu1",
            init:(message)=>{},
            props:{
                IsDesabilited: true,
                onlyAdmin: false,
                onlyGroups: false,
                restrictedUsers:[],
                restrictedGroups: [],
                onlyForUsers: []
            },
    },
    '!bot on': {
            c_name: "!bot on",
            init:async (Message)=>{
                await CommandHandlle.botOn(Message.Message)},
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            restrictedUsers:[],
            restrictedGroups: [],
            onlyForUsers: []
        }
        },
    '!C_Close':{
        c_name:"!C_Close",
        init:()=>{},
        props:{
            IsDesabilited: false,
            onlyAdmin: true,
            onlyGroups: true,
            restrictedUsers:[],
            restrictedGroups: [],
            onlyForUsers: []
        }
    },
    '!Goodbye world':{
        c_name:"goodbye world",
        init:async(Message)=>{
            await CommandHandlle.GoodByeWorld(Message.Message)
        },
        props:{
            IsDesabilited: true,
            onlyAdmin: true,
            onlyGroups: true,
            restrictedUsers:[],
            restrictedGroups: [],
            onlyForUsers: []
        },
    }
}