import { CommandList } from "../interfaces/comandList";
import { MenuConfig } from "../functions/commandsFunctions";
import { Message } from "whatsapp-web.js";
export const commandList: CommandList = {
    main: {
        main: "!main",
        menu1:{
            c_name:"!menu1",
            on:()=>{},
            props:{
                IsDesabilited: false,
                onlyAdmin: false,
                onlyGroups: false,
                restrictedUsers:[],
                restrictedGroups: [],
                onlyForUsers: []
            }
        },
  
    },
    general: {
        botOn: {
            c_name: "!bot on",
            on: MenuConfig.botOn,
            props:{
            IsDesabilited: false,
            onlyAdmin: false,
            onlyGroups: false,
            restrictedUsers:[],
            restrictedGroups: [],
            onlyForUsers: []
        }
        },
    }
}

