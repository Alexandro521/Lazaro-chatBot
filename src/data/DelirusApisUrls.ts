const ApiIndexRoute = `https://deliriussapi-oficial.vercel.app`
export const ApiUrl ={
    Search:{
    genius: `${ApiIndexRoute}/search/genius?q=`,
    geniusLyric: `${ApiIndexRoute}/search/lyrics?parse=false&url=`,
    lyricsSearch: `${ApiIndexRoute}/search/letra?query=`,
    tiktokSearch:`${ApiIndexRoute}/search/tiktoksearch?query=`,
    YoutubeSearch:`${ApiIndexRoute}/search/ytsearch?q=`,
    googleImg:`${ApiIndexRoute}/search/gimage?query=`,
    googleSearch:`ttps://deliriusapi-official.vercel.app/search/googlesearch?query=`,
    bingImg:`${ApiIndexRoute}/search/bingimage?query=`,
    npmSearch:`${ApiIndexRoute}/search/npm?limit=20&q=`
    },
    Nsfw:{
        Rule34: `${ApiIndexRoute}/search/rule34?query=`,
        Rule34_V2:`${ApiIndexRoute}/search/rule34v2?page=0&query=`,
        gelbooru:`${ApiIndexRoute}/search/gelbooru?query=`,
        Xnxx:`${ApiIndexRoute}/search/xnxxsearch?query=`,
        CoreanImg:`${ApiIndexRoute}/nsfw/corean`,
        Boobs:`${ApiIndexRoute}/nsfw/boobs`,
        GirlsPack:`${ApiIndexRoute}/nsfw/girls`,
        TikyokVideo:`${ApiIndexRoute}/nsfw/tiktok`,
    },
    AI:{
        chatGpt:`${ApiIndexRoute}/ia/chatgpt?`,
        Bing:`${ApiIndexRoute}/ia/bingia?query=`,
        Gemini:`${ApiIndexRoute}/ia/gemini?query=`,
        BlackBox:`${ApiIndexRoute}/ia/blackbox?q=`,

    },
    tools:{
      
    }
}