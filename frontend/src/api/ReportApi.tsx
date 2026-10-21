import { isAxiosError } from "axios"
import api from "../lib/axios"

export async function GetProduction(fecha:string ) {
    try {
        //console.log(formData)
        const url = `/report/production`
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