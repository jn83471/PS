import Highcharts from 'highcharts';
import {HighchartsReact} from 'highcharts-react-official';
import { useState } from 'react';

type GraphMonitor={
    options:any,
    optionspie:any,
    title: string,
    DetailEvent: any,
}
export const GraphMonitor = ({options,optionspie,title,DetailEvent}: GraphMonitorProp) => {
    const [type,setType]= useState("stack")

    return (
        <div className="p-4 my-2 border border-gray-200 rounded-2xl overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row">
                <div className="flex-1">
                    <h2 className="font-bold text-lg sm:text-2xl">
                        {title}
                    </h2>
                </div>
                <div className=" border-gray-200 min-w-[20px] flex flex-row cursor-alias justify-end">
                    <button onClick={()=>setType("stack")} className={`${type=="stack"?"bg-purple-700 text-white":""}  p-2 rounded-l-2xl border border-gray-200 text-[12px] sm:text-sm`}>
                        Barras
                    </button>
                    <button onClick={()=>setType("pie")} className={`${type=="pie"?"bg-purple-700 text-white":""} text-black p-2 border-t border-b border-gray-200 text-[12px] sm:text-sm`}>
                        Pastel
                    </button>
                    <button onClick={()=>DetailEvent()} className="text-black p-2 border border-gray-200 rounded-r-2xl text-[12px] sm:text-sm">
                        Detalles
                    </button>
                </div>
            </div>
            <div className="flex-1 ">
                <div className="">
                    { type=="stack"?
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                    />
                    :
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={optionspie}
                    />}
                </div>
            </div>
        </div>
    )
}
