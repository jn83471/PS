//PlanView.tsx anterior

/*

import { useEffect, useMemo, useState } from "react"
import dayjs, { type Dayjs } from "dayjs"
import type { GridColDef } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"

import { GetPlanView } from "../../../api/PlanApi"
import { createPlanviewColumns } from "../../../Utils/PlanView/CreatePlanViewColumn"
import { buildDailyProgress } from "../../../Utils/PlanView/buildDailyProgress"
import type { PlanViewRow } from "../../../Utils/PlanView/PlanViewTypes"
import { isMobile, isTabletOnly } from "../../../Utils/Media"

import { PlanViewDesktop } from "./PlanViewDesktop"
import { PlanViewMobile } from "./PlanViewMobile"

export const PlanView = () => {
    const [shift, setShift] = useState<number>(0)

    /*
     * Aunque la variable se llama machine, ahora almacenará
     * el nombre de la línea, es decir, el valor de row.Line.
     *
     * Ejemplo:
     * machine = "32121-3BM"
     * 
     
    const [machine, setMachine] = useState<string>("")

    /*
     * Aunque la variable se llama machines, ahora contendrá
     * los nombres únicos encontrados en row.Line.
     * 
     
    const [machines, setMachines] = useState<string[]>([])

    const [fecha, setFecha] = useState<Dayjs | null>(dayjs())

    const {
        data,
        isError,
        isLoading,
        error
    } = useQuery({
        queryKey: [
            "PlanView",
            fecha?.format("YYYY-MM-DD"),
            shift
        ],

        queryFn: () =>
            GetPlanView(
                fecha?.format("YYYY-MM-DD"),
                shift
            ),

        retry: false,
        refetchInterval: 30000
    })

    useEffect(() => {
        if (!data?.plan) {
            setMachines([])
            return
        }

        /*
         * El selector ahora se llena con los valores únicos
         * de Line, no con los valores de machine.
         * 
         
        const nuevasLineas = [
            ...new Set(
                data.plan
                    .map((row: PlanViewRow) =>
                        String(row.Line ?? "").trim()
                    )
                    .filter(
                        (value: string) =>
                            value !== ""
                    )
            )
        ].sort((a, b) =>
            a.localeCompare(b)
        )

        setMachines(nuevasLineas)
    }, [data])

    const plan = useMemo<PlanViewRow[]>(() => {
        if (!data?.plan) {
            return []
        }

        const send = data.send ?? []

        return data.plan
            .map((row: PlanViewRow) => {
                /*
                 * Esta comparación no cambia.
                 *
                 * La producción se sigue relacionando con el código
                 * machine, porque production.line_c contiene códigos
                 * como JO25 y JO26.
                 * 
                 
                const productionRecord = send.find(
                    (production: any) =>
                        production.line_c === row.machine &&
                        production.ShortPart === row.Shortpart
                )

                const qty = Number(
                    productionRecord?.total ?? 0
                )

                const acumuladoTotal = Array.from(
                    { length: 31 },
                    (_, index) => {
                        const key = `d${index + 1}`

                        return Number(
                            row[key] ?? 0
                        )
                    }
                ).reduce(
                    (total, value) =>
                        total + value,
                    0
                )

                return {
                    ...row,
                    qty,
                    acumuladoTotal
                }
            })
            .filter((row: PlanViewRow) => {
                const shortpart =
                    String(row.Shortpart ?? "").trim()

                if (shortpart === "") {
                    return false
                }

                const qty = Number(
                    row.qty ?? 0
                )

                const acumuladoTotal = Number(
                    row.acumuladoTotal ?? 0
                )

                if (
                    qty <= 0 &&
                    acumuladoTotal <= 0
                ) {
                    return false
                }

                /*
                 * El filtro ahora trabaja con el nombre de línea.
                 *
                 * Si JO25 y JO26 tienen:
                 * Line = "32121-3BM"
                 *
                 * ambos registros pasarán este filtro.
                 
                 
                if (
                    machine !== "" &&
                    String(row.Line ?? "").trim() !== machine
                ) {
                    return false
                }

                return true
            })
    }, [data, machine])

    const processedPlan = useMemo<PlanViewRow[]>(() => {
        return plan.map(row =>
            buildDailyProgress(row, fecha)
        )
    }, [plan, fecha])

    const columns = useMemo<GridColDef[]>(() => {
        return createPlanviewColumns()
    }, [])

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

                    <p className="mt-3 text-sm font-medium text-gray-600">
                        Cargando PlanView...
                    </p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="m-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <h2 className="font-bold text-red-700">
                    No fue posible cargar el plan
                </h2>

                <p className="mt-1 text-sm text-red-600">
                    {error instanceof Error
                        ? error.message
                        : "Ocurrió un error inesperado."}
                </p>
            </div>
        )
    }

    if (isMobile && !isTabletOnly) {
        return (
            <PlanViewMobile
                fecha={fecha}
                setFecha={setFecha}
                machine={machine}
                setMachine={setMachine}
                machines={machines}
                plan={processedPlan}
            />
        )
    }

    return (
        <PlanViewDesktop
            fecha={fecha}
            setFecha={setFecha}
            shift={shift}
            setShift={setShift}
            machine={machine}
            setMachine={setMachine}
            machines={machines}
            setMachines={setMachines}
            plan={processedPlan}
            // column={columns}
        />
    )
}

¨*/
//PlanView.tsx nuevo

