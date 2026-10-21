import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatFolio } from "../../../../Utils/Urs"
import { faArrowDown, faBarsProgress, faBoxOpen, faBus, faBusinessTime, faCamera, faCheckCircle, faCircle, faClose, faDiagramProject, faDownload, faEdit, faFileExcel, faFilter, faImages, faSearch, faUser } from "@fortawesome/free-solid-svg-icons"
import { formDateHours } from "../../../../Utils/Date"
import { useState } from "react"
import { hasCamera, isMobile } from "../../../../Utils/Media"
import { UrsTimeLine } from "../UrsTimeLine"
import { Link } from "react-router-dom"

type UrsModalDetailsMobileProp = {
    id, setId, view, setView,url, data, handleCapture, HandleDownloadFile,HandleCancelFolio,save, TimeZone, Requests, cameraInputRef, files, setFiles,save
}
export const UrsModalDetailsMobile = ({ id, setId, view, setView,url, data, handleCapture, HandleDownloadFile,HandleCancelFolio,save, TimeZone, Requests, files, setFiles, cameraInputRef }: UrsModalDetailsMobileProp) => {
    const [search, setSearch] = useState<string>("")
    const [showId, setShowId] = useState(-1)
    const [dragActive, setDragActive] = useState(false);

    return (
        <main className="fixed top-0 left-0 w-screen h-screen max-h-screen overflow-y-auto flex flex-col bg-white p-2">
            <div className="flex items-center flex-row p-2">
                <div className="text-5xl text-purple-500">
                    <FontAwesomeIcon icon={faBoxOpen} />
                </div>
                <div className="flex-1">
                    <div className="font-bold text-2xl">
                        URS
                    </div>
                    <div className="text-sm text-gray-400">
                        Urgent Request for Shipment
                    </div>
                </div>
                <div className="">
                    <button onClick={() => {
                        setId({
                            id: 0
                        })
                    }} className="bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center">
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>

            </div>
            <header className="flex flex-row items-center gap-2">
                <div className="flex-1">
                    <div className="pt-4 py-2 font-bold text-2xl">
                        #{formatFolio(id)}
                    </div>
                </div>
            </header>
            <section className="px-2 border border-gray-200 rounded-lg">
                <div className="flex flex-row py-2">
                    <div className="flex-1 flex items-center flex-row gap-2 py-2">
                        <div>
                            <FontAwesomeIcon icon={faBarsProgress}
                                className="text-purple-600 " />
                        </div>
                        <div className="font-bold">
                            Indicadores principales
                        </div>
                    </div>
                    {data?.Verify >= 4 && <button onClick={HandleDownloadFile}
                        className="p-2 text-sm rounded-lg border border-green-500 bg-green-100/50 text-black
                                                hover:bg-green-500 hover:text-white duration-150 ease-in">
                        <FontAwesomeIcon icon={faDownload}
                            className="pr-1" />
                        ASN
                    </button>}
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="">
                        <FontAwesomeIcon icon={faBus}
                            className="text-2xl" />
                    </div>
                    <div>
                        <div>
                            PickUp
                        </div>
                        <div>
                            {formDateHours(new Date(data?.hrs), TimeZone)}
                        </div>
                    </div>
                </div>
            </section>
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

            <section className="flex flex-col gap-2 py-2">
                {
                    Requests?.data?.map((element) => (
                        <div key={`request${element.id}`} className="border border-gray-200 rounded-lg p-2">
                            <div className="flex flex-row border-b border-b-gray-200 items-center">
                                <div className="flex-1 font-bold">
                                    <div className="text-sm text-gray-400">
                                        SEWS Part No
                                    </div>
                                    {element.PartNumber}
                                </div>
                                <div className="p-2">
                                    <div className="text-sm text-gray-400">
                                        QTY
                                    </div>
                                    <div className="font-bold">
                                        {element.Qty}
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        if (showId == element.id) {
                                            setShowId(-1)
                                        }
                                        else {
                                            setShowId(element.id)
                                        }
                                    }}>
                                        <FontAwesomeIcon className={`${showId == element.id ? " rotate-180 " : " "}
                                                    duration-150 ease-in`} icon={faArrowDown} />
                                    </button>
                                </div>
                            </div>

                            {element.id == showId && <div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faBusinessTime}
                                            className="text-xl text-gray-600" />
                                    </div>
                                    <div>
                                        <div>
                                            MFG
                                        </div>
                                        <div>
                                            {element.Codes.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faFileExcel}
                                            className="text-xl text-gray-600" />
                                    </div>
                                    <div>
                                        <div>
                                            Customer Part No
                                        </div>
                                        <div>
                                            {element.CustomerPartNumber}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faUser}
                                            className="text-xl text-gray-600" />
                                    </div>
                                    <div>
                                        <div>
                                            Customer
                                        </div>
                                        <div>
                                            {element.Customer}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faCircle}
                                            className="text-xl text-gray-600" />
                                    </div>
                                    <div>
                                        <div>
                                            Motivo
                                        </div>
                                        <div>
                                            {element.Reason}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <div>
                                        <FontAwesomeIcon icon={faCircle}
                                            className="text-xl text-gray-600" />
                                    </div>
                                    <div>
                                        <div>
                                            Metodo
                                        </div>
                                        <div>
                                            {element.UrsPriority.name}
                                        </div>
                                    </div>
                                </div>
                            </div>}

                        </div>
                    ))
                }
            </section>

            {(data?.Verify == 3 && data.Process != 99 && data.LastProcessDay != null) ?
                hasCamera ?
                    <>
                        <div className="grid grid-cols-2 p-2">
                            <button onClick={() => { setView("Camera") }} className={`${view == "Camera" ? " bg-purple-500 text-white " : ""} rounded-lg p-2`}>
                                <FontAwesomeIcon icon={faCamera} />
                                Camara
                            </button>
                            <button onClick={() => { setView("Gallery") }} className={`${view == "Gallery" ? " bg-purple-500 text-white " : ""} rounded-lg p-2`}>
                                <FontAwesomeIcon icon={faImages} />
                                Galeria
                            </button>
                        </div>
                        {
                            view == "Camera" ?
                                <>
                                    <div
                                        onClick={() => cameraInputRef.current?.click()}
                                        className="
                                                                                        w-full
                                                                                        max-w-[320px]
                                                                                        h-[180px]
                                                                                        rounded-xl
                                                                                        border
                                                                                        border-gray-200
                                                                                        bg-gray-50
                                                                                        hover:bg-gray-100
                                                                                        cursor-pointer
                                                                                        flex
                                                                                        flex-col
                                                                                        items-center
                                                                                        justify-center
                                                                                        transition-all
                                                                                    "
                                    >
                                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                                            <FontAwesomeIcon icon={faCamera} />
                                        </div>

                                        <p className="mt-4 text-sm text-gray-600 font-medium">
                                            Presiona para tomar una foto
                                        </p>
                                    </div>

                                    <input
                                        ref={cameraInputRef}
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        onChange={handleCapture}
                                        className="hidden"
                                    />
                                </>
                                :
                                <div >
                                    {files.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {files.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="relative rounded-lg border overflow-hidden"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setFiles(prev =>
                                                                prev.filter((_, i) => i !== index)
                                                            )
                                                        }
                                                        className="
                                                                                                        absolute
                                                                                                        top-2
                                                                                                        right-2
                                                                                                        z-10
                                                                                                        w-7
                                                                                                        h-7
                                                                                                        rounded-full
                                                                                                        bg-red-500
                                                                                                        hover:bg-red-600
                                                                                                        text-white
                                                                                                        font-bold
                                                                                                        flex
                                                                                                        items-center
                                                                                                        justify-center
                                                                                                        shadow-md
                                                                                                    "
                                                    >
                                                        ✕
                                                    </button>
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt=""
                                                        className="w-full h-24 object-cover"
                                                    />

                                                    <div className="p-2 text-xs truncate">
                                                        {file.name}
                                                    </div>
                                                </div>


                                            ))}
                                        </div>

                                    )}
                                </div>
                        }
                    </>
                    :
                    <>
                        Sin camaras
                    </>
                : <></>
            }
            <div>
                <div className="flex-1 flex items-center flex-row gap-2 py-2">
                    <div>
                        <FontAwesomeIcon icon={faDiagramProject}
                            className="text-purple-600 " />
                    </div>
                    <div className="font-bold">
                        Estado de procesos
                    </div>
                </div>
                <UrsTimeLine data={data} TimeZone={TimeZone} />
            </div>

            <div className={`grid ${data?.Verify == 2?" grid-cols-3 ":"grid-cols-2"} text-right`}>
                {data?.Verify == 2 && <button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                    <svg data-prefix="fas" data-icon="ban" className="svg-inline--fa fa-ban" role="img" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"></path></svg> Cancelar</button>}
                <Link to={`/urs/${url}/${id}`} type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500 text-center">
                    <FontAwesomeIcon icon={faEdit} />
                    Modificar
                </Link>
                <button onClick={save} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    Verificar
                </button>
            </div>
        </main>
    )
}
