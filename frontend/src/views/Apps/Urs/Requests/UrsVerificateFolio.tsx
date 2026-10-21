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
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables"
import { GetTimeZone } from "../../../../hook/GetTimeZone"
import { useAuthWithApps } from "../../../../hook/useAuth"
import { UrsVerificateFolioDesktop } from "../../../../components/Apps/Urs/UrsVerificateFolio/UrsVerificateFolioDesktop"
import { isMobile, isTabletOnly } from "../../../../Utils/Media"
import type { UrsVerficationMobile } from "../../../../components/Apps/Urs/UrsVerfication/UrsVerficationMobile"
import { UrsVerificateFolioMobile } from "../../../../components/Apps/Urs/UrsVerificateFolio/UrsVerificateFolioMobile"


export const UrsVerificateFolio = () => {
    const columns = [
        "MFG",
        "SEWS Part Number",
        "Customer Part Number",
        "Customer",
        "QTY",
        "Reason",
        "Method",

    ]
    const User = useAuthWithApps()
    const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
    const Navigates = useNavigate()
    const { id } = useParams()
    const TimeZone = GetTimeZone(User?.data?.TimeZone)


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
            Navigates('/urs/verifications')
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
            //toast.success(data)
            console.log(data)
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
        const dt: UrsVerificateFolioCpLocal = {
            Verify: 2,
            ProposedDate: fecha.format("YYYY-MM-DD")
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
            renderCell: (params) => params.row.Codes.name
        },
        {
            field: 'ProposedDate', headerName: 'Fecha propuesta', minWidth: 190, flex: 1
            , valueGetter: (_, row) => row.PartNumber ?? ''
            , renderCell: (params) => (
                <DatePicker
                    label="Fecha propuesta"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    yearsOrder="desc"
                    value={dayjs((params.row.ProposedDate ?? data.ProposedDate).substring(0, 10))}
                    onChange={async (newValue) => {
                        console.log(newValue)
                        console.log(newValue.format("YYYY-MM-DD"))
                        handleChangeDatePropocedProduct(params.row.id, newValue.format("YYYY-MM-DD"))
                        params.row.ProposedDate = newValue.format("YYYY-MM-DD")
                    }}
                    sx={{
                        marginTop: 1,
                        '& .MuiInputBase-input': {

                            color: '#fff',
                        },
                        '& .MuiInputLabel-root': {
                            color: '#ccc',
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#fff',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#fff',
                        },

                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#888',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#fff',
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: '#fff',
                        },
                        '& input::placeholder': {
                            color: '#ccc',
                            opacity: 1,
                        },
                    }}

                />
            )
        },
        //ProposedDate
        {
            field: 'SEWS Part No', headerName: 'SEWS Part No', minWidth: 130, flex: 1
            , valueGetter: (_, row) => row.PartNumber ?? ''
        },
        {
            field: 'Customer Part No', headerName: 'Customer Part No', minWidth: 130, flex: 1
            , valueGetter: (_, row) => row.CustomerPartNumber ?? ''
        },
        {
            field: 'Customer', headerName: 'Customer', width: 110
            , valueGetter: (_, row) => row.Customer ?? ''
        },
        {
            field: 'Qty', headerName: 'Qty', width: 80
            , valueGetter: (_, row) => row.Qty ?? ''
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
        {
            field: 'Method', headerName: 'Método', minWidth: 130, flex: 1
            , valueGetter: (_, row) => row.UrsPriority?.name ?? ''
        },
        {
            field: 'acciones',
            headerName: 'acciones',
            width: 90,
            renderCell: (params) => (
                params.row.Process != 99 ?
                    <>
                        <Button
                            variant="contained"
                            size="small"

                            onClick={() => handleCancelRequest(params.row.id)}
                            style={{
                                marginRight: 8,
                                paddingLeft: 5,
                                paddingRight: 5,
                                backgroundColor: "red",
                                borderRadius: 5,
                                color: "white",
                                border: "0 !important",
                                boxShadow: "none",
                                width: "100%"
                            }}
                        >
                            <FontAwesomeIcon icon={faCancel} className='pr-1' />
                        </Button>
                    </> : <></>
            ),
        },

    ];


    return (
        isMobile && !isTabletOnly ?
            <UrsVerificateFolioMobile id={id} TimeZone={TimeZone}
            data={data} Requests={Requests} 
            handleCancelRequest={handleCancelRequest} handleChangeDatePropocedProduct={handleChangeDatePropocedProduct}
            HandleSecondVeryfyFolio={HandleSecondVeryfyFolio}/>
            :
            <UrsVerificateFolioDesktop id={id} TimeZone={TimeZone}
                data={data} Requests={Requests} column={column} columns={columns}
                HandleSecondVeryfyFolio={HandleSecondVeryfyFolio} />
    )
}
