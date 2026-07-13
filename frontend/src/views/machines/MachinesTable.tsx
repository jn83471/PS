import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteMachine, GetMachines } from "../../api/MachineApis";
import { MachineModal } from "../../components/Machine/MachineModal";
import { DeletePlants, GetPlants } from "../../api/PlantsApi";
import { GetCode } from "../../api/CodeApi";
import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { MauiTable } from "../../components/Gnr/MauiTable";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { GetClients } from "../../api/ClientApis";
import { MachineEditModal } from "../../components/Machine/MachineEditModal";

type Machine = {
    id: number;
    name: string;
    status: boolean;
};


export const MachinesTable = () => {

    const [search, setSearch] = useState("");
    const [id, setId] = useState(0)
    const [selected, setSelected] = useState({})

    const [modal, setModal] = useState(false)

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['Machine'],
        queryFn: GetMachines,
        retry: false
    })
    const { mutate } = useMutation({
        mutationFn: DeleteMachine,
        onError: (responce) => {
            toast.error(responce.message)
        },
        onSuccess: (responce) => {
            toast.success(responce)
        }
    })
    const Plant = useQuery({
        queryKey: ['Plant'],
        queryFn: GetPlants,
        retry: false
    })
    const Code = useQuery({
        queryKey: ['Code'],
        queryFn: GetCode,
        retry: false
    })
    const Client = useQuery({
        queryKey: ['Client'],
        queryFn: GetClients,
        retry: false
    })
    const handleEdit = (row) => {
        console.log(row)
        setSelected(row)
        setId(row.id)
        setModal(true)
    };

    const handleDelete = async (row) => {
        const resp = await Swal.fire({
            title: "Desea eliminar la linea?",
            text: "",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "No"
        })
        if (resp.isConfirmed) {
            mutate(row.id)
        }
    };

    const columns: GridColDef[] = [
        { field: 'plant.name', headerName: 'Planta', maxWidth: 300, valueGetter: (value, row) => row.plant.name },
        { field: 'Clients.name', headerName: 'Cliente', maxWidth: 300, valueGetter: (value, row) => row.Clients.name },
        { field: 'machineCode', headerName: 'Nombre', maxWidth: 300 },
        { field: 'key', headerName: 'Codigo', flex: 1, minWidth: 100, valueGetter: (value, row) => row.Codes.key },
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
                        onClick={() => handleEdit(params.row)}
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
                        onClick={() => handleDelete(params.row)}
                    >
                        <FontAwesomeIcon icon={faTrash} className='pr-1' />
                        Eliminar
                    </Button>
                </>
            ),
        },

    ];

    const filteredRows = data?.filter(element =>
        element.machineCode.toString().toLowerCase().includes(search.toLowerCase()) || element.Codes.key.toString().toLowerCase().includes(search.toLowerCase())

    )


    return (
        <>
            <div className="flex-1 min-w-0 p-4">
                <div className='bg-[#1a1d25] rounded-xl py-5 px-2 w-full min-h-[75vh]'>
                    <MauiTable header={true} setId={setId} title='Lineas' data={filteredRows} setModal={setModal} columns={columns} text={"Nueva linea"} />
                </div>
            </div>
            {(modal && id == 0) ? <MachineModal setModal={setModal} plant={Plant.data} code={Code.data} Client={Client.data} /> : <></>}
            {(modal && id!=0) && <MachineEditModal setModal={setModal} datas={selected} id={id} plant={Plant.data} code={Code.data} Client={Client.data} />}
        </>
    );
};
/**/
{/*{(modal && id!=0) && <PlantEditModal setModal={setModal} data={selected} id={id} code={Code.data} />}
    {
                (modal && id == 0) && <ClientModal setModal={setModal} code={Code.data} />
            }
            {
                (modal && id != 0) && <ClientEditModal setModal={setModal} data={selected} id={id} code={Code.data} />
            } 
    <div className="text-white">


                <div className="mb-4">


                    <input
                        value={globalFilter ?? ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Buscar ..."
                        className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />


                    <button
                        onClick={() => setModal(true)}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
                    >
                        + Nueva Linea
                    </button>
                </div>


                <div className="bg-[#1a1d25] rounded-xl p-5">
                    <h2 className="text-xl mb-4 font-semibold">Linea</h2>

                    <table className="w-full text-sm">
                        <thead>

                            {table.getHeaderGroups().map(headerGroup => (
                                <tr className="text-gray-400 text-left border-b border-gray-700" key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody>

                            {table?.getRowModel()?.rows?.map(row => (
                                <>
                                    <tr key={row.id} >
                                        <td className="px-2">
                                            {row.original?.plant?.name}
                                        </td>
                                        <td className="py-3">{row.original?.Codes?.name}</td>

                                        <td className="py-3">{row.original?.machineCode}</td>


                                        <td className="text-center">
                                            <span
                                                className={`px-2 py-1 rounded text-xs text-center ${row.original?.status
                                                    ? "bg-green-600"
                                                    : "bg-red-600"
                                                    }`}
                                            >
                                                {row.original?.status ? "Activa" : "Inactiva"}
                                            </span>
                                        </td>
                                        <td className="text-right space-x-2 p-2">


                                            <button

                                                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black text-sm"
                                            >
                                                Editar
                                            </button>

                                            <button

                                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>
                                </>
                            ))}

                        </tbody>
                    </table>
                    <div className="flex gap-2 mt-4">  <button onClick={() => table.setPageIndex(0)}>    {"<<"}  </button>
                        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>    {"<"}  </button>
                        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>    {">"}  </button>
                        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>    {">>"}  </button></div>
                </div>
            </div>
            {modalView ? <MachineModal setModal={setModal} plant={Plant.data} code={Code.data} /> : <></>}*/ }
/**/