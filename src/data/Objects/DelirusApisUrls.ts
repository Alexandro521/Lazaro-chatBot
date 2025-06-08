const ApiIndexRoute = `https://delirius-apiofc.vercel.app/`;
export const ApiUrl = {
  Search: {
    genius: `${ApiIndexRoute}/search/genius?q=`,
    geniusLyric: `${ApiIndexRoute}/search/lyrics?parse=false&url=`,
    lyricsSearch: `${ApiIndexRoute}/search/letra?query=`,
    tiktokSearch: `${ApiIndexRoute}/search/tiktoksearch?query=`,
    YoutubeSearch: `${ApiIndexRoute}/search/ytsearch?q=`,
    googleImg: `${ApiIndexRoute}/search/gimage?query=`,
    googleSearch: `${ApiIndexRoute}/search/googlesearch?query=`,
    pinterest: `${ApiIndexRoute}/search/pinterest?text=`,
    pinterestv2: `${ApiIndexRoute}/search/pinterestv2?text=`,
    bingImg: `${ApiIndexRoute}/search/bingimage?query=`,
    npmSearch: `${ApiIndexRoute}/search/npm?limit=20&q=`,
    wallpaper:"https://deliriussapi-oficial.vercel.app/search/wallpapers?q="
  },
  Nsfw: {
    Rule34: `${ApiIndexRoute}/search/rule34?query=`,
    Rule34_V2: `${ApiIndexRoute}/search/rule34v2?page=0&query=`,
    gelbooru: `${ApiIndexRoute}/search/gelbooru?query=`,
    Xnxx: `${ApiIndexRoute}/search/xnxxsearch?query=`,
    CoreanImg: `${ApiIndexRoute}/nsfw/corean`,
    Boobs: `${ApiIndexRoute}/nsfw/boobs`,
    GirlsPack: `${ApiIndexRoute}/nsfw/girls`,
    TikyokVideo: `${ApiIndexRoute}/nsfw/tiktok`,
  },
  AI: {
    chatGpt: `${ApiIndexRoute}/ia/chatgpt?q=`,
    Bing: `${ApiIndexRoute}/ia/bingia?query=`, //!esto no funciona
    Gemini: `${ApiIndexRoute}/ia/gemini?query=`,
    BlackBox: `${ApiIndexRoute}/ia/blackbox?q=`,
    ChatGptWeb: `${ApiIndexRoute}/ia/gptweb?text=`,
    simi: `${ApiIndexRoute}/tools/simi?text=`, //!tiempo de espera muy largo
  },
  Anime: {
    loli: `${ApiIndexRoute}/anime/loli`,
    neko: `${ApiIndexRoute}/anime/neko`,
    foxgirl: `${ApiIndexRoute}/anime/foxgirl`,
    lolipc: `${ApiIndexRoute}/anime/lolipc`,
    foxGirl: `${ApiIndexRoute}/anime/foxgirl`,
  },
};
