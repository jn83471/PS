import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../../../hook/useAuth"
import { FirstVerify, SecondVerify, ThirdVerify, UrsGetFolioById } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { GetUrsRequestScann } from "../../../../api/Apps/Urs/UrsScann"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faBoxOpen, faCalendarDays, faCamera, faCheckSquare, faClock, faImages, faPlus } from "@fortawesome/free-solid-svg-icons"
import type { UrsVerificateFolio, UrsVerificateFolioCpLocal, UrsVerificateSendFolio } from "../../../../types/Urs/UrsRequestFolio"
import { toast } from "react-toastify"
import { useRef, useState } from "react"
import { hasCamera, isMobile } from "../../../../Utils/Media"

export const UrsVerificateFoliosEmb = () => {
  const { id } = useParams()

  const Auth = useAuth()
  const Navigates = useNavigate()
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['UrsFolio', id],
    queryFn: () => UrsGetFolioById(id),
    //enabled: !fecha,
    retry: false
  })

  const Requests = useQuery({
    queryKey: ['UrsRequests', id],
    queryFn: () => GetUrsRequestScann(id),
    //enabled: !fecha,
    retry: false
  })
  const procesos = data?.UrsPriority?.PriorityHasProcess?.sort((a, b) => a.Level - b.Level).map(
    x => x.UrsProcess
  )?.filter(x => x.id == Auth.data?.UrsProcessId || !Auth.data?.UrsProcessId);

  const { mutate } = useMutation({
    mutationFn: ThirdVerify,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      Navigates('/urs/verificationsEmb')
    }
  })

  const HandleFourVeryfyFolio = (e) => {
    e.preventDefault()
    if(files.length==0)
    {
      toast.error("Necesita añadir evidencia para continuar.")
      return
    }
    const dt: UrsVerificateSendFolio = {
      Verify: 4,
      files:files
    }
    console.log(dt)

    mutate({ formData: dt, idFolio: id })
  }
  const [files, setFiles] = useState<File[]>([]);
  const [view, setView] = useState("Camera")
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    if (files.length >= 4) {
      toast.error("No puede contener mas de 4 imagenes de verificación")
      return
    }

    const newFiles = Array.from(fileList);



    setFiles((prev) => [
      ...prev,
      ...newFiles
    ]);
  };

  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (files.length >= 4) {
      toast.error("No puede contener mas de 4 imagenes de verificación")
      return
    }
    const file = event.target.files?.[0];

    if (!file) return;

    setFiles(prev => [...prev, file]);
  };
  return (
    <>
      <header className="flex flex-row pt-5 pb-7">
        <div className="flex flex-row flex-1 items-center gap-2">
          <div className="bg-blue-500 rounded-full flex items-center w-12 h-12 justify-center">
            <FontAwesomeIcon icon={faClock}
              className="text-white text-3xl p-1" />
          </div>
          <div>
            <div className="text-xl md:text-4xl font-bold">
              Historia de escaneo
            </div>
            <div className="text-sm text-gray-500">
              Consulte el detalle de todos los escaneos por proceso
            </div>
          </div>
        </div>
        <div>

        </div>
      </header>
      <section className="border border-gray-200 p-2 rounded-lg flex flex-col md:flex-row md:items-center">
        <div className="flex flex-row items-center border-b md:border-r md:border-b-0 border-r-gray-200 border-b-gray-200 py-2 px-4">
          <div>
            <div className="text-gray-600 text-sm">
              Orden
            </div>
            <div className="text-xl lg:text-2xl font-bold">
              #URS{`${id?.toString().padStart(10, '0')}`}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center border-b md:border-r md:border-b-0 border-r-gray-200 border-b-gray-200 py-2 px-4">
          <div>
            <div className="text-gray-600 text-sm">
              MFG
            </div>
            <div className="text-xl lg:text-2xl font-bold">
              {`${!Requests.isLoading ? Requests?.data[0]?.Codes?.name : 0}`}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center border-b md:border-r md:border-b-0 border-r-gray-200 border-b-gray-200 py-2 px-4">
          <div>
            <div className="text-gray-600 text-sm">
              Cantidad
            </div>
            <div className="text-xl lg:text-2xl font-bold text-center">
              {data?.Qty}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center lg:border-r border-r-gray-200 py-2 px-4">
          <div>
            <div className="text-gray-600 text-sm">
              Escaneado
            </div>
            <div className="text-xl lg:text-2xl font-bold text-center">
              {Requests?.data?.map(x => x.Scann)?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}
            </div>
          </div>
        </div>
        <div className="flex-1 p-2 hidden lg:block">
          <div className="text-right text-xl">
            {(Math.trunc(Requests?.data?.map(x => x.Scann)?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / data?.Qty * 100))}%
          </div>
          <div className="bg-gray-200 overflow-hidden rounded-2xl">
            <div style={{
              width: (Requests?.data?.map(x => x.Scann)?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / data?.Qty * 100) + "%"
            }} className="min-h-2 bg-green-500">

            </div>
          </div>
        </div>
      </section>


      <section className="py-4">
        {Requests?.data?.map(element => (
          <>
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex flex-row">
                <div className="min-w-[100px] lg:min-w-[150px]">
                  <div>
                    <div className=" font-bold">
                      MFG
                    </div>
                    <div>
                      {element.Codes.name}
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className=" font-bold">
                      Cliente
                    </div>
                    <div>
                      {element.Customer}
                    </div>
                  </div>

                </div>
                <div className="min-w-[150px] lg:min-w-[190px]">
                  <div>
                    <div className=" font-bold">
                      No. Parte
                    </div>
                    <div>
                      {element.PartNumber}
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className=" font-bold">
                      No. Parte Cliente
                    </div>
                    <div>
                      {element.CustomerPartNumber}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center flex-1">
                  <div className="text-2xl lg:text-7xl pr-4">
                    {element.Qty}
                  </div>
                  <div style={{ width: '1px' }} className="bg-black min-h-[45px] rotate-12" />
                  <div className="text-2xl lg:text-7xl  pl-4">
                    {element.Scann}
                  </div>
                  <div className="flex-1 text-right px-2">
                    <div className="text-right text-lg">
                      {Math.trunc(element.Scann / element.Qty * 100)}%
                    </div>
                    <div className="bg-gray-200 rounded-2xl w-full overflow-hidden">
                      <div style={{
                        width: (element.Scann / element.Qty * 100) + "%"
                      }} className="min-h-[8px] bg-green-500">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="relative flex-1 overflow-x-auto p-2">
                <div className="">{/*w-[110vw]*/}
                  {procesos.length > 0 &&
                    element.UrsRequestScannHistory?.filter(x => x.UrsProcessId == procesos[0].id).map(process => (
                      <div className="border border-gray-200 p-2 my-2 rounded-lg flex flex-row items-center gap-2 ">

                        <div className="flex flex-row items-center min-w-[220px]">
                          <div>
                            <FontAwesomeIcon icon={faBoxOpen}
                              className="text-5xl p-2 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-bold text-xl">
                              {process.Box}
                            </div>
                            <div>
                              Cantidad: {process.Qty}
                            </div>
                          </div>
                        </div>

                        <div className="border border-green-200 bg-green-100/50 rounded-lg p-2 min-h-[100px] min-w-[250px]">
                          <div className="flex flex-row gap-2">
                            <div>
                              <FontAwesomeIcon icon={faCheckSquare}
                                className="text-2xl text-green-500" />
                            </div>
                            <div>
                              <div className="font-bold">
                                {procesos[0].Name}
                              </div>
                              <div className="flex flex-row items-center gap-2">
                                <div>
                                  <FontAwesomeIcon icon={faCalendarDays}
                                    className="text-blue-500" />
                                </div>
                                <div>
                                  {new Date(process?.createdAt).toLocaleDateString('es-MX', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-2 py-1">
                                <div>
                                  <FontAwesomeIcon icon={faClock}
                                    className="text-blue-500" />
                                </div>
                                <div>
                                  {new Date(process?.createdAt).toLocaleDateString('es-MX', {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  }).substring(10, 20).toUpperCase()}
                                </div>
                              </div>
                            </div>

                          </div>

                        </div>

                        {
                          procesos.length > 1 &&
                          procesos.slice(1).map((nextProcess, index) => (
                            <>
                              <div>
                                <FontAwesomeIcon icon={faArrowRight}
                                  className="min-w-[40px] text-2xl text-green-800" />
                              </div>
                              <div className={`${element.UrsRequestScannHistory.filter(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).length >= 1 ? " border border-green-200 bg-green-100/50 " : " border border-gray-200 bg-gray-100/50  "}  rounded-lg p-2 min-h-[100px] min-w-[250px]`}>
                                <div className="flex flex-row gap-2">
                                  <div>
                                    {element.UrsRequestScannHistory.filter(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).length >= 1 ? <FontAwesomeIcon icon={faCheckSquare}
                                      className="text-2xl text-green-500" />
                                      : <FontAwesomeIcon icon={faClock}
                                        className="text-2xl text-blue-500" />}
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {nextProcess.Name}{ }
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                      <div>
                                        <FontAwesomeIcon icon={faClock}
                                          className="text-blue-500" />
                                      </div>
                                      <div>
                                        {element.UrsRequestScannHistory.filter(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).length >= 1 && new Date(element.UrsRequestScannHistory.find(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).createdAt).toLocaleDateString('es-MX', {
                                          day: '2-digit',
                                          month: 'short',
                                          year: 'numeric'
                                        })}
                                      </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2 py-1">
                                      <div>
                                        <FontAwesomeIcon icon={faClock}
                                          className="text-blue-500" />
                                      </div>
                                      <div>
                                        {element.UrsRequestScannHistory.filter(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).length >= 1 && new Date(element.UrsRequestScannHistory.find(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).createdAt).toLocaleDateString('es-MX', {
                                          hour: "2-digit",
                                          minute: "2-digit"
                                        }).substring(10, 20).toUpperCase()}
                                      </div>
                                    </div>
                                  </div>

                                </div>

                              </div>
                            </>))
                        }

                      </div>
                    ))
                  }
                </div>
              </div>
              {/*<div className="w-[400px]">
                s
              </div>*/}
            </div>
          </>))}
      </section>
      <div className="py-2">
        <div className="flex flex-row items-center gap-2">
          <div>
            <div className="bg-blue-500 text-white rounded-lg">
              <FontAwesomeIcon icon={faCamera} 
              className="text-3xl p-2"/>
            </div>

          </div>
          <div>
            <div className="text-2xl font-bold">
              Evidencia
            </div>
            <div className="text-sm text-gray-500">
              adjunta las imágenes que respalden la verificación
            </div>
          </div>
        </div>
        {
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
              : <>sin camara</>
            : <>
              <div className="flex flex-row py-2">
                <div className="w-full flex-1">

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="rounded-lg border overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className="w-full h-48 object-cover"
                        />

                        <div className="p-2 text-xs truncate">
                          {file.name}
                        </div>
                      </div>
                    ))}

                    <div className="">
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
                          archivo
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

                    </div>
                  </div>

                </div>
              </div>

            </>
        }
      </div>
      <div className="text-right">
        <form onSubmit={HandleFourVeryfyFolio}>
          <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
            <FontAwesomeIcon icon={faPlus} /> Guardar
          </button>
        </form>
      </div>
    </>
  )
}
