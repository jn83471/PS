import { faBox, faBus, faCalendarDays, faFilter, faPlus, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { hasPermission } from "../../../../hook/hasPermissionHook"
import { Link } from "react-router-dom"
import { UrsEstatusComponent } from "../../../../components/Apps/Urs/UrsEstatusComponent"
import { formatDateTimeZone, formDateHours } from "../../../../Utils/Date"
import { useState } from "react"
import { formatFolio } from "../../../../Utils/Urs"

type WelcomeMobileProp = {
    data, Requests, TimeZone
}
export const WelcomeMobile = ({ data, Requests, TimeZone }: WelcomeMobileProp) => {
    const [search, setSearch] = useState<string>("")
    const [verification,setVerification]=useState(0)
    const row = Requests?.data?.filter(
        x => x.id.toString().includes(search) &&
        x.Verify>1 &&
        (x.Verify==verification || verification==0) && 
        ((x.Verify == 3 && x.Process != 99 && x.LastProcessDay != null) || x.Verify != 3)
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
                            Solicitudes
                        </div>
                        <div>
                            Rastrear, priorizar y coordinar los envíos.
                        </div>
                    </div>

                </div>
                <div>
                    {hasPermission("URS", data, "Request") && <Link to={'/urs/newrequest'}
                        onClick={() => {
                        }}
                        className="my-2 sm:my-0 block bg-purple-600 hover:bg-purple-700 px-2 py-2 rounded-lg font-semibold text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className='' />

                    </Link>}
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
            <section className="flex flex-row py-2 gap-1">
                <button onClick={()=>setVerification(0)} className={`${verification==0?"bg-purple-500 text-white ":" bg-gray-100 "} rounded-lg p-1 text-sm`}>
                    Todas
                </button>
                <button onClick={()=>setVerification(4)} className={`${verification==4?"bg-purple-500 text-white ":" bg-gray-100 "} rounded-lg p-1 text-sm`}>
                    Embarcado
                </button>
                <button onClick={()=>setVerification(3)} className={`${verification==3?"bg-purple-500 text-white ":" bg-gray-100 "} rounded-lg p-1 text-sm`}>
                    Pendiente
                </button>
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
                                <Link to={`/urs/RequestDetails/${element.id}`} className="bg-purple-500 text-white w-full p-1 rounded-lg block text-center">
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}
