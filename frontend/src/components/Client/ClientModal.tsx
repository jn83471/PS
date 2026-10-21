import { faBusinessTime, faCancel, faClose, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMutation } from "@tanstack/react-query";
import type { Code } from "../../types/CodeSchema";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../Gnr/ErrorMessage";
import type { ClientForm } from "../../types/ClientSchema";
import { CreateClient } from "../../api/ClientApis";
type ClientModalProp = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  code: Code[]
}
export const ClientModal = ({ setModal, code }: ClientModalProp) => {
  const initialValues: ClientForm = {
    name: '',
    defaultCode: 0

  }
  const { mutate } = useMutation({
    mutationFn: CreateClient,
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
  const HandleSubmitCreatePlants = (formData: ClientForm) => {
    mutate(formData)
  }
  return (
    <div id="page" className="w-screen h-screen bg-[rgba(0,0,0,.7)] transition-colors duration-500 p-2 md:p-10 fixed top-0 left-0
      ">

      <form onSubmit={handleSubmit(HandleSubmitCreatePlants)} id="wrapper" className="w-full h-full">

        <div id="modal" className="w-[80%] max-w-[500px] rounded-xl bg-gray-800 shadow shadow-[rgba(255,255,255,.7)] text-center antialiased px-1 py-3 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className='text-white border-b py-4 border-b-amber-50 flex justify-between px-5'>
            <div className="text-2xl font-bold">
              <FontAwesomeIcon icon={faBusinessTime} className="pr-2" />
              Crear Cliente
            </div>
            <div className='relative'>
              <button onClick={() => setModal(false)} className='bg-red-700 rounded-3xl w-[30px] h-[30px] hover:bg-red-800'>
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
          </div>
          <div className='py-5 text-left px-4'>
            <div>
              <label className="text-xl mb-2 text-gray-300 block">Codigo:</label>
              <select className="w-full outline-none rounded bg-gray-900 p-2 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950"  {...register("defaultCode", {
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
              <input className="w-full outline-none rounded bg-gray-900 px-2 py-1 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("name", {
                required: "El nombre es obligatorio"
              })} />

              {errors.name && (
                <ErrorMessage Text={errors.name.message!} />
              )}
            </div>
            {/*<div>
              <label className="text-xl mb-2 text-gray-300 block">Tipo:</label>
              <select className="w-full outline-none rounded bg-gray-900 p-2 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" name="PlantId">
                <option value="1">ACS</option>
                <option value="2">IGHS</option>
                <option value="3">POP</option>
              </select>
            </div>*/}
          </div>
          {/*"name":"Planta 2",
    "code":1,
    "type":1*/}

          <div className="px-4 py-3 text-right border-t">
            <button onClick={() => setModal(false)} type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2">
              <FontAwesomeIcon icon={faCancel} /> Cancel
            </button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
              <FontAwesomeIcon icon={faPlus} /> Crear
            </button>
          </div>

        </div>

      </form>

    </div>
  )
}
