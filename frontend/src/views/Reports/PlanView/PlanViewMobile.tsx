import { useMemo, useState } from "react"
import dayjs, { type Dayjs } from "dayjs"

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded"
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded"
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded"

import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import type {
    DailyStatus,
    PlanViewRow
} from "../../../Utils/PlanView/PlanViewTypes"

type PlanViewMobileProps = {
    fecha: Dayjs | null
    setFecha: React.Dispatch<
        React.SetStateAction<Dayjs | null>
    >
    machine: string
    setMachine: React.Dispatch<
        React.SetStateAction<string>
    >
    machines: string[]
    plan: PlanViewRow[]
}

type CurrentProgress = {
    day: number | null
    value: string
    status: DailyStatus
}

const getCurrentProgress = (
    row: PlanViewRow
): CurrentProgress => {
    /*
     * Primero buscamos un atraso.
     */
    for (let day = 1; day <= 31; day++) {
        const key = `d${day}`
        const status = row[
            `${key}_status`
        ] as DailyStatus

        if (status === "delayed") {
            return {
                day,
                value: String(row[key] ?? "0"),
                status
            }
        }
    }

    /*
     * Después buscamos el día actual en proceso.
     */
    for (let day = 1; day <= 31; day++) {
        const key = `d${day}`
        const status = row[
            `${key}_status`
        ] as DailyStatus

        if (status === "progress") {
            return {
                day,
                value: String(row[key] ?? "0"),
                status
            }
        }
    }

    /*
     * Si no hay atraso ni proceso, buscamos el último
     * día completado.
     */
    for (let day = 31; day >= 1; day--) {
        const key = `d${day}`
        const status = row[
            `${key}_status`
        ] as DailyStatus

        if (status === "complete") {
            return {
                day,
                value: String(row[key] ?? "0"),
                status
            }
        }
    }

    return {
        day: null,
        value: "Sin avance",
        status: "pending"
    }
}

const getStatusInformation = (
    status: DailyStatus
) => {
    switch (status) {
        case "complete":
            return {
                label: "Cumplido",
                className:
                    "border-green-200 bg-green-50 text-green-700",
                icon: (
                    <CheckCircleOutlineRoundedIcon
                        fontSize="small"
                    />
                )
            }

        case "delayed":
            return {
                label: "Atrasado",
                className:
                    "border-amber-300 bg-amber-100 text-amber-900",
                icon: (
                    <WarningAmberRoundedIcon
                        fontSize="small"
                    />
                )
            }

        case "progress":
            return {
                label: "En proceso",
                className:
                    "border-blue-300 bg-blue-50 text-blue-700",
                icon: (
                    <ScheduleRoundedIcon
                        fontSize="small"
                    />
                )
            }

        default:
            return {
                label: "Pendiente",
                className:
                    "border-gray-200 bg-gray-50 text-gray-600",
                icon: (
                    <ScheduleRoundedIcon
                        fontSize="small"
                    />
                )
            }
    }
}

const getDayClasses = (
    status: DailyStatus
): string => {
    switch (status) {
        case "complete":
            return [
                "border-green-600",
                "bg-green-600",
                "text-white"
            ].join(" ")

        case "delayed":
            return [
                "border-amber-400",
                "bg-amber-100",
                "text-amber-950"
            ].join(" ")

        case "progress":
            return [
                "border-2",
                "border-blue-500",
                "bg-blue-50",
                "text-blue-900"
            ].join(" ")

        default:
            return [
                "border-gray-200",
                "bg-white",
                "text-gray-700"
            ].join(" ")
    }
}

