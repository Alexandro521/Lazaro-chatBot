import { Themes } from "node_akinator";

export const tiktokLinksTemp:tiktokLinksTempType = {

}
export const youtubeLinskTemp: youtubeLinskTempType = {

}

export const GameSession: GameSessionType = {

    
}

export const characterSession: characterSessionType = {
    
}

type GameSessionType = {
    [key: string]: {
        player: string
        theme: Themes
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        games:  Function
    };
};

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

type characterSessionType = {
    [key: string]: {
        user: string;
        character: string;
        char :characterAI_Client
    }
}

declare class characterAI_Client {

    senMessage(message: string): Promise<string>
    connect(character: string):void
    disconnect(): void
    change(character: string,voiceID: string): void
  }