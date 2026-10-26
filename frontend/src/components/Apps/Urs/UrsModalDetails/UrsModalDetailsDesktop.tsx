import React, { useState } from 'react'
import { UrsTimeLine } from '../UrsTimeLine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faBarsProgress, faBoxOpen, faCamera, faCheckCircle, faClose, faCreditCard, faDownload, faEdit, faImages } from '@fortawesome/free-solid-svg-icons'
import { UrsTables } from '../UrsTables'
import { hasCamera, isMobile } from '../../../../Utils/Media'
import { formDateHours } from '../../../../Utils/Date'

type UrsModalDetailsDesktopProp={
    id,save,setId,data,TimeZone,Requests,column,url,HandleDownloadFile,cameraInputRef,view,setView,inputRef
    ,HandleCancelFolio,handleCapture,files,setFiles,handleFiles
}
export const UrsModalDetailsDesktop = ({id,save,setId,data,TimeZone,Requests,column,url ,HandleDownloadFile,cameraInputRef,view,setView,inputRef,HandleCancelFolio,handleCapture,files,setFiles,handleFiles}:UrsModalDetailsDesktopProp) => {
    const [dragActive, setDragActive] = useState(false);
    return (
        <div className="fixed bg-black/30 top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div className="w-[1600px] max-w-[90vw] max-h-[90vh] h-[900px] bg-white rounded-lg p-2 relative flex flex-col">
                <button onClick={() => {
                    setId({
                        id: 0
                    })
                }} className="absolute right-0 top-0 translate-y-[-50%] translate-x-[50%] rounded-full bg-red-600 w-7 h-7 flex justify-center items-center text-white font-bold z-50">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="flex items-center flex-row p-2">
                    <div className="text-5xl text-purple-500">
                        <FontAwesomeIcon icon={faBoxOpen} />
                    </div>
                    <div>
                        <div className="font-bold text-2xl">
                            URS
                        </div>
                        <div className="text-sm text-gray-400">
                            Urgent Request for Shipment
                        </div>
                    </div>

                </div>

                <div className="flex-1 relative">
                    <div className="flex flex-row md:p-2 h-full absolute w-[100%] top-0 left-0 overflow-y-auto ">
                        <div className="flex-1 p-2 lg:max-w-[calc(100%-300px)] overflow-x-auto">
                            <div className="border border-gray-200 px-2 rounded-lg ">
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

                                <div className="grid grid-cols-1 md:grid-cols-3 ">
                                    <div className="border-t border-t-gray-300 md:border-t-0 py-2 px-2">
                                        <div className="flex items-center flex-row gap-2 text-gray-700">
                                            <div>
                                                <FontAwesomeIcon icon={faCreditCard}
                                                    className=" " />
                                            </div>
                                            <div className="">
                                                Pickup
                                            </div>
                                        </div>
                                        <div className="flex items-center flex-row gap-2 text-gray-700 py-2">

                                            <div className="">
                                                {formDateHours(new Date(data?.hrs),TimeZone)}
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                {
                                    (data?.Verify == 3 && data.Process != 99 && data.LastProcessDay != null && data.UrsFolioPictures.length==0) || data?.Verify == 4?
                                        isMobile ?
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
                                            : <>
                                                <div className="flex flex-row">
                                                    <div className="w-full flex-1">
                                                        <div
                                                            className={`
                    rounded-xl border-2 border-dashed
                    p-10 text-center transition-all duration-200
                    ${dragActive
                                                                    ? "border-blue-500 bg-blue-50"
                                                                    : "border-gray-300 bg-white"
                                                                }
                `}
                                                            onDragOver={(e) => {
                                                                e.preventDefault();
                                                                setDragActive(true);
                                                            }}
                                                            onDragLeave={() => setDragActive(false)}
                                                            onDrop={(e) => {
                                                                e.preventDefault();
                                                                setDragActive(false);
                                                                handleFiles(e.dataTransfer.files);
                                                            }}
                                                        >
                                                            {/*<CloudArrowUpIcon className="w-16 h-16 mx-auto text-gray-400" />*/}

                                                            <h3 className="mt-4 text-lg font-semibold text-gray-700">
                                                                Arrastra y suelta tus imágenes aquí
                                                            </h3>

                                                            <p className="text-sm text-gray-500 mt-1">
                                                                o haz clic para seleccionar
                                                            </p>

                                                            <button
                                                                type="button"
                                                                onClick={() => inputRef.current?.click()}
                                                                className="
                                                                    mt-6
                                                                    bg-blue-600
                                                                    hover:bg-blue-700
                                                                    text-white
                                                                    px-5
                                                                    py-2
                                                                    rounded-lg
                                                                    shadow
                                                                "
                                                            >
                                                                Seleccionar archivos
                                                            </button>

                                                            <input
                                                                ref={inputRef}
                                                                type="file"
                                                                multiple
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(e) => handleFiles(e.target.files)}
                                                            />
                                                        </div>

                                                        <div className="mt-3 text-xs text-gray-500">
                                                            Formatos admitidos: JPG, JPEG, PNG, WEBP |
                                                            Máximo 10 imágenes |
                                                            Tamaño máximo: 5 MB
                                                        </div>


                                                    </div>
                                                    <div className="w-[200px] lg:w-[400px]">
                                                        {files.length > 0 && (
                                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                                {files.map((file, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="rounded-lg border overflow-hidden"
                                                                    >
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
                                                </div>

                                            </>
                                        : <></>
                                }
                                <div className=" rounded-lg border  overflow-x-auto border-gray-200  overflow-y-auto hidden sm:block">
                                    {
                                        <UrsTables rows={Requests?.data} column={column} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:flex w-[300px]">
                            <UrsTimeLine data={data} TimeZone={TimeZone} />

                        </div>
                    </div>
                </div>
                <div className="text-right">
                    {data?.Verify == 2 && <button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                        <svg data-prefix="fas" data-icon="ban" className="svg-inline--fa fa-ban" role="img" viewBox="0 0 512 512" aria-hidden="true"><path fill="currentColor" d="M367.2 412.5L99.5 144.8c-22.4 31.4-35.5 69.8-35.5 111.2 0 106 86 192 192 192 41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3c22.4-31.4 35.5-69.8 35.5-111.2 0-106-86-192-192-192-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"></path></svg> Cancelar</button>}
                    {(!(data?.Verify == 3 && data.Process != 99 && data.LastProcessDay != null && data.UrsFolioPictures.length==0) && data?.Verify != 4) ? <Link to={`/urs/${url}/${id}`} type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                        <FontAwesomeIcon icon={faEdit} />
                        Modificar
                    </Link>:<></>}
                    <button onClick={save} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 mr-2">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        Verificar
                    </button>
                </div>

            </div>
        </div>
    )
}
