/* eslint-disable @typescript-eslint/no-extraneous-class */
import { user_session_slots } from "./temp";
import { Level } from "./levelSystem";
import { level_db } from "./database";
import users from "./users.json" with { type: "json" }
import  chalk  from "chalk";
export class level_session {

   static verify_session(session_identifier: string) { 
        if(user_session_slots[session_identifier]){
            return true
        }
        return false
    }
    static async create_session(user_id: string, chat_id: string) {
        if (!user_id || !chat_id) { 
            console.log(chalk.redBright("------------------------------------------------------------------------------------"))   
            console.log(chalk.redBright("Error creating session chat_id or user_id is empty"))
            console.log(chalk.redBright("------------------------------------------------------------------------------------"))
            return
        }
        const session_identifier = user_id + '_' + chat_id
        const verify = level_session.verify_session(session_identifier)
        if (!verify) {
           if(!users[session_identifier]){
               await new level_db(user_id, chat_id).insertUserExperience(0, 0, 0)
               console.log(chalk.greenBright("------------------------------------------------------------------------------------"))   
               console.log(chalk.greenBright("New user created on database"))
               console.log(chalk.greenBright("------------------------------------------------------------------------------------"))
           }
           const session = user_session_slots[session_identifier] = {
                client: new Level(user_id, chat_id)
            }
            await session.client.updateProperty()
            console.log(chalk.greenBright("------------------------------------------------------------------------------------"))   
            console.log(chalk.greenBright("New session created"))
            console.log(chalk.greenBright("------------------------------------------------------------------------------------"))
           return
       }
       return
    }
    static async get_session(user_id: string, chat_id: string) {
        const session_identifier = user_id + '_' + chat_id
        const verify = level_session.verify_session(session_identifier)
        if (!verify) {
            return false
        }
        return user_session_slots[session_identifier]
    }
}