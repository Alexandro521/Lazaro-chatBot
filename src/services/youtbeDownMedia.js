const axios = require('axios')

async function youtubeDwonMedia(searchText){
    const response = await axios.get('https://api.jdoxx.com/api/y2mate?link='+searchText)
    console.log(response.data.formats)
    const obj = {
        title: response.data.title,
        cover: response.data.photo,
        mp3: {
          
            formato :response.data.formats.audio[0].quality,
            peso :(response.data.formats.audio[0].size/1024/1024).toFixed(2),
            down: response.data.formats.audio[0].down,
        },
        mp4: {
            formato :response.data.formats.mp4[0].quality,
            peso :(response.data.formats.mp4[0].size/1024/1024).toFixed(2),
            down: response.data.formats.mp4[0].down,
        }
    }
    return obj
}
async function youtbeDownMp3(link){
    const response = await axios.get('https://api.jdoxx.com/api/y2mate?link='+link)
    console.log(response.data.formats)
    const obj = {
        title: response.data.title,
        peso :(response.data.formats.audio[0].size/1024/1024).toFixed(2),
        down: response.data.formats.audio[0].down,
    }
    return obj
}
module.exports = {
    youtubeDwonMedia,
    youtbeDownMp3
}