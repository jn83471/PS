import dayjs, { Dayjs } from "dayjs"
import type {
    DailyStatus,
    PlanViewRow
} from "./PlanViewTypes"

export const buildDailyProgress = (
    row: PlanViewRow,
    selectedDate?: Dayjs | null
): PlanViewRow => {
    const qty = Number(row.qty ?? 0)

    let acumulado = 0
    let diaEnProcesoEncontrado = false

    const result: PlanViewRow = {
        ...row,
        qty
    }

    /*
     * Si estamos consultando el mes actual, usamos el día actual.
     * Si se consulta otro mes, usamos el último día del mes seleccionado.
     */
    const fechaReferencia = selectedDate ?? dayjs()

    const esMesActual =
        fechaReferencia.year() === dayjs().year() &&
        fechaReferencia.month() === dayjs().month()

    const diaActual = esMesActual
        ? dayjs().date()
        : fechaReferencia.daysInMonth()

    for (let i = 1; i <= 31; i++) {
        const key = `d${i}`
        const statusKey = `${key}_status`

        const valorDia = Number(row[key] ?? 0)

        acumulado += valorDia

        /*
         * La producción acumulada ya cubrió por completo
         * la meta de este día.
         */
        if (qty >= acumulado) {
            result[key] = String(valorDia)

            result[statusKey] = (
                valorDia > 0
                    ? "complete"
                    : "pending"
            ) satisfies DailyStatus

            continue
        }

        /*
         * Ya encontramos anteriormente el día donde se terminó
         * la producción disponible. Por eso, los días posteriores
         * muestran exclusivamente el valor original del plan.
         */
        if (diaEnProcesoEncontrado) {
            result[key] = String(valorDia)
            result[statusKey] = "pending" satisfies DailyStatus
            continue
        }

        diaEnProcesoEncontrado = true

        const faltante = acumulado - qty

        const producidoDia = Math.max(
            valorDia - faltante,
            0
        )

        /*
         * Si el plan del día es cero, mostramos únicamente 0.
         * Evitamos mostrar 0 / 0.
         */
        result[key] =
            valorDia === 0
                ? "0"
                : `${producidoDia} / ${valorDia}`

        /*
         * Si no existe plan para el día, no se colorea.
         */
        if (valorDia === 0) {
            result[statusKey] = "pending" satisfies DailyStatus
            continue
        }

        /*
         * Día anterior al actual y todavía incompleto:
         * producción atrasada.
         */
        if (i < diaActual) {
            result[statusKey] = "delayed" satisfies DailyStatus
            continue
        }

        /*
         * Día actual en proceso.
         */
        if (producidoDia > 0 || i === diaActual) {
            result[statusKey] = "progress" satisfies DailyStatus
            continue
        }

        result[statusKey] = "pending" satisfies DailyStatus
    }

    result.acumulate = Array.from(
        { length: diaActual },
        (_, index) => {
            const key = `d${index + 1}`
            return Number(row[key] ?? 0)
        }
    ).reduce((total, value) => total + value, 0)

    return result
}