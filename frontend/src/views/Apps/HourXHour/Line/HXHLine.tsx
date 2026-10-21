const start = new Date('2026-10-06 07:00');
const end = new Date('2026-10-07 06:00');
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from "@fullcalendar/react/timegrid";
import interactionPlugin from '@fullcalendar/react/interaction'; // for selectable
import Typography from '@mui/material/Typography';
import '@fullcalendar/react/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/react/themes/forma/theme.css'; // YOUR THEME
import '@fullcalendar/react/themes/forma/palettes/purple.css'; // YOUR THEME'S PALETTE
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useAuthWithApps } from '../../../../hook/useAuth';
import { GetTimeZone } from '../../../../hook/GetTimeZone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faCancel, faClock, faClockFour, faCoffee, faCookie, faInfo, faInfoCircle, faSave, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { GetMachines } from '../../../../api/MachineApis';
import { useQuery } from '@tanstack/react-query';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import type { HourByHourEventsForm } from '../../../../types/HourByHour/HourByHourEventsSchema';
import { Controller, useForm } from 'react-hook-form';



export const HXHLine = () => {
    const auth = useAuthWithApps()

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['Machine'],
        queryFn: GetMachines,
        retry: false
    })
    const [machine, setMachine] = useState(0)

    const Event = useQuery({
        queryKey: ['HourByHourEvents', machine],
        queryFn: () => HourByHourGetEvents(machine),
        enabled: machine != 0,
        retry: false,
        refetchInterval: 60000
    })

    const events = useMemo((x) => {
        let dt = []
        if (Event.isLoading) {
            return []
        }
        dt = Event?.data?.map(x => {
            return {
                id: x.id,
                title: x.Description,
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                startTime: x.Start.split('T')[1].substring(0, 5),
                endTime: x.End.split('T')[1].substring(0, 5)
            }
        })
        return dt ?? []
    }, [Event])

    const initialValues: HourByHourEventsForm = {
        Type: 0,
        Start: '',
        End: '',
        Description:''
    }
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm<HourByHourEventsForm>({ defaultValues: initialValues })
    const [showModal, setShowModal] = useState<boolean>()

    const TimeZone = GetTimeZone(auth?.data?.TimeZone)

    const dt = useMemo(() => {
        const hours = Array.from({ length: 24 }, (_, i) => ({
            hour: i,
            used: new Set<number>(),
        }));

        events?.forEach((event) => {
            if (event.start && event.end) {

                const start = new Date(event.start);
                const end = new Date(event.end);

                const current = new Date(start);

                while (current < end) {
                    hours[current.getHours()].used.add(
                        current.getMinutes()
                    );

                    current.setMinutes(
                        current.getMinutes() + 1
                    );
                }
            }

            // Evento recurrente
            else if (event.startTime && event.endTime) {

                const [startHour, startMinute] =
                    event.startTime.split(":").map(Number);

                const [endHour, endMinute] =
                    event.endTime.split(":").map(Number);

                const current = new Date();
                current.setHours(startHour, startMinute, 0, 0);

                const end = new Date();
                end.setHours(endHour, endMinute, 0, 0);

                while (current < end) {
                    hours[current.getHours()].used.add(
                        current.getMinutes()
                    );

                    current.setMinutes(
                        current.getMinutes() + 1
                    );
                }
            }
        });

        return hours.map((hour) => ({
            hour: hour.hour,
            available: 60 - hour.used.size,
            occupied: hour.used.size,
        }));
    }, [events])

    const handleDateClick = (info) => {
        setValue("Start", new Date(info.dateStr).toLocaleDateString('es-MX', {
            timeZone: TimeZone,
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            hour12: false,
            minute: '2-digit'
        }).split(" ")[1])
        const endDate = new Date(info.dateStr);
        endDate.setMinutes(endDate.getMinutes() + 30);
        setValue("End", endDate.toLocaleTimeString("es-MX", {
            timeZone: TimeZone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }))
        setShowModal(true)
    };
    const handleClickEvent = (info) => {
        console.log(info.event._def)
        console.log(info.event.start)
        const d = events.map(x => {
            if (x.id == info.event._def.publicId) {
                return {
                    "id": x.id,
                    "title": x.title,
                    "start": dayjs(info.event.start)
                        .tz(TimeZone)
                        .format("YYYY-MM-DD HH:mm:ss"),
                    "end": dayjs(info.event.end)
                        .tz(TimeZone)
                        .format("YYYY-MM-DD HH:mm:ss")
                }
            }
            return x
        }

        )
        //setEvents(d)
        console.log(d)
    }

    const handleAddEvent=async (formData:HourByHourEventsForm)=>{
        console.log(formData)
    }


    return (
        < div
            className='p-2 border rounded-lg'

        >
            <div className='flex flex-row'>
                <div className='p-2 flex-1'>
                    <div className="font-bold text-2xl">
                        Configuración de Tiempos
                    </div>

                    <Typography color="text.secondary">
                        Desayunos, comidas, limpiezas y tiempos muertos
                    </Typography>
                </div>
                <div className='w-[200px]'>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={machine}
                        style={{
                            width: "100%"
                        }}
                        onChange={(e) => {
                            setMachine(e.target.value)
                        }
                            //handleChangePlant
                        }
                    >
                        {data?.map((machine) => (
                            <MenuItem
                                key={machine.id}
                                value={machine.id}
                            //style={getStyles(name, personName, theme)}
                            >
                                {machine.machineCode}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>

            {/*<FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridDay"
                headerToolbar={false}
                dayHeaders={false}
                allDaySlot={false}
                initialDate={'2026-10-07'}
                id='mycalendar'
                className='mycalendar'
                editable={true}
                events={events}
                slotMinTime="07:00:00"
                slotMaxTime="30:00:00"
                duration={'00:15:00'}
                slotDuration={'00:15:00'}
                dateClick={handleDateClick}
            />*/}
            <div className='flex flex-row'>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    timeZone="UTC"
                    initialView="timeGridDay"
                    className='mycalendar flex-1'
                    headerToolbar={false}
                    dayHeaders={false}
                    allDaySlot={false}
                    timeZoneParam={TimeZone}
                    timeZone={TimeZone}
                    duration={'00:15:00'}
                    slotDuration={'00:10:00'}
                    snapDuration="00:10:00"
                    slotMinTime="07:00:00"
                    slotMaxTime="31:00:00"
                    height={"calc(100vh-150px)"}
                    dateClick={handleDateClick}
                    eventClick={handleClickEvent}
                    editable={true}

                    eventDrop={handleClickEvent}
                    eventDurationEditable={true}
                    eventResizableFromStart={true}
                    //events="https://fullcalendar.io/api/demo-feeds/events.json"
                    events={events}
                    slotEventOverlap={false}
                    eventMaxStack={5}
                    eventContent={(arg) => (
                        <div>
                            <strong>{arg.timeText}</strong>
                            <br />
                            {arg.event.title}
                        </div>
                    )}
                />
                {

                }
                <div className='w-[450px] flex flex-col gap-4 max-h-[calc(100vh-150px)] overflow-y-auto'>
                    {Array.from({ length: 24 }).map((_, index) => (
                        <div className='border border-gray-200 px-2 py-4 rounded-lg'>
                            <div className='text-2xl'>
                                Horas habiles
                            </div>
                            <div className='flex flex-row items-center gap-2'>
                                <div>
                                    <FontAwesomeIcon icon={faClock}
                                        className='text-orange-500' />
                                </div>
                                <div>
                                    <div className='text-sm text-gray-500'>
                                        Hora
                                    </div>
                                    <div>
                                        {(index + 7 >= 24) ? index - 17 : index + 7}:00 - {(index + 7 >= 23) ? index - 16 : index + 8}:00
                                    </div>
                                </div>
                            </div>
                            <div className='text-right text-sm text-gray-500 py-2'>
                                <span className='text-lg text-black font-bold'>
                                    {dt.find(x => x.hour == ((index + 7 >= 24) ? index - 17 : index + 7)).available}/60
                                </span>
                                <span>
                                    min
                                </span>

                            </div>
                            <div className='w-full  bg-gray-200 rounded-xl relative'>
                                <div style={{
                                    width: `${(dt.find(x => x.hour == ((index + 7 >= 24) ? index - 17 : index + 7)).available / 60) * 100}%`
                                }} className='min-h-[.3rem] bg-green-500 '>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && <div className='bg-black/10 fixed w-full h-full top-0 left-0 flex flex-row items-center justify-center'>
                <form onSubmit={handleSubmit(handleAddEvent)} className='bg-white p-4 min-w-[600px] rounded-lg'>
                    <div className='flex flex-row items-center gap-4'>
                        <div>
                            <div className='bg-purple-100 rounded-lg text-purple-500 h-15 w-15 flex items-center justify-center'>
                                <FontAwesomeIcon icon={faClock}
                                    className='text-5xl ' />
                            </div>

                        </div>
                        <div>
                            <div className='font-bold text-2xl'>
                                Agregar un nuevo evento
                            </div>
                            <div className='text-gray-500 text-sm'>
                                Agregar un nuevo evento en esta linea
                            </div>
                        </div>
                    </div>
                    <div className='py-5'>
                        <div className='flex flex-col'>
                            <div className='pb-4'>
                                Tiempo
                            </div>
                            <Controller name='Type'
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <>
                                        <InputLabel id="demo-multiple-name-label">Tipo</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            {...field}
                                            //onChange={handleChangePlant}
                                            input={<OutlinedInput label="Name" />}
                                        >
                                            <MenuItem value={1} >
                                                <div className='flex flex-row items-center gap-2'>
                                                    <div>
                                                        <div className='bg-yellow-300 rounded-lg w-7 h-7 flex flex-row items-center justify-center'>
                                                            <FontAwesomeIcon icon={faCookie} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Desayuno
                                                    </div>
                                                </div>
                                            </MenuItem>
                                            <MenuItem value={2} >
                                                <div className='flex flex-row items-center gap-2'>
                                                    <div>
                                                        <div className='bg-purple-500 text-white rounded-lg w-7 h-7 flex flex-row items-center justify-center'>
                                                            <FontAwesomeIcon icon={faCoffee} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Comida
                                                    </div>
                                                </div>
                                            </MenuItem>
                                            <MenuItem value={3} >
                                                <div className='flex flex-row items-center gap-2'>
                                                    <div>
                                                        <div className='bg-blue-500 text-white rounded-lg w-7 h-7 flex flex-row items-center justify-center'>
                                                            <FontAwesomeIcon icon={faBroom} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Limpieza
                                                    </div>
                                                </div>
                                            </MenuItem>
                                            <MenuItem value={4} >
                                                <div className='flex flex-row items-center gap-2'>
                                                    <div>
                                                        <div className='bg-green-500 text-white rounded-lg w-7 h-7 flex flex-row items-center justify-center'>
                                                            <FontAwesomeIcon icon={faUserGroup} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Junta/Reunion
                                                    </div>
                                                </div>
                                            </MenuItem>
                                            <MenuItem value={5} >
                                                <div className='flex flex-row items-center gap-2'>
                                                    <div>
                                                        <div className='bg-red-500 text-white rounded-lg w-7 h-7 flex flex-row items-center justify-center'>
                                                            <FontAwesomeIcon icon={faClockFour} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Tiempo Muerto
                                                    </div>
                                                </div>
                                            </MenuItem>
                                            <MenuItem value={6} >
                                                <div className='flex flex-row items-center gap-2'>
                                                    <div>
                                                        <div className='bg-gray-500 text-white rounded-lg w-7 h-7 flex flex-row items-center justify-center'>
                                                            <FontAwesomeIcon icon={faInfoCircle} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        Otros
                                                    </div>
                                                </div>
                                            </MenuItem>
                                        </Select>
                                    </>
                                )}>

                            </Controller>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            Hora de inicio
                            <div className='pt-2 w-full'>
                                <Controller name='Start'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <OutlinedInput type='Time' {...field} sx={{
                                            width: "100%"
                                        }} />)} />
                            </div>
                        </div>
                        <div>
                            Hora de inicio
                            <div className='pt-2'>
                                <Controller name='End'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <OutlinedInput {...field} type='Time' sx={{
                                            width: "100%"
                                        }} />)} />
                            </div>
                        </div>
                    </div>
                    <div className='py-4'>
                        <div>
                            Descripcion
                            <div>
                                 <Controller name='Description'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (<OutlinedInput {...field} type='text' sx={{
                                    width: "100%"
                                }} />)} />

                            </div>
                        </div>

                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <button onClick={() => { setShowModal(false) }} className='bg-gray-200 text-black p-2 rounded-lg'>
                            <FontAwesomeIcon icon={faCancel} />
                            Cancelar
                        </button>
                        <button type='submit' className='bg-green-700 text-white p-2 rounded-lg'>
                            <FontAwesomeIcon icon={faSave} />
                            Guardar
                        </button>
                    </div>
            </form>
            </div>}
        </div >
    );
}
