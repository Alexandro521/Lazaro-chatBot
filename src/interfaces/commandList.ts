import { Message } from "whatsapp-web.js";
export interface command {
    x: string
    IsDesabilited: boolean
    onlyAdmin: boolean
    onlyGroups: boolean
    onlForGroupsAdmin: boolean
    restrictedUsersId: any[],
    restrictedGroupsId: any[]
    onlyForUsersId: any[]}
  
export interface menuList{

}