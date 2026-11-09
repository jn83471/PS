
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import {
    DataGrid,
    useGridApiRef,
    type GridColDef
} from "@mui/x-data-grid"

import type {
    Dispatch,
    SetStateAction
} from "react"



type MauiTableProp = {
    data: any[]
    columns: GridColDef[]
    text: string
    title: string

    setId?:
    | Dispatch<SetStateAction<number>>
    | null

    setModal?:
    | Dispatch<SetStateAction<boolean>>
    | null

    rowspaning: boolean
    header?: boolean
    size?: number

    pinnedColumns?: Record<string, number>

    variant?: "default" | "planView"
}

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
    pinnedColumns = {},
    variant = "default"
}: MauiTableProp) => {
    const apiRef = useGridApiRef()

    const isPlanView =
        variant === "planView"

    const pinnedStyles = Object.entries(
        pinnedColumns
    ).reduce<Record<string, any>>(
        (styles, [field, left]) => {
            const selector =
                `.plan-pinned-${field}`

            const isLastPinned =
                field === "LevenDesign"

            styles[
                `& .MuiDataGrid-columnHeader${selector}`
            ] = {
                position: "sticky",
                left: `${left}px`,
                zIndex: 20,
                backgroundColor: "var(--page)",
                boxShadow: isLastPinned
                    ? "3px 0 6px rgba(15, 23, 42, 0.10)"
                    : "none"
            }

            styles[
                `& .MuiDataGrid-cell${selector}`
            ] = {
                position: "sticky",
                left: `${left}px`,
                zIndex: 10,
                backgroundColor: "var(--page)",
                boxShadow: isLastPinned
                    ? "3px 0 6px rgba(15, 23, 42, 0.10)"
                    : "none"
            }

            styles[
                `& .MuiDataGrid-row:nth-of-type(even) .MuiDataGrid-cell${selector}`
            ] = {
                backgroundColor: "var(--page)"
            }

            styles[
                `& .MuiDataGrid-row:hover .MuiDataGrid-cell${selector}`
            ] = {
                backgroundColor: "var(--page)"
            }

            return styles
        },
        {}
    )

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
            {header && (
                <div className="flex shrink-0 flex-col border-b border-[var(--border)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-center text-2xl font-bold sm:text-left text-[var(--color)]">
                        {title}
                    </h1>

                    <div className="pt-2 text-center sm:pt-0">
                        <button
                            type="button"
                            onClick={() => {
                                setId?.(0)
                                setModal?.(true)
                            }}
                            className="rounded-lg bg-[var(--accent)] text-[var(--accentColor)] px-4 py-2 font-semibold transition-colors"
                        >
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="sm:pr-2"
                            />

                            <span className="hidden sm:inline">
                                {text}
                            </span>
                        </button>
                    </div>
                </div>
            )}

            <div className="min-h-0 flex-1 overflow-hidden">
                <DataGrid
                    rows={data ?? []}
                    columns={columns}
                    columnBufferPx={isPlanView ? 5000 : 150}
                    apiRef={apiRef}
                    rowSpanning={rowspaning}
                    showToolbar
                    disableRowSelectionOnClick
                    columnHeaderHeight={
                        isPlanView ? 72 : 56
                    }
                    rowHeight={46}
                    pageSizeOptions={[
                        5,
                        10,
                        25,
                        50,
                        100
                    ]}
                    initialState={{
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterValues: []
                            }
                        },

                        pagination: {
                            paginationModel: {
                                pageSize: 25,
                                page: 0
                            }
                        }
                    }}
                    sx={{
                        height: "100%",
                        minHeight: 0,
                        width: "100%",
                        border: "none",
                        backgroundColor:
                            "var(--page)",
                        color: "var(--color)",
                        fontSize: size,
                        "& .MuiDataGrid-toolbar": {
                            backgroundColor:
                                "var(--page)",
                            color: "var(--color)",
                            borderColor:"var(--border)"
                        },
                        "& .MuiButtonBase-root.MuiIconButton-root":{
                            backgroundColor:
                                "var(--page)"
                        },
                        "& .css-120dh41-MuiSvgIcon-root, & [data-testid=ArrowUpwardIcon]":{
                            fill:"var(--color)",
                            backgroundColor:
                                "var(--page)",
                        },
                        "& .MuiDataGrid-main": {
                            minHeight: 0,
                            overflow: "hidden",
                            backgroundColor:
                                "var(--page)"
                        },

                        "& .MuiDataGrid-virtualScroller":
                        {
                            minHeight: 0,
                            overflow:
                                "auto !important",
                            backgroundColor:
                                "var(--page)"
                        },

                        "& .MuiDataGrid-toolbarContainer":
                        {
                            minHeight: "46px",
                            padding:
                                "6px 10px",
                            gap: "8px",
                            backgroundColor:
                                "var(--page)",
                            color: "var(--color)",
                            borderBottom:
                                "0px solid #e5e7eb"
                        },

                        "& .MuiDataGrid-toolbarContainer button":
                        {
                            color: "var(--color)",
                            borderRadius: "8px",
                            padding: "5px 8px",
                            textTransform:
                                "none",
                            fontWeight: 600
                        },

                        "& .MuiDataGrid-toolbarContainer button:hover":
                        {
                            backgroundColor:
                                "var(--page)"
                        },

                        "& .MuiDataGrid-topContainer":
                        {
                            backgroundColor:
                                "var(--page)",
                            zIndex: 15
                        },

                        "& .MuiDataGrid-columnHeaders":
                        {
                            backgroundColor:
                                "var(--headerTable)",
                            borderBottom:
                                "0px solid #d1d5db"
                        },

                        "& .MuiDataGrid-columnHeader":
                        {
                            backgroundColor:
                                "var(--headerTable)",
                            color: "var(--color)",
                            fontWeight: 700,
                            borderRight:
                                "0px solid #e5e7eb",
                            overflow: "visible"
                        },

                        "& .MuiDataGrid-columnHeaderTitleContainer":
                        {
                            alignItems:
                                "stretch",
                            height: "100%"
                        },

                        "& .MuiDataGrid-columnHeaderTitleContainerContent":
                        {
                            width: "100%",
                            height: "100%"
                        },

                        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                        {
                            outline: "none"
                        },

                        "& .MuiDataGrid-row": {
                            backgroundColor:
                                "var(--page)",
                            borderBottom:
                                "0px solid var(--border)"
                        },

                        "& .MuiDataGrid-row:nth-of-type(even)":
                        {
                            backgroundColor:
                                "var(--page)"
                        },

                        "& .MuiDataGrid-row:hover":
                        {
                            backgroundColor:
                                "var(--page)"
                        },

                        "& .MuiDataGrid-cell": {
                            display: "flex",
                            alignItems: "center",
                            color: "var(--color)",
                            borderRight:
                                "0px solid #f3f4f6",
                            borderBottom: "none",
                            paddingLeft: "8px",
                            paddingRight: "8px"
                        },

                        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within":
                        {
                            outline: "none"
                        },

                        "& .MuiDataGrid-footerContainer":
                        {
                            minHeight: "48px",
                            flexShrink: 0,
                            backgroundColor:
                                "var(--page)",
                            color: "var(--color)",
                            borderTop:
                                "1px solid var(--border)"
                        },

                        "& .MuiTablePagination-root":
                        {
                            color: "var(--color)"
                        },

                        "& ::-webkit-scrollbar":
                        {
                            width: "10px",
                            height: "10px"
                        },

                        "& ::-webkit-scrollbar-track":
                        {
                            backgroundColor:
                                "var(--page)"
                        },

                        "& ::-webkit-scrollbar-thumb":
                        {
                            backgroundColor:
                                "var(--page)",
                            borderRadius:
                                "999px",
                            border:
                                "2px solid var(--border)"
                        },

                        "& ::-webkit-scrollbar-thumb:hover":
                        {
                            backgroundColor:
                                "var(--page)"
                        },

                        ...pinnedStyles
                    }}
                />
            </div>
        </div>
    )
}