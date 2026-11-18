import { isAxiosError } from "axios"
import api from "../../../lib/axios"
import type { UrsChangeHrs, UrsVerificateFolio, UrsVerificateFolioCpLocal, UrsVerificateSendFolio, UsrGenerateFolio } from "../../../types/Urs/UrsRequestFolio"

export async function UrsGetPriority() {
    try {
        const url = `/apps/urs/priority`
        const { data } = await api.get(url)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

//folios

export async function UrsGetFolios() {
    try {
        const url = `/apps/urs/folios`
        const { data } = await api.get(url)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function UrsGetFolioById(id: number) {
    try {
        const url = `/apps/urs/folios/${id}`
        const { data } = await api.get(url)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function CreateUrsRequestFolio(formData: UsrGenerateFolio) {
    try {
        const url = `/apps/urs/folios`
        const { data } = await api.post(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type FirstVerifyprop = {
    formData: UrsVerificateFolio,
    idFolio: number
}
export async function FirstVerify({ formData, idFolio }: FirstVerifyprop) {
    try {
        const url = `/apps/urs/folios/${idFolio}/Verify`
        const { data } = await api.post(url, {
            Verify: formData.Verify
        })
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type SecondVerifyprop = {
    formData: UrsVerificateFolioCpLocal,
    idFolio: number
}
export async function SecondVerify({ formData, idFolio }: SecondVerifyprop) {
    try {
        const url = `/apps/urs/folios/${idFolio}/Verify`
        const { data } = await api.post(url, {
            Verify: formData.Verify,
            ProposedDate: formData.ProposedDate
        })
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

type UrsChangePickUpProp = {
    formData: UrsChangeHrs,
    idFolio: number
}

export async function UrsChangePickUp({ formData, idFolio }: UrsChangePickUpProp) {
    try {
        const url = `/apps/urs/folios/${idFolio}/ChangePickUp`
        const { data } = await api.post(url,formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


type ThirdVerifyprop = {
    formData: UrsVerificateSendFolio,
    idFolio: number
}
export async function ThirdVerify({ formData, idFolio }: ThirdVerifyprop) {
    try {

        const formD = new FormData();
        formD.append("Verify", formData.Verify.toString());


        formData.files.forEach((file) => {
            formD.append("files", file);
        });
        const url = `/apps/urs/folios/${idFolio}/Verify`
        const { data } = await api.post(url, formD,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


type UrsCancelFolioProp = {
    idFolio: number
}
export async function ursCancelFolio({ idFolio }: UrsCancelFolioProp) {
    try {
        const url = `/apps/urs/folios/${idFolio}`
        const { data } = await api.delete(url)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function VerificateUrsRequest({ formData, id }: UrsVerificateFolio) {
    try {
        const url = `/apps/urs/request/${id}`
        const { data } = await api.post(url, formData)
        return data
    }
    catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

