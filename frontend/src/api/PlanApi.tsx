import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { PlanCreateForm, UploadPlanSchemaForm } from "../types/PlanForms"

export async function GetPlans(fecha: string) {
    try {
        const url = `/plan`
        const { data } = await api.get(url, {
            params: {
                fecha
            }

        })
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function GetPartNumberMachine(machineId) {
    try {
        const url = `/plan/PartNumberMachine/${machineId}`
        const { data } = await api.get(url,)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function GetPlanView(fecha: string, shift: number) {
    try {
        const url = `/plan/planview`
        const { data } = await api.get(url, {
            params: {
                fecha,
                shift
            }

        })
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function CreatePlan(formData: UploadPlanSchemaForm) {
    try {
        const formDatas = new FormData();
        formDatas.append("Plan", formData.plan);
        formDatas.append("fecha", formData.fecha);
        const url = `/plan`
        const { data } = await api.post(url, formDatas)
        return data
    }
    catch (error) {
        console.log("paso")
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function DeletePlan(id: number) {
    try {
        const url = `/plan/${id}`
        const { data } = await api.delete(url)
        return data
    }
    catch (error) {
        console.log("paso")
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function CreatePlanManual(formData: PlanCreateForm) {
    try {
        const url = `/plan/Create`
        const { data } = await api.post(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type UpdateClientProp = {
    formData: PlanCreateForm,
    id: number
}

export async function UpdatePlanManual({ formData, id }: UpdateClientProp) {
    try {
        const url = `/plan/Edit/${id}`
        const { data } = await api.put(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
