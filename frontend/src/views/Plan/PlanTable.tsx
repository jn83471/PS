import { DownloadPlan } from "../../api/DownloadApis"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePlan, DeletePlan, GetPlans } from "../../api/PlanApi";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { MauiTable } from "../../components/Gnr/MauiTable";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit, faGear, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import ExcelPreview from "../../components/Gnr/ExcelPreview";
import type { UploadPlanSchemaForm } from "../../types/PlanForms";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { PlanModal } from "../../components/Plan/PlanModal";
import { PlanEditModal } from "../../components/Plan/PlanEditModal";
import { ReactTable } from "../../components/Gnr/ReactTable";
import type { ColDef } from "ag-grid-community";

export const PlanTable = () => {
  const DownloadFile = () => {
    DownloadPlan()
  }
  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
  const [modal, setModal] = useState(false)
  const [modalAddToEdit, setModalAddToEdit] = useState(false)
  const [selectPlan, setSelectPlan] = useState(null)

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['Plans'],
    queryFn: () => GetPlans(fecha?.format("YYYY-MM-DD")),
    //enabled: !fecha,
    retry: false
  })

  const [file, setFile] = useState<File | null>(null);
  const [errors, setError] = useState("");

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    /*const validated =
      excelFileSchema.safeParse(selected);
    if (!validated.success) {
      setError(
        validated.error.issues[0].message
      );
      return;
    }*/
    setValue("plan", selected, {
      shouldValidate: true,
    });
    setError("");
    setFile(selected);
  };
  const { mutate } = useMutation({
    mutationFn: CreatePlan,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success("Se ha guardado correctamente la información")
      refetch()
      setModal(false)
    }
  })

  const DeletePlans = useMutation({
    mutationFn: DeletePlan,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success("Se ha eliminado el plan")
      refetch()
      setModal(false)
    }
  })

  const queryClient = useQueryClient()

  const HandleDeletePlan = async (id) => {
    const resp = await Swal.fire({
      title: "Desea eliminar del plan de produccion?",
      text: "",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    })
    if (resp.isConfirmed) {
      DeletePlans.mutate(id)
    }
  }

  const [machine, setMachine] = useState("")
  const [machines, setMachines] = useState([])
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.innerWidth >= 1660
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1660);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const column: ColDef[] = [
    {
      field: "machine",
      headerName: "Código",
      width: 100,
      pinned: "left",
    },
    {
      field: "Capacity",
      headerName: "Capacidad",
      width: 120,
    },
    {
      field: "Line",
      headerName: "Línea",
      width: 200,
    },
    {
      field: "Program",
      headerName: "Program",
      width: 150,
    },
    {
      field: "Shortpart",
      headerName: "Shortpart",
      width: 130,
      pinned: "left",
    },
    {
      field: "Shift",
      headerName: "Shift",
      width: 90,
      pinned: "left",
    },
    {
      field: "PartNumber",
      headerName: "Número de Parte",
      width: 200,
    },
    {
      field: "Customer",
      headerName: "Cliente",
      width: 180,
    },
    {
      field: "LevenDesign",
      headerName: "Nivel Diseño",
      width: 180,
    },

    {
      field: "Kmh",
      headerName: "Kmh",
      width: 120,
    },

    ...Array.from({ length: 31 }, (_, i) => ({
      field: `d${i + 1}`,
      headerName: `D${i + 1}`,
      width: 85,
    })),

    {
      field: "acciones",
      headerName: "Acciones",
      width: 250,
      pinned: isLargeScreen ? "right" : false,
      cellRenderer: (params: any) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setModalAddToEdit(true);
              setSelectPlan(params.data);
            }}
            style={{
              marginRight: 8,
            }}
          >
            <FontAwesomeIcon
              icon={faEdit}
              className="pr-1"
            />
            Editar
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() =>
              HandleDeletePlan(params.data.id)
            }
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="pr-1"
            />
            Eliminar
          </Button>
        </>
      ),
    },
  ];
  console.log(window.innerWidth)

  /*modal variables*/
  const initialValues: UploadPlanSchemaForm = {
    fecha: fecha?.format("YYYY-MM-DD"),
    plan: undefined as File | undefined

  }



  const HandleSubmitCreateSuppliers = (formData: UploadPlanSchemaForm) => {
    console.log(formData)
    mutate(formData)
  }


  const { register, handleSubmit, setValue } = useForm({ defaultValues: initialValues })


  return (
    <>
      <div className="flex-1 min-w-0 sm:p-4">

        <div className='bg-white border border-gray-400 rounded-xl py-5 px-2 w-full min-h-[75vh] relative'>
          <div className="flex flex-row items-center border-b border-gray-200 py-2">
            <div className="flex-1">
              <div className="text-3xl font-bold">
                Plan de producción
              </div>
              <div className="text-gray-400 text-sm">
                Consulta y seguimiento de la producción
              </div>
            </div>
          </div>
          <section className="flex flex-col sm:flex-row justify-between py-2">

            <DatePicker
              label="Years in descending order"
              openTo="year"
              views={['year', 'month']}
              yearsOrder="desc"
              value={fecha}
              onChange={async (newValue) => {
                await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                setValue("fecha", fecha?.format("YYYY-MM-DD"))
                refetch()
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
            <div className="py-2 sm:py-0">
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                onClick={DownloadFile}>Descargar</button>
              <button className="mt-2 sm:mt-0 mx-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                onClick={() => setModal(true)}>Subir</button>
              <button className="mt-2 sm:mt-0 mx-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                onClick={() => {
                  setModalAddToEdit(true)
                  setSelectPlan(null)
                }}>Nuevo</button>
            </div>



          </section>
          <ReactTable rowspaning={false} setId={null} title='' data={data} setModal={null} columns={column} text={"Nueva planta"} />
        </div>

        {modal &&
          <form onSubmit={handleSubmit(HandleSubmitCreateSuppliers)} className='fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center text-black z-50'>
            <div className="bg-white border border-amber-50 w-[1200px] max-w-[100%] min-h-[400px] rounded-2xl shadow-2xs shadow-black/75 p-4">
              <div className="flex flex-row items-center gap-2">
                <div>
                  <div className="bg-green-800 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="text-2xl text-white" icon={faGear} />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    Subir Plan de producción
                  </h2>
                  <small className="text-gray-600">
                    Subir plan de produccion de los meses seleccionados
                  </small>
                </div>
              </div>
              <div className="py-4">
                <div className="flex flex-row">

                  <DatePicker
                    label="Years in descending order"
                    openTo="year"
                    views={['year', 'month']}
                    yearsOrder="desc"
                    value={fecha}
                    onChange={async (newValue) => {
                      await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                      refetch()
                    }}
                    sx={{
                      '& .MuiInputBase-input': {

                        color: '#fff',
                      },
                      '& .MuiInputLabel-root': {
                        color: '#ccc',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#113b2b',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: 'black',
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
                        color: 'black',
                        opacity: 1,
                      },
                    }}

                  />
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={
                      handleFile
                    }
                    className="border border-gray-300 rounded ml-2 flex justify-center items-center text-center py-3 px-3"
                  />

                </div>

              </div>
              <div className="h-[40vh] flex w-full flex-row justify-center">
                {file && (

                  <ExcelPreview file={file} />

                )}
              </div>
              <div className="flex justify-end pr-4">
                <button onClick={() => setModal(false)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-white mr-2">
                  Cancelar
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white">
                  Guardar
                </button>
              </div>

            </div>
          </form>}
        {
          (modalAddToEdit && !selectPlan) &&
          <PlanModal setModalAddToEdit={setModalAddToEdit} refetch={refetch} />
        }
        {
          (modalAddToEdit && selectPlan) &&
          <PlanEditModal plan={selectPlan} setModalAddToEdit={setModalAddToEdit} refetch={refetch} />
        }
      </div>
    </>
  )
}