import { useEffect, useMemo, useState } from "react"
import dayjs, { type Dayjs } from "dayjs"
import type { GridColDef } from "@mui/x-data-grid"
import { useQuery } from "@tanstack/react-query"

import { GetPlanView } from "../../../api/PlanApi"
import { createPlanviewColumns } from "../../../Utils/PlanView/CreatePlanViewColumn"
import { buildDailyProgress } from "../../../Utils/PlanView/buildDailyProgress"
import type { PlanViewRow } from "../../../Utils/PlanView/PlanViewTypes"
import { isMobile, isTabletOnly } from "../../../Utils/Media"

import { PlanViewDesktop } from "./PlanViewDesktop"
import { PlanViewMobile } from "./PlanViewMobile"

export const PlanView = () => {
    const [shift, setShift] = useState<number>(0)

    /*
     * Aunque la variable se llama machine, almacena
     * el nombre de línea, es decir, row.Line.
     */
    const [machine, setMachine] = useState<string>("")

    /*
     * Contiene los nombres únicos encontrados en row.Line.
     */
    const [machines, setMachines] = useState<string[]>([])

    /*
     * Controla si los registros deben agruparse
     * por Shift y Shortpart.
     */
    const [summarize, setSummarize] =
        useState<boolean>(false)

    const [fecha, setFecha] =
        useState<Dayjs | null>(dayjs())

    const {
        data,
        isError,
        isLoading,
        error
    } = useQuery({
        queryKey: [
            "PlanView",
            fecha?.format("YYYY-MM-DD"),
            shift
        ],

        queryFn: () =>
            GetPlanView(
                fecha?.format("YYYY-MM-DD"),
                shift
            ),

        retry: false,
        refetchInterval: 30000
    })

    /*
     * Genera las opciones del selector usando row.Line.
     */
    useEffect(() => {
        if (!data?.plan) {
            setMachines([])
            return
        }

        const nuevasLineas = [
            ...new Set(
                data.plan
                    .map((row: PlanViewRow) =>
                        String(row.Line ?? "").trim()
                    )
                    .filter(
                        (value: string) =>
                            value !== ""
                    )
            )
        ].sort((a, b) =>
            a.localeCompare(b)
        )

        setMachines(nuevasLineas)
    }, [data])

    /*
     * Une la planeación con la producción real
     * y aplica los filtros existentes.
     */
    const plan = useMemo<PlanViewRow[]>(() => {
        if (!data?.plan) {
            return []
        }

        const send = data.send ?? []

        return data.plan
            .map((row: PlanViewRow) => {
                const productionRecord = send.find(
                    (production: any) =>
                        production.line_c === row.machine &&
                        production.ShortPart === row.Shortpart
                )

                const qty = Number(
                    productionRecord?.total ?? 0
                )

                const acumuladoTotal = Array.from(
                    { length: 31 },
                    (_, index) => {
                        const key = `d${index + 1}`

                        return Number(
                            row[key] ?? 0
                        )
                    }
                ).reduce(
                    (total, value) =>
                        total + value,
                    0
                )

                return {
                    ...row,
                    qty,
                    acumuladoTotal
                }
            })
            .filter((row: PlanViewRow) => {
                const shortpart =
                    String(
                        row.Shortpart ?? ""
                    ).trim()

                if (shortpart === "") {
                    return false
                }

                const qty = Number(
                    row.qty ?? 0
                )

                const acumuladoTotal = Number(
                    row.acumuladoTotal ?? 0
                )

                /*
                 * Se conserva el filtro existente:
                 * ocultar cuando producción y plan son cero.
                 */
                if (
                    qty <= 0 &&
                    acumuladoTotal <= 0
                ) {
                    return false
                }

                /*
                 * Filtro por nombre de línea.
                 */
                if (
                    machine !== "" &&
                    String(row.Line ?? "").trim() !==
                        machine
                ) {
                    return false
                }

                return true
            })
    }, [data, machine])

    /*
     * Agrupa únicamente cuando summarize está activado.
     *
     * La agrupación usa:
     *
     * Shift + Shortpart
     *
     * Y suma:
     *
     * qty
     * d1 ... d31
     */
    const summarizedPlan =
        useMemo<PlanViewRow[]>(() => {
            if (!summarize) {
                return plan
            }

            const groupedRows =
                new Map<string, PlanViewRow>()

            plan.forEach(row => {
                const normalizedShift =
                    String(
                        row.Shift ?? ""
                    ).trim()

                const normalizedShortpart =
                    String(
                        row.Shortpart ?? ""
                    ).trim()

                const groupKey =
                    `${normalizedShift}::${normalizedShortpart}`

                const existingRow =
                    groupedRows.get(groupKey)

                /*
                 * Primer registro encontrado para el grupo.
                 */
                if (!existingRow) {
                    const initialRow: PlanViewRow = {
                        ...row,
                        qty: Number(row.qty ?? 0)
                    }

                    for (
                        let day = 1;
                        day <= 31;
                        day++
                    ) {
                        const dayKey = `d${day}`

                        initialRow[dayKey] =
                            Number(
                                row[dayKey] ?? 0
                            )
                    }

                    initialRow.acumuladoTotal =
                        Array.from(
                            { length: 31 },
                            (_, index) => {
                                const dayKey =
                                    `d${index + 1}`

                                return Number(
                                    initialRow[
                                        dayKey
                                    ] ?? 0
                                )
                            }
                        ).reduce(
                            (total, value) =>
                                total + value,
                            0
                        )

                    groupedRows.set(
                        groupKey,
                        initialRow
                    )

                    return
                }

                /*
                 * Combina los códigos de línea sin repetirlos.
                 *
                 * Ejemplo:
                 * JO25 + JO26 = "JO25 y JO26"
                 */
                const machineCodes = new Set(
                    String(
                        existingRow.machine ?? ""
                    )
                        .split(" y ")
                        .map(value => value.trim())
                        .filter(Boolean)
                )

                const currentMachine =
                    String(
                        row.machine ?? ""
                    ).trim()

                if (currentMachine !== "") {
                    machineCodes.add(
                        currentMachine
                    )
                }

                existingRow.machine =
                    Array.from(
                        machineCodes
                    ).join(" y ")

                /*
                 * Suma la producción.
                 */
                existingRow.qty =
                    Number(
                        existingRow.qty ?? 0
                    ) +
                    Number(row.qty ?? 0)

                /*
                 * Suma la planeación de todos los días.
                 */
                for (
                    let day = 1;
                    day <= 31;
                    day++
                ) {
                    const dayKey = `d${day}`

                    existingRow[dayKey] =
                        Number(
                            existingRow[
                                dayKey
                            ] ?? 0
                        ) +
                        Number(
                            row[dayKey] ?? 0
                        )
                }

                /*
                 * Recalcula el acumulado total
                 * después de sumar el registro.
                 */
                existingRow.acumuladoTotal =
                    Array.from(
                        { length: 31 },
                        (_, index) => {
                            const dayKey =
                                `d${index + 1}`

                            return Number(
                                existingRow[
                                    dayKey
                                ] ?? 0
                            )
                        }
                    ).reduce(
                        (total, value) =>
                            total + value,
                        0
                    )
            })

            return Array.from(
                groupedRows.values()
            )
        }, [plan, summarize])

    /*
     * El progreso se calcula después de agrupar.
     *
     * Esto permite distribuir el qty sumado sobre
     * el plan diario también sumado.
     */
    const processedPlan =
        useMemo<PlanViewRow[]>(() => {
            return summarizedPlan.map(row =>
                buildDailyProgress(
                    row,
                    fecha
                )
            )
        }, [summarizedPlan, fecha])

    /*
     * Se conserva porque ya existía en el archivo.
     */
    const columns = useMemo<GridColDef[]>(() => {
        return createPlanviewColumns()
    }, [])

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

                    <p className="mt-3 text-sm font-medium text-gray-600">
                        Cargando PlanView...
                    </p>
                </div>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="m-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <h2 className="font-bold text-red-700">
                    No fue posible cargar el plan
                </h2>

                <p className="mt-1 text-sm text-red-600">
                    {error instanceof Error
                        ? error.message
                        : "Ocurrió un error inesperado."}
                </p>
            </div>
        )
    }

    if (isMobile && !isTabletOnly) {
        return (
            <PlanViewMobile
                fecha={fecha}
                setFecha={setFecha}
                machine={machine}
                setMachine={setMachine}
                machines={machines}
                plan={processedPlan}
                summarize={summarize}
                setSummarize={setSummarize}
            />
        )
    }

    return (
        <PlanViewDesktop
            fecha={fecha}
            setFecha={setFecha}
            shift={shift}
            setShift={setShift}
            machine={machine}
            setMachine={setMachine}
            machines={machines}
            setMachines={setMachines}
            plan={processedPlan}
            summarize={summarize}
            setSummarize={setSummarize}
            // column={columns}
        />
    )
}