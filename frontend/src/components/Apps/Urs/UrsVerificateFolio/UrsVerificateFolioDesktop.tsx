import { faClock, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { formatDateUTC, formDateHours } from "../../../../Utils/Date"
import { formatFolio } from "../../../../Utils/Urs"
import { DataGrid } from "@mui/x-data-grid"

type UrsVerificateFolioDesktopProp={
    id,TimeZone,data,Requests,column,columns,HandleSecondVeryfyFolio 
}
export const UrsVerificateFolioDesktop = ({id,TimeZone,data,Requests,column,columns,HandleSecondVeryfyFolio }:UrsVerificateFolioDesktopProp) => {
    return (
        <>
            <div className="flex flex-col lg:flex-row py-2">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">
                        #{formatFolio(id)}
                    </h1>
                    <small className="text-sm text-gray-500">
                        Rastrear, priorizar y coordinar los envíos de materiales críticos.
                    </small>
                </div>

                <div className="border border-gray-200 py-2 grid sm:grid-cols-1 md:grid-cols-2 rounded-2xl">
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                Fecha propuesta
                            </div>
                            <div>
                                {formatDateUTC(data?.ProposedDate??'')}
                            </div>
                        </div>
                    </div>
                    <div className="border-r border-t md:border-t-0 border-t-gray-200 border-r-gray-200 p-1 flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="text-3xl text-blue-500" />
                        <div className="px-2">
                            <div>
                                Pickup
                            </div>
                            <div>
                                {formDateHours(new Date(data?.hrs),TimeZone)}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 my-2 p-2">
                    {Requests?.data?.length == 0 ?
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {
                                        columns.map((e, index) => (
                                            <th key={`col${index}`} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{e}</th>
                                        ))
                                    }

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td colSpan={11}>
                                        <div className="h-[50vh] flex items-center justify-center">
                                            <div>
                                                <div className="text-center">
                                                    <FontAwesomeIcon className="sm:text-2xl md:text-9xl text-blue-700" icon={faBoxOpen} />
                                                </div>
                                                <div className="text-center py-2">
                                                    <div className="sm:text-xl md:text-2xl font-bold md:py-2">
                                                        No hay productos agregados
                                                    </div>

                                                    <div className="text-center">

                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table> :
                        <DataGrid rowHeight={80} pageSizeOptions={[5, 10, 25, 50, 100]}  //apiRef={apiRef} 
                            showToolbar className='text-xl text-white font-semibold w-full bg-white! w-full' rows={Requests?.data} columns={column}


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
                                minHeight: 300,
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
                                    fontSize: "14px",
                                },

                                // ✅ hover mientras está seleccionada
                                "& .MuiDataGrid-row.Mui-selected:hover": {
                                    backgroundColor: "white !important",
                                    height: 90
                                },
                                "& .css-vjih8i-MuiDataGrid-root .MuiDataGrid-row.MuiDataGrid-row--firstVisible": {
                                    minHeight: 200
                                }
                            }} />

                    }


                </div>
                <div className="md:px-4 py-3 flex flex-row justify-end">
                    {/*<button onClick={HandleCancelFolio} type="button" className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-700 mr-2">
                        <FontAwesomeIcon icon={faCancel} /> Cancelar
                    </button>*/}
                    <form onSubmit={HandleSecondVeryfyFolio}>
                        <button type="submit" className="py-2 px-4 bg-blue-900 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                            <FontAwesomeIcon icon={faPlus} /> Guardar
                        </button>
                    </form>

                </div>
            </div>

        </>
    )
}
