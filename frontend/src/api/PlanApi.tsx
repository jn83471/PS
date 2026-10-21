import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { UploadPlanSchemaForm } from "../types/PlanForms"

export async function GetPlans(fecha: string) {
    try {
        //console.log(formData)
        const url = `/plan`
        const { data } = await api.get(url, {
            params: {
                fecha
            }

        })
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

export async function GetPartNumberMachine(machineId) {
    try {
        //console.log(formData)
        const url = `/plan/PartNumberMachine/${machineId}`
        const { data } = await api.get(url,)
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

export async function GetPlanView(fecha: string, shift: number) {
    try {
        //console.log(formData)
        const url = `/plan/planview`
        const { data } = await api.get(url, {
            params: {
                fecha,
                shift
            }

        })
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

export async function CreatePlan(formData: UploadPlanSchemaForm) {
    try {
        //console.log(formData)
        const formDatas = new FormData();
        formDatas.append("Plan", formData.plan);
        formDatas.append("fecha", formData.fecha);
        const url = `/plan`
        const { data } = await api.post(url, formDatas)
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