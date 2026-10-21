import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatFolio } from "../../../../Utils/Urs"
import { faArrowDown, faBoxOpen, faBus, faBusinessTime, faCalendarDay, faCalendarDays, faCancel, faCheck, faCircle, faClock, faClose, faFileExcel, faPlus, faUser } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { formatDateUTC, formDateHours } from "../../../../Utils/Date"
import { useState } from "react"
import dayjs from "dayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
type UrsVerificateFolioMobileProp = {
    id, TimeZone, data, Requests, handleCancelRequest, handleChangeDatePropocedProduct,HandleSecondVeryfyFolio
}
export const UrsVerificateFolioMobile = ({ id, TimeZone, data, Requests, handleCancelRequest, handleChangeDatePropocedProduct,HandleSecondVeryfyFolio }: UrsVerificateFolioMobileProp) => {
    const [showId, setShowId] = useState(-1)
    return (
        <>
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
                    <Link to={`/urs/verifications`} className="bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center">
                        <FontAwesomeIcon icon={faClose} />
                    </Link>
                </div>

            </div>
            <header className="flex flex-row items-center gap-2">
                <div className="flex-1">
                    <div className="pt-4 py-2 font-bold text-2xl">
                        #{formatFolio(id)}
                    </div>
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
                                <div className="p-2">
                                    <div className="text-sm text-gray-400">
                                        Estado
                                    </div>
                                    <div className="font-bold">
                                        {element.Process == 99 ?
                                            <div className="flex items-center">
                                                <div className="flex items-center text-red-900 bg-red-100 h-7 mt-2 rounded-lg text-sm border border-red-100 px-2">
                                                    <FontAwesomeIcon icon={faCancel} className="text-red-400 font-bold text-sm pr-1" />
                                                    Cancelado
                                                </div>
                                            </div>
                                            :
                                            <div className="flex items-center">
                                                <div className="flex items-center text-green-900 bg-green-100 h-7 mt-2 rounded-lg text-sm border border-green-100 px-2">
                                                    <FontAwesomeIcon icon={faCheck} className="text-green-400 font-bold text-sm pr-1" />
                                                    Activo
                                                </div>
                                            </div>}
                                    </div>
                                    {/* */}
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
                            {element.id == showId &&
                                <div>
                                    <div>
                                        <div className="flex flex-row items-center">
                                            <div className="py-2">
                                                <FontAwesomeIcon icon={faCalendarDays} />
                                            </div>
                                            <div>
                                                Fecha propuesta
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <DatePicker
                                                label="Fecha propuesta"
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                yearsOrder="desc"
                                                value={dayjs((element.ProposedDate ?? data.ProposedDate).substring(0, 10))}
                                                onChange={async (newValue) => {
                                                    handleChangeDatePropocedProduct(element.id, newValue.format("YYYY-MM-DD"))
                                                    element.ProposedDate = newValue.format("YYYY-MM-DD")
                                                }}
                                                sx={{
                                                    width: "100%",
                                                    '& .MuiInputBase-input': {

                                                        color: '#fff',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#ccc',
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: '#fff',
                                                    },
                                                    '& .MuiInputLabel-root.Mui-focused': {
                                                        color: '#fff',
                                                    },

                                                    '& .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#888',
                                                    },
                                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#fff',
                                                    },
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                                    {
                                                        borderColor: '#fff',
                                                    },
                                                    '& input::placeholder': {
                                                        color: '#ccc',
                                                        opacity: 1,
                                                    },
                                                }}

                                            />
                                        </div>
                                    </div>
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
                                    <div className="text-right">
                                        <button onClick={() => handleCancelRequest(element.id)} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                                            <FontAwesomeIcon icon={faCancel} />
                                            Cancelar
                                        </button>
                                    </div>
                                    {/*<div className="text-right">
                                        <button onClick={handleCancelRequest(element.id)} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                                            <FontAwesomeIcon icon={faCancel} />
                                            Cancelar
                                        </button>
                                    </div>*/}
                                </div>}

                        </div>
                    ))
                }
            </section>
            <div className="md:px-4 py-3 flex flex-row justify-end">
                {/*<button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                                    <FontAwesomeIcon icon={faCancel} /> Cancelar
                                </button>*/}
                <form onSubmit={HandleSecondVeryfyFolio}>
                    <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                        <FontAwesomeIcon icon={faPlus} /> Guardar
                    </button>
                </form>

            </div>
        </>
    )
}
/*handleCancelRequest*/