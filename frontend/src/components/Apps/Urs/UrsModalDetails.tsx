import { faBarsProgress, faBoxOpen, faBus, faCamera, faCancel, faCheck, faCheckCircle, faCircle, faClose, faCreditCard, faDownload, faEdit, faEye, faImages, faPlus, faSave, faSeedling, faUser, faVoicemail } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ursCancelFolio, UrsGetFolioById } from "../../../api/Apps/Urs/UrsPriorityApi"
import { GetUrsRequest } from "../../../api/Apps/Urs/UrsRequestApi"
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
import { useAuthWithApps } from "../../../hook/useAuth"
import { GetTimeZone } from "../../../hook/GetTimeZone"
import { UrsDownloadASN } from "../../../api/DownloadApis"
import { useRef, useState } from "react"
import { hasCamera, isMobile, isTabletOnly } from "../../../Utils/Media"
import { UrsTables } from "./UrsTables"
import { formatDateTimeZoneComplete, formatDateUTC } from "../../../Utils/Date"
import { UrsTimeLine } from "./UrsTimeLine"
import { UrsModalDetailsDesktop } from "./UrsModalDetails/UrsModalDetailsDesktop"
import { UrsModalDetailsMobile } from "./UrsModalDetails/UrsModalDetailsMobile"


type UrsModalDetailsProp = {
    id: number,
    setId: any,
    refetch: any,
    url: string,
    save: any,
    files: any,
    setFiles: any
}
export const UrsModalDetails = ({ id, setId, refetch, url, save, files, setFiles }: UrsModalDetailsProp) => {



    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['UrsFolio', id],
        queryFn: () => UrsGetFolioById(id),
        //enabled: !fecha,
        retry: false
    })
    const auth = useAuthWithApps()
    const Navigates = useNavigate()


    const TimeZone = GetTimeZone(auth?.data?.TimeZone)
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
    const [view, setView] = useState("Camera")

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
            , valueGetter: (_, row) => formatDateUTC(data.ProposedDate)
        },
        {
            field: 'ProposedDateAtn', headerName: 'Fecha propuesta Atn', minWidth: 190, flex: 1
            , valueGetter: (_, row) => formatDateUTC(row.ProposedDate ?? data.ProposedDate) ?? ''
        },
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
            , renderCell: (params) => (
                <>
                    {params.row.Customer}
                </>
            )
        },
        {
            field: 'Qty', headerName: 'Qty', width: 80
            , valueGetter: (_, row) => row.Qty ?? ''
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
        }/*,
            {
                field: 'acciones',
                headerName: 'acciones',
                width: 70,
                renderCell: (params) => (
                    <>
                        <Button
                            variant="contained"
                            size="small"
    
                            onClick={() => {
                            }}
                            style={{
                                marginRight: 8,
                                paddingLeft: 5,
                                paddingRight: 5,
                                backgroundColor: "transparent",
                                color: "black",
                                border: "0 !important",
                                boxShadow: "none",
                                width: "100%"
                            }}
                        >
                            <FontAwesomeIcon icon={faEdit} className='pr-1' />
                        </Button>
                    </>
                ),
            },*/

    ];

    const HandleDownloadFile = () => {
        UrsDownloadASN(id)
    }

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return;
        if (files.length >= 4) {
            toast.error("No puede contener mas de 4 imagenes de verificación")
            return
        }

        const newFiles = Array.from(fileList);



        setFiles((prev) => [
            ...prev,
            ...newFiles
        ]);
    };

    const cameraInputRef = useRef<HTMLInputElement>(null);

    const handleCapture = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (files.length >= 4) {
            toast.error("No puede contener mas de 4 imagenes de verificación")
            return
        }
        const file = event.target.files?.[0];

        if (!file) return;

        setFiles(prev => [...prev, file]);
    };
    return (
        (isMobile && !isTabletOnly) ?
            <UrsModalDetailsMobile id={id} setId={setId}  view={view} setView={setView} url={url}
            TimeZone={TimeZone} files={files} setFiles={setFiles} cameraInputRef={cameraInputRef}
            data={data} Requests={Requests}
            handleCapture={handleCapture} HandleDownloadFile={HandleDownloadFile} HandleCancelFolio={HandleCancelFolio} save={save}/>
            :
            <UrsModalDetailsDesktop id={id} save={save} setId={setId}
                cameraInputRef={cameraInputRef} view={view} setView={setView} inputRef={inputRef}
                HandleDownloadFile={HandleDownloadFile}
                data={data} TimeZone={TimeZone} Requests={Requests} column={column} url={url}
                HandleCancelFolio={HandleCancelFolio} handleCapture={handleCapture}
                files={files} setFiles={setFiles} handleFiles={handleFiles} />
    )
}
