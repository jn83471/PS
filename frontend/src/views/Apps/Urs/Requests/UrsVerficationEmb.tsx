import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UrsCardComponent } from "../../../../components/Apps/Urs/UrsCardComponent"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { faArrowUpRightFromSquare, faBoxOpen, faCircle, faClose, faEdit, faEye, faPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useMemo, useState } from "react";
import { FirstVerify, ThirdVerify, UrsGetFolios } from "../../../../api/Apps/Urs/UrsPriorityApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useAuthWithApps } from "../../../../hook/useAuth";
import { hasPermission } from "../../../../hook/hasPermissionHook";
import { UrsModalDetails } from "../../../../components/Apps/Urs/UrsModalDetails";
import { UrsEstatusComponent } from "../../../../components/Apps/Urs/UrsEstatusComponent";
import { toast } from "react-toastify";
import type { UrsVerificateFolio, UrsVerificateSendFolio } from "../../../../types/Urs/UrsRequestFolio";
import { GetTimeZone } from "../../../../hook/GetTimeZone";
import { createUrsColumns } from "../../../../Utils/Urs/CreateUrsColumns";
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables";

export const UrsVerficationEmb = () => {
  const User = useAuthWithApps()

  const navigates = useNavigate()

  if (!User.isLoading && !hasPermission("URS", User.data, "Request")) return (<Navigate to="/urs" />)

  const progress = ['Solicitado', 'REVISION CPLOCAL', 'REVISION SMTS ', 'EN ESCANEO ', 'EMBARCADA'];
  const porcentaje = 0
  const [detailsId, setDetailsId] = useState({
    id: 0
  })

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['UrsPriority'],
    queryFn: UrsGetFolios,
    //enabled: !fecha,
    retry: false
  })

  const rows = data?.filter(x => x.Verify == 3 && x.Process != 99 && x.LastProcessDay != null)
  const TimeZone = GetTimeZone(User?.data?.TimeZone)

  const [files, setFiles] = useState<File[]>([]);

  const column = useMemo(
    () => {
      const column: GridColDef = {
        field: 'acciones',
        headerName: 'Ver',
        width: 70,
        renderCell: (params) => (
          <>
          <Button
            variant="contained"
            size="small"

            onClick={() => {
              if (params.row.id == detailsId) {
                setDetailsId({
                  id: 0
                })
              }
              else {
                setDetailsId(params.row)
              }

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
            <FontAwesomeIcon icon={faEye} className='pr-1' />
          </Button>
        </>
        ),
      }
      const cols = createUrsColumns(
        TimeZone,
        column
      )
      console.log(cols);
      return cols
    }, [TimeZone, detailsId.id]);


  const { mutate } = useMutation({
    mutationFn: ThirdVerify,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      refetch()
      setDetailsId({
        id: 0
      })
      //navigates('/urs/verificationsEmb')
    }
  })

  const HandleFourVeryfyFolio = (e) => {
    e.preventDefault()
    if(files.length==0)
    {
      toast.error("Necesita añadir evidencia para continuar.")
      return
    }
    const dt: UrsVerificateSendFolio = {
      Verify: 4,
      files:files
    }
    console.log(dt)

    mutate({ formData: dt, idFolio: detailsId.id })
  }

  return (
    <>
      <header className="flex justify-between items-center flex-col sm:flex-row py-2">
        <div>
          <h1 className="text-xl md:text-4xl font-bold">
            Urgent Request for Shipment
          </h1>
          <small className="text-sm hidden md:block text-gray-500">
            Rastrear, priorizar y coordinar los envíos de materiales críticos.
          </small>
        </div>
        <div>

        </div>

      </header>
      <section className="flex h-[calc(100vh-120px)] xl:h-[calc(100vh-100px)] ">
        <section className="flex flex-col flex-1 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
            <UrsCardComponent qty={data?.filter(x => x.Verify <= 3 && x.Process != 99)?.length} borderl="border-l-purple-600" display="Solicitudes abiertas"
              bg="text-purple-500" circlebg="bg-purple-200" />
            <UrsCardComponent qty={data?.filter(x => x.Verify == 4 && x.Process != 99)?.length} borderl="border-l-green-600" display="Solicitudes cerradas"
              bg="text-green-500" circlebg="bg-green-200" />
          </div>
          <div className={`flex-1 w-[calc(100vw-110px)] ${detailsId.id != 0 ? " sm:w-[calc(100vw-250px)] overflow-x-auto " : "sm:w-[calc(100vw-250px)] overflow-x-auto"}`}>

            <UrsTables rows={rows} column={column}/>
          </div>


        </section>
        {/*cambiar*/}
        {detailsId.id != 0 && <UrsModalDetails save={HandleFourVeryfyFolio} url="verificationsEmb" refetch={refetch} id={detailsId.id} setId={setDetailsId}  files={files} setFiles={setFiles}/>}
      </section>

    </>
  )
}
