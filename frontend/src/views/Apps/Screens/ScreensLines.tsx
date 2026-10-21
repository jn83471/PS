import { useQuery } from "@tanstack/react-query"
import { GetPlants } from "../../../api/PlantsApi"
import { Link, useParams } from "react-router-dom"

export const ScreensLines = () => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['Plant'],
        queryFn: GetPlants,
        retry: false
    })
    const {plantId}=useParams()
    const a = "planta 4"
    a.replace("planta", "")

    return (
        <>
            <div className="bg-black min-h-screen min-w-screen text-white">
                <div className="flex-1">
                    <div className="text-center">
                        <h1 className="text-3xl uppercase font-bold sm:text-5xl md:text-7xl">
                            Seleccione Planta
                        </h1>
                        <hr className="max-w-full text-blue-600 w-[200px] block mx-auto border-none bg-blue-600 h-[2px] my-3" />

                        <div className="flex items-center justify-center">
                            <div className="h-0.5 w-16 bg-blue-400 hidden sm:inline"></div>
                            <h2 className="text-xs uppercase font-bold text-gray-200 sm:text-3xl relative px-2 ">
                                Programa de Producción
                            </h2>
                            <div className="h-0.5 w-16 bg-blue-400 hidden sm:inline"></div>
                        </div>
                    </div>

                </div>
                <div className="">
                    <div className="flex items-center justify-center px-8 py-2">
                        <h2 className="text-xs font-bold text-gray-200 sm:text-xl relative px-2 ">
                            Plantas
                        </h2>
                        <div className="h-0.5 flex-1 bg-gray-600"></div>
                    </div>
                    <div className="grid grid-cols-3 px-8 gap-2">
                        <Link to={`/Screens/code/0957`} className="min-h-[150px] border rounded-2xl border-t-8 border-t-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-t-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            <div className="text-xl text-gray-300 lg:text-2xl">
                                Código
                            </div>
                            <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl py-2">
                                0957
                            </div>
                        </Link>
                        <Link to={`/Screens/code/0958`}  className="min-h-[150px] border rounded-2xl border-t-8 border-t-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-t-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            <div className="text-xl text-gray-300 lg:text-2xl">
                                Código
                            </div>
                            <div className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl py-2">
                                0958
                            </div>
                        </Link>
                    </div>

                </div>
                <div className="px-8 py-2">
                    <div className="flex items-center justify-center">
                        <h2 className="text-xs font-bold text-gray-200 sm:text-xl relative px-2 ">
                            Programa de Producción
                        </h2>
                        <div className="h-0.5 flex-1 bg-gray-600"></div>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 py-2 gap-2">
                        <Link to={`/Screens/Line/C005`} className="min-h-[100px] border rounded-2xl border-l-4 border-l-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-l-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            
                            <div className="text-xl uppercase sm:text-2xl md:text-3xl lg:text-4xl">
                                C005
                            </div>
                            <div className="text-sm text-white bg-purple-500 rounded-2xl py-1 px-2 my-2">
                                Linea
                            </div>
                        </Link>
                        <Link to={`/Screens/Line/C005`} className="min-h-[100px] border rounded-2xl border-l-4 border-l-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-l-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            
                            <div className="text-xl uppercase sm:text-2xl md:text-3xl lg:text-4xl">
                                C005
                            </div>
                            <div className="text-sm text-white bg-purple-500 rounded-2xl py-1 px-2 my-2">
                                Linea
                            </div>
                        </Link>
                        <Link to={`/Screens/Line/C005`} className="min-h-[100px] border rounded-2xl border-l-4 border-l-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-l-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            
                            <div className="text-xl uppercase sm:text-2xl md:text-3xl lg:text-4xl">
                                C005
                            </div>
                            <div className="text-sm text-white bg-purple-500 rounded-2xl py-1 px-2 my-2">
                                Linea
                            </div>
                        </Link>
                        <Link to={`/Screens/Line/C005`} className="min-h-[100px] border rounded-2xl border-l-4 border-l-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-l-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            
                            <div className="text-xl uppercase sm:text-2xl md:text-3xl lg:text-4xl">
                                C005
                            </div>
                            <div className="text-sm text-white bg-purple-500 rounded-2xl py-1 px-2 my-2">
                                Linea
                            </div>
                        </Link>
                        <Link to={`/Screens/Line/C005`} className="min-h-[100px] border rounded-2xl border-l-4 border-l-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-l-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            
                            <div className="text-xl uppercase sm:text-2xl md:text-3xl lg:text-4xl">
                                C005
                            </div>
                            <div className="text-sm text-white bg-purple-500 rounded-2xl py-1 px-2 my-2">
                                Linea
                            </div>
                        </Link>
                        <Link to={`/Screens/Line/C005`} className="min-h-[100px] border rounded-2xl border-l-4 border-l-green-500 flex justify-center flex-col items-center bg-white/10 
                            hover:border-l-blue-600 hover:scale-[105%] hover:bg-white/5 transition duration-[100ms] ease-in-out">
                            
                            <div className="text-xl uppercase sm:text-2xl md:text-3xl lg:text-4xl">
                                C005
                            </div>
                            <div className="text-sm text-white bg-purple-500 rounded-2xl py-1 px-2 my-2">
                                Linea
                            </div>
                        </Link>
                    </div>
                </div>

            </div>


        </>
    )
}
