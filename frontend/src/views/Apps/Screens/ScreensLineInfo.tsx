import { faCalendar, faCalendarCheck, faCalendarDays, faCalendarTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ScreensLineInfo = () => {
  return (
    <div className="bg-black w-screen min-h-screen text-white py-2">
      <div className="bg-white/20 rounded-xl mx-2">
        <div className="flex flex-row">
          <div className="">
            <div className="grid grid-cols-2 p-2">
              <div className="flex items-center justify-center">
                <div>
                  <p className="text-5xl">
                    Meta PLAN
                  </p>
                  <small className="text-xl text-gray-400">
                    (Turno)
                  </small>
                </div>

              </div>
              <div className="text-8xl font-medium flex items-center justify-center">
                151
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-row justify-center items-center bg-black/55 rounded-l-xl">
            <div className="flex flex-row">
              <div className="py-5">

              </div>

              <h1 className="inline text-8xl">
                RAV4-44
              </h1>
            </div>
          </div>
          <div className="flex justify-center items-center bg-black/55 rounded-r-xl px-2">
            <div className="text-7xl text-blue-500 border-l border-l-gray-600">
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <div>
              <div className="opacity-75">
                07 OCT 2026
              </div>
              <div className="text-3xl font-bold">
                15:42
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-center py-2 p-2">
        <h2 className="text-2xl font-bold text-gray-200 relative pr-4 ">
          Piezas acumuladas
        </h2>
        <div className="h-0.5 flex-1 bg-gray-600"></div>
      </div>
      <div className="grid grid-cols-3 px-2 min-h-[15vh] gap-2">
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center flex-1">
            <div className="uppercase opacity-70 bg-black/15 mx-2 ">
              Meta
            </div>
            <div className="text-9xl">
              0
            </div>
          </div>
        </div>
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center">
            <div className="uppercase opacity-70">
              REAL
            </div>
            <div className="text-9xl">
              0
            </div>
          </div>
        </div>
        <div className="border border-green-500 gap-1 rounded-xl flex justify-center items-center bg-green-500/20">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Diferencia
            </div>
            <div className="text-9xl text-green-600">
              0
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center py-2 p-2">
        <h2 className="text-2xl font-bold text-gray-200 relative pr-4 ">
          Piezas/Hrs
        </h2>
        <div className="h-0.5 flex-1 bg-gray-600"></div>
      </div>
      <div className="grid grid-cols-3 px-2 min-h-[15vh] gap-2">
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Meta
            </div>
            <div className="text-9xl">
              0
            </div>
          </div>
        </div>
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center">
            <div className="uppercase opacity-70">
              REAL
            </div>
            <div className="text-9xl">
              0
            </div>
          </div>
        </div>
        <div className="border border-red-500 gap-1 rounded-xl flex justify-center items-center bg-red-500/20">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Diferencia
            </div>
            <div className="text-9xl text-red-600">
              -14
            </div>
          </div>
        </div>
      </div>



      <div className="flex items-center justify-center py-2 p-2">
        <h2 className="text-2xl font-bold text-gray-200 relative pr-4 ">
          % Prod
        </h2>
        <div className="h-0.5 flex-1 bg-gray-600"></div>
      </div>
      <div className="grid grid-cols-3 px-2 min-h-[15vh] gap-2">
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center">
            <div className="uppercase opacity-70">
              % Prod
            </div>
            <div className="text-9xl">
              0%
            </div>
          </div>
        </div>
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Defectos del dia
            </div>
            <div className="text-9xl">
              0
            </div>
          </div>
        </div>
        <div className="border border-green-500 gap-1 rounded-xl flex justify-center items-center bg-green-500/20">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Dias sin defectos
            </div>
            <div className="text-9xl text-green-600">
              0
            </div>
          </div>
        </div>
      </div>



      <div className="flex items-center justify-center py-2 p-2">
        <h2 className="text-2xl font-bold text-gray-200 relative pr-4 ">
          Conveyor
        </h2>
        <div className="h-0.5 flex-1 bg-gray-600"></div>
      </div>
      <div className="grid grid-cols-3 px-2 min-h-[15vh] gap-2">
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Piezas por hora
            </div>
            <div className="text-9xl">
              0
            </div>
          </div>
        </div>
        <div className="border border-gray-500 gap-1 rounded-xl flex justify-center items-center bg-gray-900">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Piezas por hora estimada
            </div>
            <div className="text-9xl">
              0
            </div>
          </div>
        </div>
        <div className="border border-green-500 gap-1 rounded-xl flex justify-center items-center bg-green-500/20">
          <div className="text-center">
            <div className="uppercase opacity-70">
              Tiempo por turno estimado
            </div>
            <div className="text-9xl text-green-600">
              0
            </div>
          </div>
        </div>
      </div>

      

    </div>
  )
}
