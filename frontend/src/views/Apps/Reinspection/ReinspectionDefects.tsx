import { faArrowUp, faBarChart, faDownload, faFileExcel, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { ReinspectionCard } from "../../../components/Apps/Reinspection/ReinspectionCard"
import { CustomSelect } from "../HourXHour/CustomSelect"
import dayjs from "dayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export const ReinspectionDefects = () => {
    return (
        <>
            <div className="flex flex-row py-4">
                <div className="flex-1">
                    <div className="flex flex-row items-center gap-2">
                        <div>
                            <FontAwesomeIcon icon={faBarChart}
                                className="text-purple-500 text-6xl" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">
                                Reporte de defectos
                            </div>
                            <div className="text-gray-600">
                                Consulta, análisis y exportación de incidencias de calidad
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <FormControl >
                        <InputLabel className='text-black' id="demo-simple-select-label"
                            sx={{
                                color: "black"
                            }}
                        >Planta</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={1}
                            label="Planta"
                            onChange={async (e) => {
                                //await setShift(e.target.value)

                            }}
                            sx={{
                                width: "130px",
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
                    </FormControl>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                <ReinspectionCard />
                <ReinspectionCard />
                <ReinspectionCard />
                <ReinspectionCard />
            </div>
            <div className="my-2 border border-gray-200 shadow p-2 rounded-lg flex flex-row items-center">
                <div className="flex-1 grid grid-cols-5 gap-2 py-2">
                    <div>
                        <div className="py-2">
                            Fecha inicio:
                        </div>
                        <DatePicker
                        label=""
                        openTo="year"
                        views={['year', 'month', 'day']}
                        yearsOrder="desc"
                        value={dayjs()}
                        onChange={async (newValue) => {
                            //await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                            //setFecha(newValue);
                            //setValue("fecha", fecha?.format("YYYY-MM-DD"))
                        }}
                        sx={{
                            
                            '& .MuiInputBase-input': {
                                padding:0,
                                color: '#fff',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ccc',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#fff',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#fff',
                            },

                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#888',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#fff',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                            {
                                borderColor: '#fff',
                            },
                            '& input::placeholder': {
                                color: '#ccc',
                                opacity: 1,
                            },
                            '& .MuiPickersSectionList-root.MuiPickersInputBase-sectionsContainer.css-1fb7els-MuiPickersSectionList-root-MuiPickersInputBase-sectionsContainer-MuiPickersOutlinedInput-sectionsContainer':{
                                paddingTop:.8,
                                paddingBottom:.8
                            }
                        }}

                    />
                    </div>
                    <div>
                        <div className="py-2">
                            Fecha fin:
                        </div>
                        <DatePicker
                        label=""
                        openTo="year"
                        views={['year', 'month', 'day']}
                        yearsOrder="desc"
                        value={dayjs()}
                        onChange={async (newValue) => {
                            //await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                            //setFecha(newValue);
                            //setValue("fecha", fecha?.format("YYYY-MM-DD"))
                        }}
                        sx={{
                            
                            '& .MuiInputBase-input': {
                                padding:0,
                                color: '#fff',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#ccc',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#fff',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#fff',
                            },

                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#888',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#fff',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                            {
                                borderColor: '#fff',
                            },
                            '& input::placeholder': {
                                color: '#ccc',
                                opacity: 1,
                            },
                            '& .MuiPickersSectionList-root.MuiPickersInputBase-sectionsContainer.css-1fb7els-MuiPickersSectionList-root-MuiPickersInputBase-sectionsContainer-MuiPickersOutlinedInput-sectionsContainer':{
                                paddingTop:.8,
                                paddingBottom:.8
                            }
                        }}

                    />
                    </div>
                    <div className="">
                        <div className="py-2">
                            Auditor:
                        </div>

                        <CustomSelect
                            label=""
                            value={1}
                            onChange={(item) => {
                               
                            }}
                            options={[
                                { value: 1, label: "Turno 1" },
                                { value: 2, label: "Turno 2" },
                                { value: 3, label: "Turno 3" },
                                { value: 0, label: "Todos" },
                            ]}
                        />
                    </div>
                    <div className="">
                        <div className="py-2">
                            Defecto:
                        </div>

                        <CustomSelect
                            label=""
                            value={1}
                            onChange={(item) => {
                               
                            }}
                            options={[
                                { value: 1, label: "Turno 1" },
                                { value: 2, label: "Turno 2" },
                                { value: 3, label: "Turno 3" },
                                { value: 0, label: "Todos" },
                            ]}
                        />
                    </div>
                    <div className="">
                        <div className="py-2">
                            Turno:
                        </div>

                        <CustomSelect
                            label=""
                            value={1}
                            onChange={(item) => {
                               
                            }}
                            options={[
                                { value: 1, label: "Turno 1" },
                                { value: 2, label: "Turno 2" },
                                { value: 3, label: "Turno 3" },
                                { value: 0, label: "Todos" },
                            ]}
                        />
                    </div>
                </div>
                <div className="px-2">
                    <button className="bg-green-700 text-white py-2 px-4 rounded-lg">
                        <FontAwesomeIcon icon={faSearch}
                            className="pr-2" />
                        Buscar
                    </button>
                    <button className="ml-2 bg-gray-200 text-black py-2 px-4 rounded-lg">
                        <FontAwesomeIcon icon={faDownload}
                            className="pr-2" />
                        Exportar
                    </button>
                </div>
            </div>
        </>
    )
}
