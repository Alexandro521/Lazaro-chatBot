import CommandsConfig from "../DB/PostgreSQL/CommandConfig";
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
getCommandList()