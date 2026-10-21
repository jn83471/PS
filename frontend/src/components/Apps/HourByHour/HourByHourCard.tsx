import { faArchive, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type HourByHourCardProp={
    value:number,
    icon: IconDefinition,
    title,
    border: string,
    backGround: string,
    textColor: string,
    defects: boolean
}

export const HourByHourCard = ({value,icon,title,border,backGround,textColor,defects=false}:HourByHourCardProp) => {
    return (
        <div className={`${border} ${backGround} flex flex-row gap-2 border rounded-2xl p-2 items-center `}>
            <div>
                <FontAwesomeIcon icon={icon}
                    className={`${textColor} text-5xl `} />
            </div>
            <div>
                <div className={`${textColor} text-lg`}>
                    {title}
                </div>
                <div className={`${(((value??0)<0 && !defects) || (defects && (value??0)>0))? "text-red-500" : ""} font-bold text-2xl`}>
                    {value??0}
                </div>
            </div>
        </div>
    )
}
