const axios = require('axios')

async function downloadMp3(url){
    const response = await axios.get('http://localhost:1024/services/ytmp3')
    if(response.data.message){
        return true
    }else{
        false
    }
}
module.exports = {
    downloadMp3
}