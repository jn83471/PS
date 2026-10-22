
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

//import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useRef, useState } from 'react';


type ReactTableProp = {
    data: any[],
    columns: ColDef[],
    text: string,
    title: string,
    setId: React.Dispatch<React.SetStateAction<number>>,
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
    rowspaning: boolean,
    header: boolean,
    size: number,
}
export const ReactTable = ({ data, columns, text, title, setId, setModal, rowspaning, header, size }: ReactTableProp) => {
    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        resizable: true,
    };
    ModuleRegistry.registerModules([
        AllCommunityModule,
    ]);
    const [search, setSearch] = useState('');
    const gridRef = useRef<AgGridReact>(null);
    return (
        <>
            {header && (<div className=' px-2 flex py-3 flex-col sm:flex-row sm:justify-between sm:items-center border-b border-b-[rgba(255,255,255,.2)]'>
                <h1 className='font-bold text-3xl text-black text-center'>
                    {title}
                </h1>
                <div className='sm:pt-2 text-center'>
                    <button
                        onClick={() => {
                            setId(0)
                            setModal?.(true)
                        }}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className='sm:pr-2 block sm:inline' />
                        <p className='hidden sm:inline'>{text}</p>
                    </button>
                </div>
            </div>)}
            <div className="flex flex-wrap gap-2 items-center">

                <input
                    type="text"
                    placeholder="Buscar..."
                    className="border rounded px-3 py-2"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        gridRef.current?.api.exportDataAsCsv({
                            fileName: 'ProductionPlan.csv'
                        });
                    }}
                >
                    Descargar CSV
                </button>

                <button
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        gridRef.current?.api.setFilterModel(null);
                    }}
                >
                    Limpiar Filtros
                </button>

            </div>

            <div
                className="ag-theme-alpine"
                style={{
                    height: "600px",
                    width: "100%",
                }}
            >
                <AgGridReact
                    className="ag-theme-quartz"
                    ref={gridRef}
                    quickFilterText={search}
                    rowData={data}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={20}
                    animateRows={true}
                    defaultColDef={defaultColDef}

                />
            </div>
        </>
    )
}
