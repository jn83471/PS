import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

type UrsTables={
    rows:any,
    column:any
}
export const UrsTables = ({rows,column}) => {
    return (
        <DataGrid pageSizeOptions={[5, 10, 25, 50, 100]}  //apiRef={apiRef} 
            showToolbar className='text-xl text-white font-semibold w-full bg-white!' rows={rows} columns={column}


            initialState={{
                filter: {
                    filterModel: {
                        items: [],
                        quickFilterValues: [],
                    },
                },
                pagination: {
                    paginationModel: {
                        pageSize: 25
                    }
                }
            }}
            sx={{
                backgroundColor: "white",
                border: "none",
                color: "#fff",
                width: "98%",
                fontSize: 14,
                minHeight: 200,
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
                    color: "black"
                },

                // 🔥 CADA CELDA DEL HEADER (ESTE ES EL QUE TE FALTA)
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: "#eef8f1  !important",
                    color: "green !important",
                    fontWeight: "bold !important"
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
                    fontWeight: "bold",
                    fontSize: "12px"
                },

                // ✅ hover mientras está seleccionada
                "& .MuiDataGrid-row.Mui-selected:hover": {
                    backgroundColor: "white !important"
                }
            }} />
    )
}
