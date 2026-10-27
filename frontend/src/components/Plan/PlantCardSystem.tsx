import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import CalendarCard from "./CalendarCard";

type PlantCardSystemProp = {
    fecha: Dayjs
}

export const PlantCardSystem = ({ data, names, fecha, lines, setPersonName }: PlantCardSystemProp) => {
    console.log(fecha)
    const daysInMonth = dayjs()
        .month(fecha.month())
        .year(fecha.year())
        .daysInMonth();
    console.log(names.length)
    return (
        <div>
            {names.length == 0 ?
                <div className="max-h-[650px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 overflow-x-hidden">
                    {
                        lines?.map(element => (
                            <button onClick={() => setPersonName([element])} className="min-h-24 p-2 border border-gray-200 rounded-lg flex flex-col items-center justify-center text-3xl font-bold cursor-pointer relative overflow-hidden shadow max-h-24
                        hover:scale-105 duration-100 ease-in">
                                <div className="bg-white w-full">
                                    <div className="text-sm font-normal">
                                        {element}
                                    </div>
                                    <div className="text-sm">
                                        {data?.find(elm => elm.machine == element)?.Line}
                                    </div>
                                    <div>
                                        {data?.filter(elm => elm.machine == element).reduce((acum: number, item) => {
                                            const totalDias = Array.from({ length: 31 }, (_, i) =>
                                                Number(item[`d${i + 1}`] || 0)
                                            ).reduce((a, b) => a + b, 0);
                                            return acum = acum + totalDias
                                        }, 0).toLocaleString()}
                                    </div>
                                </div>
                                <div className="hover:bg-red-600 h-36 w-36 bg-red-500 rounded-full absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 opacity-75" />
                            </button>
                        ))
                    }

                </div>
                :
                <div className="max-h-[650px] overflow-y-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 overflow-x-hidden">
                    {
                        data?.filter(elm => names.includes(elm.machine)).map(element => (
                            <div className="border border-gray-200 rounded-lg p-2 relative">
                                <div className="absolute right-2 top-4">
                                    <div className="rounded-lg border border-gray-200 flex flex-row items-center">
                                        <div className="p-2 bg-blue-500 text-white rounded-lg text-sm">
                                            {element.Shortpart}:
                                        </div>
                                        <div className="px-2 font-bold">
                                            {Math.round(element.Kmh*100)/100}
                                        </div>
                                    </div>


                                </div>
                                <div className="flex flex-row items-center gap-2 p-2">
                                    <div className="flex-1">
                                        <div className="font-bold text-xl">
                                            {element.machine}
                                        </div>
                                        <div className="text-sm">
                                            {element.Line}
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="flex-1">
                                                <div className="text-sm">
                                                    <div className="font-bold">
                                                        Numero de parte
                                                    </div>
                                                    {element.PartNumber}
                                                </div>

                                                <div className="grid grid-cols-2 text-sm w-full">
                                                    <div>
                                                        <div className="font-bold">
                                                            Cliente
                                                        </div>
                                                        <div>
                                                            {element.Customer}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">
                                                            Capacidad
                                                        </div>
                                                        <div>
                                                            {element.Capacity}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 text-sm w-full">
                                                    <div>
                                                        <div className="font-bold">
                                                            Program
                                                        </div>
                                                        <div>
                                                            {element.Program}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">
                                                            Turno
                                                        </div>
                                                        <div>
                                                            {element.Shift}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex row items-center">
                                                <div className="border border-blue-200 bg-blue-50 text-blue-500 p-2 text-center gap-2 rounded-lg">
                                                    <div>
                                                        Total del mes
                                                    </div>
                                                    <div className="font-bold text-2xl">
                                                        {
                                                            Array.from(
                                                                { length: 31 },
                                                                (_, i) => Number(element[`d${i + 1}`] || 0)
                                                            ).reduce((acc, value) => acc + value, 0).toLocaleString()
                                                        }
                                                    </div>
                                                    <div className="text-[.7rem] text-blue-700">
                                                        {Array.from(
                                                            { length: 31 },
                                                            (_, i) => Number(element[`d${i + 1}`] || 0)
                                                        ).filter(value => value > 0).length.toLocaleString()} días con plan
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="my-2">
                                            <CalendarCard month={fecha.month()} year={fecha.year()} values={Array.from({ length: 31 }).map((_, index) => element[`d${index + 1}`])} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>

    )
}
