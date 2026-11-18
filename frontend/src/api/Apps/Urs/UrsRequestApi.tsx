import { isAxiosError } from "axios"
import api from "../../../lib/axios"
import type { CreateUsrRequestProduct, UpdateUrsRequestProduct } from "../../../types/Urs/UsrRequestProductForm"


export async function GetUrsRequest(id: number) {
    try {
        const url = `/apps/urs/request/${id}`
        const { data } = await api.get(url)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function GetUrsRequestDetails(id: number) {
    try {
        const url = `/apps/urs/request/detail/${id}`
        const { data } = await api.get(url)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}



export async function CreateUrsRequest({formData,id}: UrsRequestCreateProp) {
    try {
        const url = `/apps/urs/request/${id}`
        const { data } = await api.post(url,formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function UpdateUrsRequest({formData,id,idRequest}: UrsRequestCreateProp) {
    try {
        const url = `/apps/urs/request/${id}/${idRequest}`
        const { data } = await api.put(url,formData)
        return data
    }
    catch (error) {
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
        const url = `/apps/urs/request/${id}/${idRequest}`
        const { data } = await api.delete(url)
        return data
    }
    catch (error) {
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
        const url = `/apps/urs/request/${id}/${idRequest}/ProposedDate`
        const { data } = await api.put(url,formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

