
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
    size:number
}
export const MauiTable = ({ data, columns, text, title,setId, setModal ,rowspaning ,header,size}: MauiTableProp) => {
    const apiRef = useGridApiRef();
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
                            setModal(true)
                        }}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className='sm:pr-2 block sm:inline' />
                        <p className='hidden sm:inline'>{text}</p>
                    </button>
                </div>
            </div>)}



            <DataGrid pageSizeOptions={[5,10,25,50,100]}  rowSpanning={rowspaning} apiRef={apiRef} showToolbar className='text-xl text-white font-semibold bg-white! w-full' rows={data} columns={columns}


                initialState={{
                    filter: {
                        filterModel: {
                            items: [],
                            quickFilterValues: [],
                        },
                    },
                    pagination:{
                        paginationModel:{
                            pageSize:25
                        }
                    }
                }}
                sx={{
                    backgroundColor: "white",
                    border: "none",
                    color: "#fff",
                    width: "98%",
                    fontSize:size??14,
                    input: {
                        color: "#fff", // texto que escribes
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: "#aaa", // opcional: placeholder
                        opacity: 1,
                    },
                    "& .MuiDataGrid-main": {
                        backgroundColor: "white"
                    },

                    "& .MuiDataGrid-toolbarContainer": {
                        backgroundColor: "#1a1d25 !important",
                        color: "#fff"
                    },

                    "& .MuiDataGrid-topContainer": {
                        backgroundColor: "white !important"
                    },

                    // fallback general
                    "& .MuiDataGrid-root": {
                        backgroundColor: "white"
                    },
                    // 🔥 HEADER COMPLETO
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "white !important",
                    },

                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "white",
                        color:"black"
                    },

                    // 🔥 CADA CELDA DEL HEADER (ESTE ES EL QUE TE FALTA)
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#eef8f1  !important",
                        color: "green !important",
                        fontWeight:"bold !important"
                    },


                    // opcional: líneas
                    "& .MuiDataGrid-cell": {
                        borderColor: "white",
                    },

                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "white",
                        color: "black"
                    },

                    "& .MuiTablePagination-root": {
                        color: "#113b2b !important"
                    },

                    // select dropdown
                    "& .MuiSelect-select": {
                        color: "black"
                    },

                    // íconos (flechas)
                    "& .MuiSvgIcon-root": {
                        color: "#113b2b !important"
                    },

                    "& .MuiDataGrid-iconButtonContainer": {
                        color: "white"
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
                        backgroundColor: "#eef8f1 !important"
                    },
                    "& .MuiDataGrid-row.Mui-selected": {
                        backgroundColor: "#eef8f1 !important",
                        color: "#113b2b",
                        fontWeight:"bold",
                        fontSize:"12px"
                    },

                    // ✅ hover mientras está seleccionada
                    "& .MuiDataGrid-row.Mui-selected:hover": {
                        backgroundColor: "white !important"
                    }
                }} /></>
    )
}
