import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import type { MachineForm } from "../../types/MachineForm";
import type { Plant, PlantSchema } from "../../types/PlantForms";
import { CreateMachine, UpdateMachines } from "../../api/MachineApis";
import { ErrorMessage } from "../Gnr/ErrorMessage";
import { useAuth } from "../../hook/useAuth";
import type { Code } from "../../types/CodeSchema";
import type { Client } from "../../types/ClientSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusinessTime, faCancel, faClose, faComputer, faPlus } from "@fortawesome/free-solid-svg-icons";

type MachineEditModalProp = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    plant: Plant[]
    code: Code[]
    Client: Client[],
    datas:MachineForm,
    id:number
}
export const MachineEditModal = ({ setModal, plant, code, Client,datas,id }: MachineEditModalProp) => {
    console.log(plant)
    const Navigate = useNavigate()
    const user = useAuth()
    const initialValues: MachineForm = {
        PlantId: datas.PlantId,
        CodesId: datas.CodesId,
        ClientsId: datas.ClientsId,
        machineCode: datas.machineCode

    }

    const { mutate } = useMutation({
        mutationFn: UpdateMachines,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setModal(false)
        }
    })

    const HandleSubmitCreateSuppliers = (formData: MachineForm) => {
        const data={
            formData,
            id
        }
        mutate(data)
    }

    const { data, isError, isLoading } = useAuth()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: initialValues })

    return (

        <div id="page" className="w-screen h-screen bg-[rgba(0,0,0,.7)] transition-colors duration-500 p-2 md:p-10 absolute top-0 left-0
      ">

            <form onSubmit={handleSubmit(HandleSubmitCreateSuppliers)} id="wrapper" className="w-full h-full">

                <div id="modal" className="w-[80%] max-w-[500px] rounded-xl bg-gray-800 shadow shadow-[rgba(255,255,255,.7)] text-center antialiased px-1 py-3 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className='text-white border-b py-4 border-b-amber-50 flex justify-between px-5'>
                        <div className="text-2xl font-bold">
                            <FontAwesomeIcon icon={faComputer} className="pr-2" />
                            Editar linea
                        </div>
                        <div className='relative'>
                            <button onClick={() => setModal(false)} className='bg-red-700 rounded-3xl w-[30px] h-[30px] hover:bg-red-800'>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>
                    <div className='py-5 text-left px-4'>
                        {user?.data?.PlantId==null && (
                            <div>
                                <label className="text-sm text-gray-300">Planta:</label>
                                <select className="w-full outline-none rounded bg-gray-900 p-2 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("PlantId", {
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
                                <select className="w-full outline-none rounded bg-gray-900 p-2 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("ClientsId", {
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
                                <select className="w-full outline-none rounded bg-gray-900 p-2 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("CodesId", {
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
                                    className="w-full outline-none rounded bg-gray-900 p-2 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950"
                                    {...register("machineCode", {
                                        required: "La linea es obligatoria"
                                    })}
                                />
                                {errors.machineCode && (
                                    <ErrorMessage Text={errors.machineCode.message!} />
                                )}
                            </div>
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
/*<div className="fixed overflow-y-auto top-0 w-full left-0 h-full bg-[rgba(0,0,0,.7)]">
            <div className="absolute bg-[rgba(0,0,0,.7)] w-full h-full flex justify-center items-center">
                <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0 shadow shadow-[rgba(251,251,251,.5)] rounded-2xl w-screen max-w-[600px]">
                    <form onSubmit={handleSubmit(HandleSubmitCreateSuppliers)} className="inline-block align-center bg-zinc-800! rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle w-full">
                        <div className="bg-black px-4 py-3 text-center">
                            <h3 className="text-2xl font-bold">
                                Crear Proveedores
                            </h3>
                        </div>

                        <div className="bg-zinc-800! px-4 pb-3">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-300">Planta:</label>
                                    <select className="w-full outline-none rounded-xl bg-zinc-800 p-2 mt-2 mb-3 border border-white" {...register("PlantId", {
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
                            </div>
                        </div>
                        <div className="bg-zinc-800! px-4 pb-3">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-300">Cliente:</label>
                                    <select className="w-full outline-none rounded-xl bg-zinc-800 p-2 mt-2 mb-3 border border-white" {...register("ClientsId", {
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
                        </div>
                        <div className="bg-zinc-800! px-4 pb-3">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-300">Código:</label>
                                    <select className="w-full outline-none rounded-xl bg-zinc-800 p-2 mt-2 mb-3 border border-white" {...register("CodesId", {
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
                        </div>
                        <div className="bg-zinc-800! px-4 pb-3">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-300">Nombre:</label>
                                    <input
                                        type="Nombre de maquina"
                                        placeholder="Your email address"
                                        className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        {...register("machineCode", {
                                            required: "El Email es obligatorio"
                                        })}
                                    />
                                    {errors.machineCode && (
                                        <ErrorMessage Text={errors.machineCode.message!} />
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="bg-black px-4 py-3 text-right">
                            <button onClick={() => setModal(false)} type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" ><i className="fas fa-times"></i> Cancel</button>
                            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"><i className="fas fa-plus"></i> Create</button>
                        </div>
                    </form>
                </div>

            </div>

        </div>*/