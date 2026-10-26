import { faClose, faSave } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { PlanCreateForm } from "../../types/PlanForms"
import { Controller, useForm } from "react-hook-form"
import { GetMachines } from "../../api/MachineApis"
import { useMutation, useQuery } from "@tanstack/react-query"
import OutlinedInput from "@mui/material/OutlinedInput"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs"
import { CreatePlanManual } from "../../api/PlanApi"
import { toast } from "react-toastify"

type PlanModalProp = {
    setModalAddToEdit: any,
    refetch: any
}

export const PlanModal = ({ setModalAddToEdit, refetch }: PlanModalProp) => {
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['Machine'],
        queryFn: GetMachines,
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: CreatePlanManual,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success("Se ha guardado correctamente la información")
            refetch()
            setModalAddToEdit(false)
        }
    })
    const initialValues: PlanCreateForm = {
        fecha: dayjs().format('YYYY-MM-DD'),
        machine: "",
        Capacity: 0,
        Line: "",
        Program: "",
        Shift: "1",
        Customer: "",
        LevenDesign: "",
        Shortpart: "",
        Kmh: 0,
        ...Object.fromEntries(
            Array.from({ length: 31 }, (_, index) => [
                `d${index + 1}`,
                0
            ])
        )
    }
    const { register, control, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const HandleSubmitCreatePlans = async (formData: PlanCreateForm) => {
        mutate(formData)
    }

    return (
        <form onSubmit={handleSubmit(HandleSubmitCreatePlans)} className='fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center text-black z-[99]'>
            <div className="bg-white border border-amber-50 w-[600px] max-w-[90%] min-h-[400px] rounded-2xl shadow-2xs shadow-black/75 h-[80vh] flex flex-col relative z-50">
                <button onClick={() => setModalAddToEdit(false)} className="absolute top-0 right-0 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white translate-x-[50%] translate-y-[-50%]">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="text-white border-b py-4 bg-blue-900 flex justify-between px-5 rounded-t-2xl">
                    Crear nuevo plan
                </div>
                <div className="flex-1 relative overflow-y-auto p-2">

                    <div className='py-5 text-left px-4'>
                        <div>
                            <label className="text-xl mb-2 text-black block">Fecha:</label>
                            <Controller name='fecha'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (<DatePicker
                                    openTo="year"
                                    views={['year', 'month']}
                                    yearsOrder="desc"
                                    value={dayjs(field.value)}
                                    onChange={(date) => field.onChange(date.format('YYYY-MM-DD'))}
                                    sx={{
                                        width: "100%",
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

                                />)} />
                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Codigo:</label>
                            <Controller name='machine'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select className="w-full outline-none rounded  p-2 mt-2 mb-3 border border-gray-200 in:border-blue-500
                                            focus:outline-none
                                        focus:border-blue-500
                                        hover:border-blue-500
                                        active:border-blue-500"  {...field}>
                                        <option key={""} value={""}>Selecciona una linea</option>
                                        {data?.map((m) => (
                                            <option key={m.id} value={m.machineCode}>{m.machineCode}</option>
                                        ))}
                                    </select>
                                )} />


                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Capacity:</label>

                            <Controller name="Capacity"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <OutlinedInput type="number" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Line:</label>

                            <Controller name="Line"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <OutlinedInput type="text" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Program:</label>

                            <Controller name="Program"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <OutlinedInput type="text" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        <div>
                            <label className="text-xl mb-2 text-black block">Codigo:</label>

                            <Controller name='Shift'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <select className="w-full outline-none rounded  p-2 mt-2 mb-3 border border-gray-200 in:border-blue-500
                                            focus:outline-none
                                        focus:border-blue-500
                                        hover:border-blue-500
                                        active:border-blue-500"  {...field}>
                                        <option value={"1"}>Turno 1</option>
                                        <option value={"2"}>Turno 2</option>
                                    </select>
                                )} />


                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Número de parte:</label>

                            <Controller name="PartNumber"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <OutlinedInput type="text" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Cliente:</label>

                            <Controller name="Customer"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <OutlinedInput type="text" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Nivel de diseño:</label>

                            <Controller name="LevenDesign"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <OutlinedInput type="text" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Shortpart:</label>

                            <Controller name="Shortpart"
                                control={control}
                                rules={{ required: true, maxLength: 4 }}
                                render={({ field }) => (
                                    <OutlinedInput type="text" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        <div className="py-2">
                            <label className="text-xl mb-2 text-black block">Kmh:</label>

                            <Controller name="Kmh"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <OutlinedInput type="number" sx={{
                                        width: "100%"
                                    }} {...field}
                                    />
                                )} />
                        </div>
                        {Array.from({ length: 31 }).map((_, index) => (
                            <div className="py-2">
                                <label className="text-xl mb-2 text-black block">Día {index + 1}:</label>

                                <Controller name={`d${index + 1}`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <OutlinedInput type="number" sx={{
                                            width: "100%"
                                        }} {...field}
                                        />
                                    )} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-right p-2">
                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                        <FontAwesomeIcon icon={faSave} /> Crear
                    </button>
                </div>
            </div>

        </form>
    )
}
