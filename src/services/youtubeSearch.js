const axios = require('axios')

async function youtubeSearch(searchText){
    const response = await axios.get('http://localhost:1024/services/yts?q='+searchText)
    return response.data
}
module.exports = {
    youtubeSearch
}