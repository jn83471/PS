import api from "../../../lib/axios"

export async function GetLineMonitor(fecha: string, shift: number) {
    try {
        //console.log(formData)
        const url = `/apps/linemonitor`
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