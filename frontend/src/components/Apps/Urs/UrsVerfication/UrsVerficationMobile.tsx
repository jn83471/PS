import { faBox, faBus, faCalendarDays, faFilter, faPlus, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import { formatFolio } from "../../../../Utils/Urs"
import { UrsEstatusComponent } from "../UrsEstatusComponent"
import { formatDateTimeZone, formDateHours } from "../../../../Utils/Date"
import { UrsModalDetails } from "../UrsModalDetails"

type UrsVerficationMobileProp = { data, detailsId, rows, column, handleSendVerification, refetch, setDetailsId, TimeZone }

export const UrsVerficationMobile = ({ data, detailsId, rows, column, handleSendVerification, refetch, setDetailsId, TimeZone }: UrsVerficationMobileProp) => {
    const [search, setSearch] = useState<string>("")
    const row = data?.filter(
        x => x.id.toString().includes(search) &&
            x.Verify == 1
    ) ?? []
    return (
        <>
            <header className="pt-2 flex flex-row gap-2">
                <div className="flex flex-row items-center py-2 flex-1">
                    <div>
                        <FontAwesomeIcon icon={faBox}
                            className="text-2xl" />
                    </div>
                    <div>
                        <div className="text-2xl font-bold">
                            Ver Solicitudes
                        </div>
                        <div>
                            Rastrear, priorizar y coordinar los envíos.
                        </div>
                    </div>

                </div>
                <div>

                </div>
            </header>
            <section className="p-2 flex flex-row gap-2">
                <div className="flex-1">
                    <div className="relative text-xl">
                        <FontAwesomeIcon icon={faSearch}
                            className="absolute left-1 h-full translate-y-1/2 text-gray-500" />
                        <input type="text" placeholder="Buscar folio"
                            className="placeholder:text-gray-400 pl-8 w-full
                                    border border-gray-200 rounded-lg p-2"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button className="bg-gray-100 border border-gray-200 p-1 text-2xl rounded-lg">
                        <FontAwesomeIcon icon={faFilter}
                            className="text-gray-600" />
                    </button>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {
                    row?.map((element) => (
                        <div key={element.id} className="border border-gray-200 rounded-lg p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-1 font-bold text-sm">
                                    {formatFolio(element.id)}
                                </div>
                                <div className="w-[100px] text-sm">
                                    <UrsEstatusComponent Process={element.Process} Verify={element.Verify} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faBus}
                                            className="text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Método de envió
                                        </div>
                                        {element.UrsRequests?.[0]?.UrsPriority.name}
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faBus}
                                            className="text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Método de envió
                                        </div>
                                        {formDateHours(new Date(element.hrs), TimeZone)}
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faUser}
                                            className="text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Solicitado por
                                        </div>
                                        {element.RequestUser?.Name}
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faCalendarDays}
                                            className="text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Solicitado por
                                        </div>
                                        {formatDateTimeZone(element.createdAt, TimeZone)}
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faCalendarDays}
                                            className="text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Fecha propuesta
                                        </div>
                                        {formatDateTimeZone(element.ProposedDate, TimeZone)}
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faCalendarDays}
                                            className="text-lg" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">
                                            Fecha de embarque
                                        </div>
                                        -
                                    </div>
                                </div>

                                {/*{
                                                        field: 'ProposedDate', headerName: 'Fecha propuesta', width: 150,
                                                        valueFormatter: (value) => {
                                                            if (!value) return '';
                                                            return formatDateUTC(value)
                                            
                                                        },
                                                    },
                                                    {
                                                        field: 'Date', headerName: 'Fecha de embarque', width: 150,
                                                        valueFormatter: (value) => {
                                                            if (!value) return '';
                                                            return formatDateUTC(value)
                                                        },
                                                    }*/}

                            </div>
                            <div>
                                <button onClick={() => {
                                    setDetailsId(element)
                                    console.log(detailsId)

                                }} className="bg-purple-500 text-white w-full p-1 rounded-lg">
                                    Ver detalles
                                </button>
                            </div>
                        </div>
                    ))
                }

            </div>
            {detailsId.id != 0 && <UrsModalDetails url="verifications" save={handleSendVerification} refetch={refetch} id={detailsId.id} setId={setDetailsId} />}

        </>
    )
}
