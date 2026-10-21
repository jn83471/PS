import { faBox, faCancel, faCar, faCircle, faClock, faDashboard, faDiagnoses, faFilePdf, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { CreateUrsRequestFolio, UrsGetPriority } from "../../../../api/Apps/Urs/UrsPriorityApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { UsrGenerateFolio } from "../../../../types/Urs/UrsRequestFolio"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const columns = [
  "MFG",
  "SEWS Part Number",
  "Customer",
  "QTY",
  "Reason",
  "Method",
  "Customer",
]
export const UrsNewRequest = () => {
  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());

  const Navigate = useNavigate()

  const initialValues: UsrGenerateFolio = {
    ProposedDate: dayjs().format("YYYY-MM-DD"),
    UrsPriorityId: 0,
    motive: 'Cust. Increase',
    Hrs: dayjs().format("YYYY-MM-DD HH:mm")
  }
  const { mutate } = useMutation({
    mutationFn: CreateUrsRequestFolio,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {

      toast.success(data)
      Navigate(`/urs/request/${data.id}`)
    }
  })
  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({ defaultValues: initialValues })
  const HandleSubmitFolio = (formData: UsrGenerateFolio) => {
    mutate(formData)
  }

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['UrsPriority'],
    queryFn: UrsGetPriority,
    //enabled: !fecha,
    retry: false
  })
  { isLoading && <></> }

  useEffect(() => {
    const loadData = async () => {
      //await setPlant(data[0].id.toString());
      //console.log(plant)
      setValue("UrsPriorityId", data[0].id, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
    if (data?.length > 0) {
      loadData()
    }
  }, [data]);
  return (
    <>
      <div className="flex flex-col lg:flex-row py-2">
        <div className="flex-1">
          <h1 className="text-4xl font-bold">
            Nueva solicitud de envío
          </h1>
          <small className="text-sm text-gray-500">
            Rastrear, priorizar y coordinar los envíos de materiales críticos.
          </small>
        </div>
        <div className="border border-gray-200 py-2 grid sm:grid-cols-1 md:grid-cols-3 rounded-2xl">
          {/*<div className="border-r  border-r-gray-200 p-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faBox} className="text-3xl text-red-500" />
            <div className="px-2">
              <div>
                Motivo
              </div>
              <div>
                {getValues("motive")}
              </div>
            </div>
          </div>
          <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faCar} className="text-3xl text-green-500" />
            <div className="px-2">
              <div>
                Método
              </div>
              <div>
                {
                  data?.find(x => x.id == getValues("UrsPriorityId"))?.Level == 1 ?
                    <FontAwesomeIcon className="pr-2 text-red-500" icon={faCircle} />
                    :
                    <FontAwesomeIcon className="pr-2 text-gray-500" icon={faCircle} />
                }
                {data?.find(x => x.id == getValues("UrsPriorityId"))?.name}
              </div>
            </div>
          </div>
          <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
            <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
            <div className="px-2">
              <div>
                Fecha propuesta
              </div>
              <div>
                {getValues("ProposedDate")}
              </div>
            </div>
          </div>
*/}
        </div>
      </div>

      <form onSubmit={handleSubmit(HandleSubmitFolio)}>

        <div className="border px-2 border-gray-200 rounded-2xl py-2">
          <div className="border-b flex flex-row px-2 py-3 border-b-gray-300 text-lg items-center">
            <FontAwesomeIcon icon={faFilePdf} className="text-blue-500 text-3xl" />
            <div>
              Datos de la solicitud
            </div>
          </div>
          <div className="py-5 grid sm:grid-cols-2 md:grid-cols-2 gap-2">
            <FormControl sx={{
              display: "none"
            }}>
              <InputLabel className='text-black' id="demo-simple-select-label"
                sx={{
                  color: "black",
                }}
              >Motivo</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={getValues("motive")}
                sx={{
                  color: "black !important",
                  "& .MuiSelect-select": {
                    color: "black",
                    WebkitTextFillColor: 'black !important',
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b82f6",
                  },
                  "& .MuiInputBase-input": {
                    color: "#fff !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60a5fa",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60a5fa",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "black !important",
                  },
                  "& span, legend input": {
                    color: "black !important",
                    fill: "black !important",
                  },
                }}
                onChange={(event) => {
                  setValue("motive", event.target.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <MenuItem value={"Cust. Increase"}>Cust. Increase</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{
              display: "none"
            }}>
              <InputLabel className='text-black' id="demo-simple-select-label"
                sx={{
                  color: "black"
                }}
              >Método</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={getValues("UrsPriorityId")}
                sx={{
                  color: "black !important",
                  "& .MuiSelect-select": {
                    color: "black",
                    WebkitTextFillColor: 'black !important',
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b82f6",
                  },
                  "& .MuiInputBase-input": {
                    color: "#fff !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60a5fa",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#60a5fa",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "black !important",
                  },
                  "& span, legend input": {
                    color: "black !important",
                    fill: "black !important",
                  },
                }}
                onChange={(event) => {
                  setValue("UrsPriorityId", Number(event.target.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <MenuItem value={0}>Select Priority</MenuItem>
                {
                  data?.map((elm) => (
                    <MenuItem sx={{
                    }} value={elm.id} key={`Priority${elm.id}`}>
                      <div>
                        {
                          elm.Level == 1 ?
                            <FontAwesomeIcon className="pr-2 text-red-500" icon={faCircle} />
                            :
                            <FontAwesomeIcon className="pr-2 text-gray-500" icon={faCircle} />
                        }
                        {elm.name}
                      </div>
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <DatePicker
              label="Fecha propuesta"
              openTo="year"
              views={['year', 'month', 'day']}
              yearsOrder="desc"
              value={fecha}
              onChange={async (newValue) => {
                //await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                await setFecha(newValue);
                await setValue("ProposedDate", newValue.format("YYYY-MM-DD"), {
                  shouldValidate: true,
                  shouldDirty: true,
                })

                console.log(fecha)
              }}
              sx={{
                '& .MuiInputBase-input': {

                  color: '#fff',
                },
                '& .MuiInputLabel-root': {
                  color: '#ccc',
                },
                '& .MuiSvgIcon-root': {
                  color: '#fff',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#fff',
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
                  opacity: 1,
                },
              }}

            />
            <FormControl>

              <TimePicker label={'Hora pickup'} value={dayjs(getValues("Hrs"))} views={['hours', 'minutes']} onChange={async (newValue) => {
                //await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                await setValue("Hrs", newValue.format("YYYY-MM-DD HH:mm"), {
                  shouldValidate: true,
                  shouldDirty: true,
                })

                console.log(fecha)
              }} />
            </FormControl>
          </div>


        </div>

        {/*<div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {
                  columns.map((e, index) => (
                    <th key={`col${index}`} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{e}</th>
                  ))
                }

              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 animate-pulse">
              {
                Array.from({ length: 11 }).map((_, index) => (<tr key={`Columns${index}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </td>
                </tr>))
              }


            </tbody>
          </table>
        </div>*/}
        <div className="md:px-4 py-3 flex flex-row justify-end">
          <button type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
            <FontAwesomeIcon icon={faCancel} /> Cancelar
          </button>
          <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
            <FontAwesomeIcon icon={faPlus} /> Guardar
          </button>
        </div>
      </form>

    </>
  )
}
