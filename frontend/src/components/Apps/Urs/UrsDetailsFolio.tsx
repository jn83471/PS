import { faArrowUpRightFromSquare, faCircle, faClose, faDownload, faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { UrsEstatusComponent } from "./UrsEstatusComponent"

import { UrsDownloadASN } from "../../../api/DownloadApis"
import { UrsTimeLine } from "./UrsTimeLine"
import { useEffect, useState } from "react"

type detailsIdProp = {
    detailsId, setDetailsId, TimeZone, data, setSetUpHrs
}
const progress = ['Solicitado', 'REVISION CPLOCAL', 'REVISION SMTS ', 'EN ESCANEO ', 'EMBARCADA'];




export const UrsDetailsFolio = ({ detailsId, setDetailsId, TimeZone, data, setSetUpHrs }) => {
    

    const HandleDownloadFile = () => {
        UrsDownloadASN(detailsId.id)
    }
    
    const porcentaje =  detailsId?.Verify/(progress.length-1)*100 
    console.log(porcentaje)
    return (
        <div className={`w-[400px] flex justify-center ${detailsId.id != 0 ? " fixed " : " hidden "} bg-gray-500/75 w-screen top-0 left-0 overflow-x-auto lg:bg-transparent lg:static lg:w-[400px] h-screen lg:h-auto`}>
            <div className="border relative flex flex-col flex-1 m-5 md:m-2 gap-1 py-4 px-7 bg-white max-w-[90vw] w-[400px] max-h-[900px] lg:max-h-[80vh] min-h-max flex-1 border-gray-200 rounded-2xl shadow shadow-gray-300/75">
                <button onClick={() => {
                    setDetailsId({
                        id: 0
                    })
                }} className="absolute lg:hidden z-50 rounded-full w-7 h-7 flex items-center justify-center bg-red-500 text-white top-0 right-0 translate-x-1/2 translate-y-[-50%]">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="flex py-2 border-b border-b-gray-200 items-center">
                    <div className="flex-1">
                        <div className="sm:text-xl font-bold pt-2">
                            Solicitud #URS{`${detailsId.id.toString().padStart(10, '0')}`}
                        </div>

                    </div>
                    <div>
                        {(detailsId?.Process != 99 && detailsId.Verify <= 2) &&
                            <Link to={`/urs/request/${detailsId.id}`}>
                                <FontAwesomeIcon className="text-2xl text-purple-500 cursor-pointer" icon={faArrowUpRightFromSquare} />
                            </Link>
                        }
                    </div>

                </div>
                {detailsId?.Process == 99 && <div className="flex flex-row items-center gap-2 py-2 my-2 bg-gray-100 rounded-2xl p-2">
                    <div>
                        <FontAwesomeIcon className="text-gray-700 text-xl sm:text-2xl" icon={faCircle} />
                    </div>
                    <div className="text-gray-800 font-bold">
                        Cancelado
                    </div>
                </div>}
                <div className="grid grid-cols-2 sm:flex gap-3">
                    <div className="text-center">
                        <span className="text-sm text-gray-400">
                            Quantity
                        </span>
                        <div className="sm:text-xl">
                            {detailsId.Qty}
                        </div>
                    </div>
                    <div className="text-left">
                        <span className="text-sm text-gray-400">
                            Estatus
                        </span>
                        <div className="sm:text-xl">

                            <UrsEstatusComponent Verify={detailsId.Verify} Process={detailsId.Process} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-400 relative">
                            Pickup
                            <button onClick={() => {
                                setSetUpHrs(detailsId)
                            }} className="absolute top-0 right-0 text-red-500">
                                <FontAwesomeIcon icon={faEdit}
                                    className="text-sm"
                                />
                            </button>
                        </span>
                        <div className="sm:text-xl relative">
                            {new Date(detailsId?.hrs).toLocaleDateString('es-MX', {
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
                    {detailsId?.Verify >= 4 && <button onClick={HandleDownloadFile}
                        className="p-2 text-sm rounded-lg border border-green-500 bg-green-100/50 text-black
                                                  hover:bg-green-500 hover:text-white duration-150 ease-in">
                        <FontAwesomeIcon icon={faDownload}
                            className="pr-1" />
                        ASN
                    </button>}

                </div>
                <div className="grid grid-cols-2 gap-5 sm:py-5">
                    <div>
                        <div className="text-[10px] sm:text-sm text-gray-400">
                            Método
                        </div>
                        <div className="text-[10px] sm:text-sm font-bold">
                            {detailsId?.UrsPriority?.name}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] sm:text-sm text-gray-400">
                            Motivo
                        </div>
                        <div className="text-[10px] sm:text-sm font-bold">
                            {detailsId?.motive}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] sm:text-sm text-gray-400">
                            Fecha de solicitud
                        </div>
                        <div className="text-[10px] sm:text-sm font-bold">
                            {
                                detailsId.createdAt != null ?
                                    new Date(detailsId.createdAt).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })
                                    : "-"
                            }
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] sm:text-sm text-gray-400">
                            Fecha de aprobación
                        </div>
                        <div className="text-[10px] sm:text-sm font-bold">
                            {
                                detailsId.DeliveryDay != null ?
                                    new Date(detailsId.DeliveryDay).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })
                                    : "-"
                            }
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] sm:text-sm text-gray-400">
                            Ultima fecha proceso
                        </div>
                        <div className="text-[10px] sm:text-sm font-bold">
                            {
                                detailsId.ClosedDay != null ?
                                    new Date(detailsId.ClosedDay).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })
                                    : "-"
                            }
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] sm:text-sm text-gray-400">
                            Fecha de terminación
                        </div>
                        <div className="text-[10px] sm:text-sm font-bold">
                            {
                                detailsId.LastProcessDay != null ?
                                    new Date(detailsId.LastProcessDay).toLocaleDateString('es-MX', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                    })
                                    : "-"
                            }
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <div className="absolute top-0 left-0 w-full h-full overflow-y-auto">

                        <UrsTimeLine data={detailsId} TimeZone={TimeZone} />

                    </div>
                </div>

                <div className="pb-5">
                    <div className="text-gray-400 text-sm">
                        Progreso de envió
                    </div>
                    <div className="relative py-2">
                        <div className="absolute x-2 min-w-[calc(100%-20px)] bg-gray-300 top-[18px] left-[10px] overflow-hidden z-0">
                            <div style={{ width: `${porcentaje}%` }} className={`min-h-[5px] bg-purple-500`} />
                        </div>
                        <div className="flex justify-between items-center z-50">
                            {
                                progress.map((x, index) => (<div className="z-50" key={`progress${index}`}>
                                    <FontAwesomeIcon icon={faCircle} className={`${(index * (100 / (progress.length - 1))) <= porcentaje ? "text-purple-500" : "text-gray-300"} text-2xl`} />
                                    <div className="absolute translate-x-[-25%] text-[8px] text-gray-500 hidden sm:block">
                                        {x}
                                    </div>
                                </div>))
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
