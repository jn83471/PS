import { isAxiosError } from "axios"
import api from "../../../lib/axios"
import type { HourByHourForm } from "../../../types/HourByHour/HourByHourSchema"
import type { HourByHourEventsForm } from "../../../types/HourByHour/HourByHourEventsSchema"

export async function HourByHourGetAllInfo(formData: HourByHourForm) {
    try {
        //console.log(formData)
        const url = `/apps/HourByHour/Details`
        const { data } = await api.post(url, formData)
        console.log(data)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function HourByHourGetTime(id: number) {
    try {
        //console.log(formData)
        const url = `/apps/HourByHour/Time/${id}`
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

type HourByHourSendEventsprop = {
    formData: HourByHourEventsForm,
    idMachine: number
}
export async function HourByHourSendEvents({formData,idMachine}:HourByHourSendEventsprop) {
    try {
        //console.log(formData)
        const url = `/apps/HourByHour/Time/${idMachine}`
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