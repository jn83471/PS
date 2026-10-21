import { faBoxOpen, faEnvelope, faFaceSmile, faHome, faList, faPowerOff, faSeedling, faSquareCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuth } from "../../hook/useAuth"
export const FeatureLayouts = () => {
  const { data, isError, isLoading } = useAuth()
    if (isError) return (<Navigate to="/" />)
    return (
        <div className="flex h-screen flex-row">
            <div className="flex m-2">
                <div className="w-[70px] sm:w-[200px] bg-[#111c3d] flex flex-col rounded-3xl">
                    <div className="border-b border-be-gray-600 flex flex-row items-center m-2 py-3 gap-2 bg-purple-500 sm:bg-transparent rounded-b-xl rounded-t-3xl">
                        <div className="text-white p-2 ">
                            <FontAwesomeIcon className="text-purple-100 text-3xl" icon={faBoxOpen} />

                        </div>
                        <div className="text-white hidden sm:block">
                            <h1 className="text-2xl font-bold">
                                SMTS
                            </h1>
                            <div className="text-gray-400 text-[.7rem]">
                                Urgent Request for Shipment
                            </div>
                        </div>
                    </div>
                    <div className="p-2 flex-1">
                        <NavLink to={'/urs'} className={({isActive })=> (isActive ?"bg-purple-200/10 border-l-purple-700 border-l-2 ":"" )+"my-2 text-white  w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faHome} />
                            <span className="pl-2 hidden sm:inline">Inicio</span>
                        </NavLink>
                         <NavLink to={'/urs/request'} className={({isActive })=> (isActive ?"bg-purple-200/10 border-l-purple-700 border-l-2 ":"" )+"my-2 text-white   w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span className="pl-2 hidden sm:inline">Solicitudes</span>
                        </NavLink>
                        <NavLink to={'/urs/verifications'} className={({isActive })=> (isActive ?"bg-purple-200/10 border-l-purple-700 border-l-2 ":"" )+"my-2 text-white   w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faSquareCheck} />
                            <span className="pl-2 hidden sm:inline">Verificaciones</span>
                        </NavLink>
                    </div>
                    <div className="m-2">
                        <Link className='p-2 text-center w-full bg-red-500 rounded-2xl hover:scale-[102%] hover:bg-red-600 transition-all duration-200 block text-white' to={"/apps"}>
                            <FontAwesomeIcon icon={faPowerOff} className='px-1' />
                            <span className='hidden lg:inline'> Salir </span>
                        </Link>
                    </div>
                </div>



            </div>
            <div className="flex-1 p-4 max-h-screen overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}
