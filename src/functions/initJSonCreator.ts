import CommandsConfig from "../DB/PostgreSQL/CommandConfig";
import { level_db } from "../services/level_System/database";

import fs from "fs";
import {pipeline} from "stream/promises";

export async function getCommandList(){
    const result = await CommandsConfig.getAllCommands()
    const createWriteStream = fs.createWriteStream(process.cwd()+'/src/data/json/Commands.json',{encoding:'utf8'})
    const json = await JSON.stringify(result,null, "\t")
    pipeline(json,createWriteStream).then(()=>{
        console.log("json created")
    })
}
export async function getUserExperience() { 
    const result = await new level_db('a','b').getAllUserExperienceTable()
    const obj = Object.fromEntries(result.map(item=>[item.user_id+'_'+item.chat,item]))
    const createWriteStream = fs.createWriteStream(process.cwd()+'/src/services/level_System/users.json',{encoding:'utf8'})
    const json = await JSON.stringify(obj,null, "\t")
    pipeline(json,createWriteStream).then(()=>{
        console.log("json created")
    })
}

getCommandList()
getUserExperience()
