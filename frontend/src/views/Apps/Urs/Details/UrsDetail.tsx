import { faCircle, faDownload, faInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatFolio } from "../../../../Utils/Urs"
import { useParams } from "react-router-dom"
import { GetUrsRequest, GetUrsRequestDetails } from "../../../../api/Apps/Urs/UrsRequestApi"
import { useQuery } from "@tanstack/react-query"
import { formatDateTimeZone, formatDateTimeZoneComplete, formatDateUTC, formDateHours } from "../../../../Utils/Date"
import { GetTimeZone } from "../../../../hook/GetTimeZone"
import { useAuthWithApps } from "../../../../hook/useAuth"
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables"
import { UrsEstatusComponent } from "../../../../components/Apps/Urs/UrsEstatusComponent"
import { useMemo } from "react"
import type { GridColDef } from "@mui/x-data-grid"
import { UrsDownloadASN } from "../../../../api/DownloadApis"

export const UrsDetail = () => {
  const { id } = useParams()
  const User = useAuthWithApps()

  const { data } = useQuery({
    queryKey: ['UrsRequests', id],
    queryFn: () => GetUrsRequestDetails(id),
    //enabled: !fecha,
    retry: false
  })
  const progress = [{
    name: 'Solicitado',
    column: 'createdAt',
    type: "UTC"
  }, {
    name: 'REVISION CPLOCAL',
    column: 'DeliveryDay',
    type: "UTC"
  }, {
    name: 'REVISION SMTS ',
    column: 'FinishUserSMTSDate',
    type: "UTC"
  }, {
    name: 'EN ESCANEO ',
    column: 'LastProcessDay',
    type: "UTC"
  }, {
    name: 'EMBARCADA',
    column: 'ClosedDay',
    type: "UTC"
  }];
  const TimeZone = GetTimeZone(User?.data?.TimeZone)
  const porcentaje = data?.Verify / (progress.length - 1) * 100

  const column: GridColDef[] = useMemo<GridColDef[]>(() => [
    {
      field: 'id', headerName: 'MFG', width: 80, minWidth: 80,
      renderCell: (params) => (
        <>
          {params.row.Codes.name}
        </>
      )
    },
    {
      field: 'SEWS Part No', headerName: 'SEWS Part No', width: 130, flex: 1
      , valueGetter: (_, row) => row.PartNumber ?? ''
    },
    {
      field: 'Customer Part No', headerName: 'Customer Part No', width: 130, flex: 1
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
      field: 'Reason', headerName: 'Reason', width: 180, flex: 1
      , valueGetter: (_, row) => row.Reason ?? ''
      , renderCell: (params) => (
        <div className="flex items-center text-blue-900 bg-blue-50/30 h-7 mt-2 rounded-lg text-sm border border-blue-100/50 px-2">
          <FontAwesomeIcon icon={faCircle} className="text-blue-400 font-bold text-sm pr-1" />
          {params.row.Reason}
        </div>

      )
    },
    {
      field: 'Method', headerName: 'Método', width: 130, flex: 1
      , valueGetter: (_, row) => row.UrsPriority?.name ?? ''
    }
  ]);

  const HandleDownloadFile = () => {
    UrsDownloadASN(id)
  }

  return (
    <>
      <header className="flex flex-row items-center">
        <div className="flex flex-row items-center p-4 gap-2 flex-1">
          <div className="text-3xl bg-blue-500 rounded-full text-white p-2 w-13 h-13 flex flex-row items-center">
            <FontAwesomeIcon icon={faInfo} />
          </div>
          <div>
            <div className="font-bold text-3xl">
              Detalle de solicitud
            </div>
            <div className="text-sm text-gray-400">
              Información completa de la orden y seguimiento de operaciones
            </div>
          </div>
        </div>



        {data?.Verify >= 4 && <button onClick={HandleDownloadFile}
          className="p-2 text-sm rounded-lg border border-green-500 bg-green-100/50 text-black
                                            hover:bg-green-500 hover:text-white duration-150 ease-in">
          <FontAwesomeIcon icon={faDownload}
            className="pr-1" />
          ASN
        </button>}
      </header>
      <section className="border-t-4  bg-white border border-gray-200 my-4 rounded-lg p-4 border-t-purple-600">
        <div className="p-2 border-b border-b-gray-200 flex flex-row">
          <div className="flex-1">
            <div className="font-bold text-lg">
              Orden #{formatFolio(parseInt(id))}
            </div>
            <div className="text-sm">
              Solicitud urgente de envío
            </div>
          </div>
          <div>
            <UrsEstatusComponent Verify={data?.Verify} Process={data?.Process} />
          </div>
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-5 p-2 gap-2">
          <div className="p-4 flex flex-col gap-2 sm:border-r border-gray-200">
            <div className="text-sm text-gray-400">
              Solicitado por
            </div>
            <div className="text-2xl font-bold">
              {data?.RequestUser?.Name}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2 lg:border-r border-gray-200 border-t sm:border-t-0">
            <div className="text-sm text-gray-400">
              Fecha de solicitud
            </div>
            <div className="text-2xl font-bold">
              {formatDateTimeZone(data?.createdAt, TimeZone)}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2 sm:border-r border-gray-200 border-t sm:border-t-0">
            <div className="text-sm text-gray-400">
              Fecha propuesta
            </div>
            <div className="text-2xl font-bold">
              {formatDateUTC(data?.ProposedDate ?? '')}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2 lg:border-r border-gray-200 border-t sm:border-t-0">
            <div className="text-sm text-gray-400">
              Hora de pickup
            </div>
            <div className="text-2xl font-bold">
              {formDateHours(new Date(data?.hrs), TimeZone)}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2 border-gray-200 border-t sm:border-t-0">
            <div className="text-sm text-gray-400">
              Método de envío
            </div>
            <div className="text-2xl font-bold">
              {data?.UrsRequests?.[0]?.UrsPriority.name}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border border-gray-200 my-4 rounded-lg p-4">
        <div className="">
          <div className="text-2xl font-bold">
            Información solicitada
          </div>
          <div className="text-sm text-gray-400">
            Datos principales requeridos para coordinar el envío
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm text-gray-600/80">
              MFG
            </div>
            <div className="text-lg font-bold">
              {data?.UrsRequests?.[0]?.Codes?.name}
            </div>
          </div>
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm text-gray-600/80">
              Motivo
            </div>
            <div className="text-lg font-bold">
              {data?.UrsRequests?.[0]?.Reason}
            </div>
          </div>
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm text-gray-600/80">
              Cantidad de pedidos
            </div>
            <div className="text-lg font-bold">
              {data?.UrsRequests?.length}
            </div>
          </div>
          <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
            <div className="text-sm text-gray-600/80">
              Cantidad
            </div>
            <div className="text-lg font-bold">
              {data?.Qty}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white border border-gray-200 my-4 rounded-lg p-4 pb-8">
        <div className="">
          <div className="text-xl font-bold">
            Timeline de operaciones
          </div>
          <div className="text-sm text-gray-400">
            Seguimiento del avance de la solicitud
          </div>
        </div>
        <div className="pb-5">
          <div className="py-4">
            <div className="relative py-2 px-4">
              <div className="absolute x-2 min-w-[calc(100%-62px)] bg-gray-300  top-[18px] left-[32px] overflow-hidden z-0">
                <div style={{ width: `${porcentaje}%` }} className={`min-h-[5px] bg-purple-500`} />
              </div>
              <div className="flex justify-between items-center z-50">
                {
                  progress.map((x, index) => (<div className="z-50" key={`progress${index}`}>
                    <FontAwesomeIcon icon={faCircle} className={`${(index * (100 / (progress.length - 1))) <= porcentaje ? "text-purple-500" : "text-gray-300"} text-2xl`} />
                    <div className="hidden sm:block absolute translate-x-[-25%] text-sm text-gray-500 block text-center">
                      <div>
                        {x.name}
                      </div>
                      <div >
                        {formatDateTimeZoneComplete(data?.[x.column], TimeZone).split(",").map(y => (
                          <div key={`dates${y}`}>
                            {y}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>))
                }
              </div>

            </div>
          </div>

        </div>
      </section>
      <div className="flex lg:flex-row flex-col gap-2">
        <div className="flex-1 border border-gray-200 rounded-lg relative min-h-[500px]">
          <div className="absolute top-0 left-0 w-full h-full overflow-y-auto p-2">
            <div className="">
              <div className="text-xl font-bold">
                Material solicitado
              </div>
              <div className="text-sm text-gray-400">
                Detalle de las piezas incluidas en la solicitud
              </div>
            </div>

            <UrsTables rows={data?.UrsRequests} column={column} />

          </div>
        </div>
        <div className="lg:w-[400px] xl:w-[550px] 2xl:w-[600px]">
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="">
              <div className="text-xl font-bold">
                Imágenes adjuntas
              </div>
              <div className="text-sm text-gray-400">
                Evidencias relacionadas con la solicitud
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 py-2 gap-4">
              {
                Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex flex-col border border-blue-100 rounded-lg shadow">
                    {data?.UrsFolioPictures?.length <= index ?
                      <>
                        <div className="lg:h-[150px] xl:h-[250px] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                          Imagen {index + 1}
                        </div>

                      </>
                      : <>
                        <div className="lg:h-[150px] xl:h-[250px] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                          <img src={`${import.meta.env.VITE_API_UPLOAD}/${data?.UrsFolioPictures?.[index]?.Name}`} />
                        </div>
                      </>
                    }
                  </div>
                ))
              }

            </div>
          </div>


        </div>
      </div>
    </>
  )
}
