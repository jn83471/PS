import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { MachineForm } from "../types/MachineForm"
import type { PlantForm } from "../types/PlantForms"

export async function GetPlants() {
    try {
        //console.log(formData)
        const url = `/plant`
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
export async function CreatePlant(formData:PlantForm) {
    try {
        //console.log(formData)
        const url = `/plant`
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

export async function UpdatePlants({formData,id}: UpdatePlantProp) {
    try {
        //console.log(formData)
        const url = `/Plant/${id}`
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

export async function DeletePlants(id:number) {
    try {
        //console.log(formData)
        const url = `/Plant/${id}`
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