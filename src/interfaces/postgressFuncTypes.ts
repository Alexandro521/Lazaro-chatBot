export type getGroupConfigResponse = Array<{
  chatid: string
  commands: string
  chatname: string
  onlyadmins: boolean
  only_root: boolean
  only_users_enable: boolean
  l_enable: boolean
  g_enable: boolean
  for_groups: boolean
  g_onlyadmins: boolean
  info: string
}
>
export type onlyUser = Array<{
  chat_id: string
  command_id: string
  only_user: string
}>
export type bannedUser = Array<{
  chat_id: string
  command_id: string
  banned_user: string
}>
export type superUser = Array<{
  chat_id: string
  user_id: string
}>

export type functionReturn = {
  [key: string]: {
    chatid: string
    commands: string
    chatname: string
    onlyadmins: boolean
    l_enable: boolean
    g_enable: boolean
    for_groups: boolean
    g_onlyadmins: boolean
    info: string
    super_users: {}
    only_users_list: {}
    banned_users_list: {}
  }
  
}
export type insertType = Array<{
  id :string
  is_group:boolean
  chat_name:string
}>

export type banned_user = Array<{
  chat_id:string,
  command_id:string,
  banned_user:string
}>

export type only_user = Array<{
  chat_id:string,
  command_id:string,
  only_user:string
}>

export type super_user = Array<{
  chat_id:string,
  user_id:string
}>