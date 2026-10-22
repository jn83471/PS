import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DataGrid,useGridApiRef,type GridColDef } from "@mui/x-data-grid";

type MauiTableProp = {
    data: any;
    columns: GridColDef[];
    text: string;
    title: string;
    setId: React.Dispatch<React.SetStateAction<number>>;
    setModal?: React.Dispatch<React.SetStateAction<boolean>>;
    rowspaning: boolean;
    header?: boolean;
    size?: number;
    pinnedColumns?: any;
};

export const MauiTable = ({
    data,
    columns,
    text,
    title,
    setId,
    setModal,
    rowspaning,
    header = false,
    size = 14,
}: MauiTableProp) => {
    const apiRef = useGridApiRef();

    return (
        <div className="h-full flex flex-col">
            {header && (
                <div className="px-2 flex py-3 flex-col sm:flex-row sm:justify-between sm:items-center border-b border-b-[rgba(255,255,255,.2)]">
                    <h1 className="font-bold text-3xl text-black text-center">
                        {title}
                    </h1>

                    <div className="sm:pt-2 text-center">
                        <button
                            onClick={() => {
                                setId(0);
                                setModal?.(true);
                            }}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="sm:pr-2 block sm:inline"
                            />

                            <p className="hidden sm:inline">{text}</p>
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 min-h-0">
                <DataGrid
                    rows={data ?? []}
                    columns={columns}
                    apiRef={apiRef}
                    rowSpanning={rowspaning}
                    showToolbar
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterValues: [],
                            },
                        },
                        pagination: {
                            paginationModel: {
                                pageSize: 25,
                            },
                        },
                    }}
                    sx={{
                        height: "100%",
                        width: "100%",
                        border: "none",
                        backgroundColor: "white",
                        fontSize: size,

                        input: {
                            color: "#000000",
                        },

                        "& .MuiInputBase-input::placeholder": {
                            color: "#aaa",
                            opacity: 1,
                        },

                        "& .MuiDataGrid-main": {
                            backgroundColor: "white",
                        },

                        "& .MuiDataGrid-toolbarContainer": {
                            backgroundColor: "#1a1d25 !important",
                            color: "#fff",
                        },

                        "& .MuiDataGrid-topContainer": {
                            backgroundColor: "white !important",
                        },

                        "& .MuiDataGrid-root": {
                            backgroundColor: "white",
                        },

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: "white !important",
                        },

                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: "#eef8f1 !important",
                            color: "green !important",
                            fontWeight: "bold !important",
                        },

                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: "white",
                            color: "black",
                        },

                        "& .MuiDataGrid-cell": {
                            borderColor: "white",
                        },

                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: "white",
                            color: "black",
                        },

                        "& .MuiTablePagination-root": {
                            color: "#113b2b !important",
                        },

                        "& .MuiSelect-select": {
                            color: "black",
                        },

                        "& .MuiSvgIcon-root": {
                            color: "#113b2b !important",
                        },

                        "& .MuiDataGrid-iconButtonContainer": {
                            color: "white",
                        },

                        "& .MuiDataGrid-filterIcon": {
                            color: "#fff",
                        },

                        "& .MuiDataGrid-menuIcon": {
                            color: "#fff",
                        },

                        "& .MuiIconButton-root": {
                            backgroundColor: "transparent !important",
                            color: "#fff",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: "#eef8f1 !important",
                        },

                        "& .MuiDataGrid-row.Mui-selected": {
                            backgroundColor: "#eef8f1 !important",
                            color: "#113b2b",
                            fontWeight: "bold",
                            fontSize: "12px",
                        },

                        "& .MuiDataGrid-row.Mui-selected:hover": {
                            backgroundColor: "white !important",
                        },
                    }}
                />
            </div>
        </div>
    );
};