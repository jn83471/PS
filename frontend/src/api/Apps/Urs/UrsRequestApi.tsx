import { isAxiosError } from "axios"
import api from "../../../lib/axios"
import type { CreateUsrRequestProduct, UpdateUrsRequestProduct } from "../../../types/Urs/UsrRequestProductForm"


export async function GetUrsRequest(id: number) {
    try {
        //console.log(formData)
        const url = `/apps/urs/request/${id}`
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

export async function GetUrsRequestDetails(id: number) {
    try {
        //console.log(formData)
        const url = `/apps/urs/request/detail/${id}`
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



export async function CreateUrsRequest({formData,id}: UrsRequestCreateProp) {
    try {
        //console.log(formData)
        const url = `/apps/urs/request/${id}`
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

type CancelDateUrsRequestProp={
    id:number,
    idRequest:number
}

export async function CancelUrsRequest({id,idRequest}: CancelDateUrsRequestProp) {
    try {
        //console.log(formData)
        const url = `/apps/urs/request/${id}/${idRequest}`
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

type UpdateProposedDateUrsRequestProp={
    formData:UpdateUrsRequestProduct,
    id:number,
    idRequest:number
}

export async function UpdateProposedDateUrsRequest({formData,id,idRequest}: UpdateProposedDateUrsRequestProp) {
    try {
        //console.log(formData)
        const url = `/apps/urs/request/${id}/${idRequest}/ProposedDate`
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

