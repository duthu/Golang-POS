"use server";
import { cookies } from "next/headers";
import api_axios from "../../../api_axios";
export default async function TryLogin(userData) {
  
   try {
     let res = await api_axios.post("/login", userData, {
       headers: { "Content-Type": "application/x-www-form-urlencoded" },
       withCredentials: true,
       
     });
     var authToken = res.data.token
     const cookieStore = cookies()
     cookieStore.set("Authorization", authToken)
     return true
   } catch (error) {
     return error.response.data.error;
   }

}
 