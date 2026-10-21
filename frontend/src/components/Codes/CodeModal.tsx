import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ErrorMessage } from '../Gnr/ErrorMessage'
import { faBusinessTime, faCancel, faClose, faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { CreateCode } from '../../api/CodeApi'
import type { CodeForm } from '../../types/CodeSchema'
import { useForm } from 'react-hook-form'
type CodeModalProp = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const CodeModal = ({ setModal }: CodeModalProp) => {
    const initialValues: CodeForm = {
        name: '',
        key: ''

    }
    const { mutate } = useMutation({
        mutationFn: CreateCode,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            setModal(false)
        }
    })
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({ defaultValues: initialValues })
    const HandleSubmitCreatePlants = (formData: CodeForm) => {
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
                            Crear Codigos
                        </div>
                        <div className='relative'>
                            <button onClick={() => setModal(false)} className='bg-red-700 rounded-3xl w-[30px] h-[30px] hover:bg-red-800'>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    </div>
                    <div className='py text-left px-4'>

                        <div>
                            <label className="text-xl mb-2 text-gray-300 block">Nombre:</label>
                            <input className="w-full outline-none rounded bg-gray-900 px-2 py-1 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("name", {
                                required: "El nombre es obligatorio"
                            })} />

                            {errors.name && (
                                <ErrorMessage Text={errors.name.message!} />
                            )}
                        </div>

                    </div>


                    <div className='py text-left px-4'>

                        <div>
                            <label className="text-xl mb-2 text-gray-300 block">LLave:</label>
                            <input className="w-full outline-none rounded bg-gray-900 px-2 py-1 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("key", {
                                required: "El nombre es obligatorio"
                            })} />

                            {errors.key && (
                                <ErrorMessage Text={errors.key.message!} />
                            )}
                        </div>

                    </div>
                    <div className='py text-left px-4'>

                        <div>
                            <label className="text-xl mb-2 text-gray-300 block">Servidor:</label>
                            <input className="w-full outline-none rounded bg-gray-900 px-2 py-1 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("server", {
                                required: "El nombre es obligatorio"
                            })} />

                            {errors.server && (
                                <ErrorMessage Text={errors.server.message!} />
                            )}
                        </div>

                    </div>

                    <div className='py text-left px-4'>

                        <div>
                            <label className="text-xl mb-2 text-gray-300 block">Database:</label>
                            <input className="w-full outline-none rounded bg-gray-900 px-2 py-1 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("db", {
                                required: "El nombre es obligatorio"
                            })} />

                            {errors.db && (
                                <ErrorMessage Text={errors.db.message!} />
                            )}
                        </div>

                    </div>

                    <div className='py text-left px-4'>

                        <div>
                            <label className="text-xl mb-2 text-gray-300 block">Servidor fgss:</label>
                            <input className="w-full outline-none rounded bg-gray-900 px-2 py-1 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("fgsServer", {
                                required: "El nombre es obligatorio"
                            })} />

                            {errors.fgsServer && (
                                <ErrorMessage Text={errors.fgsServer.message!} />
                            )}
                        </div>

                    </div>

                    <div className='py text-left px-4'>

                        <div>
                            <label className="text-xl mb-2 text-gray-300 block">Database fgss:</label>
                            <input className="w-full outline-none rounded bg-gray-900 px-2 py-1 mt-2 mb-3 border border-white focus:ring-3 focus:ring-blue-950" {...register("fgsdb", {
                                required: "El nombre es obligatorio"
                            })} />

                            {errors.fgsdb && (
                                <ErrorMessage Text={errors.fgsdb.message!} />
                            )}
                        </div>

                    </div>



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
