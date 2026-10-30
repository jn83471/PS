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
     */
    const [machine, setMachine] = useState<string>("")

    /*
     * Aunque la variable se llama machines, ahora contendrá
     * los nombres únicos encontrados en row.Line.
     */
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
         */
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
                 */
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
                 */
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