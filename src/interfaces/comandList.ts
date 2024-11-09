import { Message } from "whatsapp-web.js";
export type CommandList = {
    '!menu1': Command
    '!bot on': Command
    '!C_Close': Command
    '!Goodbye world': Command
  }
  export interface Command {
    c_name: string
    init: ({Message}:{Message:Message}) => void
   // on: ({ text,Message }: { text: string; Message: Message }) => void
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
  