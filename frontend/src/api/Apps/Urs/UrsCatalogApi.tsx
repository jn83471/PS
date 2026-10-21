import { isAxiosError } from "axios"
import api from "../../../lib/axios"

export async function UrsGetCatalog() {
    try {
        //console.log(formData)
        const url = `/apps/urs/catalog`
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