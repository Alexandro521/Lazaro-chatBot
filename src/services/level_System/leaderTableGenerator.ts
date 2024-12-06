import { level_db } from "./database"
import { Message } from "whatsapp-web.js"
import { client } from "../../index"

export type requestBodytype = {
    header: {
      title: string
      image: string
      subtitle: string
    }
    body: Array<{
      avatar: string
      username: string
      displayName: string
      level: number
      xp: number
      rank: number
    }>
}
async function getProfilePicUrl(user_id: string) {
    try {
        const user = await client.getContactById(user_id)
        const pictureURL = await user.getProfilePicUrl()
        console.log(pictureURL)
        let url;
        if (!pictureURL) {
           
            url = `https://static.wikia.nocookie.net/gatopedia/images/2/2e/El_gatoo.png/revision/latest/thumbnail/width/360/height/360?cb=20230103150310&path-prefix=es`
        } else {
            url = pictureURL
        }

        return url
    } catch (error) {
        console.log(error)
    }
}
export async function leaderTableGenerator(data: requestBodytype): Promise<string> {
    const request = await fetch('http://localhost:3000/api/top', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    const response = await request.arrayBuffer()
    const mime = Buffer.from(response).toString('base64')
    return mime
}
export async function leaderTableUserData(message: Message) {
    try {
        const chat_id = (await message.getChat()).id._serialized
        const db = new level_db('', chat_id)
        const data = await db.getAllUserExperience()
        const arr = []
        const map = data.map((user) => {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve) => {
                const avatarUrl = await getProfilePicUrl(user.user_id)
                const username = (await client.getContactById(user.user_id)).pushname
                const displayName = (await client.getContactById(user.user_id)).pushname
                const level = user.level
                const xp = user.experience
                const rank = data.findIndex(users => users.user_id === user.user_id) + 1
                arr.push({
                    avatar: avatarUrl,
                    username,
                    displayName,
                    level,
                    xp,
                    rank,
                })
                resolve(arr)

            })
        })
        await Promise.all(map)
        console.log(arr)
        const chatname = (await message.getChat()).name
        const finalObject = {
            header: {
                title: `Top ${chatname}`,
                image: 'https://static.wikia.nocookie.net/gatopedia/images/2/2e/El_gatoo.png/revision/latest/thumbnail/width/360/height/360?cb=20230103150310&path-prefix=es',
                subtitle: 'Top 10 Mas facheros',
            },
            body: arr.sort((a, b) => a.rank - b.rank),
        }
        console.log(finalObject)
        return finalObject
    } catch (error) {
        console.log(error)
    }
}

