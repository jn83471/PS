//PlanView Desktop anterior
/*
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
                   
                        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                            <CheckCircleOutlineRoundedIcon
                                fontSize="small"
                            />

                            Cumplido
                        </div>

                     
                        <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            <ScheduleRoundedIcon
                                fontSize="small"
                            />

                            En proceso
                        </div>

                      
                        <div className="flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                            <WarningAmberRoundedIcon
                                fontSize="small"
                            />

                            Atrasado
                        </div>

              
                        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600">
                            <span className="h-2.5 w-2.5 rounded-full border border-gray-400 bg-white" />

                            Pendiente
                        </div>
                    </div>
                </section>

             
                <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                
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

*/
import {
    useMemo,
    type Dispatch,
    type SetStateAction
} from "react"

import type { Dayjs } from "dayjs"

import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, {
    type SelectChangeEvent
} from "@mui/material/Select"
import Chip from "@mui/material/Chip"

import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import type {
    CellClassParams,
    ColDef,
    ValueFormatterParams
} from "ag-grid-community"

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded"

import { ReactTable } from "../../../components/Gnr/ReactTable"

import type {
    DailyStatus,
    PlanViewRow
} from "../../../Utils/PlanView/PlanViewTypes"

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

    /*
     * Se conservan para mantener compatibilidad con la llamada
     * que actualmente se realiza desde PlanView.tsx.
     */
    column?: unknown

    shift?: number

    setShift?: Dispatch<
        SetStateAction<number>
    >

    setMachines?: Dispatch<
        SetStateAction<string[]>
    >
}

type PlanSummary = {
    delayedRecords: number
    inProgressRecords: number
}

const formatNumber = (
    value: unknown
): string => {
    const numericValue = Number(value ?? 0)

    if (!Number.isFinite(numericValue)) {
        return "0"
    }

    return numericValue.toLocaleString()
}

const getDailyCellClasses = (
    status: DailyStatus
): string[] => {
    switch (status) {
        case "complete":
            return [
                "plan-day-cell",
                "plan-day-complete"
            ]

        case "progress":
            return [
                "plan-day-cell",
                "plan-day-progress"
            ]

        case "delayed":
            return [
                "plan-day-cell",
                "plan-day-delayed"
            ]

        default:
            return [
                "plan-day-cell",
                "plan-day-pending"
            ]
    }
}

