import { faBox, faBoxOpen, faCancel, faCar, faCheck, faCircle, faClock, faClose, faDashboard, faDiagnoses, faEdit, faEye, faFilePdf, faPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { CreateUrsRequestFolio, FirstVerify, SecondVerify, ursCancelFolio, UrsGetFolioById, UrsGetPriority, VerificateUrsRequest } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { UrsVerificateFolio, UrsVerificateFolioCpLocal, UsrGenerateFolio } from "../../../../types/Urs/UrsRequestFolio"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { UrsModalAddProduct } from "../../../../components/Apps/Urs/UrsModalAddProduct"
import { CancelUrsRequest, GetUrsRequest, UpdateProposedDateUrsRequest } from "../../../../api/Apps/Urs/UrsRequestApi"
import { UrsCardComponent } from "../../../../components/Apps/Urs/UrsCardComponent"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import Button from "@mui/material/Button"
import type { UpdateUrsRequestProduct } from "../../../../types/Urs/UsrRequestProductForm"
import { useAuthWithApps } from "../../../../hook/useAuth"
import { GetTimeZone } from "../../../../hook/GetTimeZone"
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables"


export const UrsVerificateFolioSMTS = () => {
    const User = useAuthWithApps()
    const columns = [
        "MFG",
        "SEWS Part Number",
        "Customer Part Number",
        "Customer",
        "QTY",
        "Reason",
        "Method",

    ]
    const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
    const TimeZone = GetTimeZone(User?.data?.TimeZone)

    const Navigates = useNavigate()
    const { id } = useParams()


    const { data, isError, isLoading, error, refetch } = useQuery({
        queryKey: ['UrsFolio', id],
        queryFn: () => UrsGetFolioById(id),
        //enabled: !fecha,
        retry: false
    })

    const Requests = useQuery({
        queryKey: ['UrsRequests', id],
        queryFn: () => GetUrsRequest(id),
        //enabled: !fecha,
        retry: false
    })

    console.log(Requests?.data)

    const { mutate } = useMutation({
        mutationFn: SecondVerify,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            Navigates('/urs/verificationssmts')
        }
    })

    const FolioActions = useMutation({
        mutationFn: ursCancelFolio,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            Navigates('/urs/verifications')
        }
    })
    const UpdateRequestDate = useMutation({
        mutationFn: UpdateProposedDateUrsRequest,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const CancelRequest = useMutation({
        mutationFn: CancelUrsRequest,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            Requests.refetch()
        }
    })

    const HandleSecondVeryfyFolio = (e) => {
        e.preventDefault()
        const dt: UrsVerificateFolio = {
            Verify: 3,
        }
        console.log(dt)

        mutate({ formData: dt, idFolio: id })
    }
    const HandleCancelFolio = () => {
        const dt: UrsVerificateFolio = {
            Verify: 1,
        }
        console.log(dt)

        FolioActions.mutate({ idFolio: id })
    }
    const handleChangeDatePropocedProduct = (RequestId: number, ProposedDate: string) => {
        const formData: UpdateUrsRequestProduct = {
            ProposedDate: ProposedDate
        }
        const send = {
            formData,
            id: id,
            idRequest: RequestId
        }
        UpdateRequestDate.mutate(send)
    }

    const handleCancelRequest = (RequestId: number) => {

        const send = {
            id: id,
            idRequest: RequestId
        }
        CancelRequest.mutate(send)

    }

    { isLoading && <></> }

    useEffect(() => {
        const loadData = async () => {
            console.log(data.id)
            //await setPlant(data[0].id.toString());
            //console.log(plant)
            if (data?.Process == 99) {
                Navigates('/urs/verifications')
            }
        }
        if (data?.id != undefined) {
            loadData()
        }
    }, [data]);


    const column: GridColDef[] = [
        {
            field: 'id', headerName: 'MFG', width: 80, minWidth: 80,
            renderCell: (params) => (
                <>
                    {params.row.Codes.name}
                </>
            )
        },
        {
            field: 'ProposedDate', headerName: 'Fecha propuesta', minWidth: 190, flex: 1
            , valueGetter: (_, row) => new Date((data.ProposedDate).substring(0, 10).split('-').map(Number)).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }) ?? ''
            , renderCell: (params) => (
                <>
                    {new Date((data.ProposedDate).substring(0, 10).split('-').map(Number)).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                </>
            )
        },
        {
            field: 'ProposedDateAtn', headerName: 'Fecha propuesta Atn', minWidth: 190, flex: 1
            , valueGetter: (_, row) => new Date((row.ProposedDate ?? data.ProposedDate).split('-').map(Number)).toLocaleDateString('es-MX', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            }) ?? ''
            , renderCell: (params) => (
                <>
                    {new Date((params.row.ProposedDate ?? data.ProposedDate).substring(0, 10).split('-').map(Number)).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                </>
            )
        },
        //ProposedDate
        {
            field: 'SEWS Part No', headerName: 'SEWS Part No', minWidth: 130, flex: 1
            , valueGetter: (_, row) => row.PartNumber ?? ''
            , renderCell: (params) => (
                <>
                    {params.row.PartNumber}
                </>
            )
        },
        {
            field: 'Customer Part No', headerName: 'Customer Part No', minWidth: 130, flex: 1
            , valueGetter: (_, row) => row.CustomerPartNumber ?? ''
            , renderCell: (params) => (
                <>
                    {params.row.CustomerPartNumber}
                </>
            )
        },
        {
            field: 'Customer', headerName: 'Customer', width: 110
            , valueGetter: (_, row) => row.Customer ?? ''
            , renderCell: (params) => (
                <>
                    {params.row.Customer}
                </>
            )
        },
        {
            field: 'Qty', headerName: 'Qty', width: 80
            , valueGetter: (_, row) => row.Qty ?? ''
            , renderCell: (params) => (
                <>
                    {params.row.Qty}
                </>
            )
        },
        {
            field: 'Reason', headerName: 'Reason', minWidth: 180, flex: 1
            , valueGetter: (_, row) => row.Reason ?? ''
            , renderCell: (params) => (
                <div className="flex items-center py-3">
                    <div className="flex items-center text-blue-900 bg-blue-50/30 h-7 mt-2 rounded-lg text-sm border border-blue-100/50 px-2">
                        <FontAwesomeIcon icon={faCircle} className="text-blue-400 font-bold text-sm pr-1" />
                        {params.row.Reason}
                    </div>
                </div>

            )
        },
        {
            field: 'Status', headerName: 'Estado', minWidth: 120
            , valueGetter: (_, row) => row.Reason ?? ''
            , renderCell: (params) => (
                params.row.Process == 99 ?
                    <div className="flex items-center py-3">
                        <div className="flex items-center text-red-900 bg-red-100 h-7 mt-2 rounded-lg text-sm border border-red-100 px-2">
                            <FontAwesomeIcon icon={faCancel} className="text-red-400 font-bold text-sm pr-1" />
                            Cancelado
                        </div>
                    </div>
                    :
                    <div className="flex items-center py-3">
                        <div className="flex items-center text-green-900 bg-green-100 h-7 mt-2 rounded-lg text-sm border border-green-100 px-2">
                            <FontAwesomeIcon icon={faCheck} className="text-green-400 font-bold text-sm pr-1" />
                            Activo
                        </div>
                    </div>
            )
        },
        /*{
            field: 'priorityLevel', headerName: 'Prioridad', minWidth: 130, flex: 1
            , valueGetter: (_, row) => {
                let val = "";
                if (row.UrsPriority?.Level == 1) {
                    val = "urgente"
                }
                else {
                    val = "Regular"
                }
                return val
            }
            , renderCell: (params) => (
                <>
                    {
                        params.row.UrsPriority?.Level == 1 ?
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faCircle} className="text-red-500 text-lg pr-1" />
                                Urgente
                            </div>
                            : <div>
                                <FontAwesomeIcon icon={faCircle} className="text-gray-500 text-lg pr-1" />
                                Regular
                            </div>
                    }
                </>
            )
        },*/
        {
            field: 'Method', headerName: 'Método', minWidth: 130, flex: 1
            , valueGetter: (_, row) => row.UrsPriority?.name ?? ''
            , renderCell: (params) => (
                <>
                    {
                        params.row.UrsPriority?.name
                    }
                </>
            )
        }

    ];
    const [year, month, day] = (data?.ProposedDate ?? '').substring(0, 10).split('-').map(Number);


    return (
        <>
            <div className="flex flex-col lg:flex-row py-2">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">
                        #URS{`${id?.toString().padStart(10, '0')}`}
                    </h1>
                    <small className="text-sm text-gray-500">
                        Rastrear, priorizar y coordinar los envíos de materiales críticos.
                    </small>
                </div>

                <div className="border border-gray-200 py-2 grid sm:grid-cols-1 md:grid-cols-2 rounded-2xl">
                    {/*<div className="border-r  border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBox} className="text-3xl text-red-500" />
                        <div className="px-2">
                            <div>
                                Motivo
                            </div>
                            <div>
                                {
                                    data?.motive
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
                                {data?.UrsPriority?.name}
                            </div>
                        </div>
                    </div>*/}
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                Fecha propuesta
                            </div>
                            <div>
                                {
                                    year && new Date(year, month - 1, day).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })

                                }
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                Pickup
                            </div>
                            <div>
                                {new Date(data?.hrs).toLocaleDateString('es-MX', {
                                    timeZone: TimeZone,
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }).split(" ").toString().substring(13).toUpperCase() ?? ''
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div>


                <div className="overflow-x-auto rounded-lg border border-gray-200 my-2">




                    {Requests?.data?.length == 0 ?
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        columns.map((e, index) => (
                                            <th key={`col${index}`} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{e}</th>
                                        ))
                                    }

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td colSpan={11}>
                                        <div className="h-[50vh] flex items-center justify-center">
                                            <div>
                                                <div className="text-center">
                                                    <FontAwesomeIcon className="sm:text-2xl md:text-9xl text-blue-700" icon={faBoxOpen} />
                                                </div>
                                                <div className="text-center py-2">
                                                    <div className="sm:text-xl md:text-2xl font-bold md:py-2">
                                                        No hay productos agregados
                                                    </div>

                                                    <div className="text-center">

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table> :
                        <UrsTables rows={Requests?.data} column={column}/>

                    }


                </div>
                <div className="md:px-4 py-3 flex flex-row justify-end">
                    <button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                        <FontAwesomeIcon icon={faCancel} /> Cancelar
                    </button>
                    <form onSubmit={HandleSecondVeryfyFolio}>
                        <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                            <FontAwesomeIcon icon={faPlus} /> Guardar
                        </button>
                    </form>

                </div>
            </div>

        </>)
}
