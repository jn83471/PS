import { useParams } from "react-router-dom"
import { useAuth } from "../../../../hook/useAuth"
import { UrsGetFolioById } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { GetUrsRequestScann } from "../../../../api/Apps/Urs/UrsScann"
import { useQuery } from "@tanstack/react-query"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faBoxOpen, faCheckSquare, faClock } from "@fortawesome/free-solid-svg-icons"
import { formatFolio } from "../../../../Utils/Urs"
import { formatDateTimeZone, formatDateUTC, formDateHours } from "../../../../Utils/Date"
import { GetTimeZone } from "../../../../hook/GetTimeZone"

export const FollowScannDetails = () => {
  const { id } = useParams()

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

    const TimeZone = GetTimeZone(Auth?.data?.TimeZone)
  
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
              #{formatFolio(id)}
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
                                  <FontAwesomeIcon icon={faClock}
                                    className="text-blue-500" />
                                </div>
                                <div>
                                  {formatDateTimeZone(process?.createdAt,TimeZone)}
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-2 py-1">
                                <div>
                                  <FontAwesomeIcon icon={faClock}
                                    className="text-blue-500" />
                                </div>
                                <div>
                                  {formDateHours(new Date(process?.createdAt),TimeZone)}
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
                                        {element.UrsRequestScannHistory.filter(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).length >= 1 && formatDateTimeZone(element?.UrsRequestScannHistory?.find(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box)?.createdAt??'',TimeZone)}

                                      </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2 py-1">
                                      <div>
                                        <FontAwesomeIcon icon={faClock}
                                          className="text-blue-500" />
                                      </div>
                                      <div>
                                        {element.UrsRequestScannHistory.filter(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).length >= 1 && 
                                        formDateHours(new Date(element.UrsRequestScannHistory.find(x => x.UrsProcessId == nextProcess.id && x.Box == process.Box).createdAt??''),TimeZone)}
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
    </>
  )
}
