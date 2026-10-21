import { faBarChart, faBarcode, faBowlFood, faBoxOpen, faCalendarDays, faCheckCircle, faCheckSquare, faClock, faCopy, faCube, faInfoCircle, faLocation, faLocationPin, faQrcode, faRadio, faSquare, faSquareShareNodes, faTable, faTimeline, faTimes, faUser, faVolume } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PieChartTest } from "../../../components/Gnr/PieChartTest"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Input from "@mui/material/Input"
import OutlinedInput from "@mui/material/OutlinedInput"

export const ReinspectionHome = () => {
    return (
        <main className="min-h-[98vh] flex flex-col">
            <header className="flex flex-row justify-between items-center bg-white px-2 py-2 rounded-xl
      border border-gray-200 shadow gap-2 my-2">

                <div className="flex-1 flex items-center gap-2">
                    <div>
                        <FontAwesomeIcon icon={faQrcode}
                            className="text-5xl text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold uppercase">
                            Reinspección
                        </h1>
                        <small className="text-gray-400">
                            Registro y seguimiento de materiales
                        </small>
                    </div>
                </div>

                <div>
                    <div className="flex-1 items-center gap-2 border-l border-l-gray-200 hidden sm:flex">
                        <div>
                            <FontAwesomeIcon icon={faCalendarDays}
                                className="text-blue-600 text-4xl" />
                        </div>
                        <div>
                            <h1 className=" uppercase">
                                07 OCT 2026
                            </h1>
                            <small className="text-sm text-gray-400">
                                Miercoles
                            </small>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex-1 items-center gap-2 pl-3 border-l border-l-gray-200 hidden md:flex">
                        <div>
                            <FontAwesomeIcon icon={faClock}
                                className="text-blue-600 text-4xl" />
                        </div>
                        <div className="">
                            <h1 className="text-lg uppercase">
                                15:42
                            </h1>
                        </div>
                    </div>
                </div>

            </header>
            <section className="flex flex-col md:flex-row gap-2 flex-1">
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col xl:flex-row  rounded-2xl border border-gray-200 p-2 bg-white.">
                        <div className="flex-1 xl:border-r border-r-gray-200 p-2">
                            <div className="flex flex-row items-center gap-2 top-2">
                                <div className="bg-blue-900 rounded-full p-1 flex items-center justify-center w-9 h-9">
                                    <FontAwesomeIcon icon={faRadio}
                                        className="text-2xl text-white" />
                                </div>
                                <div className="text-xl border-b border-b-blue-200 w-full">
                                    Captura
                                </div>

                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 py-4 px-4">
                                <div className="flex flex-row items-end">
                                    <div>
                                        <FontAwesomeIcon icon={faLocation}
                                            className="text-5xl text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label className="text-2xl">
                                                Planta
                                            </label>
                                        </div>



                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={0}
                                            label="Age"
                                            onChange={async (e) => {
                                                //await setShift(e.target.value)
                                            }}
                                            sx={{
                                                width: "100%",
                                                color: "black !important",
                                                "& .MuiSelect-select": {
                                                    color: "black",
                                                    WebkitTextFillColor: 'black !important',
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#3b82f6",
                                                },
                                                "& .MuiInputBase-input": {
                                                    color: "#fff !important",
                                                    padding: 1.5
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "black !important",
                                                },
                                                "& span, legend input": {
                                                    color: "black !important",
                                                    fill: "black !important",
                                                },
                                            }}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem sx={{
                                            }} value={1}>Turno 1</MenuItem>
                                            <MenuItem value={2}>Turno 2</MenuItem>
                                            <MenuItem value={3}>Turno 3</MenuItem>
                                        </Select>

                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <div>
                                        <FontAwesomeIcon icon={faClock}
                                            className="text-5xl text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label className="text-2xl">
                                                Turno
                                            </label>
                                        </div>


                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={1}
                                            label="Age"
                                            onChange={async (e) => {
                                                //await setShift(e.target.value)
                                            }}
                                            sx={{
                                                width: "100%",
                                                color: "black !important",
                                                "& .MuiSelect-select": {
                                                    color: "black",
                                                    WebkitTextFillColor: 'black !important',
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#3b82f6",
                                                },
                                                "& .MuiInputBase-input": {
                                                    color: "#fff !important",
                                                    padding: 1.5
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "black !important",
                                                },
                                                "& span, legend input": {
                                                    color: "black !important",
                                                    fill: "black !important",
                                                },
                                            }}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem sx={{
                                            }} value={1}>Turno 1</MenuItem>
                                            <MenuItem value={2}>Turno 2</MenuItem>
                                            <MenuItem value={3}>Turno 3</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <div>
                                        <FontAwesomeIcon icon={faUser}
                                            className="text-5xl text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label className="text-2xl">
                                                Auditor
                                            </label>
                                            <OutlinedInput type="text" className="w-full" sx={{
                                                height: 45
                                            }} />
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <div>
                                        <FontAwesomeIcon icon={faLocationPin}
                                            className="text-5xl text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label className="text-2xl">
                                                Mesa
                                            </label>
                                        </div>


                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={0}
                                            label="Age"
                                            onChange={async (e) => {
                                                //await setShift(e.target.value)
                                            }}
                                            sx={{
                                                width: "100%",
                                                color: "black !important",
                                                "& .MuiSelect-select": {
                                                    color: "black",
                                                    WebkitTextFillColor: 'black !important',
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#3b82f6",
                                                },
                                                "& .MuiInputBase-input": {
                                                    color: "#fff !important",
                                                    padding: 1.5
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "black !important",
                                                },
                                                "& span, legend input": {
                                                    color: "black !important",
                                                    fill: "black !important",
                                                },
                                            }}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem sx={{
                                            }} value={1}>Turno 1</MenuItem>
                                            <MenuItem value={2}>Turno 2</MenuItem>
                                            <MenuItem value={3}>Turno 3</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <div>
                                        <FontAwesomeIcon icon={faBoxOpen}
                                            className="text-5xl text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label className="text-2xl">
                                                Caja
                                            </label>
                                        </div>


                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={0}
                                            label="Age"
                                            onChange={async (e) => {
                                                //await setShift(e.target.value)
                                            }}
                                            sx={{
                                                width: "100%",
                                                color: "black !important",
                                                "& .MuiSelect-select": {
                                                    color: "black",
                                                    WebkitTextFillColor: 'black !important',
                                                },
                                                "& .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#3b82f6",
                                                },
                                                "& .MuiInputBase-input": {
                                                    color: "#fff !important",
                                                    padding: 1.5
                                                },
                                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                    borderColor: "#60a5fa",
                                                },
                                                "& .MuiSvgIcon-root": {
                                                    color: "black !important",
                                                },
                                                "& span, legend input": {
                                                    color: "black !important",
                                                    fill: "black !important",
                                                },
                                            }}
                                        >
                                            <MenuItem value={''}>Todos</MenuItem>
                                            <MenuItem sx={{
                                            }} value={1}>Turno 1</MenuItem>
                                            <MenuItem value={2}>Turno 2</MenuItem>
                                            <MenuItem value={3}>Turno 3</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-row items-end">
                                    <div>
                                        <FontAwesomeIcon icon={faLocation}
                                            className="text-5xl text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div>
                                            <label className="text-2xl">
                                                No. Cajas
                                            </label>
                                        </div>


                                        <OutlinedInput type="text" className="w-full" sx={{
                                            height: 45
                                        }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-[300px] max-w-full p-2 border-t border-t-gray-200 xl:border-0">
                            <div className="flex flex-row items-center gap-2 sticky top-2">
                                <div className="bg-blue-900 rounded-full p-1 flex items-center justify-center w-9 h-9">
                                    <FontAwesomeIcon icon={faCube}
                                        className="text-2xl text-white" />
                                </div>
                                <div className="text-xl ">
                                    Información
                                </div>

                            </div>
                            <div className="w-full">
                                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200 w-full">
                                    <div className="text-gray-700">
                                        No. Parte
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex-1">
                                            82162-0RN70
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faCopy}
                                                className="text-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-4 border border-gray-200 rounded-2xl my-2 xl:m-2 flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2 top-2">
                            <div className="bg-blue-900 rounded-full p-1 flex items-center justify-center w-9 h-9">
                                <FontAwesomeIcon icon={faBarcode}
                                    className="text-2xl text-white" />
                            </div>
                            <div className="text-xl border-b border-b-blue-200 w-full">
                                Escaneo de arnés
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-full text-center">
                                <div className="text-4xl font-bold">
                                    Caja
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute top-[50%] left-2 translate-y-[-50%] border-r border-r-blue-200">
                                            <FontAwesomeIcon icon={faBarcode}
                                                className="text-3xl" />
                                        </div>
                                        <OutlinedInput type="text" className="w-full" sx={{
                                            paddingLeft: 5
                                        }} />
                                    </div>

                                    <button className="bg-blue-600 p-2 rounded-xl">
                                        <FontAwesomeIcon icon={faQrcode}
                                            className="text-4xl text-white" />
                                    </button>

                                </div>


                            </div>
                        </div>
                        <div>
                            <div className="bg-blue-100 border border-blue-200 flex flex-row items-center gap-2 p-2 rounded-lg">
                                <div >
                                    <FontAwesomeIcon icon={faInfoCircle}
                                        className="text-blue-500" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-500">
                                        Escane cada arnés para incrementar el conteo
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Presione Enter o utilice el lector de código de barras
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-100 p-2 rounded-lg">
                                <div className="text-sm font-bold">
                                    Ultimo escaneo
                                </div>
                                <div className="flex flex-row">
                                    <div className="flex flex-row items-center gap-2 py-2 flex-1">
                                        <div>
                                            <FontAwesomeIcon icon={faCheckSquare}
                                                className="text-green-500 text-5xl" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold">
                                                ARN-4421X
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                15:42:18
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="p-1 bg-green-50 border border-green-200 rounded-2xl text-green-500 font-bold">
                                            Correcto
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-[450px] max-w-[100%] flex flex-col gap-2 min-h-screen lg:min-h-auto overflow-x-auto">
                    <div className="bg-blue-950 rounded-lg text-white shadow-2xl shadow-gray-300 border border-gray-400 overflow-hidden">
                        <div className="p-2">
                            <div className="flex flex-row items-center gap-2">
                                <div className="bg-blue-200 rounded-full p-1">
                                    <FontAwesomeIcon icon={faBoxOpen}
                                        className="text-2xl" />
                                </div>
                                <div className="text-xl">
                                    Reinspeccinados
                                </div>
                            </div>
                            <div>
                                <PieChartTest />
                            </div>
                            <div className="text-center text-4xl font-bold">
                                12/25
                            </div>
                        </div>

                        <div className="bg-white text-black rounded-t-2xl py-4 px-2 grid grid-cols-2">
                            <div className="text-center border-r border-r-gray-200">
                                <FontAwesomeIcon icon={faCheckCircle}
                                    className="text-2xl text-green-500" />
                                <div className="text-xl font-medium text-green-700">
                                    Correctos
                                </div>
                                <div className="text-4xl font-bold text-green-900">
                                    12
                                </div>
                            </div>
                            <div className="text-center">
                                <FontAwesomeIcon icon={faClock}
                                    className="text-2xl text-blue-500" />
                                <div className="text-xl font-medium text-blue-700">
                                    Pendientes
                                </div>
                                <div className="text-4xl font-bold text-blue-900">
                                    13
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-550px)] flex flex-col">
                        <div className="flex flex-row items-center gap-2 sticky top-2 bg-white">
                            <div className="bg-blue-900 rounded-full p-1 flex items-center justify-center w-9 h-9">
                                <FontAwesomeIcon icon={faClock}
                                    className="text-2xl text-white" />
                            </div>
                            <div className="text-xl ">
                                Ultimos escaneos
                            </div>
                        </div>
                        <div className="max-w-[100vw] overflow-x-auto flex-1">
                            <table className="min-w-full my-5">
                                <thead className="bg-gray-100 sticky top-3">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">#</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Caja</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Arnes</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Resultado</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap">Hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td className="py-4 px-2">1</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">
                                            <div className="relative text-2xl text-green-500 flex flex-row items-center bg-green-50 border border-green-200 rounded-2xl text-center">
                                                <FontAwesomeIcon className="absolute left-0 top-0" icon={faCheckCircle} />
                                                <div className="text-sm text-center flex-1 py-[2px] pl-4">Correcto</div>
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            15:21
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="py-4 px-2">1</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">
                                            <div className="relative text-2xl text-green-500 flex flex-row items-center bg-green-50 border border-green-200 rounded-2xl text-center">
                                                <FontAwesomeIcon className="absolute left-0 top-0" icon={faCheckCircle} />
                                                <div className="text-sm text-center flex-1 py-[2px] pl-4">Correcto</div>
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            15:21
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="py-4 px-2">1</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">
                                            <div className="relative text-2xl text-green-500 flex flex-row items-center bg-green-50 border border-green-200 rounded-2xl text-center">
                                                <FontAwesomeIcon className="absolute left-0 top-0" icon={faCheckCircle} />
                                                <div className="text-sm text-center flex-1 py-[2px] pl-4">Correcto</div>
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            15:21
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="py-4 px-2">1</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">
                                            <div className="relative text-2xl text-green-500 flex flex-row items-center bg-green-50 border border-green-200 rounded-2xl text-center">
                                                <FontAwesomeIcon className="absolute left-0 top-0" icon={faCheckCircle} />
                                                <div className="text-sm text-center flex-1 py-[2px] pl-4">Correcto</div>
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            15:21
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="py-4 px-2">1</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">
                                            <div className="relative text-2xl text-green-500 flex flex-row items-center bg-green-50 border border-green-200 rounded-2xl text-center">
                                                <FontAwesomeIcon className="absolute left-0 top-0" icon={faCheckCircle} />
                                                <div className="text-sm text-center flex-1 py-[2px] pl-4">Correcto</div>
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            15:21
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="py-4 px-2">1</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">
                                            <div className="relative text-2xl text-green-500 flex flex-row items-center bg-green-50 border border-green-200 rounded-2xl text-center">
                                                <FontAwesomeIcon className="absolute left-0 top-0" icon={faCheckCircle} />
                                                <div className="text-sm text-center flex-1 py-[2px] pl-4">Correcto</div>
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            15:21
                                        </td>
                                    </tr>
                                    <tr className="">
                                        <td className="py-4 px-2">1</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">ARN4421X</td>
                                        <td className="py-4 px-2">
                                            <div className="relative text-2xl text-green-500 flex flex-row items-center bg-green-50 border border-green-200 rounded-2xl text-center">
                                                <FontAwesomeIcon className="absolute left-0 top-0" icon={faCheckCircle} />
                                                <div className="text-sm text-center flex-1 py-[2px] pl-4">Correcto</div>
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            15:21
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </section>
        </main>
    )
}
