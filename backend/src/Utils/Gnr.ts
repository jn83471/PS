export const normalizes = (text: string) => {
    return text.replace(/\\+/g, "\\");
};
export const withTimeout = (promise: Promise<any>, ms: number) => {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), ms)
        ),
    ]);
};
export const formatDate = (date = new Date()) => {
    return [
        date.getFullYear(),
        String(date.getMonth() + 2).padStart(2, '0'),
        1
    ].join('-');
}

export const formatDateNow = (date = new Date()) => {
    const nextDate = new Date(date);

    nextDate.setDate(nextDate.getDate() + 1);

    return [
        nextDate.getFullYear(),
        String(nextDate.getMonth() + 1).padStart(2, '0'),
        String(nextDate.getDate()).padStart(2, '0')
    ].join('-');
    /*return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()+1).padStart(2, '0')
    ].join('-');*/
}