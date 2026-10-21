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