//PlanView Desktop Anterior

/*

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

    const buildDailyProgress = (row: any) => {

        const qty = Number(row.qty ?? 0)

        let acumulado = 0

        const result = { ...row }
        let diaEnProcesoEncontrado = false
        for (let i = 1; i <= 31; i++) {

            const key = `d${i}`

            const valorDia = Number(row[key] ?? 0)

            acumulado += valorDia

            if (qty >= acumulado) {

                result[key] = `${valorDia}`

                result[`${key}_status`] = valorDia > 0
                    ? "complete"
                    : "pending"

            } else {

                // Ya encontramos el día en proceso anteriormente,
                // por lo tanto este es un día futuro
                if (diaEnProcesoEncontrado) {

                    result[key] = `${valorDia}`
                    result[`${key}_status`] = "pending"

                    continue
                }

                diaEnProcesoEncontrado = true

                const faltante = acumulado - qty

                let producidoDia = valorDia - faltante

                if (producidoDia < 0)
                    producidoDia = 0

                if (valorDia === 0) {
                    result[key] = "0"
                } else {
                    result[key] = `${producidoDia} / ${valorDia}`
                }

                const diaActual = dayjs().date()

                if (producidoDia > 0) {

                    result[`${key}_status`] =
                        i < diaActual
                            ? "delayed"
                            : "progress"

                } else {

                    result[`${key}_status`] = "pending"
                }
            }
        }

        return result
    }
    const result = plan.map(row => buildDailyProgress(row))

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
                            data={result}
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

*/


//segunda versión de PlanViewDesktop
/*
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { type SelectChangeEvent } from "@mui/material/Select"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import type { GridColDef } from "@mui/x-data-grid"
import type { Dayjs } from "dayjs"
import type { Dispatch, SetStateAction } from "react"

import { MauiTable } from "../../../components/Gnr/MauiTable"
import type { PlanViewRow } from "../../../Utils/PlanView/PlanViewTypes"

type PlanViewDesktopProps = {
    fecha: Dayjs | null
    setFecha: Dispatch<SetStateAction<Dayjs | null>>

    shift: number
    setShift: Dispatch<SetStateAction<number>>

    machine: string
    setMachine: Dispatch<SetStateAction<string>>

    machines: string[]
    setMachines: Dispatch<SetStateAction<string[]>>

    plan: PlanViewRow[]
    column: GridColDef[]
}

export const PlanViewDesktop = ({
    fecha,
    setFecha,
    machine,
    setMachine,
    machines,
    plan,
    column
}: PlanViewDesktopProps) => {
    const handleDateChange = (newValue: Dayjs | null) => {
        if (!newValue) {
            return
        }
        setFecha(newValue.startOf("month"))
    }

    const handleMachineChange = (
        event: SelectChangeEvent<string>
    ) => {
        setMachine(event.target.value)
    }

    return (
        <>
            <div
                className="
                    flex
                    border-b
                    border-gray-300
                    py-3
                    text-center
                    text-2xl
                    font-bold
                    text-black
                    sm:text-left
                    sm:text-4xl
                "
            >
                PlanView
            </div>

            <div className="min-w-0 flex-1 px-2 py-4">
                <div
                    className="
                        flex
                        h-[calc(100vh-180px)]
                        w-full
                        flex-col
                        rounded-xl
                        bg-white
                        py-5
                    "
                >
                    <section
                        className="
                            flex
                            flex-col
                            justify-between
                            gap-3
                            px-3
                            pb-4
                            sm:flex-row
                            sm:items-center
                        "
                    >
                        <div
                            className="
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:items-center
                            "
                        >
                            <DatePicker
                                label="Mes"
                                openTo="month"
                                views={["year", "month"]}
                                yearsOrder="desc"
                                value={fecha}
                                onChange={handleDateChange}
                                slotProps={{
                                    textField: {
                                        size: "small"
                                    }
                                }}
                                sx={{
                                    width: "190px",

                                    "& .MuiInputBase-input": {
                                        color: "#111827",
                                        WebkitTextFillColor: "#111827"
                                    },

                                    "& .MuiInputLabel-root": {
                                        color: "#4b5563"
                                    },

                                    "& .MuiInputLabel-root.Mui-focused": {
                                        color: "#2563eb"
                                    },

                                    "& .MuiSvgIcon-root": {
                                        color: "#4b5563"
                                    },

                                    "& .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#d1d5db"
                                    },

                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#9ca3af"
                                    },

                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                        {
                                            borderColor: "#2563eb"
                                        }
                                }}
                            />

                            <FormControl
                                size="small"
                                sx={{
                                    minWidth: "160px"
                                }}
                            >
                                <InputLabel
                                    id="desktop-machine-label"
                                    sx={{
                                        color: "#4b5563",

                                        "&.Mui-focused": {
                                            color: "#2563eb"
                                        }
                                    }}
                                >
                                    Línea
                                </InputLabel>

                                <Select
                                    labelId="desktop-machine-label"
                                    id="desktop-machine-select"
                                    value={machine}
                                    label="Línea"
                                    onChange={handleMachineChange}
                                    sx={{
                                        color: "#111827",

                                        "& .MuiSelect-select": {
                                            color: "#111827",
                                            WebkitTextFillColor: "#111827"
                                        },

                                        "& .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#d1d5db"
                                            },

                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#9ca3af"
                                            },

                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#2563eb"
                                            },

                                        "& .MuiSvgIcon-root": {
                                            color: "#4b5563"
                                        }
                                    }}
                                >
                                    <MenuItem value="">
                                        Todas
                                    </MenuItem>

                                    {machines.map(line => (
                                        <MenuItem
                                            key={line}
                                            value={line}
                                        >
                                            {line}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="text-sm text-gray-500">
                            {plan.length}{" "}
                            {plan.length === 1
                                ? "registro"
                                : "registros"}
                        </div>
                    </section>

                    <div className="min-h-0 flex-1 overflow-hidden">
                        <MauiTable
                            rowspaning={false}
                            size={12}
                            setId={null}
                            title=""
                            data={plan}
                            setModal={undefined}
                            columns={column}
                            text="Nueva planta"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
*/
import { useMemo } from "react"
import type { Dispatch, SetStateAction } from "react"
import type { Dayjs } from "dayjs"

