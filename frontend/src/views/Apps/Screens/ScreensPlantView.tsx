import { useQuery } from "@tanstack/react-query"
import { GetPlants } from "../../../api/PlantsApi"
import { Link } from "react-router-dom"

export const ScreensPlantView = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['Plant'],
        queryFn: GetPlants,
        retry: false
    })
    const a = "planta 4"
    a.replace("planta", "")

    return (
        <>
            <div className="bg-black min-h-screen w-screen text-white flex items-center justify-center">
                <div className="flex-1">
                    <div className="text-center">
                        <h1 className="text-3xl uppercase font-bold sm:text-5xl md:text-7xl">
                            Seleccione Planta
                        </h1>
                        <hr className="max-w-full text-blue-600 w-[200px] block mx-auto border-none bg-blue-600 h-[2px] my-3" />
                        <h2 className="text-xs uppercase font-bold text-gray-200 sm:text-2xl">
                            Programa de Producción
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2 px-6 py-5">
                        {
                            data?.map(element => (
                                <Link to={`/Screens/${element.id}`} className="border-blue-600/75 p-2 border rounded-2xl text-center shadow-xl shadow-blue-600/25 
                                            sm:min-h-[320px] flex items-center flex-col justify-center
                                            hover:scale-110 hover:border-blue-500 duration-100 ease-in">
                                    <p className="uppercase text-4xl text-blue-600 opacity-80 shadow shadow-blue-600/15">
                                        
                                    </p>
                                    <div className="py-3">
                                        <p className="text-9xl pb-5">
                                            {element.name.toString().toLowerCase().replace("planta", "")}
                                        </p>
                                        <hr className="max-w-full text-blue-600 w-[100px] block mx-auto border-none bg-blue-600/70 h-[2px] my-3 shadow-2xs  shadow-blue-600/50" />
                                    </div>

                                </Link>
                            ))
                        }
                    </div>
                </div>

            </div>


        </>
    )
}
