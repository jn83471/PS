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
*/
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
      if (qty <= 0 && acumulado <= 0) {
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
