import React from 'react'
import { MenuItem } from '../../components/Gnr/MenuItem'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'
import { SocketProvider } from '../../Providers/SocketProvider'
import { ToastContainer } from 'react-toastify'
import { faBarChart, faBarcode, faBusinessTime, faCalendarTimes, faClose, faCode, faCodeBranch, faComputer, faHome, faHouseMedical, faListNumeric, faLocation, faMobileAndroid, faMobilePhone, faMobileRetro, faPieChart, faPlaneDeparture, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { FaAppStore, FaTimesCircle } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Layout = () => {
    const { data, isError, isLoading } = useAuth()
    const Navigates = useNavigate()
    const HandleSignOuth = () => {
        localStorage.removeItem("AUTH_TOKEN")
        Navigates('/')
    }

    if (isError) return (<Navigate to="/" />)
    return (
        <SocketProvider>
            <div className="min-h-screen flex bg-black text-white">

                {/* SIDEBAR */}
                <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:flex flex-col">
                    <div className="p-6 text-xl font-semibold border-b border-zinc-800">
                        Production System
                    </div>

                    <nav className="flex-1 p-4 space-y-2 text-sm">
                        <MenuItem icon={faHome} label="Inicio" link='/home' active={true} />
                        <MenuItem icon={faMobileRetro} label='Apps' link='apps' active={false}/>
                        {data?.Rols.CreatePlants && <MenuItem icon={faBusinessTime} label="Planta" link='/Plant' active={false} />}
                        {data?.Rols.CreateClients && <MenuItem icon={faUser} label="Cliente" link='/Client' active={false} />}
                        <MenuItem icon={faCalendarTimes} label="Plan" link='/Plan' active={false} />
                        <MenuItem icon={faListNumeric} label="Codigo de planta" link='/code' active={false} />
                        {data?.Rols.changeLayoutMachines && <MenuItem icon={faComputer} label="Linea" link='/machine' active={false} />}
                        <MenuItem icon={faPieChart} label="Reportes" link='/reports' active={false} />
                    </nav>
                    <section className='pb-2'>
                        <MenuItem icon={faClose} label='Cerrar session' link='/' events={HandleSignOuth} active={false} />
                    </section>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 flex flex-col">

                    {/* HEADER */}
                    <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
                        <div className="text-sm text-gray-300 border border-purple-950 p-2 rounded-xl hidden sm:block">
                            <FontAwesomeIcon icon={faBarChart} />
                            Planta: {data && <> {data.Plants?.name} </>}
                        </div>

                        <div className="text-sm text-gray-300 flex flex-row">
                            <div className='flex justify-center items-center mx-2'>
                                <div className='w-10 h-10 bg-purple-500 text-white rounded-4xl flex items-center justify-center'>
                                    {data?.Name?.split(/[.\s]+/).map(palabra => palabra.charAt(0).toUpperCase()).join("")}
                                </div>
                            </div>
                            <div>
                                <div className="text-white">{data && <> {data.Name} </>}</div>
                                Usuario
                            </div>
                        </div>
                    </header>
                    {/* CONTENT */}
                    <section className="p-6 space-y-6 w-[100vw] md:w-[calc(100vw-240px)] max-h-[calc(100vh-70px)] overflow-y-auto">
                        <Outlet />
                    </section>
                </main>
            </div >
            <ToastContainer />
        </SocketProvider>
    )
}
/*<main className="flex-1 flex flex-col relative">
                    <div className=''>
                        <Outlet />
                    </div>

                </main>*/