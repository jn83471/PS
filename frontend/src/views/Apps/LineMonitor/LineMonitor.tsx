import { faBox, faBoxesPacking, faUpDown, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { CardPorcentaje } from "../../../components/Gnr/CardPorcentaje";
import { GraphMonitor } from "../../../components/LineMonitor/GraphMonitor";
import { useQuery } from "@tanstack/react-query";
import { GetLineMonitor } from "../../../api/Apps/LineMonitor/LineMonitorApi";
import { ModalKMH } from "./ModalKMH";

export const LineMonitor = () => {
    const [fecha, setFecha] = useState<Dayjs | null>(dayjs());
    const [personName, setPersonName] = useState<string[]>([]);
    const [modal, setModal] = useState("")

    const [shift, setShift] = useState<number>(0)
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['LineMonitor', fecha?.format("YYYY-MM-DD"), shift],
        queryFn: () => GetLineMonitor(fecha?.format("YYYY-MM-DD"), shift),
        enabled: !!fecha,
        retry: false,
        refetchInterval: 60000
    })
    const [plant, setPlant] = useState<number>(0)

    useEffect(() => {
        const loadData = async () => {
            if (!plant && data?.plants?.length > 0) {
                setPlant(data.plants[0].id);
            }
        }
        loadData()
    }, [data]);



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
    const names = data
        ? data.plants
            ?.find(m => m.id === plant)
            ?.Machine?.map(m => m.machineCode) || []
        : [];

    const includedMachines = data?.data?.filter(item => {
        const lineCode = item.LineId.split('-')[0].trim();
        const include = names.includes(lineCode);
        if (personName.length > 0) {
            return personName.includes(lineCode);
        }
        //console.log(personName)
        return include
    }).map(item => {
        const smhca = data.smhcas.find(
            s => s.ShortPart === item.ShortPartNumber
        );
        return {
            ...item,
            kmh: smhca?.Kmh ?? 0
        };
    }) ?? []

    const totalProduced = includedMachines.reduce(
        (sum, item) => sum + item.Produced,
        0
    );

    const totalDefects = includedMachines.reduce(
        (sum, item) => sum + item.Defects,
        0
    );
    const totalkmh = includedMachines.reduce(
        (sum, item) => sum + item.Produced * item.kmh,
        0
    );
    const hours = [
        ...new Set(
            includedMachines.map(item => item.HourId)
        )
    ].sort((a, b) => a - b);

    const series = hours.sort((a, b) => b - a).map(hour => ({
        name: `${hour}`,
        data: names.map(machine => {

            /*const row = includedMachines.find(item =>
                item.HourId === hour &&
                item.LineId.split('-')[0].trim() === machine
            );

            return row ? row.Produced : 0;*/
            const row = includedMachines.filter(
                item =>
                    item.HourId === hour &&
                    item.LineId.split('-')[0].trim() === machine
            );

            return row.reduce((sum, item) => sum + item.Produced, 0);
        })
    }));
    const serieskmh = hours.sort((a, b) => b - a).map(hour => ({
        name: `${hour}`,
        data: names.map(machine => {

            /*const row = includedMachines.find(item =>
                item.HourId === hour &&
                item.LineId.split('-')[0].trim() === machine
            );

            return row ? (row.Produced * row.kmh) : 0;*/
            const row = includedMachines.filter(
                item =>
                    item.HourId === hour &&
                    item.LineId.split('-')[0].trim() === machine
            );

            return row.reduce((sum, item) => sum + (item.Produced * item.kmh), 0);

        })
    }));
    const seriesdefects = hours.sort((a, b) => b - a).map(hour => ({
        name: `${hour}`,
        data: names.map(machine => {

            const row = includedMachines.find(item =>
                item.HourId === hour &&
                item.LineId.split('-')[0].trim() === machine
            );

            return row ? row.Defects : 0;
            /*const row = includedMachines.filter(
                item =>
                    item.HourId === hour &&
                    item.LineId.split('-')[0].trim() === machine
            );

            return row.reduce((sum, item) => sum + item.Defects, 0);*/

        })
    }));

    const pieData = Object.values(
        includedMachines.reduce((acc, item) => {

            const machine = item.LineId.split('-')[0].trim();

            if (!acc[machine]) {
                acc[machine] = {
                    name: machine,
                    y: 0
                };
            }

            acc[machine].y += item.Produced;

            return acc;
        }, {})
    );
    const pieKmh = Object.values(
        includedMachines.reduce((acc, item) => {

            const machine = item.LineId.split('-')[0].trim();

            if (!acc[machine]) {
                acc[machine] = {
                    name: machine,
                    y: 0
                };
            }

            acc[machine].y += (item.Produced * item.kmh);

            return acc;
        }, {})
    );
    const pieDefects = Object.values(
        includedMachines.reduce((acc, item) => {

            const machine = item.LineId.split('-')[0].trim();

            if (!acc[machine]) {
                acc[machine] = {
                    name: machine,
                    y: 0
                };
            }

            acc[machine].y += item.Defects;

            return acc;
        }, {})
    );


    const options = {
        chart: {
            type: 'column',
            height: 700,
        },

        title: {
            text: 'Producción'
        },

        xAxis: {
            categories: names
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Producción'
            },
            stackLabels: {
                enabled: true
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },

        series
    };
    const optionspie = {
        chart: {
            type: 'pie'
        },

        title: {
            text: 'Producción por Máquina'
        },

        tooltip: {
            pointFormat:
                '<b>{point.y}</b> piezas ({point.percentage:.1f}%)'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br/>{point.y}'
                }
            }
        },

        series: [{
            name: 'Producción',
            data: pieData
        }]
    };
    const optionspiekmh = {
        chart: {
            type: 'pie'
        },

        title: {
            text: 'Producción por Máquina'
        },

        tooltip: {
            pointFormat:
                '<b>{point.y}</b> piezas ({point.percentage:.1f}%)'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br/>{point.y:.2f}'
                }
            }
        },

        series: [{
            name: 'Producción',
            data: pieKmh
        }]
    };

    const optionskmh = {
        chart: {
            type: 'column',
            height: 700
        },

        title: {
            text: 'Producción'
        },

        xAxis: {
            categories: names
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Producción'
            },
            stackLabels: {
                enabled: true
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.2f}'
                }
            }
        },

        series: serieskmh
    };

    const optionsDefect = {
        chart: {
            type: 'column'
        },

        title: {
            text: 'Defectos'
        },

        xAxis: {
            categories: names
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Producción'
            },
            stackLabels: {
                enabled: true
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            }
        },

        series: seriesdefects
    };
    const optionspiedefects = {
        chart: {
            type: 'pie'
        },

        title: {
            text: 'Producción por Máquina'
        },

        tooltip: {
            pointFormat:
                '<b>{point.y}</b> piezas ({point.percentage:.1f}%)'
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br/>{point.y}'
                }
            }
        },

        series: [{
            name: 'Producción',
            data: pieDefects
        }]
    };
    const handleChange = (event: SelectChangeEvent) => {
        //setPersonName(event.target.value as string);
        const value = event.target.value;

        setPersonName(
            typeof value === "string"
                ? value.split(",")
                : value
        );
    };
    const handleChangePlant = (event: SelectChangeEvent) => {
        setPlant(Number(event.target.value));
    };


    /* cards*/
    const hourlyData = Object.values(
        includedMachines.reduce((acc, item) => {
            if (!acc[item.HourId]) {
                acc[item.HourId] = {
                    hour: item.HourId,
                    total: 0

                };
            }
            acc[item.HourId].total += item.Produced;
            return acc;
        }, {})
    ).sort((a, b) => a.hour - b.hour);

    const categories = hourlyData.map(item => `${item.hour}`);

    const seriesCard1 = [
        {
            name: 'Producción',
            data: hourlyData.map(item => item.total)
        }
    ];
    const hourlyData2 = Object.values(
        includedMachines.reduce((acc, item) => {
            if (!acc[item.HourId]) {
                acc[item.HourId] = {
                    hour: item.HourId,
                    total: 0

                };
            }
            acc[item.HourId].total += item.Defects;
            return acc;
        }, {})
    ).sort((a, b) => a.hour - b.hour);


    const seriesCard2 = [
        {
            name: 'Producción',
            data: hourlyData2.map(item => item.total)
        }
    ];
    const hourlyData3 = Object.values(
        includedMachines.reduce((acc, item) => {
            if (!acc[item.HourId]) {
                acc[item.HourId] = {
                    hour: item.HourId,
                    total: 0

                };
            }
            acc[item.HourId].total += (item.Produced * item.kmh);
            return acc;
        }, {})
    ).sort((a, b) => a.hour - b.hour);


    const seriesCard3 = [
        {
            name: 'Producción',
            data: hourlyData3.map(item => item.total)
        }
    ];

    const optionsCard1 = {
        chart: {
            type: 'line',
            height: 40,
            backgroundColor: 'transparent'
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },

        xAxis: {
            categories: hourlyData.map(x => x.hour),
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            lineWidth: 0,
            tickLength: 0
        },

        yAxis: {
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0
        },

        tooltip: {
            pointFormat: '<b>{point.y}</b>'
        },

        series: [
            {
                name: 'Producción',
                data: hourlyData.map(x => x.total),
                color: 'green', // rojo
                showInLegend: false
            }
        ]
    };
    const optionsCard2 = {
        chart: {
            type: 'line',
            height: 40,
            backgroundColor: 'transparent'
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },

        xAxis: {
            categories: hourlyData2.map(x => x.hour),
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            lineWidth: 0,
            tickLength: 0
        },

        yAxis: {
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0
        },

        tooltip: {
            pointFormat: '<b>{point.y}</b>'
        },

        series: [
            {
                name: 'Producción',
                data: hourlyData2.map(x => x.total),
                color: 'red', // rojo
                showInLegend: false
            }
        ]
    };
    const optionsCard3 = {
        chart: {
            type: 'line',
            height: 40,
            backgroundColor: 'transparent'
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },

        xAxis: {
            categories: hourlyData3.map(x => x.hour),
            labels: {
                enabled: false
            },
            title: {
                text: null
            },
            lineWidth: 0,
            tickLength: 0
        },

        yAxis: {
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0
        },

        tooltip: {
            pointFormat: '<b>{point.y}</b>'
        },

        series: [
            {
                name: 'Producción',
                data: hourlyData3.map(x => x.total),
                color: 'blue', // rojo
                showInLegend: false
            }
        ]
    };

    if (isLoading) {
        return <></>;
    }
    if (isError) {
        return (
            <div>
                {(error as Error)?.message ?? "Error al cargar información"}
            </div>
        );
    }
    return (
        <>
            <div className="h-[calc(100vh-120px)] flex flex-col">
                <h1 className="text-2xl font-bold">
                    LineMonitor
                </h1>

                <div className="pt-3 grid grid-cols-1  sm:grid-cols-4  gap-2">

                    <DatePicker
                        label="Fecha"
                        openTo="year"
                        views={['year', 'month', 'day']}
                        yearsOrder="desc"
                        value={fecha}
                        onChange={async (newValue) => {
                            //await setFecha(dayjs(`${newValue?.toDate().getFullYear()}-${(newValue!.toDate().getMonth() + 1)}-${newValue?.toDate().getDay()}`))
                            setFecha(newValue);
                            //setValue("fecha", fecha?.format("YYYY-MM-DD"))
                        }}
                        sx={{
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
                    <FormControl>
                        <InputLabel id="demo-multiple-name-label">Planta</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={plant}
                            onChange={handleChangePlant}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {data?.plants?.map((plant) => (
                                <MenuItem
                                    key={plant.id}
                                    value={plant.id}
                                //style={getStyles(name, personName, theme)}
                                >
                                    {plant.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl >
                        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Name" />}
                            MenuProps={MenuProps}
                        >
                            {names.map((name) => (
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
                        <InputLabel className='text-black' id="demo-simple-select-label"
                            sx={{
                                color: "black"
                            }}
                        >Turno</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={shift}
                            label="Age"
                            onChange={async (e) => {
                                setShift(Number(e.target.value))
                            }}
                            sx={{
                                width: "130px",
                                color: "black !important",
                                "& .MuiSelect-select": {
                                    color: "black",
                                    WebkitTextFillColor: 'black !important',
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#3b82f6",
                                },
                                "& .MuiInputBase-input": {
                                    color: "#fff !important",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#60a5fa",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#60a5fa",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "black !important",
                                },
                                "& span, legend input": {
                                    color: "black !important",
                                    fill: "black !important",
                                },
                            }}
                        >
                            <MenuItem value={0}>Todos</MenuItem>
                            <MenuItem sx={{
                            }} value={1}>Turno 1</MenuItem>
                            <MenuItem value={2}>Turno 2</MenuItem>
                            <MenuItem value={3}>Turno 3</MenuItem>
                        </Select>
                    </FormControl>

                </div>
                <div className="grid lg:grid-cols-3 grid-cols-1 py-4 gap-2">
                    <CardPorcentaje option={optionsCard1} textColor="text-green-700" backgroudColor="bg-green-100" qty={totalProduced} title="Piezas producidas" />
                    <CardPorcentaje option={optionsCard2} textColor="text-red-700" backgroudColor="bg-red-100" qty={totalDefects} title="Defectos" />
                    <CardPorcentaje option={optionsCard3} textColor="text-blue-700" backgroudColor="bg-blue-100" qty={totalkmh} title="KMH" />
                </div>
                <div className="flex-1  gap-2">
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 ">
                        <GraphMonitor title={"Total Producido"} options={options} optionspie={optionspie} DetailEvent={() => {
                            setModal("PIECES")
                        }} />

                        <GraphMonitor title={"Producción por hora"} options={optionskmh} optionspie={optionspiekmh} DetailEvent={() => {
                            setModal("KMH")
                        }} />
                    </div>
                    <GraphMonitor title={"Defectos"} options={optionsDefect} optionspie={optionspiedefects} DetailEvent={() => {
                        setModal("DEFECTS")
                    }} />

                </div>
            </div>
            {
                (modal === "KMH") && <ModalKMH plant={plant} data={data} title={"Producción por hora"} options={optionskmh} optionspie={optionspiekmh} closeEvent={() => {
                    setModal("")
                }} />
            }
        </>
    )
}
