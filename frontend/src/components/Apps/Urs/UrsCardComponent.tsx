import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isMobile, isTabletOnly } from "../../../Utils/Media"

type UrsCardComponenttype = {
    bg: string,
    borderl: string,
    circlebg: string,
    qty: number,
    display: string
}

export const UrsCardComponent = ({ bg, border, borderl, circlebg, textColor, qty, display }: UrsCardComponenttype) => {
    return (
        <>
            {(isMobile && !isTabletOnly) ?
                <div className={`" bg-white border border-gray-200 rounded-2xl p-3 flex flex-row gap-4 items-center`}>
                    <div className={` rounded-full ${circlebg} p-2 flex justify-center items-center w-7 h-7 shadow-2xl shadow-purple-200`}>
                        <FontAwesomeIcon className={` text-xl ${bg} shadow-2xl border-purple-700 shadow-purple-300`} icon={faCircle} />
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-xl">
                            {qty}
                        </div>
                        <div className="text-sm text-gray-400">
                            {display}
                        </div>
                    </div>
                </div>
                : <>
                    <div className={`" border-l-3 ${borderl} bg-white border border-gray-200 rounded-2xl p-3 flex flex-row gap-4 items-center`}>
                        <div className={` rounded-full ${circlebg} p-2 flex justify-center items-center w-10 h-10 shadow-2xl shadow-purple-200`}>
                            <FontAwesomeIcon className={` text-2xl ${bg} shadow-2xl border-purple-700 shadow-purple-300`} icon={faCircle} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-3xl">
                                {qty}
                            </div>
                            <div className="text-sm text-gray-400">
                                {display}
                            </div>
                        </div>
                    </div>

                </>}
        </>
    )
}
