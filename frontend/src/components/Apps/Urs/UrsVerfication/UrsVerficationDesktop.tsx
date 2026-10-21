import { UrsModalDetails } from "../UrsModalDetails"
import { UrsTables } from "../UrsTables"
import { UrsCardComponent } from "../UrsCardComponent"

type UrsVerficationDesktopProp={data,detailsId,rows,column,handleSendVerification,refetch,setDetailsId}
export const UrsVerficationDesktop = ({data,detailsId,rows,column,handleSendVerification,refetch,setDetailsId}:UrsVerficationDesktopProp) => {
  return (
    <>
      <header className="flex justify-between items-center flex-col sm:flex-row py-2">
        <div>
          <h1 className="text-xl md:text-4xl font-bold">
            Urgent Request for Shipment
          </h1>
          <small className="text-sm hidden md:block text-gray-500">
            Rastrear, priorizar y coordinar los envíos de materiales críticos.
          </small>
        </div>
        <div>

        </div>

      </header>
      <section className="flex h-[calc(100vh-120px)] xl:h-[calc(100vh-100px)] ">
        <section className="flex flex-col flex-1 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
            <UrsCardComponent qty={data?.filter(x => x.Verify <= 3 && x.Process != 99)?.length} borderl="border-l-purple-600" display="Solicitudes abiertas"
              bg="text-purple-500" circlebg="bg-purple-200" />
            <UrsCardComponent qty={data?.filter(x => x.Verify == 4 && x.Process != 99)?.length} borderl="border-l-green-600" display="Solicitudes cerradas"
              bg="text-green-500" circlebg="bg-green-200" />
          </div>
          <div className={`flex-1 w-[calc(100vw-110px)] ${detailsId.id != 0 ? " sm:w-[calc(100vw-250px)] overflow-x-auto " : "sm:w-[calc(100vw-250px)] overflow-x-auto"}`}>
            <UrsTables rows={rows} column={column} />
          </div>
        </section>
  
        {detailsId.id != 0 && <UrsModalDetails url="verifications" save={handleSendVerification} refetch={refetch} id={detailsId.id} setId={setDetailsId} />}
      </section>
    </>
  )
}
