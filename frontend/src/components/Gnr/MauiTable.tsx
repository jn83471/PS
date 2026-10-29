//MauiTable anterior
/*
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

import {
    DataGrid,
    useGridApiRef,
    type GridColDef
} from "@mui/x-data-grid"

import type { Dispatch, SetStateAction } from "react"

type MauiTableVariant = "default" | "planView"

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
    pinnedColumns?: any
    variant?: MauiTableVariant
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
    variant = "default"
}: MauiTableProp) => {
    const apiRef = useGridApiRef()

    const isPlanView = variant === "planView"

    return (
        <div className="flex h-full min-h-0 flex-col">
            {header && (
                <div className="flex flex-col border-b border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-left">
                        {title}
                    </h1>

                    <div className="pt-2 text-center sm:pt-0">
                        <button
                            type="button"
                            onClick={() => {
                                setId?.(0)
                                setModal?.(true)
                            }}
                            className="
                                rounded-lg
                                bg-purple-600
                                px-4
                                py-2
                                font-semibold
                                text-white
                                transition-colors
                                hover:bg-purple-700
                            "
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

            <div className="min-h-0 flex-1">
                <DataGrid
                    rows={data ?? []}
                    columns={columns}
                    apiRef={apiRef}
                    rowSpanning={rowspaning}
                    showToolbar
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    getRowHeight={() => 46}
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
                    sx={
                        isPlanView
                            ? planViewTableStyles(size)
                            : defaultTableStyles(size)
                    }
                />
            </div>
        </div>
    )
}

const planViewTableStyles = (size: number) => ({
    height: "100%",
    width: "100%",
    border: "none",
    backgroundColor: "#ffffff",
    color: "#111827",
    fontSize: size,

    "& .MuiDataGrid-main": {
        backgroundColor: "#ffffff"
    },

    "& .MuiDataGrid-virtualScroller": {
        backgroundColor: "#ffffff"
    },

    "& .MuiDataGrid-toolbarContainer": {
        minHeight: "52px",
        padding: "8px 12px",
        gap: "8px",
        backgroundColor: "#ffffff",
        color: "#374151",
        borderBottom: "1px solid #e5e7eb"
    },

    "& .MuiDataGrid-toolbarContainer button": {
        color: "#4b5563",
        borderRadius: "8px",
        padding: "6px 10px",
        textTransform: "none",
        fontWeight: 600
    },

    "& .MuiDataGrid-toolbarContainer button:hover": {
        backgroundColor: "#f3f4f6"
    },

    "& .MuiInputBase-root": {
        color: "#111827"
    },

    "& .MuiInputBase-input": {
        color: "#111827",
        WebkitTextFillColor: "#111827"
    },

    "& .MuiInputBase-input::placeholder": {
        color: "#9ca3af",
        WebkitTextFillColor: "#9ca3af",
        opacity: 1
    },

    
    "& .MuiDataGrid-topContainer": {
        backgroundColor: "#f9fafb"
    },

    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#f9fafb",
        borderBottom: "1px solid #d1d5db"
    },

    "& .MuiDataGrid-columnHeader": {
        backgroundColor: "#f9fafb",
        color: "#374151",
        fontWeight: 700,
        borderRight: "1px solid #e5e7eb"
    },

    "& .MuiDataGrid-columnHeaderTitle": {
        fontWeight: 700,
        fontSize: "12px",
        whiteSpace: "normal",
        lineHeight: 1.2
    },

    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
    {
        outline: "none"
    },

    "& .MuiDataGrid-columnHeader .MuiSvgIcon-root": {
        color: "#6b7280"
    },

    "& .MuiDataGrid-menuIconButton": {
        color: "#6b7280"
    },

    "& .MuiDataGrid-sortIcon": {
        color: "#4b5563"
    },

    "& .MuiDataGrid-filterIcon": {
        color: "#2563eb"
    },

    "& .MuiDataGrid-row": {
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
        transition: "background-color 120ms ease"
    },

    "& .MuiDataGrid-row:nth-of-type(even)": {
        backgroundColor: "#fcfcfd"
    },

    "& .MuiDataGrid-row:hover": {
        backgroundColor: "#f3f4f6"
    },

    "& .MuiDataGrid-row.Mui-selected": {
        backgroundColor: "#eff6ff"
    },

    "& .MuiDataGrid-row.Mui-selected:hover": {
        backgroundColor: "#dbeafe"
    },

    "& .MuiDataGrid-cell": {
        display: "flex",
        alignItems: "center",
        color: "#374151",
        borderRight: "1px solid #f3f4f6",
        borderBottom: "none",
        paddingLeft: "8px",
        paddingRight: "8px"
    },

    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within":
    {
        outline: "none"
    },

    "& .MuiDataGrid-footerContainer": {
        minHeight: "52px",
        backgroundColor: "#ffffff",
        color: "#4b5563",
        borderTop: "1px solid #e5e7eb"
    },

    "& .MuiTablePagination-root": {
        color: "#4b5563"
    },

    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
    {
        color: "#6b7280",
        fontSize: "12px"
    },

    "& .MuiTablePagination-select": {
        color: "#111827"
    },

    "& .MuiDataGrid-footerContainer .MuiSvgIcon-root": {
        color: "#4b5563"
    },

    "& ::-webkit-scrollbar": {
        width: "10px",
        height: "10px"
    },

    "& ::-webkit-scrollbar-track": {
        backgroundColor: "#f3f4f6"
    },

    "& ::-webkit-scrollbar-thumb": {
        backgroundColor: "#cbd5e1",
        borderRadius: "999px",
        border: "2px solid #f3f4f6"
    },

    "& ::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#94a3b8"
    }
})

const defaultTableStyles = (size: number) => ({
    height: "100%",
    width: "100%",
    border: "none",
    backgroundColor: "white",
    fontSize: size,

    input: {
        color: "#000000"
    },

    "& .MuiInputBase-input::placeholder": {
        color: "#aaa",
        opacity: 1
    },

    "& .MuiDataGrid-main": {
        backgroundColor: "white"
    },

    "& .MuiDataGrid-toolbarContainer": {
        backgroundColor: "#1a1d25",
        color: "#fff"
    },

    "& .MuiDataGrid-topContainer": {
        backgroundColor: "white"
    },

    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "white"
    },

    "& .MuiDataGrid-columnHeader": {
        backgroundColor: "#f3f4f6",
        color: "#374151",
        fontWeight: "bold"
    },

    "& .MuiDataGrid-virtualScroller": {
        backgroundColor: "white",
        color: "black"
    },

    "& .MuiDataGrid-cell": {
        borderColor: "white"
    },

    "& .MuiDataGrid-footerContainer": {
        backgroundColor: "white",
        color: "black"
    },

    "& .MuiTablePagination-root": {
        color: "#374151"
    },

    "& .MuiSelect-select": {
        color: "black"
    },

    "& .MuiSvgIcon-root": {
        color: "#374151"
    },

    "& .MuiDataGrid-row:hover": {
        backgroundColor: "#f5f5f5"
    },

    "& .MuiDataGrid-row.Mui-selected": {
        backgroundColor: "#e5e7eb",
        color: "#374151",
        fontWeight: "bold",
        fontSize: "12px"
    },

    "& .MuiDataGrid-row.Mui-selected:hover": {
        backgroundColor: "#d1d5db"
    }
})

*/
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
                backgroundColor: "#f9fafb",
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
                backgroundColor: "#ffffff",
                boxShadow: isLastPinned
                    ? "3px 0 6px rgba(15, 23, 42, 0.10)"
                    : "none"
            }

            styles[
                `& .MuiDataGrid-row:nth-of-type(even) .MuiDataGrid-cell${selector}`
            ] = {
                backgroundColor: "#fcfcfd"
            }

            styles[
                `& .MuiDataGrid-row:hover .MuiDataGrid-cell${selector}`
            ] = {
                backgroundColor: "#f3f4f6"
            }

            return styles
        },
        {}
    )

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden">
            {header && (
                <div className="flex shrink-0 flex-col border-b border-gray-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-center text-2xl font-bold text-gray-900 sm:text-left">
                        {title}
                    </h1>

                    <div className="pt-2 text-center sm:pt-0">
                        <button
                            type="button"
                            onClick={() => {
                                setId?.(0)
                                setModal?.(true)
                            }}
                            className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-purple-700"
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
                            "#ffffff",
                        color: "#111827",
                        fontSize: size,

                        "& .MuiDataGrid-main": {
                            minHeight: 0,
                            overflow: "hidden",
                            backgroundColor:
                                "#ffffff"
                        },

                        "& .MuiDataGrid-virtualScroller":
                            {
                                minHeight: 0,
                                overflow:
                                    "auto !important",
                                backgroundColor:
                                    "#ffffff"
                            },

                        "& .MuiDataGrid-toolbarContainer":
                            {
                                minHeight: "46px",
                                padding:
                                    "6px 10px",
                                gap: "8px",
                                backgroundColor:
                                    "#ffffff",
                                color: "#374151",
                                borderBottom:
                                    "1px solid #e5e7eb"
                            },

                        "& .MuiDataGrid-toolbarContainer button":
                            {
                                color: "#4b5563",
                                borderRadius: "8px",
                                padding: "5px 8px",
                                textTransform:
                                    "none",
                                fontWeight: 600
                            },

                        "& .MuiDataGrid-toolbarContainer button:hover":
                            {
                                backgroundColor:
                                    "#f3f4f6"
                            },

                        "& .MuiDataGrid-topContainer":
                            {
                                backgroundColor:
                                    "#f9fafb",
                                zIndex: 15
                            },

                        "& .MuiDataGrid-columnHeaders":
                            {
                                backgroundColor:
                                    "#f9fafb",
                                borderBottom:
                                    "1px solid #d1d5db"
                            },

                        "& .MuiDataGrid-columnHeader":
                            {
                                backgroundColor:
                                    "#f9fafb",
                                color: "#374151",
                                fontWeight: 700,
                                borderRight:
                                    "1px solid #e5e7eb",
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
                                "#ffffff",
                            borderBottom:
                                "1px solid #f3f4f6"
                        },

                        "& .MuiDataGrid-row:nth-of-type(even)":
                            {
                                backgroundColor:
                                    "#fcfcfd"
                            },

                        "& .MuiDataGrid-row:hover":
                            {
                                backgroundColor:
                                    "#f3f4f6"
                            },

                        "& .MuiDataGrid-cell": {
                            display: "flex",
                            alignItems: "center",
                            color: "#374151",
                            borderRight:
                                "1px solid #f3f4f6",
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
                                    "#ffffff",
                                color: "#4b5563",
                                borderTop:
                                    "1px solid #e5e7eb"
                            },

                        "& .MuiTablePagination-root":
                            {
                                color: "#4b5563"
                            },

                        "& ::-webkit-scrollbar":
                            {
                                width: "10px",
                                height: "10px"
                            },

                        "& ::-webkit-scrollbar-track":
                            {
                                backgroundColor:
                                    "#f3f4f6"
                            },

                        "& ::-webkit-scrollbar-thumb":
                            {
                                backgroundColor:
                                    "#cbd5e1",
                                borderRadius:
                                    "999px",
                                border:
                                    "2px solid #f3f4f6"
                            },

                        "& ::-webkit-scrollbar-thumb:hover":
                            {
                                backgroundColor:
                                    "#94a3b8"
                            },

                        ...pinnedStyles
                    }}
                />
            </div>
        </div>
    )
}