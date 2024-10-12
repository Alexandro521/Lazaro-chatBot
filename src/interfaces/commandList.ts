import { Message } from "whatsapp-web.js";
export interface command {
    x: string
    IsDesabilited: boolean
    onlyAdmin: boolean
    onlyGroups: boolean
    onlForGroupsAdmin: boolean
    restrictedUsersId: string[],
    restrictedGroupsId: string[]
    onlyForUsersId: string[]}
  
export interface menuList{

}