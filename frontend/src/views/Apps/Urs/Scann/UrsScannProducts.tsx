import { faArrowLeft, faBarcode, faBox, faBoxOpen, faCar, faCircle, faClock, faCube, faSeedling, faShare, faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useParams } from "react-router-dom"
import { GetUrsRequest } from "../../../../api/Apps/Urs/UrsRequestApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import { UrsGetFolioById } from "../../../../api/Apps/Urs/UrsPriorityApi"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import { useAuth } from "../../../../hook/useAuth"
import { useEffect } from "react"
import { CreateUrsRequestScann, GetUrsRequestScann } from "../../../../api/Apps/Urs/UrsScann"
import type { UrsRequestScannSend } from "../../../../types/Urs/UrsRequestScann"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { formatFolio } from "../../../../Utils/Urs"
import { formatDateUTC, formDateHours } from "../../../../Utils/Date"
import { GetTimeZone } from "../../../../hook/GetTimeZone"

export const UrsScannProducts = () => {
    const { id } = useParams()

    const Auth = useAuth()
    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ['UrsFolio', id],
        queryFn: () => UrsGetFolioById(id),
        //enabled: !fecha,
        retry: false
    })

    const Requests = useQuery({
        queryKey: ['UrsRequests', id],
        queryFn: () => GetUrsRequestScann(id),
        //enabled: !fecha,
        retry: false
    })
    const initialValues: UrsRequestScannSend = {
        Process: 0,
        Box: ''
    }

    const { mutate, isPending } = useMutation({
        mutationFn: CreateUrsRequestScann,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
            setValue("Box", "",)
        },
        onSuccess: (data) => {
            setValue("Box", "",)
            toast.success(data)
        }
    })



    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ defaultValues: initialValues })
    const HandleSubmitBox = (formData: UrsRequestScannSend) => {
        if (isPending) {
            toast.error("Se esta procesando una petición por el momento")
            return
        }
        const send = {
            formData,
            id: id
        }
        mutate(send)
    }

    const procesos = data?.UrsPriority?.PriorityHasProcess?.map(
        x => x.UrsProcess
    )?.filter(x => x.id == Auth.data?.UrsProcessId || !Auth.data?.UrsProcessId);
    const TimeZone = GetTimeZone(Auth?.data?.TimeZone)

    useEffect(() => {
        const LoadData = async () => {
            if (procesos != null) {
                setValue("Process", (procesos[0]?.id != undefined ? procesos[0]?.id : 1), {
                    shouldValidate: true,
                    shouldDirty: true,
                })
            }

        }
        console.log(procesos);
        LoadData()
    }, [data])

    return (
        <form onSubmit={handleSubmit(HandleSubmitBox)}>
            <div className=" sm:hidden flex flex-row items-center bg-blue-950 absolute w-full top-0 left-0 justify-center p-2 gap-2 pb-14 rounded-b-4xl">
                <Link to={`/urs/scann/`} className="absolute top-[20px] left-[15px]">
                    <FontAwesomeIcon icon={faArrowLeft}
                        className="text-white text-2xl" />
                </Link>
                <div>
                    <div className="bg-blue-500 rounded-lg p-2">
                        <FontAwesomeIcon icon={faBoxOpen}
                            className="text-white text-2xl" />
                    </div>
                </div>
                <div className="text-white">
                    <div>
                        Escaneo de productos
                    </div>
                    <div className="text-sm text-gray-400">
                        Urgent Request Shipment
                    </div>
                </div>
            </div>
            <div className="relative p-2 bg-white shadow shadow-gray-400 mt-[55px] rounded-lg">

                <div className="flex flex-row items-center justify-between">
                    <div>
                        <div className="text-sm text-sm">
                            Orden
                        </div>
                        <div className="text-2xl font-bold">
                            #{formatFolio(id)}
                        </div>
                    </div>
                    <div >
                        <div className="flex items-center text-orange-500 uppercase bg-orange-50 h-7 mt-2 rounded-lg text-[10px] border border-orange-200 px-2">
                            <FontAwesomeIcon icon={faCircle} className="text-orange-400 text-lg pr-1" />
                            En tránsito
                        </div>
                    </div>
                </div>
                <div className="border border-gray-200 py-2 grid sm:grid-cols-1 md:grid-cols-4 rounded-2xl">
                    <div className="border-r  border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBox} className="text-3xl text-red-500" />
                        <div className="px-2">
                            <div>
                                Motivo
                            </div>
                            <div>
                                {
                                    Requests?.data?.[0].Reason
                                }
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCar} className="text-3xl text-green-500" />
                        <div className="px-2">
                            <div>
                                Método
                            </div>
                            <div>
                                {
                                    data?.UrsPriority?.Level == 1 ?
                                        <FontAwesomeIcon className="pr-2 text-red-500" icon={faCircle} />
                                        :
                                        <FontAwesomeIcon className="pr-2 text-gray-500" icon={faCircle} />
                                }
                                {Requests?.data?.[0].UrsPriority?.name}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                Fecha propuesta
                            </div>
                            <div>
                                {formatDateUTC(data?.ProposedDate??'')}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                PickUp
                            </div>
                            <div>
                                {formDateHours(new Date(data?.hrs), TimeZone)}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="relative p-2 bg-white shadow shadow-gray-400 my-2 rounded-lg">
                <div className="text-gray-800 text-sm py-2">
                    Proceso
                </div>
                <FormControl className="w-full">
                    <InputLabel className='text-black' id="demo-simple-select-label"
                        sx={{
                            color: "black"
                        }}
                    >Proceso</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={Auth.data?.UrsProcessId ?? getValues("Process")
                            //getValues("motive")

                        }
                        sx={{
                            color: "black !important",
                            "& .MuiSelect-select": {
                                color: "black",
                                WebkitTextFillColor: 'black !important',
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#3b82f6",
                            },
                            "& .MuiInputBase-input": {
                                color: "#fff !important",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#60a5fa",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#60a5fa",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "black !important",
                            },
                            "& span, legend input": {
                                color: "black !important",
                                fill: "black !important",
                            },
                        }}
                        onChange={(event) => {
                            setValue("Process", event.target.value, {
                                shouldValidate: true,
                                shouldDirty: true,
                            });
                        }}
                    >
                        {
                            procesos?.map(elements => (
                                <MenuItem value={elements.id}>{elements.Name}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>
            </div>
            <div className="relative p-2 bg-white shadow shadow-gray-400 my-2 rounded-lg">
                <div className="text-gray-800 text-sm py-2">
                    Escanea o captura un codigo
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="relative flex-1">
                        <div className="absolute h-full left-0 top-[50%] translate-y-[-25%]">
                            <FontAwesomeIcon icon={faBarcode}
                                className="text-2xl text-blue-500 pl-2 pr-2 border-r" />
                        </div>
                        <input type="text"
                            placeholder="Escane el codigo de barras"
                            className="border rounded-lg w-full p-2 border-gray-500 pl-13
                        in:border-blue-500
                        focus:outline-none
                    focus:border-blue-500
                    hover:border-blue-500
                    active:border-blue-500"{...register("Box", {
                                required: "La caja es es obligatoria",

                            })} autoFocus />
                    </div>

                    <button type="submit" className={`${isPending ? " opacity-50 " : "  "} text-white border border-purple-400 bg-purple-500 p-1`} disabled={isPending}>
                        <FontAwesomeIcon icon={faShare} />
                    </button>

                </div>

            </div>
            {!Requests?.isLoading &&
                < section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {Requests?.data?.map(elements => (<div key={`Products${elements.id}`} className={``}>
                        <div className="flex flex-col border border-gray-200 rounded-lg p-2">
                            <div className="flex flex-row justify-between flex-1">
                                <div className="flex flex-row gap-2 items-center flex-1">
                                    <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCube}
                                            className="text-white text-3xl" />
                                    </div>
                                    <div className="flex-1 py-2">
                                        <div className="text-gray-600 text-sm">
                                            MFG
                                        </div>
                                        <div className="font-bold">
                                            {elements?.Codes?.name}
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            SEWS Part Number
                                        </div>
                                        <div className="font-bold">
                                            {elements?.PartNumber}
                                        </div>
                                        <div className="flex flex-row justify-between gap-2 w-full pr-4">
                                            <div>
                                                <div className="text-gray-600 text-sm">
                                                    Customer Part Number
                                                </div>
                                                <div className="font-bold">
                                                    {elements?.CustomerPartNumber}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-gray-600 text-sm">
                                                    ShortPart
                                                </div>
                                                <div className="font-bold">
                                                    {elements?.Customer}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div>
                                    {Math.trunc((elements?.UrsRequestScannHistory?.filter(x => x.UrsProcessId === getValues("Process")).reduce((acc, x) => acc + x.Qty, 0) / elements.Qty) * 100) != 100 ? <div className="bg-blue-100 border border-blue-300 rounded-2xl px-1 text-blue-500 font-bold text-sm">
                                        En escaneo
                                    </div> :
                                        <div className="bg-green-100 border border-green-300 rounded-2xl px-1 text-green-500 font-bold text-sm">
                                            Completo
                                        </div>}
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex-1 text-center">
                                    <div>
                                        Escaneados
                                    </div>
                                    <div className="font-bold text-2xl">
                                        {elements?.UrsRequestScannHistory?.filter(x => x.UrsProcessId == getValues("Process"))?.reduce((acc, x) => acc + x.Qty, 0)}
                                    </div>
                                </div>
                                <div className="bg-gray-400 w-[1px] rotate-25"></div>
                                <div className="flex-1 text-center">
                                    <div>
                                        Objetivo
                                    </div>
                                    <div className="font-bold text-2xl">
                                        {elements.Qty}
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="w-[50px] text-xl">
                                    {Math.trunc((elements?.UrsRequestScannHistory?.filter(x => x.UrsProcessId === getValues("Process")).reduce((acc, x) => acc + x.Qty, 0) / elements.Qty) * 100)}%
                                </div>
                            </div>
                            <div className="w-[calc(100%-50px)] bg-gray-400  rounded-2xl overflow-hidden my-2">
                                <div style={{
                                    width: `${(
                                        elements?.UrsRequestScannHistory?.filter(
                                            x => x.UrsProcessId === getValues("Process")
                                        ).reduce((acc, x) => acc + x.Qty, 0) / elements.Qty
                                    ) * 100}%`
                                }} className={` min-h-2 bg-green-500`}>

                                </div>
                            </div>
                        </div>

                    </div>))}
                </section>
            }
        </form>
    )
}