export const PlanViewDesktop = ({
    fecha,
    setFecha,
    machine,
    setMachine,
    machines,
    plan
}: PlanViewDesktopProps) => {
    /*
     * Cuenta cuántos registros tienen producción atrasada
     * o producción en proceso.
     */
    const summary = useMemo<PlanSummary>(() => {
        let delayedRecords = 0
        let inProgressRecords = 0

        plan.forEach(row => {
            let hasDelayedDay = false
            let hasProgressDay = false

            for (let day = 1; day <= 31; day++) {
                const status = row[
                    `d${day}_status`
                ] as DailyStatus | undefined

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

    /*
     * Columnas generadas para AG Grid.
     *
     * Las columnas desde Línea hasta Nivel de diseño
     * permanecen fijas.
     *
     * Shortpart y las columnas posteriores se desplazan.
     */
    const columns = useMemo<ColDef<PlanViewRow>[]>(() => {
        const fixedColumns: ColDef<PlanViewRow>[] = [
            {
                field: "machine",
                headerName: "Línea",
                width: 90,
                minWidth: 90,
                maxWidth: 90,
                pinned: "left",
                lockPinned: true,
                suppressMovable: true,
                filter: "agTextColumnFilter",
                floatingFilter: true
            },
            /*
            {
                field: "Line",
                headerName: "Nombre",
                width: 160,
                minWidth: 160,
                maxWidth: 160,
                pinned: "left",
                lockPinned: true,
                suppressMovable: true,
                filter: "agTextColumnFilter",
                floatingFilter: true
            },
            */

            /*
            {
                field: "Program",
                headerName: "Programa",
                width: 110,
                minWidth: 110,
                maxWidth: 110,
                pinned: "left",
                lockPinned: true,
                suppressMovable: true,
                filter: "agTextColumnFilter",
                floatingFilter: true
            },
            */
            {
                field: "PartNumber",
                headerName: "Número de parte",
                width: 150,
                minWidth: 150,
                maxWidth: 150,
                pinned: "left",
                lockPinned: true,
                suppressMovable: true,
                filter: "agTextColumnFilter",
                floatingFilter: true
            },
            {
                field: "Customer",
                headerName: "Cliente",
                width: 105,
                minWidth: 105,
                maxWidth: 105,
                pinned: "left",
                lockPinned: true,
                suppressMovable: true,
                filter: "agTextColumnFilter",
                floatingFilter: true
            },
            {
                field: "LevenDesign",
                headerName: "Nivel de diseño",
                width: 130,
                minWidth: 130,
                maxWidth: 130,
                pinned: "left",
                lockPinned: true,
                suppressMovable: true,
                filter: "agTextColumnFilter",
                floatingFilter: true,
                cellClass: "last-pinned-column",
                headerClass: "last-pinned-header"
            }
        ]

        const informationColumns: ColDef<PlanViewRow>[] = [
            {
                field: "Shortpart",
                headerName: "Shortpart",
                width: 105,
                minWidth: 105,
                filter: "agTextColumnFilter",
                floatingFilter: true
            },
            /*{
                field: "Shift",
                headerName: "Turno",
                width: 85,
                minWidth: 85,
                filter: "agTextColumnFilter",
                floatingFilter: true
            },
            {
                field: "Kmh",
                headerName: "KMH",
                width: 90,
                minWidth: 90,
                filter: "agNumberColumnFilter",
                floatingFilter: true,
                valueFormatter: (
                    params: ValueFormatterParams<
                        PlanViewRow
                    >
                ) => {
                    const value = Number(
                        params.value ?? 0
                    )

                    return Number.isFinite(value)
                        ? value.toFixed(3)
                        : "0.000"
                }
            }*/
        ]

        const dayColumns: ColDef<PlanViewRow>[] =
            Array.from(
                { length: 31 },
                (_, index) => {
                    const day = index + 1
                    const field = `d${day}`

                    return {
                        field,
                        headerName: `${day}`,
                        width: 92,
                        minWidth: 92,
                        maxWidth: 92,
                        sortable: false,
                        filter: false,
                        floatingFilter: false,
                        resizable: false,
                        headerClass:
                            "plan-day-header",

                        cellClass: (
                            params: CellClassParams<
                                PlanViewRow
                            >
                        ) => {
                            const status = (
                                params.data?.[
                                `${field}_status`
                                ] ?? "pending"
                            ) as DailyStatus

                            return getDailyCellClasses(
                                status
                            )
                        },

                        valueFormatter: (
                            params: ValueFormatterParams<
                                PlanViewRow
                            >
                        ) => {
                            return String(
                                params.value ?? 0
                            )
                        }
                    } as ColDef<PlanViewRow>
                }
            )

        const resultColumns: ColDef<PlanViewRow>[] = [
            /*
            {
                field: "acumulate",
                headerName: "Plan acumulado",
                width: 130,
                minWidth: 130,
                filter: "agNumberColumnFilter",
                floatingFilter: true,
                valueFormatter: (
                    params: ValueFormatterParams<
                        PlanViewRow
                    >
                ) => {
                    return formatNumber(
                        params.value
                    )
                },
                cellClass:
                    "plan-result-cell plan-result-planned"
            },
            {
                field: "qty",
                headerName: "Producción",
                width: 120,
                minWidth: 120,
                filter: "agNumberColumnFilter",
                floatingFilter: true,
                valueFormatter: (
                    params: ValueFormatterParams<
                        PlanViewRow
                    >
                ) => {
                    return formatNumber(
                        params.value
                    )
                },
                cellClass: params => {
                    const produced = Number(
                        params.data?.qty ?? 0
                    )

                    const planned = Number(
                        params.data?.acumulate ?? 0
                    )

                    return produced >= planned &&
                        planned > 0
                        ? "plan-result-cell plan-production-complete"
                        : "plan-result-cell plan-production-progress"
                }
            },
            {
                colId: "compliance",
                headerName: "Cumplimiento",
                width: 125,
                minWidth: 125,
                filter: "agNumberColumnFilter",
                floatingFilter: true,

                valueGetter: params => {
                    const produced = Number(
                        params.data?.qty ?? 0
                    )

                    const planned = Number(
                        params.data?.acumulate ?? 0
                    )

                    if (planned <= 0) {
                        return 0
                    }

                    return Math.min(
                        Number(
                            (
                                (produced / planned) *
                                100
                            ).toFixed(1)
                        ),
                        100
                    )
                },

                valueFormatter: params => {
                    const percentage = Number(
                        params.value ?? 0
                    )

                    return `${percentage.toFixed(1)}%`
                },

                cellClass: params => {
                    const percentage = Number(
                        params.value ?? 0
                    )

                    if (percentage >= 100) {
                        return "plan-compliance plan-compliance-complete"
                    }

                    if (percentage >= 90) {
                        return "plan-compliance plan-compliance-warning"
                    }

                    return "plan-compliance plan-compliance-low"
                }
            }
        */
        ]

        return [
            ...fixedColumns,
            ...informationColumns,
            ...dayColumns,
            ...resultColumns
        ]
    }, [])

    const handleDateChange = (
        newValue: Dayjs | null
    ) => {
        if (!newValue) {
            return
        }

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
    const selectedLine = useMemo(() => {
        if (!machine) {
            return null
        }

        return plan.find(
            row => row.machine === machine
        ) ?? null
    }, [machine, plan])


    const tableTitle = useMemo(() => {
        if (!machine) {
            return "Todas las líneas"
        }

        const machineRows = plan.filter(
            row => row.machine === machine
        )

        const descriptions = [
            ...new Set(
                machineRows
                    .map(row => row.Line)
                    .filter(Boolean)
            )
        ]

        const programs = [
            ...new Set(
                machineRows
                    .map(row => row.Program)
                    .filter(Boolean)
            )
        ]

        return [
            machine,
            descriptions.join(", "),
            programs.join(", ")
        ]
            .filter(Boolean)
            .join(" - ")
    }, [machine, plan])
    return (
        <main className="flex h-[calc(100vh-64px)] min-h-0 flex-1 flex-col overflow-hidden bg-gray-100">
            {/* Encabezado y filtros generales */}
            <header className="shrink-0 border-b border-gray-200 bg-white px-5 py-3 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Producción
                        </p>

                        <div className="mt-1 flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-gray-900">
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

                        <p className="mt-1 text-xs text-gray-500">
                            Seguimiento del plan mensual y
                            avance de producción
                        </p>
                    </div>

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

                                "& .MuiInputBase-root": {
                                    backgroundColor:
                                        "white",
                                    borderRadius: "10px"
                                },

                                "& .MuiInputBase-input": {
                                    color: "#111827",
                                    WebkitTextFillColor:
                                        "#111827"
                                },

                                "& .MuiInputLabel-root": {
                                    color: "#4b5563"
                                },

                                "& .MuiInputLabel-root.Mui-focused":
                                {
                                    color:
                                        "#2563eb"
                                },

                                "& .MuiSvgIcon-root": {
                                    color: "#4b5563"
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
                            <InputLabel id="desktop-machine-label">
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
                                    borderRadius: "10px",
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
                </div>
            </header>

            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-3">
                {/* Leyenda */}
                <section className="flex shrink-0 flex-col gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
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
                        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                            <CheckCircleOutlineRoundedIcon
                                fontSize="small"
                            />

                            Cumplido
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                            <ScheduleRoundedIcon
                                fontSize="small"
                            />

                            En proceso
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                            <WarningAmberRoundedIcon
                                fontSize="small"
                            />

                            Atrasado
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600">
                            <span className="h-2.5 w-2.5 rounded-full border border-gray-400 bg-white" />

                            Pendiente
                        </div>
                    </div>
                </section>

                {/* Contenedor de la tabla */}
                <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-2.5">
                        <div>
                            <h2 className="text-sm font-bold text-gray-900">
                                {
                                    tableTitle
                                }
                            </h2>

                            <p className="text-xs text-gray-500">
                                Puedes combinar varios filtros
                                de columna.
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

                    <div className="min-h-0 flex-1 overflow-hidden">
                        {plan.length > 0 ? (
                            <ReactTable
                                header={true}
                                rowspaning={false}
                                setId={null}
                                setModal={null}
                                title={
                                    tableTitle
                                }
                                data={plan}
                                columns={columns}
                                text="Nueva planta"
                            />
                        ) : (
                            <div className="flex h-full min-h-0 items-center justify-center px-6">
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

            {/*
             * Estilos específicos para las celdas del plan diario.
             * Se usan clases globales porque las celdas se renderizan
             * internamente dentro de AG Grid.
             */}
            <style>
                {`
                    .plan-day-header {
                        text-align: center;
                    }

                    .plan-day-cell {
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        height: 32px !important;
                        margin-top: 6px;
                        border-radius: 8px;
                        border: 1px solid #e5e7eb !important;
                        font-size: 11px;
                        font-weight: 700;
                        text-align: center;
                    }

                    .plan-day-complete {
                        background-color: #16a34a !important;
                        border-color: #16a34a !important;
                        color: #ffffff !important;
                    }

                    .plan-day-progress {
                        background-color: #eff6ff !important;
                        border: 2px solid #3b82f6 !important;
                        color: #1e3a8a !important;
                    }

                    .plan-day-delayed {
                        background-color: #fef3c7 !important;
                        border: 2px solid #f59e0b !important;
                        color: #78350f !important;
                    }

                    .plan-day-pending {
                        background-color: #ffffff !important;
                        border-color: #e5e7eb !important;
                        color: #4b5563 !important;
                    }

                    .last-pinned-column,
                    .last-pinned-header {
                        box-shadow:
                            4px 0 8px
                            rgba(15, 23, 42, 0.12);
                    }

                    .plan-result-cell {
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        font-weight: 700;
                    }

                    .plan-result-planned {
                        color: #374151 !important;
                    }

                    .plan-production-complete {
                        color: #15803d !important;
                    }

                    .plan-production-progress {
                        color: #1d4ed8 !important;
                    }

                    .plan-compliance {
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        font-size: 12px;
                        font-weight: 700;
                    }

                    .plan-compliance-complete {
                        color: #15803d !important;
                    }

                    .plan-compliance-warning {
                        color: #b45309 !important;
                    }

                    .plan-compliance-low {
                        color: #b91c1c !important;
                    }
                `}
            </style>
        </main>
    )
}