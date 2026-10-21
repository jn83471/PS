import { faArrowDown, faBus, faBusinessTime, faCancel, faCircle, faClock, faFileExcel, faPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import { formatDateUTC, formDateHours } from "../../../../Utils/Date"
import { formatFolio } from "../../../../Utils/Urs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { UrsCardComponent } from "../UrsCardComponent"
import { UrsModalAddProduct } from "../UrsModalAddProduct"
import { useState } from "react"

type UrsAddProductsMobileProp = {
    id, data, TimeZone, Requests, modal, setModal, refetch,HandleCancelFolio,HandleVeryfyFolio
}
export const UrsAddProductsMobile = ({ id, data, TimeZone, Requests, modal, setModal, refetch,HandleCancelFolio,HandleVeryfyFolio }: UrsAddProductsMobileProp) => {
    const [showId, setShowId] = useState(-1)
    return (
        <main className="h-screen flex flex-col">
            <header>
                <div className="pt-4 py-2 font-bold text-2xl">
                    #{formatFolio(id)}
                </div>
                <div className="text-sm text-gray-400">
                    Rastrear, priorizar y coordinar los envíos de materiales críticos.
                </div>
            </header>
            <section className="bg-white border border-gray-200 p-2 rounded-lg shadow">
                <div className="flex flex-row items-center gap-2 py-2">
                    <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                    <div className="px-2">
                        <div>
                            Fecha propuesta
                        </div>
                        <div>
                            {formatDateUTC(data?.ProposedDate ?? '')}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2 border-t border-t-gray-200 py-2">
                    <FontAwesomeIcon icon={faBus} className="text-3xl text-blue-500" />
                    <div className="px-2">
                        <div>
                            Pickup
                        </div>
                        <div>
                            {formDateHours(new Date(data?.hrs), TimeZone)}
                        </div>
                    </div>
                </div>
            </section>
            <div className="grid grid-cols-2 gap-2 py-2">
                <UrsCardComponent qty={Requests?.data?.length} borderl="border-l-purple-600" display="Productos"
                    bg="text-purple-500" circlebg="bg-purple-200" />
                <UrsCardComponent qty={data?.Qty} borderl="border-l-red-600" display="Cantidad total"
                    bg="text-red-500" circlebg="bg-red-200" />

            </div>
            <div>
                <button onClick={() => {
                    setModal(!modal)
                }} className="bg-blue-600 text-white p-2 rounded-lg block w-full">
                    <FontAwesomeIcon icon={faPlus} className="pr-2" />
                    agregar producto
                </button>
            </div>

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
            <section className="grid grid-cols-2 w-full py-2">
                <button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                    <FontAwesomeIcon icon={faCancel} /> Cancelar
                </button>
                <form onSubmit={HandleVeryfyFolio} className="w-full">
                    <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500 w-full">
                        <FontAwesomeIcon icon={faPlus} /> Guardar
                    </button>
                </form>

            </section>

            {modal && <UrsModalAddProduct refresh={refetch} requestrefresh={Requests.refetch} requests={Requests?.data} folioId={id} setModal={setModal} modal={modal} />}

        </main>

    )
}
