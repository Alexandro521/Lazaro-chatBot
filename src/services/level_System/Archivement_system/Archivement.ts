import { archivement_db } from "./database"

export class archivement extends archivement_db {
      
    title: string
    description: string
    winExp: number
    pogress:number
    pogressCondition: ()=> boolean
    char
    constructor(user:string,chat_id:string,title:string,description:string,winExp:number,pogress:number,pogressCondition:()=>boolean,char:string) {
        super(user, chat_id)
        this.title = title
        this.description = description
        this.winExp = winExp
        this.pogress = pogress
        this.pogressCondition = pogressCondition
        this.char = char
    }
      async sync() {
        await super.getArchivement('10_mensajes')
    }
      
  }
  
  