import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const ConvertToUTC = (date:string,timeZone:string) => {
    const fechaUtc = dayjs
        .tz(date, timeZone)
        .utc()
        .toDate();

    return fechaUtc
}
export const formDateHours = (date: Date, TimeZone: string) => {
    const info = date.toLocaleDateString('es-MX', {
        timeZone: TimeZone,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,

    })
    /*new Date(data?.hrs).toLocaleDateString('es-MX', {
                                    timeZone: TimeZone,
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                    hour: "2-digit",
                                    minute: "2-digit"
                                }).split(" ").toString().substring(13).toUpperCase() ?? ''*/
    const format = info.trim().substring(info.length - 11).replace(",", "").replace(".", "").toLocaleUpperCase()
    return format
}
export const formatDateUTCDate = (date: string) => {
    console.log("date:-----------", date)
    const [year, month, day] = date.substring(0, 10).split('-').map(Number);
    return new Date(year, month - 1, day)
}

export const formatDateUTC = (date: string) => {
    console.log("date:-----------", date)
    const [year, month, day] = date.substring(0, 10).split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-MX', {
        timeZone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export const GetTimeZone = (timeZone: number) => {
    let TimeZoneString = ''
    switch (timeZone) {
        case 1:
            TimeZoneString = "America/Mazatlan"
            break;

        default:
            TimeZoneString = 'America/Ciudad_Juarez'
            break;
    }
    return TimeZoneString

}