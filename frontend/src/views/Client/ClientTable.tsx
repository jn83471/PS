
import type { GridColDef } from '@mui/x-data-grid';
import { DeletePlants, GetPlants } from '../../api/PlantsApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { Plant } from '../../types/PlantForms';

import { useState } from 'react';

import { MauiTable } from '../../components/Gnr/MauiTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PlantModal } from '../../components/Plant/PlantModal';
import { GetCode } from '../../api/CodeApi';
import Button from '@mui/material/Button';

import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import { PlantEditModal } from '../../components/Plant/PlantEditModal';
import { DeleteClient, GetClients } from '../../api/ClientApis';
import { ClientModal } from '../../components/Client/ClientModal';
import { ClientEditModal } from '../../components/Client/ClientEditModal';



export const ClientTable = () => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['Client'],
    queryFn: GetClients,
    retry: false
  })


  const [search, setSearch] = useState("");
  const [id, setId] = useState(0)
  const [selected, setSelected] = useState(null)

  const [modal, setModal] = useState(false)
  const Code = useQuery({
    queryKey: ['Code'],
    queryFn: GetCode,
    retry: false
  })
  const { mutate } = useMutation({
    mutationFn: DeleteClient,
    onError: (responce) => {
      toast.error(responce.message)
    },
    onSuccess: (responce) => {
      toast.success(responce)
    }
  })

  const handleEdit = (row) => {
    setSelected(row)
    setId(row.id)
    setModal(true)
  };

  const handleDelete = async (row) => {
    const resp = await Swal.fire({
      title: "Desea eliminar el cliente?",
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
    { field: 'name', headerName: 'Nombre', maxWidth: 300 },
    { field: 'key', headerName: 'Codigo', flex: 1, valueGetter: (value, row) => row.Codes.key },
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
    element.name.toString().toLowerCase().includes(search.toLowerCase()) || element.Code.key.toString().toLowerCase().includes(search.toLowerCase())

  )
  return (
    <>
      <div className="flex-1 min-w-0 p-4">
        <div className='bg-[#1a1d25] rounded-xl py-5 px-2 w-full min-h-[75vh]'>
          <MauiTable header={true} setId={setId} title='Clientes' data={filteredRows} setModal={setModal} columns={columns} text={"Nueva cliente"} />
        </div>
      </div>
      {
        (modal && id==0) && <ClientModal setModal={setModal} code={Code.data} />
      }
      {
        (modal && id!=0) && <ClientEditModal setModal={setModal} data={selected} id={id} code={Code.data} />
      }
    </>
  )
}
