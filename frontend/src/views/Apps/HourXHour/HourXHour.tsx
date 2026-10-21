import { faArchive, faBagShopping, faBarChart, faBarsProgress, faBoxes, faBullseye, faCalculator, faCalendarDays, faClock, faEraser, faGear, faPieChart, faSave, faWarning } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import OutlinedInput from "@mui/material/OutlinedInput"
import { LineGraphTest } from "../../../components/Gnr/LineGraphTest"
import { CustomSelect } from "./CustomSelect"
import { useForm, useWatch } from "react-hook-form"
import { GetMachines } from "../../../api/MachineApis"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GetPartNumberMachine } from "../../../api/PlanApi"
import type { HourByHourForm } from "../../../types/HourByHour/HourByHourSchema"
import { HourByHourGetAllInfo } from "../../../api/Apps/HourByHour/HourByHourApi"
import { toast } from "react-toastify"
import { useMemo, useState } from "react"
import { HourByHourCard } from "../../../components/Apps/HourByHour/HourByHourCard"
import { Link } from "react-router-dom"
const rowsEmpty = {
  A: [
    "7:00 - 8:00",
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
  ],
  B: [
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
    "22:00 - 23:00",
    "23:00 - 00:00",
    "00:00 - 01:00",
    "01:00 - 02:00"
  ]
}
export const HourXHour = () => {

  const initialValues: HourByHourForm = {
    Shift: 1,
    SupervisorMFG: '',
    LiderMFG: '',
    Machine: 0,
    PartNumber: '',
    Plan: 0
  }



  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm({ defaultValues: initialValues })
  const { Shift, SupervisorMFG, LiderMFG, Machine, PartNumber, Plan } = watch()


  const Machines = useQuery({
    queryKey: ['Machine'],
    queryFn: GetMachines,
    retry: false,
    enabled: LiderMFG != ""
  })

  const PartNumbers = useQuery({
    queryKey: ['PartNumbers',Machine],
    queryFn: () => GetPartNumberMachine(Machine),
    retry: false,
    enabled: Machine != 0
  })
  const OptionMachines = Machines.data?.map(x => ({
    value: x.id,
    label: x.machineCode
  })) ?? []
  const OptionPartNumbers = PartNumbers.data?.map(x => ({
    value: x.PartNumber,
    label: x.PartNumber
  })) ?? []

  const [info, setInfo] = useState(null)

  const { mutate } = useMutation({
    mutationFn: HourByHourGetAllInfo,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      console.log(data)
      setInfo(data)
      //toast.success(data)
    }
  })

  const HandleCalculateHourByHour = (formData: HourByHourForm) => {
    mutate(formData)
  }

  const tableData = useMemo(() => {
    if (!info) return [];

    let acumuladoPlan = 0;
    let acumuladoReal = 0;
    let acumuladoDef = 0;
    const rows = Shift === 1
      ? rowsEmpty.A
      : rowsEmpty.B;

    return rows.map((hour) => {
      const hora = parseInt(hour.split(":")[0]);

      const planRow = info.info.find(x => x.hour === hora);
      const realRow = info.data.find(x => x.hour === hora);

      acumuladoPlan += planRow?.byHour ?? 0;
      acumuladoReal += realRow?.Qty ?? 0;
      acumuladoDef += realRow?.Def ?? 0;

      return {
        hour,
        plan: planRow?.byHour ?? 0,
        planAccum: acumuladoPlan,
        real: realRow?.Qty ?? 0,
        realAccum: acumuladoReal,
        diff: (realRow?.Qty ?? 0) - (planRow?.byHour ?? 0),
        diffAccum: acumuladoReal - acumuladoPlan,
        defects: acumuladoDef,
        ipd:0
      };
    });
  }, [info, Shift]);

  return (
    <main className="p-2 min-h-screen w-full bg-gray-100/50 flex flex-col max-w-[98vw] overflow-x-hidden">
      <header className="flex flex-row justify-between items-center bg-white px-2 py-2 rounded-xl
      border border-gray-200 shadow gap-2">

        <div className="flex-1 flex items-center gap-2">
          <div>
            <FontAwesomeIcon icon={faBarChart}
              className="text-5xl text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase">
              Producción por hora
            </h1>
            <small className="text-gray-400">
              Control y monitoreo de producción
            </small>
          </div>
        </div>

        <div>
          <div className="flex-1 flex items-center gap-2 border-l border-l-gray-200">
            <div>
              <FontAwesomeIcon icon={faCalendarDays}
                className="text-blue-600 text-4xl" />
            </div>
            <div>
              <h1 className=" uppercase">
                07 OCT 2026
              </h1>
              <small className="text-sm text-gray-400">
                Miercoles
              </small>
            </div>
          </div>
        </div>

        <div>
          <div className="flex-1 items-center gap-2 pl-3 border-l border-l-gray-200 hidden sm:flex">
            <div>
              <FontAwesomeIcon icon={faClock}
                className="text-blue-600 text-4xl" />
            </div>
            <div className="">
              <h1 className="text-lg uppercase">
                15:42
              </h1>
            </div>
          </div>
        </div>
        <div className="border-l border-l-gray-200">
          <Link to={`/HourByHour/Home`}>
          <FontAwesomeIcon icon={faGear}
          className="text-4xl px-2 text-blue-500"/>
          </Link>
        </div>

      </header>

      <form onSubmit={handleSubmit(HandleCalculateHourByHour)} className=" bg-white px-4  rounded-lg
      border border-gray-200 shadow gap-2 my-2 text-sm">
        <div className="flex items-center flex-row gap-2">
          <div>
            <FontAwesomeIcon icon={faArchive}
              className="text-blue-600 " />
          </div>
          <div>
            Datos de producción
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-2 gap-2">
          <div className="">
            <div className="w-full flex flex-row items-center">
              <div className="w-[120px]">
                Turno:
              </div>

              <CustomSelect
                label="Turno"
                value={Shift}
                onChange={(item) => {
                  console.log(item)
                  setValue("Shift", item, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
                options={[
                  { value: 1, label: "Turno 1" },
                  { value: 2, label: "Turno 2" },
                  { value: 3, label: "Turno 3" },
                  { value: 0, label: "Todos" },
                ]}
              />
            </div>


            <div className="w-full flex flex-row items-center py-2">
              <div className="w-[120px]">
                Supervisor MFG:
              </div>
              <div className="flex-1">
                <OutlinedInput value={SupervisorMFG} onChange={(item) => {
                  setValue("SupervisorMFG", item.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }} type="text" className="w-full" sx={{
                  height: 36
                }} />
              </div>

            </div>

            <div className="w-full flex flex-row items-center py-2">
              <div className="w-[120px]">
                Lider MFG:
              </div>
              <div className="flex-1">
                <OutlinedInput disabled={!SupervisorMFG} value={LiderMFG} onChange={(item) => {
                  setValue("LiderMFG", item.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }} type="text" className="w-full
                disabled:bg-gray-300" sx={{
                    height: 36
                  }} />
              </div>
            </div>

          </div>
          <div>

            <div className="w-full flex flex-row items-center">
              <div className="w-[120px] md:w-[70px]">
                Linea:
              </div>

              <CustomSelect
                label="Linea"
                value={Machine}
                onChange={(item) => {
                  console.log(item)
                  setValue("Machine", item, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
                disabled={!LiderMFG}
                options={OptionMachines}
              />
            </div>

            <div className="w-full flex flex-row items-center py-2">
              <div className="w-[120px] md:w-[70px]">
                No Parte:
              </div>

              <CustomSelect
                label=""
                value={PartNumber}
                onChange={(item) => {
                  console.log(item)
                  setValue("PartNumber", item, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
                disabled={!Machine}
                options={OptionPartNumbers}
              />
            </div>

          </div>
          <div>
            <div className="w-full flex flex-row items-center">
              <div className="w-[120px] md:w-[70px]">
                Ciclo:
              </div>
              <div className="flex-1">
                <OutlinedInput value={info?.Clicle} disabled type="text" className="w-full" sx={{
                  height: 36,
                  backgroundColor: "rgba(0,0,0,.1)"
                }} />
              </div>
            </div>
            <div className="w-full flex flex-row items-center py-2">
              <div className="w-[120px] md:w-[70px]">
                Plan
                <p className="text-right pr-2 text-gray-600">
                  (Turno):
                </p>
              </div>
              <div className="flex-1">
                <OutlinedInput value={Plan} onChange={(item) => {
                  setValue("Plan", item.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }} disabled={!PartNumber} type="number" className="w-full" sx={{
                  height: 36
                }} />
              </div>
            </div>

          </div>

          <div>
            <div className="w-full flex flex-row items-center">
              <div className="w-[120px] md:w-[100px]">
                Tiempo muerto:
              </div>
              <div className="flex-1">
                <OutlinedInput value={info?.TM} disabled type="text" className="w-full" sx={{
                  height: 36,
                  backgroundColor: "rgba(0,0,0,.1)"
                }} />
              </div>
            </div>
            <div className="w-full flex flex-row items-center py-2">
              <div className="w-[120px] md:w-[100px]">
                Formacion
              </div>
              <div className="flex-1">
                <OutlinedInput disabled={!Plan} type="text" className="w-full" sx={{
                  height: 36
                }} />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <button className="border border-green-700 p-2 rounded-lg text-xl text-green-700 gap-2
            duration-75 ease-in
            hover:bg-green-700 hover:text-white">
              <FontAwesomeIcon icon={faCalculator} />
              Calcular
            </button>

          </div>

        </div>
      </form>
      <section className=" bg-white px-4 py-2 rounded-lg
      border border-gray-200 shadow gap-2 my-2 text-sm">
        <div className="flex items-center flex-row gap-2">
          <div>
            <FontAwesomeIcon icon={faBarsProgress}
              className="text-blue-600 " />
          </div>
          <div>
            Indicadores principales
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <HourByHourCard value={Plan} icon={faBullseye} title={'Meta/Plan'}
            border="border-blue-500" backGround="bg-blue-100/75" textColor="text-blue-600" defects={false} />
          <HourByHourCard value={15} icon={faBoxes} title={'Meta Acumulada'}
            border="border-blue-500" backGround="bg-blue-100/75" textColor="text-blue-600" defects={false} />
          <HourByHourCard value={151} icon={faBagShopping} title={'Real acumulado'}
            border="border-green-500" backGround="bg-green-100/75" textColor="text-green-600" defects={false} />
          <HourByHourCard value={-14} icon={faEraser} title={'Diferencia'}
            border="border-red-500" backGround="bg-red-100/75" textColor="text-red-600" defects={false} />
          <HourByHourCard value={1} icon={faPieChart} title={'IPD'}
            border="border-purple-500" backGround="bg-purple-100/75" textColor="text-purple-600" defects={false} />
          <HourByHourCard value={1} icon={faWarning} title={'Defectos'}
            border="border-red-500" backGround="bg-red-100/75" textColor="text-red-600" defects={true} />
        </div>
      </section>

      <section className=" bg-white  py-2 rounded-lg
      border border-gray-200 shadow gap-2 my-2 text-sm flex-1">
        <div className="flex items-center flex-row gap-2">
          <div>
            <FontAwesomeIcon icon={faBarsProgress}
              className="text-blue-600 " />
          </div>
          <div>
            Detalle por hora
          </div>
        </div>
        <div className="flex flex-col lg:flex-row px-4">
          <div className="flex-1  max-w-[100vw] lg:max-w-[calc(100vw-610px)]">
            <div className="overflow-x-auto relative w-auto rounded-xl">
              <table className="min-w-full  text-left table-auto ">
                <thead className="bg-blue-600">
                  <tr>
                    <th rowSpan={2} className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Horario</th>
                    <th colSpan={2} className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Meta/Plan</th>
                    <th colSpan={2} className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Real Producidas</th>
                    <th colSpan={2} className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Diferencias</th>
                    <th colSpan={2} className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Tiempo muerto</th>
                    <th colSpan={2} className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">IPD</th>
                    <th rowSpan={2} className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Productividad</th>
                  </tr>
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Prz/Hr</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Acum</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Prz/Hr</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Acum</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Prz/Hr</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Acum</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Qty</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Razon</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">Acum</th>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">%Acum</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {tableData.map((row,index) => (
                    <tr key={row.hour} className={`${((index + 1) % 2) == 0 ? "bg-gray-300/30" : "bg-white"} text-center`}>
                      <td className="px-6 py-4 font-bold bg-blue-100/50">{row.hour}</td>
                      <td>{row.plan}</td>
                      <td>{row.planAccum}</td>
                      <td>{row.real}</td>
                      <td>{row.realAccum}</td>
                      <td>{row.diff}</td>
                      <td>{row.diffAccum}</td>
                      <td>0</td>
                      <td>0</td>
                      <td>{row.defects}</td>
                      <td>{row.ipd}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-blue-600 ">
                  <tr>
                    <td className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-white dark:text-gray-400">
                      Totales
                    </td>
                    {info ?
                      <>
                        <td></td>
                        <td className="text-white">{info.info.reduce((acum, element) => acum + element.byHour, 0)}</td>
                        <td></td>
                        <td className="text-white">{info.data.reduce((acum, element) => acum + element.Qty, 0)}</td>
                        {Array.from({ length: 7 }).map(() => (
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-blue-300/20 rounded w-3/4" />
                          </td>))}

                      </>
                      : Array.from({ length: 11 }).map(() => (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 bg-blue-300/20 rounded w-3/4" />
                        </td>
                      ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="lg:w-[600px]">
            {Array.from({ length: 4 }).map((_, index) => (
              <LineGraphTest
                key={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main >
  )
} 
