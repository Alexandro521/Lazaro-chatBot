import { Message } from "whatsapp-web.js";
export interface CommandList {
    main: Main
    general: General
  }
  
  export interface Main {
    main: string
    menu1: Command
  }
  
  export interface General {
    botOn: Command
  }
  
  export interface Command {
    c_name: string
    on: ({ text,Message }: { text: string; Message: Message }) => void
    props: Props
  }
  
  export interface Props {
    IsDesabilited: boolean
    onlyAdmin: boolean
    onlyGroups: boolean
    restrictedUsers: string[]
    restrictedGroups: string[]
    onlyForUsers: string[]
  }
  