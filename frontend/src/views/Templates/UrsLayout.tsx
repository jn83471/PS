import { faBarcode, faBars, faBoxOpen, faCheckCircle, faEnvelope, faHome, faImage, faPictureInPicture, faPlus, faPowerOff, faSquareCheck, faTree } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router-dom"
import { useAuthWithApps } from "../../hook/useAuth"
import { useEffect, useState, useTransition } from "react"
import { hasPermission } from "../../hook/hasPermissionHook";
import { ToastContainer } from "react-toastify"
import { SocketProvider } from "../../Providers/SocketProvider"
import { useTranslation } from "react-i18next"
import i18n from "../../i18n/Index"


export const UrsLayout = () => {
    const { data, isError, isLoading } = useAuthWithApps()
    const location = useLocation()
    const { t } = useTranslation()



    const [showAside, setShowAside] = useState(false)


    useEffect(() => {
        if (typeof i18n.changeLanguage === "function") {
            console.log("paso")
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

    if (!isLoading && isError) {
        console.log("regresa")
        return <Navigate to="/" replace />;
    }
    if (isLoading) return (<></>)




    return (
        <>
            <div className="flex h-screen flex-row">
                <nav className={`${!showAside || (location.pathname.startsWith('/urs/scann/') && location.pathname != '/urs/scann/') ? " hidden " : " flex "} sm:flex m-2`}>
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
                        <div className="p-2 flex-1 max-h-[100vh] overflow-y-auto">
                            <NavLink to={'/urs'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white  w-full block p-2 rounded-r-xl"}>
                                <FontAwesomeIcon icon={faHome} />
                                <span className="pl-2 hidden sm:inline">{t("Layout.Home")}</span>
                            </NavLink>
                            {hasPermission("URS", data, "Request") && <>
                                <NavLink to={'/urs/newrequest'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <span className="pl-2 hidden sm:inline">{t("Urs.SideBar.CreateRequest")}</span>
                                </NavLink>
                                <NavLink to={'/urs/request'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span className="pl-2 hidden sm:inline">{t("Urs.SideBar.Request")}</span>
                                </NavLink>
                            </>}
                            {hasPermission("URS", data, "VERIFICATE") &&
                                <NavLink to={'/urs/verifications'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faSquareCheck} />
                                    <span className="pl-2 hidden sm:inline">{t("Urs.SideBar.CPLocalVerifications")}</span>
                                </NavLink>}
                            {hasPermission("URS", data, "Request") &&
                                <NavLink to={'/urs/verificationssmts'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span className="pl-2 hidden sm:inline">Verificaciones SMTS</span>
                                </NavLink>}
                            {(hasPermission("URS", data, "SCANN") || data?.UrsProcessId) && <>
                                <NavLink to={'/urs/scann'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faBarcode} />
                                    <span className="pl-2 hidden sm:inline">{t("Urs.SideBar.Scanning")}</span>
                                </NavLink>
                            </>}
                            {(hasPermission("URS", data, "SCANN") || data?.UrsProcessId) && <>
                                <NavLink to={'/urs/evidence'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faImage} />
                                    <span className="pl-2 hidden sm:inline">Subir evidencia</span>
                                </NavLink>
                            </>}
                            {(hasPermission("URS", data, "VERIFICATE") || hasPermission("URS", data, "Request")) &&
                                <NavLink to={'/urs/FollowScann'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faTree} />
                                    <span className="pl-2 hidden sm:inline">{t("Urs.SideBar.ScanTracking")}</span>
                                </NavLink>}

                            {hasPermission("URS", data, "VERIFICATE") &&
                                <NavLink to={'/urs/verificationsEmb'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faSquareCheck} />
                                    <span className="pl-2 hidden sm:inline">{t("Urs.SideBar.ShipmentVerification")}</span>
                                </NavLink>}
                            {(hasPermission("URS", data, "SCANN") || data?.UrsProcessId)&&
                                <NavLink to={'/urs/verificationsRes'} className={({ isActive }) => (isActive ? "bg-purple-200/10 border-l-purple-700 border-l-2 " : "") + "my-2 text-white   w-full block p-2 rounded-r-xl"}>
                                    <FontAwesomeIcon icon={faCheckCircle} />
                                    <span className="pl-2 hidden sm:inline">{t("Urs.SideBar.ReceiptVerification")}</span>
                                </NavLink>}

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
</>
    )
}
