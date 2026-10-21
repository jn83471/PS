import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isMobile, isTabletOnly } from "../../../Utils/Media"

type UrsEstatusComponentProp = {
    Process: number,
    Verify: number
}
export const UrsEstatusComponent = ({ Process, Verify }: UrsEstatusComponentProp) => {
    const agent=isMobile && !isTabletOnly
    return (
        <>
            {Process == 99 ?
                <div className="flex items-center text-red-500 uppercase bg-red-50 h-7 mt-2 rounded-lg text-[10px] border border-red-200 px-2">
                    <FontAwesomeIcon icon={faCircle} className="text-red-400 text-lg pr-1" />
                    Cancelado
                </div>
                :
                Verify == 0 ?
                    <div className="flex items-center text-gray-500 uppercase bg-gray-50 h-7 mt-2 rounded-lg text-[10px] border border-gray-200 px-2">
                        <FontAwesomeIcon icon={faCircle} className="text-gray-400 text-lg pr-1" />
                        EN REVISION
                    </div>
                    :
                    Verify == 1 ?
                        <div className="flex items-center text-blue-500 uppercase bg-blue-50 h-7 mt-2 rounded-lg text-[10px] border border-blue-200 px-2">
                            <FontAwesomeIcon icon={faCircle} className="text-blue-400 text-lg pr-1" />
                            {agent ?"CP LOCAL":"EN REVISION POR CP LOCAL"}
                        </div>
                        :
                        Verify == 2 ?
                            <div className="flex items-center text-purple-500 uppercase bg-purple-50 h-7 mt-2 rounded-lg text-[10px] border border-purple-200 px-2">
                                <FontAwesomeIcon icon={faCircle} className="text-purple-400 text-lg pr-1" />
                                {agent ?"CP SMTS":"EN REVISION POR CP SMTS"}
                            </div>
                            :
                            Verify == 3 && Process == 0 ?
                                <div className="flex items-center text-orange-500 uppercase bg-orange-50 h-7 mt-2 rounded-lg text-[10px] border border-orange-200 px-2">
                                    <FontAwesomeIcon icon={faCircle} className="text-orange-400 text-lg pr-1" />
                                    EN PISO
                                </div>
                                :
                                Verify == 3 ?
                                    <div className="flex items-center text-orange-500 uppercase bg-orange-50 h-7 mt-2 rounded-lg text-[10px] border border-orange-200 px-2">
                                        <FontAwesomeIcon icon={faCircle} className="text-orange-400 text-lg pr-1" />
                                        EN ESCANEO
                                    </div>
                                    :
                                    Verify == 4 ?
                                        <div className="flex items-center text-orange-500 uppercase bg-orange-50 h-7 mt-2 rounded-lg text-[10px] border border-orange-200 px-2">
                                            <FontAwesomeIcon icon={faCircle} className="text-orange-400 text-lg pr-1" />
                                            Embarcado
                                        </div>
                                        :
                                        Verify == 5 ?
                                            <div className="flex items-center text-green-500 uppercase bg-green-50 h-7 mt-2 rounded-lg text-[10px] border border-green-200 px-2">
                                                <FontAwesomeIcon icon={faCircle} className="text-green-400 text-lg pr-1" />
                                                Recibido
                                            </div>
                                            :
                                            <div>

                                            </div>}
        </>
    )
}
