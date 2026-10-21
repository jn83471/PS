import { faBarsProgress, faBoxOpen, faBus, faCalendarDays, faCancel, faCheck, faCheckCircle, faCircle, faClose, faCreditCard, faDownload, faEdit, faEye, faPlus, faSave, faSeedling, faUser, faVoicemail } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import Timeline from "@mui/lab/Timeline"
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import type { UrsVerificateFolio } from "../../../types/Urs/UrsRequestFolio"
import { ursCancelFolio, UrsChangePickUp, UrsGetFolioById } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { GetUrsRequest } from "../../../../api/Apps/Urs/UrsRequestApi"
import { useAuthWithApps } from "../../../../hook/useAuth"
import { GetTimeZone } from "../../../../hook/GetTimeZone"
import { useEffect, useMemo, useState } from "react"
import FormControl from "@mui/material/FormControl"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { UrsTimeLine } from "../../../../components/Apps/Urs/UrsTimeLine"
import { formatDateTimeZone, formDateHours } from "../../../../Utils/Date"
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables"
import type { UrsChangeHrs } from "../../../../types/Urs/UrsRequestFolio"
import { useForm } from "react-hook-form"


type UrsModalDetailsProp = {
    id: number,
    setId: any,
    refetch: any,
    url: string,
    save: any
}
export const UrsChangeHrs = ({ id, setId, refetch, url, save }: UrsModalDetailsProp) => {


    /*const initialValues: UsrGenerateFolio = {
        ProposedDate: dayjs().format("YYYY-MM-DD"),
        UrsPriorityId: 0,
        motive: 'Cust. Increase',
        Hrs: dayjs().format("YYYY-MM-DD HH:mm")
      }
      
      const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ defaultValues: initialValues })
      const HandleSubmitFolio = (formData: UsrGenerateFolio) => {
        mutate(formData)
      }*/
     const Navigate=useNavigate()
     const [chechedChangePickUp, setChechedChangePickUp] = useState(false)
    const [fecha, setFecha] = useState<Dayjs | null>(null);

     const initialValues:UrsChangeHrs={
        Hrs:fecha
     }

     const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ defaultValues: initialValues })
    const ChangePickUpHour = useMutation({
        mutationFn: UrsChangePickUp,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {

            toast.success(data)
            Navigate(`/urs/`)
        }
    })
    const auth = useAuthWithApps()
    const TimeZone = GetTimeZone(auth?.data?.TimeZone)
    const formatDate = (date?: string) => {
        if (!date) return "-";

        return dayjs(date)
            .tz(TimeZone)
            .format("DD MMM YYYY ");
        //hh:mm A
    };
    const formatDateUTC = (date?: string) => {
        if (!date) return "-";

        return dayjs(date).format("DD MMM YYYY");
    };
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['UrsFolio', id],
        queryFn: () => UrsGetFolioById(id),
        //enabled: !fecha,
        retry: false
    })

    const Navigates = useNavigate()
    console.log(TimeZone)

    const Requests = useQuery({
        queryKey: ['UrsRequests', id],
        queryFn: () => GetUrsRequest(id),
        //enabled: !fecha,
        retry: false
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
            refetch()
            setId({
                id: 0
            })
        }
    })
    const HandleCancelFolio = () => {

        FolioActions.mutate({ idFolio: id })
    }
    

    const column: GridColDef[] = useMemo<GridColDef[]>(() => [
        {
            field: 'id', headerName: 'MFG', width: 80, minWidth: 80,
            renderCell: (params) => params.row.Codes.name
        },
        {
            field: 'ProposedDate', headerName: 'Fecha propuesta', minWidth: 190, flex: 1
            , valueGetter: (_, row) => formatDateTimeZone(data?.ProposedDate?.substring(0, 10), TimeZone)

        },
        {
            field: 'ProposedDateAtn', headerName: 'Fecha propuesta Atn', minWidth: 190, flex: 1
            , valueGetter: (_, row) => formatDateTimeZone(row.ProposedDate ?? data.ProposedDate, TimeZone)
        },
        {
            field: 'SEWS Part No', headerName: 'SEWS Part No', minWidth: 130, flex: 1
            , valueGetter: (_, row) => row.PartNumber ?? ''
        },
        {
            field: 'CustomerPartNumber', headerName: 'Customer Part No', minWidth: 130, flex: 1

        },
        {
            field: 'Customer', headerName: 'Customer', width: 110
        },
        {
            field: 'Qty', headerName: 'Qty', width: 80

        },
        {
            field: 'Reason', headerName: 'Reason', minWidth: 180, flex: 1
            , valueGetter: (_, row) => row.Reason ?? ''
            , renderCell: (params) => (
                <div className="flex items-center text-blue-900 bg-blue-50/30 h-7 mt-2 rounded-lg text-sm border border-blue-100/50 px-2">
                    <FontAwesomeIcon icon={faCircle} className="text-blue-400 font-bold text-sm pr-1" />
                    {params.row.Reason}
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
    ], [data]);

    useEffect(() => {
        if (data?.hrs) {
            setFecha(dayjs(data.hrs).tz(TimeZone));
        }
    }, [data?.hrs, TimeZone]);

    const savePickUp = () => {
        const dt:UrsChangeHrs={
            Hrs:fecha.format("YYYY-MM-DD HH:mm")
        }
        const send={
            formData: dt,
            idFolio: id
        }
        ChangePickUpHour.mutate(send)
    }
    const HandleDownloadFile = () => {
        UrsDownloadASN(id)
    }

    return (
        <>
            <div className="fixed bg-black/30 top-0 left-0 w-screen h-screen flex justify-center items-center z-90">
                <div className="w-[1600px] max-w-[90vw] max-h-[90vh] h-[900px] bg-white rounded-lg p-2 relative flex flex-col">
                    <button onClick={() => {
                        setId({
                            id: 0
                        })
                    }} className="absolute right-0 top-0 translate-y-[-50%] translate-x-[50%] rounded-full bg-red-600 w-7 h-7 flex justify-center items-center text-white font-bold z-50">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                    <div className="flex items-center flex-row p-2">
                        <div className="text-5xl text-purple-500">
                            <FontAwesomeIcon icon={faBoxOpen} />
                        </div>
                        <div>
                            <div className="font-bold text-2xl">
                                URS
                            </div>
                            <div className="text-sm text-gray-400">
                                Urgent Request for Shipment
                            </div>
                        </div>

                    </div>

                    <div className="flex-1 relative">
                        <div className="flex flex-row p-2 h-full absolute w-full top-0 left-0 overflow-y-auto">
                            <div className="flex-1 p-2 w-[calc(100%-300px)]">
                                <div className="border border-gray-200 px-2 rounded-lg">
                                    <div className="flex flex-row py-2">
                                        <div className="flex-1 flex items-center flex-row gap-2 py-2">
                                            <div>
                                                <FontAwesomeIcon icon={faBarsProgress}
                                                    className="text-purple-600 " />
                                            </div>
                                            <div className="font-bold">
                                                Indicadores principales
                                            </div>
                                        </div>
                                        {data?.Verify >= 4 && <button onClick={HandleDownloadFile}
                                            className="p-2 text-sm rounded-lg border border-green-500 bg-green-100/50 text-black
                                    hover:bg-green-500 hover:text-white duration-150 ease-in">
                                            <FontAwesomeIcon icon={faDownload}
                                                className="pr-1" />
                                            ASN
                                        </button>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 ">

                                        <div className="border-t border-t-gray-300 md:border-t-0 py-2 px-2">
                                            <div className="flex items-center flex-row gap-2 text-gray-700">
                                                <div>
                                                    <FontAwesomeIcon icon={faCreditCard}
                                                        className=" " />
                                                </div>
                                                <div className="">
                                                    Pickup
                                                </div>
                                            </div>
                                            <div className="flex items-center flex-row gap-2 text-gray-700 py-2">

                                                <div className="">
                                                    {formDateHours(new Date(data?.hrs), TimeZone)}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {chechedChangePickUp && <FormControl sx={{
                                                width: "100%"
                                            }}>

                                                <TimePicker label={'Hora pickup'} value={fecha} views={['hours', 'minutes']}
                                                    onChange={async (newValue) => {
                                                        //await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                                                        await setFecha(newValue);

                                                        console.log(fecha)
                                                    }} />
                                            </FormControl>}
                                        </div>
                                        <div className="text-right px-2">
                                            {
                                                !chechedChangePickUp ?
                                                    <button onClick={() => setChechedChangePickUp(true)} className="bg-blue-100 border-blue-600 text-blue-600 border p-2">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                        Cambiar hora de pick up
                                                    </button> :
                                                    <button onClick={savePickUp} className="bg-green-50 border-green-600 text-green-600 border p-2">
                                                        <FontAwesomeIcon icon={faSave} />
                                                        Guardar
                                                    </button>
                                            }
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto rounded-lg border border-gray-200  overflow-y-auto hidden sm:block">
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


                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table> :
                                            <UrsTables column={column} rows={Requests?.data} />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="hidden sm:block w-[300px]">
                                <UrsTimeLine data={data} TimeZone={TimeZone} />
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        {data?.Verify == 2 && <button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                            <svg data-prefix="fas" data-icon="ban" className="svg-inline--fa fa-ban" role="img" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"></path></svg> Cancelar</button>}
                        <button onClick={save} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            Guardar
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
}
