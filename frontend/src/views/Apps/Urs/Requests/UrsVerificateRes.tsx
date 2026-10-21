import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UrsCardComponent } from "../../../../components/Apps/Urs/UrsCardComponent"
import { Link, Navigate } from "react-router-dom"
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
import { useState } from "react";
import { FirstVerify, UrsGetFolios } from "../../../../api/Apps/Urs/UrsPriorityApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useAuthWithApps } from "../../../../hook/useAuth";
import { hasPermission } from "../../../../hook/hasPermissionHook";
import { UrsModalDetails } from "../../../../components/Apps/Urs/UrsModalDetails";
import { UrsEstatusComponent } from "../../../../components/Apps/Urs/UrsEstatusComponent";
import { toast } from "react-toastify";
import type { UrsVerificateFolio } from "../../../../types/Urs/UrsRequestFolio";
import { GetTimeZone } from "../../../../hook/GetTimeZone";

export const UrsVerificateRes = () => {
  const User = useAuthWithApps()

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

  const rows = data?.filter(x => x.Verify == 4)

  const TimeZone = GetTimeZone(User?.data?.TimeZone)

  const column: GridColDef[] = [
    {
      field: 'id', headerName: 'Folio', width: 130, minWidth: 130, renderCell: (params) => (
        <>
          URS{`${params.row.id.toString().padStart(10, '0')}`}
        </>
      )
    },
    /*{
      field: 'priorityLevel', headerName: 'Prioridad', width: 130
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
      field: 'Method', headerName: 'Método de envió', width: 130
      , valueGetter: (_, row) => row?.UrsRequests?.[0]?.UrsPriority.name ?? ''
      , renderCell: (params) => (
        <>
          {
            params.row?.UrsRequests?.[0]?.UrsPriority.name
          }
        </>
      )
    },
    {
      field: 'motive', headerName: 'Motivo', width: 130
    },
    {
      field: 'pickup', headerName: 'Pickup', width: 130, valueGetter: (_, row) => new Date(row?.hrs).toLocaleDateString('es-MX', {
        timeZone: TimeZone,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit"
      }).split(" ").toString().substring(13).toUpperCase() ?? ''
      , renderCell: (params) => (
        <>
          {new Date(params.row?.hrs).toLocaleDateString('es-MX', {
            timeZone: TimeZone,
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: "2-digit",
            minute: "2-digit"
          }).split(" ").toString().substring(13).toUpperCase() ?? ''
          }
        </>
      )
    },
    {
      field: 'Status', headerName: 'Estatus', width: 180
      , valueGetter: (_, row) => row.Process ?? 0
      , renderCell: (params) => (
        <>
          {
            <UrsEstatusComponent Process={params.row.Process} Verify={params.row.Verify} />
          }
        </>
      )
    },
    {
      field: 'RequestBy', headerName: 'Solicitado por', width: 180
      , valueGetter: (_, row) => row.RequestUser?.Name ?? ''
      , renderCell: (params) => (
        <>

          <div className="flex items-center text-blue-900 bg-blue-50/30 h-7 mt-2 rounded-lg text-sm border border-blue-100/50 px-2">
            <FontAwesomeIcon icon={faUser} className="text-blue-400 text-sm pr-1" />
            {params.row.RequestUser?.Name}
          </div>


        </>
      )
    },
    {
      field: 'createdAt', headerName: 'fecha Solicitud', minWidth: 120,flex:1,
      valueFormatter: (value) => {
        if (!value) return '';
        return new Date(value).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
      field: 'ProposedDate', headerName: 'Fecha propuesta', minWidth: 100,flex:1,
      valueFormatter: (value) => {
        if (!value) return '';
        return new Date(value).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
      field: 'Date', headerName: 'Fecha de embarque', minWidth: 100,flex:1,
      valueFormatter: (value) => {
        if (!value) return '';
        return new Date(value).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
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
    },

  ];
  const { mutate } = useMutation({
    mutationFn: FirstVerify,
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
    }
  })

  const HandleFiveVeryfyFolio = (e) => {
    e.preventDefault()
    const dt: UrsVerificateFolio = {
      Verify: 5
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
            <UrsCardComponent qty={data?.filter(x => x.Verify == 5 && x.Process != 99)?.length} borderl="border-l-green-600" display="Solicitudes cerradas"
              bg="text-green-500" circlebg="bg-green-200" />
          </div>
          <div className={`flex-1 w-[calc(100vw-110px)] ${detailsId.id != 0 ? " sm:w-[calc(100vw-250px)] overflow-x-auto " : "sm:w-[calc(100vw-250px)] overflow-x-auto"}`}>



            <DataGrid pageSizeOptions={[5, 10, 25, 50, 100]}  //apiRef={apiRef} 
              showToolbar className='text-xl text-white font-semibold w-full bg-white! w-full' rows={rows} columns={column}


              initialState={{
                filter: {
                  filterModel: {
                    items: [],
                    quickFilterValues: [],
                  },
                },
                pagination: {
                  paginationModel: {
                    pageSize: 25
                  }
                }
              }}
              sx={{
                backgroundColor: "white",
                border: "none",
                color: "#fff",
                width: "98%",
                fontSize: 14,
                minHeight: 300,
                input: {
                  color: "#fff", // texto que escribes
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#aaa", // opcional: placeholder
                  opacity: 1,
                },
                "& .MuiDataGrid-main": {
                  backgroundColor: "white"
                },

                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: "#1a1d25 !important",
                  color: "#fff"
                },

                "& .MuiDataGrid-topContainer": {
                  backgroundColor: "white !important"
                },

                // fallback general
                "& .MuiDataGrid-root": {
                  backgroundColor: "white"
                },
                // 🔥 HEADER COMPLETO
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "white !important",
                },

                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "white",
                  color: "black"
                },

                // 🔥 CADA CELDA DEL HEADER (ESTE ES EL QUE TE FALTA)
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#eef8f1  !important",
                  color: "green !important",
                  fontWeight: "bold !important"
                },


                // opcional: líneas
                "& .MuiDataGrid-cell": {
                  borderColor: "white",
                },

                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "white",
                  color: "black"
                },

                "& .MuiTablePagination-root": {
                  color: "#113b2b !important"
                },

                // select dropdown
                "& .MuiSelect-select": {
                  color: "black"
                },

                // íconos (flechas)
                "& .MuiSvgIcon-root": {
                  color: "#113b2b !important"
                },

                "& .MuiDataGrid-iconButtonContainer": {
                  color: "white"
                },

                "& .MuiDataGrid-filterIcon": {
                  color: "#fff"
                },

                // icono cuando está activo
                "& .MuiDataGrid-menuIcon": {
                  color: "#fff"
                },

                "& .MuiIconButton-root": {
                  backgroundColor: "transparent !important",
                  color: "#fff"
                },

                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#eef8f1 !important"
                },
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "#eef8f1 !important",
                  color: "#113b2b",
                  fontWeight: "bold",
                  fontSize: "12px"
                },

                // ✅ hover mientras está seleccionada
                "& .MuiDataGrid-row.Mui-selected:hover": {
                  backgroundColor: "white !important"
                }
              }} />
          </div>


        </section>
        {/*cambiar*/}
        {detailsId.id != 0 && <UrsModalDetails save={HandleFiveVeryfyFolio} url="verificationsRes" refetch={refetch} id={detailsId.id} setId={setDetailsId} />}
      </section>

    </>
  )
}
