/* eslint-disable @typescript-eslint/no-extraneous-class */
import { createClient, PostgrestError} from '@supabase/supabase-js'
import 
{
getGroupConfigResponse,
functionReturn,
insertType,
bannedUser,
onlyUser,
superUser}
from '../../interfaces/postgressFuncTypes';

const API_KEY = process.env.publicAnonKey
const URL = process.env.DbUrl
const supabase = createClient(URL, API_KEY);

export default class CommandsdataBase{
    
    static async getBannedUsersList(chat_id:string,command_id:string){
        try{
            const { data, error } = await supabase.from('banned_user')
            .select('banned_user')
            .eq('chat_id',chat_id)
            .eq('command_id',command_id)
            if(error){
                throw new Error(error.message)
            }
            return data
        }catch(err){
            console.log(err)
        }
    }
    static async getOnlyUsersList(chat_id:string,command_id:string){
        try{
            const { data, error } = await supabase.from('only_user')
            .select('only_user')
            .eq('chat_id',chat_id)
            .eq('command_id',command_id)
            if(error){
                throw new Error(error.message)
            }
            return data
        }catch(err){
            console.log(err)
        }
    }
    static async addUserToBanList(banList:bannedUser) {
        try {
            const {  error } = await supabase.from('banned_user').insert(banList);

            if (error) throw new Error(error.message)
            return {
                status: 201,
                message: 'Users added to ban list',
            }
        } catch (err) {
            console.log(err)
            return {status:500}
        }
    }
    static async addUserToOnlyList(onlyList:onlyUser) {
        try {
            const {  error } = await supabase.from('only_user').insert([onlyList]);
            
            if (error) throw new Error(error.message)
            return {
                status: 201,
                message: 'User added to only list',
            }
        } catch (err) {
            console.log(err)
            return {status:500}
        }
    }
    static async removeUserFromBanList(banList:bannedUser) {
        try {
            banList.map(async (item)=>{
                const {  error } = await supabase.from('banned_user').delete()
                .eq('chat_id', item.chat_id)
                .eq('command_id', item.command_id)
                .eq('banned_user', item.banned_user);
                if (error) throw new Error(error.message)
                return {
                    status: 201,
                    message: 'User removed from ban list',
                    user: item.banned_user,
                    command_id: item.command_id
                }
            })
        } catch (err) {
            console.log(err)
            return {status:500}
        }
    }
    static async removeUserFromOnlyList(chat_id: string, command_id: string, user: string) {
        try {
            const {  error } = await supabase.from('only_user').delete()
            .eq('chat_id', chat_id)
            .eq('command_id', command_id)
            .eq('only_user', user);
            
            if (error) throw new Error(error.message)
            return {
                status: 201,
                message: 'User removed from only list',
                user,
                command_id
            }
        } catch (err) {
            console.log(err)
            return {status:500}
        }
    }
    static async getCommandsdataBase(chat_id: string, command_id: string): Promise<functionReturn> {
        try {

            const { data, error }: { data: getGroupConfigResponse, error: PostgrestError } = await supabase.rpc('get_command_configuration', { "chat": chat_id, "command": command_id });

            if (error) {
                throw new Error(error.message)
            }
            if (data.length === 0) {
                throw new Error("No data")
            }
            let super_users_list=null;
            let only_users_list=null;
            let banned_users_list=null;
            const obj = {}
            const item = data[0]
            super_users_list = await CommandsdataBase.getSuperUsers(item.chatid)
            only_users_list = await CommandsdataBase.getOnlyUsersList(item.chatid, item.commands)
            banned_users_list = await CommandsdataBase.getBannedUsersList(item.chatid, item.commands)

            const new_obj = {
                ...item,
                super_users: Object.fromEntries(super_users_list.map(item => [item.user_id,'user'])),
                only_users_list: Object.fromEntries(only_users_list.map(item => [item.only_user, 'user'])),
                banned_users_list: Object.fromEntries(banned_users_list.map(item => [item.banned_user, 'user']))
            }
            obj[item.commands] = new_obj
            console.log(obj)
            return obj
        } catch (err) {
            console.log(err)
        }
    }
    static async register_chat(args:insertType){
    try{
        const {data, error} = await supabase.from('whatsapp_chats').insert(args)
        console.log(error)
        if(error){
        return {status:500,data:error.message}
        }
        return {status:201,data}
    }catch(err){
        console.log(err)
    }
    }
    static async registerUser(id:string,number:string,as_name:string){
        try{
            const {error} = await supabase.from('users').insert({id,number,as_name})

            if(error) return {status:500,data:error.message}
        
            return {status:201,user_created:id}
        }catch(err){
            console.log(err)
        }
    }
    static async getSuperUsers(chat_id:string){
        try{
            const {data,error} = await supabase.from('super_users')
            .select('user_id')
            .eq('chat_id',chat_id);
            if(error) throw new Error('Error')
            return data
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async addSuperUser(super_list:superUser) {
        try{
            const { error } = await supabase.from('super_users')
            .insert(super_list);
            if(error) throw new Error(error.message)
            return {status:201,message:'Super user added'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async removeSuperUser(super_list:superUser) {
        try{
           const promise = super_list.map(async (item)=>{
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async (resolve,reject)=>{
            const { error } = await supabase.from('super_users')
            .delete()
            .eq('chat_id',item.chat_id)
            .eq('user_id',item.user_id);
            if(error) reject(new Error(error.message))
            resolve({status:201,message:'Super user removed'})
            })})
            await Promise.all(promise)
            return {status:201,message:'Super users removed'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async getAllCommands(){
        try{
            const {data,error} = await supabase.from('commands').select('*')
            if(error) throw new Error(error.message)
            return Object.fromEntries(data.map(item=>[item.id,item]))
        }catch(err){
            console.log(err)
        }
    }
    static async setEnableCommnad(chat_id:string,command_id:string,isEnable:boolean){
        try{
            const {error} = await supabase.from('group_command_config').update({enable:isEnable})
            .eq('whatsapp_chat_id',chat_id)
            .eq('command_id',command_id)
            if(error) throw new Error(error.message)
            return {status:201,message:'Command enabled'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async setAdminOnlyCommnad(chat_id:string,command_id:string,isEnable:boolean){
        try{
            const {error} = await supabase.from('group_command_config').update({only_admins:isEnable})
            .eq('whatsapp_chat_id',chat_id)
            .eq('command_id',command_id)
            if(error) throw new Error(error.message)
            return {status:201,message:'Command enabled'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async setGlobalEnableCommnad(command_id:string,isEnable:boolean){
        try{
            const {error} = await supabase.from('commands').update({is_global_enable:isEnable})
            .eq('id',command_id)
            if(error) throw new Error(error.message)
            return {status:201,message:'Command updated'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async setOnlyGroupCommnad(command_id:string,isEnable:boolean){
        try{
            const {error} = await supabase.from('commands').update({is_only_groups:isEnable})
            .eq('id',command_id)
            if(error) throw new Error(error.message)
            return {status:201,message:'Command updated'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async setGlobalAdminOnlyGroupCommnad(command_id:string,isEnable:boolean){
        try{
            const {error} = await supabase.from('commands').update({only_admins:isEnable})
            .eq('id',command_id)
            if(error) throw new Error(error.message)
            return {status:201,message:'Command updated'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async updateCommandDescription(command_id,Description:string){
        try{
            const {error} = await supabase.from('commands').update({description:Description})
            .eq('id',command_id)
            if(error) throw new Error(error.message)
            return {status:201,message:'Command updated'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
    static async updateCommandOptions(command_id,Options:string){
        try{
            const {error} = await supabase.from('commands').update({options:Options})
            .eq('id',command_id)
            if(error) throw new Error(error.message)
            return {status:201,message:'Command updated'}
        }catch(err){
            console.log(err)
            return {status:500}
        }
    }
}

