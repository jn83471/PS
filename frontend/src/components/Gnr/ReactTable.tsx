
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faCircleXmark,
    faDownload,
    faFilterCircleXmark,
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
    showSearch?: boolean,
    showClearFilters?: boolean,
    showFloatingFilters?: boolean
}
export const ReactTable = ({ data, columns, text, title, setId, setModal, rowspaning, header, size, showSearch = true, showClearFilters = true,
    showFloatingFilters = true }: ReactTableProp) => {
    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: header,
        resizable: true,
    };
    ModuleRegistry.registerModules([
        AllCommunityModule,
    ]);
    const [search, setSearch] = useState('');
    const gridRef = useRef<AgGridReact>(null);
    return (
        <>
            <div className="flex flex-wrap gap-2 items-center justify-end py-2">

                {showSearch && (<input
                    type="text"
                    placeholder="Buscar..."
                    className="border rounded px-3 py-2"
                    onChange={(e) => setSearch(e.target.value)}
                />)}

                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => {
                        gridRef.current?.api.exportDataAsCsv({
                            fileName: 'ProductionPlan.csv'
                        });
                    }}
                >
                    <FontAwesomeIcon icon={faDownload} />
                </button>

                {showClearFilters && (
                    <button
                        className="bg-gray-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                            gridRef.current?.api.setFilterModel(null);
                        }}
                    >
                        <FontAwesomeIcon icon={faFilterCircleXmark} />
                    </button>
                )}

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
                    paginationPageSize={100}
                    animateRows={true}
                    defaultColDef={defaultColDef}

                />
            </div>
        </>
    )
}
