import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { MachineForm } from "../types/MachineForm"
import type { CodeForm } from "../types/CodeSchema"

export async function GetCode() {
    try {
        //console.log(formData)
        const url = `/code`
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

export async function CreateCode(formData:CodeForm) {
    try {
        //console.log(formData)
        const url = `/code`
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

export async function DeleteCode(id:number) {
    try {
        //console.log(formData)
        const url = `/code/${id}`
        const { data } = await api.delete(url)
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
