'use server'
import axios from "axios";
import { cookies } from "next/headers";


export default axios.create({
    baseURL: "http://localhost:9090",
    headers: { Cookie: cookies().toString() },
    withCredentials: true
})