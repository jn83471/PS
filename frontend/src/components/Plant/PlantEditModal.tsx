import { faBusinessTime, faCancel, faClose, faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMutation } from "@tanstack/react-query";
import type { Code } from "../../types/CodeSchema";
import type { PlantForm } from "../../types/PlantForms";
import { toast } from "react-toastify";
import {  UpdatePlants } from "../../api/PlantsApi";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../Gnr/ErrorMessage";
type PlantModalProp = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  code: Code[],
  data: PlantForm,
  id: number
}
export const PlantEditModal = ({ setModal, data, id, code }: PlantModalProp) => {
  const initialValues: PlantForm = {
    type: data.type,
    name: data.name,
    defaultCode: data.defaultCode

  }
  const { mutate } = useMutation({
    mutationFn: UpdatePlants,
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      setModal(false)
    }
  })
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
  const HandleSubmitCreatePlants = (formData: PlantForm) => {
    const dt = {
      id,
      formData
    }
    mutate(dt)
  }
  return (
    <div id="page" className="w-screen h-screen  bg-[rgba(0,0,0,.7)] transition-colors duration-500 p-2 md:p-10 fixed top-0 left-0
      ">

      <form onSubmit={handleSubmit(HandleSubmitCreatePlants)} id="wrapper" className="w-full h-full">

        <div id="modal" className="w-[80%] bg-white max-w-[500px] rounded-xl shadow shadow-[rgba(255,255,255,.7)] text-center antialiased relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-t-2xl">
          <div className='text-white border-b py-4 bg-blue-900 flex justify-between px-5 rounded-t-2xl'>
            <div>
              <div className="text-2xl font-bold">
                <FontAwesomeIcon icon={faBusinessTime} className="pr-2" />
                Planta
              </div>
              <div className="text-sm text-gray-300">
                Editar planta
              </div>
            </div>
            <div className='relative'>
              <button onClick={() => setModal(false)} className=' rounded-3xl w-[30px] h-[30px] text-2xl'>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          </div>
          <div className='py-5 text-left px-4'>
            <div>
              <label className="text-xl mb-2 text-gray-300 block">Codigo:</label>
              <select className="w-full outline-none rounded  p-2 mt-2 mb-3 border border-gray-200 in:border-blue-500
                        focus:outline-none
                    focus:border-blue-500
                    hover:border-blue-500
                    active:border-blue-500"  {...register("defaultCode", {
                required: "El codigo de planta es obligatorio"
              })}>
                {code?.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              {errors.defaultCode && (
                <ErrorMessage Text={errors.defaultCode.message!} />
              )}
            </div>
            <div>
              <label className="text-xl mb-2 text-gray-300 block">Nombre:</label>
              <input className="w-full outline-none rounded border-gray-200 px-2 py-2 mt-2 mb-3 border 
                in:border-blue-500
                        focus:outline-none
                    focus:border-blue-500
                    hover:border-blue-500
                    active:border-blue-500" {...register("name", {
                required: "El nombre es obligatorio"
              })} />

              {errors.name && (
                <ErrorMessage Text={errors.name.message!} />
              )}
            </div>
          </div>

          <div className="px-4 py-3 text-right border-t">
            <button onClick={() => setModal(false)} type="button" className="py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-700 mr-2">
              <FontAwesomeIcon icon={faCancel} /> Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
              <FontAwesomeIcon icon={faEdit} /> Editar
            </button>
          </div>

        </div>

      </form>

    </div>
  )
}
