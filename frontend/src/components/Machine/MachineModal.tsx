import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { MachineForm } from "../../types/MachineForm";
import type { Plant } from "../../types/PlantForms";
import { CreateMachine } from "../../api/MachineApis";
import { ErrorMessage } from "../Gnr/ErrorMessage";
import { useAuth } from "../../hook/useAuth";
import type { Code } from "../../types/CodeSchema";
import type { Client } from "../../types/ClientSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusinessTime, faCancel, faClose, faSave } from "@fortawesome/free-solid-svg-icons";

type PlantsModalProp = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    plant: Plant[]
    code: Code[]
    Client: Client[]
}
export const MachineModal = ({ setModal, plant, code, Client }: PlantsModalProp) => {
    console.log(plant)
    const user = useAuth()
    const initialValues: MachineForm = {
        PlantId: 0,
        CodesId: 0,
        ClientsId: 0,
        machineCode: ''

    }

    const { mutate } = useMutation({
        mutationFn: CreateMachine,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setModal(false)
        }
    })

    const HandleSubmitCreateMachines = (formData: MachineForm) => {
        mutate(formData)
    }


    const { register, handleSubmit, formState: { errors } } = useForm<MachineForm>({ defaultValues: initialValues })

    return (

        <div id="page" className="w-screen h-screen  bg-[rgba(0,0,0,.7)] transition-colors duration-500 p-2 md:p-10 fixed top-0 left-0
      ">

            <form onSubmit={handleSubmit(HandleSubmitCreateMachines)} id="wrapper" className="w-full h-full">

                <div id="modal" className="w-[80%] bg-white max-w-[500px] rounded-xl shadow shadow-[rgba(255,255,255,.7)] text-center antialiased relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-t-2xl">
                    <div className='text-white border-b py-4 bg-blue-900 flex justify-between px-5 rounded-t-2xl'>
                        <div>
                            <div className="text-2xl font-bold">
                                <FontAwesomeIcon icon={faBusinessTime} className="pr-2" />
                                Línea
                            </div>
                            <div className="text-sm text-gray-300">
                                Crear línea
                            </div>
                        </div>
                        <div className='relative'>
                            <button onClick={() => setModal(false)} className=' rounded-3xl w-[30px] h-[30px] text-2xl'>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>
                    <div className='py-5 text-left px-4'>
                        {user?.data?.PlantId == null && (

                            <div>
                                <label className="text-sm text-gray-300">Planta:</label>
                                <select className="w-full outline-none rounded  p-2 mt-2 mb-3 border border-gray-200 in:border-blue-500
                        focus:outline-none
                    focus:border-blue-500
                    hover:border-blue-500
                    active:border-blue-500" {...register("PlantId", {
                                    required: "El numero de estacionamientos es obligatorio"
                                })}>
                                    {plant?.map((m) => (
                                        <option value={m.id}>{m.name}</option>
                                    ))}


                                </select>
                                {errors.machineCode && (
                                    <ErrorMessage Text={errors.machineCode.message!} />
                                )}
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-300">Cliente:</label>
                                <select className="w-full outline-none rounded  p-2 mt-2 mb-3 border border-gray-200 in:border-blue-500
                        focus:outline-none
                    focus:border-blue-500
                    hover:border-blue-500
                    active:border-blue-500" {...register("ClientsId", {
                                    required: "El numero de estacionamientos es obligatorio"
                                })}>
                                    {Client?.map((m) => (
                                        <option value={m.id}>{m.name}</option>
                                    ))}


                                </select>
                                {errors.ClientsId && (
                                    <ErrorMessage Text={errors.ClientsId.message!} />
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-300">Código:</label>
                                <select className="w-full outline-none rounded  p-2 mt-2 mb-3 border border-gray-200 in:border-blue-500
                        focus:outline-none
                    focus:border-blue-500
                    hover:border-blue-500
                    active:border-blue-500" {...register("CodesId", {
                                    required: "El numero de estacionamientos es obligatorio"
                                })}>
                                    {code?.map((m) => (
                                        <option value={m.id}>{m.name}</option>
                                    ))}


                                </select>
                                {errors.machineCode && (
                                    <ErrorMessage Text={errors.machineCode.message!} />
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-300">Nombre:</label>
                                <input
                                    type="Nombre de maquina"
                                    placeholder="Inserte la linea"
                                    className="w-full outline-none rounded border-gray-200 px-2 py-2 mt-2 mb-3 border 
                in:border-blue-500
                        focus:outline-none
                    focus:border-blue-500
                    hover:border-blue-500
                    active:border-blue-500"
                                    {...register("machineCode", {
                                        required: "La linea es obligatoria"
                                    })}
                                />
                                {errors.machineCode && (
                                    <ErrorMessage Text={errors.machineCode.message!} />
                                )}
                            </div>
                        </div>

                    </div>
                    

                    <div className="px-4 py-3 text-right border-t">
                        <button onClick={() => setModal(false)} type="button" className="py-2 px-4 bg-gray-200 text-black rounded hover:bg-gray-700 mr-2">
                            <FontAwesomeIcon icon={faCancel} /> Cancel
                        </button>
                        <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                            <FontAwesomeIcon icon={faSave} /> Crear
                        </button>
                    </div>

                </div>

            </form>

        </div>

    )
}
