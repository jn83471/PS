import type {
    GridColDef,
    GridRenderCellParams
} from "@mui/x-data-grid"

import type { CSSProperties } from "react"

type DailyStatus =
    | "complete"
    | "progress"
    | "delayed"
    | "pending"

type DailyCellProps = {
    value: unknown
    status: DailyStatus
}

const DailyCell = ({
    value,
    status
}: DailyCellProps) => {
    const statusStyles: Record<
        DailyStatus,
        CSSProperties
    > = {
        complete: {
            backgroundColor: "#16a34a",
            borderColor: "#16a34a",
            color: "#ffffff"
        },

        progress: {
            backgroundColor: "#eff6ff",
            borderColor: "#3b82f6",
            color: "#1e3a8a"
        },

        delayed: {
            backgroundColor: "#fef3c7",
            borderColor: "#f59e0b",
            color: "#78350f"
        },

        pending: {
            backgroundColor: "#ffffff",
            borderColor: "#e5e7eb",
            color: "#4b5563"
        }
    }

    const currentStyle =
        statusStyles[status] ?? statusStyles.pending

    return (
        <div
            title={String(value ?? 0)}
            className="
                flex
                h-8
                w-full
                items-center
                justify-center
                overflow-hidden
                rounded-lg
                border
                px-1
                text-center
                text-xs
                font-bold
                leading-tight
                transition-all
            "
            style={{
                ...currentStyle,

                borderWidth:
                    status === "progress" ||
                    status === "delayed"
                        ? "2px"
                        : "1px",

                boxShadow:
                    status === "complete"
                        ? "0 1px 2px rgba(22, 163, 74, 0.20)"
                        : status === "progress"
                          ? "0 0 0 1px rgba(59, 130, 246, 0.10)"
                          : status === "delayed"
                            ? "0 1px 2px rgba(245, 158, 11, 0.15)"
                            : "none"
            }}
        >
            <span className="truncate">
                {String(value ?? 0)}
            </span>
        </div>
    )
}

export const createPlanviewColumns = (): GridColDef[] => {
    const informationColumns: GridColDef[] = [
        {
            field: "machine",
            headerName: "Línea",
            width: 80,
            minWidth: 80,
            pinnable: true,
            headerAlign: "center",
            align: "center"
        },
        /*
        {
            field: "Line",
            headerName: "Nombre",
            width: 150,
            minWidth: 150
        },
        */
       /*
        {
            field: "Program",
            headerName: "Programa",
            width: 90,
            minWidth: 90
        },
        /*
        {
            field: "Shift",
            headerName: "Turno",
            width: 65,
            minWidth: 65,
            headerAlign: "center",
            align: "center"
        },
        */
        {
            field: "PartNumber",
            headerName: "Número de parte",
            width: 130,
            minWidth: 130
        },
        {
            field: "Customer",
            headerName: "Cliente",
            width: 90,
            minWidth: 90
        },
        {
            field: "LevenDesign",
            headerName: "Nivel de diseño",
            width: 110,
            minWidth: 110
        },
        {
            field: "Shortpart",
            headerName: "Shortpart",
            width: 85,
            minWidth: 85,
            headerAlign: "center",
            align: "center"
        },
        /*
        {
            field: "Kmh",
            headerName: "KMH",
            width: 75,
            minWidth: 75,
            headerAlign: "center",
            align: "center",

            valueFormatter: value => {
                const numericValue = Number(value)

                return Number.isFinite(numericValue)
                    ? numericValue.toFixed(3)
                    : "0.000"
            }
        }
        */    
    ]

    const dailyColumns: GridColDef[] = Array.from(
        { length: 31 },
        (_, index) => {
            const day = index + 1
            const field = `d${day}`

            return {
                field,
                headerName: `D${day}`,
                width: 92,
                minWidth: 92,
                sortable: false,
                headerAlign: "center",
                align: "center",

                renderCell: (
                    params: GridRenderCellParams
                ) => {
                    const status = (
                        params.row[
                            `${field}_status`
                        ] ?? "pending"
                    ) as DailyStatus

                    return (
                        <DailyCell
                            value={params.row[field]}
                            status={status}
                        />
                    )
                }
            }
        }
    )

    const resultColumns: GridColDef[] = [
        {
            field: "acumulate",
            headerName: "Plan acumulado",
            width: 120,
            minWidth: 120,
            headerAlign: "center",
            align: "center",

            renderCell: params => (
                <div className="flex w-full justify-center">
                    <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700">
                        {Number(
                            params.row.acumulate ?? 0
                        ).toLocaleString()}
                    </span>
                </div>
            )
        },
        {
            field: "qty",
            headerName: "Producción",
            width: 110,
            minWidth: 110,
            headerAlign: "center",
            align: "center",

            renderCell: params => {
                const produced = Number(
                    params.row.qty ?? 0
                )

                const planned = Number(
                    params.row.acumulate ?? 0
                )

                const completed =
                    planned > 0 &&
                    produced >= planned

                return (
                    <div className="flex w-full justify-center">
                        <span
                            className={[
                                "rounded-lg",
                                "px-3",
                                "py-1",
                                "text-xs",
                                "font-bold",
                                completed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-blue-50 text-blue-700"
                            ].join(" ")}
                        >
                            {produced.toLocaleString()}
                        </span>
                    </div>
                )
            }
        },
        {
            field: "compliance",
            headerName: "Cumplimiento",
            width: 115,
            minWidth: 115,
            headerAlign: "center",
            align: "center",

            valueGetter: (_value, row) => {
                const produced = Number(row.qty ?? 0)
                const planned = Number(
                    row.acumulate ?? 0
                )

                if (planned <= 0) {
                    return 0
                }

                return Math.min(
                    (produced / planned) * 100,
                    100
                )
            },

            renderCell: params => {
                const compliance = Number(
                    params.value ?? 0
                )

                let colorClasses =
                    "bg-red-50 text-red-700"

                if (compliance >= 100) {
                    colorClasses =
                        "bg-green-100 text-green-700"
                } else if (compliance >= 90) {
                    colorClasses =
                        "bg-amber-100 text-amber-800"
                } else if (compliance >= 70) {
                    colorClasses =
                        "bg-orange-100 text-orange-700"
                }

                return (
                    <div className="flex w-full justify-center">
                        <span
                            className={[
                                "min-w-[66px]",
                                "rounded-full",
                                "px-2.5",
                                "py-1",
                                "text-center",
                                "text-xs",
                                "font-bold",
                                colorClasses
                            ].join(" ")}
                        >
                            {compliance.toFixed(1)}%
                        </span>
                    </div>
                )
            }
        }
    ]

    return [
        ...informationColumns,
        ...dailyColumns,
        ...resultColumns
    ]
}