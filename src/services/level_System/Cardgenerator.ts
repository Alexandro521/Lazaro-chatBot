export const getUserLevelCard = async (userDaata: UserLevelCard) => {
    const data = await fetch('https://whatsappjs-cards-gen-api-production.up.railway.app/api/card', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDaata),
    })
    const buffer = await data.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    return base64
}

interface UserLevelCard {
    kickname: string;
    exp: number;
    lvl: number;
    rank: number;
    picture: string;
    requiredXP: number;
}
