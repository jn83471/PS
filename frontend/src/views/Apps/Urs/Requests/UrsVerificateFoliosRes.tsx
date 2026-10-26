import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../../../hook/useAuth"
import { FirstVerify, UrsGetFolioById } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { GetUrsRequestScann } from "../../../../api/Apps/Urs/UrsScann"
import { useMutation, useQuery } from "@tanstack/react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faBoxOpen, faCheckSquare, faClock, faPlus } from "@fortawesome/free-solid-svg-icons"
import type { UrsVerificateFolio } from "../../../../types/Urs/UrsRequestFolio"
import { toast } from "react-toastify"

export const UrsVerificateFoliosRes = () => {
  const { id } = useParams()
  const Navigates = useNavigate()

  const Auth = useAuth()
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
    mutationFn: FirstVerify,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      Navigates('/urs/verificationsEmb')
    }
  })

  const HandleFiveVeryfyFolio = (e) => {
    e.preventDefault()
    const dt: UrsVerificateFolio = {
      Verify: 5
    }
    console.log(dt)

    mutate({ formData: dt, idFolio: id })
  }

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
                  {procesos?.length > 0 &&
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
                                  <FontAwesomeIcon icon={faClock}
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
                              <div className={`${element.UrsRequestScannHistory.filter(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).length >= 1?" border border-green-200 bg-green-100/50 ":" border border-gray-200 bg-gray-100/50  "}  rounded-lg p-2 min-h-[100px] min-w-[250px]`}>
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
      <div className="text-right">
              <form onSubmit={HandleFiveVeryfyFolio}>
                <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                  <FontAwesomeIcon icon={faPlus} /> Guardar
                </button>
              </form>
            </div>
    </>
  )
}
