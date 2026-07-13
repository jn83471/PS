import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { MachineForm } from "../types/MachineForm"

export async function GetMachines() {
    try {
        //console.log(formData)
        const url = `/machine`
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
export async function CreateMachine(formData:MachineForm) {
    try {
        //console.log(formData)
        const url = `/machine`
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

type UpdateMachineProp={
    formData: MachineForm,
    id: number
}

export async function UpdateMachines({formData,id}: UpdateMachineProp) {
    try {
        //console.log(formData)
        const url = `/machine/${id}`
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


export async function DeleteMachine(id:number) {
    try {
        //console.log(formData)
        const url = `/machine/${id}`
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