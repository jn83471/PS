
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faCircleXmark,
    faDownload,
    faFilterCircleXmark,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule, themeQuartz } from 'ag-grid-community';

//import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useRef, useState } from 'react';
import { readThemePreference } from '../../settings/themes';
import { useOutletContext } from 'react-router-dom';


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



    const themeConfigurations = themeQuartz
        .withParams({
            accentColor: "#15BDE8",
            backgroundColor: "#0C0C0D",
            borderColor: "#ffffff00",
            borderRadius: 20,
            browserColorScheme: "dark",
            cellHorizontalPaddingScale: 1,
            chromeBackgroundColor: {
                ref: "backgroundColor"
            },
            columnBorder: false,
            fontFamily: {
                googleFont: "Roboto"
            },
            fontSize: 16,
            foregroundColor: "#BBBEC9",
            headerBackgroundColor: "#182226",
            headerFontWeight: 500,
            headerTextColor: "#FFFFFF",
            headerVerticalPaddingScale: 0.9,
            iconSize: 20,
            rowBorder: false,
            rowVerticalPaddingScale: 1.2,
            sidePanelBorder: false,
            spacing: 8,
            wrapperBorder: false,
            wrapperBorderRadius: 0,
            dataBackgroundColor:"var(--page)",
            textColor:"var(--color)",
        });





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
                    theme={themeConfigurations}
                />
            </div>
        </>
    )
}
