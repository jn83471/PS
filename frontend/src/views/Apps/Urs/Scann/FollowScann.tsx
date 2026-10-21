import { useQuery } from "@tanstack/react-query"
import { UrsGetFolios } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBus, faCalendarDays, faCircle, faFilePdf, faUser } from "@fortawesome/free-solid-svg-icons"
import { UrsEstatusComponent } from "../../../../components/Apps/Urs/UrsEstatusComponent"
import { Link } from "react-router-dom"
import { formatDateUTC } from "../../../../Utils/Date"
import { formatFolio } from "../../../../Utils/Urs"

export const FollowScann = () => {


  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['UrsPriority'],
    queryFn: UrsGetFolios,
    //enabled: !fecha,
    retry: false
  })

  const rows = data?.filter(x => (x.Verify == 3 || x.Verify == 4) && x.Process != 99)

  return (
    <>

      <header className="flex justify-between items-center flex-col sm:flex-row pt-5 pb-7">
        <div>
          <h1 className="text-xl md:text-4xl font-bold">
            Urgent Request for Shipment</h1>
          <small className="text-sm hidden md:block text-gray-500">
            Rastrear, priorizar y coordinar los envíos de materiales críticos.
          </small>
        </div>
        <div>
        </div>
      </header>
      <section>
        <div className="text-3xl font-bold py-2">
          Por Escanear
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {
            rows?.filter(x => x.LastProcessDay == null).map(elements => (
              <Link to={`/urs/FollowScann/${elements.id}`} className="border border-blue-300 rounded-lg p-2 border-l-4 border-l-orange-500
            hover:scale-105 bg-white">
                <div className="flex flex-row items-center">
                  <div className="uppercase font-bold text-2xl sm:text-lg flex-1">
                    {formatFolio(elements.id)}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCircle} className={`${elements.LastProcessDay != null ? " text-green-600 " : " text-orange-600 "}`} />
                  </div>
                </div>

                <div>

                  <UrsEstatusComponent Process={elements.Process} Verify={elements.Verify} />

                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faBus}
                        className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {elements.UrsRequests?.[0]?.UrsPriority?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Método
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faFilePdf}
                        className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {elements.UrsRequests?.[0]?.Reason}
                      </p>
                      <p className="text-sm text-gray-600">
                        Motivo
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faUser}
                        className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {elements.RequestUser?.Name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Solicitado por
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays}
                        className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {formatDateUTC(elements.ProposedDate)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Fecha de solicitud
                      </p>
                    </div>
                  </div>
                </div>
              </Link>))
          }
        </div>
      </section>

      <section>
        <div className="text-3xl font-bold py-2">
          Completado
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {
            rows?.filter(x => x.LastProcessDay != null).map(elements => (
              <Link to={`/urs/FollowScann/${elements.id}`} className="border border-blue-300 rounded-lg p-2 border-l-4 border-l-orange-500
            hover:scale-105 bg-white">
                <div className="flex flex-row items-center">
                  <div className="uppercase font-bold text-2xl sm:text-lg flex-1">
                    {formatFolio(elements.id)}
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faCircle} className={`${elements.LastProcessDay != null ? " text-green-600 " : " text-orange-600 "}`} />
                  </div>
                </div>

                <div>

                  <UrsEstatusComponent Process={elements.Process} Verify={elements.Verify} />

                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faBus}
                        className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {elements.UrsRequests?.[0]?.UrsPriority?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Método
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faFilePdf}
                        className="text-red-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {elements.UrsRequests?.[0]?.Reason}
                      </p>
                      <p className="text-sm text-gray-600">
                        Motivo
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faUser}
                        className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {elements.RequestUser?.Name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Solicitado por
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <FontAwesomeIcon icon={faCalendarDays}
                        className="text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {formatDateUTC(elements.ProposedDate)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Fecha de solicitud
                      </p>
                    </div>
                  </div>
                </div>
              </Link>))
          }
        </div>
      </section>

    </>
  )
}
