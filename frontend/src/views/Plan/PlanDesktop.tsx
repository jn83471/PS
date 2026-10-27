import { faBoxes, faEdit, faGear, faTable, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { useEffect, useMemo, useState } from 'react'
import { ReactTable } from '../../components/Gnr/ReactTable'
import Button from '@mui/material/Button'
import type { ColDef } from 'ag-grid-community'
import dayjs from 'dayjs'
import { PlanEditModal } from '../../components/Plan/PlanEditModal'
import { PlanModal } from '../../components/Plan/PlanModal'
import ExcelPreview from '../../components/Gnr/ExcelPreview'
import { PlantCardSystem } from '../../components/Plan/PlantCardSystem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
type PlanDesktopProp = {
    DownloadFile, fecha, setValue, setFecha,
    modal, setModal, modalAddToEdit, setModalAddToEdit, setSelectPlan
    data,
    HandleDeletePlan, handleSubmit, HandleSubmitCreateSuppliers, file, handleFile, selectPlan, refetch, lines
}
export const PlanDesktop = ({ DownloadFile, fecha, setValue, setFecha, modal, setModal, modalAddToEdit, setModalAddToEdit, setSelectPlan, data, HandleDeletePlan,
    handleSubmit, HandleSubmitCreateSuppliers, file, handleFile, selectPlan, refetch, lines
}: PlanDesktopProp) => {
    const [isLargeScreen, setIsLargeScreen] = useState(
        window.innerWidth >= 1660
    );

    const [view, setView] = useState<string>("Table")
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [personName, setPersonName] = useState<string[]>([]);
    const [shift, setShift] = useState(0)
    const [plan, setPlan] = useState(0)


    const handleChange = (event: SelectChangeEvent) => {
        //setPersonName(event.target.value as string);
        const value = event.target.value;

        setPersonName(
            typeof value === "string"
                ? value.split(",")
                : value
        );
    };


    const column: ColDef[] = [
        {
            field: "machine",
            headerName: "Código",
            width: 100,
            pinned: "left",
        },
        {
            field: "Capacity",
            headerName: "Capacidad",
            width: 120,
        },
        {
            field: "Line",
            headerName: "Línea",
            width: 200,
        },
        {
            field: "Program",
            headerName: "Program",
            width: 150,
        },
        {
            field: "Shortpart",
            headerName: "Shortpart",
            width: 130,
            pinned: "left",
        },
        {
            field: "Shift",
            headerName: "Shift",
            width: 90,
            pinned: "left",
        },
        {
            field: "PartNumber",
            headerName: "Número de Parte",
            width: 200,
        },
        {
            field: "Customer",
            headerName: "Cliente",
            width: 180,
        },
        {
            field: "LevenDesign",
            headerName: "Nivel Diseño",
            width: 180,
        },

        {
            field: "Kmh",
            headerName: "Kmh",
            width: 120,
        },

        ...Array.from({ length: 31 }, (_, i) => ({
            field: `d${i + 1}`,
            headerName: `D${i + 1}`,
            width: 85,
            cellRenderer: (params: any) => params.data[`d${i + 1}`].toLocaleString()
        })),
        {
            field: "Total",
            headerName: "Total",
            width: 85,
            cellRenderer: (params: any) => {

                const total = Array.from(
                    { length: 31 },
                    (_, i) => Number(params.data[`d${i + 1}`] || 0)
                ).reduce((acc, value) => acc + value, 0);

                return <>{total.toLocaleString()}</>;
            }
        },

        {
            field: "acciones",
            headerName: "Acciones",
            width: 250,
            pinned: isLargeScreen ? "right" : false,
            floatingFilter: false,
            cellRenderer: (params: any) => (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => {
                            setModalAddToEdit(true);
                            setSelectPlan(params.data);
                        }}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="pr-1"
                        />
                        Editar
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() =>
                            HandleDeletePlan(params.data.id)
                        }
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="pr-1"
                        />
                        Eliminar
                    </Button>
                </>
            ),
        },
    ];

    const MenuProps = {
        slotProps: {
            paper: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        },
    };
    const rows = data?.filter(x => (personName.includes(x.machine) || personName.length == 0) &&
        (shift == 0 || x.Shift == shift) &&
        ((Array.from(
            { length: 31 },
            (_, i) => Number(x[`d${i + 1}`] || 0)
        ).filter(value => value > 0).length > 0 && plan == 1)
            || plan == 0 
            || (Array.from(
                { length: 31 },
                (_, i) => Number(x[`d${i + 1}`] || 0)
            ).filter(value => value > 0).length == 0 && plan == 2)))


    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 1660);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className="flex-1 min-w-0 sm:p-4">

                <div className='bg-white border border-gray-400 rounded-xl py-5 px-2 w-full min-h-[75vh] relative'>
                    <div className="flex flex-col lg:flex-row border-b border-gray-200 items-center py-2 lg:py-0">
                        <div className="flex-1 flex flex-row items-center py-2">
                            <div className="flex-1">
                                <div className="text-3xl font-bold">
                                    Plan de producción
                                </div>
                                <div className="text-gray-400 text-sm">
                                    Consulta y seguimiento de la producción
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                                onClick={DownloadFile}>Descargar</button>
                            <button className="mt-2 sm:mt-0 mx-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                                onClick={() => setModal(true)}>Subir</button>
                            <button className="mt-2 sm:mt-0 mx-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white"
                                onClick={() => {
                                    setModalAddToEdit(true)
                                    setSelectPlan(null)
                                }}>Nuevo</button>
                        </div>
                    </div>

                    <section className="flex flex-col md:flex-row sm:justify-between py-2 justify-end">
                        <div className='flex flex-col md:flex-row gap-1 flex-1'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-1'>
                                <DatePicker
                                    label="Years in descending order"
                                    openTo="year"
                                    views={['year', 'month']}
                                    yearsOrder="desc"
                                    value={fecha}
                                    onChange={async (newValue) => {
                                        await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                                        setValue("fecha", fecha?.format("YYYY-MM-DD"))
                                        //refetch()
                                    }}
                                    sx={{
                                        width: "100%",
                                        '& .MuiInputBase-input': {

                                            color: '#fff',
                                        },
                                        '& .MuiInputLabel-root': {
                                            color: '#ccc',
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: '#fff',
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#fff',
                                        },

                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#888',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#fff',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                        {
                                            borderColor: '#fff',
                                        },
                                        '& input::placeholder': {
                                            color: '#ccc',
                                            opacity: 1,
                                        },
                                    }}

                                />
                                <FormControl >
                                    <InputLabel id="demo-multiple-name-label">Lineas</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        value={personName}
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        {lines.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                            //style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl >
                                    <InputLabel id="demo-multiple-name-label">Turno</InputLabel>
                                    <Select
                                        value={shift}
                                        onChange={(e) => setShift(e.target.value)}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        {Array.from({ length: 3 }).map((_, index) => (
                                            <MenuItem
                                                key={index}
                                                value={index}
                                            //style={getStyles(name, personName, theme)}
                                            >
                                                {index == 0 ? "Todos" : `Turno ${index}`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl >
                                    <InputLabel id="demo-multiple-name-label">Plan</InputLabel>
                                    <Select
                                        value={plan}
                                        onChange={(e) => setPlan(e.target.value)}
                                        input={<OutlinedInput label="Name" />}
                                        MenuProps={MenuProps}
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        <MenuItem
                                            value={0}
                                        //style={getStyles(name, personName, theme)}
                                        >
                                            Todos
                                        </MenuItem>
                                        <MenuItem
                                            value={1}
                                        //style={getStyles(name, personName, theme)}
                                        >
                                            Con Plan
                                        </MenuItem>
                                        <MenuItem
                                            value={2}
                                        //style={getStyles(name, personName, theme)}
                                        >
                                            Sin Plan
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </div>

                        <div className="py-2 sm:py-0 text-right w-full md:w-[6rem]">
                            <button onClick={() => setView("Table")} className={`${view === "Table" ? "bg-purple-500 text-white" : ""} p-2 rounded-l-lg  border border-gray-200`}>
                                <FontAwesomeIcon icon={faTable} />
                            </button>
                            <button onClick={() => setView("Cards")} className={`${view === "Cards" ? "bg-purple-500 text-white" : ""} p-2 rounded-r-lg  border border-gray-200`}>
                                <FontAwesomeIcon icon={faBoxes} />
                            </button>
                        </div>



                    </section>
                    {view === "Table" ?
                        <ReactTable header={true} rowspaning={false} setId={null} title='' data={rows} setModal={null} columns={column} text={"Nueva planta"} />
                        :
                        <PlantCardSystem lines={lines} setPersonName={setPersonName} names={personName} data={rows} fecha={fecha} />
                    }
                </div>

                {modal &&
                    <form onSubmit={handleSubmit(HandleSubmitCreateSuppliers)} className='fixed w-screen h-screen top-0 left-0 bg-black/30 flex justify-center items-center text-black z-50'>
                        <div className="bg-white border border-amber-50 w-[1200px] max-w-[100%] min-h-[400px] rounded-2xl shadow-2xs shadow-black/75 p-4">
                            <div className="flex flex-row items-center gap-2">
                                <div>
                                    <div className="bg-green-800 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                                        <FontAwesomeIcon className="text-2xl text-white" icon={faGear} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Subir Plan de producción
                                    </h2>
                                    <small className="text-gray-600">
                                        Subir plan de produccion de los meses seleccionados
                                    </small>
                                </div>
                            </div>
                            <div className="py-4">
                                <div className="flex flex-row">

                                    <DatePicker
                                        label="Years in descending order"
                                        openTo="year"
                                        views={['year', 'month']}
                                        yearsOrder="desc"
                                        value={fecha}
                                        onChange={async (newValue) => {
                                            await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                                        }}
                                        sx={{
                                            '& .MuiInputBase-input': {

                                                color: '#fff',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: '#ccc',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                color: '#113b2b',
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: 'black',
                                            },

                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#888',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#fff',
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                            {
                                                borderColor: '#fff',
                                            },
                                            '& input::placeholder': {
                                                color: 'black',
                                                opacity: 1,
                                            },
                                        }}

                                    />
                                    <input
                                        type="file"
                                        accept=".xlsx,.xls"
                                        onChange={
                                            handleFile
                                        }
                                        className="border border-gray-300 rounded ml-2 flex justify-center items-center text-center py-3 px-3"
                                    />

                                </div>

                            </div>
                            <div className="h-[40vh] flex w-full flex-row justify-center">
                                {file && (

                                    <ExcelPreview file={file} />

                                )}
                            </div>
                            <div className="flex justify-end pr-4">
                                <button onClick={() => setModal(false)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-white mr-2">
                                    Cancelar
                                </button>
                                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold text-white">
                                    Guardar
                                </button>
                            </div>

                        </div>
                    </form>}
                {
                    (modalAddToEdit && !selectPlan) &&
                    <PlanModal setModalAddToEdit={setModalAddToEdit} refetch={refetch} />
                }
                {
                    (modalAddToEdit && selectPlan) &&
                    <PlanEditModal plan={selectPlan} setModalAddToEdit={setModalAddToEdit} refetch={refetch} />
                }
            </div>
        </>
    )
}
