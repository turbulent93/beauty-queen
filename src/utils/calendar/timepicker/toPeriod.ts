import { ITime } from "@/interfaces/calendar.interface"

export const toPeriod = (date: ITime) => {
    const minutes = date.minutes

    return `${date.hours}:${minutes < 10 ? "0" + minutes : minutes}`
}