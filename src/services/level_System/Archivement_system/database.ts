import { createClient } from "@supabase/supabase-js";

const API_KEY = process.env.publicAnonKey
const URL = process.env.DbUrl
const supabase = createClient(URL, API_KEY);

export class archivement_db  {
   user_id: string;
   chat_id: string;
    
  constructor(user_id: string,chat_id: string) {
      this.user_id = user_id;
      this.chat_id = chat_id;
    }
    async getArchivement(archivement_id: string) {
        try {
            const { data, error } = await supabase.from("users_archivements").select("*,archivements(title)")
            if (error) throw new Error(error.message);
            console.log(data)
            return data;
        }
        catch (err) {
            console.log(err);
        }
    }
}