const PlanCard = ({
    row
}: {
    row: PlanViewRow
}) => {
    const progress = getCurrentProgress(row)

    const statusInformation =
        getStatusInformation(progress.status)

    const qty = Number(row.qty ?? 0)
    const planned = Number(row.acumulate ?? 0)

    const percentage =
        planned > 0
            ? Math.min(
                Number(
                    ((qty / planned) * 100).toFixed(1)
                ),
                100
            )
            : 0


    return (
        <Accordion
            disableGutters
            elevation={0}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            sx={{
                "&::before": {
                    display: "none"
                },

                "&.Mui-expanded": {
                    margin: 0
                }
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon className="text-gray-500" />
                }
                sx={{
                    padding: "14px 16px",

                    "& .MuiAccordionSummary-content": {
                        margin: 0
                    },

                    "& .MuiAccordionSummary-content.Mui-expanded": {
                        margin: 0
                    }
                }}
            >
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <FactoryOutlinedIcon
                                    className="text-gray-500"
                                    fontSize="small"
                                />

                                <h2 className="truncate text-base font-bold text-gray-900">
                                    {row.machine || "Sin línea"}
                                </h2>
                            </div>

                            <p className="mt-1 truncate text-sm font-semibold text-gray-700">
                                {row.Shortpart || "Sin shortpart"}
                            </p>

                            <p className="truncate text-xs text-gray-500">
                                {row.PartNumber ||
                                    "Sin número de parte"}
                            </p>
                        </div>

                        <div
                            className={[
                                "mr-2 flex shrink-0 items-center gap-1",
                                "rounded-full border px-2 py-1",
                                "text-[11px] font-bold",
                                statusInformation.className
                            ].join(" ")}
                        >
                            {statusInformation.icon}
                            {statusInformation.label}
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded-xl bg-gray-50 p-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                                Producción
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-900">
                                {qty.toLocaleString()}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                                Plan al día
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-900">
                                {planned.toLocaleString()}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-500">
                                Cumplimiento
                            </p>

                            <p className="mt-1 text-sm font-bold text-gray-900">
                                {percentage}%
                            </p>
                        </div>
                    </div>

                    {progress.day !== null && (
                        <div className="mt-3 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                                    Día de producción
                                </p>

                                <p className="text-sm font-bold text-gray-900">
                                    Día {progress.day}
                                </p>
                            </div>

                            <p className="text-sm font-bold text-gray-900">
                                {progress.value}
                            </p>
                        </div>
                    )}
                </div>
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    padding: "0 16px 16px"
                }}
            >
                <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-xl bg-gray-50 p-3">
                            <p className="text-xs text-gray-500">
                                Cliente
                            </p>

                            <p className="mt-1 font-semibold text-gray-900">
                                {row.Customer || "N/D"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-3">
                            <p className="text-xs text-gray-500">
                                Programa
                            </p>

                            <p className="mt-1 font-semibold text-gray-900">
                                {row.Program || "N/D"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-3">
                            <p className="text-xs text-gray-500">
                                Descripción
                            </p>

                            <p className="mt-1 break-words font-semibold text-gray-900">
                                {row.Line || "N/D"}
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-3">
                            <p className="text-xs text-gray-500">
                                Nivel de diseño
                            </p>

                            <p className="mt-1 font-semibold text-gray-900">
                                {row.LevenDesign || "N/D"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                        <CalendarMonthIcon
                            className="text-gray-500"
                            fontSize="small"
                        />

                        <h3 className="text-sm font-bold text-gray-900">
                            Plan diario
                        </h3>
                    </div>

                    <div className="mt-3 grid grid-cols-4 gap-1.5">
                        {Array.from(
                            { length: 31 },
                            (_, index) => {
                                const day = index + 1
                                const key = `d${day}`

                                const status = (
                                    row[`${key}_status`] ??
                                    "pending"
                                ) as DailyStatus

                                return (
                                    <div
                                        key={`${row.id}-${key}`}
                                        className={[
                                            "flex",
                                            "min-h-[50px]",
                                            "flex-col",
                                            "items-center",
                                            "justify-center",
                                            "rounded-lg",
                                            "border",
                                            "px-1",
                                            "py-1.5",
                                            "text-center",
                                            getDayClasses(status)
                                        ].join(" ")}
                                    >
                                        <p className="text-[9px] font-bold uppercase leading-none opacity-70">
                                            D{day}
                                        </p>

                                        <p className="mt-1 whitespace-nowrap text-[10px] font-bold leading-tight">
                                            {String(row[key] ?? 0)}
                                        </p>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export const PlanViewMobile = ({
    fecha,
    setFecha,
    machine,
    setMachine,
    machines,
    plan
}: PlanViewMobileProps) => {
    const [search, setSearch] = useState("")

    const visiblePlan = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase()

        if (normalizedSearch === "") {
            return plan
        }

        return plan.filter(row => {
            const searchableValues = [
                row.machine,
                row.Shortpart,
                row.PartNumber,
                row.Customer,
                row.Program,
                row.Line
            ]

            return searchableValues.some(value =>
                String(value ?? "")
                    .toLowerCase()
                    .includes(normalizedSearch)
            )
        })
    }, [plan, search])

    const delayedCount = useMemo(() => {
        return visiblePlan.filter(row =>
            Array.from(
                { length: 31 },
                (_, index) =>
                    row[`d${index + 1}_status`]
            ).includes("delayed")
        ).length
    }, [visiblePlan])

    return (
        <main className="min-h-screen bg-gray-100 pb-8">
            <header className="sticky top-0 z-20 border-b border-gray-200 bg-white px-4 pb-4 pt-3 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Producción
                        </p>

                        <h1 className="text-2xl font-bold text-gray-900">
                            PlanView
                        </h1>
                    </div>

                    <Chip
                        label={`${visiblePlan.length} registros`}
                        size="small"
                        sx={{
                            backgroundColor: "#f3f4f6",
                            color: "#374151",
                            fontWeight: 700
                        }}
                    />
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                    <DatePicker
                        label="Mes"
                        openTo="month"
                        views={["year", "month"]}
                        yearsOrder="desc"
                        value={fecha}
                        onChange={newValue => {
                            if (!newValue) {
                                return
                            }

                            setFecha(
                                dayjs(newValue).startOf("month")
                            )
                        }}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                size: "small"
                            }
                        }}
                    />

                    <FormControl
                        fullWidth
                        size="small"
                    >
                        <InputLabel id="mobile-machine-label">
                            Línea
                        </InputLabel>

                        <Select
                            labelId="mobile-machine-label"
                            value={machine}
                            label="Línea"
                            onChange={event => {
                                setMachine(
                                    String(event.target.value)
                                )
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

                    <input
                        value={search}
                        onChange={event =>
                            setSearch(event.target.value)
                        }
                        placeholder="Buscar línea, shortpart o número de parte"
                        className={[
                            "h-10",
                            "w-full",
                            "rounded-lg",
                            "border",
                            "border-gray-300",
                            "bg-white",
                            "px-3",
                            "text-sm",
                            "text-gray-900",
                            "outline-none",
                            "transition",
                            "placeholder:text-gray-400",
                            "focus:border-blue-500",
                            "focus:ring-2",
                            "focus:ring-blue-100"
                        ].join(" ")}
                    />
                </div>

                {delayedCount > 0 && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                        <WarningAmberRoundedIcon
                            fontSize="small"
                        />

                        <span className="font-semibold">
                            {delayedCount}{" "}
                            {delayedCount === 1
                                ? "registro atrasado"
                                : "registros atrasados"}
                        </span>
                    </div>
                )}
            </header>

            <section className="space-y-3 p-3">
                {visiblePlan.length > 0 ? (
                    visiblePlan.map((row, index) => (
                        <PlanCard
                            key={
                                row.id ??
                                `${row.machine}-${row.Shortpart}-${index}`
                            }
                            row={row}
                        />
                    ))
                ) : (
                    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center shadow-sm">
                        <Inventory2OutlinedIcon
                            sx={{
                                fontSize: 42,
                                color: "#9ca3af"
                            }}
                        />

                        <h2 className="mt-3 font-bold text-gray-800">
                            No hay registros
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            No se encontraron registros para los
                            filtros seleccionados.
                        </p>
                    </div>
                )}
            </section>
        </main>
    )
}