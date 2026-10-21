import { faBoxesPacking, faUpLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

type CardPorcentajeProp = {
    textColor: string,
    backgroudColor: string,
    qty: number,
    title: string,
    option: any
}
export const CardPorcentaje = ({ textColor, backgroudColor, qty, title, option }: CardPorcentajeProp) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow flex items-center gap-2">
            <div>
                <div className={`${backgroudColor} ${textColor} rounded-xl p-2 text-4xl`}>
                    <FontAwesomeIcon icon={faBoxesPacking} />
                </div>
            </div>
            <div className="flex-1">
                <div className="font-bold text-lg sm:text-xl">
                    {title ?? ''}
                </div>
                <div className={`font-bold ${textColor} text-xl sm:text-3xl`}>
                    {qty.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }) ?? 0}
                </div>
            </div>
            <div className="text-right hidden sm:block">
                <div className={`flex flex-row items-center ${textColor} justify-end`}>
                    <FontAwesomeIcon className="" icon={faUpLong} />
                    8.8%
                </div>
                <div>
                    Vs. ultima hora
                </div>
                <div>
                    <div className="h-[50px] border border-gray-200">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={option}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}
