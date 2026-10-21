import { faBoxOpen, faCancel, faClock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatDate } from '@fullcalendar/react'
import React from 'react'
import { formatDateUTC, formDateHours } from '../../../../Utils/Date'
import { UrsCardComponent } from '../UrsCardComponent'
import { UrsTables } from '../UrsTables'
import { UrsModalAddProduct } from '../UrsModalAddProduct'
import { formatFolio } from '../../../../Utils/Urs'
type UrsAddProductsDesktopProp={
    id,data,TimeZone,Requests,column,HandleCancelFolio,HandleVeryfyFolio,modal,setModal,refetch
}
const columns = [
        "MFG",
        "SEWS Part Number",
        "Customer Part Number",
        "Customer",
        "QTY",
        "Reason",
        "Method",

    ]
export const UrsAddProductsDesktop = ({id,data,TimeZone,Requests,column,HandleCancelFolio,HandleVeryfyFolio,modal,setModal,refetch }) => {

    return (
        <>
            <div className="flex flex-col lg:flex-row py-2">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">
                        #{formatFolio(id)}
                    </h1>
                    <small className="text-sm text-gray-500">
                        Rastrear, priorizar y coordinar los envíos de materiales críticos.
                    </small>
                </div>

                <div className="border border-gray-200 py-2 grid sm:grid-cols-1 md:grid-cols-2 rounded-2xl">
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                Fecha propuesta
                            </div>
                            <div>
                                { formatDateUTC(data?.ProposedDate??'')}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                Pickup
                            </div>
                            <div>
                                {formDateHours(new Date(data?.hrs),TimeZone)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div>


                <div className="flex justify-between pb-3 flex-col sm:flex-row gap-2 items-center">

                    <div className="grid grid-cols-2 gap-4 mb-6 flex-1 max-w-[500px]">
                        <UrsCardComponent qty={Requests?.data?.length} borderl="border-l-purple-600" display="Productos"
                            bg="text-purple-500" circlebg="bg-purple-200" />
                        <UrsCardComponent qty={data?.Qty} borderl="border-l-red-600" display="Cantidad total"
                            bg="text-red-500" circlebg="bg-red-200" />

                    </div>
                    <div>
                        <button onClick={() => {
                            setModal(!modal)
                        }} className="bg-blue-600 text-white p-2 rounded-2xl">
                            <FontAwesomeIcon icon={faPlus} className="pr-2" />
                            agregar producto
                        </button>
                    </div>


                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    {Requests?.data?.length == 0 ?
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        columns.map((e, index) => (
                                            <th key={`col${index}`} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{e}</th>
                                        ))
                                    }

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td colSpan={11}>
                                        <div className="h-[50vh] flex items-center justify-center">
                                            <div>
                                                <div className="text-center">
                                                    <FontAwesomeIcon className="sm:text-2xl md:text-9xl text-blue-700" icon={faBoxOpen} />
                                                </div>
                                                <div className="text-center py-2">
                                                    <div className="sm:text-xl md:text-2xl font-bold md:py-2">
                                                        No hay productos agregados
                                                    </div>
                                                    <div className="md:py-2">
                                                        Agrega el primer producto para comenzar con la solicitud
                                                    </div>
                                                    <div className="text-center">
                                                        <button onClick={() => {
                                                            setModal(!modal)
                                                        }
                                                        } className="p-2 md:my-2 border flex items-center gap-2 mx-auto text-blue-700 border-blue-700 rounded-lg">
                                                            <FontAwesomeIcon icon={faPlus} />
                                                            <p>Agregar producto</p>
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table> :
                        <UrsTables rows={Requests?.data} column={column} />
                    }


                </div>
                <div className="md:px-4 py-3 flex flex-row justify-end">
                    <button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                        <FontAwesomeIcon icon={faCancel} /> Cancelar
                    </button>
                    <form onSubmit={HandleVeryfyFolio}>
                        <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                            <FontAwesomeIcon icon={faPlus} /> Guardar
                        </button>
                    </form>

                </div>
            </div>
            {modal && <UrsModalAddProduct refresh={refetch} requestrefresh={Requests.refetch} requests={Requests?.data} folioId={id} setModal={setModal} modal={modal} />}
        </>
    )
}
