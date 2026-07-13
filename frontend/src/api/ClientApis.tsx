import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { MachineForm } from "../types/MachineForm"
import type { PlantForm } from "../types/PlantForms"
import type { ClientForm } from "../types/ClientSchema"

export async function GetClients() {
    try {
        //console.log(formData)
        const url = `/client`
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
export async function CreateClient(formData:ClientForm) {
    try {
        //console.log(formData)
        const url = `/client`
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
type UpdatePlantProp={
    formData: PlantForm,
    id: number
}

export async function UpdateClient({formData,id}: UpdatePlantProp) {
    try {
        //console.log(formData)
        const url = `/client/${id}`
        const { data } = await api.put(url,formData)
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

export async function DeleteClient(id:number) {
    try {
        //console.log(formData)
        const url = `/client/${id}`
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