import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, {
    type SelectChangeEvent
} from "@mui/material/Select"
import Chip from "@mui/material/Chip"

import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import type { GridColDef } from "@mui/x-data-grid"

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded"

import { MauiTable } from "../../../components/Gnr/MauiTable"
import type { PlanViewRow } from "../../../Utils/PlanView/PlanViewTypes"

type PlanViewDesktopProps = {
    fecha: Dayjs | null

    setFecha: Dispatch<
        SetStateAction<Dayjs | null>
    >

    machine: string

    setMachine: Dispatch<
        SetStateAction<string>
    >

    machines: string[]

    plan: PlanViewRow[]
    column: GridColDef[]

    /*
     * Se conservan como opcionales para mantener compatibilidad
     * con la llamada realizada desde PlanView.tsx.
     */
    shift?: number

    setShift?: Dispatch<
        SetStateAction<number>
    >

    setMachines?: Dispatch<
        SetStateAction<string[]>
    >
}

export const PlanViewDesktop = ({
    fecha,
    setFecha,
    machine,
    setMachine,
    machines,
    plan,
    column
}: PlanViewDesktopProps) => {
    /*
     * Aunque ya no se muestran las tarjetas de resumen,
     * este cálculo sigue siendo necesario para mostrar
     * la cantidad de registros en proceso y atrasados
     * en el encabezado de la tabla.
     */
    const summary = useMemo(() => {
        let delayedRecords = 0
        let inProgressRecords = 0

        plan.forEach(row => {
            let hasDelayedDay = false
            let hasProgressDay = false

            for (let day = 1; day <= 31; day++) {
                const status =
                    row[`d${day}_status`]

                if (status === "delayed") {
                    hasDelayedDay = true
                }

                if (status === "progress") {
                    hasProgressDay = true
                }
            }

            if (hasDelayedDay) {
                delayedRecords++
            }

            if (hasProgressDay) {
                inProgressRecords++
            }
        })

        return {
            delayedRecords,
            inProgressRecords
        }
    }, [plan])

    const handleDateChange = (
        newValue: Dayjs | null
    ) => {
        if (!newValue) {
            return
        }

        /*
         * PlanView trabaja por mes, por eso guardamos
         * el primer día del mes seleccionado.
         */
        setFecha(
            newValue.startOf("month")
        )
    }

    const handleMachineChange = (
        event: SelectChangeEvent<string>
    ) => {
        setMachine(
            event.target.value
        )
    }

    return (
        <main className="flex min-h-0 flex-1 flex-col bg-gray-100">
            {/* Encabezado y filtros */}
            <header className="border-b border-gray-200 bg-white px-5 py-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Producción
                        </p>

                        <div className="mt-1 flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">
                                PlanView
                            </h1>

                            <Chip
                                label={`${plan.length} ${plan.length === 1
                                        ? "registro"
                                        : "registros"
                                    }`}
                                size="small"
                                sx={{
                                    backgroundColor:
                                        "#f3f4f6",

                                    color: "#374151",
                                    fontWeight: 700
                                }}
                            />
                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                            Seguimiento del plan mensual y
                            avance de producción
                        </p>
                    </div>

                    {/* Filtros */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <DatePicker
                            label="Mes"
                            openTo="month"
                            views={[
                                "year",
                                "month"
                            ]}
                            yearsOrder="desc"
                            value={fecha}
                            onChange={
                                handleDateChange
                            }
                            slotProps={{
                                textField: {
                                    size: "small"
                                }
                            }}
                            sx={{
                                width: 190,

                                "& .MuiInputBase-root":
                                {
                                    backgroundColor:
                                        "white",

                                    borderRadius:
                                        "10px"
                                },

                                "& .MuiInputBase-input":
                                {
                                    color:
                                        "#111827",

                                    WebkitTextFillColor:
                                        "#111827"
                                },

                                "& .MuiInputLabel-root":
                                {
                                    color:
                                        "#4b5563"
                                },

                                "& .MuiInputLabel-root.Mui-focused":
                                {
                                    color:
                                        "#2563eb"
                                },

                                "& .MuiSvgIcon-root":
                                {
                                    color:
                                        "#4b5563"
                                },

                                "& .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor:
                                        "#d1d5db"
                                },

                                "&:hover .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor:
                                        "#9ca3af"
                                },

                                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                    borderColor:
                                        "#2563eb"
                                }
                            }}
                        />

                        <FormControl
                            size="small"
                            sx={{
                                minWidth: 180
                            }}
                        >
                            <InputLabel
                                id="desktop-machine-label"
                                sx={{
                                    color: "#4b5563",

                                    "&.Mui-focused":
                                    {
                                        color:
                                            "#2563eb"
                                    }
                                }}
                            >
                                Línea
                            </InputLabel>

                            <Select
                                labelId="desktop-machine-label"
                                id="desktop-machine-select"
                                value={machine}
                                label="Línea"
                                onChange={
                                    handleMachineChange
                                }
                                sx={{
                                    backgroundColor:
                                        "white",

                                    borderRadius:
                                        "10px",

                                    color: "#111827",

                                    "& .MuiSelect-select":
                                    {
                                        color:
                                            "#111827",

                                        WebkitTextFillColor:
                                            "#111827"
                                    },

                                    "& .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor:
                                            "#d1d5db"
                                    },

                                    "&:hover .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor:
                                            "#9ca3af"
                                    },

                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor:
                                            "#2563eb"
                                    },

                                    "& .MuiSvgIcon-root":
                                    {
                                        color:
                                            "#4b5563"
                                    }
                                }}
                            >
                                <MenuItem value="">
                                    Todas las líneas
                                </MenuItem>

                                {machines.map(
                                    line => (
                                        <MenuItem
                                            key={line}
                                            value={line}
                                        >
                                            {line}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
                {/* Leyenda de estados */}
                <section className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h2 className="text-sm font-bold text-gray-900">
                            Estado del plan diario
                        </h2>

                        <p className="mt-0.5 text-xs text-gray-500">
                            Los colores indican el avance de
                            producción contra la planeación.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Cumplido */}
                        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                            <CheckCircleOutlineRoundedIcon
                                fontSize="small"
                            />

                            Cumplido
                        </div>

                        {/* En proceso */}
                        <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            <ScheduleRoundedIcon
                                fontSize="small"
                            />

                            En proceso
                        </div>

                        {/* Atrasado */}
                        <div className="flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                            <WarningAmberRoundedIcon
                                fontSize="small"
                            />

                            Atrasado
                        </div>

                        {/* Pendiente */}
                        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600">
                            <span className="h-2.5 w-2.5 rounded-full border border-gray-400 bg-white" />

                            Pendiente
                        </div>
                    </div>
                </section>

                {/* Tabla */}
                <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {/* Encabezado de la tabla */}
                    <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">
                                Detalle del plan
                            </h2>

                            <p className="text-xs text-gray-500">
                                Avance diario por línea y
                                número de parte
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>
                                En proceso:{" "}
                                <strong className="text-blue-700">
                                    {
                                        summary.inProgressRecords
                                    }
                                </strong>
                            </span>

                            <span>
                                Atrasados:{" "}
                                <strong className="text-amber-700">
                                    {
                                        summary.delayedRecords
                                    }
                                </strong>
                            </span>
                        </div>
                    </div>

                    {/* Contenido de la tabla */}
                    <div className="min-h-0 flex-1 overflow-hidden">
                        {plan.length > 0 ? (
                            <MauiTable
                                rowspaning={false}
                                size={12}
                                setId={null}
                                setModal={null}
                                title=""
                                data={plan}
                                columns={column}
                                text="Nueva planta"
                                variant="planView"
                            />
                        ) : (
                            <div className="flex h-full min-h-[300px] items-center justify-center px-6">
                                <div className="max-w-sm text-center">
                                    <Inventory2OutlinedIcon
                                        sx={{
                                            fontSize: 48,
                                            color:
                                                "#9ca3af"
                                        }}
                                    />

                                    <h2 className="mt-3 text-lg font-bold text-gray-800">
                                        No hay registros
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        No se encontraron
                                        registros para el mes y
                                        la línea seleccionados.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}