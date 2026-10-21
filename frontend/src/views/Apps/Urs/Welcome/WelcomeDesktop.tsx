import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UrsTables } from "../../../../components/Apps/Urs/UrsTables"
import { hasPermission } from "../../../../hook/hasPermissionHook"
import { Link } from "react-router-dom"
import { UrsCardComponent } from "../../../../components/Apps/Urs/UrsCardComponent"

type WelcomeDesktopProp={
    data,Requests,rows,column
}
export const WelcomeDesktop = ({data,Requests,rows,column}:WelcomeDesktopProp) => {
    return (
        <>
            <header className="flex justify-between items-center flex-col md:flex-row py-2">
                <div>
                    <h1 className="text-4xl font-bold">
                        Urgent Request for Shipment
                    </h1>
                    <small className="text-sm text-gray-500">
                        Rastrear, priorizar y coordinar los envíos de materiales críticos.
                    </small>
                </div>
                <div>
                    {hasPermission("URS", data, "Request") && <Link to={'/urs/newrequest'}
                        onClick={() => {
                        }}
                        className="my-2 sm:my-0 block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className='pr-2' />
                        Crear nueva solicitud
                    </Link>}
                </div>

            </header>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
                <UrsCardComponent qty={Requests?.data?.filter(x => x.Verify <= 3 && x.Process != 99)?.length} borderl="border-l-purple-600" display="Solicitudes abiertas"
                    bg="text-purple-500" circlebg="bg-purple-200" />
                <UrsCardComponent qty={Requests?.data?.filter(x => x.Verify == 4 && x.Process != 99)?.length} borderl="border-l-green-600" display="Solicitudes cerradas"
                    bg="text-green-500" circlebg="bg-green-200" />
            </section>

            <div className="h flex flex-row h-[calc(100vh-210px)] overflow-y-auto p-2 gap-2">
                <div className="flex-1 min-h-[calc(100vh-250px)] overflow-y-auto border border-gray-200 rounded-2xl m-2 p-4">
                    <div className="flex items-center justify-between flex-row">
                        <div >
                            <div className="font-bold text-2xl">
                                Solicitudes
                            </div>
                            <div className="text-sm text-gray-400">
                                Material de alta prioridad
                            </div>
                        </div>
                        <div>
                            <button className="mx-2 bg-purple-100 text-purple-800 font-medium py-2 px-4 rounded-2xl">
                                All Status
                            </button>
                        </div>
                    </div>
                    <UrsTables rows={rows} column={column}/>
                </div>

            </div>
        </>
    )
}
