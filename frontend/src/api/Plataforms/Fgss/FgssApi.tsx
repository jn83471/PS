import { isAxiosError } from "axios"
import api from "../../../lib/axios";
import type { CreateUsrRequestProduct } from "../../../types/Urs/UsrRequestProductForm";

export async function FgssGetNuParts(codeId:number) {
    try {
        //console.log(formData)
        const url = `fgss/SewspartNumberList/${codeId}`
        const { data } = await api.get(url)
        //localStorage.setItem('AUTH_TOKEN', data)
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

export async function FgssGetNuPartsCustomers(codeId:number,partNumber:string) {
    try {
        //console.log(formData)
        const url = `fgss/SewspartNumberList/${codeId}/${partNumber}`
        const { data } = await api.get(url)
        //localStorage.setItem('AUTH_TOKEN', data)
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
export async function FgssGetNuPartsCustomersCustom(codeId:number,partNumber:string,customerPart:string) {
    try {
        //console.log(formData)
        const url = `fgss/SewspartNumberList/${codeId}/${partNumber}/${customerPart}`
        const { data } = await api.get(url)
        //localStorage.setItem('AUTH_TOKEN', data)
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
