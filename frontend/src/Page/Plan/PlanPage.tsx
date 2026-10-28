import { DownloadPlan } from "../../api/DownloadApis"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreatePlan, DeletePlan, GetPlans } from "../../api/PlanApi";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faEdit, faGear, faTable, faTrash } from "@fortawesome/free-solid-svg-icons";
import ExcelPreview from "../../components/Gnr/ExcelPreview";
import type { UploadPlanSchemaForm } from "../../types/PlanForms";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { PlanModal } from "../../components/Plan/PlanModal";
import { PlanEditModal } from "../../components/Plan/PlanEditModal";
import { ReactTable } from "../../components/Gnr/ReactTable";
import type { ColDef } from "ag-grid-community";
import { PlanDesktop } from "../../views/Plan/PlanDesktop";

export const PlanPage = () => {
  const DownloadFile = () => {
    DownloadPlan()
  }
  const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
  const [modal, setModal] = useState(false)
  const [modalAddToEdit, setModalAddToEdit] = useState(false)
  const [selectPlan, setSelectPlan] = useState(null)

  const { data, refetch } = useQuery({
    queryKey: ['Plans', fecha?.format("YYYY-MM-DD")],
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





  console.log(window.innerWidth)

  /*modal variables*/
  const initialValues: UploadPlanSchemaForm = {
    fecha: fecha?.format("YYYY-MM-DD"),
    plan: undefined as File | undefined

  }



  const HandleSubmitCreateSuppliers = (formData: UploadPlanSchemaForm) => {
    if(formData.plan==undefined){
      toast.error("Debe seleccionar un archivo")
      return
    }
    console.log(formData)
    mutate(formData)
  }


  const { handleSubmit, setValue } = useForm({ defaultValues: initialValues })
  const lines = data
    ? [... new Set(data.map(m => m.machine) || [])]
    : [];

  return (
    <>
      <PlanDesktop DownloadFile={DownloadFile} fecha={fecha} setFecha={setFecha} setValue={setValue}
        modalAddToEdit={modalAddToEdit} setModalAddToEdit={setModalAddToEdit} setSelectPlan={setSelectPlan}
        data={data} modal={modal} setModal={setModal}
        HandleDeletePlan={HandleDeletePlan} handleSubmit={handleSubmit} HandleSubmitCreateSuppliers={HandleSubmitCreateSuppliers}
        file={file} handleFile={handleFile} selectPlan={selectPlan} refetch={refetch} lines={lines} setFile={setFile}/>
    </>
  )
}
