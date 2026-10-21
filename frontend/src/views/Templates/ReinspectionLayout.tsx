import { faBagShopping, faBarcode, faBars, faBoxOpen, faCheckCircle, faEnvelope, faFile, faFileAlt, faFilePdf, faHome, faListNumeric, faPlus, faPowerOff, faSquareCheck, faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, Navigate, NavLink, Outlet } from "react-router-dom"
import { useAuthWithApps } from "../../hook/useAuth"
import { useState } from "react"
import { hasPermission } from "../../hook/hasPermissionHook";
import { ToastContainer } from "react-toastify"


export const ReinspectionLayout = () => {
    const { data, isError, isLoading } = useAuthWithApps()
    const [showAside, setShowAside] = useState(true)
    if (isError) return (<Navigate to="/" />)
    if (isLoading) return (<></>)
    return (
        <div className="flex h-screen flex-row">
            <nav className={`${!showAside ? " hidden " : " flex "} sm:flex m-2`}>
                <div className="w-[70px] sm:w-[200px] bg-[#01180b] flex flex-col rounded-3xl">
                    <div className="border-b border-be-gray-600 flex flex-row items-center m-2 py-3 gap-2 bg-purple-500 sm:bg-transparent rounded-b-xl rounded-t-3xl">
                        <div className="text-white p-2 ">
                            <FontAwesomeIcon className="text-purple-100 text-3xl" icon={faBagShopping} />

                        </div>
                        <div className="text-white hidden sm:block">
                            <h1 className="text-2xl font-bold">
                                RINSP
                            </h1>
                            <div className="text-gray-400 text-[.7rem]">
                                Inspection QA
                            </div>
                        </div>
                    </div>
                    <div className="p-2 flex-1 max-h-[100vh] overflow-y-auto">
                        <NavLink to={'/Reinspection'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white  w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faHome} />
                            <span className="pl-2 hidden sm:inline">Inicio</span>
                        </NavLink>
                        <NavLink to={'/Reinspection/Defects'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white  w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faWarning} />
                            <span className="pl-2 hidden sm:inline">Defectos</span>
                        </NavLink>
                        <NavLink to={'/Reinspection/ReleaseDefect'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white  w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faBoxOpen} />
                            <span className="pl-2 hidden sm:inline">Liberar defecto</span>
                        </NavLink>
                        <NavLink to={'/Reinspection/RecordCount'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white  w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faListNumeric} />
                            <span className="pl-2 hidden sm:inline">Registrar conteo</span>
                        </NavLink>
                        <NavLink to={'/Reinspection/RepInsp'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white  w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faFile} />
                            <span className="pl-2 hidden sm:inline">Rep. Inpspección</span>
                        </NavLink>
                        <NavLink to={'/Reinspection/RepDefect'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white  w-full block p-2 rounded-r-xl"}>
                            <FontAwesomeIcon icon={faFileAlt} />
                            <span className="pl-2 hidden sm:inline">Rep. Defecto</span>
                        </NavLink>
                        
                        
                    </div>
                    <div className="m-2">
                        <Link className='p-2 text-center w-full bg-red-500 rounded-2xl hover:scale-[102%] hover:bg-red-600 transition-all duration-200 block text-white' to={"/apps"}>
                            <FontAwesomeIcon icon={faPowerOff} className='px-1' />
                            <span className='hidden lg:inline'> Salir </span>
                        </Link>
                    </div>
                </div>



            </nav>
            <div className="flex-1 p-4 max-h-screen overflow-y-auto relative pt-6 sm:pt-0">
                <button onClick={() => {
                    setShowAside(!showAside)
                }} className='absolute sm:hidden bg-gray-50 my-2 left-0 top-0 text-2xl text-black'>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    )
}
