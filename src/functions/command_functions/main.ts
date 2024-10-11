import { Commands } from "./menu-1_generals/command_m1";
import { CommandsMedia } from "./menu-2_media/commands_m2";
import { CommandsAI } from "./menu-3_AI/commands_m3";
import { CommandsAnime } from "./menu-4_Anime/commands_m4";
import { CommandsSearch } from "./menu-5_search/commands_m5";

export const main = {
    general : Commands,
    Search: CommandsSearch,
    Media: CommandsMedia,
    AI: CommandsAI,
    Anime: CommandsAnime
}