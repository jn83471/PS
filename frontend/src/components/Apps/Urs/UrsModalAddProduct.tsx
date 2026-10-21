import { faBarcode, faBoxOpen, faCircle, faClose, faInfo, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GetCode } from "../../../api/CodeApi"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import type { CreateUsrRequestProduct } from "../../../types/Urs/UsrRequestProductForm"
import { useForm } from "react-hook-form"
import { FgssGetNuParts, FgssGetNuPartsCustomers, FgssGetNuPartsCustomersCustom } from "../../../api/Plataforms/Fgss/FgssApi"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Input from "@mui/material/Input"
import { UrsGetCatalog } from "../../../api/Apps/Urs/UrsCatalogApi"
import { CreateUrsRequest } from "../../../api/Apps/Urs/UrsRequestApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

type UrsModalAddProductprop = {
    modal: boolean,
    setModal: any,
    folioId: number,
    refresh: any,
    requestrefresh: any,
    requests: any
}

export const UrsModalAddProduct = ({ setModal, modal, folioId, refresh, requestrefresh, requests }) => {
    const initialValues: CreateUsrRequestProduct = {
        CodesId: 0,
        PartNumber: '',
        CustomerPartNumber: '',
        Customer: '',
        UrsPriorityId: 1,
        motive: '',
        Qty: ''
    }


    const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm({ defaultValues: initialValues })
    const codesId = watch("CodesId");
    const PartNumber = watch("PartNumber")
    const CustomerPartNumber = watch("CustomerPartNumber")
    const Customer = watch("Customer")
    const Navigate = useNavigate()

    const { data, isError, isLoading } = useQuery({
        queryKey: ['UrsCatalog'],
        queryFn: UrsGetCatalog,
        retry: false
    })


    const PartNumbers = useQuery({
        queryKey: ['FgssData', codesId],
        queryFn: () => FgssGetNuParts(codesId),
        retry: false,
        enabled: !!codesId
    })

    const CustomersPart = useQuery({
        queryKey: ['FgssData', codesId, PartNumber],
        queryFn: () => FgssGetNuPartsCustomers(codesId, PartNumber),
        retry: false,
        enabled: !!PartNumber
    })
    const Customers = useQuery({
        queryKey: ['FgssData', codesId, PartNumber, CustomerPartNumber],
        queryFn: () => FgssGetNuPartsCustomersCustom(codesId, PartNumber, CustomerPartNumber),
        retry: false,
        enabled: !!CustomerPartNumber
    })

    const { mutate } = useMutation({
        mutationFn: CreateUrsRequest,
        onError: (error) => {
            console.log(error.message)
            toast.error(error.message)
        },
        onSuccess: (data) => {

            toast.success(data)
            setModal(false)
            refresh()
            requestrefresh()
            //Navigate(`/urs/request/${data.id}`)
        }
    })

    const options = PartNumbers?.data?.map(e => ({ label: e.sews_part_no }))
    console.log(options)
    const mfgRows = requests.length > 0 ? data?.codes?.filter(x => x.id == requests[0].CodeId) : data?.codes


    useEffect(() => {
        if (requests.length > 0) setValue("CodesId", requests[0].CodeId, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }, [data])


    const HandleSubmitRequest = (formData: CreateUsrRequestProduct) => {
        const dt = {
            formData,
            id: folioId
        }

        mutate(dt)
    }
    return (
        <div className="fixed top-0 left-0 w-screen max-h-screen h-screen flex-col bg-gray-600/50 sm:flex items-center justify-center overflow-y-auto">
            <form onSubmit={handleSubmit(HandleSubmitRequest)}
                className="bg-white max-w-[700px] p-4 rounded-2xl flex-1 w-[90vw] m-5 relative rounded-r-none rounded-b-2xl flex flex-col ">
                <button onClick={() => {
                    setModal(!modal)
                }} className="absolute right-0 top-0 translate-y-[-50%] translate-x-[50%] rounded-full bg-red-600 w-7 h-7 flex justify-center items-center text-white font-bold">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div>

                </div>
                <div className="flex items-center py-4 gap-2 border-b  border-b-gray-200">
                    <FontAwesomeIcon className="text-4xl text-blue-700" icon={faBoxOpen} />
                    <div className="font-bold text-2xl">
                        Agregar producto #URS {`${folioId?.toString().padStart(10, '0')}`}
                    </div>
                </div>
                <div className="flex flex-row flex-1 gap-2 ">
                    <div className="flex-1 pl-3 max-h-[80vh] overflow-y-auto">
                        <div className="text-blue-700 uppercase font-bold pb-3 pt-4 text-xl">
                            información de producto
                        </div>
                        <FormControl sx={{
                            width: "100%"
                        }}>
                            <InputLabel className='text-black' id="demo-simple-select-label"
                                sx={{
                                    color: "black"
                                }}
                            >MFG</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={
                                    getValues("CodesId")
                                }
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
                                onChange={async (event) => {
                                    await setValue("CodesId", event.target.value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }}
                            >
                                {
                                    mfgRows?.map((e, index) => (
                                        <MenuItem value={e.id}>{e.key}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                        <FormControl sx={{
                            marginTop: "15px",
                            width: "100%"
                        }}>
                            <InputLabel className='text-black' id="demo-simple-select-label"
                                sx={{
                                    color: "black",
                                    bgcolor: "white"
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
                                    data?.priority?.map((elm, index) => (
                                        <MenuItem sx={{
                                        }} value={elm.id}>
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
                        <FormControl sx={{
                            marginTop: "15px",
                            width: "100%"
                        }}>


                            <Autocomplete
                                labelId="demo-simple-select-label"
                                freeSolo
                                id="demo-simple-select"
                                options={["Cust. Increase"].map((option) => option)}
                                renderInput={(params) => <TextField {...params} label="Motivo" />}
                                onInputChange={(event, value) => {
                                    setValue("motive", value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }}
                                onChange={(event, value) => {
                                    setValue("motive", value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }}
                            >
                                {/*<MenuItem value={"Cust. Increase"}>Cust. Increase</MenuItem>*/}
                            </Autocomplete>
                        </FormControl>
                        <div className="py-2">
                            <Autocomplete options={options ?? []}
                                renderInput={(params) => <TextField {...params} label="Numero de parte" />}
                                //value={data?.find(x => x.id === PartNumber) || null}
                                onChange={(e, value) => {
                                    console.log(value)
                                    setValue("PartNumber", value.label, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }} />
                        </div>
                        <FormControl className="my-2" sx={{
                            width: "100%",
                            marginTop: "5px"
                        }}>
                            <InputLabel className='text-black' id="demo-simple-select-label"
                                sx={{
                                    color: "black",
                                    bgcolor: "white"
                                }}
                            >Numero de parte Cliente</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={
                                    getValues("CustomerPartNumber")
                                }
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
                                    setValue("CustomerPartNumber", event.target.value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }}
                            >
                                {
                                    CustomersPart?.data?.map((e, index) => (
                                        <MenuItem value={e.cust_part_no}>{e.cust_part_no}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                        <FormControl className="my-2" sx={{
                            width: "100%",
                            marginTop: "15px"
                        }}>
                            <InputLabel className='text-black' id="demo-simple-select-label"
                                sx={{
                                    color: "black",
                                    bgcolor: "white"
                                }}
                            >Cliente</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={
                                    getValues("Customer")
                                }
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
                                    setValue("Customer", event.target.value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }}
                            >
                                {
                                    Customers?.data?.map((e, index) => (
                                        <MenuItem value={e.customer_id}>{e.customer_id}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>
                        <FormControl className="my-2" sx={{
                            width: "100%",
                            marginTop: "15px"
                        }}>

                            <TextField label='Cantidad' value={
                                getValues("Qty")
                            } type="number"
                                onKeyDown={(e) => {
                                    if (['e', 'E', '+', '-'].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    setValue("Qty", e.target.value, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }} />

                        </FormControl>
                        <div className="text-right py-2">
                            <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                                <FontAwesomeIcon icon={faPlus} /> Guardar
                            </button>
                        </div>
                    </div>
                    <div className="hidden md:flex">
                        <div className="m-2 bg-blue-100/30 border border-blue-100/40 p-4 hidden sm:flex sm:w-[300px] md:w-[300px] lg:w-[300px] lg:p-8 rounded-xl flex-col">
                            <div className="uppercase text-sm text-blue-600 font-bold">
                                Resumen del producto
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center flex-row gap-2 py-2">
                                    <div className="border border-blue-200 rounded-full bg-blue-100/80 w-9 h-9 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBarcode} className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-gray-600">
                                            MFG:
                                        </div>
                                        <div className="text-sm font-bold min-h-[20px]">
                                            {data?.codes?.find(x => x.id == codesId)?.name ?? ' '}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center flex-row gap-2 py-2">
                                    <div className="border border-blue-200 rounded-full bg-blue-100/80 w-9 h-9 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBarcode} className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-gray-600">
                                            Numero de parte
                                        </div>
                                        <div className="text-sm font-bold min-h-[20px]">
                                            {PartNumber}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center flex-row gap-2 py-2">
                                    <div className="border border-blue-200 rounded-full bg-blue-100/80 w-9 h-9 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBarcode} className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-gray-600">
                                            Numero de parte de cliente
                                        </div>
                                        <div className="text-sm font-bold min-h-[20px]">
                                            {CustomerPartNumber + ' '}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center flex-row gap-2 py-2">
                                    <div className="border border-blue-200 rounded-full bg-blue-100/80 w-9 h-9 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBarcode} className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-gray-600">
                                            Cliente
                                        </div>
                                        <div className="text-sm font-bold min-h-[20px]">
                                            {Customer + ' '}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center flex-row gap-2 py-2">
                                    <div className="border border-blue-200 rounded-full bg-blue-100/80 w-9 h-9 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faBarcode} className="text-blue-600 text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-gray-600">
                                            Cantidad
                                        </div>
                                        <div className="text-sm font-bold min-h-[20px]">
                                            {getValues("Qty") + ' '}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-2 flex flex-row gap-2 items-center">
                                    <div className="bg-blue-600 w-7 h-7 flex items-center justify-center text-white rounded-full">
                                        <FontAwesomeIcon icon={faInfo} />
                                    </div>
                                    <div className="text-sm">
                                        Información recuperada de FGSS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
