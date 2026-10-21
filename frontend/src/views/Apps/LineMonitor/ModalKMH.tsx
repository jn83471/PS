import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { MauiTable } from '../../../components/Gnr/MauiTable';

type ModalKMH = {
    title: string,
    options: any,
    optionspie: any,
    closeEvent: any,
    data: any,
    plant: number
}
export const ModalKMH = ({ title, options, optionspie, closeEvent, data, plant }: ModalKMH) => {
    const [type, setType] = useState("stack")

    console.log(plant)
    console.log(data)
    const column: GridColDef[] = [
        {
            field: 'machine', headerName: 'machine', width: 130, minWidth: 130, renderCell: (params) => (
                <>
                    {`${params.row.machine}`}
                </>
            )
        },
        { field: 'shortPart', headerName: 'shortPart' },
        { field: 'SMHCAS', headerName: 'shortPart' },
        { field: 'h7', headerName: 'h7' },
        { field: 'h8', headerName: 'h8' },
        { field: 'h9', headerName: 'h9' },
        { field: 'h10', headerName: 'h10' },
        { field: 'h11', headerName: 'h11' },
        { field: 'h12', headerName: 'h12' },
        { field: 'h13', headerName: 'h13' },
        { field: 'h14', headerName: 'h14' },
        { field: 'h15', headerName: 'h15' },
        { field: 'h16', headerName: 'h16' },
        { field: 'h17', headerName: 'h17' },
        { field: 'h18', headerName: 'h18' },
        { field: 'h19', headerName: 'h19' },
        { field: 'h20', headerName: 'h20' },
        { field: 'h21', headerName: 'h21' },
        { field: 'h22', headerName: 'h22' },
        { field: 'h23', headerName: 'h23' },
        { field: 'h24', headerName: 'h24' },
        { field: 'h25', headerName: 'h1' },
        { field: 'h26', headerName: 'h2' },
        { field: 'h27', headerName: 'h3' },
        { field: 'h28', headerName: 'h4' },
        { field: 'h29', headerName: 'h5' },
        { field: 'h30', headerName: 'h6' }

    ];

    const rows = useMemo(
        () => {
            const machines =
                data?.plants
                    ?.find(x => x.id === plant)
                    ?.Machine?.map(x => x.machineCode) ?? [];
            const datas = data?.data?.filter(
                x => machines.includes(x.LineId.split(" ")[0])
            ) ?? [];
            const hours = [
                ...new Set(datas?.map(x => x.HourId) ?? [])
            ].sort((a, b) => a - b);


            let ind = 1;

            const rows = machines.flatMap((machine) => {
                const shortParts = [
                    ...new Set(
                        datas
                            .filter(x => x.LineId.split(" ")[0] === machine)
                            .map(x => x.ShortPartNumber)
                    )
                ];

                return shortParts.map(shortPart => {
                    const row: Record<string, string | number> = {
                        id: ind++,
                        machine,
                        shortPart
                    };
                    const smhcas = data?.smhcas?.filter(x => x.ShortPart == shortPart) ?? []
                    if (smhcas.length > 0) {
                        row['SMHCAS']=Math.round(smhcas[0].Kmh*100)/100
                    }
                    else {
                        row['SMHCAS'] = 0
                    }

                    hours.forEach(hour => {
                        row[`h${hour}`] = datas
                            .filter(x =>
                                x.HourId === hour &&
                                x.ShortPartNumber === shortPart &&
                                x.LineId.split(" ")[0] === machine
                            )
                            .reduce((sum, x) => sum + x.Produced, 0);
                    });

                    return row;
                });
            });
            return rows

        }
        , [data])

    //console.log(rows)

    return (
        <div className="fixed bg-black/55 top-0 left-0 w-screen h-screen flex justify-center items-center gap-5 p-5">

            <div className="p-4 my-2 border bg-white  border-gray-200 rounded-2xl flex flex-col w-full relative max-h-[90vh]">
                <button onClick={() => closeEvent()} className='absolute bg-red-500 text-white font-bold rounded-full w-8 h-8 text-xl flex items-center justify-center right-0  top-0 translate-x-[50%] translate-y-[-50%] z-50'>
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className='max-h-[90vh] overflow-y-auto'>
                    <div className='flex-1 min-h-[50vh] w-full bg-white'>
                        <div className="flex flex-row">
                            <div className="flex-1">
                                <h2 className="font-bold text-2xl">
                                    {title}
                                </h2>
                            </div>
                            <div className=" border-gray-200 min-w-[20px] flex flex-row cursor-alias">
                                <button onClick={() => setType("stack")} className={`${type == "stack" ? "bg-purple-700 text-white" : ""}  p-2 rounded-l-2xl border border-gray-200`}>
                                    Barras
                                </button>
                                <button onClick={() => setType("pie")} className={`${type == "pie" ? "bg-purple-700 text-white" : ""} text-black p-2 border-t border-b border-gray-200`}>
                                    Pastel
                                </button>
                                <button onClick={() => setType("table")} className={`${type == "table" ? "bg-purple-700 text-white" : ""} text-black p-2 border border-gray-200 rounded-r-2xl`}>
                                    Tabla
                                </button>
                            </div>
                        </div>
                        <div className=" ">
                            <div className="">
                                {type == "stack" ?
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={options}
                                    />
                                    :
                                    type == "pie" ?
                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={optionspie}
                                        /> :
                                        <>
                                            <DataGrid pageSizeOptions={[5, 10]}  //apiRef={apiRef} 
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
                                                            pageSize: 10
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
                                        </>
                                }

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
