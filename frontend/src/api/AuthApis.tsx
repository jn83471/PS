import { isAxiosError } from "axios"
import api from "../lib/axios";
import { userSchema, type UserLoginForm } from "../types/UserForms";

export async function AuthLoginApi(formData: UserLoginForm) {
    try {
        //console.log(formData)
        const url = `/auth/Login`

            const { data } = await api.post(url, formData)
            localStorage.setItem('AUTH_TOKEN', data)
            return data

        
        
    }
    catch (error) {
        console.log("paso")
        if (isAxiosError(error) && error.response) {
            console.log("a")
            throw new Error(error.response.data.error)
        }
    }
}


export async function getUser() {
    try{
        //console.log(formData)
        const url=`/auth/user`
        const {data}=await api.get(url)
        //console.log(data)
        const resp=userSchema.safeParse(data)
        if(resp.success){
            return resp.data
        }
        
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserApps() {
    try{
        //console.log(formData)
        const url=`/auth/userApps`
        const {data}=await api.get(url)
        //console.log(data)
        const resp=userSchema.safeParse(data)
        if (!resp.success) {
            throw new Error("Respuesta inválida");
        }
        if(resp.success){
            return resp.data
        }
        
    }
    catch(error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}