import { isAxiosError } from "axios"
import api from "../../../lib/axios"
import type { UrsRequestScannSend } from "../../../types/Urs/UrsRequestScann"

export async function GetUrsRequestScann(id: number) {
    try {
        //console.log(formData)
        const url = `/apps/urs/scann/${id}`
        const { data } = await api.get(url)
        console.log(data)
        return data
    }
    catch (error) {
        console.log("paso")
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type CreateUrsRequestScann={
    formData:UrsRequestScannSend,
    id:number
}

export async function CreateUrsRequestScann({formData,id}: CreateUrsRequestScann) {
    try {
        //console.log(formData)
        const url = `/apps/urs/scann/${id}`
        const { data } = await api.post(url,formData)
        console.log(data)
        return data
    }
    catch (error) {
        console.log("paso")
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}