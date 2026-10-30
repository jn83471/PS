import { faCircle, faClose, faDownload, faInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useMemo, useState } from 'react'
import { formatFolio } from '../../../../Utils/Urs'
import { UrsEstatusComponent } from '../../../../components/Apps/Urs/UrsEstatusComponent'
import { formatDateTimeZoneComplete, formatDateUTC, formatDateUTCComplete, formDateHours } from '../../../../Utils/Date'
import { UrsTables } from '../../../../components/Apps/Urs/UrsTables'
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import type { GridColDef } from '@mui/x-data-grid'
type UrsDetailDesktopProp = {
    id, data, porcentaje, progress, HandleDownloadFile, TimeZone
}
export const UrsDetailDesktop = ({ id, data, porcentaje, progress, HandleDownloadFile, TimeZone }: UrsDetailDesktopProp) => {

    const [modal, showModal] = useState(false)
    const [modalImages, setModalImages] = useState([])

    const [selectedImage, setSelectedImage] = useState(null);
    const column = useMemo(() => [
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
    ] as GridColDef[], []);
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



                {(data?.data?.Verify >= 4 && data?.results?.[0]?.asn_number) &&
                    <div> <button onClick={HandleDownloadFile}
                        className="p-2 text-sm rounded-lg border border-green-500 bg-green-100/50 text-black
                                            hover:bg-green-500 hover:text-white duration-150 ease-in">
                        <FontAwesomeIcon icon={faDownload}
                            className="pr-1" />
                        ASN
                    </button></div>}
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
                            {data?.data?.RequestUser?.Name}
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 sm:border-r border-gray-200 border-t sm:border-t-0">
                        <div className="text-sm text-gray-400">
                            Fecha propuesta
                        </div>
                        <div className="text-2xl font-bold">
                            {formatDateUTC(data?.data?.ProposedDate ?? '')}
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 lg:border-r border-gray-200 border-t sm:border-t-0">
                        <div className="text-sm text-gray-400">
                            Hora de pickup
                        </div>
                        <div className="text-2xl font-bold">
                            {formDateHours(new Date(data?.data?.hrs), TimeZone)}
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 border-gray-200 border-t sm:border-t-0 lg:border-r">
                        <div className="text-sm text-gray-400">
                            Método de envío
                        </div>
                        <div className="text-2xl font-bold">
                            {data?.data?.UrsRequests?.[0]?.UrsPriority.name}
                        </div>
                    </div>
                    <div className="p-4 flex flex-col gap-2 border-gray-200 border-t sm:border-t-0">
                        <div className="text-sm text-gray-400">
                            ASN
                        </div>
                        <div className="text-2xl font-bold">
                            {data?.results?.[0]?.asn_number}
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
                            {data?.data?.UrsRequests?.[0]?.Codes?.name}
                        </div>
                    </div>
                    <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
                        <div className="text-sm text-gray-600/80">
                            Motivo
                        </div>
                        <div className="text-lg font-bold">
                            {data?.data?.UrsRequests?.[0]?.Reason}
                        </div>
                    </div>
                    <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
                        <div className="text-sm text-gray-600/80">
                            Cantidad de pedidos
                        </div>
                        <div className="text-lg font-bold">
                            {data?.data?.UrsRequests?.length}
                        </div>
                    </div>
                    <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
                        <div className="text-sm text-gray-600/80">
                            Cantidad
                        </div>
                        <div className="text-lg font-bold">
                            {data?.data?.Qty}
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
                                        <div className="hidden sm:block absolute translate-x-[-25%] md:text-sm text-gray-500 text-center w-[90PX] text-[.5rem]">
                                            <div>
                                                {x.name}
                                            </div>
                                            <div className="">
                                                {
                                                    x.type === "UTC" ? formatDateTimeZoneComplete(x.column.includes("data.") ? data?.data?.[x.column.split(".")[1]] : data?.results?.[0]?.[x.column], TimeZone).split(",").map(y => (
                                                        <div key={`dates${y}`}>
                                                            {y}

                                                        </div>
                                                    )) :
                                                        formatDateUTCComplete(x.column.includes("data.") ? data?.data?.[x.column.split(".")[1]] : data?.results?.[0]?.[x.column], TimeZone).split(",").map(y => (
                                                            <div key={`dates${y}`}>
                                                                {y}

                                                            </div>
                                                        ))}

                                            </div>
                                            {
                                                x.Alert && <div className="text-red-500 text-sm bg-red-100 rounded-lg absolute">
                                                    {x.Alert}
                                                </div>
                                            }
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

                        <UrsTables rows={data?.data?.UrsRequests} column={column} />

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
                                        {data?.data?.UrsFolioPictures?.filter(x => x.Verify == 4).length <= index ?
                                            <>
                                                <div className="lg:h-[150px] xl:h-[250px] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                                                    Imagen {index + 1}
                                                </div>

                                            </>
                                            : <>
                                                <div className="lg:h-[150px] xl:h-[250px] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                                                    <img onClick={() => {
                                                        showModal(true)
                                                        setModalImages(data?.data?.UrsFolioPictures?.filter(x => x.Verify == 4))
                                                        setSelectedImage(`${import.meta.env.VITE_API_UPLOAD}/${data?.data?.UrsFolioPictures?.filter(x => x.Verify == 4)?.[index]?.Name}`)
                                                    }} src={`${import.meta.env.VITE_API_UPLOAD}/${data?.data?.UrsFolioPictures?.filter(x => x.Verify == 4)?.[index]?.Name}`} />
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
            <div>

                <div className="bg-white border border-gray-200 my-4 rounded-lg p-4">
                    <div>

                        <div className="text-2xl font-bold">
                            Evidencias de envio
                        </div>
                        <div className="text-sm text-gray-400">
                            Datos principales requeridos para coordinar el envío
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 py-2 gap-4">
                        {
                            Array.from({ length: 8 }).map((_, index) => (
                                <div className="flex flex-col border border-blue-100 rounded-lg shadow">
                                    {data?.data?.UrsFolioPictures?.filter(x => x.Verify == 5).length <= index ?
                                        <>
                                            <div className="lg:h-[150px] xl:h-[250px] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                                                Imagen {index + 1}
                                            </div>

                                        </>
                                        : <>
                                            <div className="lg:h-[150px] xl:h-[250px] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                                                <img src={`${import.meta.env.VITE_API_UPLOAD}/${data?.data?.UrsFolioPictures?.filter(x => x.Verify == 5)?.[index]?.Name}`} />
                                            </div>
                                        </>
                                    }
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            {
                modal && <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-[9999] flex flex-col items-center justify-center">
                    <div className="bg-white rounded-lg p-4 w-[90%] h-[90%] relative">
                        <button onClick={() => showModal(false)} className="w-9 h-9 bg-red-500 text-white rounded-full top-0 right-0 absolute translate-x-[50%] translate-y-[-50%] flex items-center justify-center">
                            <FontAwesomeIcon icon={faClose} 
                            className='text-xl  '  />
                        </button>
                        <div className="flex flex-row justify-between items-center">
                            <div className="text-xl font-bold">
                                Evidencias de la solicitud
                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div>
                                {
                                    modalImages.map((x, index) => (
                                        <div className="flex flex-col border border-blue-100 rounded-lg shadow my-2" key={`modalImage${index}`}>
                                            <div className=" w-[150px] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                                                <img onClick={() => {
                                                    setSelectedImage(`${import.meta.env.VITE_API_UPLOAD}/${x?.Name}`)
                                                }} src={`${import.meta.env.VITE_API_UPLOAD}/${x?.Name}`}
                                                    alt="Evidencia" />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex-1">
                                {

                                    <div className="flex flex-col border border-blue-100 rounded-lg shadow" key={`modalImageselected`}>
                                        <div className="h-[calc(100vh-180px)] overflow-hidden bg-blue-50 rounded-t-lg p-2 flex flex-col items-center justify-center text-blue-500">
                                            <InnerImageZoom src={selectedImage}
                                                zoomSrc={selectedImage}
                                                zoomType='click' />
                                        </div>
                                    </div>

                                }
                            </div>


                        </div>
                    </div>
                </div>
            }
        </>
    )
}
