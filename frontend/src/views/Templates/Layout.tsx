import React, { useEffect, useState } from 'react'
import { MenuItem } from '../../components/Gnr/MenuItem'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../hook/useAuth'
import { SocketProvider } from '../../Providers/SocketProvider'
import { ToastContainer } from 'react-toastify'
import { faBarChart, faBarcode, faBars, faBusinessTime, faCalendarTimes, faClose, faCode, faCodeBranch, faComputer, faHamburger, faHome, faHouseMedical, faLineChart, faLinesLeaning, faListNumeric, faLocation, faMobileAndroid, faMobilePhone, faMobileRetro, faPieChart, faPlaneDeparture, faPowerOff, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { FaAppStore, FaTimesCircle } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n/Index'

export const Layout = () => {
    const { data, isError, isLoading } = useAuth()
    const Navigates = useNavigate()
    const HandleSignOuth = () => {
        localStorage.removeItem("AUTH_TOKEN")
        Navigates('/')
    }

    const [showAside, setShowAside] = useState(true)
    useEffect(() => {
        if (typeof i18n.changeLanguage === "function") {
            if (isLoading) {
                i18n.changeLanguage("es");
            }
            else {
                switch (data?.Lang) {
                    case 1:
                        i18n.changeLanguage("es");
                        break;
                    default:
                        i18n.changeLanguage("en");
                        break;
                }
                console.log("cambio de idioma " + i18n.language)

            }
            //i18n.changeLanguage(user.lang);
        }
    }, [i18n, data]);
/*"Layout": {
        "Home": "Home",
        "Plants": "Plants",
        "Customers": "Customers",
        "Plan": "Plan",
        "Code": "Plant code",
        "Line": "Line",
        "Reports": "Reports"
    },*/
    const {t}=useTranslation()
    if (isError) return (<Navigate to="/" />)
    return (
        <>
            <div className="min-h-screen flex bg-white text-white">

                {/* SIDEBAR */}
                <aside className={`gap-2 ${showAside ? " flex " : " hidden "} sm:flex `}>
                    <div className='bg-[#232234] m-3 rounded-2xl p-2 flex flex-col max-h-[98vh] overflow-y-auto'>
                        <div className="py-6 text-center hidden lg:block text-xl font-semibold text-green-100 border-b border-b-gray-200">
                            Production System
                        </div>
                        <div className="py-3 text-center block lg:hidden text-2xl font-semibold bg-green-500 rounded-t-2xl">
                            PS
                        </div>

                        <nav className="flex-1 py-4 px-2 space-y-2 text-sm">
                            <MenuItem icon={faHome} label={t("Layout.Home")} link='/home' active={true} />
                            <MenuItem icon={faMobileRetro} label='Apps' link='apps' active={false} />
                            {data?.Rols.CreatePlants && <MenuItem icon={faBusinessTime} label={t("Layout.Plants")} link='/Plant' active={false} />}
                            {data?.Rols.CreateClients && <MenuItem icon={faUser} label={t("Layout.Customers")} link='/Client' active={false} />}
                            {data?.Rols.CreatePlans && <MenuItem icon={faCalendarTimes} label={t("Layout.Plan")} link='/Plan' active={false} />}
                            {data?.Rols.CreateCodes && <MenuItem icon={faListNumeric} label={t("Layout.Code")} link='/code' active={false} />}
                            {data?.Rols.changeLayoutMachines && <MenuItem icon={faComputer} label={t("Layout.Line")} link='/machine' active={false} />}
                            <MenuItem icon={faPieChart} label={t("Layout.Reports")} link='/reports' active={false} />
                        </nav>
                        <section className='pb-2'>
                            <button className='p-2 text-center w-full bg-red-500 rounded-2xl hover:scale-[102%] hover:bg-red-600 transition-all duration-200' onClick={HandleSignOuth}>
                                <FontAwesomeIcon icon={faPowerOff} className='px-1' />
                                <span className='hidden lg:inline'> Cerrar sesión</span>
                            </button>
                        </section>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 flex flex-col relative">
                    <button onClick={() => {
                        setShowAside(!showAside)
                    }} className='absolute sm:hidden bg-gray-50 my-4 left-0 text-2xl text-black'>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {/* HEADER */}
                    <header className="h-16 bg-white border-b-4 border-b-[#113b2b] flex items-center justify-between px-6">
                        <div className="text-sm text-black border border-green-950 p-2 rounded-xl hidden sm:block">
                            <FontAwesomeIcon icon={faBarChart} />
                            Planta: {data && <> {data.Plants?.name} </>}
                        </div>

                        <div className="text-sm text-black flex flex-row">
                            <div className='flex justify-center items-center mx-2'>
                                <div className='w-10 h-10 bg-green-500 text-white rounded-4xl flex items-center justify-center'>
                                    {data?.Name?.split(/[.\s]+/).map(palabra => palabra.charAt(0).toUpperCase()).join("")}
                                </div>
                            </div>
                            <div>
                                <div className="text-black font-bold">{data && <> {data.Name} </>}</div>
                                {t("User")}
                            </div>
                        </div>
                    </header>
                    {/* CONTENT */}
                    <section className={`p-2 sm:p-6 space-y-6 ${!showAside ? " w-[calc(100vw-0px)] sm:w-[calc(100vw-121px)] lg:w-[calc(100vw-200px)]" : " w-[calc(100vw-121px)] lg:w-[calc(100vw-200px)] "} max-h-[calc(100vh-70px)] overflow-y-auto text-black`}>

                        <Outlet />
                    </section>
                </main>
            </div >
            <ToastContainer />

        </>
    )
}
/*<main className="flex-1 flex flex-col relative">
                    <div className=''>
                        <Outlet />
                    </div>

                </main>*/