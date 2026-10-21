import { faArrowUp, faFileExcel } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const ReinspectionCard = () => {
    return (
        <div className="bg-white border border-gray-200 shadow p-2 rounded-lg">
            <div className="flex flex-row items-end py-2">
                <div className="flex-1 flex flex-row items-center gap-2">
                    <div className="py-2 bg-orange-100 rounded-lg">
                        <FontAwesomeIcon icon={faFileExcel}
                            className="text-orange-500 text-5xl" />
                    </div>
                    <div>
                        <div className="text-3xl font-black">
                            125
                        </div>
                        <div>
                            Total de defectos
                        </div>
                    </div>
                </div>
                <div className="text-orange-500 font-medium">
                    <FontAwesomeIcon icon={faArrowUp}
                        className="pr-1" />
                    12%
                </div>

            </div>
            <div className="text-right text-sm text-gray-400">
                vs periodo anterior
            </div>
        </div>
    )
}
