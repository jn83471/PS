import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"
import type React from "react"
import { MauiTable } from "../../../components/Gnr/MauiTable"

type PlanViewDesktopProp = {
    fecha: Dayjs,
    setFecha: any,
    shift, setShift,
    machine, setMachine,
    machines, setMachines,
    plan, column
}
export const PlanViewDesktop = ({ fecha, setFecha, shift, setShift, machine, setMachine, machines, setMachines, plan, column }: PlanViewDesktopProp) => {

    const planFiltrado = plan.filter((row) => {
        const acumulado =
            (row.d1 || 0) +
            (row.d2 || 0) +
            (row.d3 || 0) +
            (row.d4 || 0) +
            (row.d5 || 0) +
            (row.d6 || 0) +
            (row.d7 || 0) +
            (row.d8 || 0) +
            (row.d9 || 0) +
            (row.d10 || 0) +
            (row.d11 || 0) +
            (row.d12 || 0) +
            (row.d13 || 0) +
            (row.d14 || 0) +
            (row.d15 || 0) +
            (row.d16 || 0) +
            (row.d17 || 0) +
            (row.d18 || 0) +
            (row.d19 || 0) +
            (row.d20 || 0) +
            (row.d21 || 0) +
            (row.d22 || 0) +
            (row.d23 || 0) +
            (row.d24 || 0) +
            (row.d25 || 0) +
            (row.d26 || 0) +
            (row.d27 || 0) +
            (row.d28 || 0) +
            (row.d29 || 0) +
            (row.d30 || 0) +
            (row.d31 || 0);

        return !(acumulado === 0 && Number(row.qty || 0) === 0);
    });

    return (

        <>
            <div className='border-b border-gray-600 flex text-2xl text-center sm:text-left sm:text-4xl font-bold py-3 text-black'>
                PlanView
            </div>
            <div className="flex-1 min-w-0 py-4 px-2">

                <div className='bg-white rounded-xl py-5 w-full h-[calc(100vh-180px)] flex flex-col'>
                    <section className="flex justify-between px-2 flex-col sm:flex-row">
                        <div className="flex justify-between flex-col sm:flex-row gap-2 sm:gap-0">
                            <DatePicker
                                label="Years in descending order"
                                openTo="year"
                                views={['year', 'month']}
                                yearsOrder="desc"
                                value={fecha}
                                onChange={async (newValue) => {
                                    await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                                }}
                                sx={{
                                    width: "190px",
                                    '& .MuiInputBase-input': {
                                        WebkitTextFillColor: 'black !important',
                                        color: 'black',
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'black',
                                        WebkitTextFillColor: 'black !important',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'black',
                                        WebkitTextFillColor: 'black !important',
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#fff',
                                        WebkitTextFillColor: '#fff !important',
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
                                        WebkitTextFillColor: '#fff !important',
                                        opacity: 1,
                                    },
                                }}

                            />
                            <FormControl sx={{
                                marginLeft: "10px"
                            }}>
                                <InputLabel className='text-black' id="demo-simple-select-label"
                                    sx={{
                                        color: "black"
                                    }}
                                >Turno</InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={shift}
                                    label="Age"
                                    onChange={async (e) => {
                                        await setShift(e.target.value)
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
                                    <MenuItem sx={{
                                    }} value={0}>Todos</MenuItem>
                                    <MenuItem sx={{
                                    }} value={1}>Turno 1</MenuItem>
                                    <MenuItem value={2}>Turno 2</MenuItem>

                                </Select>
                            </FormControl>

                            <FormControl sx={{
                                marginLeft: "10px"
                            }}>
                                <InputLabel className='text-black' id="demo-simple-select-label"
                                    sx={{
                                        color: "black"
                                    }}
                                >Linea</InputLabel>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={machine}
                                    label="Age"
                                    onChange={async (e) => {
                                        await setMachine(e.target.value)
                                    }}
                                    sx={{
                                        width: "130px",
                                        color: "#fff !important",
                                        "& .MuiSelect-select": {
                                            color: "black",
                                            WebkitTextFillColor: 'black !important',
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#3b82f6",
                                        },
                                        "& .MuiInputBase-input": {
                                            color: "black !important",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#60a5fa",
                                        },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "#60a5fa",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            color: "#fff !important",
                                        },
                                        "& span, legend input": {
                                            color: "#fff !important",
                                            fill: "#fff !important",
                                        },
                                    }}
                                >
                                    <MenuItem sx={{
                                    }} value={""}>Todas</MenuItem>
                                    {
                                        machines.map(e => (
                                            <MenuItem value={e}>
                                                {e}
                                            </MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </div>



                    </section>
                    <div className="flex-1 overflow-hidden">
                        <MauiTable
                            rowspaning={false}
                            size={12}
                            setId={null}
                            title=''
                            data={planFiltrado}
                            setModal={null}
                            columns={column}
                            text={"Nueva planta"}
                        />
                    </div>
                </div >

            </div >
        </>
    )
}
