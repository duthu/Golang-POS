"use server";

import server_axios from "../../../../server_axios";
export default async function AddCategorySubmit(jsoned_body) {
  
   try {
     let res = await server_axios.post("/api/addCategory", jsoned_body, {
       
       withCredentials: true,
       
     });
     return true
   } catch (error) {
    console.log(error)
     return error.response.data.error;
   }

}