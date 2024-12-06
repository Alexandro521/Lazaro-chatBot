import { Message, MessageMedia } from "whatsapp-web.js"
import { getUserLevelCard } from "./Cardgenerator" 
import { client } from "../.."
import experieceLevel from "../../data/json/experienceLevels.json" with { type: "json" }
import { level_db } from "./database"

export class Level extends level_db {
    private level:number = 0
    private rank = 0
    private experience = 0
    private needExperience = experieceLevel.levels[1].requiredXP

    constructor(user_id: string, chat_id: string) {
        super(user_id,chat_id)
        this.user_id = user_id
        this.chat_id = chat_id
    }
   async updateProperty() { 
        const [data] = await super.getUserExperience()
        await this.updateRank()
        this.level = data.level
        this.experience = data.experience
        this.needExperience = data.required_exp
    }
   private async getUserData() {
       // await this.updateProperty()
        return {
            user_id: this.user_id,
            level: this.level,
            rank: this.rank,
            experience: this.experience,
            needExperience: this.needExperience,
        }
    }
    async addExperience(exp: number, message: Message) {
        console.log("aqui fallamos")
        this.experience += exp
        if (this.experience >= this.needExperience) {
            await this.levelUp(message)
            return
        }
        await super.updateUserExperience(this.experience,this.level,this.needExperience)
    }
    private async levelUp(message: Message) {
        console.log("aqui fallamos level up")
        this.level += 1
        this.needExperience = experieceLevel.levels[this.level].requiredXP
        await super.updateUserExperience(this.experience,this.level,this.needExperience)

        await this.sendLevelCard(message,true)
    }
    async sendLevelCard(message: Message,Iscaption) {
        try {
            //await message.reply("No hay funciones experimentales para el momento")
            const { shortName, pushname } = await client.getContactById(this.user_id)
            const photo = await this.getProfilePicUrl(message)
            await this.updateProperty()

            const base64 = await getUserLevelCard({
                kickname: pushname || shortName || 'user',
                exp: this.experience,
                lvl: this.level,
                rank: this.rank,
                requiredXP: this.needExperience,
                picture: photo,
            })
            const caption = Iscaption ? experieceLevel.levels[this.level].achievement : ''
            const image = new MessageMedia("image/png", base64)
            await message.reply(image, this.chat_id, { caption })
        } catch (error) {
            await message.reply(error.message)
            console.log(error)
        }
    }
    private async updateRank() { 
       const actuallyRank = await this.getUserRank()
        this.rank = actuallyRank
    }
    private async getUserRank() {
       const data = await super.getAllUserExperience()
       console.log(data)
       const positionOnRank = data.findIndex(users => users.user_id === this.user_id)
       return positionOnRank + 1
    }
    private async getProfilePicUrl(message: Message) {
        try {
            const user = await message.getContact()
            const pictureURL = await user.getProfilePicUrl()
            console.log(pictureURL)
            let url;
            if (!pictureURL) {
                const { pushname } = user
                url = `https://avatar.oxro.io/avatar.png?name=${pushname[0]}&length=1`
            } else {
                url = pictureURL
            }

            return url
        } catch (error) {
            console.log(error)
        }
    }
    
}

export declare class LevelSystemType {
    updateProperty(): Promise<void>
    addExperience(exp: number, message: Message): Promise<void>
    sendLevelCard(message: Message,Iscaption: boolean): Promise<void>
}

