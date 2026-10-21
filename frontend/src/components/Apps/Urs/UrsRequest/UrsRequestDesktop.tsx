import React from 'react'
import { UrsCardComponent } from '../UrsCardComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { UrsTables } from '../UrsTables'
import { UrsDetailsFolio } from '../UrsDetailsFolio'
import { UrsChangeHrs } from '../../../../views/Apps/Urs/Requests/UrsChangeHrs'
import { hasPermission } from '../../../../hook/hasPermissionHook'

type UrsRequestDesktopProp={
    stats,
    detailsId,
    data,
    User,
    column,
    setDetailsId,
    TimeZone,
    setUpHrs,
    refetch,
    setSetUpHrs
}
export const UrsRequestDesktop = ({stats,detailsId,data,User,column,setDetailsId,TimeZone,setUpHrs,refetch,setSetUpHrs   }:UrsRequestDesktopProp) => {
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
                    {hasPermission("URS", User, "Request") &&<Link to={'/urs/newrequest'}
                        className="block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className='pr-2' />
                        <p className="hidden md:inline">Crear nueva solicitud</p>
                    </Link>}
                </div>

            </header>
            <section className="flex h-[calc(100vh-120px)] xl:h-[calc(100vh-100px)] ">
                <section className="flex flex-col flex-1 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
                        <UrsCardComponent qty={stats.open} borderl="border-l-purple-600" display="Solicitudes abiertas"
                            bg="text-purple-500" circlebg="bg-purple-200" />
                        <UrsCardComponent qty={stats.closed} borderl="border-l-green-600" display="Solicitudes cerradas"
                            bg="text-green-500" circlebg="bg-green-200" />
                    </div>
                    <div className={`flex-1 w-[calc(100vw-110px)] ${detailsId.id != 0 ? " sm:w-[calc(100vw-650px)] overflow-x-auto " : "sm:w-[calc(100vw-250px)] overflow-x-auto"}`}>
                        <UrsTables rows={data} column={column} />
                    </div>


                </section>
                {/*cambiar*/}
                <UrsDetailsFolio setSetUpHrs={setSetUpHrs} detailsId={detailsId} setDetailsId={setDetailsId} TimeZone={TimeZone} data={data} />
            </section>
            {setUpHrs.id != 0 && <UrsChangeHrs save={() => { }} url="verificationsEmb" refetch={refetch} id={detailsId.id} setId={setSetUpHrs} />}
        </>
    )
}
