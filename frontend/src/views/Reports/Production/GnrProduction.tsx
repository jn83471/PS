import React, { useEffect, useState, type ContextType } from 'react'
import { useOutletContext } from 'react-router-dom';


import {
    useReactTable,
    getCoreRowModel,
    getExpandedRowModel,
    flexRender,
    type ColumnDef
} from "@tanstack/react-table";
import { MauiTable } from '../../../components/Gnr/MauiTable';
import type { GridColDef } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const TdDay = ({ value }) => {
    return (
        <>
            <td className='text-center border'>
                {value}
            </td>
        </>
    )
}

export const GnrProduction = () => {
    const { dt,fecha,setFecha,refetch  } = useOutletContext();
    console.log(dt)
      


    const [expanded, setExpanded] = useState({})

    const dayColumns = Array.from({ length: 31 }, (_, i) => {
        const day = i + 1 // empieza en 2
        return {
            accessorKey: `day${day}`,
            header: `Dia ${day}`,
        };
    });



    const column: GridColDef[] = [
        {
            field: 'planta', headerName: 'Nombre', maxWidth: 500, width: 200,
            renderCell: (params) => (
                <>
                    <div className="inline text-2xl">{params.row.planta}</div>
                    <div className="text-[10px] inline px-2 bg-blue-600 mx-2 rounded-2xl p-1 text-white">{params.row.code}</div>
                </>
            )
        },
        {
            field: 'turno',
            headerName: 'Turno',
            width: 100,
        },

        ...Array.from({ length: 31 }, (_, i) => ({
            field: `day${i + 1}`,
            headerName: `Día ${i + 1}`,
            width: 100,
            type: "number",
        }))
    ];

    const [id, setId] = useState(0)
    const [modal, setModal] = useState(false)

    const filteredRows = dt.flatMap((plant) => {
        const taRow = {
            id: `${plant.code}-ta`,
            planta: plant.name,
            code: plant.code,
            turno: "TA",
        };

        const tbRow = {
            id: `${plant.code}-tb`,
            planta: plant.name,
            code: plant.code,
            turno: "TB",
        };

        const tcRow = {
            id: `${plant.code}-tc`,
            planta: plant.name,
            code: plant.code,
            turno: "TC",
        };
        const ttRow = {
            id: `${plant.code}-total`,
            planta: plant.name,
            code: plant.code,
            turno: "Total",
        };

        Object.keys(plant).forEach((key) => {
            if (key.startsWith("day")) {
                taRow[key] = plant[key].ta;
                tbRow[key] = plant[key].tb;
                tcRow[key] = plant[key].tc;
                ttRow[key] = plant[key].total;
            }
        });

        return [taRow, tbRow, tcRow, ttRow];
    });
    console.log(filteredRows)
    return (
        <div className="flex-1 min-w-0 sm:p-4">

            <div className='bg-white border border-gray-400 rounded-xl py-5 px-2 w-full min-h-[75vh]'>
                <div className='border-b border-gray-600 flex text-2xl text-center sm:text-left sm:text-4xl font-bold py-3 text-black'>
                    Reporte de producción
                </div>
                <DatePicker
                                label="Years in descending order"
                                openTo="year"
                                views={['year', 'month']}
                                yearsOrder="desc"
                                value={fecha}
                                onChange={async (newValue) => {
                                  await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                                  refetch()
                                }}
                                sx={{
                                  width: "190px",
                                  '& .MuiInputBase-input': {
                                    WebkitTextFillColor: 'black !important',
                                    color: 'black',
                                  },
                                  '& .MuiInputLabel-root': {
                                    color: 'black',
                                    WebkitTextFillColor: 'black !important',
                                  },
                                  '& .MuiSvgIcon-root': {
                                    color: 'black',
                                    WebkitTextFillColor: 'black !important',
                                  },
                                  '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#fff',
                                    WebkitTextFillColor: '#fff !important',
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
                                    color: '#ccc',
                                    WebkitTextFillColor: '#fff !important',
                                    opacity: 1,
                                  },
                                }}
                
                              />
                <MauiTable rowspaning={false} setId={setId} title='' data={filteredRows} setModal={null} columns={column} text={"Nueva planta"} />
            </div>
        </div>)

}
/*<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm text-gray-400">Plan</p>
                    <p className="text-2xl font-semibold text-white">12,000</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm text-gray-400">Real</p>
                    <p className="text-2xl font-semibold text-white">10,850</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm text-gray-400">Cumplimiento</p>
                    <p className="text-2xl font-semibold text-green-400">90.4%</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <p className="text-sm text-gray-400">Scrap</p>
                    <p className="text-2xl font-semibold text-yellow-400">1.8%</p>
                </div>
            </div>
            <div className="bg-[#1a1d25] rounded-xl p-5"><h2 className="text-xl mb-4 font-semibold">Máquinas</h2><table className="w-full text-sm"><thead><tr className="text-gray-400 text-left border-b border-gray-700"><th>Planta</th><th>Codigo de Planta</th><th className="py-2">Nombre</th><th>Status</th><th className="text-right">Acciones</th></tr></thead><tbody><tr className="border-b border-gray-800"><td className="py-3">Planta 2</td><td className="py-3">978</td><td className="py-3">MC04</td><td><span className="px-2 py-1 rounded text-xs bg-green-600">Activa</span></td><td className="text-right space-x-2"><button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black text-sm">Editar</button><button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm">Eliminar</button></td></tr><tr className="border-b border-gray-800"><td className="py-3">Planta 2</td><td className="py-3">978</td><td className="py-3">MC05</td><td><span className="px-2 py-1 rounded text-xs bg-green-600">Activa</span></td><td className="text-right space-x-2"><button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black text-sm">Editar</button><button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm">Eliminar</button></td></tr><tr className="border-b border-gray-800"><td className="py-3">Planta 2</td><td className="py-3">978</td><td className="py-3">MC06</td><td><span className="px-2 py-1 rounded text-xs bg-green-600">Activa</span></td><td className="text-right space-x-2"><button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-black text-sm">Editar</button><button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm">Eliminar</button></td></tr></tbody></table></div>
*/