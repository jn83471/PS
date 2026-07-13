
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faColumns,
    faDownload,
    faFilter,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import { DataGrid, useGridApiRef, type GridColDef } from '@mui/x-data-grid';

type MauiTableProp = {
    data: any,
    columns: GridColDef[],
    text: string,
    title: string,
    setId: React.Dispatch<React.SetStateAction<number>>,
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
    rowspaning:boolean,
    header: boolean,
}
export const MauiTable = ({ data, columns, text, title,setId, setModal ,rowspaning ,header}: MauiTableProp) => {
    const apiRef = useGridApiRef();
    return (
        <>
            {header && (<div className=' px-2 flex py-3 flex-row justify-between items-center border-b border-b-[rgba(255,255,255,.2)]'>
                <h1 className='font-bold text-2xl'>
                    {title}
                </h1>
                <div>
                    <button
                        onClick={() => {
                            setId(0)
                            setModal(true)
                        }}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold"
                    >
                        <FontAwesomeIcon icon={faPlus} className='pr-2' />
                        {text}
                    </button>
                </div>
            </div>)}



            <DataGrid rowSpanning={rowspaning} apiRef={apiRef} showToolbar className='text-xl text-white font-semibold bg-[#1a1d25]! w-full' rows={data} columns={columns}


                initialState={{
                    filter: {
                        filterModel: {
                            items: [],
                            quickFilterValues: [],
                        },
                    },
                }}
                sx={{
                    backgroundColor: "#1a1d25",
                    border: "none",
                    color: "#fff",
                    width: "98%",
                    input: {
                        color: "#fff", // texto que escribes
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "#aaa", // opcional: placeholder
                        opacity: 1,
                    },
                    "& .MuiDataGrid-main": {
                        backgroundColor: "#1a1d25"
                    },

                    "& .MuiDataGrid-toolbarContainer": {
                        backgroundColor: "#1a1d25 !important",
                        color: "#fff"
                    },

                    "& .MuiDataGrid-topContainer": {
                        backgroundColor: "#1a1d25 !important"
                    },

                    // fallback general
                    "& .MuiDataGrid-root": {
                        backgroundColor: "#1a1d25"
                    },
                    // 🔥 HEADER COMPLETO
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#1a1d25 !important",
                    },

                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#1a1d25"
                    },

                    // 🔥 CADA CELDA DEL HEADER (ESTE ES EL QUE TE FALTA)
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#1a1d25 !important",
                        color: "#fff !important",
                    },


                    // opcional: líneas
                    "& .MuiDataGrid-cell": {
                        borderColor: "#2a2d35",
                    },

                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#1a1d25",
                        color: "#fff"
                    },

                    "& .MuiTablePagination-root": {
                        color: "#fff !important"
                    },

                    // select dropdown
                    "& .MuiSelect-select": {
                        color: "#fff"
                    },

                    // íconos (flechas)
                    "& .MuiSvgIcon-root": {
                        color: "#fff !important"
                    },

                    "& .MuiDataGrid-iconButtonContainer": {
                        color: "#1a1d25"
                    },

                    "& .MuiDataGrid-filterIcon": {
                        color: "#fff"
                    },

                    // icono cuando está activo
                    "& .MuiDataGrid-menuIcon": {
                        color: "#fff"
                    },

                    "& .MuiIconButton-root": {
                        backgroundColor: "transparent !important",
                        color: "#fff"
                    },

                    "& .MuiDataGrid-row:hover": {
                        backgroundColor: "#252833 !important"
                    },
                    "& .MuiDataGrid-row.Mui-selected": {
                        backgroundColor: "#2a2d35 !important",
                        color: "#fff"
                    },

                    // ✅ hover mientras está seleccionada
                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        backgroundColor: "#252833 !important"
                    }
                }} /></>
    )
}
