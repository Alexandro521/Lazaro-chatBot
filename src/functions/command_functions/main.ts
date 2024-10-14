import { Commands } from "./command_m1";
import { CommandsMedia } from "./commands_m2";
import { CommandsAI } from "./commands_m3";
import { CommandsAnime } from "./commands_m4";
import { CommandsSearch } from "./commands_m5";
import { CommandsNsfw } from "./commans_m6";
export const main = {
    general : Commands,
    Search: CommandsSearch,
    Media: CommandsMedia,
    AI: CommandsAI,
    Anime: CommandsAnime,
    Nsfw: CommandsNsfw
}