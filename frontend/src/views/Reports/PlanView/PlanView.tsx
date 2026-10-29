//Plan View anterior

/*

import React, { useEffect, useMemo, useState } from 'react'
import { MauiTable } from '../../../components/Gnr/MauiTable';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { GetPlanView } from '../../../api/PlanApi';
import { DownloadPlan } from '../../../api/DownloadApis';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { createPlanviewColumns } from '../../../Utils/PlanView/CreatePlanViewColumn';
import { isMobile, isTabletOnly } from '../../../Utils/Media';
import { PlanViewDesktop } from './PlanViewDesktop';
import { PlanViewMobile } from './PlanViewMobile';

export const PlanView = () => {
  const DownloadFile = () => {
    DownloadPlan()
  }
  const [shift, setShift] = useState(0)
  const [machine, setMachine] = useState("")
  const [machines, setMachines] = useState([])

  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['PlanView', fecha?.format("YYYY-MM-DD"), shift],
    queryFn: () => GetPlanView(fecha?.format("YYYY-MM-DD"), shift),
    retry: false,
    refetchInterval: 30000
  })

  useEffect(() => {
    if (data?.plan) {
      console.log(data?.plan.map(x => x.machine))
      setMachines([...new Set(data?.plan.map(x => x.machine))])
    }
  }, [data]);


  //Aquí abre comentario:

  /*
  const plan = useMemo(() => {
    const newPlan: any[] = [];
    data?.plan?.forEach(x => {

      if (machine !== "") {

        if (machine == x.machine) {
          const dt = x
          dt.qty = data.send.find(y => y.line_c == x.machine && y.line_c == x.machine && y.ShortPart == x.Shortpart)?.total
          newPlan.push(dt)
        }
      }
      else {
        const dt = x
        dt.qty = data.send.find(y => y.line_c == x.machine && y.line_c == x.machine && y.ShortPart == x.Shortpart)?.total
        newPlan.push(dt)
      }

    })
    return newPlan
  }, [machine, data]);

//Aquí cerrar comentario


  const plan = useMemo(() => {
    const newPlan: any[] = [];

    data?.plan?.forEach(x => {

      const qty =
        data.send.find(
          y =>
            y.line_c === x.machine &&
            y.ShortPart === x.Shortpart
        )?.total ?? 0;

      const acumulado =
        (x.d1 || 0) +
        (x.d2 || 0) +
        (x.d3 || 0) +
        (x.d4 || 0) +
        (x.d5 || 0) +
        (x.d6 || 0) +
        (x.d7 || 0) +
        (x.d8 || 0) +
        (x.d9 || 0) +
        (x.d10 || 0) +
        (x.d11 || 0) +
        (x.d12 || 0) +
        (x.d13 || 0) +
        (x.d14 || 0) +
        (x.d15 || 0) +
        (x.d16 || 0) +
        (x.d17 || 0) +
        (x.d18 || 0) +
        (x.d19 || 0) +
        (x.d20 || 0) +
        (x.d21 || 0) +
        (x.d22 || 0) +
        (x.d23 || 0) +
        (x.d24 || 0) +
        (x.d25 || 0) +
        (x.d26 || 0) +
        (x.d27 || 0) +
        (x.d28 || 0) +
        (x.d29 || 0) +
        (x.d30 || 0) +
        (x.d31 || 0);

      // Ocultar registros sin plan y sin producción
      if (
        !x.Shortpart ||
        x.Shortpart.trim() === "" ||
        (qty <= 0 && acumulado <= 0)
      ) {
        return;
      }

      const dt = {
        ...x,
        qty
      };

      if (machine === "" || machine === x.machine) {
        newPlan.push(dt);
      }
    });

    return newPlan;
  }, [machine, data]);



  const column: GridColDef[] = createPlanviewColumns();

  return (

    isMobile && !isTabletOnly ?
      <PlanViewMobile machine={machine} setMachine={setMachine} machines={machines} setMachines={setMachines} />
      :
      <PlanViewDesktop fecha={fecha} setFecha={setFecha} shift={shift} setShift={setShift} machine={machine} setMachine={setMachine} machines={machines} setMachines={setMachines} plan={plan} column={column} />

  )
}

*/

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
    const [machine, setMachine] = useState<string>("")
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

    /*
     * Lista de líneas disponible para el selector.
     * Se eliminan valores vacíos y duplicados.
     */
    useEffect(() => {
        if (!data?.plan) {
            setMachines([])
            return
        }

        const nuevasLineas = [
            ...new Set(
                data.plan
                    .map((row: PlanViewRow) => row.machine)
                    .filter(
                        (value: unknown): value is string =>
                            typeof value === "string" &&
                            value.trim() !== ""
                    )
            )
        ].sort()

        setMachines(nuevasLineas)
    }, [data])

    /*
     * Une el plan con la producción real y aplica los filtros:
     *
     * 1. Shortpart debe tener valor.
     * 2. Debe existir plan, producción o ambos.
     * 3. Se aplica el filtro por línea.
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
                        return Number(row[key] ?? 0)
                    }
                ).reduce(
                    (total, value) => total + value,
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

                const qty = Number(row.qty ?? 0)
                const acumuladoTotal = Number(
                    row.acumuladoTotal ?? 0
                )

                /*
                 * Ocultar solamente cuando no hay producción
                 * ni tampoco planeación.
                 */
                if (
                    qty <= 0 &&
                    acumuladoTotal <= 0
                ) {
                    return false
                }

                /*
                 * Filtro por línea.
                 */
                if (
                    machine !== "" &&
                    row.machine !== machine
                ) {
                    return false
                }

                return true
            })
    }, [data, machine])

    /*
     * Se transforma una sola vez y el resultado se comparte
     * entre escritorio y móvil.
     */
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
            //column={columns}
        />
    )
}