const convert = (date: Date) => {
    const month = date.getMonth(),
        parsedMonth = month + 1 < 10 ? "0" + (month + 1) : (month + 1)

    return `${date.getFullYear()}-${parsedMonth}-${date.getDate()}`
}

export function dateOnlyConverter(date: Date): string
export function dateOnlyConverter(year: number, month: number, date: number): string 
export function dateOnlyConverter(param: Date | number, month?: number, date?: number): string {
    if(typeof param == "object") {
        return convert(param)
    } else {
        return convert(new Date(param, month as number, date))
    }
} 