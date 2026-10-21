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
import { useTranslation } from "react-i18next";
import type { GridColDef } from "@mui/x-data-grid";

type Machine = {
    id: number;
    name: string;
    status: boolean;
};


export const MachinesTable = () => {
    const {t}=useTranslation()

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
        { field: 'plant.name', headerName:  t("Layout.Plants"), maxWidth: 300, valueGetter: (value, row) => row.plant.name },
        { field: 'Clients.name', headerName: t("Layout.Customers"), maxWidth: 300, valueGetter: (value, row) => row.Clients.name },
        { field: 'machineCode', headerName: t("Gnr.Name"), maxWidth: 300 },
        { field: 'key', headerName: t("Gnr.Code"), flex: 1, minWidth: 100, valueGetter: (value, row) => row.Codes.key },
        {
            field: 'acciones',
            headerName: t("Gnr.Actions"),
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
                        {t("Gnr.Edit")}
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row)}
                    >
                        <FontAwesomeIcon icon={faTrash} className='pr-1' />
                        {t("Gnr.Delete")}
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
            <div className="flex-1 min-w-0 sm:p-4">
                <div className='bg-white border border-gray-400 rounded-xl py-5 px-2 w-full min-h-[75vh]'>
                    <MauiTable header={true} setId={setId} title={t("Layout.Line")} data={filteredRows} setModal={setModal} columns={columns} text={"Nueva linea"} />
                </div>
            </div>
            {(modal && id == 0) ? <MachineModal setModal={setModal} plant={Plant.data} code={Code.data} Client={Client.data} /> : <></>}
            {(modal && id!=0) && <MachineEditModal setModal={setModal} datas={selected} id={id} plant={Plant.data} code={Code.data} Client={Client.data} />}
        </>
    );
};
