export let tiktokLinksTemp:tiktokLinksTempType = {

}
export let youtubeLinskTemp: youtubeLinskTempType = {

}

type youtubeLinskTempType = {
    [key: string]: Array<{
        title: string;
        duration: string;
        url: string;
        canal: string;
    }>;
};

type tiktokLinksTempType = {
    [key: string]: {url:string,title:string}[];
};