
import { createClient,PostgrestError } from "@supabase/supabase-js";

const API_KEY = process.env.publicAnonKey
const URL = process.env.DbUrl
const supabase = createClient(URL, API_KEY);
export type getUserExperienceType = Array<{
    id: number
    user_id: string
    chat: string
    experience: number
    level: number
    required_exp: number
    message_count: number
  }>
  

export class level_db implements userExperience {
   user_id: string;
   chat_id: string;
    
  constructor(user_id: string,chat_id: string) {
      this.user_id = user_id;
      this.chat_id = chat_id;
  }

  async getUserExperience() {
    try {
      const {
        data,
        error,
      }: { data: getUserExperienceType; error: PostgrestError } = await supabase
        .from("experience")
        .select("*")
        .eq("user_id", this.user_id)
        .eq("chat", this.chat_id);
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllUserExperience() {
    try {
      const {
        data,
        error,
      }: { data: getUserExperienceType; error: PostgrestError } = await supabase
        .from("experience")
              .select("*")
         .order("experience", { ascending: false })
          .eq("chat", this.chat_id);
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllUserExperienceTable() {
    try {
      const {
        data,
        error,
      }: { data: getUserExperienceType; error: PostgrestError } = await supabase
        .from("experience")
              .select("*")
         .order("experience", { ascending: false })
      if (error) throw new Error(error.message);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async insertUserExperience(
    experience: number,
    level: number,
    required_exp: number
  ): Promise<{ status: number; message: string }> {
    try {
      const { error } = await supabase
        .from("experience")
        .insert({
          chat: this.chat_id,
          user_id: this.user_id,
          experience,
          level,
          required_exp,
        });
      if (error) throw new Error(error.message);
      return { status: 201, message: "User experience added" };
    } catch (err) {
      console.log(err);
      return { status: 500, message: "Error" };
    }
  }
  async updateUserExperience(

    experience: number,
    level: number,
    required_exp: number
  ): Promise<{ status: number; message: string }> {
    try {
      const { error } = await supabase
        .from("experience")
        .update({ experience, level, required_exp })
        .eq("user_id", this.user_id)
        .eq("chat", this.chat_id);
      if (error) throw new Error(error.message);
      return { status: 201, message: "User experience updated" };
    } catch (err) {
      console.log(err);
      return { status: 500, message: "Error" };
    }
  }
  async deleteUserExperience(

  ): Promise<{ status: number; message: string }> {
    try {
      const { error } = await supabase
        .from("experience")
        .delete()
        .eq("user_id", this.user_id)
        .eq("chat", this.chat_id);
      if (error) throw new Error(error.message);
      return { status: 201, message: "User experience deleted" };
    } catch (err) {
      console.log(err);
      return { status: 500, message: "Error" };
    }
  }
}
export declare class userExperience {
     getAllUserExperience(): Promise<getUserExperienceType>
     getAllUserExperienceTable(): Promise<getUserExperienceType>

     getUserExperience(): Promise<getUserExperienceType>
     insertUserExperience(experience:number,level:number,required_exp:number): Promise<{status:number,message:string}>
     updateUserExperience(experience:number,level:number,required_exp:number): Promise<{status:number,message:string}>
    deleteUserExperience(): Promise<{ status: number, message: string }>
    
}