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

export const formatDateUTC = (date: string) => {
    const [year, month, day] = date.substring(0, 10).split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export const formatDateTimeZone = (date: string, TimeZone: string) => {
    if (date == undefined) {
        return "-"
    }
    return new Date(date).toLocaleDateString('es-MX', {
        timeZone: TimeZone,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }) ?? '';
}
export const formatDateTimeZoneComplete = (date: string, TimeZone: string) => {
    if (date == undefined) {
        return "-"
    }
    return new Date(date).toLocaleDateString('es-MX', {
        timeZone: TimeZone,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit"
    }) ?? '';
}

export const formatDateUTCComplete = (date: string, TimeZone: string) => {
    if (date == undefined) {
        return "-"
    }
    return new Date(date).toLocaleDateString('es-MX', {
        timeZone: "UTC",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: "2-digit",
        minute: "2-digit"
    }) ?? '';
}