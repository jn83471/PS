import { DownloadPlan } from "../../api/DownloadApis"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePlan, GetPlans } from "../../api/PlanApi";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { MauiTable } from "../../components/Gnr/MauiTable";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import ExcelPreview from "../../components/Gnr/ExcelPreview";
import type { UploadPlanSchemaForm } from "../../types/PlanForms";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const PlanTable = () => {
  const DownloadFile = () => {
    DownloadPlan()
  }
  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
  const [modal, setModal] = useState(false)
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


  const queryClient = useQueryClient()

  const column: GridColDef[] = [
    { field: 'machine', headerName: 'Código', maxWidth: 300, pinnable: true },
    { field: 'Capacity', headerName: 'Capacidad', maxWidth: 300 },
    { field: 'Line', headerName: 'Línea', maxWidth: 300, width: 200 },
    { field: 'Program', headerName: 'Program', maxWidth: 300, width: 200 },
    { field: 'Shift', headerName: 'Shift', maxWidth: 300, width: 200 },
    { field: 'PartNumber', headerName: 'numero de parte', maxWidth: 300, width: 200 },
    { field: 'Customer', headerName: 'Cliente', maxWidth: 300, width: 200 },
    { field: 'LevenDesign', headerName: 'Nivel de diseño', maxWidth: 300, width: 200 },
    { field: 'Shortpart', headerName: 'Shortpart', maxWidth: 300, width: 200 },
    { field: 'Kmh', headerName: 'Kmh', maxWidth: 300, width: 200 },
    { field: 'd1', headerName: 'd1', maxWidth: 300, width: 200 },
    { field: 'd2', headerName: 'd2', maxWidth: 300, width: 200 },
    { field: 'd3', headerName: 'd3', maxWidth: 300, width: 200 },
    { field: 'd4', headerName: 'd4', maxWidth: 300, width: 200 },
    { field: 'd5', headerName: 'd5', maxWidth: 300, width: 200 },
    { field: 'd6', headerName: 'd6', maxWidth: 300, width: 200 },
    { field: 'd7', headerName: 'd7', maxWidth: 300, width: 200 },
    { field: 'd8', headerName: 'd8', maxWidth: 300, width: 200 },
    { field: 'd9', headerName: 'd9', maxWidth: 300, width: 200 },
    { field: 'd10', headerName: 'd10', maxWidth: 300, width: 200 },
    { field: 'd11', headerName: 'd11', maxWidth: 300, width: 200 },
    { field: 'd12', headerName: 'd12', maxWidth: 300, width: 200 },
    { field: 'd13', headerName: 'd13', maxWidth: 300, width: 200 },
    { field: 'd14', headerName: 'd14', maxWidth: 300, width: 200 },
    { field: 'd15', headerName: 'd15', maxWidth: 300, width: 200 },
    { field: 'd16', headerName: 'd16', maxWidth: 300, width: 200 },
    { field: 'd17', headerName: 'd17', maxWidth: 300, width: 200 },
    { field: 'd18', headerName: 'd18', maxWidth: 300, width: 200 },
    { field: 'd19', headerName: 'd19', maxWidth: 300, width: 200 },
    { field: 'd20', headerName: 'd20', maxWidth: 300, width: 200 },
    { field: 'd21', headerName: 'd21', maxWidth: 300, width: 200 },
    { field: 'd22', headerName: 'd22', maxWidth: 300, width: 200 },
    { field: 'd23', headerName: 'd23', maxWidth: 300, width: 200 },
    { field: 'd24', headerName: 'd24', maxWidth: 300, width: 200 },
    { field: 'd25', headerName: 'd25', maxWidth: 300, width: 200 },
    { field: 'd26', headerName: 'd26', maxWidth: 300, width: 200 },
    { field: 'd27', headerName: 'd27', maxWidth: 300, width: 200 },
    { field: 'd28', headerName: 'd28', maxWidth: 300, width: 200 },
    { field: 'd29', headerName: 'd29', maxWidth: 300, width: 200 },
    { field: 'd30', headerName: 'd30', maxWidth: 300, width: 200 },
    { field: 'd31', headerName: 'd31', maxWidth: 300, width: 200 },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => { }}
            style={{
              marginRight: 8,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <FontAwesomeIcon icon={faEdit} className='pr-1' />
            Editar
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => { }}
          >
            <FontAwesomeIcon icon={faTrash} className='pr-1' />
            Eliminar
          </Button>
        </>
      ),
    },

  ];

  /*modal variables*/
  const initialValues: UploadPlanSchemaForm = {
    fecha: fecha?.format("YYYY-MM-DD"),
    plan: undefined as File | undefined

  }

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

  const HandleSubmitCreateSuppliers = (formData: UploadPlanSchemaForm) => {
    console.log(formData)
    mutate(formData)
  }


  const { register, handleSubmit, setValue } = useForm({ defaultValues: initialValues })


  return (
    <>
      <div className="flex-1 min-w-0 sm:p-4">

        <div className='bg-white border border-gray-400 rounded-xl py-5 px-2 w-full min-h-[75vh] relative'>
          <section className="flex flex-col sm:flex-row justify-between">

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
            </div>



          </section>
          <MauiTable rowspaning={false} setId={null} title='' data={data} setModal={null} columns={column} text={"Nueva planta"} />
        </div>

        {modal &&
          <form onSubmit={handleSubmit(HandleSubmitCreateSuppliers)} className='fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center text-black'>
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
      </div>
    </>
  )
}
